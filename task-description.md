# Full-Stack Task: Next.js + NestJS GraphQL Project

## 📌 Project Overview
Build a full-stack **Character Management Application** using **Next.js** for the frontend and **NestJS** for the backend. The application will use **GraphQL** end-to-end and allow users to view and filter characters based on various attributes.

---

## 🛠 Backend Requirements (NestJS)

### Tech Stack
- **NestJS**
- **GraphQL**
- **Prisma ORM**
- Database of your choice (SQLite / PostgreSQL acceptable)

### Data Model
Create a `Character` entity with the following fields:
- `id`
- `image` (string – image URL)
- `name` (string)
- `status` (enum: `ALIVE`, `DEAD`, `UNKNOWN`)
- `gender` (enum: `MALE`, `FEMALE`, `UNKNOWN`)
- `description` (string)

### GraphQL API
- Implement GraphQL queries to fetch characters.
- Support filtering:
  - By `status`
  - By `gender`
  - Text search on **name** and **description**
- Filters must be applied server-side via GraphQL.

### Seeder
- Implement a **Prisma seeder**.
- Seed the database with enough character data to properly test:
  - Filtering
  - Searching
- Seeder must be easy to run locally.

---

## 🎨 Frontend Requirements (Next.js)

### Tech Stack
- **Next.js**
- **GraphQL**
- **GraphQL Code Generator**
- **React Query**
- **nuqs** (for URL-based state management)

### Data Handling
- Use **GraphQL Codegen** to generate fully typed queries and hooks.
- Use **React Query** for:
  - Data fetching
  - Caching
  - Loading and error states
- Use **nuqs** to sync filters and search values with URL query parameters.

### UI Requirements
Display characters in a **clean, modern, and responsive UI**.

Each character card must show:
- Image
- Name
- Status
- Gender
- Short description

### Filtering UI
- Dropdown or selector for:
  - Status (`Alive`, `Dead`, `Unknown`)
  - Gender (`Male`, `Female`, `Unknown`)
- Text input to search by:
  - Name
  - Description
- Filters and search must:
  - Update the URL using **nuqs**
  - Trigger GraphQL refetch via **React Query**

---

## 🔄 Data Flow
- Frontend communicates **only** with the NestJS GraphQL API.
- All filtering and searching logic must be handled by the backend.
- No client-side-only filtering.

---

## ✅ General Expectations
- Clean, readable, and well-structured code
- Proper project structure and best practices
- Easy local setup and testing
- Meaningful commit history (if using Git)

---

## 🚀 Deliverables
- NestJS backend with Prisma, GraphQL, and seeder
- Next.js frontend with GraphQL, Codegen, React Query, and nuqs
- Clear instructions to run both projects locally
