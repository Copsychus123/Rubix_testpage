-- Create the early_birds table
create table if not exists public.early_birds (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  interest text not null check (interest in ('情緒變化','日常生活主題','安全與健康提醒')),
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.early_birds enable row level security;

-- Create a policy that allows anyone to insert data (for the landing page form)
create policy "Enable insert for all users" on public.early_birds
  for insert with check (true);

-- Create a policy that only allows service_role to view data (protect user privacy)
create policy "Enable read for service role only" on public.early_birds
  for select using (auth.role() = 'service_role');
