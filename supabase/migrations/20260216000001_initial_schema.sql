-- Create subscriptions table
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  cost decimal(10,2) not null check (cost >= 0),
  billing_cycle text not null check (billing_cycle in ('monthly', 'yearly')),
  renewal_date date not null,
  category text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_tier table for tracking free/pro status
create table public.user_tier (
  user_id uuid primary key references auth.users(id) on delete cascade,
  tier text default 'free' not null check (tier in ('free', 'pro')),
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_subscription_status text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.subscriptions enable row level security;
alter table public.user_tier enable row level security;

-- Create policies for subscriptions
create policy "Users can view their own subscriptions"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own subscriptions"
  on public.subscriptions
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own subscriptions"
  on public.subscriptions
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own subscriptions"
  on public.subscriptions
  for delete
  using (auth.uid() = user_id);

-- Create policies for user_tier
create policy "Users can view their own tier"
  on public.user_tier
  for select
  using (auth.uid() = user_id);

create policy "Users can update their own tier"
  on public.user_tier
  for update
  using (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

-- Create triggers for updated_at
create trigger set_subscriptions_updated_at
  before update on public.subscriptions
  for each row
  execute function public.handle_updated_at();

create trigger set_user_tier_updated_at
  before update on public.user_tier
  for each row
  execute function public.handle_updated_at();

-- Create function to automatically create user_tier entry when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_tier (user_id, tier)
  values (new.id, 'free');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Create index for better query performance
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_renewal_date on public.subscriptions(renewal_date);
create index idx_user_tier_user_id on public.user_tier(user_id);
