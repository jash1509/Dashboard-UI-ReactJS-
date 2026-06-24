# 🇮🇳 Bharat Business Dashboard

## Project Overview

Bharat Business Dashboard is a professional, responsive React.js dashboard application inspired by Indian e-commerce and retail analytics platforms. The application demonstrates nested routing, Axios API integration (JSONPlaceholder and FakeStore APIs), state management using the Context API + `useReducer`, reusable UI components, and premium responsive design matching the Indian cultural theme.

---

## Features

- **Nested Routing**: Powered by React Router DOM, redirecting the base URL `/` and `/dashboard` to `/dashboard/overview`.
- **Axios Integration**: Fetches users and products from third-party APIs while supporting real-time connection latency and server error simulations.
- **Context API & Reducer State Management**: Uses a clean `useReducer` action pattern (actions: `FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR`) to maintain loading states, error states, and cached data lists.
- **Responsive Layout**: Adapts gracefully to all viewports (collapsible drawer on mobile devices, 2-column cards on tablets, and 4-column layout on desktops).
- **Sidebar Navigation**: Highlights active routes (`🏠 Overview`, `🛍 Products`, `👥 Users`, `📈 Analytics`) and collapses into tooltip-on-hover actions.
- **Header Component**: Features the dashboard title, notification badges, avatar, and a warm greeting panel: `"Namaste, Admin 👋"`.
- **Reusable Components**: Includes `StatCard`, `Loader`, `ErrorMessage`, and `ChartPlaceholder`.
- **Indian Business Insights**: Displays curated business analytics cards like Top State (Maharashtra), Fastest Growing City (Bangalore), and Highest Sales Festival (Diwali Sale) in Indian Rupees (₹).

---

## Technologies

- **React.js** (Vite build system)
- **React Router DOM v6** (Nested routing)
- **Axios** (API requests)
- **Context API + useReducer** (Global state management)
- **CSS3 / CSS Modules** (Vanilla styling, custom variables, animations)
- **Lucide React** (Modern, lightweight iconography)

---

## Installation

1. Clone or copy the project files to your environment:
   ```bash
   cd bharat-business-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server locally:
   ```bash
   npm run dev
   ```

4. Build the application for production:
   ```bash
   npm run build
   ```
