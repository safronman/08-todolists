import React from 'react';
import '../App.css';
import styles from './TodoListTask.module.css';

class TodoListTask extends React.Component {

    state = {
        editMode: false
    };

    onIsDoneChanged = (e) => {
        debugger
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked ? 2 : 0);
    };

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        this.setState({editMode: false});
    };

    onDelTaskClick = () => {
        this.props.deleteTask(this.props.task.id);
    };


    render = () => {
        debugger

        let containerCssClass = this.props.task.status === 2 ? "todoList-task done" : "todoList-task";

        return (
            <div className={styles.wrapper}>
                <div className={containerCssClass}>
                    <input type="checkbox" checked={this.props.task.status === 2}
                           onChange={this.onIsDoneChanged}/>
                    {this.state.editMode
                        ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                                 value={this.props.task.title}/>
                        : <span onClick={this.activateEditMode}>{this.props.task.id} - {this.props.task.title}</span>
                    }, priority: {this.props.task.priority}
                </div>
                <button className={styles.delBtnTask} onClick={this.onDelTaskClick}>x</button>
            </div>
        );
    }
}

export default TodoListTask;

