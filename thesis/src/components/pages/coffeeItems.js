import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import NavPanel from '../navPanel';
import CoffeeService from '../../services/coffeeService';

import './coffeePage.css';
import Logo from './img/Logo.svg';
import BeansBlack from './img/Beans_logo_dark.svg';

export default class CoffeeItems extends Component {
    coffeeService = new CoffeeService();

    state = {
        click: false
    }

    onDescription = () => {
        this.setState((state) => ({
            click: !state.click
        }));
    }

    render() {
        const {name, country, url, price, description} = this.props.location.state;

        let desc = ''

        if (description.length > 200 && !this.state.click) {
            desc = description.slice(0, 200) + '...';
        } else {
            desc = description;
        }
        return (
            <>
                <div className="banner">
                    <Container>
                        <Row>
                            <Col lg = '6'>
                                <NavPanel position = "header" color = "text-white" img = {Logo}/>
                            </Col>
                        </Row>
                        <h1 className="title-big">{name}</h1>
                    </Container>
                </div>
                <section className="shop">
                    <Container>
                        <Row>
                            <Col lg = {{size: 5, offset: 1}}>
                                <img className="item__img" src={url} alt="girl"/>
                            </Col>
                            <Col lg = "4">
                                <div className="title">About it</div>
                                <img className="beanslogo" src={BeansBlack} alt="Beans logo"/>
                                <div className="shop__point">
                                    <span>Country:</span>
                                    {country}
                                </div>
                                <div className="shop__point" onClick = {this.onDescription}>
                                    <span>Description:</span>
                                    {desc}
                                </div>
                                <div className="shop__point">
                                    <span>Price:</span>
                                    <span className="shop__point-price">{price}</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}