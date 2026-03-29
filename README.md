# 🗂️ Kanban Board Application

A simple and interactive **Kanban Board** built using **Next.js** that supports **multi-user authentication**, **drag-and-drop task management**, and **persistent storage using localStorage**.

---

## 🚀 Features

* 🔐 Multi-user Login & Registration (Username & Password)
* 📋 Create Tasks in "To Do" column
* 🔄 Drag & Drop tasks between:

  * To Do
  * In Progress
  * Done
* 💾 Persistent storage using localStorage
* 👤 User-specific task management
* 🚪 Logout functionality

---

## 🧠 Tech Stack

* **Frontend:** Next.js (React)
* **Drag & Drop:** @hello-pangea/dnd
* **State Management:** React Hooks (useState, useEffect)
* **Storage:** Browser localStorage

---

## 📁 Project Structure

```
kanban-board/
│
├── app/
│   ├── page.js            # Main Kanban Board
│   ├── login/page.js      # Login Page
│   ├── register/page.js  # Registration Page
│
├── components/
│   ├── Column.js         # Column (To Do, In Progress, Done)
│   ├── TaskCard.js       # Individual Task
│   ├── AddTask.js        # Add Task Input
│
├── package.json
```

---

## ⚙️ How to Run Locally

1. Clone the repository:

```
git clone <your-repo-link>
cd kanban-board
```

2. Install dependencies:

```
npm install
```

3. Start development server:

```
npm run dev
```

4. Open in browser:

```
http://localhost:3000
```

---

## 🔑 How It Works

### 🔐 Authentication

* Users can register with a username and password.
* Credentials are stored in localStorage.
* On login, the user session is saved as `currentUser`.

---

### 📦 Task Management

* Each user has a separate task board.
* Tasks are stored using dynamic keys:

```
tasks_<userId>
```

---

### 🔄 Drag and Drop

* Implemented using `@hello-pangea/dnd`.
* Users can move tasks between columns.
* State updates automatically when a task is dropped.

---

### 💾 Data Persistence

* Tasks and user data are stored in localStorage.
* Data persists even after page refresh or logout/login.

---

## 🧩 Design Decisions

* Used **column-based state structure** (`todo`, `inProgress`, `done`) for simplicity.
* Used **localStorage** instead of backend for quick setup and persistence.
* Used **dynamic storage keys** to isolate user data.

---

## 🔮 Future Improvements

* 🔐 Backend authentication (JWT / Sessions)
* 🗄️ Database integration (MongoDB / PostgreSQL)
* ✏️ Edit and delete tasks
* 📱 Responsive UI improvements
* 🌐 Deployment (Vercel)

---

## ⚠️ Note

This project uses **localStorage-based authentication**, which is suitable for demonstration purposes only.
In a production environment, secure backend authentication should be implemented.

---

## 👨‍💻 Author

* Udhaya Kiran

---

## ⭐ Acknowledgment

This project was built as part of a **Full Stack Developer Internship Assignment** to demonstrate frontend development skills and interactive UI design.

---
