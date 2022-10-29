import listTasks from "../libs/tasks/list-tasks";
import type { FrontendTask } from "../libs/tasks/task";
import DeleteButton from "./delete-button";

async function getData(): Promise<{ tasks: FrontendTask[] }> {
  const tasks = await listTasks();
  return {
    tasks: tasks.map((task) => ({
      ...task,
      _id: task._id?.toString() ?? null,
      created_at: task.created_at.toString(),
      updated_at: task.updated_at.toString(),
    })),
  };
}

export default async function Home() {
  const { tasks } = await getData();

  return (
    <div className="p-4">
      <form action="/api/task" method="post">
        <input type="text" name="title" required placeholder="New task" />
      </form>
      <ol>
        {tasks.map((task) => (
          <li key={task._id} className="flex">
            <form
              action={`/api/task/${task._id}`}
              method="post"
              className="m-0"
            >
              <input type="text" name="title" defaultValue={task.title} />
            </form>
            <DeleteButton task={task} />
          </li>
        ))}
      </ol>
    </div>
  );
}
