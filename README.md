# Smart Todo App

A full-stack todo application with smart features including deadline management, task status tracking, and automatic status updates.

## Features

- 📝 Create, read, update, and delete tasks
- ⏰ Set deadlines for tasks with date and time
- 📊 Track task status (Ongoing, Success, Failure)
- 🔄 Automatic status updates based on deadlines
- 🎨 Modern and responsive UI
- 🔒 Input validation for deadlines

## Tech Stack

### Frontend
- React.js
- React Bootstrap
- React DatePicker
- Axios for API calls
- Tailwind CSS

### Backend
- Django
- Django REST Framework
- SQLite Database
- CORS headers for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn
- pip

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smart-todo-app.git
cd smart-todo-app
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On macOS/Linux
# or
.\venv\Scripts\activate  # On Windows

pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

3. Set up the frontend (in a new terminal):
```bash
cd frontend
npm install
npm start
```

## Usage

1. Access the application at `http://localhost:3000`
2. Create new tasks with titles, descriptions, and deadlines
3. View tasks in different status categories (Ongoing, Success, Failure)
4. Mark tasks as complete or delete them as needed

## API Endpoints

- `GET /api/tasks/` - Get all tasks
- `POST /api/tasks/` - Create a new task
- `PUT /api/tasks/<id>/` - Update a task
- `DELETE /api/tasks/<id>/` - Delete a task
- `POST /api/tasks/<id>/complete/` - Mark a task as complete
- `GET /api/tasks/update_statuses/` - Update task statuses based on deadlines

## Project Structure

```
smart-todo-app/
├── backend/
│   ├── tasks/              # Django app for task management
│   ├── todo_backend/       # Django project settings
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── api/           # API service
    │   └── App.js         # Main application component
    ├── public/
    └── package.json
```
