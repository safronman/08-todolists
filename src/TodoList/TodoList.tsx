import React from 'react';
import {
    deleteTodo, deleteTask, getTasks,
    creatTask, updateTodoTitle, updateTask
} from "../Redux/todolistReducer";
import '../App.css';
import TodoListTasks from "../TodoListTasks";
import TodoListFooter from "../TodoListFooter";
import TodoListTitle from "../TodoListTitle/TodoListTitle";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {IChangeTaskObj, ITask} from "../types/entities";
import styles from "./Todolist.module.css";


interface IProps {
    id: string;
    tasks: ITask[];
    title: string;
}

interface IMapDispatchProps {
    deleteTodo: (todolistId: string) => void;
    deleteTask: (todolistId: string, taskId: string) => void;
    creatTask: (taskTitle: string, todolistId: string) => void;
    updateTodoTitle: (todolistId: string, todolistTitle: string) => void;
    getTasks: (todolistId: string) => void;
    updateTask: (task: any) => void;
}

interface IState {
    filterValue: string;
}

class TodoList extends React.Component<IProps & IMapDispatchProps, IState> {

    state: IState = {
        filterValue: "All"
    };

    componentDidMount() {
        this.restoreTasks()
    }

    restoreTasks = () => {
        this.props.getTasks(this.props.id)
    };

    addTask = (newTaskTitle: string) => {
        this.props.creatTask(newTaskTitle, this.props.id);
    };

    changeFilter = (newFilterValue: string) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeStatus = (taskId: string, status: number) => {
        this.changeTask(taskId, {status})
    };

    changeTitle = (taskId: string, title: string) => {
        this.changeTask(taskId, {title})
    };

    changeTask = (taskId: string, obj: IChangeTaskObj) => {
        let changedTask = this.props.tasks.find((task) => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};

        this.props.updateTask(task)
    };

    onDeleteTodo = () => {
        this.props.deleteTodo(this.props.id)
    };

    deleteTask = (taskId: string) => {
        this.props.deleteTask(this.props.id, taskId)
    };

    render = () => {
        let {tasks = []} = this.props;

        return (
            <div className={styles.todoList}>
                <button className={styles.deleteButton} onClick={this.onDeleteTodo}>x</button>
                <div className="todoList-header">
                    <TodoListTitle title={this.props.title} id={this.props.id}
                                   updateTodoTitle={this.props.updateTodoTitle}/>
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

export default connect(null,
    {deleteTodo, deleteTask, updateTodoTitle, getTasks, creatTask, updateTask})(TodoList);
