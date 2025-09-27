# PalaGuideBot Website

## Project Overview

PalaGuideBot is a comprehensive web platform and Discord bot designed to enhance the gaming experience for Paladium Minecraft server players. Created on December 8, 2023, by TonyKun, the project has evolved into a full-featured ecosystem providing tools, statistics, and community features for Paladium players.

## Features

### 🏠 Core Website Features
- **Home Page**: Landing page with Discord statistics and giveaway announcements
- **Player Statistics**: Detailed player lookup with historical data and progression tracking
- **Faction Statistics**: Comprehensive faction information and member details
- **Leaderboards**: Multiple ranking systems including:
  - Money rankings
  - Trixium rankings
  - Clicker rankings
  - Boss kill statistics
  - Job progression rankings
  - Alliance/alignment rankings
  - Special event rankings (Egghunt, KOTH)

### 🛠️ Tools & Calculators
- **Clicker Tool**: Progression assistance for clicker gameplay
- **Job Calculator**: XP calculation and resource visualization for profession advancement
- **POG Calculator**: Experience calculation and resource planning for pickaxe upgrades

### 📊 Information Pages
- **FAQ**: Frequently asked questions
- **Changelog**: Latest updates and version history
- **Privacy Policy**: Data protection and privacy information
- **Terms of Service**: Usage terms and conditions
- **Know Everything**: Comprehensive project documentation including:
  - Project history and milestones
  - Team information and contributor credits
  - Technology stack details
  - Development philosophy and motivations

### 🎁 Community Features
- **Giveaways**: Active giveaway system with participation tracking
- **Discord Integration**: Seamless integration with Discord bot functionality
- **Real-time Updates**: Live statistics and data synchronization

### 👥 Staff Dashboard
- **User Management**: Staff user administration
- **Role Management**: Permission and role system
- **Giveaway Administration**: Complete giveaway lifecycle management
- **Analytics**: Usage statistics and monitoring

## Technology Stack

### Backend
- **Framework**: AdonisJS 6 (Node.js framework)
- **Language**: TypeScript
- **Architecture**: MVC with Inertia.js for SSR
- **Authentication**: OAuth integration with Discord
- **Caching**: BentoCache for optimized performance
- **API Integration**: Custom API for Paladium server data

### Frontend
- **Framework**: React 19
- **SSR**: Inertia.js for server-side rendered React
- **Styling**: TailwindCSS 4 with custom design system
- **UI Components**: 
  - Radix UI primitives for accessibility
  - Custom component library
  - React Three Fiber for 3D visualizations
- **State Management**: Zustand
- **Charts**: Recharts for data visualization
- **Animations**: Motion (Framer Motion)

### Development Tools
- **Build Tool**: Vite
- **Package Manager**: npm
- **Linting**: ESLint with AdonisJS config
- **Formatting**: Prettier
- **Type Checking**: TypeScript compiler
- **Testing**: Japa testing framework
- **Hot Reload**: Hot Hook for development

### Infrastructure
- **Containerization**: Docker
- **Container Management**: Portainer
- **Version Control**: GitHub
- **Analytics**: Umami for privacy-focused analytics
- **Database**: MongoDB for data storage
- **Image Generation**: HonoJS for dynamic image creation

## Project Structure

```
├── app/                    # Backend application code
│   ├── controllers/        # HTTP request handlers
│   ├── core/              # Core business logic and services
│   ├── leaderboard/       # Leaderboard functionality
│   ├── staff/             # Staff dashboard features
│   ├── stats/             # Player and faction statistics
│   ├── tools/             # Calculator and tool controllers
│   └── middleware/        # Request middleware
├── inertia/               # Frontend React application
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   └── stores/           # State management
├── resources/            # Static resources and content
│   └── static/pages/     # Markdown content files
├── start/                # Application bootstrap
│   └── routes/           # Route definitions
└── config/               # Application configuration
```

## Key Routes & Functionality

### Public Routes
- `/` - Home page with community stats
- `/stats/players/:username` - Player profile and statistics
- `/stats/factions/:name` - Faction information
- `/leaderboard/*` - Various ranking systems
- `/tools/*` - Calculator and utility tools
- `/informations` - Project information hub

### Authentication
- Discord OAuth integration
- Session-based authentication
- Role-based access control

### API Integration
- Real-time data fetching from Paladium servers
- Caching layer for performance optimization
- Image generation for social media sharing

## Development Setup

### Prerequisites
- Node.js >= 20.6
- npm package manager

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment file: `cp .env.example .env`
4. Generate application key: `node ace generate:key`
5. Configure API credentials in `.env`
6. Start development server: `npm run dev`

### Available Scripts
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run test suite
- `npm run lint` - Lint codebase
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Type check TypeScript

## Team & Contributors

### Core Team
- **TonyKun** - Creator & Lead Developer (Backend, API, Infrastructure)
- **Zeluck** - Graphic Designer & Communication (UI/UX, Visual Design)
- **Riveur** - Web Developer (Frontend, User Experience)

### External Contributors
- **Razi** - Java Contributor (Minecraft integrations)
- **Volcan'eau** - TypeScript Contributor (Features & improvements)

## Community Impact

- **700+ Discord servers** using the bot
- **9,000+ unique website users**
- **50,000+ bot interactions** recorded
- **1,000+ daily interactions** at peak usage
- Continuous feature development based on community feedback

## Philosophy

The project emphasizes:
- **User Experience**: Clean, intuitive interfaces with accessibility in mind
- **Performance**: Optimized loading times and responsive design
- **Transparency**: Open development process with public documentation
- **Community-Driven**: Features developed based on player needs and feedback
- **Code Quality**: Clean, maintainable codebase with modern development practices

This project represents a comprehensive solution for Paladium server players, combining statistical analysis, practical tools, and community features in a modern, performant web application built with cutting-edge technologies.