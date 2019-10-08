import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask/TodoListTask";
import {ITask} from "./entities/entities";

interface IProps {
    tasks: ITask[],
    changeStatus: Function,
    changeTitle: Function,
    deleteTask: Function
}

class TodoListTasks extends React.Component<IProps> {
    render = () => {

        let tasksElements = this.props.tasks.map(task => <TodoListTask key={task.id} task={task}
                                                                       changeStatus={this.props.changeStatus}
                                                                       changeTitle={this.props.changeTitle}
                                                                       deleteTask={this.props.deleteTask}
        />);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

