import { useEffect, useState } from "react";
import axios from "../../services/api";
import { getToken } from "../../utils/token";
import TodoItem from "../../components/TodoItem";
import TodoForm from "./TodoForm";

export default function TodoList() {
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("/todos", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setLists(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddList = async () => {
    if (!newList.trim()) return;
    await axios.post(
      "/todos",
      { name: newList },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    setNewList("");
    fetchTodos();
  };

  const handleDeleteList = async (id) => {
    await axios.delete(`/todos/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchTodos();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Todo Lists</h2>
      <div className="flex mb-4">
        <input
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
          placeholder="New list name"
          className="input flex-1"
        />
        <button onClick={handleAddList} className="btn-primary ml-2">
          Add
        </button>
      </div>
      {lists.map((list) => (
        <div key={list._id} className="border rounded mb-4 p-3">
          <div className="flex justify-between items-center mb-2">
            <input
              className="input mb-2 font-semibold"
              value={list.name}
              onChange={(e) => {
                const updatedName = e.target.value;
                setLists(
                  lists.map((l) =>
                    l._id === list._id ? { ...l, name: updatedName } : l
                  )
                );
              }}
              onBlur={async () => {
                await axios.put(
                  `/todos/${list._id}`,
                  { name: list.name },
                  {
                    headers: { Authorization: `Bearer ${getToken()}` },
                  }
                );
                fetchTodos();
              }}
            />
            <button
              onClick={() => handleDeleteList(list._id)}
              className="text-red-500 text-sm"
            >
              Delete List
            </button>
          </div>
          <TodoForm listId={list._id} refresh={fetchTodos} />
          {list.items.map((item) => (
            <TodoItem
              key={item._id}
              item={item}
              onUpdate={async (updated) => {
                await axios.put(
                  `/todos/${list._id}/items/${item._id}`,
                  updated,
                  {
                    headers: { Authorization: `Bearer ${getToken()}` },
                  }
                );
                fetchTodos();
              }}
              onDelete={async () => {
                await axios.delete(`/todos/${list._id}/items/${item._id}`, {
                  headers: { Authorization: `Bearer ${getToken()}` },
                });
                fetchTodos();
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
