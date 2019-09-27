import React from 'react';
import './App.css';
import TodoList from "./TodoList/TodoList";
import AddNewItemForm from "./AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, setTodolists} from "./Redux/todolistReducer";
import axios from "axios";

class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.0/todo-lists", {withCredentials: true})
            .then(res => {
                this.props.setTodolists(res.data)
            });
    };

    addTodoList = (title) => {
        axios.post("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {title: title},
            {
                withCredentials: true,
                headers: {"API-KEY": "794181ab-6d62-4cfb-bc9f-d539dfac55f1"}
            })
            .then(res => {
                this.props.addTodolist(res.data.data.item)
            })
    };

    render = () => {
        const todolists = this.props.todolists.map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title}
                                                                   tasks={tl.tasks}/>);
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


export default connect(mapStateToProps, {addTodolist, setTodolists})(App);

