/*
    Notes:
      FUDD = Functions Up Data Down

      Production Build (build folder)
        npm run build
      
      You may serve it (production build) with a static server:
        npm install -g serve
        serve -s build

      Run json-server mock backend
        - Pre defined script in package.json (json-server --watch db.json --port 5000)
            npm run server

        - endpoints

            GET http://localhost:5000/tasks 

      React routing:
        - Installing react router DOM
            npm i react-router-dom
  */

////////////////////// Functional Component Approach //////////////////////
import { useState, useEffect } from "react"; // useEffect is used if we want something to happen when the page loads
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks");
    const data = await response.json();
    return data;
  };

  // Fetch Task /  Fetching a single task by id
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();
    return data;
  };

  // Add Task
  const addTask = async (task) => {
    /*
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
    */

    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    setTasks([...tasks, data]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    // Just filtering out the task which is required to be deleted
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await response.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          "No Tasks to Show"
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

////////////////////// Class Component Approach //////////////////////
/*
import React from 'react';

class App extends React.Component {
  render () {
    return <h1>Hello from a class</h1>
  }
}

export default App;
*/
