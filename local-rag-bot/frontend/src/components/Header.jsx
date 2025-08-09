import React, { useState } from 'react';
import { Menu, Bot, Upload, Plus, X, Trash2 } from 'lucide-react';

const Header = ({ 
  onToggleSidebar,
  availableModels,
  selectedModel,
  setSelectedModel,
  documents,
  onUploadFile,
  onDeleteDocument,
  fileInputRef
}) => {
  const [showDocuments, setShowDocuments] = useState(false);
  const [showModels, setShowModels] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">StarRAG Bot</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowModels(!showModels)}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
            >
              <span>{selectedModel}</span>
              <svg className={`w-4 h-4 transition-transform ${showModels ? 'rotate-180' : ''}`}>
                <path stroke="currentColor" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showModels && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                {availableModels.map(model => (
                  <button
                    key={model}
                    onClick={() => {
                      setSelectedModel(model);
                      setShowModels(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      selectedModel === model ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDocuments(!showDocuments)}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Documents"
            >
              <Upload className="w-5 h-5 text-gray-600" />
            </button>
            {showDocuments && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Documents</h3>
                  <button onClick={() => setShowDocuments(false)} className="text-gray-400 hover:text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {documents.length === 0 ? (
                    <p className="text-sm text-gray-500 py-2">No documents</p>
                  ) : (
                    documents.map(doc => (
                      <div key={doc.id} className="flex justify-between items-center group">
                        <span className="text-sm truncate">{doc.filename}</span>
                        <button
                          onClick={() => onDeleteDocument(doc.id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 w-full flex items-center justify-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md"
                >
                  <Plus className="w-4 h-4" />
                  Add documents
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.pdf,.docx"
                  onChange={onUploadFile}
                  className="hidden"
                  multiple
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;