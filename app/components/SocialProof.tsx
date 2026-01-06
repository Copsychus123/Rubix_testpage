'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown, ChevronUp, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "林小姐",
    role: "台北上班族，媽媽在台南獨居",
    text: "以前每天打電話都像在查勤，媽媽也只會說『沒事、都好』。現在有了 AI 日報，我才知道原來她今天去了市場、遇到了老朋友。我們的對話話題變多了！",
    rating: 5
  },
  {
    name: "張先生",
    role: "科技業工程師",
    text: "最讓我安心的是『異常通報』功能。有次爸爸整天沒出門，AI 主動詢問才發現是不舒服。感謝這個服務讓我能即時反應。",
    rating: 5
  },
  {
    name: "王太太",
    role: "家庭主婦",
    text: "我真的很驚訝 AI 講話這麼有人情味！媽媽甚至會跟它分享年輕時的故事，還說它比孫子還有耐心聽她說話（笑）。",
    rating: 5
  }
];

const FAQS = [
  {
    q: "長輩不會用智慧型手機怎麼辦？",
    a: "請放心，璐比的設計初心就是『不用學就會用』，我們的服務基於硬體服務，不需要額外下載 App 或學習新操作。"
  },
  {
    q: "這會不會像是在監視長輩？",
    a: "絕對不會。我們的理念是『陪伴』而非監控。AI 是以聊天的形式互動，且會尊重長輩的隱私。您收到的日報是經過摘要的『心情與安全重點』，而非逐字稿。"
  },
  {
    q: "如果  長輩覺得 AI 很煩怎麼辦？",
    a: "AI 會根據長輩的回應頻率與情緒自動調整節奏。如果長輩想休息，AI 就不會打擾；如果長輩想聊天，AI 會隨時在線。"
  },
  {
    q: "對話的資料安全嗎？會不會外流？",
    a: "非常安全。我們採用銀行級加密技術，所有對話處理都經過『去識別化』，絕不會用於廣告或其他商業用途。"
  },
  // {
  //   q: "如果長輩覺得 AI 很煩，或是不想說話怎麼辦？",
  //   a: "璐比很『識相』的。它會從長輩的回應判斷今天是想要熱絡聊天，還是安靜陪伴。一切以長輩的意願為主，絕不強迫互動。"
  // },
  // 3. 核心價值與效果（為什麼需要？）
  {
    q: "AI陪伴真的能改善長輩的情緒嗎？還是只是噱頭？",
    a: "根據多國研究，感到孤獨的高齡者失智風險增加30-40%。璐比透過每日正向對話，能有效降低孤獨感，根據市場調查問卷，有76%使用者願意使用AI陪伴來改善長輩情緒。"
  },
  // {
  //   q: "璐比和其他聊天機器人或外籍看護有什麼不同？",
  //   a: "璐比專攻『情緒價值』，提供有溫度的陪伴。相較年約36萬聘請外籍看護，璐比更有優勢。相比普通聊天APP，我們有專為銀族設計的硬體與互動。"
  // },
  // // 4. 關鍵功能與安全感（實用性考量）
  // {
  //   q: "如果長輩有緊急狀況（如跌倒），AI能即時通知我嗎？",
  //   a: "璐比正在籌備具備緊急警示功能開發，當偵測到關鍵詞（如『跌倒』、『不舒服』、『哭泣聲』）或長時間無回應，會立即發送通知給指定家屬。"
  // },
  // {
  //   q: "你們如何確保AI對話自然，不會答非所問？",
  //   a: "我們的核心採用經數發部認可的Gemma3模型，並針對長輩的語言習慣進行深度改進。問卷顯示，52.2%使用者對AI自然對話陪聊感到滿意。"
  // },
  // // 5. 購買與後續（決策最後一步）
  {
    q: "你們的收費方式有哪些？政府有補助嗎？",
    a: "我們提供硬體租賃、加值訂閱服務 LTD 早期買斷。每月NT$490元起，相當於每天一杯飲料的費用，即可獲得24小時情緒關懷與知情守護"
  },
  {
    q: "我可以在哪裡體驗或試用你們的服務？",
    a: "我們正透過地方創生計畫在3-5間場域試點，並提供14天免費試用。您可加入官方帳號預約體驗，或關注社區講座活動。"
  }
];

export default function SocialProof() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">聽聽其他家屬怎麼說</h2>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-state-warning text-state-warning" />
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg-primary p-6 lg:p-8 rounded-2xl border border-border-subtle relative shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
                <div className="mb-4">
                  <Quote className="w-10 h-10 text-brand-primary/20 fill-current" />
                </div>
                <p className="text-text-secondary mb-6 leading-relaxed flex-grow">{item.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary">
                    {item.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-text-primary">{item.name}</div>
                    <div className="text-xs text-text-muted">{item.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">常見問題</h2>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-border-subtle rounded-xl overflow-hidden bg-bg-primary">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-variant/30 transition-colors"
                >
                  <span className="font-bold text-text-primary">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-text-secondary leading-relaxed border-t border-border-subtle/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
