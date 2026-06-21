import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, ExternalLink, Award, Calendar, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Certificate {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  image: string;
  category: string;
  verifyUrl?: string;
  isDigitalCert?: boolean;
  certCode?: string;
  authority?: string;
  completionDate?: string;
  hours?: string;
  isBadgeLayout?: boolean;
}

// Beautiful CSS/SVG-based interactive digital certificate presentation component
export function DigitalCertificatePreview({ cert, isModal = false }: { cert: Certificate; isModal?: boolean }) {
  if (cert.isBadgeLayout) {
    return (
      <div className={cn(
        "w-full bg-white text-zinc-900 border-[8px] md:border-[12px] border-[#0F62FE] font-sans relative flex flex-col justify-between shadow-xl overflow-hidden select-none transition-all duration-300",
        isModal ? "aspect-[1.414/1] max-w-4xl p-6 md:p-12 animate-fade-in" : "aspect-[1.414/1] p-3 text-[7px]"
      )}>
        <div className="grid grid-cols-12 h-full gap-4 md:gap-6">
          <div className="col-span-8 flex flex-col justify-between h-full text-left">
            <div>
              <p className={cn("font-medium text-zinc-650 mb-1 md:mb-2 tracking-wide leading-tight", isModal ? "text-sm md:text-base" : "text-[4.5px]")}>
                In recognition of the commitment to achieve professional excellence
              </p>
              <h1 className={cn("font-extrabold tracking-tight text-zinc-950 leading-none mb-2 md:mb-6", isModal ? "text-2xl md:text-4xl font-display" : "text-[8px]")}>
                TANISH JAIN
              </h1>
              <p className={cn("text-zinc-500 mb-1 font-medium leading-normal", isModal ? "text-[11px] md:text-xs" : "text-[4px]")}>
                Has successfully satisfied the requirements for:
              </p>
              <h2 className={cn("font-bold text-[#0F62FE] leading-tight", isModal ? "text-lg md:text-2xl border-b border-zinc-200 pb-2 md:pb-4 font-display" : "text-[6px] border-b border-zinc-100 pb-0.5")}>
                {cert.title}
              </h2>
            </div>

            <div className={cn("text-zinc-500 mt-1 md:mt-2", isModal ? "text-[11px] md:text-xs space-y-0.5 md:space-y-1" : "text-[3.5px]")}>
              <p><strong className="text-zinc-700 font-semibold">Issued on:</strong> {cert.completionDate || cert.date}</p>
              <p><strong className="text-zinc-700 font-semibold">Issued by:</strong> {cert.organization}</p>
              {cert.verifyUrl && (
                <p className="text-[#0F62FE] truncate max-w-full font-mono mt-0.5">
                  Verify Link: {cert.verifyUrl}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-4 flex flex-col items-center justify-center bg-[#0F62FE]/5 rounded-lg border border-[#0F62FE]/10 p-2 md:p-4 relative">
            <div className={cn(
              "relative flex items-center justify-center bg-[#161616] text-[#FF43A6] rounded-lg border-t border-white/20 p-2 md:p-4 text-center select-none shadow-md transition-all",
              isModal ? "w-28 h-28 md:w-36 md:h-36" : "w-10 h-10"
            )}>
              <div className={cn("absolute border border-dashed border-[#FF43A6]/30 rounded-md", isModal ? "inset-1.5" : "inset-0.5")}></div>
              <div className="flex flex-col items-center justify-center">
                <span className={cn("font-black tracking-widest leading-none text-white", isModal ? "text-[8px] md:text-[10px]" : "text-[2.2px]")}>IBM</span>
                <span className={cn("font-mono font-medium text-white/50 leading-none", isModal ? "text-[6px] md:text-[8px]" : "text-[1.8px]")}>SkillsBuild</span>
                <span className={cn("font-black uppercase tracking-wide leading-tight mt-0.5 md:mt-1.5 text-[#FF43A6]", isModal ? "text-[10px] md:text-[12px]" : "text-[2.6px]")}>AI</span>
                <span className={cn("font-bold uppercase tracking-wider text-white leading-normal", isModal ? "text-[7px] md:text-[9px]" : "text-[2px]")}>Fundamentals</span>
              </div>
            </div>
            
            <div className={cn("absolute font-black tracking-widest text-[#0F62FE]/80 select-none", isModal ? "bottom-3 right-3 text-lg" : "bottom-1 right-1 text-[5px]")}>
              IBM
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full bg-[#F3F4F6] text-zinc-900 border border-zinc-200 font-sans relative flex flex-col justify-between shadow-xl transition-all duration-300",
      isModal ? "aspect-[1.414/1] max-w-4xl" : "aspect-[1.414/1]"
    )}>
      {/* Header Bar */}
      <div className={cn(
        "bg-[#BEC1C3] flex items-center justify-between border-b border-zinc-300 text-zinc-950 select-none font-medium",
        isModal ? "px-8 md:px-12 py-3.5 md:py-4.5 text-xs md:text-[15px]" : "px-2.5 py-1 text-[4px]"
      )}>
        <div className="flex items-center gap-1">
          <span className="font-normal font-sans">IBM</span>
          <span className="font-black font-sans">SkillsBuild</span>
        </div>
        <div className="font-normal text-zinc-800 tracking-wide">
          Completion Certificate
        </div>
      </div>

      {/* Main Content Body */}
      <div className={cn(
        "flex-1 grid grid-cols-12 items-center text-left",
        isModal ? "px-8 md:px-12 py-4 md:py-6" : "px-2.5 py-1"
      )}>
        {/* Left Side: Medal */}
        <div className="col-span-3 flex justify-center items-center">
          <div className={cn("transition-transform duration-500", isModal ? "scale-95 md:scale-105" : "scale-[0.4] origin-center -ml-2.5 -mr-1.5")}>
            <svg width="100" height="130" viewBox="0 0 100 130" className="text-[#FFCC00] select-none">
              {/* Left ribbon tail */}
              <path d="M35,65 V115 L48,103 L61,115 V65" fill="#FFCC00" />
              <path d="M35,65 V115 L48,103 L61,115 V65" fill="none" stroke="#E6B800" strokeWidth="1.5" />
              {/* Right ribbon tail */}
              <path d="M47,65 V122 L60,110 L73,122 V65" fill="#FFD633" />
              <path d="M47,65 V122 L60,110 L73,122 V65" fill="none" stroke="#FFCC00" strokeWidth="1.5" />
              
              {/* Gold Ring */}
              <circle cx="50" cy="50" r="34" fill="#F3F4F6" stroke="#FFCC00" strokeWidth="5.5" />
              {/* Inner dashed ring */}
              <circle cx="50" cy="50" r="27" fill="none" stroke="#FFE066" strokeWidth="1.5" strokeDasharray="3,2" />
              {/* Inner logo/ribbon emblem inside ring */}
              <path d="M50,33 L54,42 L64,44 L57,51 L59,61 L50,56 L41,61 L43,51 L36,44 L46,42 Z" fill="#FFCC00" />
            </svg>
          </div>
        </div>

        {/* Right Side: Centered Typography */}
        <div className="col-span-9 flex flex-col justify-center text-center">
          <p className={cn("text-zinc-600 font-normal leading-normal", isModal ? "text-xs md:text-base" : "text-[3.2px]")}>
            This certificate is presented to
          </p>
          <h1 className={cn("font-medium tracking-wide uppercase text-zinc-900 leading-tight font-sans", isModal ? "text-[22px] md:text-[34px] mt-1 mb-2" : "text-[7.5px] my-0.5")}>
            TANISH JAIN
          </h1>
          <p className={cn("text-zinc-600 font-normal leading-normal", isModal ? "text-xs md:text-base" : "text-[3.2px]")}>
            for the completion of
          </p>
          <h2 className={cn("font-black text-black leading-tight tracking-tight font-sans", isModal ? "text-[21px] md:text-[32px] max-w-2xl mx-auto mt-1 mb-1" : "text-[9.5px] my-0.5")}>
            {cert.title}
          </h2>
          {cert.certCode && (
            <p className={cn("font-normal text-zinc-700 tracking-wider font-sans", isModal ? "text-[12px] md:text-[16px] my-1" : "text-[4px] my-0.5")}>
              ({cert.certCode})
            </p>
          )}
          {cert.authority && (
            <p className={cn("text-zinc-500 font-normal leading-normal", isModal ? "text-[10px] md:text-[11.5px] mt-1" : "text-[2.8px] scale-95 mt-0.5")}>
              According to the {cert.authority}
            </p>
          )}
        </div>
      </div>

      {/* Footer Bar */}
      <div className={cn(
        "bg-[#9AA1A6] text-zinc-950 flex items-center justify-between font-normal font-sans select-none",
        isModal ? "px-8 md:px-12 py-3.5 md:py-4.5 text-[11px] md:text-[14px]" : "px-2.5 py-1 text-[3.2px]"
      )}>
        <div>
          Completion date: <span className="font-bold text-zinc-950">{cert.completionDate || cert.date}</span>
        </div>
        {cert.hours && (
          <div className="font-bold text-zinc-950">
            Learning hours: {cert.hours}
          </div>
        )}
      </div>
    </div>
  );
}

const certificates: Certificate[] = [
  {
    id: 12,
    title: "Artificial Intelligence Fundamentals",
    organization: "IBM SkillsBuild",
    date: "June 2026",
    description: "Earned professional credential confirming core competencies in Artificial Intelligence paradigms, neural networks, deep learning logic, and ethical AI deployment.",
    image: "/images/certificates/ai_fundamentals_badge.png",
    category: "AI Fundamentals",
    verifyUrl: "https://www.credly.com/badges/54f6652b-f04c-49f3-9462-bd01c70a09d1",
    isDigitalCert: false,
    isBadgeLayout: true,
    completionDate: "Jun 03, 2026"
  },
  {
    id: 8,
    title: "Advanced Digital Marketing Certification",
    organization: "Maxcess DMI Institute",
    date: "September 2025",
    description: "Successfully completed advanced digital marketing certification, covering SEO, social media marketing, content strategy, and performance advertising.",
    image: "/images/certificates/advanced_digital_marketing.jpg",
    category: "Digital Marketing"
  },
  {
    id: 10,
    title: "AWS Academy Graduate – Cloud Foundations",
    organization: "AWS Academy",
    date: "October 2025",
    description: "Completed AWS Cloud Foundations training (20 hours), gaining knowledge of cloud computing, AWS services, and real-world cloud applications.",
    image: "/images/certificates/aws_academy.jpg",
    category: "Cloud Computing"
  },
  {
    id: 2,
    title: "JavaScript Training",
    organization: "EduPyramids | IIT Bombay",
    date: "March 2026",
    description: "Successfully completed JavaScript training with a score of 72.5%, covering fundamentals, logic building, and real-world programming concepts.",
    image: "/images/certificates/javascript_training.jpg",
    category: "Web Development"
  },
  {
    id: 11,
    title: "From User to Builder: AI, Data Science & Agentic Systems",
    organization: "IBM SkillsBuild",
    date: "June 2026",
    description: "Successfully completed the professional builder program, focusing on agentic workflows, advanced data science pipelines, and designing autonomous system architectures.",
    image: "/images/certificates/user_to_builder.jpg",
    category: "AI & Data Science",
    isDigitalCert: false,
    certCode: "PLAN-CD7F6D971CDF",
    authority: "Your Learning Builder - Plans system of record",
    completionDate: "03 Jun 2026 (GMT)"
  },
  {
    id: 1,
    title: "Python Generative AI",
    organization: "IEEE",
    date: "March 2026",
    description: "Learned Python & Generative AI concepts.",
    image: "/images/certificates/python_gen_ai.jpg",
    category: "AI & Python"
  },
  {
    id: 13,
    title: "Unleashing the Power of AI Agents",
    organization: "IBM SkillsBuild",
    date: "June 2026",
    description: "Rigorous certification covering execution frameworks for autonomous AI agents, multi-agent collaboration, goal decomposition, and structured prompt engineering templates.",
    image: "/images/certificates/ai_agents.jpg",
    category: "AI Agents",
    isDigitalCert: false,
    certCode: "ALM-COURSE_3825456",
    authority: "Adobe Learning Manager system of record",
    completionDate: "03 Jun 2026 (GMT)",
    hours: "1 hr 30 mins"
  },
  {
    id: 14,
    title: "Artificial Intelligence Fundamentals (Earn a credential!)",
    organization: "IBM SkillsBuild",
    date: "June 2026",
    description: "Completed comprehensive technical training on foundational search algorithms, machine learning workflows, predictive analysis tools, and modern NLP capabilities.",
    image: "/images/certificates/ai_fundamentals_cert.jpg",
    category: "AI Foundations",
    isDigitalCert: false,
    certCode: "PLAN-7913EE1DB030",
    authority: "Your Learning Builder - Plans system of record",
    completionDate: "03 Jun 2026 (GMT)"
  },
  {
    id: 3,
    title: "Python 101: Version 3.0",
    organization: "IEEE Silver Oak University",
    date: "March 2025",
    description: "Completed hands-on Python workshop focusing on programming logic, data structures, and practical coding experience.",
    image: "/images/certificates/python101.jpg",
    category: "Python"
  },
  {
    id: 9,
    title: "Power BI Workshop",
    organization: "OfficeMaster",
    date: "November 2025",
    description: "Completed Power BI workshop, learning to create interactive dashboards, data visualization, and AI-powered analytics solutions.",
    image: "/images/certificates/power_bi.jpg",
    category: "Data Visualization"
  },
  {
    id: 4,
    title: "AI Tools & ChatGPT Workshop",
    organization: "be10x",
    date: "October 2025",
    description: "Successfully completed AI tools and ChatGPT workshop, learning how to create presentations, analyze data, and automate tasks efficiently using AI.",
    image: "/images/certificates/ai_tools_chatgpt.jpg",
    category: "AI Tools"
  },
  {
    id: 6,
    title: "Microsoft Excel (Self Learning)",
    organization: "Skill Course",
    date: "November 2025",
    description: "Completed Microsoft Excel course focusing on data analysis, formulas, and real-world business applications for efficient data management.",
    image: "/images/certificates/excel_self_learning.jpg",
    category: "Data Analysis"
  },
  {
    id: 7,
    title: "Narcotics Control Awareness",
    organization: "Ministry of Home Affairs",
    date: "October 2026",
    description: "Participated in the “Say Yes to Life, No to Drugs” initiative, promoting awareness about drug prevention and encouraging a healthy lifestyle.",
    image: "/images/certificates/narcotics_control.jpg",
    category: "Social Awareness"
  }
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="min-h-screen pt-40 pb-24 relative bg-black">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Achievements</span>
          <h1 className="text-huge mb-8">
            MY <span className="text-outline">CERTIFICATES</span>
          </h1>
          <p className="text-white/40 text-xl max-w-2xl font-light leading-relaxed">
            A curated collection of professional certifications and specialized training that validate my expertise in digital strategy and technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/5">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer p-12 border-r border-b border-white/5 hover:bg-primary/5 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-8 border border-white/5">
                {cert.isDigitalCert ? (
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full p-2 flex items-center justify-center bg-zinc-950"
                  >
                    <DigitalCertificatePreview cert={cert} isModal={false} />
                  </motion.div>
                ) : (
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-contain bg-zinc-900/60 p-2 grayscale group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop`;
                    }}
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest font-bold text-primary">
                    {cert.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-white/40 text-[11px] uppercase tracking-widest font-bold">
                    <Building2 size={14} className="text-primary" />
                    <span>{cert.organization}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/40 text-[11px] uppercase tracking-widest font-bold">
                    <Calendar size={14} className="text-primary" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                <p className="text-sm text-white/30 line-clamp-2 leading-relaxed font-light">
                  {cert.description}
                </p>

                <div className="pt-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 group-hover:text-primary transition-colors">
                    View Details <span>→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div 
              className="absolute inset-0 bg-black/90" 
              onClick={() => setSelectedCert(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-6xl bg-black border border-white/10 overflow-hidden z-10"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-8 right-8 w-12 h-12 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black z-20 transition-all"
              >
                <X size={24} />
              </button>

              <div className="grid lg:grid-cols-5 h-full max-h-[90vh] overflow-y-auto">
                <div className="lg:col-span-3 bg-white/5 flex items-center justify-center p-6 lg:p-12 border-r border-white/10">
                  {selectedCert.isDigitalCert ? (
                    <div className="w-full max-w-2xl">
                      <DigitalCertificatePreview cert={selectedCert} isModal={true} />
                    </div>
                  ) : (
                    <img 
                      src={selectedCert.image} 
                      alt={selectedCert.title} 
                      className="max-w-full max-h-full border border-white/10 shadow-2xl"
                    />
                  )}
                </div>
                
                <div className="lg:col-span-2 p-12 lg:p-20 flex flex-col justify-center">
                  <div className="mb-12">
                    <div className="w-16 h-16 border border-primary/30 flex items-center justify-center text-primary mb-8">
                      <Award size={32} />
                    </div>
                    <h2 className="text-4xl font-display font-bold mb-6 leading-tight">{selectedCert.title}</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white/40 uppercase tracking-widest text-xs font-bold">
                        <Building2 size={18} className="text-primary" />
                        <span>{selectedCert.organization}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/40 uppercase tracking-widest text-xs font-bold">
                        <Calendar size={18} className="text-primary" />
                        <span>{selectedCert.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">Description</h4>
                      <p className="text-white/60 leading-relaxed font-light text-lg">
                        {selectedCert.description}
                      </p>
                    </div>
                    
                    <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                      {selectedCert.verifyUrl && (
                        <a
                          href={selectedCert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-4 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white hover:text-black text-center font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={14} />
                          Verify Credential
                        </a>
                      )}
                      <button 
                        onClick={() => setSelectedCert(null)}
                        className={cn(
                          "font-black uppercase tracking-[0.2em] text-xs transition-colors py-4",
                          selectedCert.verifyUrl 
                            ? "flex-1 bg-primary text-black hover:bg-white" 
                            : "w-full py-6 bg-primary text-black text-sm tracking-[0.3em] hover:bg-white"
                        )}
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
