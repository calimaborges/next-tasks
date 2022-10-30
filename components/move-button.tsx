import Direction from "../libs/tasks/direction";
import { FrontendTask } from "../libs/tasks/task";

type Props = {
  task: FrontendTask;
  direction: Direction;
};

export default function MoveButton({ task, direction }: Props) {
  async function moveHandler() {
    await fetch(`/api/move-task?id=${task._id}&direction=${direction}`, {
      method: "post",
    });
    location.reload();
  }

  return (
    <button onClick={moveHandler}>
      [{direction === Direction.UP ? "up" : "down"}]
    </button>
  );
}
