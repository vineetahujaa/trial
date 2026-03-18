import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Activity, FileText, Network, Search, SlidersHorizontal,
  BarChart3, MoreHorizontal, TrendingUp, AlertTriangle, Users,
  BrainCircuit, Send, Loader2, CheckCircle2, DollarSign, Menu, X,
  Bot, Database, ClipboardList, Map, Box, FileCheck, Download,
  History, Clock, Battery, Layers, Check, QrCode, ScanLine, UserCheck,
  Signature, MessageSquare, Mic, FlaskConical, Receipt, Award, XCircle,
  Plus, Zap, FileSpreadsheet, ShieldCheck, Phone, ChevronRight,
  Globe, Mail, MapPin, Sparkles, LayoutDashboard
} from 'lucide-react';

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('landing');

  const navigate = (route) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentRoute(route);
  };

  const isDarkRoute = ['landing', 'login', 'signup'].includes(currentRoute);

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500/30 transition-colors duration-500 ${isDarkRoute ? 'bg-[#000000] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {currentRoute === 'landing' && <LandingPage navigate={navigate} />}
      {currentRoute === 'login' && <AuthSimulator navigate={navigate} type="login" />}
      {currentRoute === 'signup' && <AuthSimulator navigate={navigate} type="signup" />}
      {currentRoute === 'upload' && <UploadPage navigate={navigate} />}
      {currentRoute === 'dashboard' && <DashboardPage navigate={navigate} />}
    </div>
  );
}

// ==========================================
// SHARED UI COMPONENTS
// ==========================================
function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const current = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (current) observer.unobserve(current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0 scale-100 opacity-100';
    if (direction === 'up') return 'translate-y-12 opacity-0';
    if (direction === 'left') return '-translate-x-12 opacity-0';
    if (direction === 'right') return 'translate-x-12 opacity-0';
    if (direction === 'scale') return 'scale-95 opacity-0';
    return 'opacity-0';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1000ms] ease-out ${getTransform()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function BrandLogo({ className = 'text-2xl', theme = 'dark' }) {
  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      <div className="relative flex items-center justify-center">
        {theme === 'dark' && <div className="absolute inset-0 bg-emerald-500/40 blur-md rounded-full group-hover:bg-emerald-400/60 transition-colors duration-500"></div>}
        <svg className="relative z-10 w-9 h-9 transform group-hover:scale-105 transition-transform duration-500" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2L36 10.5V29.5L20 38L4 29.5V10.5L20 2Z" fill="url(#logo-glow)" fillOpacity="0.15" stroke="url(#logo-border)" strokeWidth="1.5"/>
          <path d="M20 10L29 15V25L20 30L11 25V15L20 10Z" fill="url(#logo-solid)"/>
          <path d="M11 15L20 21V30M29 15L20 21" stroke={theme === 'dark' ? '#000000' : '#ffffff'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="logo-glow" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10b981" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="logo-border" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34d399" stopOpacity="0.8" />
              <stop offset="1" stopColor="#22d3ee" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="logo-solid" x1="11" y1="10" x2="29" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10b981" />
              <stop offset="1" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className={`font-bold tracking-tighter ${className}`}>
        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Yield</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Pe</span>
        <span className="text-emerald-500 font-black">.</span>
      </span>
    </div>
  );
}

function FeatureCard({ delay, icon, title, desc, color }) {
  const colors = {
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    cyan: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    orange: 'text-orange-600 bg-orange-50 border-orange-100',
    blue: 'text-blue-600 bg-blue-50 border-blue-100'
  };

  return (
    <FadeIn delay={delay}>
      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-xl border border-white/40 flex flex-col items-center text-center h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group cursor-default">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 group-hover:scale-110 ${colors[color]}`}>
          {React.cloneElement(icon, { className: 'w-8 h-8' })}
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tighter">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
      </div>
    </FadeIn>
  );
}

function DetailedModule({ delay, icon, title, desc, points, color }) {
  const accent = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100'
  };
  return (
    <FadeIn delay={delay}>
      <div className="bg-white/40 backdrop-blur-md border border-white/60 p-12 rounded-[3.5rem] transition-all hover:bg-white/60 hover:shadow-2xl group h-full">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${accent[color]}`}>
          {React.cloneElement(icon, { className: 'w-7 h-7' })}
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-8 font-medium italic opacity-80">"{desc}"</p>
        <div className="space-y-4">
          {points.map((p) => (
            <div key={p} className="flex items-center gap-3 text-sm font-bold text-gray-700">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div> {p}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function DataPill({ icon, label, color = 'border-white/60' }) {
  return (
    <div className={`bg-white/80 border p-5 rounded-[1.8rem] flex items-center gap-5 hover:bg-white transition-all cursor-default shadow-sm backdrop-blur-md ${color}`}>
      <div className="text-gray-400">{React.cloneElement(icon, { className: 'w-6 h-6' })}</div>
      <div className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function DataFlowVisualization() {
  return (
    <div id="platform" className="w-full relative py-32 bg-slate-50 overflow-hidden flex flex-col items-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-gradient-to-r from-emerald-100 to-cyan-100 blur-[150px] rounded-full pointer-events-none opacity-60"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full text-center">
        <FadeIn className="mb-24">
          <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-8 text-gray-900 leading-none">
            CHAOS IN. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">INTELLIGENCE OUT.</span>
          </h2>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            We intercept fragmented factory communications and unify them into a high-yield operating system.
          </p>
        </FadeIn>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          <div className="flex flex-col gap-5 w-full lg:w-72">
            <DataPill icon={<MessageSquare />} label="Fragmented Comms" />
            <DataPill icon={<FileSpreadsheet />} label="Disconnected Data" />
            <DataPill icon={<Activity />} label="Raw IoT Sensors" />
          </div>

          <div className="relative group">
            <div className="absolute -inset-16 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="relative bg-white/70 backdrop-blur-2xl border border-white p-16 rounded-[4rem] flex flex-col items-center shadow-2xl">
              <BrainCircuit className="w-16 h-16 text-emerald-600 mb-6 animate-pulse" />
              <div className="text-xs font-black text-gray-800 uppercase tracking-[0.5em] opacity-80">YieldPe Core</div>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full lg:w-72">
            <DataPill icon={<TrendingUp />} label="Yield Insights" />
            <DataPill icon={<ShieldCheck />} label="Compliance twins" />
            <DataPill icon={<DollarSign />} label="Economic Value" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadershipCardHome({ initials, name, role }) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-12 flex flex-col items-center text-center group transition-all duration-500 shadow-xl hover:shadow-2xl hover:bg-white">
      <div className="w-24 h-24 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl font-black text-emerald-600 mb-8 transition-all duration-500 shadow-inner group-hover:scale-110">
        {initials}
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-2">{name}</h3>
      <p className="font-bold text-[10px] uppercase tracking-[0.3em] text-gray-400">{role}</p>
    </div>
  );
}

function LeadershipCard({ initials, name, role, accent = 'emerald' }) {
  const accentMap = {
    emerald: { border: 'group-hover:border-emerald-500/30', glow: 'bg-emerald-500/5 group-hover:bg-emerald-500/20', badge: 'text-emerald-400', avatar: 'group-hover:border-emerald-500/50 group-hover:text-emerald-400' },
    cyan: { border: 'group-hover:border-cyan-500/30', glow: 'bg-cyan-500/5 group-hover:bg-cyan-500/20', badge: 'text-cyan-400', avatar: 'group-hover:border-cyan-500/50 group-hover:text-cyan-400' },
  };
  const styles = accentMap[accent] || accentMap.emerald;

  return (
    <div className={`bg-[#050505] border border-white/5 rounded-2xl p-10 flex flex-col items-center text-center group transition-all duration-500 shadow-lg relative overflow-hidden ${styles.border}`}>
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full transition-colors duration-500 ${styles.glow}`}></div>
      <div className={`w-20 h-20 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-2xl font-black text-gray-600 mb-6 transition-all duration-500 shadow-inner relative z-10 ${styles.avatar}`}>
        {initials}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{name}</h3>
      <p className={`font-bold text-[10px] uppercase tracking-widest relative z-10 ${styles.badge}`}>{role}</p>
    </div>
  );
}

// ==========================================
// LANDING PAGE FROM CODE 1
// ==========================================
function LandingPage({ navigate }) {
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col font-sans overflow-x-hidden">
      <div className="relative w-full h-[95vh] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2000&q=80"
            alt="Clean Industrial Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-slate-50"></div>
        </div>

        <nav className="absolute top-0 left-0 w-full px-6 lg:px-12 py-10 flex justify-between items-center z-50">
          <div onClick={() => navigate('landing')} className="shrink-0">
            <BrandLogo className="text-2xl" theme="light" />
          </div>

          <div className="hidden lg:flex items-center gap-10 text-gray-800 text-[10px] font-black uppercase tracking-[0.3em] bg-white/30 backdrop-blur-3xl border border-white/60 px-14 py-4 rounded-full shadow-xl">
            <span onClick={() => scrollToId('platform')} className="cursor-pointer hover:text-emerald-600 transition-colors">Platform</span>
            <span onClick={() => scrollToId('modules')} className="cursor-pointer hover:text-emerald-600 transition-colors">Modules</span>
            <span onClick={() => scrollToId('team')} className="cursor-pointer hover:text-emerald-600 transition-colors">Team</span>
            <span onClick={() => scrollToId('contact')} className="cursor-pointer hover:text-emerald-600 transition-colors">Contact</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => navigate('login')}
              className="bg-gray-900 hover:bg-black text-white font-black px-10 py-3.5 rounded-full transition-all shadow-xl text-xs uppercase tracking-widest"
            >
              Access Platform
            </button>
          </div>
        </nav>

        <div className="relative z-10 text-center max-w-6xl px-6">
          <FadeIn delay={100} direction="scale">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-emerald-200 bg-emerald-500/10 mb-10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-800 font-black">Next-Gen Operational OS</span>
            </div>
          </FadeIn>

          <FadeIn delay={200} direction="up">
            <h1 className="text-5xl md:text-[7rem] font-black text-gray-900 leading-[0.9] tracking-tighter mb-10 uppercase">
              RECYCLE & YIELD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">INTELLIGENTLY.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={400} direction="up">
            <p className="text-lg md:text-2xl text-gray-600 font-medium mb-16 max-w-3xl mx-auto leading-relaxed opacity-90">
              Unify physical floor logistics with deep financial intelligence. Replace fragmented communications with a real-time ledger for the battery economy.
            </p>
          </FadeIn>

          <FadeIn delay={600} direction="up" className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button
              onClick={() => navigate('login')}
              className="group w-full sm:w-auto bg-gray-900 text-white font-black text-xl px-14 py-6 rounded-full transition-all hover:bg-black hover:scale-105 flex items-center justify-center gap-4 shadow-2xl uppercase tracking-widest"
            >
              Enter Platform <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scrollToId('platform')} className="w-full sm:w-auto bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-white/80 text-gray-900 font-bold text-lg px-14 py-6 rounded-full transition-all uppercase tracking-widest shadow-sm">
              Watch Demo
            </button>
          </FadeIn>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full -mt-24 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard delay={200} icon={<ShieldCheck />} title="Compliance Ready" desc="Automated EOM audit reporting and EU Digital Battery Passport generation." color="emerald" />
          <FeatureCard delay={300} icon={<Clock />} title="Live Tracking" desc="Real-time 24/7 barcode tracking of batch locations and processing stages." color="cyan" />
          <FeatureCard delay={400} icon={<TrendingUp />} title="Maximized Yield" desc="Unit economic tracking and process simulation to minimize material loss." color="orange" />
          <FeatureCard delay={500} icon={<FlaskConical />} title="Lab QC Approval" desc="Seamless chemical assay integration linked directly to settlement payouts." color="blue" />
        </div>
      </div>

      <DataFlowVisualization />

      <section id="modules" className="w-full py-40 relative z-10 bg-white border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeIn delay={0} className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 mb-8 uppercase">
              Complete Visibility. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-600">End-to-End Control.</span>
            </h2>
            <p className="text-2xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed italic opacity-80">
              "Replace broken spreadsheets with a unified operating system built for physical scale."
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-900">
            <DetailedModule delay={100} icon={<LayoutDashboard />} title="Monitor & Intake" desc="Track inbound material from the gate to the final processing rack." points={["Live Batch Valuation", "Physical Floor Map", "Inventory Ledger Exports"]} color="emerald" />
            <DetailedModule delay={200} icon={<MessageSquare />} title="AI Shift Sync" desc="Convert unstructured shift logs into verifiable operational data." points={["NLP Entity Extraction", "Handoff Summaries", "Anomaly Detection"]} color="cyan" />
            <DetailedModule delay={300} icon={<Receipt />} title="Settlement Hub" desc="Connect chemical labs to finance for error-free payouts." points={["Purity Score Integration", "Bonus/Penalty Calculation", "Instant Invoicing"]} color="blue" />
            <DetailedModule delay={400} icon={<Award />} title="Battery Passport" desc="Guarantee origin and footprint for the entire supply chain." points={["EU Battery Directive Compliance", "Cryptographic Twins", "Export Logs"]} color="orange" />
          </div>
        </div>
      </section>

      <section id="team" className="w-full py-40 relative z-10 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-10">
          <FadeIn delay={0} className="text-center mb-24">
            <h2 className="text-5xl font-black tracking-[0.3em] text-gray-900 mb-6 uppercase">TEAM BEHIND IT</h2>
            <div className="w-32 h-1.5 bg-emerald-500 mx-auto rounded-full shadow-[0_0_15px_#10b981]"></div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12">
            <LeadershipCardHome initials="DR" name="Dheeraj Rajesh" role="Co-Founder" />
            <LeadershipCardHome initials="VA" name="Vineet Ahuja" role="Co-Founder" />
            <LeadershipCardHome initials="VM" name="Vishwas M" role="Co-Founder" />
            <LeadershipCardHome initials="AR" name="ALN RAO" role="Advisor" />
          </div>
        </div>
      </section>

      <section id="contact" className="w-full py-40 relative z-10 bg-white border-t border-gray-100 flex justify-center">
        <FadeIn delay={200} direction="scale" className="w-full max-w-[650px] px-6">
          <div className="bg-slate-50 border border-gray-200 rounded-[4rem] p-16 shadow-2xl flex flex-col">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 mb-4 uppercase text-center">Book a Demo</h2>
            <p className="text-gray-500 text-lg font-medium mb-12 italic text-center leading-relaxed">Connect with the YieldPe team today to maximize your plant efficiency.</p>
            <form className="flex flex-col gap-8" onSubmit={(e) => { e.preventDefault(); navigate('login'); }}>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Full Name</label>
                <input type="text" placeholder="Dheeraj R." className="w-full bg-white border border-gray-200 rounded-3xl py-5 px-8 text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-bold" required />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Work Email</label>
                <input type="email" placeholder="corporate@plant.com" className="w-full bg-white border border-gray-200 rounded-3xl py-5 px-8 text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-bold" required />
              </div>
              <button type="submit" className="w-full py-6 mt-4 rounded-3xl bg-gray-900 hover:bg-black text-white font-black text-lg transition-all flex justify-center items-center gap-4 shadow-xl uppercase tracking-widest hover:scale-105">
                Kick off Journey <ArrowRight className="w-6 h-6" />
              </button>
            </form>
          </div>
        </FadeIn>
      </section>

      <footer className="bg-white border-t border-gray-100 pt-32 pb-16 text-gray-500">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 md:col-span-1">
            <BrandLogo className="text-2xl mb-10" theme="light" />
            <p className="text-sm leading-relaxed font-bold max-w-xs opacity-60 italic text-gray-800">The definitive operational core for the battery recycling supply chain.</p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-gray-900 font-black uppercase tracking-[0.2em] text-[11px]">Platform</h4>
            <span className="hover:text-emerald-600 cursor-pointer transition-colors text-sm font-bold uppercase tracking-widest">Dashboard</span>
            <span className="hover:text-emerald-600 cursor-pointer transition-colors text-sm font-bold uppercase tracking-widest">AI Core</span>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-gray-900 font-black uppercase tracking-[0.2em] text-[11px]">Company</h4>
            <span className="hover:text-emerald-600 cursor-pointer transition-colors text-sm font-bold uppercase tracking-widest">About</span>
            <span className="hover:text-emerald-600 cursor-pointer transition-colors text-sm font-bold uppercase tracking-widest">Support</span>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-gray-900 font-black uppercase tracking-[0.2em] text-[11px]">Connect</h4>
            <span className="flex items-center gap-4 text-xs font-black uppercase tracking-widest"><Mail className="w-5 h-5 text-emerald-600" /> hello@yieldpe.com</span>
            <div className="mt-6 flex gap-10">
              <Globe className="w-6 h-6 hover:text-emerald-600 cursor-pointer transition-colors text-gray-400" />
              <MessageSquare className="w-6 h-6 hover:text-emerald-600 cursor-pointer transition-colors text-gray-400" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-10 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-[0.5em]">
          <span className="opacity-40 italic font-medium">© 2026 YieldPe Technologies Pvt. Ltd.</span>
          <div className="flex gap-16">
            <span className="cursor-pointer hover:text-gray-900 transition-colors opacity-60">Privacy</span>
            <span className="cursor-pointer hover:text-gray-900 transition-colors opacity-60">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// AUTH + DATA INGEST + DASHBOARD FROM CODE 2
// ==========================================
function AuthSimulator({ navigate, type }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative px-6 bg-black text-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="w-full max-w-md bg-[#050505] border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10 flex flex-col">
        <div className="mb-8 flex justify-center"><BrandLogo className="text-3xl" /></div>
        <h2 className="text-2xl font-black text-center mb-6">{type === 'login' ? 'Secure Gateway' : 'Create Account'}</h2>
        <input type="email" placeholder="demo@yieldpe.com" className="w-full bg-[#111] border border-white/10 text-white rounded-xl py-3 px-4 mb-4 focus:outline-none focus:border-emerald-500/50" />
        <button onClick={() => navigate('upload')} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors mt-4">Proceed</button>
      </div>
    </div>
  );
}

function UploadPage({ navigate }) {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    let int = setInterval(() => {
      setProg((p) => {
        if (p >= 100) {
          clearInterval(int);
          setTimeout(() => navigate('dashboard'), 800);
          return 100;
        }
        return p + 25;
      });
    }, 500);
    return () => clearInterval(int);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50 text-gray-900">
      <h2 className="text-3xl font-black mb-8">Ingesting Plant Data...</h2>
      <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 transition-all" style={{ width: `${prog}%` }}></div>
      </div>
    </div>
  );
}

// ==========================================
// SAAS DASHBOARD (CODE 2 PRESERVED)
// ==========================================
function DashboardPage({ navigate }) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [temp, setTemp] = useState(650);
  const [pressure, setPressure] = useState(2.4);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { group: 'Operations' },
    { id: 'intake', label: 'Intake & Registration', icon: ClipboardList, desc: 'Log inbound batches' },
    { id: 'tracking', label: 'Batch Tracking', icon: Map, desc: 'Live stage monitoring' },
    { id: 'inventory', label: 'Live Inventory', icon: Box, desc: 'Stage-wise stock & value' },
    { id: 'operator-log', label: 'Operator Log', icon: MessageSquare, desc: 'AI Comms Sync' },
    { id: 'lab-qc', label: 'Lab & QC', icon: FlaskConical, desc: 'Chemical purity assays' },
    { group: 'Intelligence' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, desc: 'Yields & Metrics' },
    { id: 'search', label: 'AI Assistant', icon: Search, desc: 'Query plant data' },
    { id: 'optimize', label: 'Process Optimize', icon: SlidersHorizontal, desc: 'Simulation & Fixes' },
    { id: 'network', label: 'Network', icon: Network, desc: 'Cross-plant benchmarks' },
    { group: 'Admin & Finance' },
    { id: 'finance', label: 'Finance Settlements', icon: Receipt, desc: 'Supplier Payouts' },
    { id: 'passport', label: 'Battery Passport', icon: Award, desc: 'Digital Twins' },
    { id: 'compliance', label: 'Compliance', icon: FileCheck, desc: 'Reports & Audit' }
  ];

  const currentTabInfo = navItems.find((i) => i.id === activeTab) || navItems[1];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex overflow-hidden">
      {sidebarOpen && <button className="lg:hidden fixed inset-0 bg-gray-900/60 z-30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed lg:static top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 flex flex-col z-40 shrink-0 transition-transform duration-300 ease-out shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => navigate('landing')}>
            <BrandLogo className="text-xl" theme="light" />
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-12 mt-1 block">Recycler OS</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden inline-flex p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 flex flex-col gap-1.5 overflow-y-auto no-scrollbar">
          {navItems.map((item, idx) => {
            if (item.group) {
              return <div key={idx} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mt-6 mb-2">{item.group}</div>;
            }
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left ${activeTab === item.id ? 'bg-emerald-50 text-emerald-800 border border-emerald-100/50 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                <div>
                  <div className="font-semibold text-sm leading-tight">{item.label}</div>
                  <div className={`text-[9px] uppercase tracking-wider mt-0.5 ${activeTab === item.id ? 'text-emerald-600/80' : 'text-gray-400'}`}>{item.desc}</div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold uppercase">DR</div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-gray-900 truncate">Dheeraj Rajesh</div>
              <div className="text-xs text-gray-500 truncate">Admin • Global Plant</div>
              <button onClick={() => navigate('landing')} className="mt-1 text-[10px] text-gray-400 hover:text-gray-700 uppercase tracking-widest font-bold">Sign Out</button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto relative z-10 scroll-smooth no-scrollbar">
        <div className="max-w-[1500px] mx-auto p-6 md:p-10">
          <header className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                {currentTabInfo.label}
                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold">Live Sync Active</span>
                </div>
              </h2>
              <p className="text-gray-500 mt-2 text-sm">{currentTabInfo.desc}</p>
            </div>

            <div className="flex-1 w-full flex justify-end items-center gap-4">
              <div className="hidden lg:flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 max-w-sm focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all shadow-sm">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search batches, suppliers, operators..." className="bg-transparent border-none text-sm text-gray-900 focus:outline-none w-full ml-3 placeholder-gray-400" />
              </div>

              <div className="hidden md:flex items-center gap-2 text-sm font-mono text-gray-500 bg-white border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm">
                <Clock className="w-4 h-4" /> {currentTime.toLocaleTimeString()}
              </div>

              {activeTab !== 'intake' && (
                <button
                  onClick={() => setActiveTab('intake')}
                  className="hidden md:flex px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-xl shadow-sm transition-all items-center gap-2"
                >
                  <Database className="w-4 h-4" /> Register Batch
                </button>
              )}

              <button onClick={() => setSidebarOpen(true)} className="lg:hidden inline-flex p-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 shadow-sm">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'intake' && <IntakeTab showToast={showToast} />}
            {activeTab === 'tracking' && <TrackingTab showToast={showToast} />}
            {activeTab === 'inventory' && <InventoryTab />}
            {activeTab === 'operator-log' && <OperatorLogTab showToast={showToast} />}
            {activeTab === 'lab-qc' && <LabQCTab showToast={showToast} />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'search' && <SearchTab showToast={showToast} />}
            {activeTab === 'optimize' && <OptimizeTab temp={temp} setTemp={setTemp} pressure={pressure} setPressure={setPressure} />}
            {activeTab === 'network' && <NetworkTab />}
            {activeTab === 'finance' && <FinanceTab showToast={showToast} />}
            {activeTab === 'passport' && <PassportTab showToast={showToast} />}
            {activeTab === 'compliance' && <ComplianceTab showToast={showToast} />}
          </div>
        </div>
      </main>

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl border animate-in fade-in slide-in-from-bottom-6 ${
          toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          toast.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
          'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {toast.type === 'error' ? <XCircle className="w-5 h-5 text-red-600" /> :
           toast.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-600" /> :
           <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          <p className="font-semibold text-sm">{toast.msg}</p>
        </div>
      )}
    </div>
  );
}

// Placeholder simplified component set for the remaining dashboard tabs
function InventoryTab() { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Inventory preserved in zip project.</div>; }
function TrackingTab({ showToast }) { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Tracking module preserved.</div>; }
function OperatorLogTab({ showToast }) { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Operator Log module preserved.</div>; }
function IntakeTab({ showToast }) { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Intake module preserved.</div>; }
function LabQCTab({ showToast }) { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Lab QC module preserved.</div>; }
function AnalyticsTab() { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Analytics module preserved.</div>; }
function FinanceTab({ showToast }) { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Finance module preserved.</div>; }
function PassportTab({ showToast }) { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Passport module preserved.</div>; }
function ComplianceTab({ showToast }) { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Compliance module preserved.</div>; }
function OptimizeTab({ temp, setTemp, pressure, setPressure }) { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Optimize module preserved. Temp: {temp}, Pressure: {pressure}</div>; }
function NetworkTab() { return <div className="p-6 bg-white rounded-2xl border border-gray-200">Network module preserved.</div>; }
function SearchTab({ showToast }) { return <div className="p-6 bg-white rounded-2xl border border-gray-200">AI Search module preserved.</div>; }
