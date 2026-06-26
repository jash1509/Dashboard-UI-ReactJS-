# 🇮🇳 Bharat Business Dashboard

A professional, responsive **React.js dashboard application** inspired by Indian e-commerce and retail analytics platforms — built as part of an internship project at **Skytus**.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Routes](#-routes)
- [Components](#-components)
- [State Management](#-state-management)
- [API Integration](#-api-integration)

---

## 🚀 Project Overview

**Bharat Business Dashboard** demonstrates modern React.js patterns including nested routing, Axios API integration, global state management with Context API + `useReducer`, and premium responsive UI design. The theme is inspired by the Indian business ecosystem — featuring INR (₹) pricing, city-level analytics, and festival sales insights.

---

## 🌐 Live Demo

> 🔗 [GitHub Repository](https://github.com/jash1509/Dashboard-UI-ReactJS-)

---

## ✨ Features

- **🔀 Nested Routing** — Built with React Router DOM v7. Root `/` and `/dashboard` both redirect to `/dashboard/overview` automatically.
- **🌐 Axios API Integration** — Fetches live user and product data from [JSONPlaceholder](https://jsonplaceholder.typicode.com) and [FakeStore API](https://fakestoreapi.com).
- **🧠 Context API + useReducer** — Clean global state management using action types: `FETCH_START`, `FETCH_SUCCESS`, and `FETCH_ERROR`.
- **📱 Fully Responsive Layout** — Mobile-first design with a collapsible drawer, 2-column tablet cards, and a 4-column desktop grid.
- **🧭 Sidebar Navigation** — Active route highlighting for Overview, Products, Users, and Analytics; collapses with icon-only tooltip mode.
- **🔔 Header Component** — Dashboard title, notification badge, avatar, and a warm `"Namaste, Admin 👋"` greeting panel.
- **📦 Reusable Components** — `StatCard`, `Loader`, `ErrorMessage`, `ProductCard`, and `ChartPlaceholder` are all reusable across pages.
- **🇮🇳 Indian Business Insights** — Analytics cards display metrics like Top State (Maharashtra), Fastest Growing City (Bangalore), and highest sales festival (Diwali Sale) in INR (₹).

---

## 📁 Project Structure

```
Dashboard UI (ReactJS)/
├── public/
├── src/
│   ├── assets/                  # Static assets (images, icons)
│   ├── components/
│   │   ├── ChartPlaceholder/    # Bar/line chart UI placeholder
│   │   ├── ErrorMessage/        # Error state UI component
│   │   ├── Header/              # Top navigation bar
│   │   ├── Loader/              # Loading spinner
│   │   ├── ProductCard/         # Product display card
│   │   ├── Sidebar/             # Collapsible side navigation
│   │   └── StatCard/            # KPI metric card
│   ├── context/
│   │   ├── DashboardContext.jsx # React Context provider
│   │   └── dashboardReducer.js  # useReducer logic
│   ├── layouts/
│   │   └── DashboardLayout/     # Wraps Sidebar + Header + Outlet
│   ├── pages/
│   │   ├── Overview/            # Dashboard overview page
│   │   ├── Products/            # Product listing page
│   │   ├── Users/               # User listing page
│   │   └── Analytics/           # Business analytics page
│   ├── routes/
│   │   └── AppRoutes.jsx        # Centralized routing configuration
│   ├── services/
│   │   └── api.js               # Axios API service layer
│   ├── App.jsx
│   ├── App.css
│   ├── index.css                # Global styles & CSS variables
│   └── main.jsx
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🛠 Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| **React.js** | ^19.2.6 | UI library |
| **React Router DOM** | ^7.15.1 | Nested routing |
| **Axios** | ^1.16.1 | HTTP requests |
| **Lucide React** | ^1.16.0 | Icon library |
| **Vite** | ^8.0.12 | Build tool & dev server |
| **CSS3 / Vanilla CSS** | — | Custom styling & animations |
| **ESLint** | ^10.3.0 | Code linting |

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jash1509/Dashboard-UI-ReactJS-.git
   cd "Dashboard UI (ReactJS)"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

---

## 🗺 Routes

| Path | Behaviour |
|---|---|
| `/` | Redirects → `/dashboard/overview` |
| `/dashboard` | Redirects → `/dashboard/overview` |
| `/dashboard/overview` | Dashboard Overview page |
| `/dashboard/products` | Products listing page |
| `/dashboard/users` | Users listing page |
| `/dashboard/analytics` | Analytics & insights page |
| `*` (any unknown) | Redirects → `/dashboard/overview` |

---

## 🧩 Components

| Component | Description |
|---|---|
| `Header` | Top bar with title, notifications, and admin greeting |
| `Sidebar` | Collapsible nav with active route highlighting |
| `StatCard` | KPI card displaying metric label, value, and trend |
| `ProductCard` | Individual product display with image and price |
| `ChartPlaceholder` | Visual chart placeholder for analytics data |
| `Loader` | Animated loading spinner for async states |
| `ErrorMessage` | Friendly error state with retry messaging |

---

## 🧠 State Management

Global state is managed with **React Context API** + **`useReducer`**:

```
DashboardContext.jsx  →  Provides state & dispatch to all components
dashboardReducer.js   →  Handles: FETCH_START | FETCH_SUCCESS | FETCH_ERROR
```

**State shape:**
```js
{
  users: [],
  products: [],
  loading: false,
  error: null
}
```

---

## 🌐 API Integration

API calls are centralized in `src/services/api.js` using **Axios**:

| Endpoint | Source | Used In |
|---|---|---|
| `/users` | JSONPlaceholder | Users page |
| `/products` | FakeStore API | Products page |

---

## 👨‍💻 Author

**Jash** — Internship Project @ Skytus  
🔗 GitHub: [@jash1509](https://github.com/jash1509)

---

## 📄 License

This project is for educational and internship purposes.
