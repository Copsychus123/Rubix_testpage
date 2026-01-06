'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import dynamic from 'next/dynamic';
import { FEAR_CARDS, SOLUTION_MAP } from './data/landing-content';
import type { FearKey } from './data/landing-content';
import { Check, ArrowRight, Sparkles, Lock, ShieldCheck } from 'lucide-react';

import HeroSection from './components/HeroSection';
import CareCards from './components/CareCards';
import HowItWorks from './components/HowItWorks';
import SocialProof from './components/SocialProof';

const DemoDashboard = dynamic(() => import('./components/DemoDashboard'), { ssr: false });

// --- Supabase Client ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export default function LandingPage() {
  const [step, setStep] = useState<'landing' | 'generating' | 'solution'>('landing');
  const [selectedFears, setSelectedFears] = useState<FearKey[]>([]);

  const toggleFear = (id: FearKey) => {
    setSelectedFears(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (selectedFears.length === 0) return;
    setStep('generating');
    setTimeout(() => {
      setStep('solution');
    }, 2500);
  };

  const scrollToCareCards = () => {
    document.getElementById('care-cards')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-bg-primary overflow-x-hidden">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: Main Landing (Hero -> Cards -> Social Proof) */}
        {step === 'landing' && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection onCtaClick={scrollToCareCards} />
            
            <CareCards 
              selectedFears={selectedFears}
              toggleFear={toggleFear}
              onGenerate={handleGenerate}
            />

            <HowItWorks />
            
            <SocialProof />
          </motion.div>
        )}

        {/* STEP 2: Generating Transition */}
        {step === 'generating' && (
          <motion.div 
            key="generating"
            className="fixed inset-0 flex flex-col items-center justify-center bg-bg-primary z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-64 h-2 bg-surface-variant rounded-full overflow-hidden mb-6 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-brand-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
            <motion.h2 
              className="text-2xl font-bold text-brand-primary mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              正在為您生成溫暖守護方案...
            </motion.h2>
            <p className="text-text-secondary">AI 正在分析最適合長輩的陪伴模式</p>
          </motion.div>
        )}

        {/* STEP 3: Solution & Demo */}
        {step === 'solution' && (
          <SolutionSection 
            key="solution"
            selectedFears={selectedFears}
          />
        )}

      </AnimatePresence>
    </main>
  );
}

// --- Solution Section Component ---
function SolutionSection({ selectedFears }: { selectedFears: FearKey[] }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    if (supabase) {
      const { error } = await supabase.from('leads').insert([{
        name: formData.name,
        email: formData.email,
        fears: selectedFears
      }]);
      if (error) console.error(error);
    } else {
      await new Promise(r => setTimeout(r, 1000));
    }
    setFormStatus('success');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-bg-primary pb-20"
    >
      {/* Header */}
      <div className="bg-brand-primary/5 border-b border-brand-primary/10 pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            專屬守護方案已生成
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            別擔心，我們這樣照顧
          </h2>
        </div>
      </div>

      {/* Solution Cards */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {selectedFears.map((fearId, idx) => {
          const solution = SOLUTION_MAP[fearId];
          const fear = FEAR_CARDS.find(f => f.id === fearId);
          
          return (
            <motion.div
              key={fearId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-border-subtle overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-surface-variant/30 p-4 border-b border-border-subtle flex items-start gap-3">
                <Lock className="w-5 h-5 text-text-secondary mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">您的牽掛</div>
                  <p className="text-text-primary italic">&quot;{fear?.text.replace('……', '')}&quot;</p>
                </div>
              </div>
              
              <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="text-sm font-bold text-brand-primary flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-xs">AI</span>
                    溫柔陪伴
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{solution.robotAction}</p>
                </div>

                <div className="space-y-3 md:border-l border-border-subtle md:pl-8">
                  <div className="text-sm font-bold text-brand-primary flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-xs">你</span>
                    您會知道
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{solution.familyInsight}</p>
                </div>

                <div className="space-y-3 md:border-l border-border-subtle md:pl-8 bg-brand-primary/5 -m-6 md:m-0 p-6 md:p-0 md:bg-transparent flex flex-col justify-center">
                  <div className="text-sm font-bold text-brand-primary flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    安心價值
                  </div>
                  <p className="text-text-primary font-medium text-sm">{solution.valueProp}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Demo Dashboard */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-3">除了針對性解方，您還擁有...</h3>
            <p className="text-text-secondary">一份每日更新、充滿溫度的長輩生活日報，讓愛不再缺席。</p>
          </div>
          <DemoDashboard />
        </motion.div>
      </div>

      {/* Conversion Form */}
      <div className="max-w-xl mx-auto px-6 mt-12 mb-20">
        <div className="bg-white rounded-3xl p-8 md:p-10 text-center shadow-xl border border-border-subtle">
          {formStatus === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="w-16 h-16 bg-state-success/10 text-state-success rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">預約成功！</h3>
              <p className="text-text-secondary mb-6">
                我們已記錄下您的需求。<br/>
                產品上線前，您將優先收到針對性的關懷指南。
              </p>
            </motion.div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                讓這份安心，早日到來
              </h3>
              <p className="text-text-secondary mb-8">
                留下聯絡方式，優先獲取您的專屬方案與上線通知。
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="您的稱呼"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-outline bg-bg-primary focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
                <input 
                  type="email" 
                  placeholder="電子信箱"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-outline bg-bg-primary focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
                <button 
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {formStatus === 'submitting' ? '提交中...' : '免費預約我的專屬方案'}
                  {!formStatus && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </>
          )}
        </div>
        <p className="text-center text-xs text-text-muted mt-6">
          我們尊重您的隱私，承諾不會發送垃圾郵件。
        </p>
      </div>
    </motion.div>
  );
}
