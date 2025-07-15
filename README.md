# 🦉 WiseJobs — Fullstack Job Board Application

WiseJobs is a fullstack job board web app built with **Laravel (API/backend)** and a modern **React + Inertia.js frontend** using **TailwindCSS**, **Radix UI**, **Vite**, and **TypeScript**. It includes authentication, company and job listing management, a reusable UI component system, and developer-friendly testing and linting setup.

---

## 🎥 Demo

Watch the demo video here: **[Demo Video Link](https://jam.dev/c/8473c7a0-dee5-40d5-bf62-64afe820a931)**  

---

## 🚀 Tech Stack

- **Laravel** (backend API)
- **Inertia.js + React 19** (frontend SPA framework)
- **TailwindCSS v4 + Tailwind Plugins**
- **Radix UI & Lucide Icons**
- **Vite** for lightning-fast builds and HMR
- **TypeScript** for type safety
- **Jest + Testing Library** for unit testing
- **ESLint + Prettier** with plugins for Tailwind & import sorting

---

## 📦 Getting Started

### 1. Clone & Setup Laravel Backend

```bash
git clone https://github.com/your-username/wisejobs.git
cd wisejobs
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
```

> Ensure your `.env` is properly configured with database credentials.

---

### 2. Install Frontend Dependencies

```bash
npm install
npm run build  # or: npm run dev
```

---

### 3. Run the Development Server

```bash
# In one terminal
php artisan serve

# In another terminal
npm run dev
```

Visit: [http://localhost:8000](http://localhost:8000)

---

## 🧪 Testing

This project uses **Jest** and **React Testing Library** for frontend unit tests.

```bash
npm run test
```

---

## 🛠️ Available Scripts

| Command              | Description                                 |
|----------------------|---------------------------------------------|
| `npm run dev`        | Start the Vite development server           |
| `npm run build`      | Build frontend for production               |
| `npm run test`       | Run Jest test suite                         |
| `npm run lint`       | Lint and auto-fix code                      |
| `npm run format`     | Format files using Prettier                 |
| `npm run format:check` | Check formatting without changing files  |
| `npm run types`      | Run TypeScript type checks                  |

---

## 📁 Folder Structure

```
resources/
├── js/
│   ├── components/      # Reusable UI components (Form, Table, etc.)
│   ├── pages/           # Inertia pages (companies, jobs, settings)
│   ├── layouts/         # AppLayout and shared layout elements
│   └── types/           # TypeScript interfaces
└── css/                 # Tailwind styles and plugins
```

---

## 🧩 Features

- ✅ Company & Job Listings CRUD
- ✅ Reusable Table and Form components
- ✅ Tailwind theme classes (e.g., `bg-card`, `text-muted`)
- ✅ Strong typing with TypeScript
- ✅ ESLint + Prettier for consistent code
- ✅ Unit-tested components (Jest + Testing Library)
- 🔄 Vite-powered fast development

---

## ✅ To-Do

- [ ] Add login with permissions for different types of users
- [ ] Add filters, search, and pagination to job list
- [ ] Add company logos / avatars
- [ ] Setup CI/CD pipeline with GitHub Actions

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [Laravel](https://laravel.com/)
- [React](https://reactjs.org/)
- [Inertia.js](https://inertiajs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)