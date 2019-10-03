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
    setTasks, updateTodolistTitle
} from "../Redux/todolistReducer";
import {api} from "../Api/api";

class TodoList extends React.Component {

    state = {
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreTasks()
    }

    restoreTasks = () => {
        api.getTasks(this.props.id)
            .then(res => {
                this.props.setTasks(this.props.id, res.data.items)
            });
    };

    addTask = (newTaskTitle) => {
        api.createTask(newTaskTitle, this.props.id)
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
        this.changeTask(taskId, {status})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    };

    changeTask = (taskId, obj) => {
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};

        api.updateTask(task)
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.changeTask(taskId, obj, this.props.id)
                }
            })
    };

    onDeleteTodo = () => {
        api.deleteTodolist(this.props.id)
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.deleteTodo(this.props.id)
                }
            })
    };

    deleteTask = (taskId) => {
        api.deleteTask(taskId)
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
                    <TodoListTitle title={this.props.title} id={this.props.id} updateTodolistTitle={this.props.updateTodolistTitle}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.status === 0;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.status === 2;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

export default connect(null, {addTask, changeTask, deleteTodo, deleteTask, setTasks, updateTodolistTitle})(TodoList);