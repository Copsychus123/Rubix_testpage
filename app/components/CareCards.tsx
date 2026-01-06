'use client';

import { motion } from 'framer-motion';
import { FEAR_CARDS, FearKey } from '../data/landing-content';
import { Check } from 'lucide-react';

interface CareCardsProps {
  selectedFears: FearKey[];
  toggleFear: (id: FearKey) => void;
  onGenerate: () => void;
}

export default function CareCards({ selectedFears, toggleFear, onGenerate }: CareCardsProps) {
  return (
    <section className="py-20 px-6 bg-white" id="care-cards">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            我們懂您的牽掛
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            即使再忙，心裡總有幾個放不下的瞬間。<br/>
            選擇您最在意的場景，看看 AI 如何將擔憂化為安心。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {FEAR_CARDS.map((card, idx) => {
            const isSelected = selectedFears.includes(card.id);
            // Rotate each card slightly for a "sticky note" feel
            const rotation = idx % 2 === 0 ? -2 : 2; 
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                onClick={() => toggleFear(card.id)}
                className={`
                  cursor-pointer p-6 min-h-[240px] flex flex-col justify-between
                  shadow-md transition-all duration-300 relative
                  ${isSelected 
                    ? 'bg-brand-primary text-white shadow-xl -translate-y-2' 
                    : 'bg-[#FFFDF0] text-text-secondary hover:shadow-lg'}
                `}
                style={{ 
                  borderRadius: '2px 2px 20px 2px', // Sticky note shape
                  transform: isSelected ? 'rotate(0deg)' : `rotate(${rotation}deg)` 
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute top-3 right-3 bg-white text-brand-primary rounded-full p-1"
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                )}

                <div className={`mb-4 ${isSelected ? 'text-white' : 'text-brand-primary'}`}>
                  <card.icon className="w-8 h-8" />
                </div>
                
                <p className={`text-lg font-medium leading-relaxed ${isSelected ? 'text-white' : 'text-text-primary'}`}>
                  {card.text.replace('……', '')}
                </p>

                <div className={`text-sm mt-4 font-bold opacity-80 ${isSelected ? 'text-white' : 'text-brand-primary'}`}>
                  {isSelected ? '已選擇守護' : '點擊關注'}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={onGenerate}
            disabled={selectedFears.length === 0}
            className={`
              px-8 py-4 rounded-full text-lg font-bold transition-all duration-300
              ${selectedFears.length > 0 
                ? 'bg-text-primary text-white hover:bg-black hover:scale-105 shadow-lg' 
                : 'bg-surface-variant text-text-muted cursor-not-allowed'}
            `}
          >
            {selectedFears.length > 0 ? '生成我的專屬守護方案' : '請選擇至少一項以繼續'}
          </button>
        </div>
      </div>
    </section>
  );
}
