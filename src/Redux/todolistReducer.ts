import {ITask, ITodo, IChangeTaskObj} from "../types/entities";
import {api} from "../Api/api";
import {AppActions, ITodolist} from "../types/actions";
import {Dispatch} from "redux";
import {AppState} from "./store";

// CONSTANTS
export const ADD_TODO = 'todolist/todolistReducer/ADD_TODO';
export const ADD_TASK = 'todolist/todolistReducer/ADD_TASK';
export const CHANGE_TASK = 'todolist/todolistReducer/CHANGE_TASK';
export const DELETE_TODO = 'todolist/todolistReducer/DELETE_TODO';
export const DELETE_TASK = 'todolist/todolistReducer/DELETE_TASK';
export const SET_TODOLISTS = 'todolist/todolistReducer/SET_TODOLISTS';
export const SET_TASKS = 'todolist/todolistReducer/SET_TASKS';
export const UPDATE_TODOLIST_TITLE = 'todolist/todolistReducer/UPDATE_TODOLIST_TITLE';


// ACTION CREATORS
export const addTodoSuccess = (newTodo: ITodo): ITodolist => ({type: ADD_TODO, newTodo});
export const creatTaskSuccess = (todolistID: string, newTask: ITask): ITodolist => ({type: ADD_TASK, todolistID, newTask});
export const updateTaskSuccess = (taskId: string, obj: IChangeTaskObj, todolistID: string): ITodolist => ({
    type: CHANGE_TASK,
    taskId,
    obj,
    todolistID
});
export const deleteTodoSuccess = (todolistID: string): ITodolist => ({type: DELETE_TODO, todolistID});
export const deleteTaskSuccess = (todolistID: string, taskId: string): ITodolist => ({
    type: DELETE_TASK,
    todolistID,
    taskId
});
export const setTodolists = (todolists: ITodo[]): ITodolist => ({type: SET_TODOLISTS, todolists});
export const setTasks = (todolistID: string, tasks: ITask[]): ITodolist => ({type: SET_TASKS, todolistID, tasks});
export const updateTodoTitleSuccess = (todoListID: string, newTodolistTitle: string): ITodolist => ({
    type: UPDATE_TODOLIST_TITLE,
    todoListID,
    newTodolistTitle
});


// THUNK CREATORS
export const getTodo = () => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    api.getTodolists()
        .then((data: ITodo[]) => {
            dispatch(setTodolists(data))
        });
};

export const addTodo = (todolistTitle: string) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    api.createTodolist(todolistTitle)
        .then((item: ITodo) => {
            dispatch(addTodoSuccess(item))
        })
};

export const getTasks = (todolistId: string) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    api.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks(todolistId, res.data.items))
        });
};

export const deleteTodo = (todolistId: string) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    api.deleteTodolist(todolistId)
        .then(res => {
            dispatch(deleteTodoSuccess(todolistId))
        });
};

export const deleteTask = (todolistId: string, taskId: string) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    api.deleteTask(taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskSuccess(todolistId, taskId))
            }
        })
};

export const creatTask = (newTaskTitle: string, todolistId: string) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    api.createTask(newTaskTitle, todolistId)
        .then(res => {
            dispatch(creatTaskSuccess(todolistId, res.data.data.item))
        })
};

export const updateTodoTitle = (todolistId: string, todoTitle: string) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    api.updateTodolistTitle(todolistId, todoTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(updateTodoTitleSuccess(todolistId, todoTitle))
            }
        })
};

export const updateTask = (task: ITask, taskId: string, obj: IChangeTaskObj, todolistId: string) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    api.updateTask(task)
        .then((data: any) => {
            if (data.resultCode === 0) {
                dispatch(updateTaskSuccess(taskId, obj, todolistId))
            }
        })
};


// INITIAL STATE
interface ITodolistState {
    todolists: ITodo[];
}

const initialState: ITodolistState = {
    todolists: []
};


// REDUCER
const todolistReducer = (state: ITodolistState = initialState, action: ITodolist): ITodolistState => {
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
