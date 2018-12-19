import Vue from "vue";
import Component from "vue-class-component";
import { Todo } from "../../../models/todo";

import * as Template from "./index.html";

@Template
@Component
export class TodoHeader extends Vue {
  private title: string;

  constructor() {
    super();
    this.title = "";
  }

  public addTodo(): void {
    const isEmptyTitle = !(this.title && this.title.trim());
    if (isEmptyTitle) {
      return;
    }

    const todo = Todo.create(this.title, false);
    this.$emit("event-add-todo", todo);
    this.title = "";
  }
}
