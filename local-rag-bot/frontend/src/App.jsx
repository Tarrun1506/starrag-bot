import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Bot, User, CornerDownLeft, Loader, Book } from 'lucide-react';
import StarRAGBot from './StarRAGBot.jsx';

function App() {
  
  return (
    <>
    <StarRAGBot />
    </>
  )
  }

export default App;
