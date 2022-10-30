import { ObjectId } from "mongodb";
import { mongoCollection, mongoConnect, mongoDisconnect } from "../mongo";
import Direction from "./direction";

const inc = 1;

export default async function moveTask(taskId: string, direction: Direction) {
  const connection = await mongoConnect();
  const collection = mongoCollection(connection);
  try {
    const task = await collection.findOne({ _id: new ObjectId(taskId) });
    if (!task) throw new Error(`Task ${taskId} not found`);

    console.log({ task });
    const increment = direction === Direction.UP ? inc : -inc;
    const clause =
      direction === Direction.UP ? { $gt: task.order } : { $lt: task.order };
    const result = await collection
      .find({ order: { ...clause } })
      .sort({ order: direction === Direction.UP ? 1 : -1 })
      .toArray();
    console.log({ result });
    if (result.length === 0) return;
    const incrementalRef = result[0];
    // console.log(incrementalRef);
    await collection.updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { order: incrementalRef.order + increment } }
    );
  } finally {
    await mongoDisconnect(connection);
  }
}
