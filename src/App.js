import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";

class App extends React.Component {

    nextTodoListId = 3;

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
            const action = {
                type: 'ADD_TODO',
                newTodo
            };
            dispatch(action);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

