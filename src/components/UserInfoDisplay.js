import Script from "next/script";
import { useEffect, useState } from "react";

export default function UserInfoDisplay() {
    const [userInfo, setUserInfo] = useState(null);
    const [isSdkLoaded, setIsSdkLoaded] = useState(false);

    useEffect(() => {
        const handleMessage = (data) => {
            switch (data && data.event) {
                case 'lead-submission':
                    if (data.payload) {
                        setUserInfo({
                            name: data.payload.name,
                            phone: data.payload.phone,
                            email: data.payload.email,
                            source: data.payload.source
                        });
                    }
                    return;
                default:
                    return;
            }
        };

        if (isSdkLoaded) {
            window.chatbot.addEventListener('chat', handleMessage);
            window.chatbot.addEventListener('lead-submission', handleMessage);
            window.chatbot.addEventListener('live-chat-escalation', handleMessage);
            window.chatbot.addEventListener('minimize-widget', handleMessage);
        }


        return () => {
            if (window.chatData) {
                window.chatbot.removeEventListener('chat', handleMessage);
                window.chatbot.removeEventListener('lead-submission', handleMessage);
                window.chatbot.removeEventListener('live-chat-escalation', handleMessage);
                window.chatbot.removeEventListener('minimize-widget', handleMessage);
            }
        };
    }, [isSdkLoaded]);

    const handleClearUserInfo = () => {
        // Send post message to clear user info in the embedded iframe
        const iframes = document.querySelectorAll(`iframe`);
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
            <Script
                strategy="lazyOnload"
                src="https://www.chat-data.com/chatbotsdk.min.js"
                data-chatbot-id={process.env.NEXT_PUBLIC_CHATBOT_ID}
                onLoad={() => setIsSdkLoaded(true)}
            />
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