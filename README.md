# 🪐 Orbit (Under Final Polishing)

> **Elevate Your Everyday Style. Premium Minimalist Clothing Essentials.**

🌍 **Live Demo:** [https://orbit-three-iota.vercel.app/](https://orbit-three-iota.vercel.app/)

Orbit is a modern, high-performance e-commerce platform built for a luxury clothing brand. Designed with a focus on minimalist aesthetics ("S-Rank UI") and seamless user experience, it handles everything from browsing collections to secure checkout, order management, and AI-driven customer feedback analysis.

## 🚀 Project Overview

This full-stack application leverages the latest Next.js 15 App Router capabilities. It features a completely custom-built admin dashboard, secure payment processing via Stripe, and an intelligent review summarization engine powered by Groq's Llama 3.1 model. 

## 🛠️ Technical Stack

**Frontend Architecture:**
* **Framework:** Next.js 15.5 (React 19)
* **Styling:** Tailwind CSS, `tw-animate-css`, `clsx`, `tailwind-merge`
* **UI Components:** Shadcn UI, Radix UI, Base UI, Lucide React, React Icons
* **Animations:** Framer Motion
* **State Management:** Zustand
* **Forms & Validation:** React Hook Form
* **Charts (Admin):** Recharts

**Backend & Database:**
* **Database:** MongoDB Atlas (native `mongodb` driver & `mongoose` ORM)
* **Authentication:** NextAuth v5 (Auth.js) - *Google OAuth & Credentials Provider*
* **Security & Hashing:** `bcryptjs`
* **Data Fetching:** Axios

**Third-Party Services:**
* **Payments:** Stripe (`@stripe/stripe-js`, `@stripe/react-stripe-js`) integrated with Webhooks.
* **AI Engine:** Groq SDK (Llama 3.1-8b)
* **Media Storage:** Cloudinary & Next-Cloudinary
* **Email Service:** Resend

## ✨ Core Features

* **Advanced E-Commerce Flow:** Full cart functionality, wishlists, and seamless order placement.
* **Intelligent AI Review Summaries:** Automatically generates a concise AI summary of product feedback using Groq SDK once a product reaches a threshold of 3+ reviews.
* **Secure Checkout System:** Integrated with Stripe Checkout and secured via Stripe Webhooks (`/api/webhooks/stripe`) to guarantee fulfillment only upon successful payment capture.
* **Robust Authentication:** Dual login system (Google & Custom Credentials) with rock-solid page-level role verification to strictly protect all `/admin` routes.
* **Admin Dashboard:** Comprehensive inventory, product, and order management system with data visualization.
* **Media Management:** Optimized image delivery and secure uploads via Cloudinary.

## 🔐 Security & Role Authorization

To ensure maximum stability and bypass Edge Runtime limitations, this project utilizes **Strict Page-Level Verification** rather than Next.js Middleware. Every protected route and admin layout explicitly verifies the user's session and role (`user.role === "admin"`) on the server before rendering, ensuring zero unauthorized access to the dashboard.

## ⚙️ Environment Variables

To run this project locally, create a `.env` file in the root directory and configure the following keys:

```env
# Authentication (NextAuth v5)
AUTH_URL=http://localhost:3000
AUTH_SECRET=your_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Database
MONGODB_URI=your_mongodb_atlas_connection_string

# Stripe Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Cloudinary Media
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# AI Engine
GROQ_API_KEY=your_groq_api_key

# Email Provider
RESEND_API_KEY=your_resend_api_key