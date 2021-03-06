import React from 'react';
import styles from "./TodoListTitle.module.css"

interface IProps {
    title: string;
    id: string;
    updateTodoTitle: (todolistId: string, todolistTitle: string) => void;
}

interface IState {
    editMode: boolean;
    todolistTitle: string;
}

class TodoListTitle extends React.Component<IProps, IState> {

    state: IState = {
        editMode: false,
        todolistTitle: this.props.title
    };

    onTodolistTitleClick = () => {
        this.setState({editMode: true})
    };

    onTodolistTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({todolistTitle: e.currentTarget.value})
    };

    updateTodolistTitle = () => {
        this.setState({editMode: false});
        this.props.updateTodoTitle(this.props.id, this.state.todolistTitle)
    };

    render = () => {
        return (
            <div>
                {
                    this.state.editMode
                        ? <input type="text"
                                 value={this.state.todolistTitle}
                                 onChange={this.onTodolistTitleChange}
                                 onBlur={this.updateTodolistTitle}
                        />
                        : <h3 className={styles.todolistTitle}
                              onClick={this.onTodolistTitleClick}>{this.state.todolistTitle}</h3>
                }
            </div>
        )
    }
}

export default TodoListTitle;

