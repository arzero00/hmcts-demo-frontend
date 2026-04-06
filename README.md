# HMCTS Frontend Demo

This is the frontend for the HMCTS case management system


# About
The system allows caseworkers to efficiently create, track, and manage their tasks.

# Features
- Create tasks with title, description, status, and due date
- View all tasks in a clean, accessible interface
- Edit existing tasks with form validation
- Delete tasks with confirmation


# Technology Stack
- React: Client-side UI components
- SCSS: Styling
- Jest/Testing Library: For component testing
- Zustand: Local state management
- React Query: Server state management
- React Hook Form: Input validation

# Getting Started
## Prerequisites
- Node.js 24+ with npm
- Application is running at http://localhost:5173
- Application fire requests to backend ar http://localhost:4000, please refer to https://github.com/arzero00/hmcts-dev-test-backend to setup the backend server


## Installation and Setup
```Bash
# Clone the repository
git clone https://github.com/arzero00/hmcts-demo-frontend.git
cd hmcts-demo-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Application is running at http://localhost:5173

This project uses vite so when you make changes to components within react the page will automatically be updated to reflect this using HMR.


# Testing

To run tests.
```Bash
# Run all unit tests
npm test

# Run with coverage
npm test:coverage

# Watch mode for development
npm test --watch
```

## Tests cover:
- Page loading and navigation
- Form submission workflows
- Case creation, editing, and deletion
- Error handling scenarios

# Building the docker image

From the root of the project (Where the Docker file is), run `docker build . -t hmcts-demo-frontend:latest`

This then means a docker image will be build locally and ready to use. Please go to https://github.com/arzero00/hmcts-developer-challenge and follow the README.md there to run the full project end to end.

