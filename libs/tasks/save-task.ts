import { ObjectId } from "mongodb";
import { mongoCollection, mongoConnect, mongoDisconnect } from "../mongo";
import { FrontendTask } from "./task";

const verySmallNumber = -999_999_999_999;
const reasonableIncrement = 1_000_000;

export default async function saveTask({ _id, title }: Partial<FrontendTask>) {
  const connection = await mongoConnect();
  const collection = mongoCollection(connection);
  try {
    if (_id) {
      return await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { title, updated_at: new Date() } }
      );
    } else {
      const result = await collection
        .find()
        .sort({ order: -1 })
        .limit(1)
        .toArray();
      const order = result.length > 0 ? result[0].order : verySmallNumber;
      return await collection.insertOne({
        title: title!,
        created_at: new Date(),
        updated_at: new Date(),
        order: order + reasonableIncrement,
        tags: [],
      });
    }
  } finally {
    await mongoDisconnect(connection);
  }
}
