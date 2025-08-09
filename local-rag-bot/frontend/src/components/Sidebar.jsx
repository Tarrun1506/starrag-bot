import React from 'react';
import { Plus, MessageSquare, History, Loader2 } from 'lucide-react';

const Sidebar = ({
  conversations,
  selectedConversationId,
  isLoadingConversations,
  onNewChat,
  onSelectConversation,
  sidebarOpen
}) => {
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-50 border-r border-gray-200 flex flex-col h-full transition-all duration-300 overflow-hidden`}>
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          History
        </h3>
        
        {isLoadingConversations ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-4 text-gray-400 text-sm">
            No conversations yet
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map(conv => (
              <button
                key={conv.conversation_id}
                onClick={() => onSelectConversation(conv.conversation_id)}
                className={`w-full text-left p-2 rounded-md transition-colors ${
                  selectedConversationId === conv.conversation_id
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <MessageSquare className="w-4 h-4 flex-shrink-0 text-gray-500" />
                  <span className="truncate">{conv.first_query || 'New conversation'}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;