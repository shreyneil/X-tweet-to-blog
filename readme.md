# TweetBlog - Social Media Timeline Converter

## Overview

TweetBlog is a full-stack web application that transforms Twitter timelines into beautiful, readable blog-style formats. The application allows users to input a Twitter username and generates a clean, organized timeline view with search, filtering, and sorting capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility and customization
- **Styling**: Tailwind CSS with custom Twitter-inspired design system and responsive layouts
- **State Management**: TanStack Query (React Query) for efficient server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Theme Support**: Built-in dark/light mode with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database**: PostgreSQL with Neon Database serverless connection for scalability
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **API Design**: RESTful API with JSON responses and comprehensive error handling
- **Development**: Hot module replacement with Vite integration for seamless development experience

## Key Components

### Data Layer
- **Database Schema**: PostgreSQL tables for tweets and timelines with proper relationships
- **Storage Interface**: Abstract storage layer with DatabaseStorage implementation
- **Data Validation**: Zod schemas for runtime type checking and API validation
- **Migration System**: Drizzle Kit for database schema migrations

### API Layer
- **Timeline Operations**: Full CRUD operations for user timelines with metadata
- **Tweet Management**: Advanced search, filtering, and sorting functionality
- **Twitter Integration**: TwitterService for fetching data from Twitter API
- **Error Handling**: Comprehensive error middleware with structured responses

### UI Components
- **Timeline Display**: Card-based layout with engagement metrics and media support
- **Search & Filter**: Real-time search with content type and popularity filters
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Theme System**: Consistent theming across light and dark modes

## Data Flow

1. **User Input**: Username submission triggers timeline generation request
2. **Data Fetching**: Backend attempts to fetch timeline from database, falls back to Twitter API
3. **Data Processing**: Raw Twitter data is transformed and stored in PostgreSQL
4. **Frontend Display**: React components render timeline with real-time search and filtering
5. **State Management**: TanStack Query manages caching and synchronization

## External Dependencies

### Frontend Dependencies
- **@radix-ui/react-***: Accessible UI primitive components
- **@tanstack/react-query**: Server state management
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library
- **lucide-react**: Icon library

### Backend Dependencies
- **express**: Web framework for Node.js
- **drizzle-orm**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Neon Database client
- **zod**: Schema validation library
- **date-fns**: Date manipulation utilities

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **drizzle-kit**: Database migration tool
- **esbuild**: Fast JavaScript bundler

## Deployment Strategy

### Development Environment
- **Unified Development**: Single command starts both frontend and backend with hot reloading
- **Database Seeding**: Automatic sample data generation for development
- **Proxy Setup**: Vite proxy handles API requests during development

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: esbuild compiles TypeScript to optimized JavaScript
- **Database**: Drizzle migrations ensure schema consistency
- **Environment**: Node.js production server with static file serving

### Key Architectural Decisions

1. **Monorepo Structure**: Shared types between frontend and backend for consistency
2. **TypeScript Throughout**: Type safety across the entire application stack
3. **Serverless Database**: Neon Database for scalability and reduced infrastructure management
4. **Component-Based UI**: Modular, reusable components with consistent design system
5. **Caching Strategy**: TanStack Query for efficient data fetching and state management

## Deployment Strategy

### GitHub Pages Deployment
- **Frontend Deployment**: Static site deployment to GitHub Pages using GitHub Actions
- **Workflow Configuration**: Automated deployment on push to main branch via `.github/workflows/deploy.yml`
- **Build Process**: Frontend-only build using `vite build` for static hosting
- **Demo Mode**: Includes demo timeline data for showcasing functionality without backend
- **Documentation**: Complete deployment guide in `DEPLOYMENT.md`

### Backend Hosting Options
- **Development**: Local PostgreSQL with Replit environment
- **Production**: Requires separate hosting (Vercel, Railway, Render, or Netlify Functions)
- **API Integration**: Environment-based configuration for API endpoints

## Changelog

Changelog:
- July 07, 2025. Initial setup
- July 07, 2025. Added GitHub Pages deployment configuration with automated workflows, deployment documentation, and frontend-only build process

## User Preferences

Preferred communication style: Simple, everyday language.
