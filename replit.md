# replit.md

## Overview

TweetBlog is a full-stack web application that transforms Twitter timelines into beautiful, readable blog-style formats. The application allows users to input a Twitter username and generates a clean, chronological timeline view with enhanced readability, media integration, and export capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom Twitter-inspired design system
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Theme Support**: Built-in dark/light mode with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Neon Database serverless connection
- **ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API with JSON responses
- **Twitter Integration**: Twitter API v2 for fetching real tweet data

## Key Components

### Database Schema
- **tweets table**: Stores tweet data with metadata (content, images, engagement metrics)
- **timelines table**: Stores user timeline metadata and configuration
- **Relationships**: One-to-many relationship between timelines and tweets

### API Endpoints
- `GET /api/timeline/:username` - Retrieve user timeline metadata
- `GET /api/tweets/:username` - Retrieve tweets with search/filter/sort options
- `POST /api/generate-timeline` - Generate new timeline from Twitter data

### UI Components
- **HeroSection**: Username input and timeline generation
- **FilterSection**: Search, filter, and sort controls
- **TimelineSection**: Main timeline display with tweet cards
- **TweetCard**: Individual tweet display with engagement metrics

## Data Flow

1. **User Input**: Username submission triggers timeline generation
2. **Data Fetching**: Backend attempts to fetch from database, falls back to Twitter API
3. **Data Processing**: Raw Twitter data is transformed and stored in PostgreSQL
4. **Client Display**: React components render timeline with search/filter capabilities
5. **Real-time Updates**: TanStack Query handles caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Database ORM with type safety
- **@tanstack/react-query**: Client-side data fetching and caching
- **@radix-ui/react-***: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **@types/node**: Node.js type definitions

### Optional Twitter Integration
- **Twitter API v2**: For fetching real tweet data (requires bearer token)
- **cors**: Cross-origin resource sharing for API access

## Deployment Strategy

### Frontend-Only Deployment (GitHub Pages)
- **Build Command**: `npx vite build` creates static files
- **SPA Support**: 404.html for client-side routing
- **GitHub Actions**: Automated deployment workflow
- **Fallback Data**: Mock data when API is unavailable

### Full-Stack Deployment Options
- **Frontend**: GitHub Pages, Vercel, Netlify
- **Backend API**: Vercel Functions, Railway, Heroku
- **Database**: Neon Database (PostgreSQL)

### Environment Configuration
- `VITE_API_URL`: API endpoint for production builds
- `DATABASE_URL`: PostgreSQL connection string
- `TWITTER_BEARER_TOKEN`: Twitter API authentication (optional)

## Changelog
- July 07, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.