"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function GrievanceChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I am your Mandi Grievance Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again later." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Network error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
        >
          <MessageSquare className="w-8 h-8" />
        </button>
      ) : (
        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200">
          <div className="bg-emerald-950/80 border-b border-emerald-900/50 p-4 flex justify-between items-center text-emerald-400 font-semibold">
            <div className="flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              <h3 className="font-bold text-lg">Grievance Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-emerald-400 hover:text-emerald-200">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-black">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${msg.role === "user" ? "bg-emerald-700 text-white rounded-tr-none" : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none shadow-sm"}`}>
                  <div className="flex items-center mb-1 space-x-2">
                    {msg.role === "user" ? (
                      <span className="text-xs font-semibold opacity-75 ml-auto flex items-center">You <User className="w-3 h-3 ml-1" /></span>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-500 flex items-center"><Bot className="w-3 h-3 mr-1" /> AI</span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg rounded-tl-none p-3 shadow-sm flex items-center space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="bg-slate-900 border-t border-slate-800 p-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your issue..."
              className="flex-grow bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-emerald-600 text-white hover:bg-emerald-500 disabled:bg-slate-700 p-3 rounded-lg transition-colors"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
