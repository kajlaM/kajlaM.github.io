'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
  id: string;
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Think of me as an interactive version of Manish’s portfolio. You can ask me about machine learning, robotics, mathematics, software engineering, campus leadership, or the ideas that shape how he thinks and builds.",
      id: 'welcome',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What is your tech stack?",
    "Tell me about your Fraud Detection System.",
    "What did you do as Senator at IIT Kanpur?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: textToSend,
      id: Math.random().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: data.text || "I'm sorry, I couldn't process that response. Please try again.",
          id: Math.random().toString(),
        },
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: "I'm having trouble connecting right now. Please try asking again in a few moments.",
          id: Math.random().toString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto h-[600px] flex flex-col justify-between glass-panel rounded-2xl overflow-hidden border border-border relative z-10">
      {/* Pulse Ambient Glow Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(68,68,68,0.2)_0%,transparent_70%)] animate-pulse"
        style={{ animationDuration: '4s' }}
      />

      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center gap-3 bg-black/40 backdrop-blur-md relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">KAJLA.AI // ONLINE</span>
      </div>

      {/* Messages Thread */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative z-10 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role !== 'user' && (
              <div className="w-8 h-8 rounded-full border border-border bg-[#1F2023] flex items-center justify-center shrink-0 shadow-md">
                <Bot className="w-4 h-4 text-zinc-300" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed border ${msg.role === 'user'
                ? 'bg-zinc-100 text-black border-zinc-200 shadow-sm'
                : 'bg-[#1F2023] text-zinc-200 border-border/80 shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
                }`}
            >
              {/* Formatted Markdown Parser Mock */}
              <div className="space-y-2">
                {msg.text.split('\n').map((para, idx) => {
                  if (para.startsWith('### ')) {
                    return <h4 key={idx} className="font-semibold text-white text-base mt-2 mb-1">{para.replace('### ', '')}</h4>;
                  }
                  if (para.startsWith('* ')) {
                    return (
                      <ul key={idx} className="list-disc list-inside pl-2 space-y-1">
                        <li className="text-zinc-300">{para.replace('* ', '')}</li>
                      </ul>
                    );
                  }
                  // Handle Bold in parameters
                  const boldRegex = /\*\*(.*?)\*\*/g;
                  if (boldRegex.test(para)) {
                    const parts = para.split(boldRegex);
                    return (
                      <p key={idx}>
                        {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-medium">{part}</strong> : part)}
                      </p>
                    );
                  }
                  return <p key={idx} className="text-zinc-200">{para}</p>;
                })}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full border border-zinc-400 bg-white flex items-center justify-center shrink-0 shadow-md">
                <User className="w-4 h-4 text-black" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-full border border-border bg-[#1F2023] flex items-center justify-center shrink-0 shadow-md animate-pulse">
              <Bot className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="bg-[#1F2023] text-zinc-400 border border-border/85 rounded-xl px-4 py-3 text-sm flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer input and quick prompts */}
      <div className="p-4 border-t border-border bg-black/60 backdrop-blur-md relative z-10 space-y-4">
        {/* Render quick prompt buttons if it's the welcome state */}
        {messages.length === 1 && !isLoading && (
          <div className="flex flex-wrap gap-2 animate-fade-in">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="pill-btn px-3 py-1.5 text-xs text-zinc-300 rounded-full border border-border bg-[#1F2023]/60 hover:bg-[#1F2023] hover:text-white transition-all cursor-none"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex gap-2 items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Kajla.AI about my work..."
            className="flex-1 bg-[#1f2023] border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-300 transition-colors shadow-inner"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-[#1F2023] hover:bg-[#2e2f34] text-white border border-border flex items-center justify-center transition-all disabled:opacity-50 disabled:pointer-events-none cursor-none shadow-md shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
