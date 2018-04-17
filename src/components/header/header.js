import React, { Component } from 'react';
import './header.css';
import logoImg from './logo.png';

class Header extends Component {
    render() {
        return (
            <div id="header">
                <header className="header">
                    <img src={logoImg} alt="logo"/>
                </header>
            </div>
        );
    }
}

export default Header;

