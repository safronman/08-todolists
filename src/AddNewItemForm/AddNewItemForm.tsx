import React from 'react';
import '../App.css';
const styles = require('./AddNewItemForm.module.css');
// import styles from "./AddNewItemForm.module.css";

interface IProps {
    addItem: Function;
}

interface IState {
    error: boolean;
    title: string;
}


class AddNewItemForm extends React.Component<IProps, IState> {
    state = {
        error: false,
        title: ""
    };

    onAddItemClick = () => {
        let newText = this.state.title;
        this.setState({title: ""});

        if (newText === "") {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            // передаём новый текст наружу
            this.props.addItem(newText);
        }
    };

    onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    };


    render = () => {
        let classNameForInput = this.state.error ? "error" : "";

        return (
            <div className={styles.wrapper}>
                <input className={classNameForInput} type="text" placeholder="New item name"
                       onChange={this.onTitleChanged}
                       onKeyPress={this.onKeyPress}
                       value={this.state.title}
                />
                <button className={styles.addItemBtn} onClick={this.onAddItemClick}>Add</button>
            </div>

        );
    }
}

export default AddNewItemForm;

