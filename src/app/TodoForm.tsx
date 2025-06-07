"use client";

import { useState, useEffect } from "react";

export const ToDoForm = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    // コンポーネントがマウントされた後にlocalStorageからデータを取得
    const storedTodos = Object.keys(localStorage);
    setTodos(storedTodos);
  }, []);

  const handleAddTodo = () => {
    if (task && !todos.includes(task)) {
      localStorage.setItem(task, task);
      setTodos([...todos, task]);
      setTask("");
    } else if (task === "") {
      alert("タスクを入力してください");
    } else {
      alert("既に同じタスクがあります");
    }
  };

  const handleDeleteTodo = (task: string) => {
    localStorage.removeItem(task);
    setTodos(todos.filter((todo) => todo !== task));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-4 flex-nowrap">
        <input
          type="text"
          id="task"
          placeholder="タスクを入力"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          className="main-border flex-1 p-2 rounded-lg"
        />
        <button
          onClick={handleAddTodo}
          className="normal-button bg-blue-500 text-white"
        >
          追加
        </button>
      </div>
      {todos.length !== 0 ? (
        <ul className="main-border p-4 rounded-md">
          {todos.map((todo) => (
            <li key={todo} className="py-1 flex items-center justify-between">
              <p className="text-lg">{todo}</p>
              <input
                type="checkbox"
                className="w-6 h-6 rounded-lg cursor-pointer"
                onClick={() => handleDeleteTodo(todo)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg">タスクはありません</p>
      )}
    </div>
  );
};
