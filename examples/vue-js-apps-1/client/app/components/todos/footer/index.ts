import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { TodoFilters } from "../../../services/todo/filters";
import { Todo } from "../../../models/todo";

import * as Template from "./index.html";

@Template
@Component({
  filters: {
    pluralize: (n: number): string => {
      return n === 1 ? "item" : "items";
    }
  }
})
export class TodoFooter extends Vue {
  @Prop()
  private readonly todos: Array<Todo>;
  @Prop()
  private readonly visibility: string;

  constructor() {
    super();
  }

  get remaining(): number {
    const filters = new TodoFilters(this.todos);
    return filters.active().length;
  }

  public removeCompleted(): void {
    this.$emit("event-remove-completed-todo");
  }

}
