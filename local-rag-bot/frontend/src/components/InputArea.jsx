import React from 'react';
import { Send } from 'lucide-react';

const InputArea = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isLoading
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto p-4">
        <div className="relative">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask StarRAG anything..."
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            rows="1"
            disabled={isLoading}
            style={{ minHeight: '52px', maxHeight: '200px' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="absolute right-2 bottom-2 p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white rounded-md transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <p className="text-xs text-gray-500">
            StarRAG Bot - Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputArea;