import UserInfoDisplay from "@/components/UserInfoDisplay";
import UserInfoSubmissionForm from "@/components/UserInfoSubmissionForm";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Integrate OpenAI Assistant With the Website Through Chat Data</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="w-screen h-full md:h-dvh grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:h-full h-[60vh] bg-[#d4dcff] relative overflow-hidden flex justify-center">
          <iframe
            src={`https://www.chat-data.com/chatbot-iframe/${process.env.CHATBOT_ID}`}
            width="100%"
            allow="clipboard-write"
            frameBorder="0"
          ></iframe>
        </div>
        <main className={`flex flex-col gap-8 mt-8 justify-center px-6 pb-10 ${inter.className}`}>
          <h2 className="text-xl font-semibold text-gray-800">
            Features on this panel require subscriptions
          </h2>
          <UserInfoSubmissionForm />
          <UserInfoDisplay/>
          <div className="hidden z-10 max-w-5xl w-full items-center justify-end font-mono text-sm lg:flex">
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://www.chat-data.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                By{" "}
                <Image
                  src="/chat_data.png"
                  alt="Chat Data Logo"
                  width={100}
                  height={24}
                  priority
                />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <h3 className="font-semibold text-3xl sm:text-4xl bg-chatdata-gradient-text bg-clip-text text-transparent ">
              OpenAI Assistant Multi-platform Integration
            </h3>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Integrate Your OpenAI Assistant API Across Multiple Platforms Without Coding
          </h1>
          <p className="text-gray-600">
            Seamlessly incorporate me into your Discord, Slack, and WhatsApp environments, all powered by the same OpenAI Assistant. Develop once, deploy universally.
          </p>
          <div>
            <table className="text-center  min-w-full divide-y divide-gray-300 text-sm md:text-base lg:text-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th>Platform</th>
                  <th>Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 bg-white text-gray-600">
                <tr >
                  <td className="p-2">
                    <Link href={`https://www.chat-data.com/api/v1/chatbot/discord/add/${process.env.CHATBOT_ID}`} target="_blank" rel="noopener noreferrer">
                      <div className="flex justify-center items-center">
                        <div className="mr-7 w-5 sm:w-8 md:w-8">
                          <Image
                            src="/Discord_icon.svg"
                            alt="Discrod icon"
                            decoding="async"
                            data-nimg="1"
                            width={32}
                            height={32}
                          />
                        </div>
                        <p className="text-xs sm:text-sm">
                          Chat with me on Discord
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="p-2">
                    <Link className="text-blue-500 hover:text-blue-600 hover:underline" href="https://www.chat-data.com/api-reference#section/Chat-Data-Website-Guide/Discord-Bot-Integration">
                      Discord Integration Guide
                    </Link>
                  </td>
                </tr>
                <tr >
                  <td className="p-2">
                    <Link href={`https://www.chat-data.com/api/v1/chatbot/slack/add/${process.env.CHATBOT_ID}`} target="_blank" rel="noopener noreferrer">
                      <div className="flex justify-center items-center">
                        <div className="mr-7 w-5 sm:w-8 md:w-8">
                          <Image
                            src="/Slack_icon.svg"
                            alt="Slack icon"
                            decoding="async"
                            data-nimg="1"
                            width={32}
                            height={32}
                          />
                        </div>
                        <p className="text-xs sm:text-sm">
                          Chat with me on Slack
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="p-2">
                    <Link className="text-blue-500 hover:text-blue-600 hover:underline" href="https://www.chat-data.com/api-reference#section/Chat-Data-Website-Guide/Slack-Bot-Integration">
                      Slack Integration Guide
                    </Link>
                  </td>
                </tr>
                <tr >
                  <td className="p-2">
                    <Link href={`https://wa.me/${process.env.WHATSAPP_PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer">
                      <div className="flex justify-center items-center">
                        <div className="mr-7 w-5 sm:w-8 md:w-8">
                          <Image
                            src="/Whatsapp_logo.png"
                            alt="Discrod icon"
                            decoding="async"
                            data-nimg="1"
                            width={32}
                            height={32}
                          />
                        </div>
                        <p className="text-xs sm:text-sm">
                          Chat with me on WhatsApp
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="p-2">
                    <Link className="text-blue-500 hover:text-blue-600 hover:underline" href="https://www.chat-data.com/api-reference#section/Chat-Data-Website-Guide/Whatsapp-Integration">
                      WhatsApp Integration Guide
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 sm:mt-4 md:mt-6 lg:mt-8">
              Open sourced at this <Link className="text-blue-500 hover:text-blue-600 hover:underline" href="https://github.com/chat-data-llc/ai-assistant-chat-data-integration">Github repo</Link>
            </div>
          </div>
        </main>
      </section >
    </>
  );
}
