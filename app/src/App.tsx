import { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Flower2, Code2, Rocket, Zap, Palette, Briefcase, ClipboardCheck } from 'lucide-react';
import { SiGoogleappsscript, SiAmazonwebservices, SiTrello, SiAsana, SiDiscord, SiCivicrm } from 'react-icons/si';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import gsap from 'gsap';
import DarkVeil from '@/components/DarkVeil';
import DotGrid from '@/components/DotGrid';
import Lanyard from '@/components/Lanyard';
import SpotlightCard from '@/components/SpotlightCard';
import ElectricBorder from '@/components/ElectricBorder';
import { FallingPattern } from '@/components/FallingPattern';
import CardFlip from '@/components/CardFlip';
import { IconCloudDemo } from '@/components/IconCloudDemo';

// Animation variants with proper types
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

// Navigation Component
function Navigation({ onNavigate }: { onNavigate: (section: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'HOME', id: 'hero', num: '01' },
    { label: 'ABOUT', id: 'about', num: '02' },
    { label: 'SERVICES', id: 'services', num: '03' },
    { label: 'CONTACT', id: 'contact', num: '04' },
  ];

  const handleClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
      >
        <span className="text-sm font-medium">Menu</span>
        <Menu className="w-5 h-5" />
      </motion.button>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100]"
        >
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white"
          >
            <div className="p-8 h-full flex flex-col">
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-black/60 hover:text-black transition-colors"
                >
                  <span className="text-sm">Close</span>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    onClick={() => handleClick(item.id)}
                    className="group flex items-baseline gap-4 py-4 text-left"
                  >
                    <span className="text-4xl md:text-5xl font-bold text-black group-hover:text-blue-600 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-sm text-black/40">{item.num}</span>
                  </motion.button>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="border-t border-black/10 pt-6"
              >
                <p className="text-sm text-black/40 mb-4">Socials</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/lilyofthevaleys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/60 hover:text-black transition-colors line-reveal"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/charlene-athena-0316b3354"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/60 hover:text-black transition-colors line-reveal"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/tututunaaa?igsh=MWZqcHYyOW82MjQyMg%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/60 hover:text-black transition-colors line-reveal"
                  >
                    Instagram
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

// Hero Section with parallax flowers
function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);
  
  const charleneRef = useRef<HTMLHeadingElement>(null);
  const athenaRef = useRef<HTMLHeadingElement>(null);

  // GSAP Glowing animation
  useEffect(() => {
    if (charleneRef.current && athenaRef.current) {
      // White glow for CHARLENE
      gsap.to(charleneRef.current, {
        textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(147,197,253,0.6), 0 0 60px rgba(196,181,253,0.4)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
      
      // Purple glow for ATHENA
      gsap.to(athenaRef.current, {
        textShadow: '0 0 20px rgba(167,139,250,0.8), 0 0 40px rgba(167,139,250,0.6), 0 0 60px rgba(139,92,246,0.4)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
  }, []);

  // Split text into letters for individual animation
  const splitText = (text: string, defaultColor: string = '#ffffff') => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="letter"
        onMouseEnter={(e) => {
          const colors = ['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#f87171'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          gsap.to(e.currentTarget, {
            color: randomColor,
            textShadow: `0 0 30px ${randomColor}, 0 0 60px ${randomColor}`,
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            color: defaultColor,
            textShadow: defaultColor === '#a78bfa' 
              ? '0 0 20px rgba(167,139,250,0.8), 0 0 40px rgba(167,139,250,0.6)'
              : '0 0 20px rgba(255,255,255,0.8)',
            scale: 1,
            duration: 0.5,
            ease: 'power2.inOut'
          });
        }}
        style={{ display: 'inline-block', color: defaultColor }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden flex items-center">
      {/* Dark Veil Background */}
      <div className="absolute inset-0">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      {/* Interactive Dot Grid */}
      <div className="absolute inset-0 opacity-40">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271E37"
          activeColor="#a78bfa"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-600/20 to-purple-600/20 blur-[100px]"
        />
      </div>

      {/* Lanyard on the right */}
      <div className="absolute right-0 top-0 w-full md:w-1/3 h-full z-50 pointer-events-auto" style={{ transform: 'translateX(-25%)' }}>
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} />
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative"
            >
              <motion.h1 
                ref={charleneRef}
                variants={fadeInUp}
                className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight text-glow"
              >
                {splitText('CHARLENE')}
              </motion.h1>
              <motion.h1 
                ref={athenaRef}
                variants={fadeInUp}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight italic"
              >
                {splitText('ATHENA', '#a78bfa')}
              </motion.h1>
              
              {/* Job Title */}
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg md:text-xl text-white/80 font-light"
              >
                Technical Associate <span className="text-purple-400">@</span> Eterna Indonesia
              </motion.p>
            </motion.div>
          </div>

          {/* Subtitle with animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-64 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" style={{ boxShadow: '0 0 10px rgba(167,139,250,0.5)' }} />
            <span 
              style={{ textShadow: '0 0 20px rgba(167,139,250,0.8), 0 0 40px rgba(167,139,250,0.4)' }}
              className="text-purple-300 text-sm uppercase tracking-widest font-semibold"
            >
              ISB 24
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" style={{ boxShadow: '0 0 10px rgba(167,139,250,0.5)' }} />
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/10 py-4 overflow-hidden">
        <div className="marquee whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-2xl md:text-4xl font-bold text-white mx-8">
              BUILDING TOMORROW'S SYSTEMS TODAY. 
              <span className="mx-4 text-blue-400">→</span>
              FULL-STACK ENGINEER 
              <span className="mx-4 text-purple-400">→</span>
              DEVOPS & CI/CD 
              <span className="mx-4 text-pink-400">→</span>
              AUTOMATION DEVELOPER 
              <span className="mx-4 text-cyan-400">→</span>
              UI/UX DESIGNER 
              <span className="mx-4 text-blue-400">→</span>
              PROJECT MANAGER 
              <span className="mx-4 text-purple-400">→</span>
              QA TESTER 
              <span className="mx-4 text-pink-400">→</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Showcase Section with scroll animations
function ProjectsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const roles = [
    {
      icon: Code2,
      title: 'Full-Stack Engineer',
      description: 'Building scalable web applications with Next.js and React. Developing full-stack features from database design to user interface implementation.',
      spotlightColor: 'rgba(59, 130, 246, 0.3)' as const
    },
    {
      icon: Rocket,
      title: 'DevOps Engineer',
      description: 'Managing CI/CD pipelines, environment setup, and deployment workflows. Ensuring reliable release cycles with Docker and infrastructure automation.',
      spotlightColor: 'rgba(168, 85, 247, 0.3)' as const
    },
    {
      icon: Zap,
      title: 'Automation Developer',
      description: 'Designing workflow automation with n8n, Google Apps Script, and Python. Streamlining operations and data processing through intelligent automation.',
      spotlightColor: 'rgba(6, 182, 212, 0.3)' as const
    },
    {
      icon: Palette,
      title: 'UI/UX Designer',
      description: 'Crafting intuitive user interfaces with expertise in Figma, Webflow, and Tailwind CSS. Focused on creating seamless user experiences through thoughtful design implementation.',
      spotlightColor: 'rgba(236, 72, 153, 0.3)' as const
    },
    {
      icon: Briefcase,
      title: 'Project Manager',
      description: 'Managing cross-functional projects in Jira, overseeing timelines, deliverables, and task assignments. Ensuring team alignment and successful project execution.',
      spotlightColor: 'rgba(249, 115, 22, 0.3)' as const
    },
    {
      icon: ClipboardCheck,
      title: 'QA Tester',
      description: 'Developing comprehensive test plans and executing functional and regression testing. Maintaining code quality through rigorous bug-tracking workflows.',
      spotlightColor: 'rgba(34, 197, 94, 0.3)' as const
    }
  ];

  // Duplicate roles for infinite loop effect
  const duplicatedRoles = [...roles, ...roles, ...roles];

  return (
    <section ref={ref} className="bg-black py-20 overflow-hidden">
      <div className="max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="px-6 md:px-12"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -2500, right: 100 }}
            dragElastic={0.05}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
          >
            {duplicatedRoles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: (index % 6) * 0.1, duration: 0.6 }}
                  className="flex-shrink-0 w-96"
                >
                  <SpotlightCard spotlightColor={role.spotlightColor} className="h-48">
                    <div className="flex items-center gap-4 h-full">
                      <div className="flex-shrink-0">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">{role.description}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// About Section with scroll animations
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="relative py-20 overflow-hidden">
      {/* Falling Pattern Background */}
      <div className="absolute inset-0 z-0">
        <FallingPattern
          color="rgba(168, 85, 247, 0.5)"
          backgroundColor="rgb(209, 213, 219)"
          duration={100}
          blurIntensity="0.5em"
          density={1}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold text-black/90 text-center mb-16 max-w-4xl mx-auto leading-tight"
        >
          AS A TECHNICAL ASSOCIATE AND FULL-STACK ENGINEER, I SPECIALIZE IN BUILDING SOLUTIONS THAT ARE BOTH{' '}
          <span className="text-gradient">SCALABLE</span> AND <span className="text-gradient-blue">EFFICIENT</span>
        </motion.h2>

        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp}>
            <ElectricBorder
              color="#7df9ff"
              speed={1}
              chaos={0.12}
              thickness={2}
              style={{ borderRadius: 16 }}
            >
              <CardFlip
                title="Innovation"
                subtitle="Technology & Automation"
                description="Driven by a passion for technology and automation, I create efficient systems that streamline workflows."
                features={[
                  "Automated Workflows",
                  "System Integration",
                  "Process Optimization",
                  "Modern Tech Stack"
                ]}
                accentColor="rgba(125, 249, 255, 0.6)"
              />
            </ElectricBorder>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <ElectricBorder
              color="#ff6b9d"
              speed={1}
              chaos={0.12}
              thickness={2}
              style={{ borderRadius: 16 }}
            >
              <CardFlip
                title="Excellence"
                subtitle="Quality & Best Practices"
                description="Through comprehensive documentation and robust testing, I ensure every system is maintainable and scalable."
                features={[
                  "Clean Documentation",
                  "Robust Testing",
                  "Code Quality",
                  "Maintainability"
                ]}
                accentColor="rgba(255, 107, 157, 0.6)"
              />
            </ElectricBorder>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <ElectricBorder
              color="#10b981"
              speed={1}
              chaos={0.12}
              thickness={2}
              style={{ borderRadius: 16 }}
            >
              <CardFlip
                title="Growth"
                subtitle="Continuous Learning"
                description="I continuously expand my technical expertise across full-stack development, DevOps, and automation."
                features={[
                  "Full-Stack Development",
                  "DevOps Practices",
                  "Cloud Technologies",
                  "Emerging Tools"
                ]}
                accentColor="rgba(16, 185, 129, 0.6)"
              />
            </ElectricBorder>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Tools & Stack Section with scroll animations
function ToolsStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const additionalTools = [
    { icon: <SiGoogleappsscript className="text-5xl text-white" />, key: 'apps-script' },
    { icon: <Code2 className="text-5xl text-white" />, key: 'rest-apis' },
    { icon: <SiCivicrm className="text-5xl text-white" />, key: 'cicd' },
    { icon: <SiAmazonwebservices className="text-5xl text-white" />, key: 'aws' },
    { icon: <SiTrello className="text-5xl text-white" />, key: 'trello' },
    { icon: <SiAsana className="text-5xl text-white" />, key: 'asana' },
    { icon: <SiDiscord className="text-5xl text-white" />, key: 'discord' },
    { icon: <Zap className="text-5xl text-white" />, key: 'waha' },
    { icon: <ClipboardCheck className="text-5xl text-white" />, key: 'manual' },
    { icon: <Rocket className="text-5xl text-white" />, key: 'regression' },
  ];

  return (
    <section ref={ref} className="bg-black py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Tools & <span className="text-gradient">Stack</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white/60 mb-12 max-w-xl"
        >
          Technologies I use to bring ideas to life
        </motion.p>

        {/* Icon Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center items-center mb-16"
        >
          <div className="w-full max-w-3xl h-[500px] flex items-center justify-center">
            <IconCloudDemo />
          </div>
        </motion.div>

        {/* Additional Tools LogoLoop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="-mt-8 overflow-hidden"
        >
          <style>{`
            .logo-glow svg {
              filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 15px rgba(168, 85, 247, 0.3));
            }
          `}</style>
          <div className="logo-glow relative">
            <motion.div
              className="flex gap-12 items-center"
              animate={{
                x: [0, -1500],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...additionalTools, ...additionalTools, ...additionalTools].map((tool, index) => (
                <div key={`${tool.key}-${index}`} className="flex-shrink-0">
                  {tool.icon}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Work Experience Section with sticky stacking cards
function WorkExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const experiences = [
    {
      year: '2025',
      title: 'Full-Stack Engineer & Systems Documentation Lead',
      company: 'Eterna - Indonesia',
      period: 'Oct 2025 - Present',
      description: 'Authored comprehensive system documentation for the Merdeka client project. Contributed to DevOps operations including CI/CD pipeline configuration and deployment management. Developed QA test plans and built full-stack features using Next.js and React.',
      gradient: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-950',
    },
    {
      year: '2025',
      title: 'Machine Learning Developer & Project Manager',
      company: 'Webstartiom - UK',
      period: 'Mar 2025 - Oct 2025',
      description: 'Managed multiple projects in Jira, overseeing timelines and deliverables. Developed and integrated APIs for AI-driven projects. Conducted web data scraping and provided client support while maintaining clear communication.',
      gradient: 'from-orange-500 to-pink-500',
      bgColor: 'bg-orange-950',
    },
    {
      year: '2024',
      title: 'AI Trainer',
      company: 'Outlier AI - USA',
      period: 'Nov 2024 - Dec 2025',
      description: 'Trained AI models by generating, reviewing, and refining datasets. Evaluated AI outputs for accuracy and coherence. Created prompt-response pairs and conducted domain-specific training to improve model performance.',
      gradient: 'from-green-500 to-cyan-500',
      bgColor: 'bg-green-950',
    },
    {
      year: '2023',
      title: 'Electroplating Data & Machine Operator',
      company: 'INPAQ Technology Co., Ltd. - Taiwan',
      period: 'Sep 2023 - May 2024',
      description: 'Recorded and maintained daily data of all items processed in the electroplating department. Managed and monitored machines, ensuring proper operation. Conducted routine chemical level checks and maintained operational efficiency.',
      gradient: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-950',
    },
  ];

  return (
    <section ref={containerRef} className="relative bg-black" style={{ height: `${(experiences.length + 1) * 100}vh` }}>
      {/* Section Header - Sticky */}
      <div className="sticky top-0 h-screen flex flex-col justify-start pt-20 z-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Work <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white/60 max-w-xl"
          >
            Scroll to explore my journey through each role
          </motion.p>
        </div>
      </div>

      {/* Stacking Experience Cards */}
      {experiences.map((exp, index) => {
        const cardProgress = useTransform(
          scrollYProgress,
          [index / experiences.length, (index + 0.5) / experiences.length, (index + 1) / experiences.length],
          [0, 1, 1]
        );
        const cardY = useTransform(cardProgress, [0, 1], [100, 0]);
        const cardScale = useTransform(cardProgress, [0, 1], [0.9, 1]);
        const cardOpacity = useTransform(cardProgress, [0, 0.3, 1], [0, 1, 1]);

        return (
          <div
            key={index}
            className="sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center"
            style={{ zIndex: index + 1 }}
          >
            <motion.div
              style={{ 
                y: cardY, 
                scale: cardScale, 
                opacity: cardOpacity 
              }}
              className="w-full max-w-5xl mx-auto px-6"
            >
              <div className={`${exp.bgColor} rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden`}>
                {/* Gradient background effect */}
                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${exp.gradient} opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    {/* Year Badge */}
                    <div className="flex-shrink-0">
                      <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${exp.gradient} shadow-lg`}>
                        <span className="text-3xl md:text-4xl font-black text-white">{exp.year}</span>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-sm text-white/50 uppercase tracking-wider font-medium">{exp.company}</span>
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        <span className="text-sm text-white/50">{exp.period}</span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{exp.title}</h3>
                      <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">{exp.description}</p>
                      
                      {/* Skills tags */}
                      <div className="flex flex-wrap gap-2 mt-6">
                        {index === 0 && ['Next.js', 'React', 'DevOps', 'CI/CD', 'QA'].map((skill, i) => (
                          <span key={i} className="text-xs bg-white/10 text-white/70 px-3 py-1.5 rounded-full">
                            {skill}
                          </span>
                        ))}
                        {index === 1 && ['Jira', 'API Development', 'Python', 'Web Scraping'].map((skill, i) => (
                          <span key={i} className="text-xs bg-white/10 text-white/70 px-3 py-1.5 rounded-full">
                            {skill}
                          </span>
                        ))}
                        {index === 2 && ['AI Training', 'Data Annotation', 'Machine Learning'].map((skill, i) => (
                          <span key={i} className="text-xs bg-white/10 text-white/70 px-3 py-1.5 rounded-full">
                            {skill}
                          </span>
                        ))}
                        {index === 3 && ['Data Management', 'Quality Control', 'Process Monitoring'].map((skill, i) => (
                          <span key={i} className="text-xs bg-white/10 text-white/70 px-3 py-1.5 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-4 right-4 w-16 h-16 border border-white/10 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-8 right-8 w-8 h-8 border border-white/5 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}

// Recent Works Section with scroll animations
function RecentWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const projects = [
    { name: 'Merdeka Client System', category: 'Full-Stack Development', tags: ['Next.js', 'React', 'DevOps'], gradient: 'gradient-blue' },
    { name: 'Automation Workflows', category: 'Process Automation', tags: ['n8n', 'Apps Script'], gradient: 'gradient-cyan' },
    { name: 'AI-Driven API Integration', category: 'Backend Development', tags: ['Python', 'REST APIs'], gradient: 'gradient-purple' },
    { name: 'System Architecture Documentation', category: 'Technical Documentation', tags: ['Architecture Design', 'DevOps'], gradient: 'gradient-green' },
    { name: 'CI/CD Pipeline Setup', category: 'DevOps', tags: ['Docker', 'GitHub', 'CI/CD'], gradient: 'gradient-orange' },
    { name: 'QA Test Automation', category: 'Quality Assurance', tags: ['Testing', 'Bug Tracking'], gradient: 'gradient-pink' },
  ];

  return (
    <section ref={ref} className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Recent <span className="text-gradient">Works</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white/60 mb-12"
        >
          Scroll down to explore my key contributions and technical achievements
        </motion.p>

        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white/5 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-500"
            >
              <div className={`h-48 ${project.gradient} opacity-40 group-hover:opacity-70 transition-all duration-500`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{project.category}</p>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-full group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center"
              >
                <ArrowUpRight className="w-5 h-5 text-black" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-white text-black max-w-2xl">
          <DialogHeader>
            <p className="text-sm text-black/50 uppercase tracking-wider">{selectedProject?.category}</p>
            <DialogTitle className="text-3xl font-bold">{selectedProject?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className={`h-48 ${selectedProject?.gradient} rounded-xl mb-6 opacity-60`} />
            <p className="text-black/70 leading-relaxed">
              This project was developed using {selectedProject?.tags.join(', ')}, focusing on scalability, 
              maintainability, and optimal performance. The solution was designed to meet client requirements 
              while ensuring robust technical architecture and comprehensive documentation.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

// Sticky Services Section with stacking cards
function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const services = [
    {
      title: 'FULL-STACK DEVELOPMENT',
      description: 'I build robust and scalable web applications using modern frameworks like React, Next.js, and various backend technologies.',
      includes: ['Web Applications', 'REST APIs', 'Frontend Development', 'Backend Integration', 'Database Design'],
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-950',
      icon: '</>',
    },
    {
      title: 'AUTOMATION & WORKFLOW DESIGN',
      description: 'I create efficient automation solutions using n8n, Google Apps Script, and Python to streamline business processes and improve productivity.',
      includes: ['Process Automation', 'Workflow Integration', 'Data Processing', 'API Connectivity', 'System Integration'],
      gradient: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-950',
      icon: '⚡',
    },
    {
      title: 'DEVOPS & SYSTEMS DOCUMENTATION',
      description: 'I provide comprehensive DevOps solutions including CI/CD pipeline management, infrastructure setup, and detailed system documentation for team alignment.',
      includes: ['CI/CD Pipelines', 'System Architecture', 'Technical Documentation', 'Environment Setup', 'Quality Assurance'],
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-950',
      icon: '🛠️',
    },
  ];

  return (
    <section ref={containerRef} id="services" className="relative bg-black" style={{ height: `${(services.length + 1) * 100}vh` }}>
      {/* Section Header - Sticky */}
      <div className="sticky top-0 h-screen flex flex-col justify-start pt-20 z-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white/60 max-w-2xl"
          >
            Focused on high performance and measurable results, I provide end-to-end digital solutions
          </motion.p>
        </div>
      </div>

      {/* Stacking Service Cards */}
      {services.map((service, index) => {
        const cardProgress = useTransform(
          scrollYProgress,
          [index / services.length, (index + 0.5) / services.length, (index + 1) / services.length],
          [0, 1, 1]
        );
        const cardY = useTransform(cardProgress, [0, 1], [100, 0]);
        const cardScale = useTransform(cardProgress, [0, 1], [0.9, 1]);
        const cardOpacity = useTransform(cardProgress, [0, 0.3, 1], [0, 1, 1]);

        return (
          <div
            key={index}
            className="sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center"
            style={{ zIndex: index + 1 }}
          >
            <motion.div
              style={{ 
                y: cardY, 
                scale: cardScale, 
                opacity: cardOpacity 
              }}
              className="w-full max-w-5xl mx-auto px-6"
            >
              <div className={`${service.bgColor} rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden`}>
                {/* Gradient background effect */}
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${service.gradient} opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4`} />
                <div className={`absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr ${service.gradient} opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left - Text Content */}
                    <div>
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg mb-6`}>
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{service.title}</h3>
                      <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">{service.description}</p>
                      
                      {/* Includes tags */}
                      <div>
                        <p className="text-sm text-white/40 uppercase tracking-wider mb-3">Includes:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.includes.map((item, i) => (
                            <motion.span 
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * i }}
                              whileHover={{ scale: 1.05 }}
                              className={`text-sm bg-gradient-to-r ${service.gradient} text-white px-4 py-2 rounded-full cursor-default shadow-lg`}
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right - Visual */}
                    <div className="relative">
                      <motion.div 
                        whileHover={{ scale: 1.02, rotate: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`aspect-square rounded-2xl bg-gradient-to-br ${service.gradient} opacity-40 relative overflow-hidden`}
                      >
                        {/* Animated circles */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="w-32 h-32 border-2 border-white/20 rounded-full" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="w-48 h-48 border border-white/10 rounded-full" />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="w-16 h-16 bg-white/10 rounded-full" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Card number indicator */}
                <div className="absolute top-6 right-6 text-white/10 text-6xl font-black">
                  0{index + 1}
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}

// Contact Section with scroll animations
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="bg-black py-20 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Get in <span className="text-gradient">Touch</span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Flower2 className="inline-block w-12 h-12 text-blue-400 ml-2" />
              </motion.span>
            </h2>
            <p className="text-white/60 mb-8 max-w-md leading-relaxed">
              Thank you for visiting my portfolio. I'm always open to discussing new opportunities, 
              collaborations, or exciting projects that align with my technical expertise in full-stack development, automation, and DevOps!
            </p>
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center gap-3 text-white/60 cursor-pointer"
            >
              <span className="text-xl">✉</span>
              <span className="line-reveal">charleneathena@gmail.com</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <form className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label className="block text-sm text-white/60 mb-2">Name*</label>
                <Input 
                  placeholder="Your name" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500 transition-colors"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label className="block text-sm text-white/60 mb-2">Email*</label>
                <Input 
                  type="email"
                  placeholder="your@email.com" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500 transition-colors"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label className="block text-sm text-white/60 mb-2">Message</label>
                <Textarea 
                  placeholder="Your message..." 
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500 transition-colors resize-none"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 rounded-full py-6 transition-all hover:shadow-lg hover:shadow-blue-500/30">
                  Get in touch
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer Section with animations
function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="bg-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12"
        >
          <div>
            <p className="text-2xl md:text-3xl font-medium text-black">Let's do great work together</p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="text-sm text-black/40 uppercase tracking-wider mb-4">Sitemap</p>
              <ul className="space-y-2">
                {['Home', 'About Me', 'Services', 'Contact'].map((item) => (
                  <motion.li 
                    key={item}
                    whileHover={{ x: 5 }}
                  >
                    <a href="#" className="text-black hover:text-blue-600 transition-colors">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-black/40 uppercase tracking-wider mb-4">Social</p>
              <ul className="space-y-2">
                <motion.li 
                  whileHover={{ x: 5 }}
                >
                  <a href="https://www.linkedin.com/in/charlene-athena-0316b3354" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-600 transition-colors underline">LinkedIn</a>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                >
                  <a href="https://github.com/lilyofthevaleys" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-600 transition-colors underline">GitHub</a>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                >
                  <a href="https://www.instagram.com/tututunaaa?igsh=MWZqcHYyOW82MjQyMg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-600 transition-colors underline">Instagram</a>
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          <motion.h2 
            whileHover={{ scale: 1.02 }}
            className="text-[12vw] md:text-[15vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-none tracking-tighter cursor-default"
          >
            Athena
          </motion.h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-black/10"
        >
          <p className="text-sm text-black/40">© 2026 by Charlene Athena.</p>
          <motion.a 
            href="#" 
            whileHover={{ x: 5 }}
            className="text-sm text-black/40 hover:text-black transition-colors"
          >
            Privacy Policy
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      <Navigation onNavigate={handleNavigate} />
      <HeroSection />
      <ProjectsShowcase />
      <AboutSection />
      <ToolsStackSection />
      <WorkExperienceSection />
      <RecentWorksSection />
      <ServicesSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

export default App;
