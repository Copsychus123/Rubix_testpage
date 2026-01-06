-- Create leads table
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  name text,
  fears text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.leads enable row level security;

-- Policy for inserting leads (public access)
create policy "Allow public insert to leads"
on public.leads
for insert
to anon
with check (true);
