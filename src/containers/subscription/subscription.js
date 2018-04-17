import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import validator from 'validator';
import swal from 'sweetalert2'

import Header from '../../components/header/header';
import './subscription.css';

import productImg from './free-perfume-product.png';
import birdImg from './image.png';
import womenImg from './women.png';
import menImg from './men.png';

class Subscription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: {id: 'email', isValid: true, value: '', isVisible: true},
                password: {id: 'password', isValid: true, value: '', isVisible: true},
                firstName: {id: 'first-name', isValid: true, value: '', isVisible: true},
                lastName: {id: 'last-name', isValid: true, value: '', isVisible: true},
                streetAddress: {id: 'street-address', isValid: true, value: '', isVisible: true},
                appSuite: {id: 'app-suite', isValid: true, value: '', isVisible: true},
                zip: {id: 'zip', isValid: true, value: '', isVisible: true},
                state: {id: 'state', isValid: true, value: 'New York', isVisible: true},
                city: {id: 'city', isValid: true, value: '', isVisible: true},
                country: {id: 'country', isValid: true, value: '', isVisible: true},
                mobilePhone: {id: 'mobile-phone', isValid: true, value: '', isVisible: true},
                cardNumber: {id: 'card-number', isValid: true, value: '', isVisible: true},
                securityCode: {id: 'security-code', isValid: true, value: '', isVisible: true},
                month: {id: 'month', isValid: true, value: 'Month', isVisible: true},
                year: {id: 'year', isValid: true, value: 'Year', isVisible: true},
                useCredit: {id: 'use-credit', isValid: true, value: false, isVisible: true},
                subscription: {
                    id: 'form-subscription-wrapper',
                    isValid: true,
                    value: {men: false, women: false},
                    isVisible: true
                }
            },
            isSubmit: false
        };
    }

    handleSubmit = () => this.onSubmit();
    handleOnChange = (e) => this.onChange(e);
    handleSwitchBilling = (e) => this.switchBilling(e);

    onSubmit() {

        this.setState({isSubmit: true});

        let key, stateData = {};
        for (key in this.state.data) {
            if (this.state.data.hasOwnProperty(key)) {
                stateData[key] = this.state.data[key];
            }
        }

        let id, isValid, element, value, isVisible;
        for (key in stateData) {
            if (stateData.hasOwnProperty(key)) {
                id = stateData[key]['id'];
                isVisible = stateData[key]['isVisible'];
                element = document.getElementById(id);
                value = element.value + '';
                isValid = stateData[key]['isValid'];
                if (key === 'subscription') {
                    value = this.state.data.subscription.value;
                    isVisible = this.isDisplayed('subscription-type-wrapper');
                    isValid = (!(!value['women'] && !value['men']));
                }
                if (key === 'email') {
                    isVisible = this.isDisplayed('account-fields');
                    isValid = (validator['isEmail'](value) === true);
                }
                if (key === 'password') {
                    isVisible = this.isDisplayed('account-fields');
                    isValid = (validator['isAlphanumeric'](value) === true);
                }
                if (key === 'firstName' || key === 'lastName') {
                    isValid = (validator['isAlpha'](value) === true);
                }
                if (key === 'streetAddress' || key === 'country') {
                    isVisible = this.isDisplayed('form-billing-path');
                    isValid = !(validator['isEmpty'](value) === true);
                }
                if (key === 'appSuite') {
                    isVisible = this.isDisplayed('form-billing-path');
                    isValid = true;
                }
                if (key === 'zip') {
                    isVisible = this.isDisplayed('form-billing-path');
                    isValid = (validator['isPostalCode'](value, 'US') === true);
                }
                if (key === 'state') {
                    isVisible = this.isDisplayed('form-billing-path');
                }
                if (key === 'city') {
                    isVisible = this.isDisplayed('form-billing-path');
                }
                if (key === 'mobilePhone') {
                    isVisible = this.isDisplayed('form-billing-path');
                    value = parseInt(value.replace(/\D+/g, ''), 10);
                    isValid = (validator['isMobilePhone'](value + '', 'en-US') === true);
                }
                if (key === 'cardNumber') {
                    isValid = (validator['isCreditCard'](value) === true);
                }
                if (key === 'securityCode') {
                    isValid = (value.length === 3);
                    isValid = (validator['isLength'](value, {min: 3, max: 3}) === true &&
                        validator['isNumeric'](value) === true);
                }
                if (key === 'month') {
                    isValid = (value !== 'Month');
                }
                if (key === 'year') {
                    isValid = (value !== 'Year');
                }
                if (key === 'useCredit') {
                    value = element.checked;
                }
                stateData[key] = {id: id, isValid: isValid, value: value, isVisible: isVisible};
                this.setState({data: stateData});
            }
        }

        console.log(stateData);

    }

    onChange(e) {

        this.setState({isSubmit: false});

        let key, stateData = {};
        for (key in this.state.data) {
            if (this.state.data.hasOwnProperty(key)) {
                stateData[key] = this.state.data[key];
            }
        }

        let value, id = e.target.id;
        for (key in stateData) {
            if (stateData.hasOwnProperty(key)) {
                if (id === stateData[key]['id']) {
                    value = e.target.value;
                    if (key === 'useCredit') {
                        value = e.target.checked;
                    }
                    if (key === 'securityCode') {
                        if (value === '111') {
                            swal(
                                'Good job!',
                                'Your security code is 111',
                                'success'
                            )
                        }
                    }
                    stateData[key]['value'] = value;
                    stateData[key]['isValid'] = true;
                }
            }
        }

        this.setState({data: stateData});

    }

    switchBilling(e) {
        let element = document.getElementById('form-billing-path');
        if (e.target.checked === true) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    switchSubscription(value) {
        let obj = {men: true, women: false};
        if (value === 'women') {
            obj = {men: false, women: true}
        }

        let stateData = {};
        for (let key in this.state.data) {
            if (this.state.data.hasOwnProperty(key)) {
                stateData[key] = this.state.data[key];
                if (key === 'subscription') {
                    stateData[key]['value'] = obj;
                    stateData[key]['isValid'] = true;
                }
            }
        }

        this.setState({data: stateData});
    }

    isDisplayed(id) {
        let elem = document.getElementById(id);
        return !(window.getComputedStyle(elem).display === 'none' || elem.style.display === 'none');
    }

    render() {
        const {subscription, email, password, firstName, lastName, streetAddress, appSuite, zip, state, city, country, mobilePhone, cardNumber, securityCode, month, year} = this.state.data;
        let isSubmit = this.state.isSubmit;

        if (this.props.cities) {
            let cities = this.props.cities.data;
            return (
                <div id="subscription">
                    <Container>
                        <Row>
                            <Col>
                                <Header/>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col xs="12" lg="5">
                                <div className="product-header">
                                    <h1>Month-to-month subscription</h1>
                                    <h4>Monthly Subscription</h4>
                                    <p>Billed monthly. Renews automatically, cancel any time. Free shipping.</p>
                                </div>
                                <div className="product-wrapper">
                                    <div className="product-image-wrapper">
                                        <img src={productImg} alt="product-img"/>
                                    </div>
                                    <div className="product-details-wrapper">
                                        <div className="product-details">
                                            <div className="product-details-row">
                                                <div>Monthly subscription</div>
                                                <div>$14.95</div>
                                            </div>
                                            <div className="product-details-row">
                                                <div>Shipping</div>
                                                <div>FREE</div>
                                            </div>
                                            <div className="product-details-row">
                                                <div>Tax</div>
                                                <div>$2.35</div>
                                            </div>
                                            <div className="product-details-row">
                                                <div>Discount</div>
                                                <div className="discount">-$5</div>
                                            </div>
                                            <div className="product-details-row">
                                                <div>Credit (Balance $100)</div>
                                                <div className="credit-wrapper">
                                                    <div className="credit-data">$50</div>
                                                    <Input id="use-credit"
                                                           type="checkbox"
                                                           onChange={this.handleOnChange}

                                                           className="credit-custom-checkbox"/>
                                                    <Label for="use-credit"
                                                           className="credit-custom-checkbox-label">{' '}</Label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-total">
                                            <div className="product-total-row">
                                                <div>Total</div>
                                                <div>$25.00</div>
                                            </div>
                                            <p>Have a <Link to="#" className="coupon-link">coupon code</Link>?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-wrapper">
                                    <div className="info-image"><img src={birdImg} alt="bird-img"
                                                                     className="img-fluid"/>
                                    </div>
                                    <div className="info-text">
                                        You will receive an email confirmation when recipient accepts your gift.
                                        Scentbird
                                        ships between the 15th and the 18th of every month. Recipient will receive an
                                        email
                                        confirmation of shipment every month. Please allow 5-7 days for delivery.
                                    </div>
                                </div>
                            </Col>
                            <Col xs="12" lg="7">
                                <div className="form-wrapper">
                                    <Form>
                                        <div className="form-header">
                                            <h1>Month-to-month subscription</h1>
                                            <p>Billed monthly. Renews automatically, cancel any time. Free shipping.</p>
                                        </div>
                                        <div className="subscription-type-wrapper" id="subscription-type-wrapper">
                                            <h4 className="form-title">Choose your subscription type</h4>
                                            <FormGroup row className="mb-2">
                                                <div
                                                    className={(subscription.isValid) ? 'form-subscription-wrapper' : 'form-subscription-wrapper is-invalid'}
                                                    id="form-subscription-wrapper">
                                                    <div className="form-subscription-option"
                                                         onClick={() => this.switchSubscription('women')}>
                                                        <div className="subscription-image">
                                                            <img src={womenImg} alt="women-img"/>
                                                        </div>
                                                        <span
                                                            className={(subscription.value['women']) ? 'subscription-check-image' : 'subscription-uncheck-image'}/>
                                                        <div className="subscription-text">For women</div>
                                                    </div>
                                                    <div className="form-subscription-option"
                                                         onClick={() => this.switchSubscription('men')}>
                                                        <div className="subscription-image">
                                                            <img src={menImg} alt="men-img"/>
                                                        </div>
                                                        <span
                                                            className={(subscription.value['men']) ? 'subscription-check-image' : 'subscription-uncheck-image'}/>
                                                        <div className="subscription-text">For men</div>
                                                    </div>
                                                </div>
                                                <FormFeedback className="subscription-feedback">Your gender is
                                                    required</FormFeedback>
                                            </FormGroup>
                                        </div>
                                        <div className="account-fields" id="account-fields">
                                            <h4 className="form-title">Create account</h4>
                                            <FormGroup row className="mb-2">
                                                <Col>
                                                    <Label for="email" hidden>Email</Label>
                                                    <InputGroup>
                                                        <Input type="email"
                                                               name="email"
                                                               id="email"
                                                               className={(email.isValid && isSubmit) ? "input-group-custom is-valid" : "input-group-custom"}
                                                               placeholder="Email address"
                                                               onChange={this.handleOnChange}
                                                               invalid={!email.isValid}
                                                               autoComplete="off"/>
                                                        <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-span">
                                                            <i className="fas fa-check"/>
                                                        </span>
                                                        </InputGroupAddon>
                                                        <FormFeedback className="mt-0">This field is
                                                            required</FormFeedback>
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <Label for="password" hidden>Password</Label>
                                                    <InputGroup>
                                                        <Input type="password"
                                                               name="password"
                                                               id="password"
                                                               className={(password.isValid && isSubmit) ? "input-group-custom is-valid" : "input-group-custom"}
                                                               placeholder="Password"
                                                               onChange={this.handleOnChange}
                                                               invalid={!password.isValid}
                                                               autoComplete="off"/>
                                                        <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-span">
                                                            <i className="fas fa-check"/>
                                                        </span>
                                                        </InputGroupAddon>
                                                        <FormFeedback className="mt-0">This field is
                                                            required</FormFeedback>
                                                    </InputGroup>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                        <h4 className="form-title">Shipping address</h4>
                                        <FormGroup row className="mb-0">
                                            <Col sm="12" md="6">
                                                <div className="custom-input-label-wrapper">
                                                    <Label for="first-name" className="custom-input-label">
                                                        First name</Label>
                                                </div>
                                                <InputGroup>
                                                    <Input type="text"
                                                           name="first-name"
                                                           id="first-name"
                                                           className={(firstName.isValid && isSubmit) ? "input-group-custom is-valid" : "input-group-custom"}
                                                           placeholder="First name"
                                                           onChange={this.handleOnChange}
                                                           invalid={!firstName.isValid}
                                                           autoComplete="off"/>
                                                    <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-span">
                                                            <i className="fas fa-check"/>
                                                        </span>
                                                    </InputGroupAddon>
                                                    <FormFeedback className="mt-0">This field is required</FormFeedback>
                                                </InputGroup>
                                            </Col>
                                            <Col sm="12" md="6">
                                                <Label for="last-name" hidden>Last name</Label>
                                                <InputGroup>
                                                    <Input type="text"
                                                           name="last-name"
                                                           id="last-name"
                                                           className={(lastName.isValid && isSubmit) ? "input-group-custom is-valid" : "input-group-custom"}
                                                           placeholder="Last name"
                                                           onChange={this.handleOnChange}
                                                           invalid={!lastName.isValid}
                                                           autoComplete="off"/>
                                                    <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-span">
                                                            <i className="fas fa-check"/>
                                                        </span>
                                                    </InputGroupAddon>
                                                    <FormFeedback className="mt-0">This field is required</FormFeedback>
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup check className="mb-0">
                                            <Input id="use-billing"
                                                   type="checkbox"
                                                   className="billing-custom-checkbox"
                                                   onChange={this.handleSwitchBilling}/>
                                            <Label for="use-billing" check
                                                   className="billing-custom-checkbox-label">{' '}Use
                                                this address as my billing address</Label>
                                        </FormGroup>
                                        <div className="form-billing-path" id="form-billing-path">
                                            <FormGroup row className="mb-0">
                                                <Col sm="12" md="8">
                                                    <Label for="street-address" hidden>Street address</Label>
                                                    <InputGroup>
                                                        <Input type="text"
                                                               name="street-address"
                                                               id="street-address"
                                                               className={(streetAddress.isValid && isSubmit) ? "input-group-custom is-valid" : "input-group-custom"}
                                                               placeholder="Street address"
                                                               onChange={this.handleOnChange}
                                                               invalid={!streetAddress.isValid}
                                                               autoComplete="off"/>
                                                        <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-span">
                                                            <i className="fas fa-check"/>
                                                        </span>
                                                        </InputGroupAddon>
                                                        <FormFeedback className="mt-0">This field is
                                                            required</FormFeedback>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm="12" md="4">
                                                    <Label for="app-suite" hidden>App/Suite (Optional)</Label>
                                                    <InputGroup>
                                                        <Input type="text"
                                                               name="app-suite"
                                                               id="app-suite"
                                                               className={(appSuite.isValid && isSubmit) ? "input-group-custom is-valid readonly" : "input-group-custom readonly"}
                                                               placeholder="App/Suite (Optional)"
                                                               onChange={this.handleOnChange}
                                                               invalid={!appSuite.isValid}
                                                               autoComplete="off"
                                                               readOnly/>
                                                        <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-span">
                                                            <i className="fas fa-check"/>
                                                        </span>
                                                        </InputGroupAddon>
                                                        <FormFeedback className="mt-0">This field is
                                                            required</FormFeedback>
                                                    </InputGroup>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className="mb-0">
                                                <Col sm="12" md="4">
                                                    <Label for="zip" hidden>ZIP</Label>
                                                    <InputGroup>
                                                        <Input type="text"
                                                               name="zip"
                                                               id="zip"
                                                               className={(zip.isValid && isSubmit) ? "input-group-custom is-valid" : "input-group-custom"}
                                                               placeholder="ZIP"
                                                               onChange={this.handleOnChange}
                                                               invalid={!zip.isValid}
                                                               autoComplete="off"/>
                                                        <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-span">
                                                            <i className="fas fa-check"/>
                                                        </span>
                                                        </InputGroupAddon>
                                                        <FormFeedback className="mt-0">This field is
                                                            required</FormFeedback>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="4" className="state-field">
                                                    <Label for="state" hidden>State</Label>
                                                    <Input type="select"
                                                           name="state"
                                                           id="state"
                                                           className="select-custom"
                                                           value={state.value}
                                                           onChange={this.handleOnChange}>
                                                        {Object.keys(cities).map((key, index) => (
                                                            <option value={key} key={index}>{key}</option>
                                                        ))}
                                                    </Input>
                                                </Col>
                                                <Col md="4" className="city-field">
                                                    <Label for="city" hidden>City</Label>
                                                    <Input type="select"
                                                           name="city"
                                                           id="city"
                                                           value={city.value}
                                                           className="select-custom"
                                                           onChange={this.handleOnChange}>
                                                        {cities[state.value].map((key, index) => (
                                                            <option value={key} key={index}>{key}</option>
                                                        ))}
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className="mb-0">
                                                <Col xs="12">
                                                    <Label for="country" hidden>Country</Label>
                                                    <InputGroup>
                                                        <Input type="text"
                                                               name="country"
                                                               id="country"
                                                               className={(country.isValid && isSubmit) ? "input-group-custom is-valid" : "input-group-custom"}
                                                               placeholder="Country"
                                                               onChange={this.handleOnChange}
                                                               invalid={!country.isValid}
                                                               autoComplete="off"/>
                                                        <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-span">
                                                            <i className="fas fa-check"/>
                                                        </span>
                                                        </InputGroupAddon>
                                                        <FormFeedback className="mt-0">This field is
                                                            required</FormFeedback>
                                                    </InputGroup>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className="mb-2">
                                                <Col sm="12" md="6">
                                                    <Label for="mobile-phone" hidden>Mobile number (Optional)</Label>
                                                    <InputGroup>
                                                        <Input type="text"
                                                               name="mobile-phone"
                                                               id="mobile-phone"
                                                               className={(mobilePhone.isValid && isSubmit) ? "input-group-custom is-valid" : "input-group-custom"}
                                                               placeholder="Mobile number (Optional)"
                                                               onChange={this.handleOnChange}
                                                               invalid={!mobilePhone.isValid}
                                                               autoComplete="off"/>
                                                        <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-span">
                                                            <i className="fas fa-check"/>
                                                        </span>
                                                        </InputGroupAddon>
                                                        <FormFeedback className="mt-0">This field is
                                                            required</FormFeedback>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="6" className="offers-text-field">
                                                    <p className="send-offers-text">We may send you special discounts
                                                        and
                                                        offers</p>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                        <h4 className="form-title">Secure credit card payment</h4>
                                        <div className="form-card-payment">
                                            <div className="form-payment-title">
                                                <div className="form-payment-encryption-wrapper">
                                                    <div className="encryption-image"/>
                                                    <div className="encryption-text">128-bit encryption. You're safe
                                                    </div>
                                                </div>
                                                <div className="form-payment-cards-wrapper">
                                                    <i className="fab fa-cc-visa"/>
                                                    <i className="fab fa-cc-mastercard"/>
                                                    <i className="fab fa-cc-discover"/>
                                                    <i className="fab fa-cc-amex"/>
                                                </div>
                                            </div>
                                            <FormGroup row className="mb-0">
                                                <Col md="8">
                                                    <div>
                                                        <Label for="card-number" hidden>Credit card number</Label>
                                                        <InputGroup>
                                                            <Input type="text" name="card-number" id="card-number"
                                                                   className={(cardNumber.isValid && isSubmit) ? "input-group-custom is-valid" : "input-group-custom"}
                                                                   placeholder="Credit card number"
                                                                   onChange={this.handleOnChange}
                                                                   invalid={!cardNumber.isValid}
                                                                   autoComplete="off"/>
                                                            <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-card-number">
                                                            <i className="fas fa-lock"/>
                                                        </span>
                                                            </InputGroupAddon>
                                                            <FormFeedback className="mt-0">This field is
                                                                required</FormFeedback>
                                                        </InputGroup>
                                                    </div>
                                                    <div className="expiry-fields">
                                                        <div className="month-field">
                                                            <Label for="month" hidden>Month</Label>
                                                            <Input type="select"
                                                                   name="month"
                                                                   id="month"
                                                                   onChange={this.handleOnChange}
                                                                   value={month.value}
                                                                   invalid={!month.isValid}
                                                                   className="select-custom">
                                                                <option value="Month" disabled>Month</option>
                                                                <option value="01">01</option>
                                                                <option value="02">02</option>
                                                                <option value="03">03</option>
                                                                <option value="04">04</option>
                                                                <option value="05">05</option>
                                                                <option value="06">06</option>
                                                                <option value="07">07</option>
                                                                <option value="08">08</option>
                                                                <option value="09">09</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                            </Input>
                                                            <FormFeedback className="mt-0">This field is
                                                                required</FormFeedback>
                                                        </div>
                                                        <div className="year-field">
                                                            <Label for="year" hidden>Year</Label>
                                                            <Input type="select"
                                                                   name="year"
                                                                   id="year"
                                                                   onChange={this.handleOnChange}
                                                                   value={year.value}
                                                                   invalid={!year.isValid}
                                                                   className="select-custom">
                                                                <option disabled>Year</option>
                                                                <option>18</option>
                                                                <option>19</option>
                                                                <option>20</option>
                                                                <option>21</option>
                                                                <option>22</option>
                                                                <option>23</option>
                                                                <option>24</option>
                                                                <option>25</option>
                                                            </Input>
                                                            <FormFeedback className="mt-0">This field is
                                                                required</FormFeedback>
                                                        </div>
                                                        <div className="expiry-text-field">
                                                            <p className="expiry-text">Exp.</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="4">
                                                    <div className="security-code-field">
                                                        <div>
                                                            <Label for="security-code" hidden>Security code</Label>
                                                            <InputGroup>
                                                                <Input type="text"
                                                                       name="security-code"
                                                                       id="security-code"
                                                                       className={(securityCode.isValid && isSubmit) ? "input-group-custom is-valid" : "input-group-custom"}
                                                                       placeholder="Security code"
                                                                       onChange={this.handleOnChange}
                                                                       invalid={!securityCode.isValid}
                                                                       autoComplete="off"/>
                                                                <InputGroupAddon addonType="append">
                                                        <span className="input-group-text input-group-span">
                                                            <i className="fas fa-check"/>
                                                        </span>
                                                                </InputGroupAddon>
                                                                <FormFeedback className="mt-0">This field is
                                                                    required</FormFeedback>
                                                            </InputGroup>
                                                        </div>
                                                        <div>
                                                            <div className="question">
                                                                <i className="fas fa-question-circle"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                        <FormGroup row className="mb-0">
                                            <Col sm={{size: 0, offset: 0}} md={{size: 2, offset: 5}}
                                                 className="d-flex flex-row-reverse">
                                                <Link to="#" className="back-button">Back</Link>
                                            </Col>
                                            <Col sm="12" md="5">
                                                <div className="submit-wrapper" id="submit" onClick={this.handleSubmit}>
                                                    <h3 className="submit-text mb-0">Buy now</h3>
                                                    <div className="submit-arrow"/>
                                                </div>
                                            </Col>
                                        </FormGroup>
                                        <div className="info-wrapper-bottom">
                                            <FormGroup row className="mb-0">
                                                <Col xs={{size: 12, order: 2}} sm={{size: 6, order: 1}}>
                                                    <div className="info-image">
                                                        <img src={birdImg} alt="bird-img" className="img-fluid"/>
                                                    </div>
                                                </Col>
                                                <Col xs={{size: 12, order: 1}} sm={{size: 6, order: 2}}>
                                                    <div className="info-text">
                                                        You will receive an email confirmation when recipient accepts
                                                        your gift. Scentbird ships between the 15th and the 18th of
                                                        every
                                                        month. Recipient will receive an email confirmation of shipment
                                                        every month. Please allow 5-7 days for delivery.
                                                    </div>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        } else {
            return (<h1>Loading...</h1>);
        }
    }
}

const mapStateToProps = (state) => {
    debugger;
    return {
        cities: state.citiesReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
