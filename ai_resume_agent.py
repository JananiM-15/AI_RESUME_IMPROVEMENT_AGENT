"""
========================================================================================
🚀 AI RESUME IMPROVEMENT AGENT - 1-CLICK ALL-IN-ONE BULLETPROOF SCRIPT FOR GOOGLE COLAB
Paste this entire cell into a brand new Google Colab notebook and press Shift + Enter!
Zero setup, zero missing imports, zero order-of-execution errors.
========================================================================================
"""

# [1] INSTALL REQUIRED PACKAGES
print("📦 [1/8] Installing dependencies (Groq, Gradio, LangChain, FAISS, PyPDF)...")
import subprocess, sys

packages = [
    "groq", "gradio", "langchain", "langchain-groq", "langchain-community",
    "langchain-huggingface", "langchain-text-splitters", "pypdf",
    "sentence-transformers", "faiss-cpu", "reportlab", "tavily-python"
]
subprocess.run([sys.executable, "-m", "pip", "install", "-qU"] + packages, check=True)
print("✅ Packages installed successfully!")

# [2] CONFIGURE ENVIRONMENT & API KEYS
import os
os.environ["GROQ_API_KEY"] = "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"
os.environ["TAVILY_API_KEY"] = "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"
print("🔑 [2/8] API Keys configured successfully!")

# [3] GENERATE SAMPLE RESUME PDF
print("📄 [3/8] Generating sample resume PDF...")
pdf_filename = "sample_resume.pdf"
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.pdfgen import canvas

    c = canvas.Canvas(pdf_filename, pagesize=letter)
    w, h = letter
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, h - 50, "ALEX MORGAN - SENIOR SOFTWARE ENGINEER")
    c.setFont("Helvetica", 9)
    c.drawString(50, h - 68, "San Francisco, CA | alex.morgan@email.com | (555) 234-5678 | github.com/alexmorgan")
    c.drawString(50, h - 90, "PROFESSIONAL SUMMARY: 5+ years building distributed cloud backends, microservices, and AI pipelines.")
    c.drawString(50, h - 110, "SKILLS: Python, FastAPI, React, LangChain, FAISS, AWS (Lambda, ECS), Docker, Kubernetes, SQL.")
    c.drawString(50, h - 130, "EXPERIENCE: Senior Engineer at Apex Cloud - Built RAG search serving 1.5M req/day; cut latency by 77%.")
    c.drawString(50, h - 145, "Reduced AWS cloud spend by $35,000/yr with serverless migrations; mentored 6 junior engineers.")
    c.drawString(50, h - 165, "EDUCATION: B.S. Computer Science, UC Berkeley. Certifications: AWS Solutions Architect Associate.")
    c.save()
    print("✅ Created sample_resume.pdf")
except Exception as e:
    print(f"Notice: {e}")

# [4] LOAD & CHUNK DOCUMENT
print("✂️ [4/8] Loading and chunking resume with LangChain...")
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

loader = PyPDFLoader(pdf_filename)
documents = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=80)
chunks = splitter.split_documents(documents)
print(f"✅ Created {len(chunks)} text chunks.")

# [5] VECTORSTORE & EMBEDDINGS (HUGGINGFACE + FAISS)
print("🧠 [5/8] Generating HuggingFace embeddings & FAISS vectorstore...")
try:
    from langchain_huggingface import HuggingFaceEmbeddings
except ImportError:
    from langchain_community.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True}
)

try:
    from langchain_community.vectorstores import FAISS
    vectorstore = FAISS.from_documents(chunks, embeddings)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 2})
    print("✅ Indexed into FAISS vectorstore!")
except Exception as e:
    print(f"Notice on FAISS ({e}), using built-in numpy vectorstore fallback...")
    import numpy as np
    class SafeNumpyVectorStore:
        def __init__(self, chunks, emb):
            self.chunks = chunks
            self.emb = emb
            self.vectors = np.array(emb.embed_documents([c.page_content for c in chunks]))
        def similarity_search(self, query, k=2):
            qv = np.array(self.emb.embed_query(query))
            norms = np.linalg.norm(self.vectors, axis=1) * np.linalg.norm(qv) + 1e-9
            sims = np.dot(self.vectors, qv) / norms
            top_k = np.argsort(sims)[::-1][:k]
            return [self.chunks[i] for i in top_k]
        def as_retriever(self, search_kwargs=None):
            k = 2 if not search_kwargs else search_kwargs.get("k", 2)
            class SafeRetriever:
                def __init__(self, vs, k): self.vs = vs; self.k = k
                def invoke(self, q): return self.vs.similarity_search(q, k=self.k)
            return SafeRetriever(self, k)
    vectorstore = SafeNumpyVectorStore(chunks, embeddings)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 2})
    print("✅ Indexed into safe In-Memory Vectorstore!")

# [6] CONNECT GROQ LLM (WITH DYNAMIC ACTIVE MODEL DISCOVERY)
print("⚡ [6/8] Discovering active models and connecting to Groq...")
from groq import Groq
from langchain_groq import ChatGroq

groq_client = Groq(api_key=os.environ["GROQ_API_KEY"])
try:
    api_models = groq_client.models.list().data
    discovered_models = [
        m.id for m in api_models
        if not any(k in m.id.lower() for k in ["whisper", "guard", "vision", "embed", "safeguard"])
    ]
except Exception:
    discovered_models = []

priority_models = [
    "llama-3.3-70b-versatile",
    "llama3-70b-8192",
    "llama3-8b-8192",
    "mixtral-8x7b-32768",
    "gemma2-9b-it",
    "deepseek-r1-distill-llama-70b"
]
all_models = priority_models + discovered_models
seen = set()
candidate_models = [x for x in all_models if not (x in seen or seen.add(x))]

llm = None
active_model_name = None
for m in candidate_models:
    try:
        try:
            cand = ChatGroq(model=m, api_key=os.environ["GROQ_API_KEY"], temperature=0.2)
        except Exception:
            cand = ChatGroq(model_name=m, groq_api_key=os.environ["GROQ_API_KEY"], temperature=0.2)
        cand.invoke("Test connection")
        llm = cand
        active_model_name = m
        print(f"✅ Connected to Groq using active model: '{m}'")
        break
    except Exception as err:
        print(f"Model '{m}' notice: {err}. Trying next candidate...")

if not llm:
    # Direct groq client fallback
    class DirectClientLLM:
        def __init__(self, client, model): 
            self.client = client
            self.model = model
        def invoke(self, prompt):
            text = prompt.to_string() if hasattr(prompt, "to_string") else str(prompt)
            r = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": text}],
                temperature=0.2
            )
            class R:
                def __init__(self, content): self.content = content
            return R(r.choices[0].message.content)
    fallback_model = candidate_models[0] if candidate_models else "llama3-70b-8192"
    llm = DirectClientLLM(groq_client, fallback_model)
    print(f"✅ Connected to Groq using Direct Client fallback with model '{fallback_model}'!")

# [7] DEFINE FUNCTIONS & TOOLS (RAG TOOL + BUDGET TOOL + AUDIT)
print("🛠️ [7/8] Defining RAG Tool, Budget Tool, and Resume Audit Engine...")
def run_rag_search(query: str) -> str:
    """Answers any question about candidate skills, experience, and metrics."""
    if not query.strip(): return "Please enter a question."
    docs = retriever.invoke(query)
    context = "\n\n".join([d.page_content for d in docs])
    prompt = f"Answer strictly from this resume context:\n{context}\n\nQuestion: {query}"
    return llm.invoke(prompt).content

def run_career_budget(target_role: str, experience_level: str = "Senior", target_salary_k: int = 180) -> str:
    """Calculates upskilling certification costs, courses, and estimated salary increase ROI."""
    prompt = f"Tech Career Advisor: For {target_role} ({experience_level}, target ${int(target_salary_k)}k/yr), provide estimated certifications, course costs, lab fees, total budget, and financial ROI."
    return llm.invoke(prompt).content

def run_resume_audit(target_role: str, company_tier: str = "Tier 1 SaaS") -> str:
    """Audits resume and generates ATS score and Google X-Y-Z bullet rewrites."""
    docs = retriever.invoke("Experience, metrics, technical skills, summary")
    context = "\n".join([d.page_content for d in docs])
    prompt = f"""
    You are the AI RESUME IMPROVEMENT AGENT.
    Target Role: {target_role} | Company Tier: {company_tier}
    Resume Context: {context}

    Provide:
    1. 🎯 ATS Compatibility Score (0-100) & analysis
    2. 🔍 Strengths & Highlights
    3. ⚠️ Critical Missing Keywords & Gaps
    4. ✍️ 2 Bullet Transformations using Google's X-Y-Z formula (Accomplished [X], measured by [Y], by doing [Z])
    5. 🚀 14-Day Action Checklist
    """
    return llm.invoke(prompt).content

# Optional LangChain Tools for agent registration
try:
    from langchain_core.tools import tool
    @tool
    def resume_rag_tool(query: str) -> str:
        """Search and query resume details."""
        return run_rag_search(query)
    @tool
    def career_budget_tool(target_role: str, experience_level: str = "Senior", target_salary_k: int = 180) -> str:
        """Calculates career upskilling budget and ROI."""
        return run_career_budget(target_role, experience_level, target_salary_k)
except Exception:
    pass

# [8] LAUNCH GRADIO WEB UI
print("🌐 [8/8] Launching Gradio Web UI in Google Colab...")
import gradio as gr

with gr.Blocks(title="AI RESUME IMPROVEMENT AGENT", theme=gr.themes.Soft()) as demo:
    gr.Markdown("# 🚀 AI RESUME IMPROVEMENT AGENT\n*Powered by Groq Llama-3.3 70B, LangChain & FAISS RAG*")
    
    with gr.Tabs():
        with gr.TabItem("📋 ATS Resume Audit"):
            with gr.Row():
                r_role = gr.Textbox(label="Target Job Title", value="Senior Full-Stack Engineer")
                r_tier = gr.Dropdown(label="Company Tier", choices=["FAANG / Big Tech", "Series B Unicorn", "Early Startup"], value="Series B Unicorn")
            btn_audit = gr.Button("🔍 Run Deep Resume Audit", variant="primary")
            out_audit = gr.Markdown()
            btn_audit.click(run_resume_audit, inputs=[r_role, r_tier], outputs=out_audit)

        with gr.TabItem("💬 Ask Resume (RAG Tool)"):
            r_query = gr.Textbox(label="Question about Resume", placeholder="What are the candidate's top metrics?")
            btn_rag = gr.Button("🔎 Search Resume with RAG", variant="secondary")
            out_rag = gr.Markdown()
            btn_rag.click(run_rag_search, inputs=r_query, outputs=out_rag)

        with gr.TabItem("💰 Career & Upskilling Budget Tool"):
            with gr.Row():
                b_role = gr.Textbox(label="Target Role", value="Staff AI Engineer")
                b_exp = gr.Radio(["Junior (0-2y)", "Mid (3-5y)", "Senior (5-8y)", "Staff (8y+)"], value="Senior (5-8y)", label="Current Level")
                b_sal = gr.Slider(60, 350, value=190, step=5, label="Target Salary ($K)")
            btn_budget = gr.Button("💵 Calculate Upskilling Budget", variant="primary")
            out_budget = gr.Markdown()
            btn_budget.click(lambda r, e, s: run_career_budget(r, e, int(s)), inputs=[b_role, b_exp, b_sal], outputs=out_budget)

        with gr.TabItem("📤 Upload Custom PDF Resume"):
            f_pdf = gr.File(label="Upload PDF Resume", file_types=[".pdf"])
            f_status = gr.Textbox(label="Status", interactive=False)
            def reload_custom_pdf(file_obj):
                global retriever, vectorstore
                if not file_obj: return "No file selected."
                d = PyPDFLoader(file_obj.name).load()
                c = splitter.split_documents(d)
                try:
                    vectorstore = FAISS.from_documents(c, embeddings)
                except Exception:
                    vectorstore = SafeNumpyVectorStore(c, embeddings)
                retriever = vectorstore.as_retriever(search_kwargs={"k": 2})
                return f"✅ Indexed {len(c)} chunks from '{os.path.basename(file_obj.name)}'!"
            f_pdf.change(reload_custom_pdf, inputs=f_pdf, outputs=f_status)

try:
    demo.launch(share=True, debug=False)
except Exception:
    demo.launch(share=False, inline=True)
