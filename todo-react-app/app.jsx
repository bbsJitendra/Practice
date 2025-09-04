const { useState } = React;

function TodoApp() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: Date.now(), text: trimmed, completed: false }]);
    setText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a task"
            value={text}
            onChange={e => setText(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex items-center justify-between border-b last:border-b-0 pb-2"
            >
              <label
                className={`flex items-center gap-2 ${task.completed ? 'line-through text-gray-400' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600"
                />
                {task.text}
              </label>
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TodoApp />);
