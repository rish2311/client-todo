export default function TodoItem({ item, onUpdate, onDelete }) {
  return (
    <div className="flex items-center justify-between p-2 border rounded mb-2">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onUpdate({ ...item, completed: !item.completed })}
      />
      <span className={`flex-1 ml-2 ${item.completed ? 'line-through text-gray-500' : ''}`}>
        {item.text}
      </span>
      <button onClick={onDelete} className="text-red-500 hover:underline ml-2">Delete</button>
    </div>
  );
}
