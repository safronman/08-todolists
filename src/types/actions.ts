import {ITodo, ITask} from "./entities";
import {
    ADD_TASK,
    ADD_TODO,
    CHANGE_TASK,
    DELETE_TODO,
    DELETE_TASK,
    SET_TODOLISTS,
    SET_TASKS, UPDATE_TODOLIST_TITLE
} from "../Redux/todolistReducer";


// Interfaces for actions in todolistReducer: ITodolist
interface IAddTodolist {
    type: typeof ADD_TODO;
    newTodo: ITodo;
}

interface IAddTask {
    type: typeof ADD_TASK;
    todolistID: string;
    newTask: ITask;
}

interface IChangeTask {
    type: typeof CHANGE_TASK;
    task: ITask;
}

interface IDeleteTodo {
    type: typeof DELETE_TODO;
    todolistID: string;
}

interface IDeleteTask {
    type: typeof DELETE_TASK;
    todolistID: string;
    taskId: string;
}

interface ISetTodolits {
    type: typeof SET_TODOLISTS;
    todolists: ITodo[];
}

interface ISetTasks {
    type: typeof SET_TASKS;
    todolistID: string;
    tasks: ITask[];
}

interface IUpdateTodolistTitle {
    type: typeof UPDATE_TODOLIST_TITLE;
    todoListID: string;
    newTodolistTitle: string;
}

export type ITodolist =
    IAddTodolist
    | IAddTask
    | IChangeTask
    | IDeleteTodo
    | IDeleteTask
    | ISetTodolits
    | ISetTasks
    | IUpdateTodolistTitle


// Combine all actions interfaces to AppActions
export type AppActions = ITodolist