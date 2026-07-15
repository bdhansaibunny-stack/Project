# Startup Navigator - README

## 🚀 Overview

Startup Navigator is a comprehensive, AI-powered web application designed to help entrepreneurs navigate the complexities of building and growing successful startups. The platform provides intelligent search capabilities, curated resources, expert articles, and an admin dashboard for content management.

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- Next.js 14 (React 18 + TypeScript)
- Tailwind CSS for styling
- Lucide React for icons
- NextAuth.js for authentication
- Recharts for analytics visualization

**Backend:**
- Next.js API Routes (serverless)
- MongoDB for data persistence
- OpenAI GPT-4 API for AI capabilities
- NextAuth.js for session management

**Deployment:**
- Vercel (recommended)
- Environment: Node.js 18+

### Project Structure

```
src/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Authentication pages (login, register)
│   ├── (main)/            # Public pages (home, explore, search, resources)
│   ├── admin/             # Admin dashboard & management
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout with providers
├── components/            # React components
├── lib/                   # Utilities & configurations
├── models/                # MongoDB schemas
├── styles/                # Global styles
└── types/                 # TypeScript types
```

## 🔐 AI Integration (RAG Architecture)

The application uses **Retrieval-Augmented Generation (RAG)** for intelligent search:

1. **Retrieval Phase**: User query searches MongoDB for relevant articles
2. **Augmentation Phase**: Combines user query with article content as context
3. **Generation Phase**: Sends to OpenAI GPT-4 API for response generation
4. **Enhancement Phase**: Adds source citations and formats the response

### AI Prompts Used

**System Prompt:**
```
You are an expert startup advisor with deep knowledge of:
- Company registration and legal structure
- Funding and venture capital
- Hiring and team building
- Marketing and branding
- Taxation and compliance
- Business growth strategies
- AI tools and automation

Provide practical, actionable advice based on the provided context.
Always cite your sources from the provided articles.
Keep responses concise but comprehensive (200-300 words).
```

## 📋 Features

### Public Features
- ✅ Home page with hero section and featured topics
- ✅ Topic exploration with category filtering
- ✅ AI-powered search (requires login)
- ✅ Resource library with filtering
- ✅ About page
- ✅ Contact form
- ✅ User authentication (register/login)

### Admin Features
- ✅ Dashboard with real-time analytics
- ✅ Article management (CRUD operations)
- ✅ Resource management
- ✅ User management interface
- ✅ Search analytics & trends
- ✅ Top queries visualization

## 🔑 Authentication

### Demo Credentials
```
Email: admin@startup.com
Password: admin123
```

### User Roles
- **User**: Can view articles, use AI search, access resources
- **Admin**: Full access to dashboard, article/resource management, analytics

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier available)
- OpenAI API key (GPT-4 access)
- Vercel account (for deployment)

### Local Development

1. **Clone Repository**
   ```bash
   git clone https://github.com/bdhansaibunny-stack/Project.git
   cd Project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure `.env.local`**
   ```
   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/startup-navigator

   # NextAuth
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000

   # OpenAI
   OPENAI_API_KEY=sk-...

   # Node Environment
   NODE_ENV=development
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Visit: http://localhost:3000

6. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 🚀 Deployment to Vercel

### Step-by-Step Guide

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Initial project setup"
   git push origin develop
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add all variables from `.env.example`:
     - `MONGODB_URI`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL` (use your Vercel domain)
     - `OPENAI_API_KEY`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live! 🎉

### Environment Variables for Vercel
```
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=generate-random-string
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
OPENAI_API_KEY=sk-...
```

## 📊 Database Setup

### MongoDB Atlas Setup

1. Create account at [mongodb.com](https://www.mongodb.com)
2. Create a new cluster (free tier)
3. Create database user with strong password
4. Whitelist your IP address
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster-name.mongodb.net/database-name
   ```

### Collections
- **users**: User accounts and roles
- **articles**: Blog posts and guides
- **resources**: External tools and links
- **searchhistories**: User search records

## 🔑 OpenAI API Setup

1. Create account at [openai.com](https://openai.com)
2. Generate API key from dashboard
3. Add to `.env.local` as `OPENAI_API_KEY`
4. Ensure GPT-4 access (paid tier)
5. Set up usage limits if desired

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly UI elements
- Optimized for all devices

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration flow
- [ ] User login/logout
- [ ] Admin dashboard access
- [ ] Article CRUD operations
- [ ] Resource filtering
- [ ] AI search functionality
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Loading states

## 🐛 Known Issues & Troubleshooting

### MongoDB Connection Issues
- Verify connection string is correct
- Check IP whitelist includes your IP
- Ensure user has proper permissions

### OpenAI API Errors
- Verify API key is valid
- Check account has sufficient credits
- Ensure GPT-4 model access is enabled
- Check rate limits haven't been exceeded

### NextAuth Issues
- Regenerate `NEXTAUTH_SECRET` if issues persist
- Verify `NEXTAUTH_URL` matches your domain
- Clear browser cookies if session issues occur

## 📈 Performance Optimization

- Server-side rendering for SEO
- Image optimization
- Code splitting and lazy loading
- API response caching
- Database indexing
- CDN distribution via Vercel

## 🔒 Security

- HTTPS encryption
- Password hashing with bcrypt
- CSRF protection
- Secure API authentication
- Environment variable protection
- XSS prevention
- Rate limiting (recommended)

## 📝 Customization

### Add New Categories
Edit `src/lib/utils.ts` and add to `categories` array:
```typescript
{ id: 'new-category', label: 'New Category', icon: '🎯' }
```

### Modify Color Scheme
Edit `tailwind.config.ts` and customize colors in theme.extend.colors

### Change AI Prompts
Edit `src/lib/openai.ts` and modify the system prompt in `generateAIResponse`

## 📞 Support

For issues or questions:
- Email: hello@startupnavigator.com
- GitHub Issues: [Create an issue](https://github.com/bdhansaibunny-stack/Project/issues)

## 📄 License

MIT License - feel free to use for personal and commercial projects

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- AI powered by [OpenAI](https://openai.com)
- Database by [MongoDB](https://www.mongodb.com)
- Deployed on [Vercel](https://vercel.com)

---

**Made with ❤️ for entrepreneurs**
