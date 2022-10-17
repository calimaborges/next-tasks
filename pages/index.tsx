import type { NextPage } from "next";
import { SyntheticEvent } from "react";
import listTasks from "../libs/tasks/list-tasks";
import { FrontendTask } from "../libs/tasks/task";

type Props = {
  tasks: FrontendTask[];
};

export async function getServerSideProps() {
  const tasks = await listTasks();
  return {
    props: {
      tasks: tasks.map((task) => ({
        ...task,
        _id: task._id?.toString() ?? null,
        created_at: task.created_at.toString(),
        updated_at: task.updated_at.toString(),
      })),
    },
  };
}

export default function Home({ tasks }: Props) {
  function createDeleteHandler(id: string) {
    return async function deleteHandler() {
      await fetch(`/api/task/${id}`, { method: "delete" });
      location.reload();
    };
  }

  return (
    <div className="p-4">
      <form action="/api/task" method="post">
        <input type="text" name="title" required placeholder="New task" />
      </form>
      <ol>
        {tasks.map((task) => (
          <li key={task._id} className="flex">
            {task.order}: 
            <form action={`/api/task/${task._id}`} method="post">
              <input type="text" name="title" defaultValue={task.title} />
            </form>
            <button onClick={createDeleteHandler(task._id)}>[delete]</button>
          </li>
        ))}
      </ol>
    </div>
  );
}
