import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';
import { 
  Menu, X, Github, Linkedin, Twitter, ArrowUp, Instagram, 
  TrendingUp, Layout, BarChart3, Video, Cpu, Search, Code, PieChart 
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import Hyperspeed from './components/Hyperspeed';
import DecryptedText from './components/DecryptedText';
import { cn } from './lib/utils';
import Certificates from './components/Certificates';

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
      isScrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent"
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
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 blur-[180px] pointer-events-none" />
      
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative p-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-primary/50 transition-all duration-500 group overflow-hidden rounded-2xl"
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
                  
                  {/* Animated Glowing Dot */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-primary rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                  />
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
  const projects = [
    {
      title: "DSA Architecture Website",
      category: "Architecture & Design",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
      year: "2026",
      description: "Modern architecture & interior design website with premium UI and smooth animations.",
      link: "https://ai.studio/apps/6b0209ce-2d69-4b7f-8525-1b82a35dbdcc"
    },
    {
      title: "InstaSenti",
      category: "AI & Sentiment Analysis",
      image: "https://lh3.googleusercontent.com/d/1gRQcwR_kG02Njh6vVfDTsNIvBzLv_FP8",
      year: "2026",
      description: "Instagram Sentiment Analyzer - Deciphering social pulse with AI and 3D data visualizations.",
      link: "https://ai.studio/apps/7c1fa3d4-6f7c-4005-813e-e54a16143ac0"
    },
    {
      title: "AI Resume Checker",
      category: "AI & Productivity",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2000",
      year: "2026",
      description: "Intelligent AI Resume Analyzer - Providing instant feedback and optimization tips using LLMs.",
      link: "https://ai.studio/apps/drive/1oxqUJ1rbkUjog1huGHYSc850Ln_DsK-e"
    },
  ];

  return (
    <section id="projects" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Portfolio</span>
            <h2 className="text-6xl font-display font-bold uppercase tracking-tighter">Selected <span className="text-outline">Works</span></h2>
          </div>
          <motion.button
            whileHover={{ x: 10 }}
            className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-4 border-b border-primary pb-2"
          >
            View All Projects <span>→</span>
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden mb-8 aspect-[16/10] bg-zinc-900/50 border border-white/5 flex items-center justify-center">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-contain transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Overlay on Hover */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-white border border-white/10 z-10">
                  {project.year}
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                  <h3 className="text-3xl font-display font-bold group-hover:text-primary transition-colors mb-4">{project.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-sm group-hover:text-white/60 transition-colors">
                    {project.description}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary shrink-0 transition-all duration-300 translate-y-2">
                  <ArrowUp className="rotate-45 text-white group-hover:text-black transition-colors" size={20} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        animate={{ 
          x: position.x - 4, 
          y: position.y - 4,
          scale: isPointer ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.5 }}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block"
      />
      <motion.div
        animate={{ 
          x: position.x - 20, 
          y: position.y - 20,
          scale: isPointer ? 1.5 : 1,
          borderColor: isPointer ? '#ff7a00' : 'rgba(255, 122, 0, 0.3)'
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.8 }}
        className="fixed top-0 left-0 w-10 h-10 border border-primary/30 rounded-full pointer-events-none z-[9998] hidden md:block"
      />
    </>
  );
};

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      onAnimationComplete={() => document.body.style.overflow = 'auto'}
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center pointer-events-none"
    >
      <div className="overflow-hidden">
        <motion.h2 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
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
