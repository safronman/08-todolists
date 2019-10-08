import {ITask, ITodo, IChangeTaskObj} from "../types/entities";

// CONSTANTS
const ADD_TODO = 'todolist/todolistReducer/ADD_TODO';
const ADD_TASK = 'todolist/todolistReducer/ADD_TASK';
const CHANGE_TASK = 'todolist/todolistReducer/CHANGE_TASK';
const DELETE_TODO = 'todolist/todolistReducer/DELETE_TODO';
const DELETE_TASK = 'todolist/todolistReducer/DELETE_TASK';
const SET_TODOLISTS = 'todolist/todolistReducer/SET_TODOLISTS';
const SET_TASKS = 'todolist/todolistReducer/SET_TASKS';
const UPDATE_TODOLIST_TITLE = 'todolist/todolistReducer/UPDATE_TODOLIST_TITLE';


// ACTION CREATORS__INTERFACE
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
    taskId: string;
    obj: IChangeTaskObj;
    todolistID: string;
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

export type ITodolist = IAddTodolist | IAddTask | IChangeTask | IDeleteTodo | IDeleteTask | ISetTodolits |  ISetTasks | IUpdateTodolistTitle


// ACTION CREATORS
export const addTodolist = (newTodo: ITodo): IAddTodolist => ({type: ADD_TODO, newTodo});
export const addTask = (todolistID: string, newTask: ITask): IAddTask => ({type: ADD_TASK, todolistID, newTask});
export const changeTask = (taskId: string, obj: IChangeTaskObj, todolistID: string): IChangeTask => ({
    type: CHANGE_TASK,
    taskId,
    obj,
    todolistID
});
export const deleteTodo = (todolistID: string): IDeleteTodo => ({type: DELETE_TODO, todolistID});
export const deleteTask = (todolistID: string, taskId: string): IDeleteTask => ({
    type: DELETE_TASK,
    todolistID,
    taskId
});
export const setTodolists = (todolists: ITodo[]): ISetTodolits => ({type: SET_TODOLISTS, todolists});
export const setTasks = (todolistID: string, tasks: ITask[]): ISetTasks => ({type: SET_TASKS, todolistID, tasks});
export const updateTodolistTitle = (todoListID: string, newTodolistTitle: string): IUpdateTodolistTitle => ({
    type: UPDATE_TODOLIST_TITLE,
    todoListID,
    newTodolistTitle
});


// INITIAL STATE
interface ITodolistState {
    todolists: ITodo[];
}

const initialState: ITodolistState = {
    todolists: []
};


// REDUCER
const todolistReducer = (state: ITodolistState = initialState, action: ITodolist) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todolists: [action.newTodo, ...state.todolists]
            };

        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map((item: ITodo) => {
                    if (item.id === action.todolistID) {
                        return {
                            ...item,
                            tasks: [action.newTask, ...item.tasks]
                        }
                    } else {
                        return item
                    }
                })
            };

        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map((item: ITodo) => {
                    if (item.id === action.todolistID) {
                        return {
                            ...item,
                            tasks: item.tasks.map((task: ITask) => {
                                if (task.id === action.taskId) {
                                    return {...task, ...action.obj}
                                } else {
                                    return task
                                }
                            })
                        }
                    } else {
                        return item
                    }
                })
            };

        case DELETE_TODO:
            return {
                ...state,
                todolists: state.todolists.filter((item: ITodo) => {
                    return item.id !== action.todolistID
                })
            };

        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map((item: ITodo) => {
                    if (item.id === action.todolistID) {
                        return {
                            ...item, tasks: item.tasks.filter((task: ITask) => {
                                return task.id !== action.taskId
                            })
                        }
                    } else {
                        return item
                    }
                })
            };

        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map((tl: ITodo) => {
                    return {...tl, tasks: []}
                })
            };

        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map((tl: ITodo) => {
                    if (tl.id === action.todolistID) {
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl
                    }
                })
            };


        case UPDATE_TODOLIST_TITLE:
            return {
                ...state,
                todolists: state.todolists.map((tl: ITodo) => {
                    if (tl.id === action.todoListID) {
                        return {...tl, title: action.newTodolistTitle}
                    } else {
                        return tl
                    }
                })
            };

        default:
            return state
    }
};

export default todolistReducer
