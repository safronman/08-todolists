import React from 'react';
import styles from "./TodoListTitle.module.css"
import {api} from "../Api/api";

class TodoListTitle extends React.Component {

    state = {
        editMode: false,
        todolistTitle: this.props.title
    };

    onTodolistTitleClick = () => {
        this.setState({editMode: true})
    };

    onTodolistTitleChange = (e) => {
        this.setState({todolistTitle: e.currentTarget.value})
    };

    updateTodolistTitle = () => {
        this.setState({editMode: false});
        api.updateTodolistTitle(this.props.id, this.state.todolistTitle)
            .then((res) => {
                if (res.data.resultCode === 0 ) {
                    this.props.updateTodolistTitle(this.props.id, this.state.todolistTitle)
                }
            })
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
        );
    }
}

export default TodoListTitle;

