import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectToLogin: false,
            error: false,
            errorMessage: '',
        };
    }
    handleRegister = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        if (!username || !password) {
            this.setState({ error: true, errorMessage: 'Kullanıcı adı ve şifre alanları boş olamaz' });
            return;
        }

        fetch(`http://localhost:3000/users?username=${username}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    this.setState({ error: true, errorMessage: 'Bu kullanıcı adı zaten mevcut' });
                } else {

                    const userData = {
                        username,
                        password,
                    };

                    this.props.register(userData);

                    this.setState({ redirectToLogin: true });
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({ error: true, errorMessage: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
            });
    };


    render() {
        const { username, password, redirectToLogin, error, errorMessage } = this.state;

        if (redirectToLogin) {
            return <Redirect to="/login" />;
        }
        let errorMessageElement = null;
        if (error) {
            errorMessageElement = <p style={{ color: 'red' }}>{errorMessage}</p>;
        }


        return (
            <div style={{ marginTop: '50px' }}>
                <h1 style={{ color: "white", marginLeft: 400 }}>KAYIT SAYFASI</h1>
                <Row>
                    <Col sm="3"></Col>
                    <Col sm="6">
                        <Form id="form">
                            <FormGroup>
                                <Label style={{ color: 'white' }} for="username">
                                    <h3>Kullanıcı Adı</h3>
                                </Label>
                                <Input type="text" name="username" id="username" placeholder="Kullanıcı adı" value={username} onChange={(e) => this.setState({ username: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{ color: 'white' }} for="password">
                                    <h3>Şifre</h3>
                                </Label>
                                <Input type="password" name="password" id="password" placeholder="Şifre" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                            </FormGroup>
                            {errorMessageElement}

                            <Button onClick={this.handleRegister} type="button">
                                Kayıt Ol
                            </Button>
                        </Form>
                    </Col>
                    <Col sm="3"></Col>
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
        register: (userData) => dispatch(register(userData)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
