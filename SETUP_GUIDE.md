# Music Application - Complete Setup Guide

## ✅ What's Been Done

1. **Environment Variables** - Your `.env.local` is now configured with:
   - Supabase URL
   - Supabase Anon Key
   - Base URL

2. **SignUp Form** - Created complete signup that:
   - Creates user in Supabase Authentication
   - Saves user data to `profiles` database table
   - Shows clear success/error messages
   - Handles email verification

## 🚨 FINAL STEP REQUIRED

You need to create the database tables in Supabase!

### How to Run the SQL Setup:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Setup Script**
   - Open the file `supabase-setup.sql` in this project
   - Copy ALL the SQL code
   - Paste it into the Supabase SQL Editor
   - Click "Run" (or press Ctrl+Enter)

4. **Verify Tables Were Created**
   - Go to "Table Editor" in the left sidebar
   - You should see:
     - `profiles` table
     - `albums` table  
     - `songs` table

## 🎯 After Running the SQL

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/signup

3. Try signing up with:
   - Full Name: Your Name
   - Email: your-email@example.com
   - Password: (at least 6 characters)
   - Confirm Password: (same as above)
   - Check the terms checkbox

4. Click "Sign up"

5. You should see:
   - ✅ Success message: "Account created successfully! Please check your email to verify."
   - 📧 Email verification dialog
   - User created in Supabase Auth
   - User data saved in `profiles` table

## 📊 What the Database Tables Do

### `profiles` Table
- Stores user profile information
- Automatically linked to Supabase Auth users
- Fields: id, full_name, email, avatar_url, created_at, updated_at

### `albums` Table  
- Stores music albums
- Fields: id, title, artist, cover_image, release_year, created_at

### `songs` Table
- Stores individual songs
- Linked to albums via album_id
- Fields: id, title, artist, album_id, song_url, image_url, duration, created_at

## 🔒 Security (RLS Policies)

All tables have Row Level Security enabled with policies:
- ✅ Everyone can view (SELECT)
- ✅ Authenticated users can create (INSERT)
- ✅ Users can only update/delete their own data

## 🎉 You're All Set!

Once you run the SQL script, your signup will work perfectly and save data to both:
1. Supabase Authentication (for login)
2. Profiles database table (for user data)
