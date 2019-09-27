import React from 'react';
import '../App.css';
import TodoListTasks from "../TodoListTasks";
import TodoListFooter from "../TodoListFooter";
import TodoListTitle from "../TodoListTitle/TodoListTitle";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import styles from "./Todolist.module.css";
import {
    addTask,
    changeTask,
    deleteTask,
    deleteTodo,
    setTasks
} from "../Redux/todolistReducer";
import axios from "axios";

class TodoList extends React.Component {

    state = {
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreTasks()
    }

    restoreTasks = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY": "794181ab-6d62-4cfb-bc9f-d539dfac55f1"}
            })
            .then(res => {
                this.props.setTasks(this.props.id, res.data.items)
            });
    };

    addTask = (newText) => {
        axios.post(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
            {title: newText},
            {
                withCredentials: true,
                headers: {"API-KEY": "794181ab-6d62-4cfb-bc9f-d539dfac55f1"}
            })
            .then(res => {
                this.props.addTask(this.props.id, res.data.data.item)
            })
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeStatus = (taskId, status) => {
        debugger
        this.changeTask(taskId, {status})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    };

    changeTask = (taskId, obj) => {
        debugger
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};

        axios.put(`https://social-network.samuraijs.com/api/1.0/todo-lists/tasks`, task,
            {
                withCredentials: true,
                headers: {"API-KEY": "794181ab-6d62-4cfb-bc9f-d539dfac55f1"}
            })
            .then(res => {
                debugger
                if (res.data.resultCode === 0 ) {
                    this.props.changeTask(taskId, obj, this.props.id)
                }
            })
    };


    onDeleteTodo = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "794181ab-6d62-4cfb-bc9f-d539dfac55f1"}
            })
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.deleteTodo(this.props.id)
                }
            })
    };

    deleteTask = (taskId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "794181ab-6d62-4cfb-bc9f-d539dfac55f1"}
            })
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId)
                }
            })
    };

    render = () => {
        let {tasks = []} = this.props;

        return (
            <div className={styles.todoList}>
                <button className={styles.deleteButton} onClick={this.onDeleteTodo}>x</button>
                <div className="todoList-header">
                    <TodoListTitle title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={tasks.filter(t => {
                                   debugger
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.status === 0;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return  t.status === 2;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}


export default connect(null, {addTask, changeTask, deleteTodo, deleteTask, setTasks})(TodoList);

