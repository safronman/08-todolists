import axios from "axios";
import {ITask, ITodo} from "../types/entities";

interface IGetTasksResponse {
    items: ITask[]
    totalCount: number
    error: string | null
}

interface ICreateTaskResponse {
    data: {
        item: ITask
    }
    messages: string[]
    resultCode: number
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "794181ab-6d62-4cfb-bc9f-d539dfac55f1"}
});

export const api = {
    createTask(newTaskTitle: string, todolistId: string) {
        return instance.post<ICreateTaskResponse>(`${todolistId}/tasks`, {title: newTaskTitle})
    },
    createTodolist(todolistTitle: string) {
        return instance.post("", {title: todolistTitle})
            .then(res => {
                return res.data.data.item
            })
    },
    getTodolists(): Promise<ITodo[]> {
        return instance.get<ITodo[]>("")
            .then(res => {
                return res.data
            })
    },
    getTasks(todolistId: string) {
        return instance.get<IGetTasksResponse>(`${todolistId}/tasks`)

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
