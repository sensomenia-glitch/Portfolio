import React, { useState, useEffect, useRef } from 'react';
import AIChat from './components/AIChat';
import { GithubIcon, ExternalLinkIcon, MenuIcon, XIcon, SendIcon, WhatsAppIcon } from './components/Icons';
import { Project } from './types';

// --- CONSTANTS ---
const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commercio',
    description: 'A headless Shopify storefront built for speed and conversion. Features server-side rendering, intelligent search, and a custom checkout flow.',
    technologies: ['Next.js', 'TypeScript', 'Shopify API', 'Tailwind'],
    imageUrl: 'https://picsum.photos/seed/ecom/800/600',
    demoUrl: '#',
    repoUrl: '#'
  },
  {
    id: '2',
    title: 'TaskMaster AI',
    description: 'Productivity application that uses LLMs to automatically prioritize and categorize tasks based on urgency and context.',
    technologies: ['React', 'Node.js', 'OpenAI', 'PostgreSQL'],
    imageUrl: 'https://picsum.photos/seed/task/800/600',
    demoUrl: '#',
    repoUrl: '#'
  },
  {
    id: '3',
    title: 'CryptoView Dashboard',
    description: 'Real-time cryptocurrency visualization tool using WebSocket feeds and D3.js for high-performance charting.',
    technologies: ['D3.js', 'React', 'WebSocket', 'Redis'],
    imageUrl: 'https://picsum.photos/seed/crypto/800/600',
    demoUrl: '#',
    repoUrl: '#'
  },
  {
    id: '4',
    title: 'Nebula Design System',
    description: 'A comprehensive React component library focusing on accessibility and dark-mode support used across multiple internal tools.',
    technologies: ['Storybook', 'React', 'SCSS', 'Rollup'],
    imageUrl: 'https://picsum.photos/seed/nebula/800/600',
    demoUrl: '#',
    repoUrl: '#'
  },
];

const SKILLS = [
  "AI Automation",
  "WordPress Customization",
  "Meta Ads (Facebook & IG)",
  "SEO & Content Optimization",
  "Social Media Strategy",
  "Google Analytics",
  "SEMrush & Ahrefs",
  "Adobe Creative Suite",
  "Canva Design",
  "Web Design"
];

// --- HOOKS ---
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// --- COMPONENTS ---

const LaunchScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Randomize speed slightly for realism
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setOpacity(0);
        setTimeout(onComplete, 800); // Wait for fade out
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center transition-opacity duration-700"
      style={{ opacity }}
    >
      <div className="relative mb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white relative z-10">
          METHODIAS
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">.JUMA</span>
        </h1>
        <div className="absolute -inset-4 bg-violet-600/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
      </div>
      
      <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 transition-all duration-200 ease-out shadow-[0_0_10px_rgba(139,92,246,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-4 flex justify-between w-64 text-xs font-mono text-slate-500">
        <span>INITIALIZING...</span>
        <span>{Math.min(100, progress)}%</span>
      </div>
    </div>
  );
};

const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {children}
    </div>
  );
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 z-40 w-full transition-all duration-300
        ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-violet-100 dark:border-slate-800' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <a href="#" className="font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-white group">
          METHODIAS<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 group-hover:to-cyan-400 transition-all duration-500">.JUMA</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          {['About', 'Portfolio', 'Skills', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="relative hover:text-violet-600 dark:hover:text-violet-400 transition-colors py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-500 after:to-fuchsia-500 after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b border-violet-100 dark:border-slate-800 p-6 md:hidden flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5">
            {['About', 'Portfolio', 'Skills', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

const Hero = () => (
  <section id="about" className="relative pt-32 pb-32 md:pt-48 md:pb-48 overflow-hidden bg-slate-50 dark:bg-[#05050A]">
    {/* Background Decorative Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        
        {/* IMAGE PLACEHOLDER - REPLACE SRC WITH YOUR JPG */}
        <div className="order-1 md:order-2 shrink-0">
          <RevealOnScroll delay={100}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              {/* Glowing Background Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-cyan-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              
              {/* Profile Image - Replace the src URL below with your actual image path */}
              <img 
                src="https://api.dicebear.com/9.x/micah/svg?seed=Methodias" 
                alt="Methodias Juma"
                className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-900 shadow-2xl z-10 bg-slate-100 dark:bg-slate-800"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 right-4 z-20 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-lg border border-violet-200 dark:border-violet-900 flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 <span className="text-xs font-bold text-slate-800 dark:text-white">Online</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <div className="order-2 md:order-1 max-w-2xl text-center md:text-left">
          <RevealOnScroll>
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-violet-200 dark:border-violet-800 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-sm font-semibold text-violet-600 dark:text-violet-300 uppercase tracking-wider">
              Available for new projects
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Digital Marketing & <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 animate-gradient">
                Web Design Specialist
              </span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <p className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-200 mb-6 tracking-wide">
              WordPress Expert | Meta Ads & SEO Strategist
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              A results-driven digital marketing professional with over 3 years of hands-on experience in web design, social media strategy, SEO, and paid advertising. I specialize in helping brands grow their online presence through a mix of creativity, data-driven strategies, and technical expertise.
              <br/><br/>
              I’m passionate about digital innovation and love turning ideas into campaigns that engage, convert, and deliver measurable value.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
              <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-violet-600/30 text-center">
                See My Work
              </a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-violet-500 dark:hover:border-violet-500 rounded-full font-bold text-lg transition-all transform hover:scale-105 text-center">
                Let's Connect
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  </section>
);

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <RevealOnScroll delay={index * 100}>
    <div className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2">
      {/* Gradient Border Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
      
      <div className="relative overflow-hidden h-56 md:h-72">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {project.repoUrl && (
              <a href={project.repoUrl} className="p-4 bg-white rounded-full text-slate-900 hover:bg-violet-500 hover:text-white transition-colors shadow-xl" title="View Code">
                <GithubIcon />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} className="p-4 bg-white rounded-full text-slate-900 hover:bg-fuchsia-500 hover:text-white transition-colors shadow-xl" title="Visit Site">
                <ExternalLinkIcon />
              </a>
            )}
          </div>
        </div>
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-widest border border-white/10">
          Web Dev
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col relative bg-white dark:bg-slate-900 z-10">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.map(tech => (
            <span key={tech} className="px-3 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium border border-slate-200 dark:border-slate-700">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </RevealOnScroll>
);

const Portfolio = () => (
  <section id="portfolio" className="py-32 bg-slate-50/50 dark:bg-[#0A0A10]">
    <div className="container mx-auto px-4">
      <RevealOnScroll>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Selected Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              A curated collection of websites, applications, and campaigns.
            </p>
          </div>
          <a href="#" className="px-6 py-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-violet-600 hover:text-white transition-all duration-300 flex items-center gap-2">
            View All Projects <ExternalLinkIcon />
          </a>
        </div>
      </RevealOnScroll>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-32 bg-white dark:bg-[#05050A] relative overflow-hidden">
    {/* Decorative BG */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto opacity-30 pointer-events-none">
       <div className="absolute top-20 left-20 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
       <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
    </div>

    <div className="container mx-auto px-4 text-center relative z-10">
      <RevealOnScroll>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-16">Core Skills & Tools</h2>
      </RevealOnScroll>
      
      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
        {SKILLS.map((skill, index) => (
          <RevealOnScroll key={skill} delay={index * 50}>
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl opacity-0 group-hover:opacity-70 blur transition duration-500"></div>
              <div className="relative px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium text-slate-700 dark:text-slate-300 transition-colors group-hover:text-white group-hover:bg-slate-900">
                {skill}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 bg-slate-50 dark:bg-[#0A0A10]">
    <div className="container mx-auto px-4 max-w-5xl">
      <RevealOnScroll>
        <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 rounded-[3rem] p-8 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-violet-900/50">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">Ready to grow?</h2>
            <p className="text-violet-100 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you need a new website, a complex web app, or a marketing strategy that converts—my inbox is always open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:methojuma@gmail.com" className="inline-flex items-center justify-center gap-3 bg-white text-violet-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-violet-50 hover:scale-105 transition-all duration-300 shadow-xl">
                <SendIcon /> Email Me
              </a>
              <a href="https://wa.me/254700000267" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#20bd5a] hover:scale-105 transition-all duration-300 shadow-xl">
                <WhatsAppIcon /> WhatsApp Me
              </a>
            </div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white dark:bg-[#05050A] py-12 border-t border-slate-200 dark:border-slate-900">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        © {new Date().getFullYear()} Methodias Juma. Crafted with ❤️ & React.
      </div>
      <div className="flex gap-8">
        {['GitHub', 'LinkedIn', 'Twitter'].map(social => (
          <a key={social} href="#" className="text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">
            {social}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LaunchScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#05050A] text-slate-900 dark:text-slate-100 font-sans selection:bg-fuchsia-500 selection:text-white scroll-smooth overflow-x-hidden animate-in fade-in duration-1000">
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;