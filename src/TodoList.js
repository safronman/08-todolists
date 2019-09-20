import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import styles from "./Todolist.module.css";

class TodoList extends React.Component {

    nextTaskId = 2;
    state = {
        filterValue: "All",
    };

    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        // инкрементим (увеличим) id следующей таски, чтобы при следюущем добавлении, он был на 1 больше
        this.nextTaskId++;
        this.props.addTask(this.props.id, newTask);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeStatus = (taskId, isDone) => {
        this.props.changeTask(this.props.id, taskId,  {isDone: isDone})
    };

    changeTitle = (taskId, title) => {
        this.props.changeTask(this.props.id, taskId, {title: title})
    };

    onDeleteTodo = () => {
        this.props.deleteTodo(this.props.id)
    };

    deleteTask= (taskId)=> {
        this.props.deleteTask(this.props.id, taskId)
    };

    render = () => {
        return (
            <div className={styles.todoList}>
                <div className="todoList-header">
                    <TodoListTitle title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>

                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={this.props.tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.isDone === false;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.isDone === true;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                <button className={styles.deleteButton} onClick={this.onDeleteTodo}>Delete todolist</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todolistID, newTask) => {
            const action = {
                type: "ADD_TASK",
                todolistID,
                newTask
            };
            dispatch(action);
        },
        changeTask: (todolistID, taskId, obj) => {
            debugger
            const action = {
                type: "CHANGE_TASK",
                todolistID,
                taskId,
                obj
            };
            dispatch(action);
        },
        deleteTodo: (todolistID)=> {
            const action = {
                type: "DELETE_TODO",
                todolistID
            };
            dispatch(action);
        },
        deleteTask: (todolistID, taskId)=> {
            const action = {
                type: "DELETE_TASK",
                todolistID,
                taskId
            };
            dispatch(action);
        },
    }
};


export default connect(null, mapDispatchToProps)(TodoList);

