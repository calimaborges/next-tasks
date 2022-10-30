import { ObjectId } from "mongodb";
import { mongoCollection, mongoConnect, mongoDisconnect } from "../mongo";

export default async function moveTask(from: string, to: string) {
  const connection = await mongoConnect();
  const collection = mongoCollection(connection);
  try {
    const fromTask = await collection.findOne({ _id: new ObjectId(from) });
    if (!fromTask) throw new Error(`Task ${from} não encontrada`);

    const toTask = await collection.findOne({ _id: new ObjectId(to) });
    if (!toTask) throw new Error(`Task ${to} não encontrada`);

    const toPrevTask = await collection.findOne({ next: toTask._id });
    const fromPrevTask = await collection.findOne({ next: fromTask._id });

    // from.next = to;
    await collection.updateOne(
      { _id: fromTask._id },
      { $set: { next: toTask._id, updated_at: new Date() } }
    );

    // toPrev && toPrev.next = from;
    if (toPrevTask) {
      await collection.updateOne(
        { _id: toPrevTask._id },
        { $set: { next: fromTask._id, updated_at: new Date() } }
      );
    }

    // fromPrev && fromPrev.next = from.next;
    if (fromPrevTask) {
      await collection.updateOne(
        { _id: fromPrevTask._id },
        { $set: { next: fromTask.next, updated_at: new Date() } }
      );
    }
  } finally {
    await mongoDisconnect(connection);
  }
}
