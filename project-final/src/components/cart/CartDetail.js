import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Table, Button } from "reactstrap";
import alertify from "alertifyjs"

class CartDetail extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " favorilerden silindi")
  }
  render() {
    const { currentUser } = this.props
    let i = 0;
    return (
      <div>
        <br />
        <h1 style={{ textAlign: "center", color: "white" }}>{currentUser.username} Kullanıcısının Favorileri</h1>
        <br />
        <Table>
          <thead>
            <tr>
              <th style={{ color: "white" }}>#</th>
              <th style={{ color: "white" }}>Şarkı İsmi</th>
              <th style={{ color: "white" }}>Sanatçı İsmi</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map(cartItem => (
              <tr key={cartItem.product.id}>
                <th style={{ color: "white" }} scope="row">{++i}</th>
                <td style={{ color: "white" }} >{cartItem.product.productName}</td>
                <td style={{ color: "white" }}>{cartItem.product.desc}</td>
                <td style={{ color: "white" }}>
                  <Button
                    color="danger"
                    onClick={() => this.removeFromCart(cartItem.product)}
                  >
                    favorilerden kaldır
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
    }
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    currentUser: state.checkLoginReducer
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDetail);
