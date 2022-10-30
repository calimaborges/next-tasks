import { FrontendTask } from "../libs/tasks/task";

type Props = {
  task: FrontendTask;
};

export default function DeleteButton({ task }: Props) {
  async function deleteHandler() {
    await fetch(`/api/task/${task._id}`, { method: "delete" });
    location.reload();
  }

  return <button onClick={deleteHandler}>[delete]</button>;
}
