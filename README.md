# ⚡ SPARK GEN — AI Content Generator

SPARK GEN is an AI-powered content generation platform built with **Next.js and Google Gemini**. It helps users quickly create high-quality content for different use cases through a simple, responsive, and user-friendly interface.

The application includes user authentication, AI-powered content generation, content management, payments, and a personalized dashboard where users can manage their generated content.

## ✨ Features

- 🤖 **AI Content Generation** — Generate high-quality content using Google Gemini.
- 🔐 **User Authentication** — Secure user registration and authentication.
- 📝 **Multiple Content Types** — Generate different types of content based on the user's needs.
- 📚 **Content Management** — Create, view, and manage previously generated content.
- 📊 **Personalized Dashboard** — Manage generated content and access account-related information from one place.
- 💳 **Stripe Payments** — Integrated payment functionality for premium features/services.
- 📱 **Responsive Design** — Optimized for desktop, tablet, and mobile devices.
- ⚡ **Fast User Experience** — Built with Next.js for a smooth and performant application.

## 🛠️ Tech Stack

### Frontend

- **Next.js**
- **JavaScript**
- **React**
- **Tailwind CSS**

### Backend & Services

- **Supabase** — Authentication and database services
- **Google Gemini** — AI-powered content generation
- **Stripe** — Payment processing

## 📸 Project Overview

SPARK GEN provides a streamlined workflow for generating and managing AI-powered content:

1. Create an account or sign in.
2. Choose the type of content you want to generate.
3. Provide the required information or prompt.
4. Let Gemini generate the content.
5. Review and manage your generated content from the dashboard.
6. Use Stripe-powered payments for available premium functionality.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/AbobakerBashar/ai-content-generator.git
```

Navigate to the project:

```bash
cd ai-content-generator
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory and add your environment variables:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
NEXT_PUBLIC_SUPABASE_URL=YOUR_NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=YOUR_STRIPE_WEBHOOK_SECRET
NEXT_GOOGLE_CLIENT_ID=YOUR_NEXT_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET_ID=YOUR_GOOGLE_CLIENT_SECRET_ID
NEXT_PUBLIC_SITE_URL=YOUR_NEXT_PUBLIC_SITE_URL
```

> Add or remove environment variables according to the services configured in your project.

### Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 📁 Project Structure

A simplified structure of the project:

```text
ai-content-generator/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── auth/
│   └── ...
├── components/
├── lib/
├── public/
├── .env
├── package.json
└── README.md
```

The exact structure may vary depending on the current implementation.

## 🔑 Environment Variables

The application requires credentials for the external services it uses.

| Variable                             | Purpose                               |
| ------------------------------------ | ------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`               | Public URL of the application         |
| `NEXT_PUBLIC_SUPABASE_URL`           | Supabase project URL                  |
| `SUPABASE_SERVICE_ROLE_KEY`          | Supabase server-side service role key |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`      | Supabase public API key               |
| `GEMINI_API_KEY`                     | Google Gemini API access              |
| `STRIPE_SECRET_KEY`                  | Stripe server-side API access         |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe client-side API access         |
| `STRIPE_WEBHOOK_SECRET`              | Stripe webhook signature verification |
| `NEXT_GOOGLE_CLIENT_ID`              | Google OAuth client ID                |
| `GOOGLE_CLIENT_SECRET_ID`            | Google OAuth client secret            |

**Never commit your `.env` file or secret API keys to GitHub.**

## 🌐 Live Demo

**Live Application:**
https://ai-content-generator-ntfz.vercel.app

## 💻 Source Code

**GitHub Repository:**
https://github.com/AbobakerBashar/ai-content-generator

## 🎯 Project Goals

SPARK GEN was built to explore the development of a modern AI-powered SaaS application and to gain practical experience with:

- AI API integration
- Authentication
- Database management
- Payment integration
- Next.js application architecture
- Responsive UI development
- Managing user-generated content

## 🔮 Future Improvements

Potential improvements include:

- More AI content-generation templates
- AI-generated images
- Content editing and formatting tools
- Content export functionality
- Usage analytics
- Subscription plans
- Improved generation history
- More customization options

## 👨‍💻 Author

**Abobaker Yagoub Bashar**

Built as a full-stack AI-powered web application using modern web technologies.
