# Keleo Client Application

A modern, high-performance web application built with React, TypeScript, and Vite, styled using Tailwind CSS v4 and Framer Motion.

## Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) (animations)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [Phosphor Icons](https://phosphoricons.com/)
- **Networking & Realtime:** [Axios](https://axios-http.com/) & [Socket.io Client](https://socket.io/)
- **PDF Generation:** [@react-pdf/renderer](https://react-pdf.org/)

---

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables by creating a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

---

## Available Scripts

In the project directory, you can run the following scripts:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with hot-reload at `http://localhost:5173`. |
| `npm run build` | Builds the production-ready application inside the `dist` folder. |
| `npm run preview` | Locally previews the production build. |
| `npm run lint` | Runs ESLint to check for code quality and style issues. |

---

## Project Structure

```text
src/
├── assets/          # Static assets (images, logos, etc.)
├── components/      # Reusable UI components
├── contexts/        # React context providers for global state
├── hooks/           # Custom React hooks
├── pages/           # Page components representing routes
├── services/        # API calls and WebSocket setups
├── styles/          # Global styles and Tailwind imports
├── App.tsx          # Main App component
└── main.tsx         # Application entry point
```

---

## License

This project is private and proprietary.
