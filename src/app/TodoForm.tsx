"use client";

import { useState } from "react";

export const ToDoForm = () => {
  const [task, setTask] = useState<string>("");
  const [toDoList, setToDoList] = useState<string[]>([]);

  const handleAddTodo = () => {
    if (task) {
      setToDoList([...toDoList, task]);
      setTask("");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-4 flex-nowrap">
        <input
          type="text"
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
      {toDoList.length !== 0 && (
        <ul className="main-border p-4 rounded-md">
          {toDoList.map((todo, index) => (
            <li
              key={todo}
              className={`py-4 flex items-center justify-between ${
                index !== toDoList.length - 1 ? "border-b border-gray-400" : ""
              }`}
            >
              <p className="text-lg">{todo}</p>
              <input type="checkbox" className="w-6 h-6 rounded-lg" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
