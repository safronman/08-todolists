import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "794181ab-6d62-4cfb-bc9f-d539dfac55f1"}

});

export const api = {
    createTask(newTaskTitle, todolistId) {
        return instance.post(`${todolistId}/tasks`, {title: newTaskTitle})
    },
    createTodolist(todolistTitle) {
        return instance.post("", {title: todolistTitle},)
    },
    getTodolists() {
        return instance.get("")
    },
    getTasks(todolistId) {
        return instance.get(`${todolistId}/tasks`)
    },
    deleteTodolist(todolistId) {
        return instance.delete(`/${todolistId}`)
    },
    deleteTask(taskId) {
        return instance.delete(`/tasks/${taskId}`)
    },
    updateTask(task) {
        return instance.put(`/tasks`, task)
    },
    updateTodolistTitle(todoListId, newTodolistTitle) {
        return instance.put(`/${todoListId}`, {title: newTodolistTitle})
    }
};