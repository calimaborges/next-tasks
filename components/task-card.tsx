import Direction from "../libs/tasks/direction";
import { FrontendTask } from "../libs/tasks/task";
import DeleteButton from "./delete-button";
import MoveButton from "./move-button";

type Props = {
  task: FrontendTask;
};

export default function TaskCard({ task }: Props) {
  return (
    <li className="flex flex-col gap-1 p-2 border rounded">
      <form action={`/api/task/${task._id}`} method="post">
        <input className="p-1 w-full" type="text" name="title" defaultValue={task.title} />
      </form>
      <div className="flex gap-1 items-baseline">
        <DeleteButton task={task} />
        <MoveButton direction={Direction.UP} task={task} />
        <MoveButton direction={Direction.DOWN} task={task} />
        <small className="text-gray-400 font-mono">{task.order}</small>
        <small className="text-gray-500 font-mono">{task._id}</small>
      </div>
    </li>
  );
}
