# 🚀 AI Book Explorer

**AI Book Explorer** is a full-stack, production-grade web application that leverages modern AI agents to transform how users discover, manage, and interact with books. Built for Fig Labs’ Front-End Software Engineer assignment, this project demonstrates advanced proficiency in Next.js, TypeScript, Redux Toolkit, Tailwind CSS, and seamless AI integration using LangGraph and CopilotKit.

<img width="1440" alt="Screenshot 2025-05-19 at 1 28 39 PM" src="https://github.com/user-attachments/assets/af464e8f-f22f-4929-a342-bed0cc22ae5a" />
<img width="1440" alt="Screenshot 2025-05-19 at 1 28 51 PM" src="https://github.com/user-attachments/assets/8903c841-3cb7-4235-8f17-14aa191836fe" />
<img width="671" alt="Screenshot 2025-05-19 at 1 29 27 PM" src="https://github.com/user-attachments/assets/5e2d8dcc-4284-4901-823e-6e52ab2b9777" />
<img width="1440" alt="Screenshot 2025-05-19 at 1 29 40 PM" src="https://github.com/user-attachments/assets/92602b8c-d3a0-4664-84cf-b6f98c346211" />
<img width="1440" alt="Screenshot 2025-05-19 at 1 29 48 PM" src="https://github.com/user-attachments/assets/13e187fb-b3d5-43e6-b67c-2cc8459c58e3" />


---

## 📺 Demo

[▶️ Watch the Demo Video]([https://your-demo-link.com](https://github.com/user-attachments/assets/baf6ec10-9d1c-495a-8456-b4441a7bfd56))
https://github.com/user-attachments/assets/baf6ec10-9d1c-495a-8456-b4441a7bfd56

---

## 🧑‍💻 Assignment Overview

> **Fig Labs Challenge:**  
> Build a web app that enables users to chat with an AI agent for book recommendations/summaries, view book details, and add new books via a form-all backed by a persistent database and a modern, responsive UI.

---

## 🏗️ Architecture & Tech Stack

| Layer         | Technology                              | Purpose                                              |
|---------------|-----------------------------------------|------------------------------------------------------|
| Frontend      | Next.js (App Router), TypeScript        | SPA, SSR/SSG, routing, type safety                   |
| Styling       | Tailwind CSS                            | Utility-first, responsive, accessible UI             |
| State         | Redux Toolkit                           | Predictable, scalable global state                   |
| AI Agent      | LangGraph + CopilotKit                  | LLM-powered chat, agent orchestration                |
| LLM API       | Groq (free tier)                        | Book recommendations, summaries                      |
| Backend       | Next.js API Routes, Prisma ORM          | RESTful endpoints, DB access, validation             |
| Database      | PostgreSQL (can swap for SQLite)        | Persistent, relational data storage                  |
| Validation    | Zod                                     | Schema-based input validation                        |
| Testing*      | Jest, Playwright (bonus)                | Unit/integration tests                               |
| Auth*         | Supabase/Clerk/SuperTokens (bonus)      | Optional authentication                              |

\*Bonus features, see below.

---

## 🗂️ File/Directory Structure

```
ai-book-explorer/
├── agent/              # LangGraph agent logic, LLM API integration
├── app/                # Next.js App Router, API routes
├── components/         # Modular, typed React components (UI, forms, chat)
├── hooks/              # Custom React hooks
├── lib/                # Prisma client, validation, server utilities
├── prisma/             # Database schema, seed scripts (book-details.csv)
├── public/             # Static assets
├── store/              # Redux slices, store config
├── .env                # Environment variables
├── README.md
├── package.json
└── ...
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-book-explorer.git
cd ai-book-explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
# Fill in your DB connection string and Groq API key (see below)
```

#### Example `.env`
```
DATABASE_URL=postgresql://user:pass@localhost:5432/aibooks
GROQ_API_KEY=your-groq-api-key
```

### 4. Database Setup & Seeding

- **Import book-details.csv** (provided in assignment):

```bash
npx prisma migrate dev --name init
node prisma/seed.js
```

- *You may supplement with your own book entries.*

### 5. Run the App

```bash
npm run dev
```

- Visit [http://localhost:3000](http://localhost:3000)

---

## 🧠 AI Integration

- **LangGraph**: Handles conversational agent logic and workflow orchestration.
- **CopilotKit**: Provides the interactive chat UI and agent context.
- **Groq LLM API**: Powers book recommendations and summaries.
    - [Get a free API key](https://console.groq.com)

---

## 🏆 Key Features

- **Conversational AI Chat**  
  - Natural language queries for book recommendations or summaries.
  - Example: “Recommend a Mystery book” or “Summarize ‘The Silent Patient’.”

- **Book Details View**  
  - Responsive list and detail pages for each book (title, author, genre, summary).

- **Add New Books (via Chat Form)**  
  - Inline form in chat agent.
  - Validated with Zod, persisted in DB.

- **Global State Management**  
  - Redux Toolkit for app-wide state (books, user input, chat history).

- **Responsive, Accessible UI**  
  - Tailwind CSS, semantic HTML, ARIA attributes for accessibility.

- **Type Safety & Linting**  
  - End-to-end TypeScript, ESLint, Prettier.

---

## ✨ Bonus Features

- **Authentication** (Optional):  
  - Easily extendable with Supabase/Clerk/SuperTokens.
- **Testing** (Optional):  
  - Unit tests (Jest), integration/e2e (Playwright).

---

## 🧪 Example API Usage

- **GET** `/api/books` - List all books
- **POST** `/api/books` - Add a new book
- **POST** `/api/ai/chat` - Query AI agent

---

## 🚦 Design Decisions & Tradeoffs

- **Next.js App Router** for modularity, SSR/SSG, and modern React patterns.
- **Redux Toolkit** chosen for scalable, type-safe state management.
- **Prisma ORM** for type-safe DB access and easy migrations.
- **LangGraph + CopilotKit** for composable, production-ready AI chat experiences.
- **Groq LLM** for zero-cost, high-quality AI inference.

---

## 📺 Demo Video

[▶️ Watch here](https://your-demo-link.com)

---

## 📄 Resume

[Download my latest resume (PDF)](https://drive.google.com/file/d/1L4d3pGkI9FXsZixV8-fvEnCPHGBJHrSq/view?usp=sharing)

---

## 📬 Submission

- [GitHub Repository](https://github.com/ashusnapx/ai-book-explorer)
- [Demo Video](https://your-demo-link.com)
- [Resume (PDF)](https://drive.google.com/file/d/1L4d3pGkI9FXsZixV8-fvEnCPHGBJHrSq/view?usp=sharing)

---

## 🙋‍♂️ About Me

**Ashutosh**  
[LinkedIn](https://www.linkedin.com/in/ashusnapx/) | [GitHub](https://github.com/ashusnapx)

---

## 📝 License

MIT
