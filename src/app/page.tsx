import { ToDoForm } from "./TodoForm";
import dayjs from "dayjs";

export default function ToDoAppPage() {
  return (
    <div className=" w-lg m-auto bg-white p-5 rounded-xl flex flex-col gap-4 shadow-xl">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-3xl ">To Do App</h1>
        <p className="text-lg">
          〜{dayjs().format("YYYY年MM月DD日")}のタスク〜
        </p>
      </div>
      <ToDoForm />
    </div>
  );
}
