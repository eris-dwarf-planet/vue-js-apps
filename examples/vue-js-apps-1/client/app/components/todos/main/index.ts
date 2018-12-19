import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { TodoFilters } from "../../../services/todo/filters";
import { Todo } from "../../../models/todo";

import * as Template from "./index.html";

@Template
@Component({
  directives: {
    "todo-focus": (el: any, binding: any) => {
      if (binding.value) {
        el.focus();
      }
    }
  }
})
export class TodoMain extends Vue {
  @Prop()
  private readonly todos: Array<Todo>;
  @Prop()
  private readonly visibility: string;

  private editedTodo: Todo;
  private beforeEditCache: string;
  public isAllDone: any;

  constructor() {
    super();
    this.editedTodo = null;
    this.beforeEditCache = null;
    this.isAllDone = false;
  }

  get remaining(): number {
    const filters = new TodoFilters(this.todos);
    return filters.active().length;
  }

  get filteredTodos(): Array<Todo> {
    const filters = new TodoFilters(this.todos);
    return filters.search(this.visibility);
  }

  public setDone(todo: Todo): void {
    this.$emit("event-edit-todo", todo);
  }

  public setAllDone(value: boolean): void {
    this.todos.forEach((todo: Todo) => {
      todo.completed = !value;
      this.$emit("event-edit-todo", todo);
    });
  }

  public editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    this.editedTodo = todo;
  }

  public cancelEdit(todo: Todo): void {
    this.editedTodo = null;
    todo.title = this.beforeEditCache;
  }

  public doneEdit(todo: Todo): void {
    if (!this.editedTodo) {
      return;
    }

    const isEmptyTitle = !(todo.title && todo.title.trim());
    if (isEmptyTitle) {
      return;
    }

    this.editedTodo = null;
    this.$emit("event-edit-todo", todo);
  }

  public removeTodo(todo: Todo): void {
    this.$emit("event-remove-todo", todo);
  }

}
