import { Todo } from "../../models/Todo";

export class TodoFilters {
    private todos: Array<Todo>;

    constructor(todos: Array<Todo>) {
        this.todos = todos;
    }

    public static valid(visibility: string): boolean {
        switch (visibility) {
            case "all":
                return true;
            case "active":
                return true;
            case "completed":
                return true;
            default:
                return false;
        }
    }

    public search(visibility: string): Array<any> {
        switch (visibility) {
            case "all":
                return this.all();
            case "active":
                return this.active();
            case "completed":
                return this.completed();
            default:
                return this.all();
        }
    }

    public all(): Array<Todo> {
        return this.todos;
    }

    public active(): Array<Todo> {
        return this.todos.filter((todo: Todo) => {
            return !todo.completed;
        });
    }

    public completed(): Array<Todo> {
        return this.todos.filter((todo: Todo) => {
            return todo.completed;
        });
    }
}