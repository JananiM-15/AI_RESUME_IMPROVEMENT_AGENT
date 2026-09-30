import { jsPDF } from 'jspdf';

export function generateSampleResumePdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 45;

  // Header Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59); // slate-800
  doc.text('ALEX MORGAN', 45, y);

  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('San Francisco, CA  |  alex.morgan@email.com  |  (555) 234-5678  |  linkedin.com/in/alexmorgan  |  github.com/alexmorgan', 45, y);

  y += 24;

  // Section helper
  const addSectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(title, 45, y);
    y += 4;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(1);
    doc.line(45, y, pageWidth - 45, y);
    y += 14;
  };

  // Professional Summary
  addSectionHeader('PROFESSIONAL SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  const summary =
    'Results-driven Senior Full-Stack Engineer with 5+ years of experience designing scalable microservices, distributed systems, and responsive web applications. Expert in Python, FastAPI, React, Node.js, and Cloud Infrastructure. Proven track record of improving API latency by 42% and driving 99.98% uptime for enterprise SaaS products.';
  const splitSummary = doc.splitTextToSize(summary, pageWidth - 90);
  doc.text(splitSummary, 45, y);
  y += splitSummary.length * 13 + 10;

  // Technical Skills
  addSectionHeader('TECHNICAL SKILLS');
  doc.setFontSize(9);
  const skills = [
    { label: 'Languages', val: 'Python, TypeScript, JavaScript, SQL, Go, Bash' },
    { label: 'Frameworks & Libraries', val: 'FastAPI, Django, React, Next.js, Express, LangChain, PyTorch' },
    { label: 'Cloud & Infrastructure', val: 'AWS (ECS, Lambda, S3), Docker, Kubernetes, Terraform, GitHub Actions' },
    { label: 'Databases & Vector Stores', val: 'PostgreSQL, Redis, MongoDB, Pinecone, FAISS' }
  ];

  skills.forEach((s) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`${s.label}: `, 45, y);
    const labelWidth = doc.getTextWidth(`${s.label}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(s.val, 45 + labelWidth, y);
    y += 14;
  });
  y += 8;

  // Work Experience
  addSectionHeader('WORK EXPERIENCE');

  // Job 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Apex Cloud Solutions', 45, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Senior Software Engineer', 180, y);
  doc.text('Jan 2022 - Present | San Francisco, CA', pageWidth - 45 - doc.getTextWidth('Jan 2022 - Present | San Francisco, CA'), y);
  y += 14;

  const job1Bullets = [
    'Architected high-throughput RAG search pipeline handling 1.5M requests/day using LangChain and FAISS, cutting response times from 1.4s to 320ms.',
    'Reduced cloud infrastructure costs by $35,000/year by transitioning batch data processing jobs to serverless AWS Lambda.',
    'Mentored 6 junior and mid-level engineers, instituted automated CI/CD security scanning, and improved sprint velocity by 25%.'
  ];
  job1Bullets.forEach((bullet) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text('•', 52, y);
    const lines = doc.splitTextToSize(bullet, pageWidth - 110);
    doc.text(lines, 64, y);
    y += lines.length * 12 + 3;
  });

  y += 8;

  // Job 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('TechNova Labs', 45, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Full-Stack Software Developer', 145, y);
  doc.text('Jun 2019 - Dec 2021 | Berkeley, CA', pageWidth - 45 - doc.getTextWidth('Jun 2019 - Dec 2021 | Berkeley, CA'), y);
  y += 14;

  const job2Bullets = [
    'Developed core React customer portal serving 250,000 active monthly users with sub-second page loads and 99.9% uptime.',
    'Built RESTful microservices using Python FastAPI and PostgreSQL with 98% unit and integration test coverage.',
    'Optimized complex relational queries and added Redis caching layer, reducing checkout database latency by 35%.'
  ];
  job2Bullets.forEach((bullet) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text('•', 52, y);
    const lines = doc.splitTextToSize(bullet, pageWidth - 110);
    doc.text(lines, 64, y);
    y += lines.length * 12 + 3;
  });

  y += 10;

  // Education & Certifications
  addSectionHeader('EDUCATION & CERTIFICATIONS');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('B.S. in Computer Science', 45, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(' | University of California, Berkeley (Graduated 2019, GPA 3.82/4.0)', 165, y);
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Certifications:', 45, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('AWS Certified Solutions Architect – Associate (2023) | DeepLearning.AI GenAI Specialization', 115, y);

  doc.save('sample_resume.pdf');
}
