import { ObjectId } from "mongodb";

export type FrontendTask = {
  _id: string;
  title: string;
  tags: string[];
  order: number;
  created_at: string;
  updated_at: string;
}

export type Task = {
  _id?: ObjectId;
  title: string;
  tags: string[];
  order: number;
  created_at: Date;
  updated_at: Date;
};
