"use client";

import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { TbTrash } from "react-icons/tb";

export const ToDoForm = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todos, setTodos] = useState<
    {
      id: string;
      date: string;
      title: string;
      isDone: boolean;
    }[]
  >([]);

  useEffect(() => {
    // コンポーネントがマウントされた後にlocalStorageからデータを取得
    const today = dayjs().format("YYYY-MM-DD");
    const storedTodos = localStorage.getItem(today);
    // 今日の日付じゃないデータを削除
    const allKeys = Object.keys(localStorage);
    allKeys.forEach((key) => {
      if (key !== today) {
        localStorage.removeItem(key);
      }
    });
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = () => {
    if (todoInput && !todos.some((todo) => todo.title === todoInput)) {
      const newTodo = {
        id: Date.now().toString(),
        date: dayjs().format("YYYY-MM-DD"),
        title: todoInput,
        isDone: false,
      };
      const newTodos = [...todos, newTodo];
      localStorage.setItem(newTodo.date, JSON.stringify(newTodos));
      setTodos(newTodos);
      setTodoInput("");
    } else if (todoInput === "") {
      alert("タスクを入力してください");
    } else {
      alert("既に同じタスクがあります");
    }
  };

  const handleDeleteTodo = (id: string) => {
    localStorage.removeItem(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCheckTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.isDone = !todo.isDone;
      localStorage.setItem(id, JSON.stringify(todo));
      setTodos(todos);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-4 flex-nowrap">
        <input
          type="text"
          id="todoInput"
          placeholder="タスクを入力"
          value={todoInput}
          onChange={(event) => setTodoInput(event.target.value)}
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
        <ul className="main-border p-2 rounded-md">
          {todos
            .filter((todo) => todo.date === dayjs().format("YYYY-MM-DD"))
            .map((todo, index) => (
              <li
                key={todo.id}
                className={`flex items-center p-3 justify-between ${
                  index !== 0 ? "border-t border-gray-400" : ""
                }`}
              >
                <p className="text-lg">{todo.title}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="cursor-pointer"
                  >
                    <TbTrash className="w-6 h-6 text-red-600 hover:text-red-800" />
                  </button>
                  <input
                    type="checkbox"
                    className="w-6 h-6 rounded-lg cursor-pointer"
                    onChange={() => handleCheckTodo(todo.id)}
                  />
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-lg">タスクはありません</p>
      )}
    </div>
  );
};
