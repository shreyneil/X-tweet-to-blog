# TweetBlog - Social Media Timeline Converter

## Overview

TweetBlog is a full-stack web application that transforms Twitter timelines into beautiful, readable blog-style formats. The application allows users to input a Twitter username and generates a clean, searchable timeline of tweets with filtering and sorting capabilities. Built with modern web technologies, it provides an intuitive interface for browsing and exporting social media content.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom Twitter-inspired color scheme and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Database Integration**: Drizzle ORM configured for PostgreSQL with Neon Database serverless
- **Development**: Hot module replacement with Vite integration in development mode

### Build System
- **Frontend Build**: Vite with React plugin for optimized production builds
- **Backend Build**: esbuild for fast TypeScript compilation and bundling
- **Development**: Unified development server with proxy setup for seamless API integration

## Key Components

### Data Layer
- **Database Schema**: PostgreSQL tables for tweets and timelines using Drizzle ORM
- **Storage Interface**: Abstract storage layer with in-memory implementation for development
- **Data Validation**: Zod schemas for runtime type checking and API validation

### API Layer
- **Timeline Operations**: CRUD operations for user timelines with metadata
- **Tweet Management**: Search, filter, and sort functionality for tweet collections
- **Error Handling**: Comprehensive error middleware with structured responses

### UI Components
- **Timeline Display**: Card-based layout for tweet visualization with engagement metrics
- **Search & Filter**: Real-time search with content type and popularity filters
- **Responsive Design**: Mobile-first approach with progressive enhancement

## Data Flow

1. **User Input**: Username submission triggers timeline generation request
2. **API Processing**: Backend validates request and queries/creates timeline data
3. **Data Retrieval**: Tweets are fetched with applied filters and sorting
4. **Client Rendering**: React components display timeline with interactive features
5. **State Management**: TanStack Query handles caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **tsx**: TypeScript execution for development
- **vite**: Fast build tool and development server
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Production Build
- Frontend assets built to `dist/public` directory
- Backend compiled to `dist/index.js` with external dependencies
- Static file serving integrated with Express in production

### Environment Configuration
- Database URL configuration via environment variables
- Development/production mode detection for conditional features
- Replit-specific optimizations for cloud deployment

### Database Migration
- Drizzle Kit configuration for schema migrations
- Push-based deployment model for rapid iteration

## Changelog

Changelog:
- July 07, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.