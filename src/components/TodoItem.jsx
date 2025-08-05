export default function TodoItem({ item, onUpdate, onDelete }) {
  return (
    <div className="flex items-center justify-between p-2 border rounded mb-2">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onUpdate({ ...item, completed: !item.completed })}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none"
      />
      <span className={`flex-1 ml-2 ${item.completed ? 'line-through text-gray-500' : ''}`}>
        {item.text}
      </span>
      <button onClick={onDelete} className="text-red-500 hover:underline ml-2">Delete</button>
    </div>
  );
}
