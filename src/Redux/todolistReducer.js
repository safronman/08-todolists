// CONSTANTS
const ADD_TODO = 'todolist/todolistReducer/ADD_TODO';
const ADD_TASK = 'todolist/todolistReducer/ADD_TASK';
const CHANGE_TASK = 'todolist/todolistReducer/CHANGE_TASK';
const DELETE_TODO = 'todolist/todolistReducer/DELETE_TODO';
const DELETE_TASK = 'todolist/todolistReducer/DELETE_TASK';


// INITIAL STATE
const initialState = {
    todolists: [
        {
            id: 0,
            title: "1 todo",
            tasks: [
                {id: 0, title: "1", isDone: false, priority: "low"},
            ]
        }
    ]
};


// REDUCER
const todolistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodo]
            };

        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map((item) => {
                    if (item.id === action.todolistID) {
                        return {...item, tasks: [...item.tasks, action.newTask]}
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

        default:
            return state
    }
};

export default todolistReducer


// ACTION CREATORS
export const addTodolistAC = (newTodo)=> ({type: ADD_TODO, newTodo});
export const addTaskAC = (todolistID, newTask)=> ({type: ADD_TASK, todolistID, newTask});
export const changeTaskAC = (todolistID, taskId, obj)=> ({type: CHANGE_TASK, todolistID, taskId, obj});
export const deleteTodolistAC = (todolistID)=> ({type: DELETE_TODO, todolistID});
export const deleteTaskAC = (todolistID, taskId)=> ({type: DELETE_TASK, todolistID, taskId});