import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import * as userActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToProducts: false,
            error: false,
            errorMessage: '',
        };
    }

    handleLogin = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        this.props.actions.getUsernamePassword(username, password);

        setTimeout(() => {  // asenkron oldugu ıcın belli bi süre beklettim
            if (Object.keys(this.props.currentUser).length > 0) {
                this.setState({ redirectToProducts: true, error: false });
            } else {
                this.setState({ error: true, errorMessage: 'Yanlış kullanıcı adı veya şifre' });
            }
        }, 200);
    };


    render() {
        if (this.state.redirectToProducts) {
            return <Redirect to="/product" />;
        }

        let errorMessage = null;
        if (this.state.error) {
            errorMessage = <p style={{ color: 'red' }}>{this.state.errorMessage}</p>;
        }

        return (
            <div style={{ border: '1px solid green', padding: '10px', marginTop: '50px' }}>
                <h1 style={{ color: "white", marginLeft: 400 }}>GİRİŞ SAYFASI</h1>

                <Row>
                    <Col sm="3"></Col>
                    <Col sm="6">
                        <Form id="form">
                            <FormGroup>
                                <Label style={{ color: 'white' }} for="username">
                                    <h3>Kullanıcı Adı</h3>
                                </Label>
                                <Input type="text" name="username" id="username" placeholder="username" />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{ color: 'white' }} for="password">
                                    <h3>Şifre</h3>
                                </Label>
                                <Input type="password" name="password" id="password" placeholder="Password" />
                            </FormGroup>
                            {errorMessage}
                            <Button onClick={this.handleLogin} type="button">
                                Giriş Yap
                            </Button>
                        </Form>
                    </Col>
                    <Col sm="3"></Col>
                    <h3 style={{ marginLeft: 300, color: 'white' }}>username: admin şifre: 123</h3>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.checkLoginReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getUsernamePassword: bindActionCreators(userActions.getUsernamePassword, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
