import { useState } from 'react';
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Start editing a task
  const startEditingTask = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditedTaskText(taskText);
  };

  // Save the edited task
  const saveEditedTask = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, text: editedTaskText } : task
      )
    );
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTaskKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const handleSaveEditKeyPress = (e, taskId) => {
    if (e.key === 'Enter') {
      saveEditedTask(taskId);
    }
  };


  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={handleAddTaskKeyPress} // Use onKeyDown
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {editingTaskId === task.id ? (
              // Edit mode
              <div className="edit-task">
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  onKeyDown={(e) => handleSaveEditKeyPress(e, task.id)} // Use onKeyDown
                />
                <button onClick={() => saveEditedTask(task.id)}>Save</button>
              </div>
            ) : (
              // View mode
              <>
                <span
                  className="task-text"
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.text}
                </span>
                <div className="task-actions">
                  <button
                    className="edit-button"
                    onClick={() => startEditingTask(task.id, task.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;