import React, { Component } from 'react';

export default class Sidebar extends Component {

    render() {
        const { children } = this.props;
        return (
            <div className='sidebar'>
                {React.Children.map(children, (child, i) => {
                    return (
                        <div style={{
                            border: '3px solid black',
                            marginTop: '20px'
                        }} className='row'>
                            {child}
                        </div>
                    )
                })}
            </div>
        )     
    }
}