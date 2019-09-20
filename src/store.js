import {createStore} from "redux";

const initialState = {
    todolists: [
        {
            id: 0,
            title: "1 todo",
            tasks: [
                {id: 0, title: "1", isDone: false, priority: "low"},
                {id: 1, title: "2", isDone: false, priority: "low"}
            ]
        },
        {
            id: 1, title: "2 todo",
            tasks: [
                {id: 0, title: "a", isDone: false, priority: "low"},
                {id: 1, title: "b", isDone: false, priority: "low"}
            ]
        },
        {
            id: 2, title: "3 todo",
            tasks: [
                {id: 0, title: "x", isDone: false, priority: "low"},
                {id: 1, title: "y", isDone: false, priority: "low"}
            ]
        }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todolists: [...state.todolists, action.newTodo]
            };

        case 'ADD_TASK':
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

        case 'CHANGE_TASK':
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

        case 'DELETE_TODO':
            return {
                ...state,
                todolists: state.todolists.filter((item) => {
                    return item.id !== action.todolistID
                })
            };

        case 'DELETE_TASK':
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

let store = createStore(reducer);
export default store