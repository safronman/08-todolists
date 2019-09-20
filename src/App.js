import React from 'react';
import './App.css';
import TodoList from "./TodoList/TodoList";
import AddNewItemForm from "./AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC} from "./Redux/todolistReducer";

class App extends React.Component {

    nextTodoListId = 1;

    addTodoList = (title) => {
        let newTodoList = {
            id: this.nextTodoListId,
            title: title,
            tasks: []
        };
        this.nextTodoListId++;
        this.props.addTodolist(newTodoList);
    };

    render = () => {
        const todolists = this.props.todolists.map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>);
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodo) => {
            dispatch(addTodolistAC(newTodo));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

