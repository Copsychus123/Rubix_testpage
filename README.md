# 智慧長照 AI 預售驗證頁 / Smart Elderly Care AI Pre‑sale Validation Page

## 概述 Overview
- 目標：以 3–5 天發布可用的單頁預售著陸頁，驗證商業與產品假設。
- 商業假設：家屬願為「掌握長輩現況」付費。
- 產品假設：以 Demo 呈現的「AI 關懷日報」能有效傳遞安心感。
- 目標使用者：對長輩有遠距關懷焦慮的家屬（首要）、小型照護機構。

Value Proposition
- “每天一杯咖啡的錢，換一份長輩現況的掌控與心安。”

Core Validation
- 讓使用者立即互動預覽核心產出（模擬日報），驅動提交高意圖的預售表單。

---

## 頁面需求 Page Requirements
- A. 價值宣導區（Above the Fold）
  - 主標題：直接命中焦慮，如「不再猜測父母今天過得好不好」。
  - 副標題：自然對話 → AI 分析 → 家屬摘要。
  - 行動按鈕：「免費產生您的範例關懷日報」（連結到 Demo 區）。
- B. 產品體驗 Demo 區（核心互動）
  - 點擊按鈕後展開模擬「家屬儀表板」。
  - 靜態資料展示：
    - 情緒曲線圖：顯示模擬長輩的一日情緒波動。
    - 今日溫馨發現：2–3 條 AI 生成的暖心摘要。
    - 貼心建議：1 條基於「發現」的關懷建議。
  - 設計關鍵：視覺與文案營造溫暖、專業、可信賴；避免冰冷的資料羅列。
- C. 轉化預約區（表單）
  - 文案：此服務預計 [月份] 上線，早鳥價每月 [金額]。立即預留名額。
  - Supabase 表單欄位：姓名、信箱、單選「最想了解長輩哪方面狀況？」
    - 選項：情緒變化 / 日常生活主題 / 安全與健康提醒
  - 提交提示：加入早鳥名單，贈《長輩溝通建議指南》。

---

## 技術規格 Tech Specs
- 框架：Next.js（App Router）+ TypeScript + Tailwind CSS
- 樣式：嚴格遵循 Material 3 設計令牌（色彩、圓角、字體）
- 互動：React 狀態控制 Demo 展開/收起；圖表使用 Recharts 渲染靜態資料
- 資料：所有 Demo 資料皆為前端 .ts 物件，無後端 API
- 資料庫：Supabase 僅一張表 early_birds 用於表單儲存
- 部署：Vercel，一鍵 Git 部署

Environment Variables
- NEXT_PUBLIC_SUPABASE_URL：Supabase 專案 URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY：Supabase 匿名金鑰

---

## 交付物 Deliverables
- 單一 page.tsx：包含整頁結構、互動邏輯與靜態資料
- 樣式配置：tailwind.config.js 與全域 CSS，完整映射 Material 3 設計令牌
- 資料庫腳本：建立 early_birds 資料表的 SQL
- 部署說明：Vercel 連線與 Supabase 環境變數設定步驟

---

## 建表 SQL Schema

```sql
create table if not exists public.early_birds (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  interest text not null check (interest in ('情緒變化','日常生活主題','安全與健康提醒')),
  created_at timestamptz not null default now()
);
```

如需啟用 RLS，請在 Supabase 控制台開啟 RLS 並依需求設定插入政策。

---

## 部署 Deploy to Vercel
- 建立 Git 倉庫並推送至 GitHub/GitLab
- 在 Vercel 新建專案，連結該倉庫
- 設定環境變數：
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
- 觸發部署並確認預覽網域可正常載入

---

## 開發指南 Development Guide
- 檔案：單一 app/page.tsx 實作 A/B/C 三區塊與互動
- 樣式：以 Tailwind 映射 Material 3 Token（色彩、字級、圓角、陰影）
- 圖表：以 Recharts 呈現靜態情緒曲線資料
- 表單：以 Supabase JS 客戶端直接寫入 early_birds
- 無後端：所有資料邏輯在前端完成

---

## English Summary
- Goal: Ship a one‑page pre‑sale landing in 3–5 days to validate business and product hypotheses.
- Value: “A cup of coffee per day for peace of mind about your loved ones.”
- Page: Above‑the‑fold value; interactive demo showing daily emotion curve, warm findings, and caring suggestions; conversion form connected to Supabase.
- Tech: Next.js App Router, TypeScript, Tailwind CSS, Recharts, Supabase (early_birds table), deploy on Vercel.
- Deliverables: Single page.tsx; Tailwind config + global CSS with Material 3 tokens; SQL schema; deployment steps.

