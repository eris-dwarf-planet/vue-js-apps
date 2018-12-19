import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { Todo } from "../../models/Todo";
import { TodoFilters } from "../../services/todo/filters";
import { TodoApi } from "../../services/todo/api";

import { TodoHeader } from "./header";
import { TodoMain } from "./main";
import { TodoFooter } from "./footer";

import * as Template from "./index.html";

@Template
@Component({
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter
  },
})
export class App extends Vue {
  private api: TodoApi;
  private todos: Array<Todo>;
  private visibility: string;

  constructor() {
    super();
    this.api = new TodoApi();
    this.todos = new Array();
    this.visibility = "all";
    this.api.findAll().then((todos: Array<Todo>) => {
      todos.forEach((todo: Todo) => {
        this.todos.push(todo);
      });
    });
  }

  @Watch("todos")
  public onPropertyChanged(value: Array<Todo>, oldValue: Array<Todo>): void {
    console.log(value);
  }

  public handleAddTodo(todo: Todo): void {
    this.todos.push(todo);
    this.api.save(todo);
    this.refresh();
  }

  public handleEditTodo(todo: Todo): void {
    todo.title = todo.title.trim();
    this.api.update(todo);
  }

  public handleRemoveTodo(todo: Todo): void {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.api.remove(todo);
  }

  public handleRemoveCompleted(): void {
    const filters = new TodoFilters(this.todos);
    const completedTodos = filters.completed();
    this.todos = filters.active();

    completedTodos.forEach((todo: Todo) => {
      this.api.remove(todo);
    });
  }

  public onHashChange(): void {
    const visibility: string = window.location.hash.replace(/#\/?/, "");
    if (TodoFilters.valid(visibility)) {
      this.visibility = visibility;
    } else {
      window.location.hash = "";
      this.visibility = "all";
    }
  }

  private refresh(): void {
    this.api.findAll().then((todos: Array<Todo>) => {
      this.todos = new Array();
      todos.forEach((todo: Todo) => {
        this.todos.push(todo);
      });
    });
  }

}
