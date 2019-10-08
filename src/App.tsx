import React from 'react';
import './App.css';
import TodoList from "./TodoList/TodoList";
import AddNewItemForm from "./AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, setTodolists} from "./Redux/todolistReducer";
import {api} from "./Api/api";
import {ITodo} from "./types/entities";

interface IProps {
    setTodolists: Function;
    addTodolist: Function;
    todolists: ITodo[];
}

class App extends React.Component<IProps> {

    componentDidMount() {
        api.getTodolists()
            .then((data: ITodo[]) => {
                this.props.setTodolists(data)
            });
    }

    addTodoList = (todolistTitle: string) => {
        api.createTodolist(todolistTitle)
            .then((item: ITodo) => {
                this.props.addTodolist(item)
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

const mapStateToProps = (state: any) => {
    return {
        todolists: state.todolists
    }
};


export default connect(mapStateToProps, {addTodolist, setTodolists})(App);

