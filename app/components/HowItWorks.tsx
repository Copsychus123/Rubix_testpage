'use client';

import { motion } from 'framer-motion';
import { Smartphone, MessageCircle, FileText } from 'lucide-react';

const STEPS = [
  {
    icon: Smartphone,
    title: "無感連結",
    desc: "不需穿戴裝置，不需安裝複雜 App。\n就像用 LINE 一樣自然簡單。"
  },
  {
    icon: MessageCircle,
    title: "暖心陪伴",
    desc: "AI 像孫子一樣主動噓寒問暖，\n引導長輩分享生活點滴與心情。"
  },
  {
    icon: FileText,
    title: "安心日報",
    desc: "您將收到一份充滿故事的日報，\n看見長輩的笑容與平安。"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-bg-secondary overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            科技，是為了讓愛更靠近
          </h2>
          <p className="text-lg text-text-secondary">
            簡單三步驟，讓距離不再是關心的阻礙
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border-strong/30 -z-10" />

          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="text-center group"
            >
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform duration-300 border border-white">
                <step.icon className="w-10 h-10 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
