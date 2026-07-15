# Startup Navigator - Architecture Documentation

## 🏗️ System Architecture

### Overview
Startup Navigator is a modern, AI-powered web application built with Next.js that helps entrepreneurs navigate startup challenges through intelligent search, curated resources, and an admin dashboard.

### Technology Stack

**Frontend**
- Next.js 14 (React 18) - SSR/SSG framework
- TypeScript - Type safety
- Tailwind CSS - Utility-first styling
- Lucide React - UI icons
- Chart.js - Analytics visualization

**Backend**
- Next.js API Routes - Serverless backend
- MongoDB - NoSQL database
- OpenAI GPT-4 - AI language model
- NextAuth.js - Authentication

**Deployment**
- Vercel - Hosting & CI/CD

---

## 📊 Data Models

### User Schema
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  password: String (hashed),
  role: 'user' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Article Schema
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,
  category: String,
  content: String,
  excerpt: String,
  author: String,
  tags: [String],
  readTime: Number,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Search History Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  query: String,
  results: Number,
  aiResponse: String,
  timestamp: Date
}
```

### Resource Schema
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  url: String,
  type: 'tool' | 'article' | 'course' | 'community',
  createdAt: Date
}
```

---

## 🔄 Request Flow

### User Search with AI
1. User enters query in AI Search page
2. Request → `/api/search` endpoint
3. Backend retrieves relevant articles from MongoDB
4. RAG (Retrieval-Augmented Generation) combines articles
5. Query + context sent to OpenAI API
6. AI response returned with source citations
7. Search logged to Search History
8. Response streamed to frontend

### Admin Article Management
1. Admin logs in → Dashboard
2. Create/Edit/Delete article
3. POST/PUT/DELETE → `/api/articles` endpoint
4. MongoDB updated
5. Frontend refreshed with new state

---

## 🗂️ Project Structure

```
src/
├── app/                      # Next.js 14 app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── (auth)/
│   │   ├── login/           # Login page
│   │   └── register/        # Registration page
│   ├── (main)/
│   │   ├── explore/         # Explore topics
│   │   ├── search/          # AI search
│   │   ├── resources/       # Resources library
│   │   ├── about/           # About page
│   │   └── contact/         # Contact form
│   ├── admin/
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── articles/        # Article management
│   │   └── users/           # User management
│   └── api/
│       ├── auth/            # NextAuth endpoints
│       ├── search/          # Search with AI
│       ├── articles/        # Article CRUD
│       ├── resources/       # Resource CRUD
│       └── analytics/       # Stats endpoint
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer
│   ├── Sidebar.tsx          # Admin sidebar
│   ├── ArticleCard.tsx      # Article card component
│   ├── SearchBox.tsx        # Search input
│   └── LoadingSpinner.tsx   # Loading state
├── lib/
│   ├── mongodb.ts           # MongoDB connection
│   ├── openai.ts            # OpenAI integration
│   ├── auth.ts              # NextAuth config
│   └── utils.ts             # Utility functions
├── models/
│   ├── User.ts              # User model
│   ├── Article.ts           # Article model
│   ├── SearchHistory.ts     # Search history model
│   └── Resource.ts          # Resource model
├── styles/
│   └── globals.css          # Global styles
└── types/
    └── index.ts             # TypeScript types
```

---

## 🔐 Authentication Flow

1. **Registration**: User submits email/password → hashed with bcrypt → stored in MongoDB
2. **Login**: Email + password validated → JWT token created → stored in session
3. **Protected Routes**: API routes check session middleware
4. **Admin Access**: Role-based access control on admin routes
5. **Logout**: Session cleared

---

## 🤖 AI Integration (RAG Architecture)

### Retrieval-Augmented Generation (RAG) Process

```
User Query
    ↓
1. Retrieval Phase
   - Query vector search in MongoDB
   - Return top 5 relevant articles
   - Extract article content
    ↓
2. Augmentation Phase
   - Combine user query + article context
   - Create system prompt with startup expertise
    ↓
3. Generation Phase
   - Send to OpenAI GPT-4 API
   - Generate contextual response
    ↓
4. Response Enhancement
   - Add source citations
   - Format with markdown
    ↓
Return to User with Sources
```

### Prompts Used

**System Prompt for AI:**
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
Keep responses concise but comprehensive.
```

---

## 📊 Dashboard Analytics

**Metrics Tracked:**
- Total searches performed
- Popular search queries
- User growth
- Article views
- Search trends (7-day, 30-day)
- Most viewed categories

---

## 🔍 Features Breakdown

### Public Features
1. **Home**: Hero section, featured topics, CTA
2. **Explore Topics**: Card-based topic navigation
3. **AI Search**: Real-time search with AI responses
4. **Resources**: Curated tools, articles, courses
5. **About**: Company mission and values
6. **Contact**: Contact form with validation

### Authenticated Features
1. **Search History**: View all past searches
2. **Saved Resources**: Bookmark resources
3. **Profile**: Manage user information

### Admin Features
1. **Dashboard**: Real-time analytics
2. **Article Management**: Create/Edit/Delete articles
3. **Resource Management**: Manage external resources
4. **User Management**: View and manage users
5. **Analytics**: Detailed search analytics

---

## 🚀 Deployment Strategy

### Vercel Deployment
1. Push code to GitHub `main` branch
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Automatic deployment on push
5. Preview deployments for PRs

### Environment Variables (Vercel)
```
MONGODB_URI
NEXTAUTH_SECRET
NEXTAUTH_URL
OPENAI_API_KEY
```

---

## 🧪 Testing Strategy

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User flow testing
- **Manual Testing**: Cross-browser and mobile testing

---

## 📈 Performance Optimizations

- Server-side rendering for SEO
- Image optimization with Next.js Image
- Code splitting and lazy loading
- API response caching
- Database indexing
- CDN distribution via Vercel

---

## 🔒 Security Measures

- HTTPS encryption
- Password hashing (bcrypt)
- CSRF protection
- SQL injection prevention (MongoDB safe queries)
- Rate limiting on API endpoints
- Environment variable protection
- XSS prevention via React sanitization

---

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly UI elements
- Optimized typography
- Flexible layouts

