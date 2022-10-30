import { ObjectId } from "mongodb";
import { mongoCollection, mongoConnect, mongoDisconnect } from "../mongo";
import Direction from "./direction";

const minimumIncrement = 1;

export default async function moveTask(taskId: string, direction: Direction) {
  const connection = await mongoConnect();
  const collection = mongoCollection(connection);
  try {
    const increment =
      direction === Direction.UP ? minimumIncrement : -minimumIncrement;
    await collection.updateOne(
      { _id: new ObjectId(taskId) },
      { $inc: { order: increment } }
    );
  } finally {
    await mongoDisconnect(connection);
  }
}
