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
}

const certificates: Certificate[] = [
  {
    id: 8,
    title: "Advanced Digital Marketing Certification",
    organization: "Maxcess DMI Institute",
    date: "September 2025",
    description: "Successfully completed advanced digital marketing certification, covering SEO, social media marketing, content strategy, and performance advertising.",
    image: "https://lh3.googleusercontent.com/d/1NzHQnyiVwvVxHWCbeTqge4HW9ITFCSai",
    category: "Digital Marketing"
  },
  {
    id: 9,
    title: "Power BI Workshop",
    organization: "OfficeMaster",
    date: "November 2025",
    description: "Completed Power BI workshop, learning to create interactive dashboards, data visualization, and AI-powered analytics solutions.",
    image: "https://lh3.googleusercontent.com/d/1w72oZh0GErBd0ZEO3dvdcnvb4SxC8QBn",
    category: "Data Visualization"
  },
  {
    id: 10,
    title: "AWS Academy Graduate – Cloud Foundations",
    organization: "AWS Academy",
    date: "October 2025",
    description: "Completed AWS Cloud Foundations training (20 hours), gaining knowledge of cloud computing, AWS services, and real-world cloud applications.",
    image: "https://lh3.googleusercontent.com/d/1v7moLn3XrFf6AFKG2z0EIxznO9sRq3S6",
    category: "Cloud Computing"
  },
  {
    id: 1,
    title: "Python Generative AI",
    organization: "IEEE",
    date: "March 2026",
    description: "Learned Python & Generative AI concepts.",
    image: "https://lh3.googleusercontent.com/d/1Apu9NxZ-khPs5XZgalD2N-KJGSKqMvq7",
    category: "AI & Python"
  },
  {
    id: 2,
    title: "JavaScript Training",
    organization: "EduPyramids | IIT Bombay",
    date: "March 2026",
    description: "Successfully completed JavaScript training with a score of 72.5%, covering fundamentals, logic building, and real-world programming concepts.",
    image: "https://lh3.googleusercontent.com/d/1TKRnnFDjgZ8SKfWvC947xMMILbY43tch",
    category: "Web Development"
  },
  {
    id: 3,
    title: "Python 101: Version 3.0",
    organization: "IEEE Silver Oak University",
    date: "March 2025",
    description: "Completed hands-on Python workshop focusing on programming logic, data structures, and practical coding experience.",
    image: "https://lh3.googleusercontent.com/d/1H3XJ5fvmVmgW9ikA82et1XBCh1u_8g_A",
    category: "Python"
  },
  {
    id: 4,
    title: "AI Tools & ChatGPT Workshop",
    organization: "be10x",
    date: "October 2025",
    description: "Successfully completed AI tools and ChatGPT workshop, learning how to create presentations, analyze data, and automate tasks efficiently using AI.",
    image: "https://lh3.googleusercontent.com/d/1Yoo3ZsrEw0yyRPF7oLrb3_GsRAFXslwq",
    category: "AI Tools"
  },
  {
    id: 6,
    title: "Microsoft Excel (Self Learning)",
    organization: "Skill Course",
    date: "November 2025",
    description: "Completed Microsoft Excel course focusing on data analysis, formulas, and real-world business applications for efficient data management.",
    image: "https://lh3.googleusercontent.com/d/18P2xxIsJzl50nlEDx1uTuZuMdqV5jPhL",
    category: "Data Analysis"
  },
  {
    id: 7,
    title: "Narcotics Control Awareness",
    organization: "Ministry of Home Affairs",
    date: "October 2026",
    description: "Participated in the “Say Yes to Life, No to Drugs” initiative, promoting awareness about drug prevention and encouraging a healthy lifestyle.",
    image: "https://lh3.googleusercontent.com/d/1OFYznZZ_2scrbIhgDqr5sZ8sUsJcCWPH",
    category: "Social Awareness"
  }
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="min-h-screen pt-40 pb-24 relative bg-black">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] -z-10" />

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
              className="group cursor-none p-12 border-r border-b border-white/5 hover:bg-primary/5 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-8 border border-white/5">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop`;
                  }}
                />
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
              className="absolute inset-0 bg-black/95 backdrop-blur-md" 
              onClick={() => setSelectedCert(null)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl bg-black border border-white/10 overflow-hidden z-10"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-8 right-8 w-12 h-12 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black z-20 transition-all"
              >
                <X size={24} />
              </button>

              <div className="grid lg:grid-cols-5 h-full max-h-[90vh] overflow-y-auto">
                <div className="lg:col-span-3 bg-white/5 flex items-center justify-center p-8 lg:p-16 border-r border-white/10">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="max-w-full max-h-full border border-white/10 shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
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
                    
                    <div className="pt-8 border-t border-white/10">
                      <button 
                        onClick={() => setSelectedCert(null)}
                        className="w-full py-6 bg-primary text-black font-black uppercase tracking-[0.3em] text-sm hover:bg-white transition-colors"
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
