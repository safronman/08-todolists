import React from 'react';
import './App.css';
import TodoList from "./TodoList/TodoList";
import AddNewItemForm from "./AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodo, addTodoSuccess, getTodo, setTodolists} from "./Redux/todolistReducer";
import {ITodo} from "./types/entities";
import {AppState} from "./Redux/store";

interface IProps {
    getTodo: () => void;
    addTodo: (todolistTitle: string) => void;
}

interface IMapStateProps {
    todolists: ITodo[]
}

class App extends React.Component<IProps & IMapStateProps> {

    componentDidMount() {
        this.props.getTodo()
    }

    addTodoList = (todolistTitle: string) => {
        this.props.addTodo(todolistTitle)
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


const mapStateToProps = (state: AppState): IMapStateProps => {
    return {
        todolists: state.todolistReducer.todolists
    }
};


export default connect(mapStateToProps, {addTodolist: addTodoSuccess, setTodolists, getTodo, addTodo})(App);

