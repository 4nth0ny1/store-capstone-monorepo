# Store Inventory Monorepo

Backend + frontend monorepo for a simple store inventory system.

- **Backend:** Java 17, Spring Boot 3, SQLite, REST API
- **Frontend:** React, TypeScript, Vite, Redux
- **DevOps-friendly:** Docker, docker-compose, clear separation of services

The goal is to model a realistic store inventory stack that could be extended with CI/CD, monitoring, and cloud deployment later.

---

## Project Structure

```text
.
├─ backend/          # Spring Boot REST API + SQLite (store.db)
│  ├─ src/main/java/com/example/store/
│  │   ├─ product/   # Product entity, service, controller
│  │   ├─ store/     # Store entity, service, controller
│  │   ├─ inventory/ # Inventory entity, service, controller
│  │   └─ HomeController.java
│  ├─ src/main/resources/
│  │   ├─ application.properties  # SQLite + JPA config
│  │   └─ data.sql                # Seed products
│  ├─ pom.xml
│  └─ Dockerfile
│
├─ frontend/         # React + TypeScript + Vite SPA
│  ├─ src/
│  │   ├─ pages/     # Home, Products, Stores, Inventory, etc.
│  │   ├─ components/
│  │   └─ redux/     # Reducers + actions for products, stores, inventory
│  ├─ package.json
│  └─ Dockerfile     # nginx serving built Vite `dist`
│
└─ docker-compose.yml
```
