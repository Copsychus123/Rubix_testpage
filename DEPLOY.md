# Deployment Guide

## 1. Supabase Setup

1.  Go to [Supabase Dashboard](https://supabase.com/dashboard) and create a new project.
2.  Go to the **SQL Editor** in the left sidebar.
3.  Copy the content of `database/supabase_schema.sql` and run it to create the `leads` table and RLS policies.
4.  Go to **Project Settings** -> **API**.
5.  Copy the `Project URL` and `anon public` key.

## 2. Vercel Deployment

1.  Push this code to a GitHub/GitLab repository.
2.  Go to [Vercel Dashboard](https://vercel.com/dashboard) and "Add New Project".
3.  Import your repository.
4.  In the **Environment Variables** section, add:
    *   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
5.  Click **Deploy**.

## 3. Local Development

1.  Create a `.env.local` file in the root directory:
    ```
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```
2.  Run `npm run dev`.
3.  Open `http://localhost:3000`.
