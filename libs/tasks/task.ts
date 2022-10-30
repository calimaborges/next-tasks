import { ObjectId } from "mongodb";

export type FrontendTask = {
  _id: string;
  title: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  order: number;
}

export type Task = {
  _id?: ObjectId;
  title: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
  order: number;
};
