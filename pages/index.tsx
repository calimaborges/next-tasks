import { FrontendTask } from "../libs/tasks/task";
import TaskCard from "../components/task-card";
import listTasks from "../libs/tasks/list-tasks";

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
  return (
    <div className="p-4">
      <form action="/api/task" method="post">
        <input type="text" name="title" required placeholder="New task" />
      </form>
      <ol className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </ol>
    </div>
  );
}
