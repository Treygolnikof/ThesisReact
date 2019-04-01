import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import NavPanel from '../navPanel';
import {Link} from 'react-router-dom';

import './coffeePage.css';
import Logo from './img/Logo.svg';
import BeansBlack from './img/Beans_logo_dark.svg';

export default class CoffeeItems extends Component {

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

        let desc;

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
                                <NavPanel position = "header" img = {Logo}/>
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
                                    <span>Country: </span>
                                    <span className = "font-weight-normal">{country}</span>
                                </div>
                                <div className="shop__point" onClick = {this.onDescription}>
                                    <span>Description: </span>
                                    <span className = "shop__point-description">{desc}</span>
                                </div>
                                <div className="shop__point">
                                    <span>Price: </span>
                                    <span className="shop__point-price">{price}</span>
                                </div>
                                <Link className="back__btn text-decoration-none" to = "/coffee/">Back</Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}