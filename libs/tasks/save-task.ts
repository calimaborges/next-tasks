import { ObjectId } from "mongodb";
import { mongoCollection, mongoConnect, mongoDisconnect } from "../mongo";
import { FrontendTask } from "./task";

export default async function saveTask({ _id, title }: Partial<FrontendTask>) {
  const connection = await mongoConnect();
  const collection = mongoCollection(connection);
  try {
    if (_id) {
      const query = _id ? { _id: new ObjectId(_id) } : {};
      console.log({ query });
      const update = { $set: { title, updated_at: new Date() } };
      return await collection.updateOne(query, update);
    } else { 
      const result = await collection.find().sort({ order: -1}).limit(1).toArray();
      const order = result.length > 0 ? result[0].order : 0;
      return await collection.insertOne({
        title: title!,
        created_at: new Date(),
        updated_at: new Date(),
        order: order + 1,
        tags: [],
      });
    }
  } finally {
    await mongoDisconnect(connection);
  }
}
