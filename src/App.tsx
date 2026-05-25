import { motion, useScroll, useSpring, useMotionValue } from 'motion/react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { 
  Menu, X, Github, Linkedin, Twitter, ArrowUp, Instagram, 
  TrendingUp, Layout, BarChart3, Video, Cpu, Search, Code, PieChart,
  Check, Sparkles, ExternalLink, Sliders, Database, ArrowUpRight,
  FileText, Upload, RefreshCw
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import Hyperspeed from './components/Hyperspeed';
import DecryptedText from './components/DecryptedText';
import { cn } from './lib/utils';
import Certificates from './components/Certificates';

// --- Helper for Sentiment Analysis Simulator Heuristics ---
const classifyComment = (text: string): { sentiment: 'positive' | 'neutral' | 'negative'; score: number; emoji: string } => {
  const lower = text.toLowerCase();
  
  const posKeywords = ["love", "amazing", "great", "best", "perfect", "good", "nice", "fire", "cool", "clean", "beautiful", "outstanding", "incredible", "masterpiece", "elite", "insane", "awesome", "perfectly", "happy", "excellent"];
  const negKeywords = ["hate", "bad", "worst", "terrible", "sucks", "disappointing", "lame", "angry", "spam", "scam", "garbage", "trash", "bugs", "crash", "horrible", "waste", "useless", "overhyped"];
  
  let score = 0.05;
  let posCount = 0;
  let negCount = 0;

  posKeywords.forEach(word => {
    if (lower.includes(word)) posCount++;
  });
  negKeywords.forEach(word => {
    if (lower.includes(word)) negCount++;
  });

  if (posCount > negCount) {
    score = 0.6 + (posCount * 0.1);
    if (score > 1) score = 0.98;
  } else if (negCount > posCount) {
    score = -0.5 - (negCount * 0.1);
    if (score < -1) score = -0.95;
  } else {
    if (lower.includes("🔥") || lower.includes("❤️") || lower.includes("🚀") || lower.includes("😍") || lower.includes("🙌") || lower.includes("👏")) {
      score = 0.85;
    } else if (lower.includes("😢") || lower.includes("😭") || lower.includes("😡") || lower.includes("🤮") || lower.includes("👎")) {
      score = -0.8;
    }
  }

  let sentiment: 'positive' | 'neutral' | 'negative' = "neutral";
  let emoji = "🤔";
  if (score >= 0.25) {
    sentiment = "positive";
    emoji = score > 0.8 ? "😍" : "🙌";
  } else if (score <= -0.25) {
    sentiment = "negative";
    emoji = score < -0.7 ? "😡" : "🙄";
  } else {
    emoji = "😐";
  }

  return {
    sentiment,
    score,
    emoji
  };
};

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: string; setActivePage: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Certificates', href: '#certificates', id: 'certificates' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'certificates') {
      setActivePage('certificates');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActivePage('home');
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-6",
      isScrolled ? "bg-black/90 py-4 border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">
        <motion.button 
          onClick={() => handleNavClick('home')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-display font-black tracking-tighter flex items-center gap-2"
        >
          <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black text-sm">TJ</span>
          TANISH<span className="text-primary">.</span>
        </motion.button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "text-[11px] uppercase tracking-[0.2em] font-bold transition-all hover:text-primary",
                (activePage === 'certificates' && link.id === 'certificates') || (activePage === 'home' && link.id !== 'certificates' && link.id !== 'home')
                  ? "text-primary" : "text-white/50"
              )}
            >
              {link.name}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full border border-primary text-primary text-[11px] uppercase tracking-widest font-bold hover:bg-primary hover:text-black transition-all"
          >
            Let's Talk
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 bg-black z-[60] p-10 flex flex-col justify-center gap-8 md:hidden"
        >
          <button className="absolute top-8 right-8 text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)}
              className="text-5xl font-display font-bold text-white text-left uppercase tracking-tighter hover:text-primary transition-colors"
            >
              {link.name}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const hyperspeedOptions = useMemo(() => ({
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 2,
    fov: 90,
    fovSpeedUp: 120,
    speedUp: 1.5,
    carLightsFade: 0.4,
    totalSideLightSticks: 10,
    lightPairsPerRoadWay: 20,
    shoulderLinesWidthPercentage: 0.005,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131313,
      brokenLines: 0x131313,
      leftCars: [0xff6b00, 0xff9c00, 0xff4200],
      rightCars: [0x00d2ff, 0x0078ff, 0x004cff],
      sticks: 0xff6b00,
    }
  }), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-center px-6">
      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>
      <div className="absolute inset-0 z-0 bg-black/60" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center"
      >
        <motion.h1 variants={itemVariants} className="text-[65px] font-extrabold text-white leading-[1.1] uppercase">
          <span 
            className="block text-[55px] text-transparent mb-[-10px]"
            style={{ WebkitTextStroke: "1px #ff6b00" }}
          >
            DATA
          </span>
          SCIENTIST
        </motion.h1>

        <motion.h2 variants={itemVariants} className="text-primary text-xl font-bold tracking-[2px] mt-2 uppercase">
          & Digital Marketer
        </motion.h2>

        <motion.p variants={itemVariants} className="text-white/60 max-w-[600px] mt-5 leading-relaxed font-light">
          Turning data into insights & growth strategies using AI, analytics, and creative marketing.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8 justify-center">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-black font-bold rounded-[5px] transition-all hover:bg-primary/90 text-sm"
          >
            Explore My Work
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-6 mt-12">
          {[
            { Icon: Github, href: "https://github.com/tanishjain93133-hub" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/tanish-jain-324284271/" },
            { Icon: Instagram, href: "https://www.instagram.com/tanish__.6" }
          ].map(({ Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#ff7a00' }}
              className="text-white/30 transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 relative bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative group"
          >
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative border border-white/10 p-4 bg-white/5 backdrop-blur-sm overflow-hidden rounded-2xl shadow-2xl group">
              <img 
                src="https://lh3.googleusercontent.com/d/1mUfUWnG4ZWVFnxgOahSTXq_cJA2DGSh5" 
                alt="Tanish Jain" 
                className="w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100 shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl" />
              
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-7xl md:text-8xl font-black text-white/10 uppercase tracking-tighter select-none">
                  About Me
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="mb-12">
              <span className="inline-block text-white font-bold tracking-[0.5em] uppercase text-sm mb-4">
                MYSELF
              </span>
            </div>
            
            <div className="space-y-10">
              <div className="text-2xl text-white font-medium leading-tight tracking-tight border-l-2 border-primary/40 pl-8">
                <DecryptedText 
                  text="I am Tanish Jain, a Computer Science student with a strong interest in Data Science and Digital Marketing."
                  animateOn="view"
                  revealDirection="start"
                  speed={40}
                />
              </div>
              
              <div className="space-y-8 text-lg text-white/70 font-light leading-relaxed">
                <p>
                  I specialize in analyzing data, building insights, and applying basic Machine Learning concepts to solve real-world problems. Alongside this, I have hands-on experience in digital marketing, including social media management, content creation, and running ad campaigns.
                </p>
                <p>
                  I have worked on projects like sentiment analysis and AI-based tools, combining technical skills with creativity to deliver impactful results.
                </p>
                <p className="text-white font-normal italic border-t border-white/10 pt-8">
                  "My goal is to bridge the gap between data and marketing by creating data-driven strategies that drive growth and innovation."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { 
      name: 'Growth & Performance Marketing', 
      level: 'Professional', 
      desc: 'Driving scalable growth through data-backed strategies and high-converting ad campaigns.',
      icon: TrendingUp 
    },
    { 
      name: 'Modern Interface Design', 
      level: 'Advanced', 
      desc: 'Crafting intuitive, high-fidelity digital experiences with a focus on minimal aesthetics.',
      icon: Layout 
    },
    { 
      name: 'Data Insights & Basic Prediction', 
      level: 'Intermediate', 
      desc: 'Leveraging data analytics to uncover patterns and build foundational predictive models.',
      icon: BarChart3 
    },
    { 
      name: 'Creative Visual Storytelling', 
      level: 'Advanced', 
      desc: 'Engaging audiences through compelling content, motion graphics, and strategic visual media.',
      icon: Video 
    },
    { 
      name: 'Automation & Smart Workflows', 
      level: 'Intermediate', 
      desc: 'Optimizing efficiency by integrating AI tools and automating repetitive digital processes.',
      icon: Cpu 
    },
    { 
      name: 'Search Growth Optimization', 
      level: 'Advanced', 
      desc: 'Enhancing search visibility and organic reach through technical SEO and strategic SEM.',
      icon: Search 
    },
    { 
      name: 'Responsive Website Creation', 
      level: 'Advanced', 
      desc: 'Building fast, modern, and fully responsive websites using the latest web technologies.',
      icon: Code 
    },
    { 
      name: 'Dashboards & Insights', 
      level: 'Professional', 
      desc: 'Transforming complex data into actionable insights using Power BI and advanced Excel.',
      icon: PieChart 
    },
  ];

  return (
    <section id="skills" className="py-40 bg-black relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Expertise</span>
            <h2 className="text-7xl font-display font-bold uppercase tracking-tighter leading-none">
              CORE <span className="text-outline">SKILLS</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white/40 max-w-md text-lg font-light leading-relaxed"
          >
            A fusion of marketing psychology and technical precision, designed to deliver measurable digital impact.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="relative p-10 bg-zinc-900/40 border border-white/5 hover:border-primary/30 transition-all duration-300 group overflow-hidden rounded-2xl"
            >
              {/* Large Faded Number */}
              <div className="absolute -bottom-6 -right-6 text-[10rem] font-display font-black text-white/[0.02] leading-none pointer-events-none group-hover:text-primary/[0.04] transition-colors duration-700">
                0{i + 1}
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-4 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors duration-500">
                    <skill.icon className="text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500" size={32} />
                  </div>
                  <span className="text-primary/40 font-display font-bold text-xs tracking-[0.3em]">0{i + 1}</span>
                </div>

                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                  {skill.name}
                </h3>
                <p className="text-white/40 text-sm mb-8 leading-relaxed font-light min-h-[60px]">
                  {skill.desc}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-6 bg-primary/30" />
                    <span className="text-[9px] uppercase tracking-[0.4em] text-primary font-black">
                      {skill.level}
                    </span>
                  </div>
                  
                  {/* Subtle Indicator */}
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [activeModalProject, setActiveModalProject] = useState<any | null>(null);

  // States for interactive forecasting simulation inside modal
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedModel, setSelectedModel] = useState("Prophet");
  const [confidenceInterval, setConfidenceInterval] = useState(95);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(true);

  // States for interactive Architecture showcase
  const [selectedSpaceFilter, setSelectedSpaceFilter] = useState("All");
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // States for interactive Resume Checker
  const [selectedResumeFile, setSelectedResumeFile] = useState("Fullstack_Dev_Resume.pdf");
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [atsScoreBoost, setAtsScoreBoost] = useState(false);

  // States for interactive InstaSenti
  const [sentiFilter, setSentiFilter] = useState<"all" | "positive" | "neutral" | "negative">("all");
  const [sentiComments, setSentiComments] = useState([
    { id: 1, text: "Absolutely in love with this! The aesthetics are elite 🔥", username: "alex_design", likes: 342, sentiment: "positive", score: 0.95, emoji: "😍" },
    { id: 2, text: "Is there an update scheduled for the Android build?", username: "dev_marcus", likes: 23, sentiment: "neutral", score: 0.05, emoji: "🤔" },
    { id: 3, text: "The new update has so many bugs and crashes constantly. Disappointing.", username: "angry_user99", likes: 89, sentiment: "negative", score: -0.85, emoji: "😡" },
    { id: 4, text: "Insane execution, the performance is out of this world! 🚀", username: "crypto_vision", likes: 112, sentiment: "positive", score: 0.9, emoji: "🙌" },
    { id: 5, text: "Clean and minimal. I wonder what dataset they trained the NLP on.", username: "data_sam", likes: 14, sentiment: "neutral", score: 0.1, emoji: "📊" },
    { id: 6, text: "Overhyped interface, it literally does nothing new.", username: "hater_hub", likes: 45, sentiment: "negative", score: -0.6, emoji: "🙄" }
  ]);
  const [newSentiComment, setNewSentiComment] = useState("");
  const [isAnalyzingSenti, setIsAnalyzingSenti] = useState(false);

  // Simulating real dynamic analytics values that change with user filters
  const getSimulatedData = () => {
    switch (selectedRegion) {
      case "North":
        return {
          revenue: "$320,400",
          growth: "+14.5%",
          prediction: "$366,850",
          trend: [42, 45, 48, 52, 58, 65, 72, 78, 85, 88, 92, 98],
          insight: "Prophet model forecasts an upward expansion heading into Q4, driven by elevated regional demand."
        };
      case "South":
        return {
          revenue: "$210,800",
          growth: "+8.2%",
          prediction: "$228,100",
          trend: [30, 31, 29, 32, 35, 38, 41, 45, 48, 49, 52, 55],
          insight: "Stable performance showing consistent progress with moderate seasonal baseline fluctuations."
        };
      case "East":
        return {
          revenue: "$265,900",
          growth: "+11.3%",
          prediction: "$295,900",
          trend: [35, 38, 40, 42, 45, 49, 53, 56, 61, 63, 67, 71],
          insight: "Enterprise accounts maintain stable volume. LSTM indicates corporate budgets peak in mid-autumn."
        };
      case "West":
        return {
          revenue: "$450,200",
          growth: "+21.2%",
          prediction: "$545,600",
          trend: [55, 59, 64, 70, 78, 88, 98, 110, 122, 128, 134, 142],
          insight: "Hyper-growth region. Model forecasts exceptional Q3-Q4 sales velocity backed by tech adoption."
        };
      default:
        return {
          revenue: "$1,247,300",
          growth: "+16.3%",
          prediction: "$1,450,400",
          trend: [40, 43, 45, 49, 54, 60, 66, 72, 79, 82, 86, 91],
          insight: "Consolidated ML forecast indicates 95% probability of meeting or exceeding the absolute $1.4M target."
        };
    }
  };

  const currentStats = getSimulatedData();

  const handleRunForecast = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 1000);
  };

  const projects = [
    {
      title: "DSA – Dhwanish Shah Architects Website",
      category: "Architecture & Design",
      image: "https://lh3.googleusercontent.com/d/1vv81q-n1jOzi1X9IcHI3sWcMqfy4PIBQ",
      year: "2026",
      description: "Designed and developed a modern architecture and interior design website for Dhwanish Shah Architects featuring project showcases, client testimonials, dynamic galleries, YouTube review integration, and a premium user experience.",
      features: [
        "Interactive Project Showcase",
        "Client Testimonials",
        "Dynamic Image Galleries",
        "YouTube Review Integration",
        "Responsive Design",
        "Smooth Navigation",
        "Modern UI/UX",
        "Premium Architecture Layout"
      ],
      techStack: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX", "Vercel"],
      link: "https://dsa-2.vercel.app/",
      demo: "https://dsa-2.vercel.app/",
      github: "https://github.com/tanishjain93133-hub/DSA-2",
      isInteractive: true,
      isArchitecture: true
    },
    {
      title: "SalesVision AI – AI Sales Forecasting Dashboard",
      category: "AI & Data Science",
      image: "https://lh3.googleusercontent.com/d/1tfmEw3WvATPTSo7FCgHNJDFhcKehQMvL",
      year: "2026",
      description: "An AI-powered sales analytics and forecasting dashboard that analyzes sales data, generates KPI insights, visualizes trends, and predicts future sales using machine learning techniques.",
      features: [
        "Sales Forecasting",
        "Revenue Analytics",
        "KPI Dashboard",
        "AI Business Insights",
        "Region-wise Analysis",
        "Interactive Charts",
        "Dynamic Filters",
        "Trend Prediction"
      ],
      techStack: ["Python", "Streamlit", "Pandas", "Plotly", "Prophet", "NumPy"],
      github: "https://github.com/tanishjain93133-hub/ai-sales-predict",
      link: "https://ai-sales-predict.streamlit.app/",
      demo: "https://ai-sales-predict.streamlit.app/",
      isInteractive: true
    },
    {
      title: "InstaSenti – AI Instagram Sentiment Analyzer",
      category: "AI & Sentiment Analysis",
      image: "https://lh3.googleusercontent.com/d/1bXejSKeByBVi72knDcNOumnJbtUUO1k_",
      year: "2026",
      description: "An AI-powered Instagram comment sentiment analysis system that analyzes comments and classifies them into positive, negative, and neutral sentiments with interactive visual insights.",
      features: [
        "Comment Analysis",
        "Sentiment Detection",
        "Positive/Negative/Neutral Classification",
        "AI Insights",
        "Interactive Dashboard",
        "3D Charts",
        "Dynamic Filters",
        "Real-time Analysis"
      ],
      techStack: ["Python", "Streamlit", "NLP", "TextBlob", "Pandas", "Plotly"],
      github: "https://github.com/tanishjain93133-hub/InstaSenti-",
      isInteractive: true,
      isSenti: true
    },
    {
      title: "Nexus AI – AI Resume Checker",
      category: "AI & Productivity",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200",
      year: "2026",
      description: "An AI-powered resume analysis system that evaluates resumes, provides instant feedback, extracts skills, calculates ATS scores, and suggests improvements for better job opportunities.",
      features: [
        "Resume Upload",
        "Resume Analysis",
        "ATS Score Detection",
        "Skills Extraction",
        "AI Suggestions",
        "Instant Feedback",
        "Candidate Ranking",
        "Resume Optimization"
      ],
      techStack: ["Python", "Streamlit", "NLP", "Machine Learning", "Pandas", "Scikit-learn"],
      github: "https://github.com/tanishjain93133-hub/Nexus-AI-",
      isInteractive: true,
      isResume: true
    },
  ];

  return (
    <section id="projects" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Portfolio</span>
            <h2 className="text-6xl font-display font-bold uppercase tracking-tighter">Selected <span className="text-outline">Works</span></h2>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-4 border-b border-primary pb-2"
          >
            Curated Showcases <span>↓</span>
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
          {(projects as any[]).map((project, i) => {
            const hasExtraDetails = !!project.isInteractive;
            const CardWrapper = motion.div;

            return (
              <CardWrapper
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => {
                  if (project.isInteractive) {
                    setActiveModalProject(project);
                  }
                }}
                className={cn(
                  "group flex flex-col h-full relative text-left cursor-pointer",
                  hasExtraDetails ? "p-8 bg-zinc-900/10 border border-white/5 rounded-3xl backdrop-blur-md hover:border-primary/20 hover:shadow-[0_0_40px_rgba(255,122,0,0.06)] transition-all duration-300" : ""
                )}
              >
                <div className="relative overflow-hidden mb-8 aspect-[16/10] bg-zinc-900/50 border border-white/5 flex items-center justify-center rounded-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6 }}
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Visual Overlay Design */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="absolute top-6 right-6 bg-black/75 backdrop-blur-md px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-white border border-white/10 z-10 rounded-sm">
                    {project.isInteractive ? "ACTIVE DEMO" : project.year}
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex-1">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                    <h3 className="text-3xl font-display font-bold group-hover:text-primary transition-colors mb-4 leading-tight">{project.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xl group-hover:text-white/60 transition-colors mb-6">
                      {project.description}
                    </p>

                    {/* Features checklist if specified */}
                    {project.features && (
                      <div className="mb-6 pt-4 border-t border-white/5">
                        <span className="text-white/[0.3] text-[10px] font-bold uppercase tracking-widest block mb-3">Key Features</span>
                        <div className="grid grid-cols-2 gap-2">
                          {project.features.map((feat, fidx) => (
                            <div key={fidx} className="flex items-center gap-2 text-xs text-white/60">
                              <span className="text-primary text-xs font-bold leading-none select-none">✓</span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack List */}
                    {project.techStack && (
                      <div className="mb-6 pt-4 border-t border-white/5">
                        <span className="text-white/[0.3] text-[10px] font-bold uppercase tracking-widest block mb-3">Technology Stack</span>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, tidx) => (
                            <span 
                              key={tidx}
                              className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase text-primary/80 bg-primary/5 border border-primary/20 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {project.isInteractive ? (
                    <div className="flex flex-wrap items-center gap-3 mt-4 pt-6 border-t border-white/5 w-full">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveModalProject(project);
                        }}
                        className="px-4 py-2.5 bg-primary hover:bg-primary/95 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-2 cursor-none"
                      >
                        <Sparkles size={13} className="animate-spin duration-3000" />
                        View Project
                      </button>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-2 cursor-none"
                      >
                        <Github size={13} />
                        GitHub
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-2 cursor-none"
                        >
                          <ExternalLink size={13} className="text-primary" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  ) : (
                    project.link && (
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary shrink-0 transition-all duration-300 translate-y-2">
                        <ArrowUp className="rotate-45 text-white group-hover:text-black transition-colors" size={20} />
                      </div>
                    )
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>

      {/* Futuristic Glassmorphic Live Simulation Modal */}
      {activeModalProject && activeModalProject.isInteractive && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10">
          {/* Solid Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-md" 
            onClick={() => setActiveModalProject(null)}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative w-full max-w-5xl bg-zinc-950/95 border border-white/10 overflow-hidden z-10 rounded-3xl shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  {activeModalProject.isArchitecture ? (
                    <Layout size={18} className="text-primary animate-pulse" />
                  ) : activeModalProject.isResume ? (
                    <FileText size={18} className="text-primary animate-pulse" />
                  ) : activeModalProject.isSenti ? (
                    <Instagram size={18} className="text-primary animate-pulse" />
                  ) : (
                    <Sliders size={18} className="text-primary animate-pulse" />
                  )}
                </div>
                <div>
                  <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">
                    {activeModalProject.isArchitecture 
                      ? "Architecture Design Studio" 
                      : activeModalProject.isResume 
                      ? "AI Resume Analysis System" 
                      : activeModalProject.isSenti
                      ? "AI Sentiment Analyzer"
                      : "ML Dashboard Simulator"}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
                    {activeModalProject.title}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setActiveModalProject(null)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              {activeModalProject.isArchitecture ? (
                // Architecture Interactive Mode
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Sidebar Panel with spacing controls and client walk-throughs */}
                  <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl space-y-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      <Sliders size={15} className="text-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">Interactive Settings</span>
                    </div>

                    {/* Filter spaces select / buttons */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Select Category</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["All", "Residential", "Commercial", "Interior"].map((space) => {
                          const isSel = selectedSpaceFilter === space;
                          return (
                            <button
                              key={space}
                              onClick={() => {
                                setSelectedSpaceFilter(space);
                                setActiveImageIdx(0); // reset active render index
                              }}
                              className={cn(
                                "py-2 px-2 text-[10px] font-semibold rounded-md transition-all uppercase tracking-widest cursor-none border text-center",
                                isSel 
                                  ? "bg-primary border-primary text-black" 
                                  : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                              )}
                            >
                              {space}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* YouTube Review Walkthrough Simulation Component */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">YouTube Walkthrough</label>
                      <div className="p-4 bg-black/40 border border-white/5 rounded-xl text-center space-y-3 relative overflow-hidden">
                        <div className="absolute top-2 right-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-[8px] font-mono text-white/40 font-bold uppercase tracking-wider">LIVE</span>
                        </div>
                        <div className="w-10 h-10 mx-auto rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center">
                          <Video size={16} className="text-red-500" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">YouTube Client Review Vlog</span>
                          <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block mt-1">Dhwanish Shah Architects</span>
                        </div>
                        
                        {/* Interactive Play Toggle */}
                        <button
                          onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-[9px] font-bold tracking-wider uppercase rounded-md cursor-none transition-all w-full"
                        >
                          {isPlayingVideo ? "⏸ Pause Walkthrough" : "▶ Play Simulated walkthrough"}
                        </button>

                        {isPlayingVideo && (
                          <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between items-center text-[8px] font-mono text-white/50">
                              <span>00:48</span>
                              <span>04:12</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full relative overflow-hidden">
                              <motion.div 
                                animate={{ x: ["-100%", "0%"] }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                className="absolute left-0 top-0 h-full w-full bg-red-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Client Testimonial feedback */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">Client Testimonials</label>
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3">
                        <p className="text-[11px] text-white/70 italic leading-relaxed">
                          "Dhwanish Shah Architects translated our vision into steel, glass, and raw symmetry. Beyond expectations."
                        </p>
                        <span className="text-[9px] font-mono text-primary uppercase font-bold tracking-widest block">— Dhiren S., Tech Founder</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Gallery Showcase Canvas */}
                  <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
                    {/* Hero architecture render view with fade inside */}
                    <div className="relative aspect-[16/10] bg-black/50 border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-[9px] font-mono uppercase tracking-widest border border-white/10 text-primary z-10">
                        {selectedSpaceFilter === "All" ? "Feature Project" : selectedSpaceFilter} Space
                      </div>
                      
                      {/* Interactive Gallery image rendering */}
                      {(() => {
                        const architectureRenders = [
                          {
                            title: "The Oasis Glass Villa",
                            type: "Residential",
                            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
                            highlight: "High sunlight penetration, native courtyard gardens, premium thermal glass insulation."
                          },
                          {
                            title: "Synthesize Lobby Core",
                            type: "Commercial",
                            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
                            highlight: "Structural raw concrete pillar design, floating staircase acoustics, smart ventilation."
                          },
                          {
                            title: "Monolith Lounge Space",
                            type: "Interior",
                            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
                            highlight: "Mid-century bespoke walnut furnishings, modular layouts, polished concrete stone plates."
                          },
                          {
                            title: "Zen Archway Pavilion",
                            type: "Residential",
                            image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800",
                            highlight: "Water channel reflection mirror, sliding Shoji timber screens, timber wood beams."
                          }
                        ];

                        const filtered = architectureRenders.filter(r => selectedSpaceFilter === "All" || r.type === selectedSpaceFilter);
                        const currentRender = filtered[activeImageIdx] || filtered[0] || architectureRenders[0];

                        return (
                          <>
                            <motion.img 
                              key={currentRender.title}
                              initial={{ opacity: 0.8 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              src={currentRender.image}
                              alt={currentRender.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {/* Overlay descriptive ribbon */}
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5">
                              <h4 className="text-md font-display font-semibold text-white">{currentRender.title}</h4>
                              <p className="text-[11px] text-white/50 mt-1 max-w-lg font-sans underline decoration-primary/30 underline-offset-4">
                                Accent: {currentRender.highlight}
                              </p>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Gallery Thumbnails List */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Dynamic Interactive Image Gallery (Click to inspect)</span>
                      <div className="flex gap-3">
                        {(() => {
                          const architectureRenders = [
                            {
                              title: "The Oasis Glass Villa",
                              type: "Residential",
                              image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                              title: "Synthesize Lobby Core",
                              type: "Commercial",
                              image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                              title: "Monolith Lounge Space",
                              type: "Interior",
                              image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                              title: "Zen Archway Pavilion",
                              type: "Residential",
                              image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800"
                            }
                          ];
                          const filtered = architectureRenders.filter(r => selectedSpaceFilter === "All" || r.type === selectedSpaceFilter);

                          return filtered.map((item, idx) => {
                            const isAct = idx === activeImageIdx;
                            return (
                              <button
                                key={idx}
                                onClick={() => setActiveImageIdx(idx)}
                                className={cn(
                                  "w-20 md:w-24 aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-none bg-zinc-900",
                                  isAct ? "border-primary ring-2 ring-primary/20" : "border-white/10 hover:border-white/20"
                                )}
                              >
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover select-none pointer-events-none" 
                                  referrerPolicy="no-referrer"
                                />
                              </button>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    {/* Tech details ribbon */}
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <p className="text-xs font-mono text-primary/95 leading-relaxed tracking-wider">
                        <strong>[ARCHITECTURE STACK]:</strong> HTML5 • Responsive CSS Grid • Vanilla JavaScript • Vercel deployment. Meticulously engineered layout for responsive speed, dynamic views and fluid animations.
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeModalProject.isResume ? (
                // Nexus AI Resume Analysis Mode
                <div className="grid lg:grid-cols-3 gap-8 text-left">
                  {/* Control Panel Sidebar */}
                  <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl space-y-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      <Database size={15} className="text-primary animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">ATS Controls</span>
                    </div>

                    {/* Resume selection */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">Select Resume Sample</label>
                      <div className="space-y-2">
                        {[
                          { file: "Fullstack_Dev_Resume.pdf", label: "Full-Stack Developer" },
                          { file: "Data_Scientist_Resume.pdf", label: "Data Scientist" },
                          { file: "Product_Manager_Resume.pdf", label: "Product Manager" }
                        ].map((resume) => {
                          const isSel = selectedResumeFile === resume.file;
                          return (
                            <button
                              key={resume.file}
                              onClick={() => {
                                setSelectedResumeFile(resume.file);
                                // Trigger a fast clean scanning state transition
                                setIsAnalyzingResume(true);
                                setAtsScoreBoost(false);
                                setTimeout(() => setIsAnalyzingResume(false), 600);
                              }}
                              className={cn(
                                "py-2.5 px-3 text-[10px] font-mono rounded-lg transition-all cursor-none border w-full flex items-center justify-between",
                                isSel 
                                  ? "bg-primary border-primary text-black font-bold" 
                                  : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                              )}
                            >
                              <span>{resume.label}</span>
                              <span className="text-[9px] opacity-70">
                                {isSel ? "● ACTIVE" : ".pdf"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Drag and Drop Simulator container */}
                    <div className="space-y-2 pt-3 border-t border-white/5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">Drop Zone Simulator</label>
                      <div className="p-4 bg-black/40 border border-dashed border-white/10 rounded-xl text-center space-y-2 relative">
                        <Upload size={18} className="text-white/40 mx-auto animate-bounce" />
                        <span className="text-[10px] text-white/60 block font-mono">Drag & Drop Resume here</span>
                        <span className="text-[8px] text-white/30 block uppercase tracking-widest leading-none">PDF, DOCX up to 10MB</span>
                      </div>
                    </div>

                    {/* ATS AI Score Boost Button */}
                    <div className="space-y-3 pt-3 border-t border-white/5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">AI Recommendation Tool</label>
                      <button
                        onClick={() => {
                          setIsAnalyzingResume(true);
                          setTimeout(() => {
                            setIsAnalyzingResume(false);
                            setAtsScoreBoost(!atsScoreBoost);
                          }, 700);
                        }}
                        className={cn(
                          "w-full py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-none border",
                          atsScoreBoost 
                            ? "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/15"
                            : "bg-primary hover:bg-primary/95 text-black border-transparent"
                        )}
                      >
                        <RefreshCw size={13} className={isAnalyzingResume ? "animate-spin" : ""} />
                        {isAnalyzingResume 
                          ? "Re-Analyzing..." 
                          : atsScoreBoost 
                          ? "Reset Analysis" 
                          : "Apply AI Content Optimization"}
                      </button>
                      <span className="text-[8px] text-white/40 block leading-normal italic text-center">
                        Toggle to see real-time ATS scoring changes and optimized recommendations.
                      </span>
                    </div>
                  </div>

                  {/* Main Analysis Display */}
                  <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
                    {/* Resume Stats Cards */}
                    {(() => {
                      const resumeDetails: Record<string, {
                        bgScore: number;
                        boostScore: number;
                        skills: string[];
                        missing: string[];
                        bullets: string[];
                        rank: string;
                      }> = {
                        "Fullstack_Dev_Resume.pdf": {
                          bgScore: 74,
                          boostScore: 92,
                          skills: ["React", "Node.js", "TypeScript", "Python", "Docker", "AWS", "SQL"],
                          missing: ["CI/CD Pipelines", "Redis Caching", "GraphQL API", "Kubernetes Orchestration"],
                          bullets: [
                            "Incorporate active action verbs at the start of experience pointers (e.g. 'Spearheaded deployment' vs 'Worked on development').",
                            "Add a technical core skills grid block directly below your profile summary to accelerate standard parsing algorithms.",
                            "Detail measurable business outcomes: e.g., 'Reduced query latency by 45% with PostgreSQL indexing and caching'."
                          ],
                          rank: "Top 8% in applicant pool"
                        },
                        "Data_Scientist_Resume.pdf": {
                          bgScore: 68,
                          boostScore: 89,
                          skills: ["Python", "Pandas", "Scikit Learn", "Machine Learning", "SQL", "Statistics"],
                          missing: ["Deep Learning Models", "TensorFlow / PyTorch", "A/B Testing Frameworks", "Spark Data Lake"],
                          bullets: [
                            "Emphasize bottom-line commercial impact from mathematical models instead of basic code implementation milestones.",
                            "Convert two-column visually complex grids into standard linear layouts to prevent ATS content splitting.",
                            "Attach hyperlinked production-ready GitHub repositories with pristine readme documentation."
                          ],
                          rank: "Top 12% in applicant pool"
                        },
                        "Product_Manager_Resume.pdf": {
                          bgScore: 62,
                          boostScore: 85,
                          skills: ["Agile Delivery", "Scrum Method", "Product Roadmap", "Jira & Confluence", "SQL Analytics", "User Research"],
                          missing: ["Core North-Star KPIs", "SaaS Growth Loops", "Product Discovery Hacks", "Cross-Functional Synergy"],
                          bullets: [
                            "Express clear timelines and cross-functional team sizing: e.g., 'Led 14 high-agency engineers to boot conversion by 12%'.",
                            "Remove floating textboxes, customized timeline shapes, and graphic margins from PDF layers.",
                            "Align career focus around growth funnels (activation, retention, referral metrics)."
                          ],
                          rank: "Top 18% in applicant pool"
                        }
                      };

                      const current = resumeDetails[selectedResumeFile] || resumeDetails["Fullstack_Dev_Resume.pdf"];
                      const score = atsScoreBoost ? current.boostScore : current.bgScore;

                      return (
                        <>
                          {/* Upper KPI Panels */}
                          <div className="grid grid-cols-3 gap-4">
                            {/* Score Display */}
                            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-white/30 block mb-1">ATS Match Rating</span>
                              
                              <div className="relative flex items-center justify-center w-16 h-16">
                                {/* SVG Ring */}
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="32" cy="32" r="28" stroke="currentColor" className="text-white/10" strokeWidth="3" fill="transparent" />
                                  <circle 
                                    cx="32" 
                                    cy="32" 
                                    r="28" 
                                    stroke="currentColor" 
                                    className={cn(
                                      "transition-all duration-700",
                                      score >= 90 ? "text-green-400" : score >= 80 ? "text-primary" : "text-yellow-500"
                                    )}
                                    strokeWidth="3" 
                                    fill="transparent" 
                                    strokeDasharray={175} 
                                    strokeDashoffset={175 - (175 * score) / 100} 
                                  />
                                </svg>
                                <span className={cn(
                                  "absolute text-xs font-mono font-black",
                                  score >= 90 ? "text-green-400" : score >= 80 ? "text-primary" : "text-yellow-500"
                                )}>
                                  {score}%
                                </span>
                              </div>
                              <span className="text-[8px] text-white/40 block mt-2 text-center uppercase tracking-wider font-mono">
                                {atsScoreBoost ? "🚀 ATS OPTIMIZED" : "⚠️ PRE-OPTIMIZATION"}
                              </span>
                            </div>

                            {/* Candidate Rank Display */}
                            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden flex flex-col justify-center">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-white/30 block mb-1">Candidate Profile Stance</span>
                              <span className="text-[11px] md:text-sm font-bold text-white leading-tight uppercase tracking-wider mt-1">{current.rank}</span>
                              <span className="text-[8px] text-white/40 block mt-2 uppercase font-mono tracking-widest">
                                {atsScoreBoost ? "Outstanding Fit" : "Medium-High Stance"}
                              </span>
                            </div>

                            {/* Parser Optimization */}
                            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden flex flex-col justify-center">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-white/30 block mb-1">Job Ready Index</span>
                              <span className={cn(
                                "text-[11px] md:text-sm font-bold leading-tight uppercase tracking-wider mt-1",
                                atsScoreBoost ? "text-green-400 animate-pulse" : "text-yellow-500"
                              )}>
                                {atsScoreBoost ? "S-Tier Match" : "B-Tier Stagger"}
                              </span>
                              <span className="text-[8px] text-white/40 block mt-2 uppercase font-mono tracking-widest">
                                {atsScoreBoost ? "Confidence: 98%" : "Confidence: 76%"}
                              </span>
                            </div>
                          </div>

                          {/* Center Screen: Skills Extracted & Missing Keywords */}
                          <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
                            <div>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block mb-2 font-mono">✅ EXTRACTED CAPABILITIES ({current.skills.length})</span>
                              <div className="flex flex-wrap gap-1.5">
                                {current.skills.map((skill) => (
                                  <span key={skill} className="px-2 py-0.5 text-[9px] font-mono tracking-wide bg-green-500/10 border border-green-500/20 text-green-400 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block mb-2 font-mono">❌ MISSING CRITICAL ATS KEYWORDS ({current.missing.length})</span>
                              <div className="flex flex-wrap gap-1.5">
                                {current.missing.map((keyword) => (
                                  <span key={keyword} className={cn(
                                    "px-2 py-0.5 text-[9px] font-mono tracking-wide transition-all duration-500 rounded",
                                    atsScoreBoost 
                                      ? "bg-green-500/10 border border-green-500/20 text-green-400 line-through opacity-40" 
                                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                                  )}>
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                              {atsScoreBoost && (
                                <span className="text-[8px] font-mono text-green-400 block mt-2 font-bold tracking-widest uppercase">
                                  ✓ All critical keywords integrated successfully!
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Lower Screen: AI Improvement Recommendations List */}
                          <div className="p-5 bg-white/[0.01] border border-white/5 rounded-xl space-y-3">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-primary block font-mono">💡 AI IMPROVEMENT ADVICE FEEDBACK</span>
                            <div className="space-y-2">
                              {current.bullets.map((bullet, bidx) => (
                                <div key={bidx} className="flex gap-2.5 items-start text-[11px] text-white/70 leading-relaxed font-sans">
                                  <span className="text-primary mt-0.5 font-bold shrink-0">↪</span>
                                  <p>{bullet}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      );
                    })()}

                    {/* Footer Tech stack info */}
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <p className="text-xs font-mono text-primary/95 leading-relaxed tracking-wider">
                        <strong>[NEXUS STACK]:</strong> Python • Streamlit Layout • NLP Analysis • Pandas • Scikit-learn
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeModalProject.isSenti ? (
                // InstaSenti - AI Instagram Sentiment Analyzer layout
                <div className="grid lg:grid-cols-3 gap-8 text-left overflow-y-auto max-h-[70vh] pr-2">
                  
                  {/* Left Column: Analysis Panel & Inputs */}
                  <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl space-y-6 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                        <Instagram size={15} className="text-primary animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">Sentiment Live Composer</span>
                      </div>

                      {/* Comment Input Composer */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1">Simulate Custom Comment</label>
                          <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                            Type a response and hit analyze. Our NLP heuristic analyzer classifies sentiments in real time!
                          </p>
                        </div>
                        <textarea
                          rows={3}
                          value={newSentiComment}
                          onChange={(e) => setNewSentiComment(e.target.value)}
                          placeholder="e.g. This is absolutely amazing, love the design! 🔥"
                          className="w-full bg-white/5 border border-white/10 hover:border-white/20 p-3 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50 transition-all font-sans resize-none cursor-text placeholder-white/30"
                        />
                        <button
                          onClick={() => {
                            if (!newSentiComment.trim()) return;
                            setIsAnalyzingSenti(true);
                            setTimeout(() => {
                              const result = classifyComment(newSentiComment);
                              const newComment = {
                                id: sentiComments.length + 1,
                                text: newSentiComment,
                                username: "user_" + Math.floor(Math.random() * 900 + 100),
                                likes: Math.floor(Math.random() * 25),
                                sentiment: result.sentiment,
                                score: result.score,
                                emoji: result.emoji
                              };
                              setSentiComments([newComment, ...sentiComments]);
                              setNewSentiComment("");
                              setIsAnalyzingSenti(false);
                            }, 800);
                          }}
                          disabled={isAnalyzingSenti || !newSentiComment.trim()}
                          className="w-full py-3 px-4 bg-primary hover:bg-primary/95 text-black disabled:bg-white/5 disabled:text-white/40 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-none"
                        >
                          {isAnalyzingSenti ? (
                            <>
                              <RefreshCw size={13} className="animate-spin" />
                              Running NLP Heuristics...
                            </>
                          ) : (
                            <>
                              <Sparkles size={13} />
                              Analyze Sentiment
                            </>
                          )}
                        </button>
                      </div>

                      {/* Quick Filters */}
                      <div className="space-y-2 pt-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">Filter Feed By Sentiment</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { value: "all", label: "All Comments" },
                            { value: "positive", label: "Positive ✅" },
                            { value: "neutral", label: "Neutral 😐" },
                            { value: "negative", label: "Negative ❌" }
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setSentiFilter(opt.value as any)}
                              className={cn(
                                "py-2 px-1 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider cursor-none border",
                                sentiFilter === opt.value
                                  ? "bg-primary border-primary text-black"
                                  : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                              )}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mt-6">
                      <p className="text-[11px] font-mono text-primary/80 leading-relaxed">
                        ⚡ <strong>Tip:</strong> Try typing strong terms of praise or critique to test classifications, or include emojis like 🔥 or 😭.
                      </p>
                    </div>
                  </div>

                  {/* Middle & Right Column: Analytics & Comments Feed */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Visual Sentiment Insights Dashboard */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Stat 1 */}
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block mb-1">POS STREAK SHARE</span>
                        <div className="text-xl font-display font-bold text-green-400">
                          {Math.round((sentiComments.filter(c => c.sentiment === "positive").length / sentiComments.length) * 100)}%
                        </div>
                        <p className="text-[8px] font-mono text-white/40 mt-1">Approval Volume</p>
                      </div>

                      {/* Stat 2 */}
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block mb-1">TOTAL COMMENTS</span>
                        <div className="text-xl font-display font-bold text-white">
                          {sentiComments.length}
                        </div>
                        <p className="text-[8px] font-mono text-white/40 mt-1">Ingested count</p>
                      </div>

                      {/* Stat 3 */}
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center col-span-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block mb-1">NET PULSE RATE</span>
                        {(() => {
                          const scoreTotal = sentiComments.reduce((acc, c) => acc + c.score, 0);
                          const avgScore = scoreTotal / sentiComments.length;
                          let pulseColor = "text-yellow-400";
                          let label = "NEUTRAL";
                          if (avgScore >= 0.2) {
                            pulseColor = "text-green-400";
                            label = "POSITIVE";
                          } else if (avgScore <= -0.2) {
                            pulseColor = "text-red-400";
                            label = "NEGATIVE";
                          }
                          return (
                            <>
                              <div className={cn("text-xl font-display font-bold", pulseColor)}>
                                {(avgScore >= 0 ? "+" : "") + avgScore.toFixed(2)}
                              </div>
                              <p className="text-[8px] font-mono text-white/40 mt-1 uppercase">{label}</p>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Integrated Sentiment Ratio Chart */}
                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl space-y-3.5">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-white/40">Visual Comment Sentiment Ratio Breakdown</span>
                        <span className="text-primary font-mono">Live Ratios</span>
                      </div>

                      {/* Stacked Interactive Bar */}
                      {(() => {
                        const total = sentiComments.length;
                        const pos = sentiComments.filter(c => c.sentiment === "positive").length;
                        const neu = sentiComments.filter(c => c.sentiment === "neutral").length;
                        const neg = sentiComments.filter(c => c.sentiment === "negative").length;

                        const posPct = Math.round((pos / total) * 100) || 0;
                        const neuPct = Math.round((neu / total) * 100) || 0;
                        const negPct = Math.round((neg / total) * 100) || 0;

                        return (
                          <div className="space-y-4">
                            {/* Flex progress indicator bar */}
                            <div className="h-4 rounded-lg overflow-hidden flex border border-white/10 bg-white/5">
                              {posPct > 0 && (
                                <motion.div 
                                  initial={{ width: 0 }} 
                                  animate={{ width: `${posPct}%` }}
                                  className="bg-green-500 h-full relative group cursor-none"
                                >
                                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                </motion.div>
                              )}
                              {neuPct > 0 && (
                                <motion.div 
                                  initial={{ width: 0 }} 
                                  animate={{ width: `${neuPct}%` }}
                                  className="bg-zinc-500 h-full cursor-none"
                                />
                              )}
                              {negPct > 0 && (
                                <motion.div 
                                  initial={{ width: 0 }} 
                                  animate={{ width: `${negPct}%` }}
                                  className="bg-red-500 h-full relative group cursor-none"
                                >
                                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                                </motion.div>
                              )}
                            </div>

                            {/* Legends */}
                            <div className="grid grid-cols-3 text-[10px] uppercase font-bold font-mono tracking-wider pt-1 border-t border-white/5">
                              <div className="text-green-400 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                <span>Positive {posPct}%</span>
                              </div>
                              <div className="text-zinc-400 flex items-center justify-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                                <span>Neutral {neuPct}%</span>
                              </div>
                              <div className="text-red-400 flex items-center justify-end gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                <span>Negative {negPct}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Filtered Instagram Comments Feed */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">Comments Feed Pipeline ({sentiComments.filter(c => sentiFilter === "all" || c.sentiment === sentiFilter).length} instances)</span>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        {(() => {
                          const list = sentiComments.filter(c => sentiFilter === "all" || c.sentiment === sentiFilter);
                          if (list.length === 0) {
                            return (
                              <div className="py-12 text-center text-white/40 text-xs border border-dashed border-white/10 rounded-xl bg-zinc-900/10">
                                No comments matching the selected filter. Add one on the left panel!
                              </div>
                            );
                          }
                          return list.map((comment) => (
                            <motion.div
                              key={comment.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              layoutId={`comment-${comment.id}`}
                              className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 hover:bg-white/[0.04] transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                            >
                              <div className="space-y-1.5 max-w-[70%]">
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-bold font-mono text-primary/95">@{comment.username}</span>
                                  <span className={cn(
                                    "text-[8px] font-bold uppercase font-mono tracking-wider px-1.5 py-0.5 rounded",
                                    comment.sentiment === "positive" 
                                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                      : comment.sentiment === "negative"
                                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                      : "bg-white/5 text-white/60 border border-white/5"
                                  )}>
                                    {comment.sentiment}
                                  </span>
                                  <span className="text-[10px]">{comment.emoji}</span>
                                </div>
                                <p className="text-xs text-white/80 leading-relaxed font-sans">{comment.text}</p>
                              </div>

                              <div className="flex select-none flex-row md:flex-col items-start md:items-end justify-between md:justify-center shrink-0 border-t md:border-t-0 border-white/5 pt-2 md:pt-0 gap-2 font-mono">
                                <div className="text-[9px] text-white/40 uppercase font-bold tracking-wider">
                                  Likes: <span className="text-white font-normal">{comment.likes}</span>
                                </div>
                                <div className="space-y-1 w-20">
                                  <div className="flex justify-between text-[8px] text-white/40">
                                    <span>POLARITY</span>
                                    <span>{(comment.score >= 0 ? "+" : "") + comment.score.toFixed(1)}</span>
                                  </div>
                                  <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full">
                                    <div 
                                      className={cn(
                                        "h-full rounded-full",
                                        comment.score > 0 ? "bg-green-400" : "bg-red-400"
                                      )}
                                      style={{
                                        width: `${Math.abs(comment.score) * 100}%`
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ));
                        })()}
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <p className="text-xs font-mono text-primary/95 leading-relaxed tracking-wider">
                        <strong>[INSTASENTI STACK]:</strong> Python Streamlit • NLP TextBlob • Polarity Subjectivity Classifier • Plotly 3D visual graphs • Pandas Comment Parsing. Tested seamlessly with live comment scrapers.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // SalesVision AI Forecasting mode
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Control Panel Sidebar */}
                  <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl space-y-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      <Database size={15} className="text-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">Interactive Settings</span>
                    </div>

                    {/* Filter 1: Region Selection */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Filter Region</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {["All", "North", "South", "East", "West"].map((region) => {
                          const isSelected = region === "All" ? selectedRegion === "All Regions" : selectedRegion === region;
                          return (
                            <button
                              key={region}
                              onClick={() => setSelectedRegion(region === "All" ? "All Regions" : region)}
                              className={cn(
                                "py-2 px-1 text-xs font-semibold rounded-md transition-all uppercase tracking-widest cursor-none border",
                                isSelected 
                                  ? "bg-primary border-primary text-black" 
                                  : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                              )}
                            >
                              {region}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Filter 2: Forecasting Model */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Model Algorithm</label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full bg-white/5 border border-white/5 hover:border-white/10 px-3 py-2.5 rounded-lg text-xs text-white uppercase tracking-wider focus:outline-none focus:border-primary/50"
                      >
                        <option value="Prophet" className="bg-zinc-950">Facebook Prophet (ML)</option>
                        <option value="ARIMA" className="bg-zinc-950">ARIMA Baseline</option>
                        <option value="LSTM" className="bg-zinc-950">LSTM Deep Learning</option>
                        <option value="Linear" className="bg-zinc-950">Linear Regression</option>
                      </select>
                    </div>

                    {/* Filter 3: Confidence Interval */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-white/40">
                        <span>Interval Confidence</span>
                        <span className="text-primary font-mono font-bold">{confidenceInterval}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="80" 
                        max="99" 
                        value={confidenceInterval}
                        onChange={(e) => setConfidenceInterval(Number(e.target.value))}
                        className="w-full accent-primary bg-white/15 h-1 rounded-sm appearance-none outline-none cursor-none"
                      />
                    </div>

                    {/* Simulation Trigger Button */}
                    <button
                      onClick={handleRunForecast}
                      disabled={isSimulating}
                      className="w-full py-3 bg-primary hover:bg-primary/95 text-black font-bold uppercase tracking-widest text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-none disabled:opacity-50"
                    >
                      <Sparkles size={14} className={isSimulating ? "animate-spin" : ""} />
                      {isSimulating ? "Recalculating..." : "Run AI Forecast Model"}
                    </button>
                  </div>

                  {/* Main Forecast Graph Area */}
                  <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
                    {/* Real-time KPI Metric Widgets */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/30 block mb-1">Total Sales</span>
                        <span className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">{currentStats.revenue}</span>
                        <div className="text-[10px] text-green-400 mt-1 flex items-center gap-1 font-semibold">
                          <span>↑</span> {currentStats.growth}
                        </div>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/30 block mb-1">AI Recommendation</span>
                        <span className="text-xs md:text-sm font-semibold tracking-tight text-primary uppercase block animate-pulse">
                          {selectedModel === "Prophet" ? "High Demand Confidence" : "Optimize Stocking"}
                        </span>
                        <span className="text-[9px] text-white/40 block mt-1 uppercase font-mono tracking-wider">
                          {selectedModel} Running
                        </span>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/30 block mb-1 font-semibold">ML Forecasted Peak</span>
                        <span className="text-xl md:text-2xl font-display font-bold text-primary tracking-tight">
                          {currentStats.prediction}
                        </span>
                        <span className="text-[9px] text-white/40 block mt-1 uppercase font-semibold">
                          Expected Q3/Q4
                        </span>
                      </div>
                    </div>

                    {/* Dynamic interactive bar analytics chart */}
                    <div className="relative">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs uppercase tracking-wider text-white/40 font-bold">Predicted Sales Revenue Trend (12 Months)</span>
                        <span className="text-[9px] font-mono text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/20 tracking-widest font-bold">
                          {selectedRegion}
                        </span>
                      </div>

                      {isSimulating ? (
                        <div className="h-44 flex flex-col justify-center items-center bg-black/40 border border-white/5 p-6 rounded-2xl">
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3" />
                          <span className="text-xs uppercase font-mono tracking-widest text-primary font-bold">Computing machine learning matrices...</span>
                        </div>
                      ) : (
                        <div className="h-44 flex items-end justify-between gap-1.5 md:gap-3 bg-black/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
                          {currentStats.trend.map((val, idx) => {
                            const factor = selectedModel === "LSTM" ? 1.06 : selectedModel === "ARIMA" ? 0.94 : selectedModel === "Linear" ? 0.88 : 1;
                            const calculatedHeight = Math.min(Math.max(val * factor * (confidenceInterval / 95), 10), 100);
                            const isProjected = idx >= 9;

                            return (
                              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group/bar relative">
                                {/* Hover tooltip with calculations */}
                                <div className="absolute bottom-[105%] bg-zinc-900 border border-white/10 px-2 py-1 text-[9px] font-mono text-primary rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                                  Month {idx + 1}: ${(val * factor * 5).toFixed(1)}K
                                </div>
                                
                                {/* Column bar */}
                                <motion.div 
                                  initial={{ height: 0 }}
                                  animate={{ height: `${calculatedHeight}%` }}
                                  transition={{ duration: 0.4, ease: "easeOut" }}
                                  className={cn(
                                    "w-full rounded-t-sm transition-all duration-300", 
                                    isProjected ? "bg-primary" : "bg-white/10 group-hover/bar:bg-white/20"
                                  )}
                                />
                                <span className="text-[8px] font-mono text-white/30 mt-2 block uppercase font-bold">M{idx + 1}</span>
                                {isProjected && idx === 9 && (
                                  <span className="absolute -top-4 text-[7px] text-primary/60 tracking-wider font-bold">ML</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Insights block */}
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <p className="text-xs font-mono text-primary/95 leading-relaxed tracking-wider">
                        <strong>[SYSTEM INSIGHT]:</strong> {currentStats.insight}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer with external links */}
            <div className="p-6 md:p-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center bg-zinc-900/10 gap-4">
              <p className="text-white/40 text-xs text-center sm:text-left leading-relaxed">
                {activeModalProject.isArchitecture 
                  ? "Bespoke architectural layout optimized for smooth performance and ultra-fast visual loads."
                  : activeModalProject.isSenti
                  ? "Heuristic NLP Streamlit engine. Analyzes, filters, and classifies active comment feedback metrics instantly."
                  : "Python Streamlit engine hosted securely on Cloud Infrastructure. ML models run in realtime pipeline."}
              </p>
              <div className="flex gap-4">
                {activeModalProject.github && (
                  <a
                    href={activeModalProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center gap-2 cursor-none"
                  >
                    <Github size={14} />
                    GitHub Repository
                  </a>
                )}
                {activeModalProject.demo && (
                  <a
                    href={activeModalProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-black text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center gap-2 cursor-none"
                  >
                    <ExternalLink size={14} />
                    View Project
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Contact</span>
              <h2 className="text-huge mb-12">LET'S<br /><span className="text-outline">TALK</span></h2>
              
              <div className="space-y-12">
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold mb-6">Get in touch</p>
                  <div className="space-y-4">
                    <a href="mailto:tanishjain93133@gmail.com" className="block text-3xl md:text-4xl font-display font-bold hover:text-primary transition-colors">
                      tanishjain93133@gmail.com
                    </a>
                    <a href="tel:7049845357" className="block text-2xl font-display font-bold text-white/60 hover:text-primary transition-colors">
                      +91 7049845357
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold mb-6">Socials</p>
                  <div className="flex flex-wrap gap-8">
                    {[
                      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/tanish-jain-324284271/' },
                      { name: 'GitHub', href: 'https://github.com/tanishjain93133-hub' },
                      { name: 'Instagram', href: 'https://www.instagram.com/tanish__.6' }
                    ].map((social) => (
                      <a 
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-12 lg:p-20 border border-white/5 relative">
              <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-primary/20" />
              <form className="space-y-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-primary outline-none transition-all text-xl font-display"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-primary outline-none transition-all text-xl font-display"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-primary outline-none transition-all text-xl font-display resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 bg-primary text-black font-black uppercase tracking-[0.3em] text-sm"
                >
                  Send Inquiry
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialConnect = () => {
  return (
    <section className="text-center py-32 px-6 bg-black">
      <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Network</span>
      <h2 className="text-5xl font-display font-bold mb-16 uppercase tracking-tighter">Follow My <span className="text-outline">Journey</span></h2>

      <div className="flex flex-wrap justify-center gap-12">
        {[
          { name: 'LinkedIn', href: 'https://www.linkedin.com/in/tanish-jain-324284271/' },
          { name: 'GitHub', href: 'https://github.com/tanishjain93133-hub' },
          { name: 'Instagram', href: 'https://www.instagram.com/tanish__.6' }
        ].map((social) => (
          <a 
            key={social.name}
            href={social.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative text-2xl font-display font-bold uppercase tracking-widest py-4"
          >
            <span className="relative z-10 group-hover:text-primary transition-colors">{social.name}</span>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
          </a>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold">TJ</div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest">© 2026 Tanish Jain. All rights reserved.</p>
        </div>
        <div className="flex gap-12">
          <a href="#" className="text-white/30 hover:text-primary transition-colors text-[10px] uppercase tracking-widest font-bold">Privacy</a>
          <a href="#" className="text-white/30 hover:text-primary transition-colors text-[10px] uppercase tracking-widest font-bold">Terms</a>
        </div>
      </div>
    </footer>
  );
};

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        style={{ 
          x: cursorX, 
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isPointer ? 0.5 : 1
        }}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block"
      />
      <motion.div
        style={{ 
          x: cursorX, 
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
        className="fixed top-0 left-0 w-8 h-8 border border-primary/20 rounded-full pointer-events-none z-[9998] hidden md:block"
      />
    </>
  );
};

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
      onAnimationComplete={() => document.body.style.overflow = 'auto'}
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center pointer-events-none"
    >
      <div className="overflow-hidden">
        <motion.h2 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-4xl font-display font-black tracking-tighter text-white uppercase"
        >
          TANISH JAIN<span className="text-primary">.</span>
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-[2px] bg-primary mt-2 origin-left"
        />
      </div>
    </motion.div>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-10 right-10 z-50 w-14 h-14 bg-primary flex items-center justify-center text-black hover:scale-110 transition-all shadow-2xl"
    >
      <ArrowUp size={24} strokeWidth={3} />
    </motion.button>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div className="relative font-sans antialiased">
      <Preloader />
      <CustomCursor />
      <BackToTop />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        {activePage === 'home' ? (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </>
        ) : (
          <Certificates />
        )}
        <SocialConnect />
      </main>

      <Footer />
    </div>
  );
}
