import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './navPanel.css';

export default class NavPanel extends Component {
    render() {
        const classLi = this.props.position + "__item";
        return (
            <ul className = {this.props.position}>
                <li className = {classLi}>
                    <Link to = "/">
                        <img src = {this.props.img} alt = "logo"/>
                    </Link>
                </li>
                <li className = {classLi}>
                    <Link to = "/coffee/">
                        Our coffee
                    </Link>
                </li>
                <li className = {classLi}>
                    <Link to = "/goods/">
                        For your pleasure
                    </Link>
                </li>
                <li className = {classLi}>
                    <Link to = "/contacts/">
                        Contact us
                    </Link>
                </li>
            </ul>
        );
    }
} 
