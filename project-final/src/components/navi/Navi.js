import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";
import CartSummary from "../cart/CartSummary";
import { connect } from "react-redux";
import { logoutUser } from '../../redux/actions/userActions';


class Navi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleLogout = () => {
    this.props.logoutUser();
    window.location.href = "/login";
  };

  render() {
    const { currentUser } = this.props;
    const isLoggedIn = Object.keys(currentUser).length > 0;

    return (
      <div>
        <Navbar color="dark" light>
          <NavbarBrand><Link to="/product"><b style={{ color: "white", fontSize: 28 }}>Anasayfa</b></Link></NavbarBrand>

          <NavbarBrand><b style={{ color: "white", fontSize: 28 }}>  {isLoggedIn ? (
            <h4 style={{ color: "white" }}>Hoşgeldiniz Sayın: <b style={{ color: "green" }}>{currentUser.username}</b></h4>
          ) : (
            <h4 style={{ color: "white" }}>Henüz bir kullanıcı giriş yapmadı</h4>
          )}</b></NavbarBrand>

          <NavbarToggler className="btn btn-info" onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar >
              <NavItem>
                {currentUser && Object.keys(currentUser).length > 0 ? (
                  <Link
                    to="/login"
                    onClick={this.handleLogout}
                    style={{ color: "rgb(239, 242, 244)", fontSize: 17 }}
                  >
                    <b>Çıkış yap</b>
                  </Link>
                ) : (
                  <NavItem>
                    <Link
                      to="/login"
                      style={{ color: "rgb(239, 242, 244)", fontSize: 17 }}
                    >
                      <b>Giriş yap</b>
                    </Link>
                    <br />
                    <Link
                      to="/register"
                      style={{ color: "rgb(239, 242, 244)", fontSize: 17 }}>
                      <b>Kayıt Ol</b>

                    </Link>
                  </NavItem>
                )}
              </NavItem>

              <CartSummary />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.checkLoginReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
