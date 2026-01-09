create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  fears text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

drop policy if exists "Allow public insert to leads" on public.leads;
drop policy if exists "Enable insert for all users" on public.leads;
drop policy if exists "Enable read for service role only" on public.leads;

create policy "Enable insert for all users" on public.leads
  for insert
  with check (true);

create policy "Enable read for service role only" on public.leads
  for select
  using (auth.role() = 'service_role');
