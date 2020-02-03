import React from 'react';
import '../App.css';
import {ITask} from "../types/entities";
import styles from './TodoListTask.module.css';

interface IProps {
    task: ITask;
    changeStatus: (todolistId: string, checkedTaskStatus: number) => void;
    changeTitle: (todolistId: string, taskTitle: string) => void;
    deleteTask: (taskId: string) => void;
}

interface IState {
    editMode: boolean;
    taskTitle: string;
}

class TodoListTask extends React.Component<IProps, IState> {

    state: IState = {
        editMode: false,
        taskTitle: this.props.task.title
    };

    onIsDoneChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked ? 2 : 0);
    };

    onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({taskTitle: e.currentTarget.value})
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.changeTitle(this.props.task.id, this.state.taskTitle);
    };

    onDelTaskClick = () => {
        this.props.deleteTask(this.props.task.id);
    };


    render = () => {
        let containerCssClass = this.props.task.status === 2 ? "todoList-task done" : "todoList-task";

        return (
            <div className={styles.wrapper}>
                <div className={containerCssClass}>
                    <input type="checkbox"
                           checked={this.props.task.status === 2}
                           onChange={this.onIsDoneChanged}
                    />
                    {this.state.editMode
                        ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                                 value={this.state.taskTitle}/>
                        : <span onClick={this.activateEditMode}>{this.props.task.title}</span>
                    }, priority: {this.props.task.priority}
                </div>
                <button className={styles.delBtnTask} onClick={this.onDelTaskClick}>x</button>
            </div>
        );
    }
}

export default TodoListTask;

