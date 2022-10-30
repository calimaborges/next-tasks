import { useRef } from "react";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import classnames from "../libs/classnames";
import { FrontendTask } from "../libs/tasks/task";
import DeleteButton from "./delete-button";

type Props = {
  task: FrontendTask;
};

export default function TaskCard({ task }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  async function moveTask(from: string, to: string) {
    await fetch(`/api/move-task?from=${from}&to=${to}`, { method: "post" });
    location.reload();
  }

  const [{ handlerId }, drop] = useDrop<
    FrontendTask,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "TASK",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    drop: (item) => {
      if (!ref.current) return;

      const dragId = item._id;
      const hoverId = task._id;

      moveTask(dragId, hoverId);
    },
  });
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: () => {
      return { _id: task._id };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  drag(drop(ref));
  return (
    <li
      className={classnames(
        "flex items-center gap-1",
        isDragging && "opacity-50 border"
      )}
      data-handler-id={handlerId}
      ref={ref}
    >
      <small className="text-gray-400 font-mono">{task.order}</small>
      <small className="text-gray-500 font-mono">{task._id}</small>
      <form action={`/api/task/${task._id}`} method="post">
        <input type="text" name="title" defaultValue={task.title} />
      </form>
      <DeleteButton task={task} />
    </li>
  );
}
