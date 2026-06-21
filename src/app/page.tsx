'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
  TrendingUp,
  Activity,
  FileText
} from 'lucide-react';
import AIChatbot from '@/components/AIChatbot';
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "Samsung Smartphone Market Repositioning",
    context: "Course Project MBA631 | Prof. Amit Shukla | (June'25 - July'25)",
    objective: "Reassess Samsung's smartphone market positioning and identify opportunities to strengthen consumer relevance and emotional differentiation.",
    approach: [
      "Conducted comprehensive market and competitive analysis of Samsung smartphones across product portfolio, pricing, distribution, and promotions.",
      "Executed primary consumer research (60+ survey responses) to diagnose perception gaps between spec-led messaging and lifestyle expectations.",
      "Synthesized insights to design a repositioning strategy focused on usability, design, trust, and everyday relevance.",
      "Translated strategy into execution by conceptualizing and producing a consumer-facing advertisement aligned with the new positioning."
    ],
    impact: "Reframed Samsung smartphones from a spec-centric offering to a lifestyle-driven, emotionally resonant brand proposition."
  },
  {
    title: "GNN-Based Fraud Detection System",
    context: "Electrical Engineering Association IITK | (Dec'25 - March'26)",
    objective: "Learn and apply Machine Learning (ML), Artificial Neural Networks (ANNs), and Graph Neural Networks (GNNs) to detect illicit transactions using relational patterns in financial networks.",
    approach: [
      "Modeled transactions as a graph (nodes: transactions, edges: flows) to capture multi-hop dependencies.",
      "Implemented GCN, GraphSAGE, and GAT for semi-supervised node classification on a 200K+ node dataset.",
      "Addressed class imbalance using Focal Loss and compared performance with an XGBoost baseline."
    ],
    impact: "Achieved Macro F1 ≈ 0.92 and PR-AUC ≈ 0.92, enabling interpretable fraud detection via GNNExplainer."
  },
  {
    title: "Signals to Software",
    context: "Course project EE200 | Prof. Tushar Sandhan | (June'26 - July'26)",
    objective: "Developed an end-to-end signal processing framework for image restoration, ECG arrhythmia detection, and audio fingerprinting using frequency-domain and time-frequency analysis.",
    approach: [
      "Applied Fourier Transform, STFT, notch filtering, and Sobel edge detection for image enhancement and feature extraction.",
      "Implemented beat-wise ECG arrhythmia detection using normalized correlation and spectrogram-based analysis.",
      "Built and deployed a Shazam-inspired audio fingerprinting system using spectrogram peak detection, hash generation, and offset-based matching."
    ],
    impact: "Achieved robust multimedia and biomedical signal recognition through scalable DSP pipelines and an interactive Streamlit application."
  },
  {
    title: "DocuMind – AI Document RAG Platform",
    context: "Association of Computer activities (ACA) IITK | (June'26 - Ongoing)",
    objective: "Built an enterprise-grade Retrieval-Augmented Generation (RAG) platform enabling secure, real-time conversational search and knowledge extraction from large document repositories.",
    approach: [
      "Developed a full-stack RAG architecture using Next.js, FastAPI, PostgreSQL, and pgvector.",
      "Implemented hybrid retrieval combining vector embeddings and BM25 for accurate search.",
      "Implemented SSE-based response streaming, Google OAuth authentication, JWT authorization, and tenant-level data isolation for secure multi-user deployment."
    ],
    impact: "Enables accurate, secure, and scalable document intelligence by reducing information retrieval time and delivering context-aware answers from large unstructured knowledge bases."
  }
];

export default function Home() {
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [aboutMouse, setAboutMouse] = useState({ x: 0, y: 0 });
  const [isHoveringAbout, setIsHoveringAbout] = useState(false);

  const handleAboutMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setAboutMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Refs for elements and sections
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderNameRef = useRef<HTMLDivElement>(null);
  const navLogoPlaceholderRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const portfolioTextRef = useRef<HTMLHeadingElement>(null);
  const aboutProfileCardRef = useRef<HTMLDivElement>(null);
  const aboutPhilosophyRef = useRef<HTMLDivElement>(null);
  const skillsOrbRef = useRef<HTMLDivElement>(null);
  const skillsOrbBgRef = useRef<HTMLDivElement>(null);
  const skillCardsRef = useRef<HTMLDivElement>(null);
  const chatbotContainerRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Setup GSAP Timelines and Animations
  useEffect(() => {
    // 1. Preloader and Intro Sequence
    const preloader = preloaderRef.current;
    const preloaderName = preloaderNameRef.current;
    const navLogoPlaceholder = navLogoPlaceholderRef.current;
    const navbar = navbarRef.current;
    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.stop(); // Disable scrolling during intro
    }

    const introTL = gsap.timeline({
      onComplete: () => {
        setPreloaderActive(false);
        if (lenis) {
          lenis.start();
        }
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }
    });

    if (preloader && preloaderName && navLogoPlaceholder && navbar) {
      // Step A: Name fades in center
      introTL.fromTo(preloaderName,
        { opacity: 0, scale: 1.15 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
      );

      // Step B: Short pause for dramatic effect
      introTL.to({}, { duration: 0.5 });

      // Step C: Animate name text from center to navbar logo position
      introTL.to(preloaderName, {
        x: () => {
          const logoRect = navLogoPlaceholder.getBoundingClientRect();
          const nameRect = preloaderName.getBoundingClientRect();
          return logoRect.left - nameRect.left;
        },
        y: () => {
          const logoRect = navLogoPlaceholder.getBoundingClientRect();
          const nameRect = preloaderName.getBoundingClientRect();
          return logoRect.top - nameRect.top;
        },
        scale: () => {
          const logoRect = navLogoPlaceholder.getBoundingClientRect();
          const nameRect = preloaderName.getBoundingClientRect();
          return logoRect.width / nameRect.width;
        },
        transformOrigin: '0% 0%',
        duration: 1.4,
        ease: 'power4.inOut'
      });

      // Step D: Lock logo and fade-in UI
      introTL.to(navLogoPlaceholder, { opacity: 1, duration: 0.1 }, '-=0.1')
        .to(preloaderName, { opacity: 0, duration: 0.1 }, '-=0.1')
        .to(navbar, { opacity: 1, pointerEvents: 'auto', duration: 0.8, ease: 'power2.out' }, '-=0.3')
        .to('.liquid-bg-container', { opacity: 0.45, duration: 1.2, ease: 'power2.out' }, '-=0.5')
        .to(preloader, { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.6');
    }

    // 2. STRICTION SECTION PINNING TIMELINES
    // Hero Section Pinning
    const heroTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=150%',
        scrub: 2,
        pin: true,
      }
    });

    const chars = document.querySelectorAll('.char');
    if (chars.length > 0) {
      heroTL
        .fromTo(chars,
          { y: '200%' },
          {
            y: '0%',
            stagger: 0.08,
            ease: 'power3.out',
            duration: 1.2
          }
        )
        .to('.scroll-indicator', {
          opacity: 0,
          duration: 0.5
        }, 0)
        .to({}, { duration: 0.4 }) // hold
        .to(chars, {
          opacity: 0,
          y: '-40%',
          scale: 0.94,
          stagger: 0.04,
          duration: 0.8,
          ease: 'power2.in'
        });
    }

    // About Section Pinning
    const aboutTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top top',
        end: '+=150%',
        scrub: 2,
        pin: true,
      }
    });

    if (aboutProfileCardRef.current && aboutPhilosophyRef.current) {
      aboutTL
        .from(aboutProfileCardRef.current, {
          xPercent: -35,
          opacity: 0,
          rotateY: -15,
          duration: 1.2,
          ease: 'power2.out'
        }, 0)
        .from(aboutPhilosophyRef.current, {
          xPercent: 35,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out'
        }, 0)
        .to({}, { duration: 0.5 }) // hold
        .to(aboutProfileCardRef.current, {
          xPercent: -15,
          opacity: 0,
          rotateY: 10,
          duration: 0.8,
          ease: 'power2.in'
        })
        .to(aboutPhilosophyRef.current, {
          xPercent: 15,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in'
        }, '<');
    }

    // Projects section has its own internal ScrollTrigger pinning, no custom page timeline needed

    // Skills Section Pinning
    const skillsTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#skills',
        start: 'top top',
        end: '+=150%',
        scrub: 2,
        pin: true,
      }
    });

    if (skillsOrbRef.current && skillsOrbBgRef.current) {
      skillsTL
        .to(skillsOrbRef.current, {
          scale: 1.35,
          borderRadius: '38% 62% 52% 48% / 48% 42% 58% 52%',
          rotate: 180,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          duration: 1.2
        })
        .to(skillsOrbBgRef.current, {
          scale: 2,
          opacity: 0.7,
          filter: 'blur(45px)',
          duration: 1.2
        }, 0);
    }

    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
      skillsTL.from(skillCards, {
        y: 80,
        opacity: 0,
        scale: 0.92,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power2.out'
      }, 0.2);
    }

    skillsTL
      .to({}, { duration: 0.4 }) // hold
      .to('.skills-wrapper', {
        opacity: 0,
        scale: 0.94,
        duration: 0.8,
        ease: 'power2.in'
      });

    // Chatbot Section Pinning
    const chatbotTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#chatbot',
        start: 'top top',
        end: '+=150%',
        scrub: 2,
        pin: true,
      }
    });

    if (chatbotContainerRef.current) {
      chatbotTL
        .from(chatbotContainerRef.current, {
          yPercent: 25,
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: 'power2.out'
        })
        .to({}, { duration: 0.5 }) // hold
        .to(chatbotContainerRef.current, {
          opacity: 0,
          scale: 0.94,
          duration: 0.8,
          ease: 'power2.in'
        });
    }

    // Contact Section Pinning
    const contactTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top top',
        end: '+=100%',
        scrub: 2,
        pin: true,
      }
    });

    if (contactCardRef.current && footerRef.current) {
      contactTL
        .from(contactCardRef.current, {
          yPercent: 30,
          opacity: 0,
          scale: 0.94,
          duration: 1.2,
          ease: 'power2.out'
        })
        .from(footerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8
        }, 0.5)
        .to({}, { duration: 0.4 }); // Hold at complete
    }

    // 3. Highlight navbar links based on scroll section
    const sections = gsap.utils.toArray('.pin-section');
    sections.forEach((sec: any) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveLink(sec.id),
        onEnterBack: () => setActiveLink(sec.id),
      });
    });

    function setActiveLink(id: string) {
      document.querySelectorAll('.nav-link').forEach((link) => {
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('text-white', 'border-b-white');
          link.classList.remove('text-zinc-400', 'border-b-transparent');
        } else {
          link.classList.remove('text-white', 'border-b-white');
          link.classList.add('text-zinc-400', 'border-b-transparent');
        }
      });
    }

    // 4. Parallax Background Blobs
    const blobs = document.querySelectorAll('.blob');
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xNorm = (clientX / window.innerWidth - 0.5) * 2;
      const yNorm = (clientY / window.innerHeight - 0.5) * 2;

      blobs.forEach((blob, idx) => {
        const factor = (idx + 1) * 30;
        gsap.to(blob, {
          x: xNorm * factor,
          y: yNorm * factor,
          duration: 2.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="relative bg-black min-h-screen text-zinc-100 overflow-x-hidden font-sans">

      {/* 1. INITIAL LOAD PRELOADER */}
      {preloaderActive && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 w-screen h-screen bg-black z-[9999] flex items-center justify-center pointer-events-none"
        >
          <div
            ref={preloaderNameRef}
            className="text-4xl md:text-6xl font-extrabold tracking-widest text-white select-none font-mono"
          >
            MANISH KAJLA
          </div>
        </div>
      )}

      {/* BACKGROUND GRADIENT BLOBS */}
      <div className="liquid-bg-container z-0" aria-hidden="true">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
      </div>

      {/* GLASSMORPHIC NAVBAR */}
      <header
        ref={navbarRef}
        className="navbar fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/10 backdrop-blur-md border-b border-border/10 opacity-0 pointer-events-none transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <a href="#hero" className="flex items-center">
            <div
              ref={navLogoPlaceholderRef}
              className="text-lg md:text-xl font-bold tracking-widest text-white select-none opacity-0 font-mono"
            >
              MANISH KAJLA
            </div>
          </a>

          <nav className="flex items-center gap-6 md:gap-8">
            <a href="#hero" className="nav-link text-xs md:text-sm uppercase tracking-wider text-zinc-400 border-b border-transparent pb-1 transition-all cursor-none">Home</a>
            <a href="#about" className="nav-link text-xs md:text-sm uppercase tracking-wider text-zinc-400 border-b border-transparent pb-1 transition-all cursor-none">About</a>
            <a href="#projects" className="nav-link text-xs md:text-sm uppercase tracking-wider text-zinc-400 border-b border-transparent pb-1 transition-all cursor-none">Projects</a>
            <a href="#skills" className="nav-link text-xs md:text-sm uppercase tracking-wider text-zinc-400 border-b border-transparent pb-1 transition-all cursor-none">Skills</a>
            <a href="#chatbot" className="nav-link text-xs md:text-sm uppercase tracking-wider text-zinc-400 border-b border-transparent pb-1 transition-all cursor-none">AI Chat</a>
            <a href="#contact" className="nav-link text-xs md:text-sm uppercase tracking-wider text-zinc-400 border-b border-transparent pb-1 transition-all cursor-none">Contact</a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-[#1F2023]/40 text-xs md:text-sm uppercase tracking-wider text-white hover:bg-[#1F2023] transition-colors cursor-none"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN VIEWPORT SCROLL WRAPPER */}
      <main className="relative z-10">

        {/* SECTION 1: HERO */}
        <section id="hero" className="scroll-section pin-section flex flex-col justify-center items-center">
          <div className="relative z-10 text-center">
            <h1
              ref={portfolioTextRef}
              className="text-[18vw] md:text-[12.75vw] font-black leading-none select-none tracking-tight flex justify-center overflow-hidden py-4"
            >
              {"PORTFOLIO".split("").map((char, index) => (
                <span key={index} className="inline-block overflow-hidden h-[1.3em]">
                  <span
                    className="char inline-block translate-y-[200%] liquid-glass-text"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 pointer-events-none transition-all duration-300">
            <span className="w-5 h-8 border-2 border-zinc-500 rounded-full flex justify-center p-1">
              <span className="w-1.5 h-2 bg-white rounded-full animate-bounce" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Scroll to explore</span>
          </div>
        </section>

        {/* SECTION 2: ABOUT ME (SPOTLIGHT REVEAL) */}
        <section
          id="about"
          className="scroll-section pin-section flex items-center relative overflow-hidden"
          onMouseMove={handleAboutMouseMove}
          onMouseEnter={() => setIsHoveringAbout(true)}
          onMouseLeave={() => setIsHoveringAbout(false)}
        >
          {/* Background Layer (The Image) */}
          <div
            className="absolute inset-0 w-full h-full select-none pointer-events-none"
            style={{
              backgroundImage: 'url(/about_background.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Overlay Layer (Pitch Black) with Spotlight Effect */}
          <div
            className="absolute inset-0 w-full h-full bg-black select-none pointer-events-none transition-opacity duration-300 z-10"
            style={{
              WebkitMaskImage: isHoveringAbout
                ? `radial-gradient(circle 250px at ${aboutMouse.x}px ${aboutMouse.y}px, transparent 0%, black 100%)`
                : 'none',
              maskImage: isHoveringAbout
                ? `radial-gradient(circle 250px at ${aboutMouse.x}px ${aboutMouse.y}px, transparent 0%, black 100%)`
                : 'none',
            }}
          />

          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-20 grid md:grid-cols-12 gap-8 items-center">
            {/* Left Glass Card */}
            <div
              ref={aboutProfileCardRef}
              className="md:col-span-6 bg-[#1a1a1a]/75 backdrop-blur-xl p-8 rounded-2xl border border-[#333333] shadow-2xl relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#444444] bg-black/45 text-[10px] uppercase tracking-widest text-zinc-400">
                  <Sparkles className="w-3 h-3 text-zinc-400" />
                  <span>Student</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-mono">Manish Kajla</h2>
                  <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">IIT KANPUR // BS MATHEMATICS & SCIENTIFIC COMPUTING</p>
                </div>

                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  I am an engineering student with a strong interest in machine learning, robotics, and intelligent systems. I enjoy building practical projects that combine software and hardware, and I actively explore data science and AI. Alongside academics, I take part in leadership roles and student initiatives that focus on real-world problem solving and technical execution.
                </p>

                <a
                  href="#projects"
                  className="bg-[#1f2023]/80 hover:bg-[#2d2e33] border border-[#444444] inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold text-white tracking-wide cursor-none shadow-md transition-all"
                >
                  <span>Explore Work</span>
                  <ArrowRight className="w-4 h-4 text-zinc-300" />
                </a>
              </div>
            </div>

            {/* Right Philosophy Text */}
            <div
              ref={aboutPhilosophyRef}
              className="md:col-span-6 space-y-6 md:pl-8 text-left"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-gray-500">// PHILOSOPHY</span>
              <h3 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-none text-white">
                Where systems, aesthetics, and life align.
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                I find beauty in reduction—breaking problems down until only the essentials remain. Whether in algorithms, mathematics, or everyday decisions, I believe clarity comes when we remove noise and focus on first principles. I try to carry that mindset into how I learn, build, and live.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SELECTED WORKS (RADIAL WHEEL) */}
        <RadialScrollGallery
          id="projects"
          className="scroll-section pin-section bg-black"
          scrollDuration={7500}
          visiblePercentage={45}
          startTrigger="top top"
          baseRadius={440}
          mobileRadius={176}
          onItemSelect={(index) => setSelectedProject(projectsData[index])}
        >
          {(hoveredIndex) =>
            projectsData.map((project, idx) => {
              const isActive = idx === hoveredIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedProject(project)}
                  className={`inner-card-rotate w-[390px] h-[220px] sm:w-[450px] sm:h-[250px] bg-[#111111] rounded-xl p-6 flex items-center justify-center text-center text-white shadow-lg border transition-all duration-300 ${isActive
                    ? 'border-zinc-400 scale-105 shadow-[0_8px_30px_rgba(255,255,255,0.06)]'
                    : 'border-[#333333] opacity-85 hover:border-zinc-500 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                  role="button"
                >
                  <h4 className="select-none pointer-events-none line-clamp-3 leading-snug text-xl sm:text-2xl font-bold font-mono">
                    {project.title}
                  </h4>
                </div>
              );
            })
          }
        </RadialScrollGallery>

        {/* SHADCN DIALOG OVERLAY */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent
            className="w-[750px] max-w-[95vw] sm:max-w-[750px] h-auto max-h-[85vh] overflow-y-auto bg-[#1A1A1A] border border-[#444444] text-white rounded-2xl p-6 md:p-8 shadow-2xl focus:outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-200"
            showCloseButton={false}
          >
            {selectedProject && (
              <div className="space-y-6">
                {/* Header block */}
                <div className="border-b border-[#333333] pb-4 flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <DialogTitle className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono leading-tight">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="font-mono text-xs text-gray-400 leading-relaxed block">
                      {selectedProject.context}
                    </DialogDescription>
                  </div>

                  {/* Styled close button */}
                  <DialogClose className="p-1.5 rounded-xl border border-[#333333] hover:border-white/40 hover:bg-[#222222] transition-colors cursor-none shrink-0 outline-none">
                    <X className="w-4 h-4 text-gray-400 hover:text-white" />
                  </DialogClose>
                </div>

                {/* Data Table */}
                <div className="divide-y divide-[#333333] text-sm">
                  {/* Row 1: Objective */}
                  <div className="py-4 grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-gray-400">
                      Objective
                    </div>
                    <div className="md:col-span-9 text-gray-200 leading-relaxed">
                      {selectedProject.objective}
                    </div>
                  </div>

                  {/* Row 2: Approach */}
                  <div className="py-4 grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-gray-400">
                      Approach
                    </div>
                    <div className="md:col-span-9">
                      <ul className="space-y-2 list-none">
                        {selectedProject.approach.map((item: string, idx: number) => (
                          <li key={idx} className="flex gap-2.5 items-start text-gray-200 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0 mt-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Row 3: Impact */}
                  <div className="py-4 grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-gray-400">
                      Impact
                    </div>
                    <div className="md:col-span-9 text-white font-semibold leading-relaxed">
                      {selectedProject.impact}
                    </div>
                  </div>
                </div>

                {/* Close controls */}
                <div className="pt-4 border-t border-[#333333] flex justify-end">
                  <DialogClose className="px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-gray-400 hover:text-white border border-[#333333] hover:border-white/30 rounded-xl transition-all cursor-none bg-black/20 outline-none">
                    Close Archive
                  </DialogClose>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* SECTION 4: SKILLS & CORE */}
        <section id="skills" className="scroll-section pin-section flex items-center bg-black">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid md:grid-cols-12 gap-8 items-center skills-wrapper">
            <div className="md:col-span-5 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">// capabilities</span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">SKILLS & CORE.</h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                A blend of mathematics, technology, and leadership shaped through hands-on projects, continuous learning, and real world problem solving.
              </p>

              {/* Dynamic Orb Container */}
              <div className="relative w-48 h-48 flex items-center justify-center mt-6">
                <div
                  ref={skillsOrbBgRef}
                  className="absolute inset-0 bg-gradient-to-tr from-purple-800 to-indigo-900 rounded-full opacity-30 filter blur-xl transition-all duration-300"
                />
                <div
                  ref={skillsOrbRef}
                  className="w-36 h-36 border border-zinc-700/60 rounded-full flex flex-col items-center justify-center bg-[#1F2023]/30 backdrop-blur-md relative z-10 transition-all duration-500 select-none cursor-none shadow-lg"
                  style={{ borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%' }}
                >
                  <Sparkles className="w-5 h-5 text-zinc-300 mb-1 animate-pulse" />
                  <span className="font-mono text-xs tracking-widest text-zinc-300 uppercase">INNOVATION</span>
                </div>
              </div>
            </div>

            <div
              ref={skillCardsRef}
              className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Skill 1 */}
              <div className="skill-card glass-panel p-5 rounded-xl border border-border hover:border-zinc-500 transition-colors shadow-md">
                <TrendingUp className="w-5 h-5 text-purple-400 mb-3" />
                <h3 className="text-lg font-bold tracking-tight text-white font-mono mb-2">ML & AI</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Graph Neural Networks, Fraud Detection, Classification Models, XGBoost, Data Analysis, Quantitative Modeling.
                </p>
              </div>

              {/* Skill 2 */}
              <div className="skill-card glass-panel p-5 rounded-xl border border-border hover:border-zinc-500 transition-colors shadow-md">
                <Cpu className="w-5 h-5 text-blue-400 mb-3" />
                <h3 className="text-lg font-bold tracking-tight text-white font-mono mb-2">Software & Full stack </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Python, FastAPI, Next.js, PostgreSQL, RAG Systems, API Development, Authentication & Deployment.
                </p>
              </div>

              {/* Skill 3 */}
              <div className="skill-card glass-panel p-5 rounded-xl border border-border hover:border-zinc-500 transition-colors shadow-md">
                <Activity className="w-5 h-5 text-emerald-400 mb-3" />
                <h3 className="text-lg font-bold tracking-tight text-white font-mono mb-2">Robotics & Signal Processing</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  mbedded systems, autonomous robotics, sensor integration, algorithmic problem-solving, and hardware-software development.
                </p>
              </div>

              {/* Skill 4 */}
              <div className="skill-card glass-panel p-5 rounded-xl border border-border hover:border-zinc-500 transition-colors shadow-md">
                <Layers className="w-5 h-5 text-pink-400 mb-3" />
                <h3 className="text-lg font-bold tracking-tight text-white font-mono mb-2">Campus Leadership</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Student governance, technical mentorship, team leadership, large-scale event operations, and cross-functional coordination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: AI CHATBOT */}
        <section id="chatbot" className="scroll-section pin-section flex flex-col justify-center bg-black">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col items-center">
            <div className="text-center mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">// interactive assistant</span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-1">ASK ANYTHING ABOUT MY WORK.</h2>
            </div>

            {/* Chatbot Interface Container */}
            <div ref={chatbotContainerRef} className="w-full">
              <AIChatbot />
            </div>
          </div>
        </section>

        {/* SECTION 6: CONTACT & FOOTER */}
        <section id="contact" className="scroll-section pin-section flex flex-col justify-between bg-black">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid md:grid-cols-12 gap-8 items-center flex-1 py-16">

            {/* Left Column Contact Details */}
            <div className="md:col-span-5 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">// connection portal</span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
                Get in Touch
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Available for quantitative finance pipelines, custom ML architectures, full-stack systems, or general opportunities. Drop a mail or connect.
              </p>

              {/* Social Links */}
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:mkajla24@iitk.ac.in"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-200 cursor-none group"
                >
                  <span className="w-8 h-8 border border-border rounded-lg flex items-center justify-center bg-[#1F2023]/40 group-hover:border-zinc-400 transition-colors">
                    <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </span>
                  <span className="font-mono text-xs md:text-sm">mkajla24@iitk.ac.in</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/manish-kajla-1315672b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-200 cursor-none group"
                >
                  <span className="w-8 h-8 border border-border rounded-lg flex items-center justify-center bg-[#1F2023]/40 group-hover:border-zinc-400 transition-colors">
                    <svg className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </span>
                  <span className="font-mono text-xs md:text-sm">linkedin</span>
                </a>

                <a
                  href="https://github.com/kajlaM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-200 cursor-none group"
                >
                  <span className="w-8 h-8 border border-border rounded-lg flex items-center justify-center bg-[#1F2023]/40 group-hover:border-zinc-400 transition-colors">
                    <svg className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </span>
                  <span className="font-mono text-xs md:text-sm">github</span>
                </a>

                <a
                  href="https://instagram.com/kajlam_01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-200 cursor-none group"
                >
                  <span className="w-8 h-8 border border-border rounded-lg flex items-center justify-center bg-[#1F2023]/40 group-hover:border-zinc-400 transition-colors">
                    <svg className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </span>
                  <span className="font-mono text-xs md:text-sm">instagram</span>
                </a>
              </div>
            </div>

            {/* Right Column The Contact Form */}
            <div
              ref={contactCardRef}
              className="md:col-span-7 glass-panel-heavy p-6 md:p-8 rounded-2xl border border-border shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative"
            >
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-[#111111] border border-border/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-300 transition-colors cursor-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-[#111111] border border-border/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-300 transition-colors cursor-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#111111] border border-border/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-300 transition-colors cursor-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter subject topic"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#111111] border border-border/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-300 transition-colors cursor-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe collaboration context..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#111111] border border-border/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-300 transition-colors resize-none scrollbar-none cursor-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus !== 'idle'}
                  className="glass-btn w-full py-3 rounded-xl text-sm font-semibold tracking-wide text-white border border-border transition-colors hover:border-zinc-300 disabled:opacity-50 disabled:pointer-events-none cursor-none"
                >
                  {submitStatus === 'idle' && 'Send Message'}
                  {submitStatus === 'sending' && 'Sending...'}
                  {submitStatus === 'success' && 'Message Received!'}
                </button>
              </form>
            </div>
          </div>

          {/* Footer Element */}
          <footer ref={footerRef} className="w-full border-t border-border/10 py-6 text-center bg-black/60 backdrop-blur-md relative z-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-mono">
              <p>© 2026 Manish Kajla. Made with Love </p>
              <div className="flex gap-4">
                <a href="#hero" className="hover:text-zinc-300 transition-colors cursor-none">Back to top</a>
                <span>//</span>
                <span className="text-zinc-600">Nothing OS Aesthetic</span>
              </div>
            </div>
          </footer>
        </section>

      </main>
    </div>
  );
}
