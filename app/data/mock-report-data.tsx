import { Heart, Activity, Shield } from 'lucide-react';

export const EMOTION_DATA = [
  { time: '08:00', value: 70, label: '起床' },
  { time: '10:00', value: 85, label: '晨間散步' },
  { time: '12:00', value: 75, label: '午餐' },
  { time: '14:00', value: 65, label: '午休' },
  { time: '16:00', value: 90, label: '與孫子視訊' },
  { time: '18:00', value: 80, label: '晚餐' },
  { time: '20:00', value: 75, label: '休息' },
];

export const WEEKLY_EMOTION_DATA = [
  { time: '週一', value: 72, label: '週一' },
  { time: '週二', value: 78, label: '週二' },
  { time: '週三', value: 65, label: '週三' },
  { time: '週四', value: 82, label: '週四' },
  { time: '週五', value: 88, label: '週五' },
  { time: '週六', value: 92, label: '週六' },
  { time: '週日', value: 85, label: '週日' },
];

export const MONTHLY_EMOTION_DATA = [
  { time: '1日', value: 70, label: '1日' },
  { time: '5日', value: 75, label: '5日' },
  { time: '10日', value: 68, label: '10日' },
  { time: '15日', value: 82, label: '15日' },
  { time: '20日', value: 78, label: '20日' },
  { time: '25日', value: 88, label: '25日' },
  { time: '30日', value: 85, label: '30日' },
];

export const DAILY_FINDINGS = [
  {
    id: 1,
    icon: <Heart className="w-5 h-5 text-state-success" />,
    text: "長輩今天兩次愉快地回憶起年輕時教書的日子，提及學生時語調輕快。",
  },
  {
    id: 2,
    icon: <Activity className="w-5 h-5 text-brand-primary" />,
    text: "下午與老友通話時情緒高漲，笑聲比平常多。",
  },
];

export const WEEKLY_FINDINGS = [
  {
    id: 1,
    icon: <Heart className="w-5 h-5 text-state-success" />,
    text: "本週整體情緒穩定，特別是在週五孫子來訪時達到高峰。",
  },
  {
    id: 2,
    icon: <Shield className="w-5 h-5 text-state-warning" />,
    text: "週三和週四睡眠時間略短，建議週末多補充休息。",
  },
];

export const MONTHLY_FINDINGS = [
  {
    id: 1,
    icon: <Activity className="w-5 h-5 text-brand-primary" />,
    text: "本月社交活動頻率提升 20%，與老友聚會次數明顯增加。",
  },
  {
    id: 2,
    icon: <Heart className="w-5 h-5 text-state-success" />,
    text: "月初的情緒低谷已在月中改善，整體呈現正向趨勢。",
  },
];

export const SUGGESTION = {
  text: "明天通話時，可嘗試問：'您當年最得意的學生是誰？'，這能延續今日的好心情。",
};

export const TOPIC_DATA = [
  { name: '情緒變化', value: 45 },
  { name: '日常主題', value: 35 },
  { name: '安全提醒', value: 20 },
];

export const TOPIC_COLORS = ['#6750A4', '#625B71', '#4CAF50'];

export const CONVERSATIONS = [
  { ts: '2026-01-06 08:12', topic: '健康', summary: '早上散步20分鐘，精神不錯', tags: ['散步','體力'] },
  { ts: '2026-01-06 10:45', topic: '家庭', summary: '提到孫子昨天畫畫得獎，很開心', tags: ['孫子','獎項'] },
  { ts: '2026-01-06 12:05', topic: '飲食', summary: '午餐胃口普通，想吃清淡些', tags: ['胃口','清淡'] },
  { ts: '2026-01-06 14:32', topic: '回憶', summary: '回憶年輕任教時的同事，語氣輕快', tags: ['教書','同事'] },
  { ts: '2026-01-06 16:18', topic: '社交', summary: '與老友通話約15分鐘，笑聲多', tags: ['通話','老友'] },
  { ts: '2026-01-06 18:27', topic: '健康', summary: '晚餐前量血壓偏高，提醒少鹽', tags: ['血壓','少鹽'] },
  { ts: '2026-01-06 19:40', topic: '安危', summary: '傍晚外出時有點滑倒，無大礙', tags: ['外出','滑倒'] },
  { ts: '2026-01-06 20:55', topic: '情緒', summary: '看電視劇時心情放鬆，表示不錯', tags: ['電視','放鬆'] },
];

export const WEEKLY_CONVERSATIONS = [
  { ts: '2026-01-05 09:00', topic: '健康', summary: '週一例行體檢，結果正常', tags: ['體檢','健康'] },
  { ts: '2026-01-06 10:45', topic: '家庭', summary: '提到孫子昨天畫畫得獎，很開心', tags: ['孫子','獎項'] },
  { ts: '2026-01-07 15:30', topic: '社交', summary: '參加社區歌唱班，心情愉悅', tags: ['歌唱','社區'] },
  { ts: '2026-01-08 19:00', topic: '飲食', summary: '嘗試新食譜，覺得味道不錯', tags: ['食譜','烹飪'] },
  { ts: '2026-01-09 14:00', topic: '情緒', summary: '觀看舊照片，有些感傷但平靜', tags: ['照片','回憶'] },
];

export const MONTHLY_CONVERSATIONS = [
  { ts: '2026-01-01 10:00', topic: '家庭', summary: '元旦全家聚餐，氣氛熱鬧', tags: ['元旦','聚餐'] },
  { ts: '2026-01-08 14:00', topic: '健康', summary: '感冒就醫，按時服藥中', tags: ['感冒','就醫'] },
  { ts: '2026-01-15 09:00', topic: '社交', summary: '老同事來訪，暢談往事', tags: ['同事','來訪'] },
  { ts: '2026-01-22 16:00', topic: '情緒', summary: '學習使用平板電腦，感到有成就感', tags: ['平板','學習'] },
  { ts: '2026-01-29 11:00', topic: '生活', summary: '整理花園，種植新花苗', tags: ['園藝','花園'] },
];
