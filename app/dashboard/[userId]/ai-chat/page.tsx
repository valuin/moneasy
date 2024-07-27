'use client';
import { useState } from 'react';
import { Message, continueConversation } from '@/lib/actions/getAI';
import { readStreamableValue } from 'ai/rsc';
import { marked } from 'marked';
import { Bot, SendHorizontalIcon, UserIcon, MessageCircleQuestion } from 'lucide-react';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Page() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [hasConversationStarted, setHasConversationStarted] = useState<boolean>(false);

  const handleSendMessage = async (messageContent: string) => {
    // Append the user's message to the conversation
    const newConversation: Message[] = [...conversation, { role: 'user', content: messageContent }];
    setConversation(newConversation);

    // Clear the input field
    setInput('');
    setHasConversationStarted(true);

    // Send the message to the server and get the streamable response
    const { messages, newMessage } = await continueConversation(newConversation);

    // Initialize textContent and an updated conversation
    let textContent = '';
    const updatedConversation = [...messages];

    // Stream the response
    for await (const delta of readStreamableValue(newMessage)) {
      textContent = `${textContent}${delta}`;

      // Update the assistant's message in the conversation
      const lastMessageIndex = updatedConversation.length - 1;
      if (updatedConversation[lastMessageIndex]?.role === 'assistant') {
        updatedConversation[lastMessageIndex].content = textContent;
      } else {
        updatedConversation.push({ role: 'assistant', content: textContent });
      }

      // Update the state to re-render the component
      setConversation([...updatedConversation]);
    }
  };

  const renderMessage = (message: Message, index: number) => {
    const formattedContent = marked(message.content);
    const isUser = message.role === 'user';
    return (
      <div key={index} className={`flex items-start p-4 rounded-lg ${isUser ? 'bg-white mb-5' : 'bg-emerald-500 mb-5'}`}>
        {isUser ? <UserIcon className="mr-2 text-black" /> : <Bot className="mr-2 text-emerald-950" />}
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
      </div>
    );
  };

  const predefinedMessages = [
    'What are the current trends and growth opportunities in our industry, and how do our products/services align with these trends?',
    'Can you analyze the market share of our competitors and suggest strategies to improve our position?',
    'What are the most significant challenges facing our business, and how can we address them?',
  ];

  return (
    <>
      <div className="w-full flex-grow overflow-auto p-4" style={{ maxHeight: 'calc(100% - 64px)' }}>
        {conversation.map((message, index) => renderMessage(message, index))}
        {!hasConversationStarted && (
          <div>
            <h1 className="text-6xl text-white mb-10">
              Hello! <br />
              Need assistance with your business <br /> analysis? I'm here to help!
            </h1>
            <div className="flex flex-row justify-between w-full gap-2">
              {predefinedMessages.map((message, index) => (
                <button key={index} onClick={() => handleSendMessage(message)} className="p-3 w-5/6 h-40 max-h-15 font-bold text-neutral-700 bg-white rounded-lg hover:bg-slate-200 text-start ">
                  <MessageCircleQuestion className="text-yellow-500" />
                  <p className="mt-2">{message}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center p-4 sticky bottom-0 ">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
          placeholder="Type your message..."
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSendMessage(input);
            }
          }}
        />
        <button onClick={() => handleSendMessage(input)} className="absolute right-2 px-4 py-2 font-bold text-white">
          <SendHorizontalIcon className="text-black" />
        </button>
      </div>
    </>
  );
}
