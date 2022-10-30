import { ObjectId } from "mongodb";
import { mongoCollection, mongoConnect, mongoDisconnect } from "../mongo";
import { FrontendTask } from "./task";

const minimumIncrement = 0.0000000000001

export default async function saveTask({ _id, title }: Partial<FrontendTask>) {
  const connection = await mongoConnect();
  const collection = mongoCollection(connection);
  try {
    if (_id) {
      const query = _id ? { _id: new ObjectId(_id) } : {};
      const update = { $set: { title, updated_at: new Date() } };
      return await collection.updateOne(query, update);
    } else { 
      const result = await collection.find().sort({ order: -1 }).limit(1).toArray();
      const order = result.length > 0 ? result[0].order : -Number.MAX_VALUE;
      return await collection.insertOne({
        title: title!,
        created_at: new Date(),
        updated_at: new Date(),
        order: order + 1.0,
        tags: [],
      });
    }
  } finally {
    await mongoDisconnect(connection);
  }
}
