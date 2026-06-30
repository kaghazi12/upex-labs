import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Assumes cn is available, typically is in shadcn-like setups
import { useChat } from '../context/ChatContext';

const QUICK_REPLIES = [
  "What's included in each plan?",
  "How long does a project take?",
  "Book a free call",
];

const INITIAL_GREETING = {
  role: 'assistant',
  text: "Hi! I'm the UPEX LABS AI Assistant. How can I help you today?",
};

export const ChatWidget = () => {
  const { isChatOpen: isOpen, setIsChatOpen: setIsOpen } = useChat();
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [isHourlyLimited, setIsHourlyLimited] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);
    setHasSentMessage(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: [...messages, userMessage],
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { error: 'Network response was not ok' };
      }

      if (!response.ok) {
        if (response.status === 429) {
          const isHourly = data.error?.includes("hour");
          setMessages((prev) => [...prev, { role: 'system', text: data.error, isHourly }]);
          if (isHourly) {
            setIsHourlyLimited(true);
          }
          return;
        }
        throw new Error(data.error || 'Network response was not ok');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: data.text }]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message || 'Something went wrong, please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed md:bottom-6 bottom-3 md:right-6 right-3 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 z-[999]",
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-[1000] transition-all duration-300 origin-bottom-right overflow-hidden",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-primary/10 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">UPEX LABS Assistant</h3>
              <p className="text-xs text-primary font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg, idx) => {
            if (msg.role === 'system') {
              return (
                <div key={idx} className="flex flex-col items-center my-4 gap-3">
                  <div className="text-xs text-muted-foreground italic text-center px-4 py-2 bg-muted/20 rounded-lg max-w-[90%]">
                    {msg.text}
                  </div>
                  {msg.isHourly && (
                    <Link
                      to="/booking-preview"
                      onClick={() => setIsOpen(false)}
                      className="text-xs px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium shadow-sm"
                    >
                      Book a Free Call
                    </Link>
                  )}
                </div>
              );
            }
            return (
              <div
                key={idx}
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  msg.role === 'user' ? "self-end flex-row-reverse" : "self-start"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1",
                    msg.role === 'user' ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary"
                  )}
                >
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div
                  className={cn(
                    "px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap",
                    msg.role === 'user'
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted/50 text-foreground border border-border rounded-tl-sm"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {/* Quick Replies */}
          {!hasSentMessage && (
            <div className="flex flex-col gap-2 mt-2 items-start pl-9">
              <p className="text-xs text-muted-foreground mb-1">Suggested questions:</p>
              {QUICK_REPLIES.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(reply)}
                  className="text-xs text-left px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%] self-start">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-muted/50 border border-border rounded-tl-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-center text-xs text-red-400 mt-2">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-border bg-background">
          <div className="flex items-end gap-2 bg-muted/30 border border-border rounded-xl p-1 focus-within:border-primary/50 transition-colors">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading || isHourlyLimited}
              className="flex-grow bg-transparent border-none focus:outline-none resize-none px-3 py-2 text-sm text-foreground max-h-32 min-h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
              rows={1}
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading || isHourlyLimited}
              className="p-2 mb-0.5 mr-0.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shrink-0"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
          {isHourlyLimited && (
            <p className="text-[10px] text-muted-foreground/70 text-center mt-2 italic">
              Hourly limit reached — chat will resume in a little while
            </p>
          )}
        </div>
      </div>
    </>
  );
};
