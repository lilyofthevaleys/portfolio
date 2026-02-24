import { useState, useRef } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Flower2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';

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
                  {['TikTok', 'GitHub', 'LinkedIn', 'Behance', 'Dribbble'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-sm text-black/60 hover:text-black transition-colors line-reveal"
                    >
                      {social}
                    </a>
                  ))}
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

  return (
    <section id="hero" className="relative min-h-screen bg-black overflow-hidden flex items-center">
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

      {/* Animated Flowers Background with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.img
          style={{ y: y1 }}
          src="/images/flower-1.png"
          alt=""
          className="absolute top-[10%] left-[5%] w-48 md:w-72 opacity-60 float"
        />
        <motion.img
          style={{ y: y2 }}
          src="/images/flower-2.png"
          alt=""
          className="absolute top-[20%] right-[10%] w-56 md:w-80 opacity-50 float-delayed"
        />
        <motion.img
          style={{ y: y3 }}
          src="/images/flower-3.png"
          alt=""
          className="absolute bottom-[30%] left-[15%] w-40 md:w-64 opacity-40 float-slow"
        />
      </div>

      {/* Hero Portrait with reveal animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity, scale }}
        className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl"
          />
          <img
            src="/images/hero-portrait.jpg"
            alt="Seak Chhengly"
            className="relative w-[400px] h-[500px] object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight text-glow"
              >
                SEAK
              </motion.h1>
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight italic text-gradient"
              >
                CHHENGLY
              </motion.h1>
            </motion.div>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:text-right"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none"
              >
                WEB
              </motion.h2>
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none italic text-gradient-blue"
              >
                DEVELOPER
              </motion.h2>
            </motion.div>
          </div>

          {/* Subtitle with animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="text-white/60 text-sm uppercase tracking-widest">UX/UI Designer</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/10 py-4 overflow-hidden">
        <div className="marquee whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-2xl md:text-4xl font-bold text-white mx-8">
              DESIGNING TOMORROW'S INTERFACES TODAY. 
              <span className="mx-4 text-blue-400">→</span>
              WEB DESIGNER 
              <span className="mx-4 text-purple-400">→</span>
              FRONTEND DEVELOPER 
              <span className="mx-4 text-pink-400">→</span>
              UX/UI DESIGNER 
              <span className="mx-4 text-cyan-400">→</span>
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

  const projects = [
    { name: 'Digital Agency', category: 'Website Design', gradient: 'gradient-blue' },
    { name: 'Software Agency', category: 'Website Design', gradient: 'gradient-cyan' },
    { name: 'Aurora Earbuds', category: 'Product Design', gradient: 'gradient-purple' },
    { name: 'Analytics Dashboard', category: 'Dashboard Design', gradient: 'gradient-green' },
    { name: 'Mobile Banking', category: 'App Design', gradient: 'gradient-orange' },
  ];

  return (
    <section ref={ref} className="bg-black py-20 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex gap-8 px-6"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="flex-shrink-0 w-64 md:w-80 h-64 md:h-80 rounded-full spotlight relative group cursor-pointer card-3d"
          >
            <div className="card-3d-inner">
              <div className={`absolute inset-0 ${project.gradient} rounded-full opacity-60 group-hover:opacity-80 transition-all duration-500`} />
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-xs text-white/60 uppercase tracking-wider mb-2">{project.category}</p>
                <h3 className="text-xl md:text-2xl font-bold text-white">{project.name}</h3>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 rounded-full border-2 border-white/30"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// About Section with scroll animations
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      title: 'Passion',
      description: 'Driven by a passion for design and technology, I aim to create meaningful digital experiences that elevate brands and improve user experiences.',
      icon: Sparkles,
      color: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Innovation',
      description: 'By exploring new ideas and creative solutions, I craft websites that solve complex challenges and deliver lasting impact.',
      icon: Sparkles,
      color: 'from-pink-500 to-orange-500',
    },
    {
      title: 'Growth',
      description: 'I continually learn and refine my skills to push boundaries and develop higher-quality digital products every day.',
      icon: Sparkles,
      color: 'from-green-500 to-cyan-500',
    },
  ];

  return (
    <section ref={ref} id="about" className="relative bg-gradient-to-b from-blue-400/20 via-white to-white py-20 overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-64 h-64 border border-blue-200/50 rounded-full"
      />
      <motion.div
        animate={{ 
          rotate: [360, 0],
        }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-48 h-48 border border-purple-200/50 rounded-full"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold text-black/90 text-center mb-16 max-w-4xl mx-auto leading-tight"
        >
          AS A WEB DEVELOPER AND UX/UI DESIGNER, I SPECIALIZE IN BUILDING SOLUTIONS THAT ARE BOTH{' '}
          <span className="text-gradient">FUNCTIONAL</span> AND <span className="text-gradient-blue">DELIGHTFUL</span>
        </motion.h2>

        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-black/5 hover:shadow-2xl transition-all duration-500 group"
            >
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}
              >
                <value.icon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors">{value.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Tools & Stack Section with scroll animations
function ToolsStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: 'Figma', category: 'Design Tool', level: 90, icon: 'F' },
    { name: 'HTML', category: 'Front-end', level: 95, icon: 'H' },
    { name: 'CSS', category: 'Front-end', level: 90, icon: 'C' },
    { name: 'JavaScript', category: 'Front-end', level: 90, icon: 'JS' },
    { name: 'NestJS', category: 'Backend', level: 85, icon: 'N' },
    { name: 'Django', category: 'Backend', level: 80, icon: 'D' },
    { name: 'React', category: 'JavaScript Library', level: 95, icon: 'R' },
    { name: 'Next.js', category: 'Full Stack Framework', level: 90, icon: 'N' },
    { name: 'Tailwind CSS', category: 'CSS Framework', level: 90, icon: 'T' },
    { name: 'MUI', category: 'CSS Framework', level: 85, icon: 'M' },
    { name: 'MySQL', category: 'Database', level: 85, icon: 'My' },
    { name: 'PostgreSQL', category: 'Database', level: 80, icon: 'P' },
    { name: 'MS SQL Server', category: 'Database', level: 75, icon: 'MS' },
    { name: 'GitHub', category: 'Version Control', level: 90, icon: 'GH' },
    { name: 'GitLab', category: 'Version Control', level: 85, icon: 'GL' },
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

        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all">
                  {skill.icon}
                </div>
                <div>
                  <p className="font-semibold text-black text-sm">{skill.name}</p>
                  <p className="text-xs text-black/50">{skill.category}</p>
                </div>
              </div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-lg font-bold text-black"
              >
                {skill.level}%
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Icons Marquee */}
        <div className="mt-12 border-t border-white/10 pt-8 overflow-hidden">
          <div className="marquee flex gap-12">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-12">
                {skills.map((skill, index) => (
                  <motion.div
                    key={`${setIndex}-${index}`}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    {skill.icon}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
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
      title: 'Web Developer',
      company: 'Internship II (SATHAPANA BANK)',
      period: 'Feb 2025 - Now',
      description: 'Collaborated with the UX/UI team and implemented designs with Material UI (MUI) to ensure a consistent and user-friendly experience. Developed frontend with Next.js, integrated REST APIs, and assisted backend team using NestJS.',
      gradient: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-950',
    },
    {
      year: '2024',
      title: 'Frontend Web Developer / UX UI Designer',
      company: 'Capstone II (School\'s Project)',
      period: '3 months',
      description: 'Designed and developed mobile and web UI using Figma. Created a full-stack solution using Django backend, Flutter mobile app, and React web frontend.',
      gradient: 'from-orange-500 to-pink-500',
      bgColor: 'bg-orange-950',
    },
    {
      year: '2024',
      title: 'Web Developer',
      company: 'Internship I',
      period: '3 months',
      description: 'Developed a secure internal system using Django + PostgreSQL. Designed the frontend with Tailwind CSS focusing on clean UI and responsive experience.',
      gradient: 'from-green-500 to-cyan-500',
      bgColor: 'bg-green-950',
    },
    {
      year: '2023',
      title: 'Frontend Web Developer',
      company: 'Capstone I (School\'s Project)',
      period: '3 months',
      description: 'Developed a web application using Laravel, Tailwind CSS, and JavaScript. Created a user-friendly interface with responsive design using HTML, CSS, and Tailwind CSS.',
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
                        {['Next.js', 'NestJS', 'MUI', 'REST API'].map((skill, i) => (
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
    { name: 'Digital Agency\'s Website', category: 'Website Design', tags: ['Figma'], gradient: 'gradient-blue' },
    { name: 'Software Agency\'s Website', category: 'Website Design', tags: ['Figma'], gradient: 'gradient-cyan' },
    { name: 'Earbuds Lending Website', category: 'Website Design', tags: ['Figma'], gradient: 'gradient-purple' },
    { name: 'Banking Dashboard Design', category: 'Website Design', tags: ['Figma'], gradient: 'gradient-green' },
    { name: 'Explorify Mobile App Design', category: 'Mobile App Design', tags: ['Figma', 'Django', 'Flutter'], gradient: 'gradient-orange' },
    { name: 'Explorify Lending Website', category: 'Website Design', tags: ['Figma', 'Django', 'React Js'], gradient: 'gradient-pink' },
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
              The website was developed using {selectedProject?.tags.join(', ')}, emphasizing problem-solving 
              and solution design. Content was generated and refined with the help of ChatGPT to enhance 
              clarity and user experience.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-4 font-medium"
            >
              Figma Link <ArrowUpRight className="w-4 h-4" />
            </a>
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
      title: 'WEB DEVELOPMENT',
      description: 'I build responsive and modern websites using HTML, CSS, JavaScript, React, Next.js, and Tailwind CSS.',
      includes: ['Business Sites', 'Portfolios', 'Landing Pages', 'Product Pages'],
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-950',
      icon: '</>',
    },
    {
      title: 'UX/UI DESIGN',
      description: 'I create intuitive and aesthetically pleasing digital interfaces grounded in user-centered design principles.',
      includes: ['Full Website UI', 'Landing Pages', 'Wireframes', 'Prototypes', 'Style Guides'],
      gradient: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-950',
      icon: '🎨',
    },
    {
      title: 'WEB / APP DESIGN',
      description: 'I deliver polished, modern mobile application designs for both iOS and Android platforms using Figma.',
      includes: ['App Screens', 'User Flows', 'UI Kits', 'Interactive Prototypes'],
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-950',
      icon: '📱',
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
              potential collaborations, or challenging projects that align with my skills!
            </p>
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center gap-3 text-white/60 cursor-pointer"
            >
              <span className="text-xl">✉</span>
              <span className="line-reveal">chhenglyseak@gmail.com</span>
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
                {['LinkedIn', 'Behance', 'Dribbble', 'Tiktok'].map((item) => (
                  <motion.li 
                    key={item}
                    whileHover={{ x: 5 }}
                  >
                    <a href="#" className="text-black hover:text-blue-600 transition-colors underline">{item}</a>
                  </motion.li>
                ))}
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
            Chhongly
          </motion.h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-black/10"
        >
          <p className="text-sm text-black/40">© 2025 by Chhongly Seak.</p>
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
