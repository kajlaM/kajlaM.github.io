import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client (will fallback if key is not configured)
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const SYSTEM_CONTEXT = `
You are Manish's personal AI assistant, an elite UX chatbot on his portfolio website.
Your purpose is to answer questions about Manish Kajla's background, projects, skills, education, and positions of responsibility.
Keep your answers professional, concise (1-3 small paragraphs), and highly formatted (use markdown bullet points where appropriate).
Align your tone with high-tech, premium Nothing OS minimalism: direct, intelligent, and clean.

Here are the facts about Manish Kajla:
- Name: Manish Kajla
- Role/Headline: Mathematics and Statistics student at IIT Kanpur and Overall Placement Coordinator. Builds immersive digital architectures, quantitative models, and machine learning solutions.
- Email: mkajla24@iitk.ac.in
- GitHub: https://github.com/gtbkajlaM
- LinkedIn: https://linkedin.com/in/Manish-Kajla
- Education: BS in Mathematics and Statistics, IIT Kanpur (2024-Present, CPI: 5.7/10). High school: Prince School Sikar (RBSE XII: 90%), Shri Dhruva Sr Ss School (RBSE X: 100%).
- Key Projects:
  1. GNN-Based Fraud Detection System (EEA IITK, Dec'25 - March'26):
     - Modeled transaction flows as a financial graph network (nodes: transactions, edges: cashflows).
     - Implemented Graph Convolutional Networks (GCN), GraphSAGE, and Graph Attention Networks (GAT) for semi-supervised node classification on a 200K+ node dataset.
     - Addressed class imbalance using Focal Loss, comparing against an XGBoost baseline.
     - Achieved Macro F1 and PR-AUC scores of ~0.92. Used GNNExplainer for transaction interpretability.
  2. DocuMind – AI Document RAG Platform (ACA IITK, June'26 - Ongoing):
     - Enterprise-grade Retrieval-Augmented Generation (RAG) platform.
     - Tech stack: Next.js, FastAPI, PostgreSQL, pgvector.
     - Features: Hybrid retrieval (vector embeddings + BM25 search), SSE-based response streaming, Google OAuth, JWT authorization, and multi-tenant data isolation.
  3. Signals to Software (EE200 Course Project, June'26 - July'26):
     - End-to-end signal processing framework.
     - Features: Image restoration (Fourier Transform, STFT, notch filtering, Sobel edge detection), beat-wise ECG arrhythmia detection, and Shazam-inspired audio fingerprinting with spectrogram peak hashing.
     - Delivered as an interactive Streamlit application.
  4. Samsung Smartphone Market Repositioning (MBA631 Course Project, June'25 - July'25):
     - Reassessed Samsung's smartphone market positioning.
     - Executed primary consumer research (60+ surveys) and designed a repositioning strategy focused on usability, trust, and everyday relevance.
- Technical Skills:
  - Programming Languages: C, C++, Python, HTML, CSS, JavaScript/TypeScript (React, Next.js), LaTeX.
  - Software & Libraries: Git, GitHub, NumPy, FastAPI, pgvector, PostgreSQL, Arduino IDE, Tinkercad, GSAP, Lenis.
- Relevant Courses: Fundamentals of Computing, Introduction to Probability Theory, Set Theory and Logic, Linear Algebra, Abstract Algebra, Financial Economics, Introduction to Management, Marketing Management, Introduction to Electronics.
- Leadership & Positions of Responsibility:
  - Overall Placement Coordinator at SPO, IIT Kanpur: Managing recruitment operations, company outreach, and student placement training.
  - Senator BT/BS Y24, Students' Senate, IIT Kanpur (April'25-Present): Represents 1200+ students, nominee to Council of Students for Hostel Affairs (CoSHA), created the HEC Guide, managed scrap collection.
  - Secretary, Robotics Club IITK (July'25-Present): Core member, represented IITK at Technoxian World Robotics Championship (Line Follower category), mentored freshmen (RoboBreak/RoboDive).
  - Secretary, President's Office, Students' Gymkhana, IIT Kanpur (June'25-Present): Bicycle auction organization (generated 4 Lakhs+ Gymkhana revenue), JEE Open House coordinator, Gymkhana Day organizer.
  - Secretary, Hospitality & Transport, Antaragni (IITK Cultural Fest): Managed hospitality and accommodation logistics for 4000+ participants across 15 hostels.

If asked questions unrelated to Manish's professional or academic profile, politely redirect the user back to asking about Manish's skills, projects, and work.
`;

// Helper to provide context-aware mock answers if Gemini API key is missing
function getMockResponse(query: string): string {
  const lowercaseQuery = query.toLowerCase();

  if (lowercaseQuery.includes('stack') || lowercaseQuery.includes('skills') || lowercaseQuery.includes('languages') || lowercaseQuery.includes('technologies')) {
    return `### Technical Skills & Stack
Manish has extensive experience building full-stack applications, quantitative ML tools, and electronics setups:
* **Languages:** C, C++, Python, JavaScript/TypeScript, HTML, CSS, LaTeX.
* **Web Architecture:** React, Next.js, FastAPI, Node.js, Tailwind CSS, shadcn/ui.
* **Database & Vector Search:** PostgreSQL, pgvector.
* **Machine Learning & Signal Processing:** GNNs (GCN, GraphSAGE, GAT), XGBoost, NumPy, SciPy, Fourier analysis (STFT).
* **Creative Coding & Motion:** GSAP (ScrollTrigger), Lenis, Canvas API.
* **Hardware:** Arduino IDE, Tinkercad, robotics prototyping.`;
  }

  if (lowercaseQuery.includes('fraud') || lowercaseQuery.includes('gnn') || lowercaseQuery.includes('detection') || lowercaseQuery.includes('network') || lowercaseQuery.includes('transaction')) {
    return `### GNN-Based Fraud Detection System
Manish developed a graph-based transaction monitoring pipeline for the Electrical Engineering Association at IIT Kanpur:
* **Graph Modeling:** Modeled transaction data as a relational graph (nodes represent transactions, edges represent monetary flows) to capture complex multi-hop cashflow dependencies.
* **Deep Learning Models:** Evaluated and compared GCN (Graph Convolutional Networks), GraphSAGE, and GAT (Graph Attention Networks) on a large dataset of over 200,000 nodes.
* **Imbalance Handling:** Utilized Focal Loss to tackle the severe class imbalance of fraudulent transactions, beating standard machine learning baselines (XGBoost).
* **Interpretability & Metrics:** Achieved a Macro F1 score of **~0.92** and PR-AUC of **0.92**, with model decisions interpreted using GNNExplainer for transparency.`;
  }

  if (lowercaseQuery.includes('documind') || lowercaseQuery.includes('rag') || lowercaseQuery.includes('document') || lowercaseQuery.includes('fastapi') || lowercaseQuery.includes('pgvector')) {
    return `### DocuMind – AI Document RAG Platform
DocuMind is an enterprise-ready Retrieval-Augmented Generation platform built by Manish for the Association of Computer Activities (ACA) at IIT Kanpur:
* **Stack:** Next.js (frontend), FastAPI (backend), PostgreSQL with pgvector (vector database).
* **Advanced Retrieval:** Implemented a hybrid retrieval system combining dense semantic embeddings with sparse BM25 keyword matching for optimal search accuracy.
* **Production Features:** Supports Server-Sent Events (SSE) for real-time streamed responses, secure Google OAuth login, JWT authorizations, and strict tenant-level data isolation to keep data secure in multi-user deployments.`;
  }

  if (lowercaseQuery.includes('placement') || lowercaseQuery.includes('spo') || lowercaseQuery.includes('coordinator')) {
    return `### Overall Placement Coordinator (SPO IIT Kanpur)
Manish serves as the **Overall Placement Coordinator** at the Students' Placement Office (SPO), IIT Kanpur:
* **Operations:** Coordinates campus recruitment drives, company communications, and scheduling operations for the entire undergraduate and postgraduate student batches.
* **Corporate Liaison:** Interfaces with national and international firms across Software Engineering, Quantitative Finance, Analytics, Consulting, and Core Engineering.
* **Student Preparation:** Leads training sessions, mock interviews, and resume verification processes to prepare student candidates for recruitment.`;
  }

  if (lowercaseQuery.includes('senator') || lowercaseQuery.includes('senate') || lowercaseQuery.includes('cosha') || lowercaseQuery.includes('hec')) {
    return `### Student Senator (IIT Kanpur)
Elected by 1,200+ undergraduate peers, Manish represents the BT/BS Y24 batch in the **Students' Senate**:
* **Council Representative:** Nominated to the Council of Students for Hostel Affairs (CoSHA), advising on residential policy and coordination.
* **HEC Guide:** Wrote the comprehensive Hall Executive Committee (HEC) Guide, detailing standard operating procedures and leadership best practices for halls of residence.
* **Campus Initiatives:** Oversaw centralized scrap collections and coordinated logistics for scrap auctions, optimization resource management on campus.`;
  }

  if (lowercaseQuery.includes('robotics') || lowercaseQuery.includes('club') || lowercaseQuery.includes('technoxian') || lowercaseQuery.includes('line follower')) {
    return `### Robotics Club Secretary (IIT Kanpur)
As Secretary of the **Robotics Club**, Manish manages core technical development and mentorship:
* **Competitions:** Represented IIT Kanpur at the Technoxian World Robotics Championship in the Line Follower robot category.
* **Mentorship:** Mentored freshers through hands-on robotics workshops, specifically leading the RoboBreak and RoboDive 2.0 projects. Guided design, hardware assembly, and code implementation of autonomous robots.`;
  }

  if (lowercaseQuery.includes('gymkhana') || lowercaseQuery.includes('bicycle') || lowercaseQuery.includes('president')) {
    return `### Students' Gymkhana (President's Office)
In his role as Secretary in the **Gymkhana President's Office**, Manish worked on several campus-wide initiatives:
* **Bicycle Auction:** Managed the logistics and process for the campus-wide lost bicycle auction, generating over **4 Lakhs INR** in revenue for the Students' Gymkhana budget.
* **JEE Open House:** Assisted in organizing orientation seminars and open houses for JEE Advanced qualifiers entering IIT Kanpur.
* **Events:** Played a key role in coordinating Gymkhana Day 2024-25 and campus Diwali celebrations.`;
  }

  if (lowercaseQuery.includes('signals') || lowercaseQuery.includes('ecg') || lowercaseQuery.includes('shazam') || lowercaseQuery.includes('arrhythmia') || lowercaseQuery.includes('ee200')) {
    return `### Signals to Software (EE200 Project)
Manish built an end-to-end digital signal processing framework for image restoration, ECG analysis, and music matching:
* **Biomedical DSP:** Implemented spectrogram-based beat-wise ECG analysis to detect arrhythmias with high correlation thresholds.
* **Audio Fingerprinting:** Engineered a Shazam-inspired audio matching system using spectrogram peak hashing, offset correlation, and custom matching logic.
* **Interactive Interface:** Packaged all signal processing pipelines (image denoisers, ECG checkers, audio matchers) into a responsive Streamlit dashboard.`;
  }

  if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('email') || lowercaseQuery.includes('connect')) {
    return `You can reach out to Manish Kajla directly through the contact details below, or use the form at the bottom of the page:
* **Email:** [mkajla24@iitk.ac.in](mailto:mkajla24@iitk.ac.in)
* **LinkedIn:** [Manish Kajla on LinkedIn](https://linkedin.com/in/Manish-Kajla)
* **GitHub:** [gtbkajlaM on GitHub](https://github.com/gtbkajlaM)`;
  }

  return `Hello! I am Manish's personal AI assistant. I can answer questions about his:
* **Projects:** GNN-based Fraud Detection, DocuMind AI RAG, Shazam Audio Matching, Samsung Repositioning.
* **Skills:** Python, C++, TS/JS, Next.js, FastAPI, PyTorch (GNNs), pgvector, PostgreSQL, Git.
* **Positions of Responsibility:** SPO Overall Placement Coordinator, Student Senator, Gymkhana Secretary, Robotics Club Secretary, Antaragni Secretary.
* **Education:** BS in Mathematics & Statistics from IIT Kanpur.

What would you like to know more about?`;
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if we have the Gemini API client configured
    if (!genAI) {
      // API Key not present; return the context-aware mock response directly
      // Introduce a slight delay to mimic natural API latency and look professional
      await new Promise((resolve) => setTimeout(resolve, 800));
      const text = getMockResponse(message);
      return NextResponse.json({ text });
    }

    // Call the Gemini model
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_CONTEXT,
    });

    // Format chat history for Gemini
    const formattedContents = [
      ...history.map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const result = await model.generateContent({
      contents: formattedContents,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.2,
      },
    });

    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Error in chatbot route:', error);
    // If Gemini fails, fallback gracefully to the mock response
    const fallbackText = getMockResponse(request.body ? String(request.body) : '');
    return NextResponse.json({ text: fallbackText });
  }
}
