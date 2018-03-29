import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Login, Signup } from '../components';

export default class Welcome extends Component {
    
    state = {

    }
    
    render() {
        return (
            <div>
                <h3> Login here if you already have an account </h3>
                <Login/>

                <h3>Signup here to make a new account</h3>
                <Signup/>
                
            </div>
        )
    }
}
