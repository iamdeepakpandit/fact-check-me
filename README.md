# Fact Checker

An AI-powered fact-checking application that verifies news claims and headlines instantly using advanced natural language processing.

## Overview

Fact Checker is a modern web application designed to help users quickly verify the accuracy of news claims, headlines, and statements. By leveraging AI technology, the application analyzes claims and provides verification results along with detailed explanations.

## Features

- **Instant Fact Verification**: Submit any news headline or claim for immediate verification
- **AI-Powered Analysis**: Advanced machine learning models analyze claims for accuracy
- **Detailed Explanations**: Receive comprehensive explanations for verification results
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Fully responsive interface works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern, animated interface with smooth interactions and visual feedback
- **Dark Mode Support**: Toggle between light and dark themes for comfortable viewing

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn-ui components
- **Build Tool**: Vite
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **API**: Supabase Edge Functions for serverless processing
- **State Management**: React hooks and Tanstack Query

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn-ui components
│   ├── FactCheckInput.tsx
│   ├── FactCheckResult.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ThemeToggle.tsx
├── pages/              # Page components
│   ├── Index.tsx       # Main dashboard
│   ├── Auth.tsx        # Authentication
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── integrations/       # External service integrations
    └── supabase/       # Supabase client setup
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Supabase account for database and authentication

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd fact-checker

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```sh
npm run build
```

## Usage

1. **Create an Account**: Sign up with your email and password
2. **Login**: Access your account with your credentials
3. **Submit a Claim**: Enter any news headline or claim in the input field
4. **Get Results**: Receive instant verification results with detailed explanations
5. **View History**: Track all your previous fact-checks

## Authentication

The application uses Supabase's email/password authentication. Users must create an account and log in to access the fact-checking features.

## API Integration

Fact-checking requests are processed through Supabase Edge Functions, which handle:
- Claim analysis
- AI-powered verification
- Result generation
- Explanation creation

## Security

- All user data is encrypted and stored securely in Supabase
- Authentication tokens are managed securely
- Row-level security (RLS) policies protect user data
- CORS headers properly configured for safe API communication

## Performance

- Optimized bundle size with code splitting
- Fast page loads with Vite's optimized build process
- Responsive caching strategies
- Smooth animations and transitions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Code Quality

The project maintains high code quality with:
- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting
- Component-based architecture

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Deployment

The application can be deployed to various platforms:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

Follow the platform-specific deployment guides for detailed instructions.

## Future Enhancements

- Advanced claim categorization
- Source verification and citation linking
- User claim history and bookmarks
- Collaborative fact-checking features
- API for third-party integrations
- Mobile app versions

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or feature requests, please reach out through the project repository.
