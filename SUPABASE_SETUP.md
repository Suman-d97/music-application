# 🔧 Supabase Setup Guide

## ⚠️ CRITICAL ISSUE FOUND

Your `.env.local` file is **missing the Supabase Anon Key**! This is why you're getting the 500 error.

### Current `.env.local` content:
```
NEXT_PUBLIC_SUPABASE_URL=https://atxylaotrgrexkrqqvzj.supabase.co
```

### What's missing:
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 📝 How to Fix

### Step 1: Get your Supabase Anon Key

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on **Settings** (gear icon) in the sidebar
4. Click on **API**
5. Copy the **anon public** key

### Step 2: Update your `.env.local` file

Add this line to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://atxylaotrgrexkrqqvzj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-your-key-here
```

### Step 3: Restart your dev server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

---

## 🗄️ Database Setup

### Create the `profiles` table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );
```

---

## ✅ How the SignUp Works Now

The new `SignUpForm.tsx` does the following:

1. **Creates user in Supabase Auth** with email and password
2. **Saves user data to `profiles` table** with:
   - `id` (user's auth ID)
   - `full_name` (from the form)
   - `email` (from the form)
   - `created_at` (timestamp)
3. **Shows success/error messages** to the user
4. **Opens email verification dialog** after successful signup

---

## 🎯 Next Steps

1. ✅ Add the missing `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`
2. ✅ Run the SQL to create the `profiles` table
3. ✅ Restart your dev server
4. ✅ Try signing up with a new email

After these steps, your signup should work perfectly!
