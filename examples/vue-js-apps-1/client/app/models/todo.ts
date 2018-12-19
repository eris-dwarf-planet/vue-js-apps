export class Todo {
    private _id: number;
    private _title: string;
    private _completed: boolean;

    public static create(title: string, completed: boolean): Todo {
        return new Todo(0, title, completed);
    }

    constructor(id: number, title: string, completed: boolean) {
        this._id = id;
        this._title = title;
        this._completed = completed;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get completed(): boolean {
        return this._completed;
    }

    set completed(value: boolean) {
        this._completed = value;
    }

}