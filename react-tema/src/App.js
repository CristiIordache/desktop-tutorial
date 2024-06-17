import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, isFavorite: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const handleToggleFavorite = (index) => {
    const newTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, isFavorite: !task.isFavorite } : task
    );
    setTasks(newTasks);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const newTasks = [...tasks];
      [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
      setTasks(newTasks);
    }
  };

  const handleMoveDown = (index) => {
    if (index < tasks.length - 1) {
      const newTasks = [...tasks];
      [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
      setTasks(newTasks);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adaugă o sarcină nouă"
          />
          <button onClick={handleAddTask}>Adaugă</button>
        </div>
        <ol className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={`task-item ${task.isFavorite ? 'favorite' : ''}`}>
              {task.text}
              <div>
                <button onClick={() => handleToggleFavorite(index)}>
                  {task.isFavorite ? '★' : '☆'}
                </button>
                <button onClick={() => handleMoveUp(index)}>▲</button>
                <button onClick={() => handleMoveDown(index)}>▼</button>
                <button onClick={() => handleDeleteTask(index)}>Șterge</button>
              </div>
            </li>
          ))}
        </ol>
      </header>
    </div>
  );
}

export default App;
