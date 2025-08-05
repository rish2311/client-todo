import { useState } from 'react';
import axios from '../../services/api';
import { getToken } from '../../utils/token';

export default function TodoForm({ listId, refresh }) {
  const [text, setText] = useState('');

  const handleAddItem = async () => {
    if (!text.trim()) return;
    await axios.post(`/todos/${listId}/items`, { text }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setText('');
    refresh();
  };

  return (
    <div className="flex mb-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add item"
        className="input flex-1"
      />
      <button onClick={handleAddItem} className="btn-primary ml-2">Add</button>
    </div>
  );
}
