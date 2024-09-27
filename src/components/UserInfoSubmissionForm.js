import { useState } from 'react';
import Alert from './Alert';

export default function UserInfoSubmissionForm() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', info: '', email: '' });

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        const { name, info, email } = formData;

        // Send post message with user info to the embedded iframe
        const iframes = document.querySelectorAll(`iframe[src^="https://www.chat-data.com/chatbot-iframe/"]`);
        if (iframes.length > 0) {
            iframes.forEach(iframe => {
                iframe.contentWindow.postMessage({
                    event: 'user-info',
                    user: {
                        name,
                        email,
                        info
                    }
                }, '*');
            });
        } else {
            console.error('No iframes found');
        }
        setSubmitted(true);
        // Clear form fields
        setFormData({ name: '', info: '' });
        // Reset submitted state after a short delay
        setTimeout(() => setSubmitted(false), 3000);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    if (submitted) {
        return (
            <Alert variant="success">
                Form submitted successfully!
            </Alert>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-200 pb-2">
                    <h2 className="text-base font-semibold leading-7 text-black">User Information to Send to Chatbot</h2>
                    <div className="mt-2 grid grid-cols-1 gap-x-1 gap-y-2 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-black">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="p-2 block w-full rounded-md border-gray-300 bg-white py-1.5 text-black shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="p-2 block w-full rounded-md border-gray-300 bg-white py-1.5 text-black shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="info" className="block text-sm font-medium leading-6 text-black">
                                Info
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="info"
                                    name="info"
                                    rows={3}
                                    value={formData.info}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-gray-300 bg-white p-1.5 text-black shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    placeholder="User Information..."
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
