# 🚀 AI RESUME IMPROVEMENT AGENT

An intelligent, multi-tool AI Agent built with **LangChain**, **Groq (Llama-3.3 70B)**, **HuggingFace Embeddings**, **FAISS Vector Database**, and an interactive **Gradio Web Interface** for Google Colab and web deployment.

---

## 🔗 Direct Google Colab Link

Click the link below to open and run the notebook directly in Google Colab with zero setup:

👉 **[Launch AI Resume Improvement Agent in Google Colab](https://colab.research.google.com/github/JananiM-15/AI_RESUME_IMPROVEMENT_AGENT/blob/main/AI_Resume_Improvement_Agent.ipynb)**

*(Direct URL: `https://colab.research.google.com/github/JananiM-15/AI_RESUME_IMPROVEMENT_AGENT/blob/main/AI_Resume_Improvement_Agent.ipynb`)*

---

## ⚡ How to Run in Google Colab (1-Click)

1. Open the [Direct Colab Link](https://colab.research.google.com/github/JananiM-15/AI_RESUME_IMPROVEMENT_AGENT/blob/main/AI_Resume_Improvement_Agent.ipynb).
2. In the top menu of Google Colab, click **Runtime** ➔ **Run all** (or press `Ctrl + F9` / `Cmd + F9`).
3. The notebook will automatically execute the complete end-to-end pipeline:
   - **Step 1:** Automatically installs required dependencies (`groq`, `gradio`, `langchain`, `faiss-cpu`, `pypdf`, `sentence-transformers`).
   - **Step 2:** Configures pre-set environment variables and API keys.
   - **Step 3:** Generates a professional Software Engineer sample resume PDF (`sample_resume.pdf`).
   - **Step 4:** Chunks and parses the resume document using `PyPDFLoader` and `RecursiveCharacterTextSplitter`.
   - **Step 5:** Generates sentence embeddings with `HuggingFaceEmbeddings` and builds the FAISS vector database.
   - **Step 6:** Dynamically discovers and connects to the active Groq production model (`llama-3.3-70b-versatile`).
   - **Step 7:** Registers the custom RAG Resume QA Tool, Career Upskilling Budget Tool, and 360° ATS Diagnostic Engine.
   - **Step 8:** Launches the full multi-tab Gradio Web UI with a public live shareable URL!

---

## 🌟 Key Features

1. **📄 Automated Resume Ingestion & Parsing**:
   - Generates test resumes with ReportLab or allows drag-and-drop custom PDF uploads.
   - Parses text structure using LangChain's `PyPDFLoader`.

2. **✂️ Semantic Chunking & Vector Search**:
   - Chunks text into 400-character segments with 80-character overlap.
   - Computes dense vector embeddings using `sentence-transformers/all-MiniLM-L6-v2`.
   - Indexes into `FAISS` with automatic fail-safe in-memory vector store fallback.

3. **⚡ Dynamic Groq LLM Discovery**:
   - Dynamically polls Groq API for currently active models (`llama-3.3-70b-versatile`, `llama3-70b-8192`, `mixtral-8x7b-32768`), completely eliminating `model_not_found` and `model_decommissioned` errors.

4. **🛠️ Specialized Multi-Tool Capabilities**:
   - **Resume RAG Tool:** Answers questions about candidate metrics, tech stack, and experience strictly using retrieved context.
   - **Career & Upskilling Budget Tool:** Estimates certification costs (AWS/GCP/CKA), courses, and financial ROI for target roles and salaries.
   - **360° ATS Audit Engine:** Computes an ATS score (0-100), identifies critical missing keywords, and rewrites bullet points into Google's X-Y-Z formula (*Accomplished [X], measured by [Y], by doing [Z]*).

5. **🌐 Interactive Gradio Web Dashboard**:
   - Provides a multi-tab web interface directly inside Google Colab with public URL sharing.

---

## 📁 Repository Structure

```
├── AI_Resume_Improvement_Agent.ipynb  # Complete Google Colab Jupyter Notebook
├── ai_resume_agent.py                 # 1-Click All-in-One Python script
├── README.md                          # Project documentation and direct Colab link
├── src/                               # Interactive React Studio Web Interface
│   ├── App.tsx
│   ├── components/
│   │   ├── LiveAgentSimulator.tsx     # In-browser agent playground
│   │   ├── NotebookViewer.tsx         # Cell-by-cell viewer & runner
│   │   ├── ColabGuideModal.tsx        # Visual Colab guide
│   │   └── GitHubModal.tsx            # GitHub sync helper
│   └── data/
│       └── colabCode.ts               # Notebook cell definitions & error-guards
├── sample_resume.pdf                  # Generated test resume
└── package.json
```

---

## 🔑 Configured API Keys

The notebook comes configured with API keys:
- **Groq API**: `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`
- **Tavily API**: `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`

---

## 🛠️ Tech Stack & Libraries

- **LLM**: Groq Llama-3.3 70B Versatile
- **Orchestration**: LangChain (`langchain-groq`, `langchain-huggingface`, `langchain-community`)
- **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2`
- **Vector Database**: FAISS CPU
- **UI Framework**: Gradio Blocks (`share=True`)
- **PDF Processing**: PyPDF / ReportLab
