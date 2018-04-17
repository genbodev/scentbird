import React, { Component } from 'react';
import { connect } from 'react-redux';
import './about.css';

class About extends Component {
    render() {
        return (
            <div className="IndexPage">
                <h1>About</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
