import React from 'react';
import styles from "./TodoListTitle.module.css"

class TodoListTitle extends React.Component {
   render = () => {
        return (
                <h3 className={styles.todolistTitle}>{this.props.title}</h3>
        );
    }
}

export default TodoListTitle;

