import React from 'react';

class Counter2 extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 1
        }
    }

    multi = () => {
        this.setState((previousState) => {
            return {
                ...previousState,
                count: previousState.count * 5
            }
        });
    }

    div = () => {
        this.setState((previousState) => {
            return {
                ...previousState,
                count: previousState.count / 5
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.count}
                <button onClick={this.multi}>MULTI</button>
                <button onClick={this.div}>DIV</button>
            </div>
        );
    }
}

export default Counter2;
