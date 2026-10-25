import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, ExternalLink, Award, Calendar, Building2, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
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
  pdfUrl?: string;
  isDigitalCert?: boolean;
  certCode?: string;
  authority?: string;
  completionDate?: string;
  hours?: string;
  isBadgeLayout?: boolean;
  credentialId?: string;
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

const getGoogleDriveFallback = (src: string): string => {
  const mapping: Record<string, string> = {
    '/images/certificates/ai_fundamentals_badge.png': '1gCOnjxies8ystY_JIB_ggeRZ1LzurAQP',
    '/images/certificates/advanced_digital_marketing.jpg': '1NzHQnyiVwvVxHWCbeTqge4HW9ITFCSai',
    '/images/certificates/aws_academy.jpg': '1v7moLn3XrFf6AFKG2z0EIxznO9sRq3S6',
    '/images/certificates/javascript_training.jpg': '1TKRnnFDjgZ8SKfWvC947xMMILbY43tch',
    '/images/certificates/user_to_builder.jpg': '1uI3m0nrwckqQlap8ITzB13nx25_kEdaH',
    '/images/certificates/python_gen_ai.jpg': '1Apu9NxZ-khPs5XZgalD2N-KJGSKqMvq7',
    '/images/certificates/ai_agents.jpg': '1JXGd_-_lXbbxeA9ALnemqUKE9q2Dpmj5',
    '/images/certificates/ai_fundamentals_cert.jpg': '1RmCKsjMAGQ9zr2OyYRfWyr17Ei2-HER9',
    '/images/certificates/python101.jpg': '1H3XJ5fvmVmgW9ikA82et1XBCh1u_8g_A',
    '/images/certificates/power_bi.jpg': '1w72oZh0GErBd0ZEO3dvdcnvb4SxC8QBn',
    '/images/certificates/ai_tools_chatgpt.jpg': '1Yoo3ZsrEw0yyRPF7oLrb3_GsRAFXslwq',
    '/images/certificates/excel_self_learning.jpg': '18P2xxIsJzl50nlEDx1uTuZuMdqV5jPhL',
    '/images/certificates/narcotics_control.jpg': '1OFYznZZ_2scrbIhgDqr5sZ8sUsJcCWPH',
  };
  const cleanPath = '/' + src.replace(/^\/+/, '');
  const id = mapping[src] || mapping[cleanPath];
  if (id) {
    return `https://lh3.googleusercontent.com/d/${id}`;
  }
  return src;
};

// Certificates array organized strictly as requested:
// 1. IBM SkillsBuild Training Program (Position 1)
// 2. Advanced Digital Marketing (Position 2 - DM)
// 3. Basics of Data Science (Position 3 - Data Science)
// 4+. Amazon Q Introduction, followed by the remaining certificates one by one
const certificates: Certificate[] = [
  {
    id: 15,
    title: "IBM SkillsBuild Training Program – AI Data Science & Agentic Systems",
    organization: "IBM SkillsBuild | BharatCares",
    date: "June 2026",
    description: "Successfully completed the intensive 2-week 'IBM SkillsBuild Training Program - AI Data Science & Agentic Systems' in association with BharatCares, conducted from 1st June 2026 to 15th June 2026. Specialized in autonomous agentic workflows and advanced data science pipelines.",
    image: "/images/certificates/ibm_skillsbuild_training.png",
    category: "IBM SkillsBuild",
    certCode: "Unique ID: IBMTPAI366",
    credentialId: "IBMTPAI366",
    authority: "CSR Programs, BharatCares & IBM SkillsBuild",
    completionDate: "15th June 2026",
    pdfUrl: "/assets/aistudio/Tanish_Jain__2-Week_IBM_SkillsBuild_Certificate_36da05d3.pdf"
  },
  {
    id: 8,
    title: "Advanced Digital Marketing Certification",
    organization: "Maxcess DMI Institute",
    date: "September 2025",
    description: "Successfully completed advanced digital marketing certification, covering SEO, social media marketing, content strategy, performance advertising, and audience lead generation.",
    image: "/images/certificates/advanced_digital_marketing.jpg",
    category: "Digital Marketing"
  },
  {
    id: 16,
    title: "Basics of Data Science",
    organization: "UniAthena & CIQ, UK",
    date: "September 2026",
    description: "Successfully completed Basics of Data Science course developed and delivered by UniAthena in partnership with Cambridge International Qualifications (CIQ), UK. Blockchain-verified certificate under Athena Global Education & FEDE.",
    image: "/images/certificates/uniathena_basics_of_data_science.png",
    category: "Data Science",
    certCode: "Blockchain ID: 8246-1413-1968",
    credentialId: "8246-1413-1968",
    authority: "Cambridge International Qualifications, UK & UniAthena",
    completionDate: "15, September 2026",
    pdfUrl: "/assets/aistudio/Tanish_CR1061_certificate_17218e6e.pdf"
  },
  {
    id: 17,
    title: "Amazon Q Introduction",
    organization: "AWS Training & Certification",
    date: "July 2026",
    description: "Completion Certificate awarded by AWS Training & Certification for completing the Amazon Q Introduction training, mastering generative AI assistant capabilities, prompt interactions, and developer productivity workflows on AWS.",
    image: "/images/certificates/amazon_q_introduction.png",
    category: "Cloud & AI",
    authority: "Michelle Vaz, Director, AWS Training & Certification",
    completionDate: "July 21, 2026",
    pdfUrl: "/assets/aistudio/Amazon_Q_Introduction_certificate_cb5c0f1b.pdf"
  },
  {
    id: 12,
    title: "Artificial Intelligence Fundamentals",
    organization: "IBM SkillsBuild",
    date: "June 2026",
    description: "Earned professional credential confirming core competencies in Artificial Intelligence paradigms, neural networks, deep learning logic, and ethical AI deployment.",
    image: "/images/certificates/ai_fundamentals_badge.png",
    category: "IBM SkillsBuild",
    verifyUrl: "https://www.credly.com/badges/54f6652b-f04c-49f3-9462-bd01c70a09d1",
    isDigitalCert: false,
    isBadgeLayout: true,
    completionDate: "Jun 03, 2026"
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
    category: "IBM SkillsBuild",
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
    category: "IBM SkillsBuild",
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
    category: "IBM SkillsBuild",
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
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'IBM SkillsBuild',
    'Digital Marketing',
    'Data Science',
    'Cloud & AI',
    'Web & Code'
  ];

  const filteredCertificates = certificates.filter((cert) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'IBM SkillsBuild') return cert.category === 'IBM SkillsBuild';
    if (activeCategory === 'Digital Marketing') return cert.category === 'Digital Marketing';
    if (activeCategory === 'Data Science') return cert.category === 'Data Science' || cert.category === 'Data Analysis' || cert.category === 'Data Visualization';
    if (activeCategory === 'Cloud & AI') return cert.category === 'Cloud & AI' || cert.category === 'Cloud Computing' || cert.category === 'AI Tools';
    if (activeCategory === 'Web & Code') return cert.category === 'Web Development' || cert.category === 'Python' || cert.category === 'AI & Python';
    return true;
  });

  return (
    <div className="min-h-screen pt-40 pb-24 relative bg-black">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Achievements</span>
          <h1 className="text-huge mb-8">
            MY <span className="text-outline">CERTIFICATES</span>
          </h1>
          <p className="text-white/40 text-xl max-w-2xl font-light leading-relaxed mb-8">
            A curated collection of professional certifications and specialized training that validate my expertise in AI systems, digital strategy, and data science.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
            {categories.map((cat) => {
              const count = certificates.filter((cert) => {
                if (cat === 'All') return true;
                if (cat === 'IBM SkillsBuild') return cert.category === 'IBM SkillsBuild';
                if (cat === 'Digital Marketing') return cert.category === 'Digital Marketing';
                if (cat === 'Data Science') return cert.category === 'Data Science' || cert.category === 'Data Analysis' || cert.category === 'Data Visualization';
                if (cat === 'Cloud & AI') return cert.category === 'Cloud & AI' || cert.category === 'Cloud Computing' || cert.category === 'AI Tools';
                if (cat === 'Web & Code') return cert.category === 'Web Development' || cert.category === 'Python' || cert.category === 'AI & Python';
                return true;
              }).length;

              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-300 flex items-center gap-2",
                    isActive
                      ? "bg-primary text-black shadow-lg shadow-primary/20 scale-105"
                      : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                  )}
                >
                  <span>{cat}</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-mono",
                    isActive ? "bg-black/20 text-black font-extrabold" : "bg-white/10 text-white/40"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/5">
          {filteredCertificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer p-8 md:p-12 border-r border-b border-white/5 hover:bg-primary/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden mb-8 border border-white/5 rounded-lg bg-zinc-900/60">
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
                      className="w-full h-full object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('googleusercontent.com')) {
                          target.src = getGoogleDriveFallback(cert.image);
                          target.referrerPolicy = "no-referrer";
                        } else {
                          target.src = `https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop`;
                        }
                      }}
                    />
                  )}
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-black/75 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest font-bold text-primary rounded-sm">
                      {cert.category}
                    </span>
                  </div>

                  {/* PDF indicator or Verified pill */}
                  {cert.pdfUrl && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-[9px] uppercase tracking-wider font-bold text-primary rounded-sm flex items-center gap-1">
                        <FileText size={10} />
                        PDF
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {cert.title}
                  </h3>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-white/40 text-[11px] uppercase tracking-widest font-bold">
                      <Building2 size={14} className="text-primary shrink-0" />
                      <span className="truncate">{cert.organization}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/40 text-[11px] uppercase tracking-widest font-bold">
                      <Calendar size={14} className="text-primary shrink-0" />
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  <p className="text-sm text-white/40 line-clamp-2 leading-relaxed font-light">
                    {cert.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 group-hover:text-primary transition-colors flex items-center gap-2">
                  View Credential <span>→</span>
                </span>
                {cert.certCode && (
                  <span className="text-[10px] font-mono text-white/30 truncate max-w-[150px]">
                    {cert.credentialId || cert.certCode}
                  </span>
                )}
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
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
              onClick={() => setSelectedCert(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-6xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden z-10 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 w-11 h-11 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-black z-20 transition-all"
              >
                <X size={20} />
              </button>

              <div className="grid lg:grid-cols-5 h-full max-h-[90vh] overflow-y-auto">
                <div className="lg:col-span-3 bg-black/50 flex items-center justify-center p-6 lg:p-12 border-r border-white/10">
                  {selectedCert.isDigitalCert ? (
                    <div className="w-full max-w-2xl">
                      <DigitalCertificatePreview cert={selectedCert} isModal={true} />
                    </div>
                  ) : (
                    <img 
                      src={selectedCert.image} 
                      alt={selectedCert.title} 
                      className="max-w-full max-h-full rounded-lg border border-white/10 shadow-2xl object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('googleusercontent.com')) {
                          target.src = getGoogleDriveFallback(selectedCert.image);
                          target.referrerPolicy = "no-referrer";
                        }
                      }}
                    />
                  )}
                </div>
                
                <div className="lg:col-span-2 p-8 lg:p-14 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 border border-primary/30 rounded-xl flex items-center justify-center text-primary bg-primary/5">
                        <Award size={24} />
                      </div>
                      <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-[10px] font-bold uppercase tracking-wider text-primary rounded-full">
                        {selectedCert.category}
                      </span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6 leading-tight text-white">
                      {selectedCert.title}
                    </h2>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-white/50 uppercase tracking-widest text-xs font-bold">
                        <Building2 size={16} className="text-primary shrink-0" />
                        <span>{selectedCert.organization}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/50 uppercase tracking-widest text-xs font-bold">
                        <Calendar size={16} className="text-primary shrink-0" />
                        <span>{selectedCert.completionDate || selectedCert.date}</span>
                      </div>
                    </div>

                    {selectedCert.certCode && (
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-primary text-xs font-mono mb-6">
                        <ShieldCheck size={16} className="text-primary shrink-0" />
                        <span className="font-semibold">{selectedCert.certCode}</span>
                      </div>
                    )}

                    {selectedCert.authority && (
                      <p className="text-white/40 text-xs italic mb-6">
                        Authorized by: {selectedCert.authority}
                      </p>
                    )}

                    <div className="pt-6 border-t border-white/10">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">About this Credential</h4>
                      <p className="text-white/70 leading-relaxed font-light text-sm">
                        {selectedCert.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/10 flex flex-col gap-3">
                    {selectedCert.pdfUrl && (
                      <a
                        href={selectedCert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 bg-primary hover:bg-primary/90 text-black font-extrabold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                      >
                        <FileText size={15} />
                        View Official PDF Document
                      </a>
                    )}
                    {selectedCert.verifyUrl && (
                      <a
                        href={selectedCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white hover:text-black font-extrabold uppercase tracking-[0.15em] text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={15} />
                        Verify on Issuer Site
                      </a>
                    )}
                    <button 
                      onClick={() => setSelectedCert(null)}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-colors"
                    >
                      Close Preview
                    </button>
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
