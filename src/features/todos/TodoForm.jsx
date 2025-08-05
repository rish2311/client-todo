import { useState } from "react";
import axios from "../../services/api";
import { getToken } from "../../utils/token";

export default function TodoForm({ listId, refresh }) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = async () => {
    if (!text.trim() || isLoading) return;
    setIsLoading(true);
    try {
      await axios.post(
        `/todos/${listId}/items`,
        { text },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setText("");
      refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mb-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add item"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddItem();
        }}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none flex-1"
      />
      <button 
        onClick={handleAddItem} 
        disabled={isLoading}
        className="ml-2 px-4 py-2 rounded text-white font-medium flex items-center justify-center" 
        style={{backgroundColor: isLoading ? '#9CA3AF' : '#6366F1'}}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          'Add'
        )}
      </button>
    </div>
  );
}
