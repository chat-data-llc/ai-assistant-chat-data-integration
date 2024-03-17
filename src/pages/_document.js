import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Seamlessly integrate OpenAI Assistant API with multiple platforms like Discord, Slack, and WhatsApp without coding. Build once and deploy everywhere with Your Brand." />
        <meta name="keywords" content="OpenAI, OpenAI Assistant, API Integration, No-code Integration, Discord, Slack, WhatsApp, Multi-platform Integration" />
        <meta property="og:title" content="Integrate OpenAI Assistant Across Platforms" />
        <meta property="og:description" content="Seamlessly integrate OpenAI Assistant API with Discord, Slack, and WhatsApp without coding. Discover the ease of multi-platform deployment with Your Brand." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://openai-assistant-demo.chat-data.com/ai-assistant-chat-data-integration.png" />
        <meta property="og:url" content="https://openai-assistant-demo.chat-data.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Integrate OpenAI Assistant Across Platforms" />
        <meta name="twitter:description" content="Easily integrate OpenAI Assistant API across platforms like Discord, Slack, and WhatsApp with no coding required. Your Brand makes deployment effortless and universal." />
        <meta name="twitter:image" content="https://openai-assistant-demo.chat-data.com/ai-assistant-chat-data-integration.png" />
        <link rel="canonical" href="https://openai-assistant-demo.chat-data.com" />
        <Script
          strategy="lazyOnload"
          src={`https://www.chat-data.com/embed.min.js?chatbotId=${process.env.CHATBOT_ID}`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
