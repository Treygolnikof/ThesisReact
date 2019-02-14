import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import NavPanel from '../navPanel';
import CoffeeService from '../../services/coffeeService';
import { Formik, Field, Form} from 'formik';
import FormSchema from '../formSchema';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './coffeePage.css';
import Logo from './img/Logo.svg';
import BeansBlack from './img/Beans_logo_dark.svg';
import Thanks from './img/thanks.png'

export default class ContactPage extends Component {
    coffeeService = new CoffeeService();

    state = {
        value: null,
        success: false,
        loading: false,
        error: false
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    phoneNumberMask = (event) => {
        event.target.maxLength = 17; 
        event.target.value = event.target.value.replace('+7', ""); 
        event.target.value = event.target.value.replace(/\D/g, ""); 
        event.target.value = event.target.value.replace(/^(\d{3})(\d)/g, "($1) $2"); 
        event.target.value = '+7 ' + event.target.value.replace(/(\d{3})(\d)/, "$1-$2");
        this.setState({
            value: event.target.value
        });
    }
    
    handleSubmit = (values) => {
        const {value} = this.state;
        const postValue = {
            username: values.username,
            email: values.email,
            phone: value,
            message: values.message
        }
        this.setState({loading: true})
        fetch('http://localhost:3001/contacts', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postValue)
        })
        .then(response => response.json())
        .then(this.onSuccess)
        .catch((res) => {
            this.onError(res.message);
        }); 
    }

    onSuccess = () => {
        this.setState ({
            success: true,
            loading: false
        });
    }

    onBack = () => {
        this.setState({success:false})
    }

    render() {
        const {success, error, loading} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const forms = !(success || loading || error) ? <GetForm handleSubmit = {this.handleSubmit} state = {this.state.value} phoneNumberMask = {this.phoneNumberMask}/> : null;
        const thanks = success && !(loading || error) ? <ThanksBlock onBack = {this.onBack}/> : null;
        return (
            <>
                <div className="contact__banner">
                    <Container>
                        <Row>
                            <Col lg = '6'>
                                <NavPanel position = "header" color = "text-white" img = {Logo}/>
                            </Col>
                        </Row>
                        <h1 className="title-big">Contact us</h1>
                    </Container>
                </div>
                <section className="shop">
                    <Container>
                        <Row>
                            <Col lg = {{size: 8, offset: 2}}>
                                <div className="title">Tell us about your taste</div>
                                <img className="beanslogo" src={BeansBlack} alt="Beans logo"/>
                                {errorMessage}
                                {spinner}
                                {forms}
                                {thanks}
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}

const GetForm = ({handleSubmit, state, phoneNumberMask}) => {
    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                phone: "",
                message: ""
            }}
            validationSchema={FormSchema}
            onSubmit={handleSubmit}
            render={({ errors, touched }) => (
                <Form>
                    <label htmlFor="username" className="form-title col-lg-3 offset-3">Name<span className="text-danger">*</span></label>
                    <Field name="username" placeholder="nickname" type="text" className = "col-lg-5 form__search-input"/>

                    {errors.username &&
                        touched.username && (
                        <div className="field-error">{errors.username}</div>
                        )}

                    <label htmlFor="email" className="form-title col-lg-3 offset-3">Email<span className="text-danger">*</span></label>
                    <Field
                        name="email"
                        placeholder="ivanov2000@gmail.com"
                        type="email"
                        className = "col-lg-5 form__search-input"
                    />

                    {errors.email &&
                        touched.email && <div className="field-error">{errors.email}</div>}

                    <label htmlFor="phone" className="form-title col-lg-3 offset-3">Phone</label>
                    <Field name="phone" placeholder="+7(___)___-____" type="phone" className = "col-lg-5 form__search-input" value = {state} onChange = {phoneNumberMask}/>
                    
                    <label htmlFor="message" className="form-title col-lg-12 text-center">Your message<span className="text-danger">*</span></label>
                    <Field name="message" component="textarea" placeholder="Tell us..." type="text" className = "col-lg-6 offset-3 form__textarea"/>

                    {errors.message &&
                        touched.message && (
                        <div className="field-error">{errors.message}</div>
                        )}

                    <button type="submit" className = "form__btn btn col-lg-3 offset-5">Send up</button>
                </Form>
            )}
            />
    )
}

const ThanksBlock = ({onBack}) => {
    return (
        <div className="thanks-block">
            <div className="thanks-title">Thank you so much<br/>We contact you as soon as possible</div>
            <img className="beanslogo" src={Thanks} alt="Beans logo"/>
            <button type="submit" className = "form__btn btn col-lg-3 offset-5" onClick = {onBack}>Another?</button>
        </div>
    )
}