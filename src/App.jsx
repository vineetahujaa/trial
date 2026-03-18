import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Activity, FileText, Network, Search, SlidersHorizontal, 
  BarChart3, MoreHorizontal, TrendingUp, AlertTriangle, Users, 
  BrainCircuit, Send, Loader2, CheckCircle2, DollarSign, Menu, X, 
  Bot, Database, ClipboardList, Map, Box, FileCheck, Download, 
  History, Clock, Battery, Layers, Check, QrCode, ScanLine, UserCheck,
  Signature, MessageSquare, Mic, FlaskConical, Receipt, Award, XCircle,
  Plus, Zap, FileSpreadsheet, ShieldCheck, Phone, Globe, Mail, MapPin,
  ChevronRight, Sparkles, LayoutDashboard
} from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react';
// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('landing');

  const navigate = (route) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentRoute(route);
  };

  const isDarkMode =false;

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500/30 transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-gray-900'}`}>
      {currentRoute === 'landing' && <LandingPage navigate={navigate} />}
      {currentRoute === 'upload' && <UploadPage navigate={navigate} />}
      {currentRoute === 'dashboard' && (
  <SignedIn>
    <DashboardPage navigate={navigate} />
  </SignedIn>
)}
{currentRoute === 'dashboard' && (
  <SignedOut>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm text-center max-w-md">
        <h2 className="text-2xl font-black text-gray-900 mb-3">Authentication Required</h2>
        <p className="text-gray-500 mb-6">Please sign in to access the dashboard.</p>
        <SignInButton mode="modal">
          <button className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-3 rounded-xl">
            Sign In
          </button>
        </SignInButton>
      </div>
    </div>
  </SignedOut>
)}
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

function BrandLogo({ className = 'text-2xl', theme = 'light' }) {
  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      <div className="relative flex items-center justify-center">
        {theme === 'dark' && <div className="absolute inset-0 bg-emerald-500/40 blur-md rounded-full group-hover:bg-emerald-400/60 transition-colors duration-500"></div>}
        <svg className="relative z-10 w-9 h-9 transform group-hover:scale-105 transition-transform duration-500" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2L36 10.5V29.5L20 38L4 29.5V10.5L20 2Z" fill="url(#logo-glow)" fillOpacity="0.15" stroke="url(#logo-border)" strokeWidth="1.5"/>
          <path d="M20 10L29 15V25L20 30L11 25V15L20 10Z" fill="url(#logo-solid)"/>
          <path d="M11 15L20 21V30M29 15L20 21" stroke={theme === 'dark' ? "#000000" : "#ffffff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Pe</span>
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
          {points.map(p => (
            <div key={p} className="flex items-center gap-3 text-sm font-bold text-gray-700">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div> {p}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function DataPill({ icon, label, color = "border-white/60" }) {
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

// ==========================================
// PAGES
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

          <div className="flex items-center gap-3 shrink-0">
  <SignedOut>
    <SignInButton mode="modal">
      <button className="bg-gray-900 hover:bg-black text-white font-black px-8 py-3.5 rounded-full transition-all shadow-xl text-xs uppercase tracking-widest">
        Sign In
      </button>
    </SignInButton>

    <SignUpButton mode="modal">
      <button className="bg-white/70 hover:bg-white text-gray-900 font-black px-8 py-3.5 rounded-full transition-all shadow-xl text-xs uppercase tracking-widest border border-white/70">
        Sign Up
      </button>
    </SignUpButton>
  </SignedOut>

  <SignedIn>
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate('dashboard')}
        className="bg-gray-900 hover:bg-black text-white font-black px-8 py-3.5 rounded-full transition-all shadow-xl text-xs uppercase tracking-widest"
      >
        Dashboard
      </button>
      <div className="bg-white/70 backdrop-blur-xl rounded-full p-1 border border-white/70">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  </SignedIn>
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-black text-gray-900 leading-[0.95] lg:leading-[0.9] tracking-tighter mb-8 md:mb-10 uppercase break-words">
              RECYCLE & YIELD <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">INTELLIGENTLY.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={400} direction="up">
            <p className="text-lg md:text-2xl text-gray-600 font-medium mb-16 max-w-3xl mx-auto leading-relaxed opacity-90">
              Unify physical floor logistics with deep financial intelligence. Replace fragmented communications with a real-time ledger for the battery economy.
            </p>
          </FadeIn>

          <FadeIn delay={600} direction="up" className="flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-8">
            <SignedOut>
  <SignInButton mode="modal">
    <button className="group w-full sm:w-auto bg-gray-900 text-white font-black text-xl px-14 py-6 rounded-full transition-all hover:bg-black hover:scale-105 flex items-center justify-center gap-4 shadow-2xl uppercase tracking-widest">
      Enter Platform <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
    </button>
  </SignInButton>
</SignedOut>

<SignedIn>
  <button
    onClick={() => navigate('dashboard')}
    className="group w-full sm:w-auto bg-gray-900 text-white font-black text-xl px-14 py-6 rounded-full transition-all hover:bg-black hover:scale-105 flex items-center justify-center gap-4 shadow-2xl uppercase tracking-widest"
  >
    Go to Dashboard <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
  </button>
</SignedIn>
            <button onClick={() => scrollToId('platform')} className="w-full max-w-[360px] lg:max-w-none lg:w-auto bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-white/80 text-gray-900 font-bold text-base sm:text-lg px-8 sm:px-12 lg:px-14 py-5 lg:py-6 rounded-full transition-all uppercase tracking-widest shadow-sm">
              Watch Demo
            </button>
          </FadeIn>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-12 md:mt-16 lg:mt-20 mb-24 md:mb-32">
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
              Complete Visibility. <br className="hidden md:block"/>
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

function AuthSimulator({ navigate, type }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative px-6 bg-black text-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="w-full max-w-md bg-[#050505] border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10 flex flex-col">
        <div className="mb-8 flex justify-center"><BrandLogo className="text-3xl" theme="dark" /></div>
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
      setProg(p => { if (p >= 100) { clearInterval(int); setTimeout(() => navigate('dashboard'), 800); return 100; } return p + 25; });
    }, 500);
    return () => clearInterval(int);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50 text-gray-900 px-6">
      <Loader2 className="w-14 h-14 animate-spin text-emerald-500 mb-8" />
      <h2 className="text-3xl font-black mb-8">Ingesting Plant Data...</h2>
      <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 transition-all" style={{ width: `${prog}%` }}></div></div>
    </div>
  );
}

// ==========================================
// SAAS DASHBOARD (LIGHT MODE)
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
                  <Database className="w-4 h-4"/> Register Batch
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

// ==========================================
// DYNAMIC MODULES
// ==========================================

function InventoryTab() {
  const [totalBat, setTotalBat] = useState(45200);
  const [pending, setPending] = useState(12500);
  const [shredding, setShredding] = useState(8200);
  const [blackMass, setBlackMass] = useState(24500);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalBat(prev => prev + Math.floor(Math.random() * 50));
      setPending(prev => prev - Math.floor(Math.random() * 20));
      setShredding(prev => prev + Math.floor(Math.random() * 15) - 5);
      setBlackMass(prev => prev + Math.floor(Math.random() * 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const spotPrice = 13.2;

  const inventory = [
    { label: 'Total Batteries in Plant', location: 'Zone A (Gate)', value: totalBat.toLocaleString(), unit: 'kg', estValue: `$${((totalBat * 3.2)/1000).toFixed(1)}k`, icon: <Layers className="w-5 h-5 text-gray-600" />, color: 'bg-gray-800' },
    { label: 'Pending Discharge', location: 'Zone B (Racks)', value: pending.toLocaleString(), unit: 'kg', estValue: `$${((pending * 3.2)/1000).toFixed(1)}k`, icon: <Battery className="w-5 h-5 text-amber-600" />, color: 'bg-amber-500' },
    { label: 'In Shredding', location: 'Zone C (Machines)', value: shredding.toLocaleString(), unit: 'kg', estValue: `$${((shredding * 8.5)/1000).toFixed(1)}k`, icon: <Activity className="w-5 h-5 text-cyan-600" />, color: 'bg-cyan-500' },
    { label: 'Black Mass Processed', location: 'Zone D (Finished)', value: blackMass.toLocaleString(), unit: 'kg', estValue: `$${((blackMass * spotPrice)/1000).toFixed(1)}k`, icon: <Box className="w-5 h-5 text-emerald-600" />, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-800">Live Inventory Value:</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-gray-900 font-mono">
            ${( (totalBat * 3.2) + (pending * 3.2) + (shredding * 8.5) + (blackMass * spotPrice) ).toLocaleString('en-US', {maximumFractionDigits: 0})}
          </span>
          <span className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Est. based on spot prices</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventory.map((inv, i) => (
          <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:border-gray-300 transition-all flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">{inv.icon}</div>
              <div className="bg-gray-50 border border-gray-200 px-2 py-1 rounded text-[10px] font-mono text-gray-600 font-bold">{inv.estValue}</div>
            </div>
            <div className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-bold uppercase tracking-wider rounded border border-gray-200 mb-2 self-start">
              📍 {inv.location}
            </div>
            <div className="text-sm font-semibold text-gray-500 mb-1">{inv.label}</div>
            <div className="text-3xl font-black text-gray-900 font-mono tracking-tight flex items-baseline gap-2">
              {inv.value} <span className="text-sm text-gray-500 font-sans font-medium">{inv.unit}</span>
            </div>
            <div className={`absolute bottom-0 left-0 h-1 w-full ${inv.color} opacity-80 transition-all duration-1000`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrackingTab({ showToast }) {
  const stages = ['Received', 'Discharged', 'Dismantled', 'Shredded', 'Black Mass Extracted'];
  const [scanInput, setScanInput] = useState('');
  const [selectedStage, setSelectedStage] = useState(1);

  const [activeBatches, setActiveBatches] = useState([
    { id: 'B-7491', currentStage: 1, operator: 'JD-Shift1', time: '10:45 AM' },
    { id: 'B-7492', currentStage: 3, operator: 'MK-Shift2', time: '02:15 PM' },
    { id: 'B-7488', currentStage: 4, operator: 'PL-Shift1', time: '09:00 AM' },
  ]);

  const handleScan = () => {
    if (!scanInput.trim()) return;
    const batchIndex = activeBatches.findIndex(b => b.id.toLowerCase() === scanInput.toLowerCase());

    if (batchIndex >= 0) {
      const batch = activeBatches[batchIndex];
      const updated = [...activeBatches];
      updated[batchIndex] = { ...batch, currentStage: selectedStage, time: 'Just now', operator: 'You (Admin)' };
      setActiveBatches(updated);
      showToast(`Batch ${batch.id} updated to "${stages[selectedStage]}".`);
    } else {
      showToast(`Batch ID ${scanInput} not found in active tracking.`, 'error');
    }
    setScanInput('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="w-12 h-12 bg-cyan-50 border border-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 shrink-0">
            <ScanLine className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-gray-900 font-bold">Quick Stage Scan</h3>
            <p className="text-xs text-gray-500">Scan batch ID and select new processing stage.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          <input 
            type="text" 
            value={scanInput}
            onChange={(e) => setScanInput(e.target.value)}
            placeholder="e.g. B-7491" 
            className="flex-1 sm:w-40 bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-sm font-mono uppercase" 
          />
          <select 
            value={selectedStage} 
            onChange={(e) => setSelectedStage(Number(e.target.value))}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 outline-none focus:border-cyan-500"
          >
            {stages.map((s, i) => <option key={i} value={i}>{s}</option>)}
          </select>
          <button onClick={handleScan} className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-xl font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
            Update Stage
          </button>
        </div>
      </div>

      {activeBatches.map((batch, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h3 className="text-2xl font-black text-gray-900 font-mono tracking-tight">{batch.id}</h3>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3 h-3"/> Last update: {batch.time}
                </p>
                <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[10px] text-gray-600 font-bold flex items-center gap-1.5">
                  <UserCheck className="w-3 h-3 text-emerald-600" /> Logged by: {batch.operator}
                </div>
              </div>
            </div>
            <div className="bg-cyan-50 text-cyan-700 border border-cyan-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              Processing
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-100 border border-gray-200">
              <div style={{ width: `${(batch.currentStage / (stages.length - 1)) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500 transition-all duration-1000"></div>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
              {stages.map((stage, i) => (
                <div key={i} className={`text-center w-1/5 transition-colors duration-500 ${i <= batch.currentStage ? 'text-gray-900' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 mx-auto rounded-full mb-2 flex items-center justify-center transition-all duration-500 ${i <= batch.currentStage ? 'bg-cyan-500 shadow-sm scale-110' : 'bg-white border border-gray-300'}`}>
                    {i <= batch.currentStage && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  {stage}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OperatorLogTab({ showToast }) {
  const [messages, setMessages] = useState([
    { id: 1, role: 'system', text: 'Operator Comms Channel active. AI auto-extraction is ON.', time: '08:00 AM' },
    { id: 2, role: 'user', text: 'Starting shift 1. Batches look good.', time: '08:05 AM', sender: 'Operator PL' }
  ]);
  const [input, setInput] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [savedLogs, setSavedLogs] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: "Hey, reactor 4 pressure dropping slightly. Keeping an eye on it.", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), sender: 'Operator MK' }]);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), role: 'user', text: input, time: 'Just now', sender: 'You' };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setIsParsing(true);
    setParsedData(null);

    setTimeout(() => {
      const lower = newMsg.text.toLowerCase();
      let extracted = { batch: 'Unknown (Needs manual tag)', equipment: 'General Plant', issue: 'Routine Operator Update', action: 'None specified', severity: 'low' };

      if (lower.includes('reactor') || lower.includes('temp') || lower.includes('gasket') || lower.includes('drop')) {
        extracted = { batch: 'Apex-7491 (Inferred)', equipment: 'Reactor 4', issue: 'Temperature/Pressure anomaly', action: 'Gasket check recommended', severity: 'high' };
      } else if (lower.includes('shredder') || lower.includes('jam')) {
        extracted = { batch: 'Global-7492 (Inferred)', equipment: 'Shredder Line A', issue: 'Blade jam detected', action: 'Cleared debris, restarted', severity: 'medium' };
      }

      setParsedData(extracted);
      setIsParsing(false);
    }, 1500);
  };

  const handleCommit = () => {
    if (!parsedData) return;
    setSavedLogs((prev) => [{ ...parsedData, id: Date.now(), time: new Date().toLocaleTimeString() }, ...prev]);
    setMessages((prev) => [...prev, { id: Date.now(), role: 'system', text: `✅ Automatically extracted and saved to Official Ledger.`, time: 'Just now' }]);
    setParsedData(null);
    showToast('Operator Log successfully committed to database.');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-6">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col h-[650px] overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200">
              <Users className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Shift Supervisors Channel</h3>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> AI Sync Active
              </p>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-50/50 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.role === 'user' && msg.sender !== 'You' && (
                  <span className="text-[10px] font-bold text-gray-500 mb-1 ml-1">{msg.sender}</span>
                )}
                <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm ${
                  msg.role === 'user' 
                    ? msg.sender === 'You' 
                      ? 'bg-emerald-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                    : 'bg-gray-800 text-white rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 font-mono">{msg.time}</span>
              </div>
            </div>
          ))}
          {isParsing && (
             <div className="flex justify-start">
               <div className="bg-gray-800 text-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                 <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                 <span className="text-xs font-medium">AI parsing entities...</span>
               </div>
             </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-gray-200 flex gap-3 items-end">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl flex items-center px-2 py-1 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type shift update (e.g. 'reactor 4 temp dropped 15 deg...')" 
              className="flex-1 bg-transparent border-none text-sm px-3 py-3 outline-none text-gray-900"
            />
            <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col h-[380px]">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="bg-indigo-50 border border-indigo-100 p-2 rounded-lg">
              <BrainCircuit className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">AI Extraction Engine</h3>
              <p className="text-xs text-gray-500">Converts messy texts to structured JSON</p>
              <p className="text-[10px] text-indigo-500 font-mono mt-1">Ready for input</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {!parsedData && !isParsing && (
              <div className="text-center text-gray-400 flex flex-col items-center gap-3">
                <Bot className="w-12 h-12 opacity-20" />
                <p className="text-sm">Waiting for incoming operator messages...</p>
              </div>
            )}

            {isParsing && (
               <div className="text-center flex flex-col items-center gap-4">
                 <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                 <p className="text-sm font-medium text-indigo-600 animate-pulse">Running NLP extraction...</p>
               </div>
            )}

            {parsedData && !isParsing && (
              <FadeIn className="w-full flex flex-col h-full justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase">Target Batch</span>
                    <span className="text-sm font-mono font-bold text-gray-900">{parsedData.batch}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase">Equipment</span>
                    <span className="text-sm font-bold text-gray-900">{parsedData.equipment}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase">Identified Issue</span>
                    <span className="text-sm font-bold text-red-600">{parsedData.issue}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase">Action Taken</span>
                    <span className="text-sm font-bold text-emerald-600">{parsedData.action}</span>
                  </div>
                </div>
                <button onClick={handleCommit} className="w-full mt-4 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-sm transition-all flex justify-center items-center gap-2 text-sm">
                  <Database className="w-4 h-4" /> Commit to Operations Ledger
                </button>
              </FadeIn>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex-1 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Recent Auto-Logs</h3>
          <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar max-h-[180px]">
            {savedLogs.length === 0 ? (
              <div className="text-sm text-gray-400 italic">No logs committed this shift.</div>
            ) : (
              savedLogs.map((log) => (
                <div key={log.id} className="p-3 border border-gray-200 rounded-xl bg-gray-50 text-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-gray-900">{log.equipment}</span>
                    <span className="text-[10px] font-mono text-gray-500">{log.time}</span>
                  </div>
                  <p className="text-gray-600 text-xs mb-2">{log.issue} → {log.action}</p>
                  <div className="inline-block px-2 py-0.5 bg-gray-200 text-gray-700 text-[10px] rounded font-mono font-bold">
                    {log.batch}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function IntakeTab({ showToast }) {
  const [batches] = useState([
    { id: 'B-7491', source: 'Apex Recyclers', type: 'Lithium-Ion', form: 'Cylindrical (18650)', weight: '1,200 kg', date: 'Oct 24, 2026' },
    { id: 'B-7492', source: 'Global Scrap Co.', type: 'NMC 811', form: 'Pouch Cells', weight: '850 kg', date: 'Oct 24, 2026' },
    { id: 'B-7493', source: 'EcoMetals Inc', type: 'LFP', form: 'Prismatic', weight: '2,100 kg', date: 'Oct 23, 2026' },
    { id: 'B-7494', source: 'Apex Recyclers', type: 'Lithium-Ion', form: 'Cylindrical (2170)', weight: '940 kg', date: 'Oct 23, 2026' },
  ]);

  const handlePrint = (id) => {
    showToast(`Sending print job for QR Label ${id} to factory printer.`, 'success');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
          <div className="bg-emerald-50 p-2 border border-emerald-100 rounded-lg"><ClipboardList className="w-4 h-4 text-emerald-600"/></div>
          Intake Ledger & Registration
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-gray-50 border-y border-gray-200 text-gray-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4 font-bold">Batch ID</th>
              <th className="px-6 py-4 font-bold">Battery Source</th>
              <th className="px-6 py-4 font-bold">Battery Type</th>
              <th className="px-6 py-4 font-bold">Form Factor</th>
              <th className="px-6 py-4 font-bold">Intake Weight</th>
              <th className="px-6 py-4 font-bold">Date Registered</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {batches.map((b, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-mono font-bold text-gray-900">{b.id}</td>
                <td className="px-6 py-4 font-medium">{b.source}</td>
                <td className="px-6 py-4"><span className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-mono">{b.type}</span></td>
                <td className="px-6 py-4 text-gray-500">{b.form}</td>
                <td className="px-6 py-4 font-mono font-semibold text-emerald-600">{b.weight}</td>
                <td className="px-6 py-4 text-gray-500 text-xs">{b.date}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handlePrint(b.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200 rounded-lg text-xs font-bold transition-all shadow-sm">
                    <QrCode className="w-3.5 h-3.5" /> Print Label
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LabQCTab({ showToast }) {
  const [qcData, setQcData] = useState([
    { batch: 'B-7491', supplier: 'Apex Recyclers', li: 6.4, co: 18.2, ni: 21.5, status: 'Pass', valueMod: '+5%' },
    { batch: 'B-7492', supplier: 'Global Scrap Co.', li: 5.8, co: 16.5, ni: 20.1, status: 'Warning', valueMod: '-2%' },
    { batch: 'B-7488', supplier: 'EcoMetals Inc', li: 4.2, co: 12.0, ni: 15.5, status: 'Fail', valueMod: '-15%' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ batch: 'B-749', supplier: 'New Supplier', li: '', co: '', ni: '' });

  const handleSaveReport = () => {
    if (!formData.li || !formData.co || !formData.ni) {
      showToast('Please enter all purity percentages.', 'error');
      return;
    }

    const liVal = parseFloat(formData.li);
    let status = 'Pass';
    let mod = '+2%';
    if (liVal < 5.0) { status = 'Fail'; mod = '-10%'; }
    else if (liVal < 6.0) { status = 'Warning'; mod = '-1%'; }

    const newEntry = { 
      batch: formData.batch, 
      supplier: formData.supplier, 
      li: liVal, 
      co: parseFloat(formData.co), 
      ni: parseFloat(formData.ni), 
      status, 
      valueMod: mod 
    };

    setQcData([newEntry, ...qcData]);
    setShowForm(false);
    setFormData({ batch: `B-749${Math.floor(Math.random()*10)+5}`, supplier: 'New Supplier', li: '', co: '', ni: '' });
    showToast(`Lab QC Assay report for Batch ${formData.batch} saved successfully. Status: ${status}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
          <div className="bg-blue-50 p-2 border border-blue-100 rounded-lg"><FlaskConical className="w-5 h-5 text-blue-600"/></div>
          Chemical Purity Analysis (Lab QC)
        </h3>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
          {showForm ? <X className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} 
          {showForm ? 'Cancel' : 'New Report Entry'}
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-6">Determine true Black Mass value based on lab technician chemical assay reports.</p>

      {showForm && (
        <FadeIn className="mb-8 p-6 bg-blue-50/50 border border-blue-100 rounded-xl shadow-inner">
          <h4 className="text-sm font-bold text-blue-800 mb-4">Report Ingestion Form</h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Batch ID</label>
              <input type="text" value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Lithium (Li) %</label>
              <input type="number" placeholder="e.g. 6.2" value={formData.li} onChange={e => setFormData({...formData, li: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Cobalt (Co) %</label>
              <input type="number" placeholder="e.g. 18.5" value={formData.co} onChange={e => setFormData({...formData, co: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Nickel (Ni) %</label>
              <input type="number" placeholder="e.g. 21.0" value={formData.ni} onChange={e => setFormData({...formData, ni: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" />
            </div>
            <button onClick={handleSaveReport} className="bg-gray-900 text-white font-bold rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors h-[38px] text-sm shadow-sm">
              Save Report
            </button>
          </div>
        </FadeIn>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-gray-50 border-y border-gray-200 text-gray-500 uppercase text-[10px]">
            <tr>
              <th className="px-6 py-4 font-bold">Batch ID</th>
              <th className="px-6 py-4 font-bold">Supplier</th>
              <th className="px-6 py-4 font-bold">Lithium (Li)</th>
              <th className="px-6 py-4 font-bold">Cobalt (Co)</th>
              <th className="px-6 py-4 font-bold">Nickel (Ni)</th>
              <th className="px-6 py-4 font-bold">Value Update</th>
              <th className="px-6 py-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {qcData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-gray-900">{row.batch}</td>
                <td className="px-6 py-4">{row.supplier}</td>
                <td className="px-6 py-4 font-mono">{row.li}%</td>
                <td className="px-6 py-4 font-mono">{row.co}%</td>
                <td className="px-6 py-4 font-mono">{row.ni}%</td>
                <td className="px-6 py-4 font-bold">
                  <span className={row.valueMod.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}>{row.valueMod}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${row.status === 'Pass' ? 'bg-emerald-100 text-emerald-700' : row.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const [yieldVal, setYieldVal] = useState(86);

  useEffect(() => {
    const int = setInterval(() => setYieldVal(prev => prev === 86 ? 87 : 86), 4000);
    return () => clearInterval(int);
  }, []);

  const kpis = { batteryInput: 45200, realizedValue: '$323.4k', avgProcTime: '4h 20m' };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Battery Input', value: `${(kpis.batteryInput / 1000).toFixed(1)}t`, trend: '+12% vs last month', color: 'text-emerald-600', icon: <Database className="w-5 h-5 text-gray-600" /> },
          { label: 'Realized Value (Yield)', value: kpis.realizedValue, trend: 'Based on $13.2k/t Spot', color: 'text-emerald-600', icon: <DollarSign className="w-5 h-5 text-gray-600" /> },
          { label: 'Overall Yield %', value: `${yieldVal}%`, trend: '1,248 batches', color: 'text-cyan-600', icon: <Activity className="w-5 h-5 text-gray-600" /> },
          { label: 'Avg Processing Time', value: kpis.avgProcTime, trend: 'Per Batch', color: 'text-purple-600', icon: <Clock className="w-5 h-5 text-gray-600" /> }
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">{kpi.icon}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-500 mb-1">{kpi.label}</div>
              <div className="text-3xl font-black text-gray-900 font-mono tracking-tight mb-4">{kpi.value}</div>
              <div className={`text-xs font-bold ${kpi.color} border-t border-gray-100 pt-3`}>{kpi.trend}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
           <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3"><TrendingUp className="w-5 h-5 text-emerald-600"/> Yield Output Trend (kg)</h3>
           <p className="text-xs text-gray-500 mb-6">Yield has increased by 2.4% this week due to improved NMC sorting accuracy.</p>
           <div className="h-56 flex items-end justify-between gap-3">
             {[1200, 1400, 1100, 1600, 1800, 1500, 2100].map((val, i) => (
               <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                 <div className="opacity-0 group-hover:opacity-100 text-xs font-mono bg-gray-900 text-white px-2 py-1 rounded">{val}</div>
                 <div className="w-full bg-emerald-500 rounded-t transition-all hover:bg-emerald-400" style={{ height: `${(val/2100)*100}%` }}></div>
                 <div className="text-[10px] text-gray-500 font-mono font-medium">Day {i+1}</div>
               </div>
             ))}
           </div>
        </div>
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold text-gray-900 mb-6 self-start flex items-center gap-3"><Activity className="w-5 h-5 text-cyan-600"/> Recovery Rate</h3>
            <div className="w-48 h-48 rounded-full border-[16px] border-gray-50 relative flex items-center justify-center mt-2">
               <div className="absolute inset-0 rounded-full border-[16px] border-emerald-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)' }}></div>
               <div className="absolute inset-0 rounded-full border-[16px] border-cyan-500" style={{ clipPath: 'polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)' }}></div>
               <div className="text-center bg-white w-full h-full rounded-full flex flex-col items-center justify-center border-4 border-white z-10">
                 <div className="text-3xl font-black text-gray-900 transition-all">{yieldVal}%</div>
                 <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Avg Yield</div>
               </div>
            </div>
            <div className="flex gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> NMC Batteries</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><span className="w-3 h-3 rounded-full bg-cyan-500"></span> LFP Batteries</div>
            </div>
        </div>
      </div>
    </div>
  );
}

function FinanceTab({ showToast }) {
  const [financeData, setFinanceData] = useState([
    { id: 1, supplier: 'Apex Recyclers', baseValue: '$45,000', purityBonus: '+$2,250', yieldPenalty: '$0', final: '$47,250', status: 'Pending' },
    { id: 2, supplier: 'Global Scrap Co.', baseValue: '$32,000', purityBonus: '$0', yieldPenalty: '-$800', final: '$31,200', status: 'Paid' },
    { id: 3, supplier: 'EcoMetals Inc', baseValue: '$60,000', purityBonus: '$0', yieldPenalty: '-$9,000', final: '$51,000', status: 'Under Review' },
  ]);

  const handleSendInvoice = (id, supplierName) => {
    const updated = financeData.map(row => row.id === id ? { ...row, status: 'Paid' } : row);
    setFinanceData(updated);
    showToast(`Settlement invoice sent to ${supplierName}. Status marked as Paid.`, 'success');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
          <div className="bg-green-50 p-2 border border-green-100 rounded-lg"><Receipt className="w-5 h-5 text-green-600"/></div>
          Supplier Settlements & Payouts
        </h3>
      </div>
      <p className="text-sm text-gray-500 mb-6">Automatically adjust supplier payouts based on realized yield and Lab Purity scores.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-gray-50 border-y border-gray-200 text-gray-500 uppercase text-[10px]">
            <tr>
              <th className="px-6 py-4 font-bold">Supplier (Company)</th>
              <th className="px-6 py-4 font-bold">Base Rate</th>
              <th className="px-6 py-4 font-bold text-emerald-600">Purity Bonus</th>
              <th className="px-6 py-4 font-bold text-red-600">Yield Penalty</th>
              <th className="px-6 py-4 font-bold text-gray-900">Final Payout</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {financeData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900">{row.supplier}</td>
                <td className="px-6 py-4 font-mono">{row.baseValue}</td>
                <td className="px-6 py-4 font-mono text-emerald-600">{row.purityBonus}</td>
                <td className="px-6 py-4 font-mono text-red-600">{row.yieldPenalty}</td>
                <td className="px-6 py-4 font-mono font-black text-gray-900 text-lg">{row.final}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${row.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : row.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleSendInvoice(row.id, row.supplier)} 
                    disabled={row.status === 'Paid'}
                    className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-gray-900 transition-colors"
                  >
                    {row.status === 'Paid' ? 'Settled' : 'Send Invoice'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PassportTab({ showToast }) {
  const [hash, setHash] = useState('—');
  const [isGenerating, setIsGenerating] = useState(false);
  const [timestamp, setTimestamp] = useState('—');
  const [selectedBatch, setSelectedBatch] = useState('B-7491');
  const [hasPassport, setHasPassport] = useState(false);

  const readyBatches = ['B-7491', 'B-7488', 'B-7412'];

  const generatePassport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setHash(`YIELD-${selectedBatch}-0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`);
      setTimestamp(new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
      setIsGenerating(false);
      setHasPassport(true);
      showToast(`Digital Battery Passport generated & cryptographically hashed for Batch ${selectedBatch}.`);
    }, 1500);
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
    setHasPassport(false);
    setHash('—');
    setTimestamp('—');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1">
        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3 mb-4">
          <Award className="w-8 h-8 text-blue-600"/> Batch-wise Battery Passport
        </h3>
        <p className="text-gray-500 mb-6">Generate a cryptographic digital twin for outbound Black Mass shipments to ensure strict EU Battery Directive compliance. The passport aggregates origin, process history, and purity data into a single hash.</p>

        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Select Processed Batch (Ready for Dispatch)</label>
          <select value={selectedBatch} onChange={handleBatchChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold">
            {readyBatches.map(b => <option key={b} value={b}>Batch: {b} - Black Mass</option>)}
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm text-gray-500 font-bold">Material Origin</span>
            <span className="text-sm text-gray-900 font-bold">India (Delhi Hub)</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm text-gray-500 font-bold">Carbon Footprint (Per kg)</span>
            <span className="text-sm text-emerald-600 font-bold">0.042 kg CO2e</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm text-gray-500 font-bold">Mint Date</span>
            <span className="text-sm text-gray-900 font-bold">{timestamp}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2 items-center">
            <span className="text-sm text-gray-500 font-bold">Live Cryptographic Hash ID</span>
            <span className={`text-sm font-mono font-bold transition-all px-2 py-0.5 rounded ${hasPassport ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}>
              {hash}
            </span>
          </div>
        </div>
        <button 
          onClick={generatePassport}
          disabled={isGenerating || hasPassport}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 transition-all w-full sm:w-auto"
        >
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <QrCode className="w-5 h-5"/>}
          {isGenerating ? 'Hashing Data...' : hasPassport ? 'Passport Generated ✅' : 'Generate New Passport'}
        </button>
      </div>
      <div className={`w-full md:w-72 h-72 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col items-center justify-center shadow-inner transition-opacity duration-500 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
        {hasPassport ? (
          <>
            <QrCode className="w-40 h-40 text-gray-900 mb-4" />
            <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">✅ Verified Twin</span>
          </>
        ) : (
           <div className="text-center text-gray-400 flex flex-col items-center">
              <QrCode className="w-16 h-16 mb-2 opacity-30" />
              <span className="text-xs font-bold uppercase">No Passport Minted</span>
           </div>
        )}
      </div>
    </div>
  );
}

function ComplianceTab({ showToast }) {
  const [selectedMonth, setSelectedMonth] = useState('October');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [dataStatus, setDataStatus] = useState('available');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = ['2025', '2026'];

  const logs = [
    { user: 'Dheeraj R.', action: 'Generated Monthly Yield Report', time: 'Oct 24, 10:15 AM' },
    { user: 'System', action: 'Auto-flagged anomaly in Batch B-7482', time: 'Oct 23, 14:30 PM' },
    { user: 'Vishwas M.', action: 'Exported Inventory Ledger (Excel)', time: 'Oct 22, 09:00 AM' },
  ];

  const verifyData = (month, year) => {
    setDataStatus('checking');
    setTimeout(() => {
      if (year === '2026' && ['September', 'October'].includes(month)) {
        setDataStatus('available');
        showToast(`Ledger data verified for ${month} ${year}.`, 'success');
      } else {
        setDataStatus('none');
        showToast(`No structured data found for ${month} ${year}.`, 'error');
      }
    }, 800);
  };

  const handleMonthChange = (e) => {
    const val = e.target.value;
    setSelectedMonth(val);
    verifyData(val, selectedYear);
  };

  const handleYearChange = (e) => {
    const val = e.target.value;
    setSelectedYear(val);
    verifyData(selectedMonth, val);
  };

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast(`Compliance PDF for ${selectedMonth} ${selectedYear} downloaded successfully.`);
    }, 1500);
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast(`Full CSV Ledger export completed.`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Report Period Selection</h3>
          <p className="text-sm text-gray-500">Select month/year to verify data availability before generation.</p>
        </div>
        <div className="flex gap-3 items-center">
          <select value={selectedMonth} onChange={handleMonthChange} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:border-emerald-500">
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={selectedYear} onChange={handleYearChange} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:border-emerald-500">
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <div className="w-32 flex justify-end">
            {dataStatus === 'checking' && <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin"/> Verifying...</span>}
            {dataStatus === 'available' && <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Data Verified</span>}
            {dataStatus === 'none' && <span className="text-xs font-bold text-red-500 flex items-center gap-1"><XCircle className="w-3 h-3"/> No Data</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="p-2 bg-red-50 border border-red-100 rounded-lg"><FileText className="w-4 h-4 text-red-600"/></div>
             PDF Reports
          </h3>
          <p className="text-gray-500 text-sm mb-6">Auto-generated monthly compliance, yield, and incident reports.</p>
          <button 
            onClick={handleGeneratePDF}
            disabled={dataStatus !== 'available' || isGenerating}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-bold rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:hover:bg-white"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin"/> : <Download className="w-4 h-4"/>} 
            {isGenerating ? 'Generating...' : `Generate ${selectedMonth} PDF`}
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg"><Database className="w-4 h-4 text-emerald-600"/></div>
             Excel Export
          </h3>
          <p className="text-gray-500 text-sm mb-6">Raw data extract for internal auditing and accounting.</p>
          <button 
            onClick={handleExportCSV}
            disabled={dataStatus !== 'available' || isExporting}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:hover:bg-gray-900"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Download className="w-4 h-4"/>} 
            {isExporting ? 'Exporting...' : 'Export Full CSV Ledger'}
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <History className="w-5 h-5 text-gray-500"/> System Audit Log
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-50 border-y border-gray-200 text-gray-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3 font-bold">Time</th>
                <th className="px-4 py-3 font-bold">User</th>
                <th className="px-4 py-3 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-[10px] text-gray-500 whitespace-nowrap">{log.time}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap">{log.user}</td>
                  <td className="px-4 py-3 text-xs">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OptimizeTab({ temp, setTemp, pressure, setPressure }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3"><div className="bg-purple-50 border border-purple-100 p-2.5 rounded-xl"><SlidersHorizontal className="w-5 h-5 text-purple-600"/></div> Process Simulator</h3>
        <p className="text-sm text-gray-500 mb-10 font-medium">Adjust parameters to see historical yield outcomes.</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between mb-4"><label className="text-sm font-bold text-gray-600 uppercase">Temperature (°C)</label><span className="font-mono text-purple-700 font-bold bg-white px-2 py-1 rounded border border-gray-200">{temp}°C</span></div>
              <input type="range" min="500" max="900" value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between mb-4"><label className="text-sm font-bold text-gray-600 uppercase">Pressure (atm)</label><span className="font-mono text-purple-700 font-bold bg-white px-2 py-1 rounded border border-gray-200">{pressure} atm</span></div>
              <input type="range" min="1.0" max="5.0" step="0.1" value={pressure} onChange={(e) => setPressure(Number(e.target.value))} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center shadow-sm">
            <div className="text-xs text-gray-500 font-bold uppercase mb-4">Expected Yield</div>
            <div className="text-6xl font-black text-gray-900 font-mono">{Math.min(98.5, Math.max(40, (temp / 10) + (pressure * 5) - 10)).toFixed(1)}<span className="text-3xl text-purple-600">%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NetworkTab() {
  const [networkAvg, setNetworkAvg] = useState(84.5);

  useEffect(() => {
    const int = setInterval(() => setNetworkAvg(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1)), 3000);
    return () => clearInterval(int);
  }, []);

  const data = { plantBenchmark: [{ plant: 'Delhi', yield: 86.1 }, { plant: 'Mumbai', yield: 82.4 }] };
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3"><div className="bg-pink-50 p-2.5 border border-pink-100 rounded-xl"><Network className="w-4 h-4 text-pink-600"/></div> Internal Benchmark</h3>
        <span className="text-[10px] font-bold uppercase bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-gray-600 transition-all">Network Avg: {networkAvg}%</span>
      </div>
      <div className="h-64 flex items-end justify-around gap-6 px-4 relative">
        <div className="absolute w-full border-t border-dashed border-pink-500 transition-all duration-1000 z-20" style={{ bottom: `${networkAvg}%` }}>
           <span className="absolute -top-5 right-0 text-xs font-bold text-pink-600">AVG</span>
        </div>
        {data.plantBenchmark.map((p, i) => (
          <div key={i} className="relative w-full max-w-[120px] flex flex-col items-center justify-end h-full group/bar z-10">
            <div className="text-sm font-mono font-bold text-gray-900 mb-2">{p.yield}%</div>
            <div className="w-full rounded-t bg-pink-500 hover:bg-pink-400 transition-colors" style={{ height: `${p.yield}%` }}></div>
            <div className="text-xs text-gray-500 mt-4 font-bold text-center uppercase">{p.plant}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchTab({ showToast }) {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [incidentText, setIncidentText] = useState('');
  const [incidentSaving, setIncidentSaving] = useState(false);
  const [recentIncidents, setRecentIncidents] = useState([
    { id: 1, issue_type: 'Temp Drop in Stage 2', severity: 'high', notes: 'Reactor 4 lost pressure. Validating gaskets.', created_at: '10 mins ago' },
  ]);

  const handleAsk = () => {
    if (!query.trim()) return;
    setLoading(true); setAnswer('');

    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let mockAnswer = "I couldn't find an exact answer in the data. Please rephrase or upload more batch CSV files.";

      if (lowerQuery.includes('supplier') || lowerQuery.includes('best yield')) {
        mockAnswer = "Based on the latest data ingest, **Apex Recyclers** has the highest average yield across the network at **88.5%**. However, they also have a slightly higher margin of temperature-related anomalies compared to Global Scrap Co.";
      } else if (lowerQuery.includes('incident') || lowerQuery.includes('failure')) {
        mockAnswer = "There are currently 2 active high-severity incidents. The most frequent failure pattern this week is **'Temp Drop in Stage 2'**, accounting for 40% of downtime in the Delhi Hub.";
      } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
        mockAnswer = "Hello! I am your YieldPe Intelligence Assistant. Ask me to analyze batch anomalies, summarize incident reports, or compare supplier yields based on your uploaded CSV data.";
      }

      setAnswer(mockAnswer);
      setLoading(false);
    }, 1500);
  };

  const handleSaveIncident = () => {
    if (!incidentText.trim()) return;
    setIncidentSaving(true);
    setTimeout(() => {
      setRecentIncidents([{ id: Date.now(), issue_type: 'Manual Entry', severity: 'medium', notes: incidentText, created_at: 'Just now' }, ...recentIncidents]);
      setIncidentText(''); setIncidentSaving(false);
      showToast('Incident manually logged and saved to the ledger.', 'success');
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-cyan-50 border border-cyan-100 p-3 rounded-xl"><Search className="w-5 h-5 text-cyan-600" /></div>
          <div>
            <h3 className="text-gray-900 text-xl font-bold tracking-tight">Ask Your Plant</h3>
            <p className="text-xs font-mono text-cyan-600 mt-1 flex items-center font-semibold"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>RAG Intelligence Online</p>
          </div>
        </div>
        <div className="flex gap-3 mb-6">
          <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAsk(); }} placeholder="e.g. Which supplier has the best yield?" className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm shadow-sm" />
          <button onClick={handleAsk} disabled={loading || !query.trim()} className="px-6 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 disabled:opacity-50 shadow-sm transition-all">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 min-h-[260px] whitespace-pre-wrap text-sm text-gray-700 font-medium">
          {loading ? (
             <div className="flex space-x-2 items-center h-full text-cyan-600">
               <div className="w-2 h-2 bg-cyan-500/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
               <div className="w-2 h-2 bg-cyan-500/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
               <div className="w-2 h-2 bg-cyan-500/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
          ) : (answer || 'Upload plant files in the operations tab, then ask grounded questions about batches, suppliers, incidents, and performance metrics.')}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6"><div className="bg-amber-50 border border-amber-100 p-2.5 rounded-xl"><AlertTriangle className="w-4 h-4 text-amber-600" /></div><h3 className="text-gray-900 text-lg font-bold tracking-tight">Capture Incident</h3></div>
          <textarea value={incidentText} onChange={(e) => setIncidentText(e.target.value)} placeholder="Write a quick incident note for the ledger..." className="w-full min-h-[100px] bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none resize-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-sm" />
          <button onClick={handleSaveIncident} disabled={incidentSaving || !incidentText.trim()} className="mt-4 w-full py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold hover:bg-amber-100 disabled:opacity-50 transition-all text-sm">{incidentSaving ? 'Saving...' : 'Save Incident'}</button>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col h-[340px]">
          <h3 className="text-gray-900 text-lg font-bold mb-5 tracking-tight">Recent Logs</h3>
          <div className="space-y-3 overflow-y-auto pr-2 no-scrollbar flex-1">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                <div className="flex justify-between mb-2"><div className="text-sm font-bold text-gray-900">{incident.issue_type}</div><div className="text-[9px] uppercase font-bold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">{incident.severity}</div></div>
                <div className="text-xs text-gray-600 mb-3">{incident.notes}</div>
                <div className="text-[10px] font-mono text-gray-400 font-medium">{incident.created_at}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
