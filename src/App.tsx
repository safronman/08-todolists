import React from 'react';
import './App.css';
import TodoList from "./TodoList/TodoList";
import AddNewItemForm from "./AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, setTodolists} from "./Redux/todolistReducer";
import {api} from "./Api/api";

interface IProps {
    setTodolists: Function,
    addTodolist: Function,
    todolists: any[]
}

class App extends React.Component<IProps> {

    componentDidMount() {
        api.getTodolists()
            .then(res => {
                this.props.setTodolists(res.data)
            });
    }

    addTodoList = (todolistTitle: string) => {
        api.createTodolist(todolistTitle)
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

const mapStateToProps = (state: any) => {
    return {
        todolists: state.todolists
    }
};


export default connect(mapStateToProps, {addTodolist, setTodolists})(App);

