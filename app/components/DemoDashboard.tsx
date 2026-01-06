'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Activity, Shield, ChevronDown, ChevronUp, CheckCircle, ArrowRight } from 'lucide-react';
import { 
  EMOTION_DATA, WEEKLY_EMOTION_DATA, MONTHLY_EMOTION_DATA,
  DAILY_FINDINGS, WEEKLY_FINDINGS, MONTHLY_FINDINGS,
  SUGGESTION, TOPIC_DATA, TOPIC_COLORS,
  CONVERSATIONS, WEEKLY_CONVERSATIONS, MONTHLY_CONVERSATIONS
} from '../data/mock-report-data';

export type ReportPeriod = 'daily' | 'weekly' | 'monthly';

export default function DemoDashboard() {
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>('daily');
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  
  const [currentEmotionData, setCurrentEmotionData] = useState(EMOTION_DATA);
  const [currentFindings, setCurrentFindings] = useState(DAILY_FINDINGS);
  const [currentConversations, setCurrentConversations] = useState(CONVERSATIONS);

  const handlePeriodChange = async (period: ReportPeriod) => {
    if (period === reportPeriod) return;
    setIsLoadingReport(true);
    setReportPeriod(period);

    // Simulate network request delay (800-1200ms)
    const delay = Math.floor(Math.random() * 400) + 800;
    await new Promise(resolve => setTimeout(resolve, delay));

    switch (period) {
      case 'daily':
        setCurrentEmotionData(EMOTION_DATA);
        setCurrentFindings(DAILY_FINDINGS);
        setCurrentConversations(CONVERSATIONS);
        break;
      case 'weekly':
        setCurrentEmotionData(WEEKLY_EMOTION_DATA);
        setCurrentFindings(WEEKLY_FINDINGS);
        setCurrentConversations(WEEKLY_CONVERSATIONS);
        break;
      case 'monthly':
        setCurrentEmotionData(MONTHLY_EMOTION_DATA);
        setCurrentFindings(MONTHLY_FINDINGS);
        setCurrentConversations(MONTHLY_CONVERSATIONS);
        break;
    }
    setIsLoadingReport(false);
  };

  const positiveCount = currentEmotionData.filter((d) => d.value >= 80).length;
  const neutralCount = currentEmotionData.filter((d) => d.value >= 60 && d.value < 80).length;
  const negativeCount = currentEmotionData.filter((d) => d.value < 60).length;

  const topicData = useMemo(() => {
    let safety = 0;
    let emotion = 0;
    let daily = 0;

    currentConversations.forEach(c => {
      if (['健康', '安危', '體檢', '感冒', '就醫', '滑倒', '血壓'].includes(c.topic)) {
        safety++;
      } else if (['情緒', '心情', '放鬆', '學習'].includes(c.topic)) {
        emotion++;
      } else {
        daily++;
      }
    });

    if (safety + emotion + daily === 0) return TOPIC_DATA;

    return [
      { name: '情緒變化', value: emotion },
      { name: '日常主題', value: daily },
      { name: '安全提醒', value: safety },
    ];
  }, [currentConversations]);

  const exportConversationsToCSV = () => {
    const headers = ['時間戳記','主題分類','對話摘要','關鍵字標籤'];
    const rows = currentConversations.map(c => [c.ts, c.topic, c.summary.length > 50 ? c.summary.slice(0,50) + '…' : c.summary, c.tags.join('|')]);
    const csv = [headers, ...rows].map(r => r.map(s => `"${String(s).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversations_${reportPeriod}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-border-subtle">
      {/* Dashboard Header */}
      <div className="bg-brand-primary p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-bold">陳媽媽的{reportPeriod === 'daily' ? '今日' : reportPeriod === 'weekly' ? '本週' : '本月'}關懷日報</h3>
          <p className="text-sm opacity-90">
            {reportPeriod === 'daily' ? '2026年1月6日 • 晴天' : 
             reportPeriod === 'weekly' ? '2026年1月5日 - 1月11日' : 
             '2026年1月'}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/10 p-1 rounded-full">
          {(['daily', 'weekly', 'monthly'] as ReportPeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodChange(period)}
              disabled={isLoadingReport}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${reportPeriod === period 
                  ? 'bg-white text-brand-primary shadow-sm' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'}
                ${isLoadingReport ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {period === 'daily' ? '日報' : period === 'weekly' ? '週報' : '月報'}
            </button>
          ))}
        </div>
      </div>

      <div className={`p-6 md:p-8 space-y-8 transition-opacity duration-300 relative ${isLoadingReport ? 'min-h-[600px]' : ''}`}>
        {isLoadingReport && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/50 backdrop-blur-sm">
            <div className="bg-surface-container/90 px-6 py-4 rounded-2xl shadow-lg flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-brand-primary font-medium text-sm animate-pulse">正在生成{reportPeriod === 'daily' ? '日' : reportPeriod === 'weekly' ? '週' : '月'}報數據...</p>
            </div>
          </div>
        )}

        {/* Emotion Chart */}
        <div className="bg-bg-primary p-6 rounded-2xl border border-border-subtle">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="text-brand-primary" />
            {reportPeriod === 'daily' ? '今日' : reportPeriod === 'weekly' ? '本週' : '本月'}情緒波動
          </h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentEmotionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E0EC" />
                <XAxis dataKey="time" stroke="#79747E" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#79747E" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6750A4" 
                  strokeWidth={3} 
                  dot={{ fill: '#6750A4', strokeWidth: 2 }} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Findings & Suggestions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-container p-6 rounded-2xl">
            <h4 className="text-lg font-semibold mb-4 text-brand-primary flex items-center gap-2">
              <Shield className="w-5 h-5" />
              貼心建議
            </h4>
            <p className="text-text-primary mb-4 italic">
              &ldquo;{SUGGESTION.text}&rdquo;
            </p>
            <button className="w-full py-2 bg-brand-primary/10 text-brand-primary rounded-lg text-sm font-medium hover:bg-brand-primary/20 transition-colors">
              加入行事曆提醒
            </button>
          </div>
          
          <div className="bg-bg-primary p-6 rounded-2xl border border-border-subtle">
            <h4 className="text-lg font-semibold mb-4 text-brand-primary">分析摘要</h4>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 rounded-xl bg-state-success/10">
                <div className="text-2xl font-bold text-state-success">{positiveCount}</div>
                <div className="text-xs text-text-secondary">正向表達</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-brand-primary/10">
                <div className="text-2xl font-bold text-brand-primary">{neutralCount}</div>
                <div className="text-xs text-text-secondary">中性表達</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-state-error/10">
                <div className="text-2xl font-bold text-state-error">{negativeCount}</div>
                <div className="text-xs text-text-secondary">負向表達</div>
              </div>
            </div>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={topicData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70}>
                    {topicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TOPIC_COLORS[index % TOPIC_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-container/30 p-6 rounded-2xl">
          <h4 className="text-lg font-semibold mb-4 text-brand-primary">今日溫馨發現</h4>
          <ul className="space-y-4 mb-8">
            {currentFindings.map((item) => (
              <li key={item.id} className="flex gap-3 items-start">
                <span className="mt-1">{item.icon}</span>
                <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold mb-4 text-brand-primary pt-6 border-t border-border-strong/20">對話詳細</h4>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brand-primary/10">
                  <th className="p-2 text-left text-sm">時間戳記</th>
                  <th className="p-2 text-left text-sm">主題分類</th>
                  <th className="p-2 text-left text-sm">對話摘要</th>
                  <th className="p-2 text-left text-sm">關鍵字標籤</th>
                </tr>
              </thead>
              <tbody>
                {currentConversations.map((c, idx) => (
                  <tr key={idx} className="border-t border-border-subtle">
                    <td className="p-2 text-sm text-text-secondary">{c.ts}</td>
                    <td className="p-2 text-sm">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs">{c.topic}</span>
                    </td>
                    <td className="p-2 text-sm text-text-primary">
                      {c.summary.length > 50 ? c.summary.slice(0,50) + '…' : c.summary}
                    </td>
                    <td className="p-2 text-sm">
                      <div className="flex flex-wrap gap-2">
                        {c.tags.map((t, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-1 rounded-full bg-surface-variant text-text-secondary text-xs">{t}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={exportConversationsToCSV} className="w-full py-2 bg-brand-primary/10 text-brand-primary rounded-lg text-sm font-medium hover:bg-brand-primary/20 transition-colors">
            匯出CSV
          </button>
        </div>
      </div>
      
      {/* Demo Footer */}
      <div className="bg-bg-secondary p-4 text-center text-text-muted text-sm">
        * 此為範例展示，實際內容將根據長輩真實對話生成
      </div>
    </div>
  );
}
