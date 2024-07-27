'use client';

import { useState } from 'react';
import { Message, continueConversation } from '@/lib/actions/getAI';
import { readStreamableValue } from 'ai/rsc';
import { marked } from 'marked';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Page() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = async () => {
    // Append the user's message to the conversation
    const newConversation = [...conversation, { role: 'user', content: input }];
    setConversation(newConversation);

    // Clear the input field
    setInput('');

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
    return <div key={index} className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-emerald-500'}`} dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  return (
    <div className="flex flex-row justify-center h-full">
      <div className="w-full p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4 space-y-2 overflow-auto h-5/6">{conversation.map((message, index) => renderMessage(message, index))}</div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="flex-grow p-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage} className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
