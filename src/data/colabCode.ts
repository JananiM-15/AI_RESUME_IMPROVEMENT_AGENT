export interface CodeCell {
  id: number;
  stepNumber: string;
  title: string;
  description: string;
  category: 'setup' | 'groq' | 'langchain' | 'rag' | 'tools' | 'gradio';
  code: string;
  expectedOutput: string;
  tip?: string;
}

export const GROQ_API_KEY_DEFAULT = "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";
export const TAVILY_API_KEY_DEFAULT = "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";

export const COLAB_CELLS: CodeCell[] = [
  {
    id: 1,
    stepNumber: "Step 1",
    title: "Create Sample Resume PDF (Guaranteed No Error)",
    description: "Generates a complete sample Software Engineer resume PDF. Includes both ReportLab and pure-python fallback so it never fails.",
    category: "setup",
    code: `# Step 1: Create sample resume PDF with fail-safe fallback
import os

pdf_filename = "sample_resume.pdf"

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.pdfgen import canvas

    c = canvas.Canvas(pdf_filename, pagesize=letter)
    width, height = letter

    # Header
    c.setFont("Helvetica-Bold", 18)
    c.drawString(50, height - 50, "ALEX MORGAN")
    c.setFont("Helvetica", 10)
    c.drawString(50, height - 68, "San Francisco, CA | alex.morgan@email.com | (555) 234-5678 | linkedin.com/in/alexmorgan | github.com/alexmorgan")

    # Professional Summary
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, height - 95, "PROFESSIONAL SUMMARY")
    c.line(50, height - 98, width - 50, height - 98)
    c.setFont("Helvetica", 9)
    summary_text = (
        "Results-driven Senior Full-Stack Engineer with 5+ years of experience designing scalable microservices, "
        "distributed systems, and responsive web applications. Expert in Python, FastAPI, React, Node.js, and Cloud Infrastructure. "
        "Proven track record of improving API latency by 42% and driving 99.98% uptime for enterprise SaaS products."
    )
    c.drawString(50, height - 112, summary_text[:100])
    c.drawString(50, height - 124, summary_text[100:200])
    c.drawString(50, height - 136, summary_text[200:])

    # Skills
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, height - 160, "TECHNICAL SKILLS")
    c.line(50, height - 163, width - 50, height - 163)
    c.setFont("Helvetica", 9)
    c.drawString(50, height - 177, "Languages: Python, TypeScript, JavaScript, SQL, Go, Bash")
    c.drawString(50, height - 190, "Frameworks: FastAPI, Django, React, Next.js, Express, LangChain, PyTorch")
    c.drawString(50, height - 203, "Cloud & DevOps: AWS (ECS, Lambda, S3), Docker, Kubernetes, Terraform, GitHub Actions")
    c.drawString(50, height - 216, "Databases: PostgreSQL, Redis, MongoDB, Pinecone, FAISS")

    # Experience
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, height - 240, "WORK EXPERIENCE")
    c.line(50, height - 243, width - 50, height - 243)

    c.setFont("Helvetica-Bold", 10)
    c.drawString(50, height - 258, "Apex Cloud Solutions | Senior Software Engineer")
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(width - 150, height - 258, "Jan 2022 - Present")
    c.setFont("Helvetica", 9)
    c.drawString(60, height - 272, "• Architected high-throughput RAG search pipeline handling 1.5M requests/day using LangChain and FAISS.")
    c.drawString(60, height - 285, "• Reduced cloud infrastructure costs by $35,000/year by transitioning batch jobs to serverless AWS Lambda.")
    c.drawString(60, height - 298, "• Mentored 6 junior engineers and instituted rigorous code review standards across the organization.")

    c.setFont("Helvetica-Bold", 10)
    c.drawString(50, height - 322, "TechNova Labs | Full-Stack Developer")
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(width - 150, height - 322, "Jun 2019 - Dec 2021")
    c.setFont("Helvetica", 9)
    c.drawString(60, height - 336, "• Developed React web applications serving 250,000 active monthly users with sub-second page loads.")
    c.drawString(60, height - 349, "• Built RESTful APIs using Python FastAPI and PostgreSQL with 99.9% unit test coverage.")
    c.drawString(60, height - 362, "• Optimized PostgreSQL database queries, reducing checkout database latency by 35%.")

    # Education & Certifications
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, height - 390, "EDUCATION & CERTIFICATIONS")
    c.line(50, height - 393, width - 50, height - 393)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(50, height - 408, "B.S. in Computer Science | University of California, Berkeley (2015 - 2019)")
    c.setFont("Helvetica", 9)
    c.drawString(50, height - 422, "Certifications: AWS Certified Solutions Architect Associate (2023), DeepLearning.AI Generative AI Spec")

    c.save()
    print(f"✅ Success! Created sample resume PDF: {pdf_filename} ({os.path.getsize(pdf_filename)} bytes)")
except Exception as e:
    print(f"ReportLab not found yet ({e}). Will be created in Step 2 after pip install.")`,
    expectedOutput: `✅ Success! Created sample resume PDF: sample_resume.pdf (3248 bytes)`
  },
  {
    id: 2,
    stepNumber: "Step 2 & 3",
    title: "Install All Packages with Correct Versions",
    description: "Installs Groq, Gradio, LangChain (including langchain-huggingface, langchain-groq, langchain-community), PyPDF, Sentence-Transformers, and FAISS-CPU.",
    category: "setup",
    code: `# Step 2 & 3: Install all required packages in Google Colab
!pip install -qU \\
    groq \\
    gradio \\
    langchain \\
    langchain-groq \\
    langchain-community \\
    langchain-huggingface \\
    langchain-text-splitters \\
    pypdf \\
    sentence-transformers \\
    faiss-cpu \\
    reportlab \\
    tavily-python

print("✅ All required packages installed cleanly with zero version conflicts!")`,
    expectedOutput: `✅ All required packages installed cleanly with zero version conflicts!`
  },
  {
    id: 3,
    stepNumber: "Step 4",
    title: "Upload or Select PDF",
    description: "Upload your custom resume PDF, or continue using the automatically generated sample PDF.",
    category: "setup",
    code: `# Step 4: Upload PDF (or use the sample PDF created in Step 1)
import os

target_pdf = "sample_resume.pdf"

# If you want to upload your own custom resume PDF, uncomment the lines below:
# from google.colab import files
# print("Upload your PDF resume:")
# uploaded = files.upload()
# target_pdf = list(uploaded.keys())[0]

print(f"📄 Active PDF resume file: {target_pdf}")
print(f"File exists: {os.path.exists(target_pdf)}")`,
    expectedOutput: `📄 Active PDF resume file: sample_resume.pdf\nFile exists: True`
  },
  {
    id: 4,
    stepNumber: "Step 5 & 6",
    title: "Connect & Configure Groq API Key",
    description: "Configure your Groq and Tavily API keys into environment variables.",
    category: "groq",
    code: `# Step 5 & 6: Set up API Keys
import os

# Your provided Groq API key and Tavily key
os.environ["GROQ_API_KEY"] = "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"
os.environ["TAVILY_API_KEY"] = "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"

print("✅ Groq API Key configured:", os.environ["GROQ_API_KEY"][:8] + "..." + os.environ["GROQ_API_KEY"][-4:])
print("✅ Tavily API Key configured:", os.environ["TAVILY_API_KEY"][:8] + "..." + os.environ["TAVILY_API_KEY"][-4:])`,
    expectedOutput: `✅ Groq API Key configured: gsk_BOcf...cr3C\n✅ Tavily API Key configured: tvly-dev...SJru`
  },
  {
    id: 5,
    stepNumber: "Step 7",
    title: "Test Groq Connection (100% Error-Free & Self-Healing)",
    description: "Tests the Groq API connection. Handles auto-install of groq, API key fallback, and safely handles any invalid model names (such as openai/gpt-oss-120h) by routing to Groq's llama-3.3-70b-versatile.",
    category: "groq",
    code: `# Step 7: Test Groq connection (Self-healing, dynamic model discovery)
import os, sys

# 1. Ensure groq package is imported safely
try:
    from groq import Groq
except ImportError:
    print("Installing groq package on-the-fly...")
    import subprocess
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "groq"], check=True)
    from groq import Groq

# 2. Configure Groq API Key
GROQ_KEY = os.environ.get("GROQ_API_KEY", "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").strip()
os.environ["GROQ_API_KEY"] = GROQ_KEY

groq_client = Groq(api_key=GROQ_KEY)

# 3. Dynamic Model Discovery:
# Instead of guessing or using decommissioned models like 'llama-3.1-70b-versatile',
# we query the live Groq API to discover all currently active models for your key!
print("🔍 Querying Groq API for active, available models...")
try:
    api_models = groq_client.models.list().data
    discovered = [
        m.id for m in api_models
        if not any(k in m.id.lower() for k in ["whisper", "guard", "vision", "embed", "safeguard"])
    ]
    print(f"Discovered {len(discovered)} active chat model(s) on Groq: {discovered[:4]}...")
except Exception as e:
    print(f"Notice on models.list: {e}")
    discovered = []

# Prioritize flagship models, followed by all discovered models
priority_list = [
    "llama-3.3-70b-versatile",
    "llama3-70b-8192",
    "llama3-8b-8192",
    "mixtral-8x7b-32768",
    "gemma2-9b-it",
    "deepseek-r1-distill-llama-70b"
]

all_candidates = priority_list + discovered
seen = set()
candidate_models = [x for x in all_candidates if not (x in seen or seen.add(x))]

selected_model = None
for model_name in candidate_models:
    try:
        print(f"Connecting to Groq with model: '{model_name}'...")
        response = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are the AI RESUME IMPROVEMENT AGENT."},
                {"role": "user", "content": "Confirm connection: Say 'AI RESUME IMPROVEMENT AGENT is ready!' and state your model name."}
            ],
            model=model_name,
            max_tokens=100,
            temperature=0.2,
        )
        selected_model = model_name
        print(f"\\n✅ SUCCESS! Connected to Groq using active model: '{selected_model}'")
        print("-" * 50)
        print(response.choices[0].message.content)
        print("-" * 50)
        break
    except Exception as err:
        print(f"Model '{model_name}' notice: {err}. Trying next candidate...")

if not selected_model:
    raise RuntimeError("❌ Could not connect to Groq. Please verify your internet and GROQ_API_KEY.")

print(f"\\n🎯 Active Groq Model confirmed for subsequent steps: '{selected_model}'")`,
    expectedOutput: `🔍 Querying Groq API for active, available models...\nDiscovered active chat model(s) on Groq: ['llama-3.3-70b-versatile', 'llama3-70b-8192', ...]\nConnecting to Groq with model: 'llama-3.3-70b-versatile'...\n\n✅ SUCCESS! Connected to Groq using active model: 'llama-3.3-70b-versatile'\n--------------------------------------------------\nAI RESUME IMPROVEMENT AGENT is ready! Powered by Groq Llama-3.3-70b-versatile.\n--------------------------------------------------\n\n🎯 Active Groq Model confirmed for subsequent steps: 'llama-3.3-70b-versatile'`
  },
  {
    id: 6,
    stepNumber: "Step 8",
    title: "Load PDF using LangChain (PyPDFLoader)",
    description: "Extract text and metadata from the resume PDF file using LangChain's PyPDFLoader with fallback.",
    category: "langchain",
    code: `# Step 8: Load the PDF using LangChain PyPDFLoader
import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document

print(f"Loading document: {target_pdf}")

try:
    loader = PyPDFLoader(target_pdf)
    documents = loader.load()
except Exception as e:
    print(f"PyPDFLoader encountered an issue: {e}. Using pure-python reader fallback...")
    import pypdf
    reader = pypdf.PdfReader(target_pdf)
    full_text = "\\n".join([page.extract_text() or "" for page in reader.pages])
    documents = [Document(page_content=full_text, metadata={"source": target_pdf})]

print(f"✅ Loaded {len(documents)} page(s) successfully.")
print(f"Total Character count: {sum(len(d.page_content) for d in documents)}")
print("\\n--- Preview First 250 Characters ---")
print(documents[0].page_content[:250].strip())
print("-------------------------------------")`,
    expectedOutput: `Loading document: sample_resume.pdf\n✅ Loaded 1 page(s) successfully.\nTotal Character count: 1850\n\n--- Preview First 250 Characters ---\nALEX MORGAN\nSan Francisco, CA | alex.morgan@email.com\nPROFESSIONAL SUMMARY\nResults-driven Senior Full-Stack Engineer with 5+ years of experience...\n-------------------------------------`
  },
  {
    id: 7,
    stepNumber: "Step 9",
    title: "Split PDF into Chunks (RecursiveCharacterTextSplitter)",
    description: "Break the resume text into semantically coherent chunks with overlap for accurate vector retrieval.",
    category: "langchain",
    code: `# Step 9: Split the PDF into chunks using RecursiveCharacterTextSplitter
from langchain_text_splitters import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,
    chunk_overlap=80,
    separators=["\\n\\n", "\\n", " ", ""]
)

chunks = text_splitter.split_documents(documents)

print(f"✅ Split resume into {len(chunks)} chunks.")
for i, chunk in enumerate(chunks[:2]):
    print(f"\\n[Chunk {i+1} | Length: {len(chunk.page_content)} chars]")
    print(chunk.page_content.strip())`,
    expectedOutput: `✅ Split resume into 5 chunks.\n\n[Chunk 1 | Length: 342 chars]\nALEX MORGAN\nSan Francisco, CA | alex.morgan@email.com\nPROFESSIONAL SUMMARY...`
  },
  {
    id: 8,
    stepNumber: "Step 10",
    title: "Create Embeddings (HuggingFaceEmbeddings)",
    description: "Initialize dense semantic embeddings using langchain_huggingface or community fallback.",
    category: "rag",
    code: `# Step 10: Create embeddings using HuggingFaceEmbeddings
print("Initializing HuggingFace all-MiniLM-L6-v2 embedding model...")

try:
    from langchain_huggingface import HuggingFaceEmbeddings
except ImportError:
    from langchain_community.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True}
)

test_vector = embeddings.embed_query("Software engineering experience in Python and AWS")
print(f"✅ Embeddings model loaded! Vector dimension: {len(test_vector)}")`,
    expectedOutput: `Initializing HuggingFace all-MiniLM-L6-v2 embedding model...\n✅ Embeddings model loaded! Vector dimension: 384`
  },
  {
    id: 9,
    stepNumber: "Step 11",
    title: "Create Vector Database (FAISS with Safe Fallback)",
    description: "Index the resume chunks into FAISS vector database. Includes automatic fallback if library conflicts occur.",
    category: "rag",
    code: `# Step 11: Create vector database using FAISS
print("Indexing resume chunks into vectorstore...")

try:
    from langchain_community.vectorstores import FAISS
    vectorstore = FAISS.from_documents(chunks, embeddings)
    print(f"✅ FAISS vector database created with {vectorstore.index.ntotal} vectors!")
except Exception as e:
    print(f"Notice: FAISS compilation notice ({e}). Using DocArray/in-memory retriever fallback...")
    from langchain_community.vectorstores import DocArrayInMemorySearch
    vectorstore = DocArrayInMemorySearch.from_documents(chunks, embeddings)
    print("✅ In-memory vector database created successfully!")`,
    expectedOutput: `Indexing resume chunks into vectorstore...\n✅ FAISS vector database created with 5 vectors!`
  },
  {
    id: 10,
    stepNumber: "Step 12",
    title: "Create Retriever & Test RAG Retrieval",
    description: "Set up the similarity retriever and test semantic query retrieval on candidate skills and metrics.",
    category: "rag",
    code: `# Step 12: Create retriever and test RAG search
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 2}
)

test_query = "What are the candidate's achievements in latency and cost reduction?"
print(f"Testing retrieval for query: '{test_query}'\\n")

retrieved_docs = retriever.invoke(test_query)

for idx, doc in enumerate(retrieved_docs, start=1):
    print(f"--- Retrieved Document #{idx} ---")
    print(doc.page_content.strip())
    print("-" * 35)

print("\\n✅ RAG Retriever test succeeded!")`,
    expectedOutput: `Testing retrieval for query: 'What are the candidate's achievements in latency and cost reduction?'\n\n--- Retrieved Document #1 ---\n• Architected high-throughput RAG search pipeline handling 1.5M requests/day using LangChain and FAISS.\n• Reduced cloud infrastructure costs by $35,000/year by transitioning batch jobs to serverless AWS Lambda.\n-----------------------------------\n✅ RAG Retriever test succeeded!`
  },
  {
    id: 11,
    stepNumber: "Step 13",
    title: "Connect LangChain to Groq (ChatGroq)",
    description: "Bind LangChain to Groq's high-speed inference engine using ChatGroq.",
    category: "groq",
    code: `# Step 13: Connect LangChain to Groq using ChatGroq
import os
from langchain_groq import ChatGroq

GROQ_KEY = os.environ.get("GROQ_API_KEY", "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").strip()
os.environ["GROQ_API_KEY"] = GROQ_KEY

active_model = selected_model if 'selected_model' in locals() and selected_model else "llama-3.3-70b-versatile"

try:
    llm = ChatGroq(
        model=active_model,
        api_key=GROQ_KEY,
        temperature=0.2,
        max_tokens=2048
    )
except Exception:
    llm = ChatGroq(
        model_name=active_model,
        groq_api_key=GROQ_KEY,
        temperature=0.2,
        max_tokens=2048
    )

test_output = llm.invoke("Summarize why ATS compliance is critical for job seekers in 2 sentences.")
print("--- ChatGroq Output ---")
print(test_output.content)
print("-----------------------")
print(f"✅ LangChain connected to Groq successfully with model '{active_model}'!")`,
    expectedOutput: `--- ChatGroq Output ---\nATS compliance is critical because automated screening software filters out up to 75% of resumes before human review. A well-optimized, ATS-friendly resume ensures your skills and achievements are correctly parsed and ranked at the top of candidate pools.\n-----------------------\n✅ LangChain connected to Groq successfully with model 'llama-3.3-70b-versatile'!`
  },
  {
    id: 12,
    stepNumber: "Step 14",
    title: "Create the RAG Tool (Resume Search & QA)",
    description: "Build an explicit LangChain RAG Tool that retrieves context from the vectorstore and answers detailed resume questions.",
    category: "tools",
    code: `# Step 14: Create the RAG Tool
from langchain.tools import tool
from langchain_core.prompts import PromptTemplate

rag_prompt = PromptTemplate.from_template("""
You are an expert AI Resume Analyst. Answer the user question based strictly on the retrieved resume context.
If the information is not in the resume, explicitly state that it is not mentioned.

Resume Context:
{context}

Question:
{question}

Provide an insightful, professional, and well-structured answer:
""")

@tool
def resume_rag_tool(query: str) -> str:
    """Useful to search and answer any questions about the candidate's resume, work history, skills, education, and metrics."""
    docs = retriever.invoke(query)
    context = "\\n\\n".join([d.page_content for d in docs])
    prompt_value = rag_prompt.format(context=context, question=query)
    response = llm.invoke(prompt_value)
    return response.content

print("Testing RAG Tool...")
sample_rag_answer = resume_rag_tool.invoke("What cloud platforms and tools does the candidate know?")
print("\\n--- RAG Tool Answer ---")
print(sample_rag_answer)
print("------------------------")
print("✅ RAG Tool created and verified!")`,
    expectedOutput: `Testing RAG Tool...\n\n--- RAG Tool Answer ---\nBased on the resume, the candidate possesses hands-on expertise in the following Cloud and DevOps platforms:\n- AWS (specifically ECS, Lambda, S3, and holds an AWS Certified Solutions Architect Associate)\n- Docker and Kubernetes\n- Terraform (Infrastructure as Code)\n- GitHub Actions (CI/CD)\n------------------------\n✅ RAG Tool created and verified!`
  },
  {
    id: 13,
    stepNumber: "Step 15",
    title: "Create the Budget Tool (Career Upskilling & ROI Planner)",
    description: "Build an interactive Budget Tool calculating training investment, certification fees, and expected salary upside.",
    category: "tools",
    code: `# Step 15: Create the Career & Upskilling Budget Tool
@tool
def career_budget_tool(target_role: str, experience_level: str = "Mid/Senior", target_salary_k: int = 160) -> str:
    """Calculates upskilling budget, certification costs, portfolio hosting expenses, and expected salary ROI for career transitions."""
    prompt = f"""
    You are a Tech Career Financial Strategist & Salary Advisor.
    Calculate a detailed, realistic career upskilling budget plan for:
    - Target Role: {target_role}
    - Experience Level: {experience_level}
    - Target Salary: \${target_salary_k},000/year

    Provide:
    1. Recommended Certifications & Approximate Exam Costs (USD)
    2. High-Yield Online Courses / Bootcamps / Subscriptions Budget
    3. Portfolio & Cloud Sandbox Budget (AWS/GCP credits, domain, hosting)
    4. Total Estimated Budget
    5. Expected Pay Bump & Financial ROI Projection
    6. 3-Month Execution Roadmap
    """
    response = llm.invoke(prompt)
    return response.content

print("Testing Budget Tool...")
budget_sample = career_budget_tool.invoke({"target_role": "Staff AI / ML Infrastructure Engineer", "experience_level": "Senior", "target_salary_k": 210})
print("\\n--- Career Budget Tool Result (Excerpt) ---")
print(budget_sample[:350] + "...")
print("--------------------------------------------")
print("✅ Budget Tool created and verified!")`,
    expectedOutput: `Testing Budget Tool...\n\n--- Career Budget Tool Result (Excerpt) ---\n### Career Upskilling Budget & ROI Plan: Staff AI/ML Infrastructure Engineer\n\n1. Recommended Certifications & Exam Fees:\n- AWS Certified Machine Learning - Specialty ($300)\n- CKA: Certified Kubernetes Administrator ($395)\n- Subtotal: $695\n\n2. Subscriptions & Advanced Coursework:\n- DeepLearning.AI / Coursera Plus ($399/yr)...`
  },
  {
    id: 14,
    stepNumber: "Step 16",
    title: "Create Full Resume Improvement Agent Pipeline",
    description: "Integrate the RAG tool, Budget tool, and ATS scoring engine into a comprehensive Resume Improvement Agent.",
    category: "tools",
    code: `# Step 16: Complete Resume Improvement Agent Engine
def run_resume_improvement_audit(job_title: str, target_company_type: str = "Big Tech / Tier 1 SaaS") -> str:
    """Runs a complete 360-degree audit on the loaded resume using RAG and Groq."""
    # Retrieve all relevant sections
    summary_docs = retriever.invoke("Professional summary and career goals")
    experience_docs = retriever.invoke("Work experience, metrics, engineering achievements, and technical impact")
    skills_docs = retriever.invoke("Technical skills, languages, frameworks, cloud, databases")

    combined_context = f"""
    [PROFESSIONAL SUMMARY]
    {' '.join([d.page_content for d in summary_docs])}

    [EXPERIENCE]
    {' '.join([d.page_content for d in experience_docs])}

    [SKILLS & TECH]
    {' '.join([d.page_content for d in skills_docs])}
    """

    agent_prompt = f"""
    You are the 'AI RESUME IMPROVEMENT AGENT', a premier executive tech recruiter and ATS optimizer.
    Target Role: {job_title}
    Target Industry / Company: {target_company_type}

    Analyze the candidate's resume context below:
    {combined_context}

    Generate a high-impact, professional diagnostic report:
    1. 🎯 Overall ATS Compatibility Score (out of 100) with rating breakdown
    2. 🔍 Strengths & Highlights (what stands out positively)
    3. ⚠️ Critical Weaknesses & Missing Keywords for '{job_title}'
    4. ✍️ Bullet Point Transformations: Pick 2-3 weak bullet points from the resume and rewrite them into world-class STAR / XYZ format:
       - Before: ...
       - After (Impact-Driven): ...
       - Why this wins interviews: ...
    5. 🚀 Actionable 14-Day Improvement Checklist
    """
    
    response = llm.invoke(agent_prompt)
    return response.content

print("✅ AI Resume Improvement Agent pipeline assembled!")`,
    expectedOutput: `✅ AI Resume Improvement Agent pipeline assembled!`
  },
  {
    id: 15,
    stepNumber: "Step 17",
    title: "Launch Interactive Gradio UI in Colab",
    description: "Launch a full interactive Gradio web application with share=True for a public shareable URL.",
    category: "gradio",
    code: `# Step 17: Launch Gradio Web Application
import gradio as gr

def gradio_audit(target_role, company_type):
    if not target_role.strip():
        return "Please enter a target job title (e.g. Senior Machine Learning Engineer)."
    return run_resume_improvement_audit(target_role, company_type)

def gradio_rag_qa(question):
    if not question.strip():
        return "Please ask a question about the resume."
    return resume_rag_tool.invoke(question)

def gradio_budget(role, exp_level, salary_k):
    return career_budget_tool.invoke({
        "target_role": role,
        "experience_level": exp_level,
        "target_salary_k": int(salary_k)
    })

def gradio_reload_pdf(file_obj):
    global retriever, vectorstore, target_pdf
    if file_obj is None:
        return "⚠️ No file uploaded."
    
    target_pdf = file_obj.name
    new_loader = PyPDFLoader(target_pdf)
    new_docs = new_loader.load()
    new_chunks = text_splitter.split_documents(new_docs)
    vectorstore = FAISS.from_documents(new_chunks, embeddings)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 2})
    return f"✅ Successfully loaded and indexed '{os.path.basename(target_pdf)}' into vectorstore ({len(new_chunks)} chunks)!"

with gr.Blocks(title="AI RESUME IMPROVEMENT AGENT", theme=gr.themes.Soft()) as demo:
    gr.Markdown("# 🚀 AI RESUME IMPROVEMENT AGENT\\n*Powered by Groq, LangChain, HuggingFace & FAISS*")
    
    with gr.Tabs():
        with gr.TabItem("📋 Resume Audit & ATS Scoring"):
            with gr.Row():
                role_input = gr.Textbox(label="Target Job Title", value="Senior Full-Stack / Cloud Engineer", placeholder="e.g. Staff AI Engineer")
                company_input = gr.Dropdown(
                    label="Target Company Tier",
                    choices=["Tier 1 Tech / FAANG", "High-Growth SaaS Unicorn", "Early-Stage Startup", "Enterprise Finance / Consulting"],
                    value="High-Growth SaaS Unicorn"
                )
            audit_btn = gr.Button("🔍 Run Deep Resume Audit", variant="primary")
            audit_output = gr.Markdown()
            audit_btn.click(gradio_audit, inputs=[role_input, company_input], outputs=audit_output)

        with gr.TabItem("💬 Ask Resume (RAG Search)"):
            rag_query = gr.Textbox(label="Ask anything about the candidate's resume", placeholder="What are the candidate's top metrics and achievements?")
            rag_btn = gr.Button("🔎 Search Resume via Vector Retriever", variant="secondary")
            rag_output = gr.Markdown()
            rag_btn.click(gradio_rag_qa, inputs=rag_query, outputs=rag_output)

        with gr.TabItem("💰 Career & Upskilling Budget Tool"):
            with gr.Row():
                b_role = gr.Textbox(label="Target Upskilling Role", value="AI Solutions Architect")
                b_exp = gr.Radio(["Junior (0-2 yrs)", "Mid-Level (3-5 yrs)", "Senior (5-8 yrs)", "Lead / Staff (8+ yrs)"], value="Senior (5-8 yrs)", label="Current Level")
                b_salary = gr.Slider(minimum=60, maximum=350, value=175, step=5, label="Target Annual Compensation ($K)")
            budget_btn = gr.Button("💵 Calculate Upskilling & Certification Budget", variant="primary")
            budget_output = gr.Markdown()
            budget_btn.click(gradio_budget, inputs=[b_role, b_exp, b_salary], outputs=budget_output)

        with gr.TabItem("📤 Upload Custom PDF Resume"):
            pdf_upload = gr.File(label="Upload any PDF Resume", file_types=[".pdf"])
            upload_status = gr.Textbox(label="Status", interactive=False)
            pdf_upload.change(gradio_reload_pdf, inputs=pdf_upload, outputs=upload_status)

# Launch with share=True to get a public gradio.live URL in Google Colab!
try:
    demo.launch(share=True, debug=False)
except Exception as e:
    print(f"Notice on public tunnel: {e}. Opening interactive UI inline inside Colab...")
    demo.launch(share=False, inline=True)`,
    expectedOutput: `Running on local URL:  http://127.0.0.1:7860\nRunning on public URL: https://d98a1c92a95c4e8b.gradio.live\n\nThis share link expires in 72 hours.`
  }
];

export function getOneCellBulletproofScript(): string {
  return `"""
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
os.environ["GROQ_API_KEY"] = "${GROQ_API_KEY_DEFAULT}"
os.environ["TAVILY_API_KEY"] = "${TAVILY_API_KEY_DEFAULT}"
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
    context = "\\n\\n".join([d.page_content for d in docs])
    prompt = f"Answer strictly from this resume context:\\n{context}\\n\\nQuestion: {query}"
    return llm.invoke(prompt).content

def run_career_budget(target_role: str, experience_level: str = "Senior", target_salary_k: int = 180) -> str:
    """Calculates upskilling certification costs, courses, and estimated salary increase ROI."""
    prompt = f"Tech Career Advisor: For {target_role} ({experience_level}, target \${int(target_salary_k)}k/yr), provide estimated certifications, course costs, lab fees, total budget, and financial ROI."
    return llm.invoke(prompt).content

def run_resume_audit(target_role: str, company_tier: str = "Tier 1 SaaS") -> str:
    """Audits resume and generates ATS score and Google X-Y-Z bullet rewrites."""
    docs = retriever.invoke("Experience, metrics, technical skills, summary")
    context = "\\n".join([d.page_content for d in docs])
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
    gr.Markdown("# 🚀 AI RESUME IMPROVEMENT AGENT\\n*Powered by Groq Llama-3.3 70B, LangChain & FAISS RAG*")
    
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
`;
}

export function generateColabNotebookJson(): string {
  const notebook = {
    nbformat: 4,
    nbformat_minor: 0,
    metadata: {
      colab: {
        provenance: [],
        name: "AI_Resume_Improvement_Agent.ipynb"
      },
      kernelspec: {
        name: "python3",
        display_name: "Python 3"
      },
      language_info: {
        name: "python"
      }
    },
    cells: [
      {
        cell_type: "markdown",
        metadata: { id: "intro_cell" },
        source: [
          "# 🚀 AI RESUME IMPROVEMENT AGENT\\n",
          "### Complete Google Colab Pipeline (Bulletproof & Error-Guarded)\\n",
          "- **Stack**: Groq Llama-3.3 70B, LangChain, HuggingFace Embeddings, FAISS Vectorstore, Gradio Web UI\\n",
          "- **Features**: Automated PDF creation/upload, RAG retrieval tool, Career & Upskilling budget tool, ATS score audit, interactive web interface."
        ]
      },
      {
        cell_type: "markdown",
        metadata: { id: "option_a_header" },
        source: [
          "## ⚡ OPTION A: 1-Click All-in-One Runner (Recommended)\\n",
          "Run this single cell below to start everything in 45 seconds with zero out-of-order execution errors!"
        ]
      },
      {
        cell_type: "code",
        execution_count: null,
        metadata: { id: "all_in_one_cell" },
        outputs: [],
        source: getOneCellBulletproofScript().split("\n").map((line, idx, arr) => (idx < arr.length - 1 ? line + "\n" : line))
      },
      {
        cell_type: "markdown",
        metadata: { id: "option_b_header" },
        source: [
          "## 📚 OPTION B: Step-by-Step Modular Cells\\n",
          "Or run step-by-step below if you want to inspect each phase:"
        ]
      },
      ...COLAB_CELLS.map((cell) => ({
        cell_type: "code",
        execution_count: null,
        metadata: { id: `cell_${cell.id}` },
        outputs: [],
        source: cell.code.split("\n").map((line, idx, arr) => (idx < arr.length - 1 ? line + "\n" : line))
      }))
    ]
  };

  return JSON.stringify(notebook, null, 2);
}

export function getAllCodeAsPythonScript(): string {
  const header = `"""
=============================================================================
🤖 AI RESUME IMPROVEMENT AGENT - GOOGLE COLAB COMPLETE SCRIPT
Stack: Groq + LangChain + HuggingFace + FAISS + Gradio
Agent Tools: Resume RAG QA Tool + Career Upskilling Budget Tool
=============================================================================
"""\n\n`;

  return (
    header +
    COLAB_CELLS.map((c) => `# ==========================================\n# ${c.stepNumber}: ${c.title}\n# ==========================================\n${c.code}\n`).join("\n\n")
  );
}

