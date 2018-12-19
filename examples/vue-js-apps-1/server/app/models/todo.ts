import { mongoose } from "../../config/database";
import { Schema, Document, Model } from "mongoose";

export interface ITodo extends Document {
    title: string;
    completed: boolean;
    findBy(id: string): Promise<ITodo>;
}

const schema = new Schema({
    title: String,
    completed: Boolean,
    created_at: Date,
    updated_at: Date
});

schema.static("findBy", (id: string) => {
    return Todo
        .find({ id: id })
        .lean()
        .exec();
});

export type TodoModel = Model<ITodo>;
export const Todo: TodoModel = <TodoModel>mongoose.model<ITodo>("Todo", schema);
