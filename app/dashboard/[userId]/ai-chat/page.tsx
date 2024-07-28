'use client';
import { useState } from 'react';
import { Message, continueConversation } from '@/lib/actions/getAI';
import { readStreamableValue } from 'ai/rsc';
import { marked } from 'marked';
import { SendHorizontalIcon, UserIcon, MessageCircleQuestion, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div key={index} className={`flex items-start p-2 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`flex max-w-4xl p-4 rounded-lg ${isUser ? 'bg-white text-black' : 'bg-emerald-600 text-white'}`} style={{ lineHeight: '2' }}>
          {isUser ? <UserIcon className="mr-2 flex-shrink-0" style={{ width: '24px', height: '24px' }} /> : <Sparkles className="mr-2 flex-shrink-0" />}
          <div className="flex-grow" dangerouslySetInnerHTML={{ __html: formattedContent }} />
        </div>
      </div>
    );
  };

  const predefinedMessages = [
    'Can you provide insights on optimizing my finance to increase profit and sales?',
    'What are the key performance indicators (KPIs) I should track to measure the success of my business?',
    'How can I use my data to improve my inventory management and reduce operational costs?',
  ];

  return (
    <>
      <div className="w-full flex-grow overflow-auto p-4" style={{ maxHeight: 'calc(100% - 64px)' }}>
        {conversation.map((message, index) => renderMessage(message, index))}
        {!hasConversationStarted && (
          <div >
            <h1 className="text-6xl text-white font-semibold mb-10">
              Hello! <br />
              Need assistance with your business <br /> analysis? I'm here to help!
            </h1>
            <div className="flex flex-row justify-between w-full gap-2">
              {predefinedMessages.map((message, index) => (
                <button key={index} onClick={() => handleSendMessage(message)} className="p-3 w-5/6 h-40 max-h-15 font-medium text-neutral-700 bg-white rounded-lg hover:bg-slate-200 text-start ">
                  <MessageCircleQuestion className="text-yellow-500" />
                  <p className="mt-2">{message}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center p-4 sticky bottom-0 gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-grow w-[95%] p-2 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 py-3 px-4 focus:ring-emerald-200"
          placeholder="Type your message..."
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSendMessage(input);
            }
          }}
        />
        <Button onClick={() => handleSendMessage(input)} className="w-[5%] px-4 h-full font-bold text-emerald-600 bg-zinc-50 hover:bg-emerald-950 ">
          <SendHorizontalIcon />
        </Button>
      </div>
    </>
  );
}
