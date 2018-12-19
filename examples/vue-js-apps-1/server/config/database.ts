import * as mongoose from "mongoose";

// mongoose.connect("mongodb://localhost/todo_db");
mongoose.connect("mongodb://todos-mongo/todo_db");

export { mongoose };
