# Mark Rahimi - Professional Portfolio & Blog Platform

A modern, full-stack portfolio website with integrated blog, admin panel, and multilingual support. Built with Next.js 14, TypeScript, MongoDB, and Tailwind CSS.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database Architecture](#database-architecture)
- [Type System](#type-system)
- [Admin Panel](#admin-panel)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Features

### Core Features

- **Multilingual Support** - Full English/French localization with seamless language switching
- **Admin Panel** - Complete content management system with authentication
- **Blog Platform** - Create, edit, and publish blog posts with rich content
- **Project Showcase** - Detailed project pages with features, challenges, and metrics
- **Contact System** - Form submissions stored in database with admin notifications
- **Analytics Dashboard** - Track page views, engagement, and site statistics

### Technical Features

- **Type-Safe** - 100% TypeScript coverage with strict type checking
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Dark Theme** - Modern UI with glassmorphism effects
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Performance** - Optimized images, lazy loading, and code splitting

---

## Tech Stack

### Frontend

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5.0](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **UI Library:** [shadcn/ui](https://ui.shadcn.com/) - Beautiful components built on Radix UI
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

### Backend

- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) with credentials provider
- **API:** Next.js API Routes (RESTful)
- **Validation:** Zod schema validation
- **Session Management:** JWT-based sessions

### Development Tools

- **Package Manager:** npm
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git
- **Deployment:** Vercel (recommended)

---

## Project Structure

```
markrahimi-v5/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── about/route.ts        # About section API
│   │   │   ├── auth/[...nextauth]/   # NextAuth configuration
│   │   │   ├── blogs/                # Blog CRUD operations
│   │   │   ├── certificates/         # Certificates management
│   │   │   ├── contact/route.ts      # Contact form handler
│   │   │   ├── education/            # Education CRUD
│   │   │   ├── experiences/          # Experience CRUD
│   │   │   ├── projects/             # Projects CRUD
│   │   │   ├── settings/route.ts     # Site settings API
│   │   │   ├── skills/               # Skills management
│   │   │   ├── stats/route.ts        # Analytics API
│   │   │   └── views/route.ts        # Page view tracking
│   │   │
│   │   ├── admin/                    # Admin Panel Pages
│   │   │   ├── about/page.tsx        # Manage about section
│   │   │   ├── blogs/                # Blog management
│   │   │   ├── certificates/         # Certificates management
│   │   │   ├── dashboard/page.tsx    # Admin dashboard
│   │   │   ├── education/            # Education management
│   │   │   ├── experiences/          # Experience management
│   │   │   ├── login/page.tsx        # Admin login
│   │   │   ├── messages/page.tsx     # Contact messages
│   │   │   ├── projects/             # Projects management
│   │   │   ├── settings/page.tsx     # Site settings
│   │   │   ├── skills/               # Skills management
│   │   │   └── layout.tsx            # Admin layout
│   │   │
│   │   ├── blog/                     # Public Blog Pages
│   │   │   ├── [id]/page.tsx         # Blog post detail
│   │   │   └── page.tsx              # Blog listing
│   │   │
│   │   ├── contact/page.tsx          # Contact page
│   │   ├── projects/                 # Public Project Pages
│   │   │   ├── [id]/page.tsx         # Project detail
│   │   │   └── page.tsx              # Projects listing
│   │   │
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   │
│   ├── components/                   # React Components
│   │   ├── about-section.tsx         # About section
│   │   ├── certifications-section.tsx # Certifications display
│   │   ├── education-section.tsx     # Education timeline
│   │   ├── experience-section.tsx    # Work experience
│   │   ├── footer.tsx                # Site footer
│   │   ├── hero-section.tsx          # Hero/landing section
│   │   ├── language-switcher.tsx     # Language toggle
│   │   ├── navbar.tsx                # Navigation bar
│   │   ├── page-loading.tsx          # Loading component
│   │   └── skills-section.tsx        # Skills display
│   │
│   ├── hooks/                        # Custom React Hooks
│   │   └── useLanguage.ts            # Language context hook
│   │
│   ├── lib/                          # Utility Functions
│   │   ├── auth.ts                   # NextAuth configuration & options
│   │   ├── auth-helper.ts            # Authentication utilities
│   │   ├── get-localized-data.ts     # Data fetching helpers
│   │   ├── mongodb.ts                # MongoDB connection
│   │   └── utils.ts                  # General utilities (cn)
│   │
│   ├── locale/                       # Translation Files
│   │   ├── en.json                   # English translations
│   │   └── fr.json                   # French translations
│   │
│   ├── models/                       # Mongoose Model Instances
│   │   ├── About.ts                  # About section model (imports from schemas)
│   │   ├── Blog.ts                   # Blog post model
│   │   ├── Certificate.ts            # Certificate model
│   │   ├── ContactMessage.ts         # Contact message model
│   │   ├── Education.ts              # Education model
│   │   ├── Experience.ts             # Experience model
│   │   ├── Project.ts                # Project model
│   │   ├── Settings.ts               # Site settings model
│   │   ├── Skill.ts                  # Skill model
│   │   ├── User.ts                   # User/admin model
│   │   └── View.ts                   # Page view analytics model
│   │
│   ├── providers/                    # Context Providers
│   │   ├── language-provider.tsx     # Language context provider
│   │   └── session-provider.tsx      # NextAuth session provider
│   │
│   ├── schemas/                      # Mongoose Schema Definitions
│   │   ├── index.ts                  # Central schema exports
│   │   ├── about.schema.ts           # About section schema
│   │   ├── blog.schema.ts            # Blog post schema
│   │   ├── certificate.schema.ts     # Certificate schema
│   │   ├── contact-message.schema.ts # Contact message schema
│   │   ├── education.schema.ts       # Education schema
│   │   ├── experience.schema.ts      # Experience schema
│   │   ├── project.schema.ts         # Project schema
│   │   ├── settings.schema.ts        # Site settings schema
│   │   ├── skill.schema.ts           # Skill schema
│   │   ├── user.schema.ts            # User/admin schema (with password hashing)
│   │   └── view.schema.ts            # Page view analytics schema
│   │
│   └── types/                        # TypeScript Type Definitions
│       ├── index.ts                  # Central type exports
│       ├── about.ts                  # About section types
│       ├── analytics.ts              # Analytics types (PageView, Stats)
│       ├── blog.ts                   # Blog types (BlogPost, Blog)
│       ├── certificate.ts            # Certificate types
│       ├── challenge.ts              # Project challenge types
│       ├── contact.ts                # Contact types (ContactInfo, ContactMessage)
│       ├── education.ts              # Education types (Education, EducationDB)
│       ├── experience.ts             # Experience types (Experience, ExperienceDB)
│       ├── forms.ts                  # Form data types for admin
│       ├── language.ts               # Language types
│       ├── metric.ts                 # Project metric types
│       ├── project.ts                # Project types (Project, ProjectDB, ProjectDetail)
│       ├── settings.ts               # Settings types
│       ├── skill.ts                  # Skill types (SkillCategory, Skill)
│       ├── social.ts                 # Social link types
│       └── stat.ts                   # Stat types
│
├── public/                           # Static Assets
│   ├── cv.pdf                        # Resume/CV file
│   ├── logo.png                      # Site logo
│   └── profile.jpg                   # Profile image
│
├── scripts/                          # Utility Scripts
│   └── create-admin.js               # Admin user creation script
│
├── .env.sample                       # Environment variables template
├── .env.local                        # Environment variables (not in repo)
├── .gitignore                        # Git ignore rules
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Dependencies
├── postcss.config.mjs                # PostCSS configuration
├── tailwind.config.ts                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/markrahimi/markrahimi-v5.git
   cd markrahimi-v5
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the sample environment file and fill in your values:

   ```bash
   cp .env.sample .env.local
   ```

   Then edit `.env.local` with your configuration:

   | Variable | Description | Example |
   |----------|-------------|---------|
   | `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/markrahimi` |
   | `NEXTAUTH_SECRET` | Secret key for NextAuth (generate with `openssl rand -base64 32`) | `your-secret-key` |
   | `NEXTAUTH_URL` | Base URL of your application | `http://localhost:3000` |
   | `ADMIN_EMAIL` | Admin user email | `admin@example.com` |
   | `ADMIN_PASSWORD` | Admin user password | `your-secure-password` |
   | `ADMIN_NAME` | Admin user display name | `Admin` |

4. **Create admin user**

   ```bash
   npm run create-admin
   ```

5. **Run development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run create-admin # Create admin user
```

---

## Database Architecture

The project follows a clean separation between **Schemas** and **Models** for better maintainability and reusability.

### Schema/Model Pattern

```
src/
├── schemas/              # Mongoose Schema definitions
│   ├── project.schema.ts # Schema + TypeScript interface
│   ├── blog.schema.ts
│   └── ...
│
└── models/               # Mongoose Model instances
    ├── Project.ts        # Imports schema, exports model
    ├── Blog.ts
    └── ...
```

### Schema Files (`src/schemas/`)

Each schema file exports:
- **Interface** (`IProject`, `IBlog`, etc.) - TypeScript type for the document
- **Schema** (`projectSchema`, `blogSchema`, etc.) - Mongoose schema definition

```typescript
// src/schemas/project.schema.ts
import { Schema } from "mongoose";

export interface IProject {
  id: string;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  // ... other fields
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const projectSchema = new Schema<IProject>({
  id: { type: String, required: true, unique: true },
  title: { en: String, fr: String },
  // ... schema definition
}, { timestamps: true });
```

### Model Files (`src/models/`)

Each model file imports the schema and creates the model:

```typescript
// src/models/Project.ts
import mongoose, { Model } from "mongoose";
import { IProject, projectSchema } from "@/schemas/project.schema";

const Project = (mongoose.models.Project as Model<IProject>)
  || mongoose.model<IProject>("Project", projectSchema);

export type { IProject };
export default Project;
```

### Benefits of This Pattern

- **Separation of Concerns** - Schemas define structure, models handle database operations
- **Reusability** - Schemas can be imported independently for validation or testing
- **Type Safety** - Interfaces are co-located with their schemas
- **Hot Reload Friendly** - Prevents "model already defined" errors in development

### Key Schema Files

| Schema | Interface | Description |
|--------|-----------|-------------|
| [project.schema.ts](src/schemas/project.schema.ts) | `IProject` | Portfolio projects with multilingual support |
| [blog.schema.ts](src/schemas/blog.schema.ts) | `IBlog` | Blog posts with categories and tags |
| [experience.schema.ts](src/schemas/experience.schema.ts) | `IExperience` | Work experience entries |
| [education.schema.ts](src/schemas/education.schema.ts) | `IEducation` | Education history |
| [skill.schema.ts](src/schemas/skill.schema.ts) | `ISkill` | Skills organized by category |
| [certificate.schema.ts](src/schemas/certificate.schema.ts) | `ICertificate` | Certifications and awards |
| [user.schema.ts](src/schemas/user.schema.ts) | `IUser` | Admin users with password hashing |
| [settings.schema.ts](src/schemas/settings.schema.ts) | `ISettings` | Site-wide settings |
| [about.schema.ts](src/schemas/about.schema.ts) | `IAbout` | About section content |
| [contact-message.schema.ts](src/schemas/contact-message.schema.ts) | `IContactMessage` | Contact form submissions |
| [view.schema.ts](src/schemas/view.schema.ts) | `IView` | Page view analytics |

---

## Type System

The project uses a comprehensive type system with clear separation:

- **Schema Interfaces** (`IProject`, `IBlog`) → Located in `src/schemas/` - Used with Mongoose models
- **Public Types** (`Project`, `BlogPost`) → Located in `src/types/` - Used in frontend components
- **Database Types** (`ProjectDB`, `Blog`) → Located in `src/types/` - Used in admin panel
- **Form Types** (`ProjectFormData`) → Located in `src/types/forms.ts` - Used in admin forms

### Type Organization

```typescript
// Public Types (for frontend display)
export interface Project {
  id: string;
  title: string; // Localized
  description: string; // Localized
  // ... other localized fields
}

// Database Types (for admin panel)
export interface ProjectDB {
  _id: string;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  // ... multilingual fields
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Form Data Types (for admin forms)
export interface ProjectFormData {
  // Same structure as ProjectDB but optimized for form state
}
```

### Key Type Files

- **[types/index.ts](src/types/index.ts)** - Central export point for all types
- **[types/blog.ts](src/types/blog.ts)** - BlogPost (public) and Blog (database)
- **[types/project.ts](src/types/project.ts)** - Project, ProjectDB, ProjectDetail
- **[types/forms.ts](src/types/forms.ts)** - All admin form data types
- **[types/analytics.ts](src/types/analytics.ts)** - Stats, PageView, ViewsData

---

## Admin Panel

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Enter your admin credentials
3. Access the dashboard at `/admin/dashboard`

### Admin Features

#### Dashboard (`/admin/dashboard`)

- Overview of site statistics
- Quick access to all management sections
- Total counts for projects, blogs, messages, views

#### Content Management

- **Projects** (`/admin/projects`) - Create, edit, delete, and publish projects
- **Blog** (`/admin/blogs`) - Manage blog posts with rich content editor
- **Experience** (`/admin/experiences`) - Add work experience entries
- **Education** (`/admin/education`) - Manage education history
- **Skills** (`/admin/skills`) - Organize skills by categories
- **Certificates** (`/admin/certificates`) - Add certifications and awards

#### Settings & Configuration

- **Site Settings** (`/admin/settings`) - Configure site-wide settings
- **About Section** (`/admin/about`) - Edit about page content
- **Messages** (`/admin/messages`) - View and manage contact form submissions

### Authentication

The admin panel uses NextAuth.js with:

- Credentials-based authentication
- Session-based authorization
- Role-based access control
- Protected API routes with middleware

---

## API Documentation

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### Projects

```typescript
GET    /api/projects         // Get all published projects
GET    /api/projects/:id     // Get single project
POST   /api/projects         // Create project (admin only)
PUT    /api/projects/:id     // Update project (admin only)
DELETE /api/projects/:id     // Delete project (admin only)
```

#### Blog

```typescript
GET    /api/blogs            // Get all published blogs
GET    /api/blogs/:id        // Get single blog post
POST   /api/blogs            // Create blog (admin only)
PUT    /api/blogs/:id        // Update blog (admin only)
DELETE /api/blogs/:id        // Delete blog (admin only)
```

#### Other Endpoints

```typescript
GET / api / about; // Get about section
PUT / api / about; // Update about (admin only)

GET / api / skills; // Get all skills
POST / api / skills; // Create skill (admin only)

GET / api / experiences; // Get all experiences
GET / api / education; // Get all education entries
GET / api / certificates; // Get all certificates

POST / api / contact; // Submit contact form
GET / api / messages; // Get messages (admin only)

GET / api / settings; // Get site settings
PUT / api / settings; // Update settings (admin only)

GET / api / stats; // Get site statistics (admin only)
POST / api / views; // Track page view
```

### Query Parameters

```typescript
// Language parameter for localized content
?lang=en | fr

// Example:
GET /api/projects?lang=en
GET /api/blogs?lang=fr
```

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Environment Variables**

   Add these in Vercel dashboard:

   ```
   MONGODB_URI
   NEXTAUTH_SECRET
   NEXTAUTH_URL
   ADMIN_EMAIL
   ADMIN_PASSWORD
   ```

### Custom Server

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## Development Workflow

### Adding a New Content Type

1. **Create MongoDB Model** in `src/models/`
2. **Define TypeScript Types** in `src/types/`
3. **Create API Routes** in `src/app/api/`
4. **Build Admin Pages** in `src/app/admin/`
5. **Create Public Display** in `src/components/`

### Code Organization Principles

- **No inline interfaces** - All types in `src/types/`
- **Centralized exports** - Use `src/types/index.ts`
- **Separated concerns** - Public types vs Database types vs Form types
- **Consistent naming** - Public types (e.g., `Project`), DB types (e.g., `ProjectDB`), Form types (e.g., `ProjectFormData`)

---

## Roadmap & Future Features

### 🎨 User Experience & Design

- [ ] **Light/Dark Theme Toggle** - System preference detection with manual override
- [ ] **Reading Progress Indicator** - Show reading progress on blog posts
- [ ] **Table of Contents** - Auto-generated TOC for long blog posts
- [ ] **Smooth Page Transitions** - Enhanced animations between pages
- [ ] **Skeleton Loading States** - Better loading experience with content placeholders
- [ ] **Custom 404/500 Pages** - Branded error pages with helpful navigation
- [ ] **Print-Friendly Styles** - Optimized print layouts for blog posts and resume

### 🔍 Search & Discovery

- [ ] **Full-Text Search** - Search across blogs, projects, and content
- [ ] **Project Filtering** - Filter by technology, category, or year
- [ ] **Blog Categories & Tags Pages** - Dedicated pages for each category/tag
- [ ] **Related Posts** - AI-powered related content suggestions
- [ ] **Popular Posts Widget** - Show most viewed content
- [ ] **Archive Page** - Chronological listing of all content

### 📝 Content & Blog Features

- [ ] **Rich Text Editor** - TipTap or Slate.js for better content editing
- [ ] **MDX Support** - Write blog posts with JSX components
- [ ] **Code Syntax Highlighting** - Prism.js with copy-to-clipboard
- [ ] **Blog Comments** - Giscus (GitHub Discussions) integration
- [ ] **Newsletter Subscription** - Email capture with Mailchimp/ConvertKit
- [ ] **RSS Feed** - Auto-generated RSS for blog posts
- [ ] **Reading Time Estimation** - Accurate reading time calculation
- [ ] **Social Share Buttons** - Share to Twitter, LinkedIn, Facebook
- [ ] **Draft/Preview Mode** - Preview unpublished content

### 🚀 Performance & SEO

- [ ] **Image Optimization** - Next.js Image component with blur placeholders
- [ ] **ISR (Incremental Static Regeneration)** - Faster page loads with caching
- [ ] **Dynamic Sitemap** - Auto-generated sitemap.xml
- [ ] **Structured Data (JSON-LD)** - Rich snippets for Google
- [ ] **Open Graph Images** - Auto-generated OG images for social sharing
- [ ] **Lazy Loading** - Defer loading of off-screen content
- [ ] **Bundle Analysis** - Optimize JavaScript bundle size
- [ ] **Edge Functions** - Deploy API routes to edge for faster response

### 📊 Analytics & Insights

- [ ] **Google Analytics 4** - GA4 integration with events tracking
- [ ] **Custom Analytics Dashboard** - Detailed view analytics in admin
- [ ] **Heatmaps** - Track user interactions with Hotjar/Clarity
- [ ] **A/B Testing** - Test different versions of content
- [ ] **Performance Monitoring** - Real-time performance metrics
- [ ] **Error Tracking** - Sentry integration for error monitoring

### 🔐 Security & Authentication

- [ ] **Two-Factor Authentication** - TOTP-based 2FA for admin
- [ ] **Rate Limiting** - Protect API routes from abuse
- [ ] **CAPTCHA** - reCAPTCHA or hCaptcha for forms
- [ ] **Content Security Policy** - Strict CSP headers
- [ ] **Audit Logs** - Track admin actions
- [ ] **Session Management** - View and manage active sessions

### 🛠️ Admin Panel Enhancements

- [ ] **Image Upload & Gallery** - Media library with drag-and-drop
- [ ] **Scheduled Publishing** - Schedule content for future dates
- [ ] **Content Versioning** - Track changes with version history
- [ ] **Bulk Operations** - Select and edit multiple items
- [ ] **Import/Export** - Backup and restore content as JSON
- [ ] **Keyboard Shortcuts** - Power user shortcuts in admin
- [ ] **Activity Dashboard** - Recent changes and activity feed

### 📧 Notifications & Communication

- [ ] **Email Notifications** - Send emails for new messages
- [ ] **Email Templates** - Beautiful HTML email templates
- [ ] **Webhook Integration** - Send data to external services
- [ ] **Slack/Discord Bot** - Notifications to team channels
- [ ] **Auto-Reply** - Automatic response for contact forms

### 🌍 Internationalization

- [ ] **More Languages** - Add Spanish, German, Arabic, Persian
- [ ] **RTL Support** - Right-to-left layout for Arabic/Persian
- [ ] **Auto Language Detection** - Detect browser language
- [ ] **URL-Based Routing** - `/en/`, `/fr/` URL prefixes
- [ ] **Translation Management** - Admin UI for translations

### 🔗 Integrations

- [ ] **GitHub Integration** - Show latest repositories and contributions
- [ ] **Twitter/X Feed** - Display recent tweets
- [ ] **LinkedIn Integration** - Import profile data
- [ ] **Spotify Now Playing** - Show currently playing track
- [ ] **Discord Presence** - Show online status
- [ ] **Cal.com Integration** - Meeting scheduling
- [ ] **Stripe Integration** - Accept donations/payments

### 📱 PWA & Mobile

- [ ] **Service Worker** - Offline support with caching
- [ ] **Web App Manifest** - Install as native app
- [ ] **Push Notifications** - Notify users of new content
- [ ] **App-like Navigation** - Bottom navigation on mobile
- [ ] **Gesture Support** - Swipe gestures for navigation

### ♿ Accessibility

- [ ] **WCAG 2.1 Compliance** - Full accessibility audit
- [ ] **Screen Reader Optimization** - Proper ARIA labels
- [ ] **Keyboard Navigation** - Full keyboard support
- [ ] **High Contrast Mode** - Accessibility theme option
- [ ] **Font Size Controls** - User-adjustable text size
- [ ] **Reduced Motion** - Respect prefers-reduced-motion

### 🧪 Testing & Quality

- [ ] **Unit Tests** - Jest + React Testing Library
- [ ] **E2E Tests** - Playwright or Cypress
- [ ] **Visual Regression** - Percy or Chromatic
- [ ] **API Tests** - Supertest for API routes
- [ ] **CI/CD Pipeline** - GitHub Actions workflow
- [ ] **Code Coverage** - Track test coverage
- [ ] **Lighthouse CI** - Automated performance testing

### 🎯 Advanced Features

- [ ] **AI Content Suggestions** - GPT-powered writing assistant
- [ ] **Automatic Image Alt Text** - AI-generated descriptions
- [ ] **Content Recommendations** - ML-based personalization
- [ ] **Voice Search** - Search with voice commands
- [ ] **Command Palette** - Cmd+K quick navigation
- [ ] **Changelog** - Public changelog for site updates
- [ ] **Status Page** - System status and uptime monitoring

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

**Mark Rahimi**

- Email: imarkrahimi@gmail.com
- GitHub: [@markrahimi](https://github.com/markrahimi)
- LinkedIn: [markrahimi](https://linkedin.com/in/markrahimi)
- Website: [markrahimi.com](https://markrahimi.com)

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

---

**Made with ❤️ by Mark Rahimi**
