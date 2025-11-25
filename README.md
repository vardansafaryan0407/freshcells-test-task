# FreshCells Test Task

A React application built with Vite, TypeScript, and Apollo Client.

## Features

- **Authentication**: Login with email and password.
- **Account Management**: View user details and logout.
- **Localization**: i18n support.
- **Security**: Protected routes and token-based authentication.

## Prerequisites

- Docker and Docker Compose

## Getting Started

### Running with Docker (Recommended)

The easiest way to run the application without installing Node.js locally:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:5173` with hot module reloading enabled.

To stop the application:

```bash
docker-compose down
```

### Running Locally (Alternative)

If you prefer to run the application without Docker:

**Prerequisites:**

- Node.js v22 (see `.nvmrc`)
- npm

**Steps:**

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Set up environment variables** (optional):
    Copy `.env.example` to `.env` if you need to override the default API URL:

    ```bash
    cp .env.example .env
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

**Note:** Running `npm install` locally is also useful for IDE IntelliSense even when using Docker.

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm test`: Run unit tests
- `npm run preview`: Preview production build

## Project Structure

- `src/components`: Reusable UI components
- `src/features`: Feature-specific components (Auth, Account)
- `src/pages`: Page components
- `src/graphql`: Apollo Client setup and definitions
- `src/router`: Routing configuration
- `src/i18n`: Localization setup

## Technologies

- React
- TypeScript
- Vite
- Apollo Client (GraphQL)
- React Router
- i18next
- Vitest (Testing)

## Possible Improvements

- **E2E Testing**: Add Playwright or Cypress tests
- **Test Coverage**: Increase coverage and add reporting
- **Lighthouse Optimization**: Improve performance scores (PWA, accessibility metrics)
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Error Monitoring**: Integrate Sentry for production error tracking
- **Storybook**: Component documentation and visual testing
