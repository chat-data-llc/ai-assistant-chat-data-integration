import { useEffect, useState } from "react";

export default function UserInfoDisplay() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const handleMessage = (event) => {
            console.log('Received message:', event.data);
            console.log(event.origin)
            if (event.origin !== "https://www.chat-data.com") {
                return;
            }
            switch (event.data && event.data.event) {
                case 'lead-submission':
                    if (event.data.payload) {
                        setUserInfo({
                            name: event.data.payload.name,
                            phone: event.data.payload.phone,
                            email: event.data.payload.email,
                            source: event.data.payload.source
                        });
                    }
                    return;
                default:
                    return;
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const handleClearUserInfo = () => {
        // Send post message to clear user info in the embedded iframe
        const iframes = document.querySelectorAll(`iframe[src^="https://www.chat-data.com/chatbot-iframe/"]`);
        if (iframes.length > 0) {
            iframes.forEach(iframe => {
                iframe.contentWindow.postMessage({
                    event: 'user-info',
                    user: null
                }, '*');
            });
        } else {
            console.error('No iframes found');
        }
        setUserInfo(null);
    };

    return (
        <div className="border-t border-gray-200">
            <h2 className="text-base font-semibold leading-7 text-black">User Information Received From Chatbot</h2>
            {userInfo ? (
                <>
                    <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                            <dd className="mt-1 text-sm text-black">{userInfo.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 text-sm text-black">{userInfo.phone}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm text-black">{userInfo.email}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Source</dt>
                            <dd className="mt-1 text-sm text-black">{userInfo.source}</dd>
                        </div>
                    </dl>
                </>
            ) : (
                <p className="mt-4 text-sm text-gray-500">No user information available.</p>
            )}
            <div className="mt-4 flex items-center justify-end">
                <button
                    type="button"
                    onClick={handleClearUserInfo}
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Clear Lead Info
                </button>
            </div>
        </div>
    )
}