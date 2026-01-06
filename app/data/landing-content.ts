import { AlertCircle, Clock, HeartOff, PhoneOff, MicOff, Activity } from 'lucide-react';

export type FearKey = 'loneliness' | 'forgetfulness' | 'silence' | 'accident';

export interface SolutionCard {
  title: string;
  robotAction: string;
  familyInsight: string;
  valueProp: string;
}

export interface FearOption {
  id: FearKey;
  text: string;
  icon: any; // Lucide icon component
}

export const FEAR_CARDS: FearOption[] = [
  {
    id: 'loneliness',
    text: "……他們感到孤獨沮喪，卻無人可以訴說。",
    icon: HeartOff
  },
  {
    id: 'forgetfulness',
    text: "……他們忘記關火、忘記吃藥，卻不敢告訴我。",
    icon: Clock
  },
  {
    id: 'silence',
    text: "……他們一整天都沒說幾句話，情緒低落。",
    icon: MicOff
  },
  {
    id: 'accident',
    text: "……他們跌倒或發生意外，無法及時求助。",
    icon: Activity
  }
];

export const SOLUTION_MAP: Record<FearKey, SolutionCard> = {
  loneliness: {
    title: "針對「孤獨無助」的守護",
    robotAction: "AI 會主動發起溫馨對話，引導長輩分享往事，並給予即時的情感支持回應。",
    familyInsight: "您將收到「今日心情摘要」，了解長輩今天聊了什麼、開不開心。",
    valueProp: "讓長輩隨時有人陪伴，不再孤單面對空蕩的房間。"
  },
  forgetfulness: {
    title: "針對「隱瞞遺忘」的守護",
    robotAction: "在閒聊中自然地確認用藥與關火情況：「李伯伯，剛剛那壺茶真香，爐子關了嗎？」",
    familyInsight: "每日報告包含「安全確認清單」，明確標示用藥與居家安全狀態。",
    valueProp: "用最不傷自尊的方式，守護長輩的居家安全與您的知情權。"
  },
  silence: {
    title: "針對「沈默退縮」的守護",
    robotAction: "偵測到長時間靜默時，主動播放喜歡的音樂或新聞話題，打破孤寂氛圍。",
    familyInsight: "圖表化呈現「每日互動頻率」與「活躍時段」，掌握長輩的社交活力。",
    valueProp: "主動破冰，讓家充滿聲音與生氣，預防認知能力退化。"
  },
  accident: {
    title: "針對「意外失聯」的守護",
    robotAction: "若長輩作息異常或長時間無反應，立即發起語音詢問確認狀態。",
    familyInsight: "緊急時刻立即推送「異常狀態警報」至您的手機，並提供當下環境錄音。",
    valueProp: "在您無法即時趕到的時刻，成為守護生命的最後一道防線。"
  }
};
