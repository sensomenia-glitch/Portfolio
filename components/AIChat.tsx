import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { SendIcon, SparklesIcon, XIcon } from './Icons';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I\'m Aiden. Ask me anything about Methodias Juma\'s projects or skills!', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let fullResponse = '';
    
    // Add placeholder for streaming
    setMessages(prev => [...prev, { role: 'model', text: '', timestamp: new Date() }]);

    try {
      const stream = sendMessageToGemini(userMsg.text);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newHistory = [...prev];
          const lastMsg = newHistory[newHistory.length - 1];
          if (lastMsg.role === 'model') {
            lastMsg.text = fullResponse;
          }
          return newHistory;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`
          pointer-events-auto
          bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl
          border border-violet-200 dark:border-violet-900/50
          shadow-2xl rounded-2xl 
          w-[350px] sm:w-[380px] max-h-[600px] h-[500px]
          flex flex-col overflow-hidden
          transition-all duration-500 ease-out transform origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <SparklesIcon />
            <div>
              <h3 className="font-bold text-sm">Aiden AI</h3>
              <p className="text-xs text-violet-100">Methodias's Virtual Assistant</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
            <XIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none'}
                `}
              >
                {msg.text || (isTyping && index === messages.length - 1 && <span className="animate-pulse">Consulting neural network...</span>)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my projects..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="bg-violet-600 hover:bg-fuchsia-600 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            <SendIcon />
          </button>
        </form>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto
          mt-4 w-16 h-16 rounded-full shadow-2xl shadow-violet-500/30 flex items-center justify-center text-white
          transition-all duration-500 transform hover:scale-110
          ${isOpen ? 'bg-slate-700 rotate-90 opacity-0 hidden' : 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 rotate-0 opacity-100'}
        `}
      >
        <SparklesIcon />
      </button>
    </div>
  );
};

export default AIChat;