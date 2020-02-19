import {ITask, ITodo} from "../types/entities";
import {api} from "../Api/api";
import {
    AppActions,
    ITodolist,
    IAddTodolist,
    IAddTask,
    IChangeTask,
    IDeleteTodo,
    IDeleteTask,
    ISetTodolits, IUpdateTodolistTitle, ISetTasks
} from "../types/actions";
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
                    if (item.id === action.task.todoListId) {
                        return {
                            ...item,
                            tasks: item.tasks.map((el: ITask) => {
                                if (el.id === action.task.id) {
                                    return {
                                        ...el,
                                        title: action.task.title,
                                        status: action.task.status
                                    }
                                } else {
                                    return el
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


// ACTION CREATORS
export const addTodoSuccess = (newTodo: ITodo): IAddTodolist => ({type: ADD_TODO, newTodo});
export const creatTaskSuccess = (todolistID: string, newTask: ITask): IAddTask => ({
    type: ADD_TASK,
    todolistID,
    newTask
});
export const updateTaskSuccess = (task: ITask): IChangeTask => ({type: CHANGE_TASK, task});
export const deleteTodoSuccess = (todolistID: string): IDeleteTodo => ({type: DELETE_TODO, todolistID});
export const deleteTaskSuccess = (todolistID: string, taskId: string): IDeleteTask => ({
    type: DELETE_TASK,
    todolistID,
    taskId
});
export const setTodolists = (todolists: ITodo[]): ISetTodolits => ({type: SET_TODOLISTS, todolists});
export const setTasks = (todolistID: string, tasks: ITask[]): ISetTasks => ({type: SET_TASKS, todolistID, tasks});
export const updateTodoTitleSuccess = (todoListID: string, newTodolistTitle: string): IUpdateTodolistTitle => ({
    type: UPDATE_TODOLIST_TITLE,
    todoListID,
    newTodolistTitle
});


// THUNK CREATORS
export const getTodo = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let data = await api.getTodolists();
    dispatch(setTodolists(data))
};

export const addTodo = (todolistTitle: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let item = await api.createTodolist(todolistTitle);
    dispatch(addTodoSuccess(item))
};

export const getTasks = (todolistId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let res = await api.getTasks(todolistId);
    dispatch(setTasks(todolistId, res.data.items))
};

export const deleteTodo = (todolistId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let res = await api.deleteTodolist(todolistId);
    if (res.data.resultCode === 0) {
        dispatch(deleteTodoSuccess(todolistId))
    }
};

export const deleteTask = (todolistId: string, taskId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let res = await api.deleteTask(taskId);
    if (res.data.resultCode === 0) {
        dispatch(deleteTaskSuccess(todolistId, taskId))
    }
};

export const creatTask = (newTaskTitle: string, todolistId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let res = await api.createTask(newTaskTitle, todolistId);
    dispatch(creatTaskSuccess(todolistId, res.data.data.item))
};

export const updateTodoTitle = (todolistId: string, todoTitle: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let res = await api.updateTodolistTitle(todolistId, todoTitle);
    if (res.data.resultCode === 0) {
        dispatch(updateTodoTitleSuccess(todolistId, todoTitle))
    }
};

export const updateTask = (task: ITask) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let data = await api.updateTask(task);
    if (data.resultCode === 0) {
        dispatch(updateTaskSuccess(data.data.item))
    }
};
