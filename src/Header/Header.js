import React from 'react';

export default class Header extends React.Component {
 
    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1" style={{fontSize: '30px'}}>Todo List v.2, Now with React!</span>
                </nav> 
            </div>
        )
    }
}