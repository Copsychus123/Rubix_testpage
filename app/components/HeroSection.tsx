'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

export default function HeroSection({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="relative px-6 py-20 md:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-container/30 rounded-bl-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-state-warning/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-brand-primary text-sm font-medium mb-6">
            <Heart className="w-4 h-4 fill-current" />
            給父母最溫柔的 AI 陪伴
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary leading-[1.2] mb-6">
            即使不在身邊，<br />
            <span className="text-brand-primary">愛與關心</span> 也能隨時抵達。
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed max-w-lg">
            這不是監控，而是像朋友一樣的日常聊天。
            <br />讓 AI 替您陪長輩解悶，並將他們的平安與心情，化為每日最暖心的家書。
          </p>
          <button 
            onClick={onCtaClick}
            className="group bg-brand-primary text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            免費預約體驗
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-white p-6 rounded-[2rem] shadow-2xl border border-white/50">
            {/* Mock Chat Interface */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-xl">🤖</div>
                <div className="bg-bg-secondary p-4 rounded-2xl rounded-tl-none max-w-[85%] text-text-secondary text-sm">
                  陳媽媽早安！今天天氣很好耶，有打算去公園走走嗎？☀️
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-state-warning/20 flex items-center justify-center text-xl">👵</div>
                <div className="bg-brand-primary text-white p-4 rounded-2xl rounded-tr-none max-w-[85%] text-sm">
                  有啊，剛回來。今天遇到老李，聊了好久，真開心！
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-xl">🤖</div>
                <div className="bg-bg-secondary p-4 rounded-2xl rounded-tl-none max-w-[85%] text-text-secondary text-sm">
                  那太棒了！遇到老朋友一定很多話聊。記得多喝水喔，回來有量血壓嗎？
                </div>
              </div>
            </div>
            
            {/* Notification Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-border-subtle flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-state-success/10 flex items-center justify-center text-state-success">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="text-xs text-text-muted">家屬收到通知</div>
                <div className="text-sm font-bold text-text-primary">媽媽今天心情：愉快 😊</div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
