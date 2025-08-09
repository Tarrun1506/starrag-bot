import React from 'react';
import { Bot, User, Loader2, Copy, ThumbsUp, ThumbsDown, FileText } from 'lucide-react';

const ChatArea = ({ messages, isLoading, messagesEndRef }) => {
  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
            <Bot className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to StarRAG Bot</h2>
          <p className="text-center max-w-md text-gray-600 mb-6">
            Upload documents and ask me anything about their content!
          </p>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`group w-full border-b border-gray-200 ${
                message.type === 'user' ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="m-auto flex gap-6 p-4 text-base md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl">
                <div className="min-w-[30px]">
                  {message.type === 'user' ? (
                    <User className="w-6 h-6 text-gray-600" />
                  ) : (
                    <Bot className="w-6 h-6 text-purple-600" />
                  )}
                </div>
                <div className="prose prose-gray max-w-none flex-1">
                  <p className="text-gray-900">{message.content}</p>
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Sources
                      </h4>
                      <div className="space-y-2">
                        {message.sources.map((source, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{source}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">Helpful</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="group w-full text-gray-800 bg-gray-50 border-b border-gray-200">
              <div className="m-auto flex gap-6 p-4 text-base md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl">
                <div className="min-w-[30px]">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  <span className="text-gray-600">StarRAG is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default ChatArea;