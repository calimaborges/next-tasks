import { MongoClient } from "mongodb";
import { Task } from "./tasks/task";

const mongoUri = "mongodb://localhost:27017";

export function mongoConnect() {
  return MongoClient.connect(mongoUri, { socketTimeoutMS: 5000 });
}

export function mongoDisconnect(connection: MongoClient) {
  return connection.close();
}

export function mongoCollection(connection: MongoClient) {
  return connection.db().collection<Task>("tasks");
}
