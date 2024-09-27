import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const validateApiKey = (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        return res.status(401).json({
            status: 'error',
            message: 'Authorization header is missing',
        });
    }
    const tokenParts = authorizationHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid Authorization header format',
        });
    }
    const apiKeyStr = tokenParts[1]; // Extract the API key from the Bearer token
    if (apiKeyStr !== process.env.BEARER_TOKEN) {
        return res.status(401).json({
            status: 'error',
            message: 'Incorrect Bearer token',
        });
    }
};

export default async function handler(req, res) {
    // Check if the request method is POST
    if (req.method === 'POST') {
        validateApiKey(req, res);
        // Process a POST request
        const { messages, stream } = req.body; // Assuming the body contains a "message" field
        try {
            // We do not manage chat history for demonstration purpose.
            // Find the last user conversation. 
            const messagesToSend = messages.map( message => {
                return {
                    role: message.role === 'assistant' ? 'assistant' : 'user',
                    content: message.content
                }
            })
            const thread = await openai.beta.threads.create({
                messages: messagesToSend
            });

            // We use the createAndStream SDK helper to create a run with
            // streaming. The SDK provides helpful event listeners to handle 
            // the streamed response.
            if (stream) {
                const run = openai.beta.threads.runs.createAndStream(thread.id, {
                    assistant_id: process.env.ASSISTANT_ID
                })
                    .on('end', () => {
                        res.end();
                    })
                    .on('textDelta', (textDelta, snapshot) => {
                        res.write(textDelta.value);
                    })
                    .on('toolCallCreated', (toolCall) => {
                        res.write('\n```python\n');
                    })
                    .on('toolCallDelta', (toolCallDelta, snapshot) => {
                        if (toolCallDelta.type === 'code_interpreter') {
                            if (toolCallDelta.code_interpreter.input) {
                                res.write(toolCallDelta.code_interpreter.input)
                            }
                            if (toolCallDelta.code_interpreter.outputs) {
                                toolCallDelta.code_interpreter.outputs.forEach(output => {
                                    if (output.type === "logs") {
                                        res.write(`\n${output.logs}\n`);
                                    }
                                });
                            }
                        }
                    })
                    .on('toolCallDone', (toolCallDelta, snapshot) => {
                        res.write('\n```\n');
                    });
            } else {
                let run = await openai.beta.threads.runs.create(
                    thread.id,
                    {
                        assistant_id: process.env.ASSISTANT_ID,
                    }
                );
                while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
                    run = await openai.beta.threads.runs.retrieve(
                        run.thread_id,
                        run.id
                    );
                }
                const results = [];
                if (run.status === 'completed') {
                    const messages = await openai.beta.threads.messages.list(
                        run.thread_id
                    );
                    for (const message of messages.data) {
                        if (message.role === 'user') {
                            break;
                        }
                        results.push(message);
                    }

                } else {
                    console.log(run.status);
                }
                const text = results.reverse().map(result => result.content[0].text.value).join('\n');
                console.log(text);
                res.status(200).send(text);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data from OpenAI' });
        }
    } else {
        // Handle any cases that are not POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
