# StarRAG Bot 🌟

**A Retrieval-Augmented Generation (RAG) chatbot with document memory**, powered by Ollama and FAISS.

## Features

- **Document Memory**: Upload and query PDFs, Word docs, and text files
- **Multi-Model Support**: Switch between Gemma, Mistral, and Llama models
- **Conversation History**: Full chat history with context preservation
- **Hybrid Search**: Combines vector embeddings with keyword matching
- **Local First**: Runs entirely on your machine with Ollama

## Tech Stack

| Component       | Technology |
|-----------------|------------|
| Backend         | Python (Flask) |
| Vector Store    | FAISS |
| LLM Interface   | Ollama |
| Database        | MongoDB |
| Frontend        | React |
| Embeddings      | Sentence Transformers |

## Prerequisites

- Python 3.9+
- Node.js 16+
- MongoDB 5.0+
- Ollama (with at least one model installed)

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/starrag-bot.git
   cd starrag-bot/backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. Start the backend:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. **Upload Documents**:
   - Click the upload button in the header
   - Select PDF, DOCX, or TXT files
   - Documents are automatically processed and indexed

2. **Start Chatting**:
   - Type your question in the input box
   - StarRAG will search through your documents and generate answers

3. **Manage Conversations**:
   - View past conversations in the sidebar
   - Switch between different LLM models

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload documents |
| `/api/query` | POST | Submit queries |
| `/api/conversations` | GET | List conversations |
| `/api/models` | GET | Get available models |

## Configuration

Customize these settings in `backend/.env`:

```ini
MONGO_URI=mongodb://localhost:27017
OLLAMA_BASE_URL=http://localhost:11434
UPLOAD_FOLDER=uploads
ALLOWED_MODELS=gemma3:1b,mistral:latest,llama3.2:1b
```

## Troubleshooting

**Issue**: Ollama not responding  
**Solution**: 
```bash
ollama serve
# In another terminal:
ollama pull gemma3:1b
```

**Issue**: Document processing fails  
**Solution**: Check file formats (only PDF/DOCX/TXT supported) and ensure proper text extraction
