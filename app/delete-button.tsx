"use client";

import type { FrontendTask } from "../libs/tasks/task";

type Props = {
  task: FrontendTask;
};

export default function DeleteButton({ task }: Props) {
  async function deleteHandler() {
    if (task._id !== null) {
      await fetch(`/api/task/${task._id}`, { method: "delete" });
    }
    location.reload();
  }
  return <button type="button" onClick={deleteHandler}>[delete]</button>;
}