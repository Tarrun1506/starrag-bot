import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';

const StarRAGBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('gemma3:1b');
  const [documents, setDocuments] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch available models
  const fetchModels = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/models');
      const data = await response.json();
      setAvailableModels(data.models || []);
      if (data.models?.length > 0 && !data.models.includes(selectedModel)) {
        setSelectedModel(data.models[0]);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      setAvailableModels(['mistral:latest', 'llama3.2:1b', 'gemma3:1b']);
    }
  };

  // Fetch uploaded documents
  const fetchDocuments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/documents');
      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  // Delete a document
  const deleteDocument = async (docId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/documents/${docId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setDocuments(documents.filter(doc => doc.id !== docId));
        setMessages(prev => [...prev, {
          type: 'system',
          content: '✅ Document deleted successfully',
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  // Fetch conversation history
  const fetchConversations = async () => {
    setIsLoadingConversations(true);
    try {
      const response = await fetch('http://localhost:5000/api/conversations');
      const data = await response.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
    setIsLoadingConversations(false);
  };

  // Load a specific conversation
  const loadConversationHistory = async (conversationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/conversations/${conversationId}`);
      const data = await response.json();
      
      const formattedMessages = data.conversations.flatMap(conv => [
        { type: 'user', content: conv.query, timestamp: new Date(conv.timestamp) },
        { type: 'bot', content: conv.response, sources: conv.sources, timestamp: new Date(conv.timestamp) }
      ]);
      
      setMessages(formattedMessages);
      setConversationId(conversationId);
      setSelectedConversationId(conversationId);
      fetchDocuments();
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  // Start a new chat session
  const startNewChat = () => {
    setMessages([]);
    setConversationId(null);
    setSelectedConversationId(null);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadProgress(true);
    try {
      await Promise.all(files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        return fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData
        });
      }));
      fetchDocuments();
    } catch (error) {
      console.error('Upload error:', error);
    }
    setUploadProgress(false);
    e.target.value = '';
  };

  // Send message to the bot
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { type: 'user', content: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: inputMessage,
          model: selectedModel,
          conversation_id: conversationId
        })
      });

      const data = await response.json();
      if (response.ok) {
        setConversationId(data.conversation_id);
        setSelectedConversationId(data.conversation_id);
        setMessages(prev => [...prev, {
          type: 'bot',
          content: data.response,
          sources: data.sources,
          timestamp: new Date()
        }]);
        fetchConversations();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsLoading(false);
  };

  // Initialize data
  useEffect(() => {
    fetchModels();
    fetchDocuments();
    fetchConversations();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        isLoadingConversations={isLoadingConversations}
        onNewChat={startNewChat}
        onSelectConversation={loadConversationHistory}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          availableModels={availableModels}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          documents={documents}
          onUploadFile={handleFileUpload}
          onDeleteDocument={deleteDocument}
          fileInputRef={fileInputRef}
        />

        <ChatArea messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />

        <InputArea
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default StarRAGBot;