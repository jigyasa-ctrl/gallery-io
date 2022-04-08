import React, { createContext, Component } from 'react';

export const Context = createContext();

class ContextProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: "",
            searchText: "dog",
            searchResult: [],
            currentIndex: 0
        };
    }

    setDataToContext = (key, value) => {
        console.log(key, value)
        this.setState({
            [key]: value
        });
    };
    setDataToContextArray = (key, value) => {

        this.setState({
            [key]: [...this.state[key], value]
        });
    }



    render() {
        return (
            <Context.Provider value={{ ...this.state, ...this }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default React.memo(ContextProvider);
