import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { Todo } from "../../models/Todo";

export class TodoApi {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  public async findAll(): Promise<Array<Todo>> {
    const response: AxiosResponse = await this.axios.get("/todos");
    console.debug(response);

    if (response.status !== 200) {
      console.log("get: todos error");
      return new Array();
    }

    const todos: Array<Todo> = new Array();
    response.data.forEach((value: any) => {
      const todo: Todo = new Todo(value._id, value.title, value.completed);
      todos.push(todo);
    });
    return todos;
  }

  public async save(todo: Todo): Promise<void> {
    const response: AxiosResponse = await this.axios.post("/todos", { todo: todo });
    console.debug(response);

    if (response.status !== 200) {
      console.log("post: todos error");
      return;
    }
    return;
  }

  public async update(todo: Todo): Promise<void> {
    const response: AxiosResponse = await this.axios.put("/todos/" + todo.id, { todo: todo });
    console.debug(response);

    if (response.status !== 200) {
      console.log("put: todos error");
      return;
    }
    return;
  }

  public async remove(todo: Todo): Promise<void> {
    const response: AxiosResponse = await this.axios.delete("/todos/" + todo.id);
    console.debug(response);

    if (response.status !== 200) {
      console.log("delete: todos error");
      return;
    }
    return;
  }

}