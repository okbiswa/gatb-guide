"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageCircle, X, Send, Bot, User, Loader2, GraduationCap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "./ui/button";

export function AdmissionAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    maxToolRoundtrips: 5,
  });

  // Reusable gradient class
  const themeGradient = "bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600";

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 flex items-center justify-center gap-2 rounded-full ${themeGradient} px-5 py-3 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 z-50`}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="font-semibold text-sm">Ask AI Admission Advisor</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 flex-col">
      {/* Header */}
      <div className={`flex items-center justify-between ${themeGradient} p-4 text-white`}>
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6" />
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm leading-tight">GAT-B Advisor</h3>
            <span className="text-xs opacity-90">Powered by Gemini AI</span>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-full p-1 hover:bg-white/20 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 space-y-4">
            <Bot className="h-12 w-12 text-slate-400" />
            <div className="space-y-2">
              <p className="font-medium text-slate-700 dark:text-slate-300">Hi! I'm your GAT-B Admission Advisor.</p>
              <p className="text-sm">Tell me your score and category, and I'll help you find the best colleges based on historical cutoffs.</p>
            </div>
          </div>
        ) : (
          messages.map((m) => {
            // If the message has no content but has tool invocations, show a thinking spinner
            const isToolCall = m.role === 'assistant' && !m.content && m.toolInvocations && m.toolInvocations.length > 0;
            
            // Hide if it's completely empty and not a tool call
            if (m.role === 'assistant' && !m.content && !isToolCall) return null;
            
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    m.role === "user"
                      ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2 text-sm max-w-[85%] ${
                    m.role === "user"
                      ? `${themeGradient} text-white`
                      : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  {m.role === 'user' ? (
                    m.content
                  ) : isToolCall ? (
                    <div className="flex items-center gap-2 text-slate-500 py-1">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="italic">Thinking...</span>
                    </div>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
          <div className="flex gap-3">
             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Bot className="h-4 w-4" />
             </div>
             <div className="flex items-center rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-2">
               <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-slate-200 dark:border-slate-800 p-4"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="e.g. I scored 163 in UR..."
          className="flex-1 rounded-full border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className={`h-9 w-9 shrink-0 rounded-full ${themeGradient} text-white`}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
