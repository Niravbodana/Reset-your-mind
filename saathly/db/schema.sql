-- RIZN Phase H — Postgres schema (Supabase)
-- Run in Supabase SQL editor when ready for production.

create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  language text default 'hinglish',
  timezone text default 'Asia/Kolkata',
  created_at timestamptz default now()
);

create table if not exists profiles (
  user_id uuid primary key references users(id) on delete cascade,
  areas text[] default '{}',
  wake_hour int default 9,
  sleep_hour int default 21,
  soft_mode boolean default false,
  plan text default 'personal',
  sub_status text default 'trial',
  trial_ends_at timestamptz,
  referral_code text unique,
  referred_by text,
  streak int default 0,
  best_streak int default 0,
  last_active_date date
);

create table if not exists family_members (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references users(id) on delete cascade,
  name text not null,
  email text,
  areas text[] default '{}',
  created_at timestamptz default now()
);

create table if not exists message_templates (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  mood text,
  time_bucket text,
  locale text default 'hinglish',
  body text not null,
  micro_action text,
  active boolean default true
);

create table if not exists scheduled_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  send_at timestamptz not null,
  status text default 'pending',
  payload jsonb not null,
  created_at timestamptz default now()
);

create table if not exists message_events (
  id uuid primary key default gen_random_uuid(),
  message_id uuid references scheduled_messages(id) on delete cascade,
  event text not null,
  at timestamptz default now()
);

create table if not exists mood_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  score int not null,
  note text,
  at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  provider text default 'razorpay',
  provider_sub_id text,
  plan text not null,
  status text not null,
  renew_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists referrals (
  code text primary key,
  inviter_id uuid references users(id),
  invitee_id uuid references users(id),
  reward_status text default 'pending',
  created_at timestamptz default now()
);

-- Enable RLS in production and add policies per user_id = auth.uid()
