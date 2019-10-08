import axios from "axios";
import {ITask} from "../types/entities";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "794181ab-6d62-4cfb-bc9f-d539dfac55f1"}
});

export const api = {
    createTask(newTaskTitle: string, todolistId: string) {
        return instance.post(`${todolistId}/tasks`, {title: newTaskTitle})
    },
    createTodolist(todolistTitle: string) {
        return instance.post("", {title: todolistTitle})
            .then( res => {
                return res.data.data.item
            })
    },
    getTodolists() {
        return instance.get("")
            .then(res => {
                return res.data
            })
    },
    getTasks(todolistId: string) {
        return instance.get(`${todolistId}/tasks`)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`/${todolistId}`)
    },
    deleteTask(taskId: string) {
        return instance.delete(`/tasks/${taskId}`)
    },
    updateTask(task: ITask) {
        return instance.put(`/tasks`, task)
            .then((res => {
                return res.data
            }))
    },
    updateTodolistTitle(todoListId: string, newTodolistTitle: string) {
        return instance.put(`/${todoListId}`, {title: newTodolistTitle})
    }
};