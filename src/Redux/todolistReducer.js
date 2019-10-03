// CONSTANTS
const ADD_TODO = 'todolist/todolistReducer/ADD_TODO';
const ADD_TASK = 'todolist/todolistReducer/ADD_TASK';
const CHANGE_TASK = 'todolist/todolistReducer/CHANGE_TASK';
const DELETE_TODO = 'todolist/todolistReducer/DELETE_TODO';
const DELETE_TASK = 'todolist/todolistReducer/DELETE_TASK';
const SET_TODOLISTS = 'todolist/todolistReducer/SET_TODOLISTS';
const SET_TASKS = 'todolist/todolistReducer/SET_TASKS';
const UPDATE_TODOLIST_TITLE = 'todolist/todolistReducer/UPDATE_TODOLIST_TITLE';


// INITIAL STATE
const initialState = {
    todolists: []
};


// REDUCER
const todolistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todolists: [action.newTodo, ...state.todolists]
            };

        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map((item) => {
                    if (item.id === action.todolistID) {
                        return {...item, tasks: [action.newTask, ...item.tasks]}
                    } else {
                        return item
                    }
                })
            };

        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(item => {
                    if (item.id === action.todolistID) {
                        return {
                            ...item,
                            tasks: item.tasks.map(task => {
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
                todolists: state.todolists.filter((item) => {
                    return item.id !== action.todolistID
                })
            };

        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map((item) => {
                    if (item.id === action.todolistID) {
                        return {
                            ...item, tasks: item.tasks.filter((task) => {
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
                todolists: action.todolists.map(tl => {
                    return {...tl, tasks: []}
                })
            };

        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistID) {
                        return {...tl, tasks: action.tasks}
                    } else { return tl}
                })
            };


        case UPDATE_TODOLIST_TITLE:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoListID) {
                        return {...tl, title: action.newTodolistTitle}
                    } else { return tl}
                })
            };


        default:
            return state
    }
};

export default todolistReducer


// ACTION CREATORS
export const addTodolist = (newTodo) => ({type: ADD_TODO, newTodo});
export const addTask = (todolistID, newTask) => ({type: ADD_TASK, todolistID, newTask});
export const changeTask = (taskId, obj, todolistID) => ({type: CHANGE_TASK, taskId, obj, todolistID});
export const deleteTodo = (todolistID) => ({type: DELETE_TODO, todolistID});
export const deleteTask = (todolistID, taskId) => ({type: DELETE_TASK, todolistID, taskId});
export const setTodolists = (todolists) => ({type: SET_TODOLISTS, todolists});
export const setTasks = (todolistID, tasks) => ({type: SET_TASKS, todolistID, tasks});
export const updateTodolistTitle = (todoListID, newTodolistTitle) => ({type: UPDATE_TODOLIST_TITLE, todoListID, newTodolistTitle});