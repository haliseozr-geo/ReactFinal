import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Button } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";

import alertify from "alertifyjs";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardGroup,
  Col,
} from "reactstrap";

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }

  addToCart = (product) => {
    const { currentUser } = this.props;
    const isLoggedIn = Object.keys(currentUser).length > 0;

    if (!isLoggedIn) {
      alertify.error("Favoriye eklemek için giriş yapmalısınız");
      return;
    }

    const isItemInCart = this.props.cart.find((cartItem) => cartItem.product.id === product.id);
    if (isItemInCart) {
      alertify.error(product.productName + " favorilere zaten eklenmiş!");
    } else {
      this.props.actions.addToCart({ product });
      alertify.success(product.productName + " favorilere eklendi");
    }
  };

  renderCardMusic = (musicSrc) => {
    return (
      <audio controls>
        <source src={musicSrc} type="audio/mpeg" />
      </audio>
    );
  };

  render() {
    const { currentUser, currentCategory, products } = this.props;

    return (
      <div>
        <h3>
          <Badge style={{ color: "white", borderRadius: "10px", fontSize: "18px" }}>Şarkılar</Badge>
          <Badge color="info" style={{ color: "white", borderRadius: "10px", fontSize: "17px" }}>
            {this.props.currentCategory.categoryName}
          </Badge>
        </h3>
        <CardGroup>
          {products.map((product) => (
            <Col xs="4" key={product.id}>
              <Card style={{ marginLeft: "10px", marginRight: "10px", marginTop: 50, borderRadius: "20px" }}>
                <img
                  top
                  height="280"
                  src={product.image}
                  alt={product.productName}
                  style={{ padding: 10, borderRadius: "18px" }}
                />
                <CardBody>
                  <CardTitle>
                    <h4 style={{ color: "rgb(28, 29, 31)" }}>{product.productName}</h4>
                  </CardTitle>
                  <CardText style={{ color: "rgb(28, 29, 31)" }}>{product.desc}</CardText>
                  {currentUser ? (
                    <Button onClick={() => this.addToCart(product)} color="info">
                      <b style={{ color: "white" }}>Favoriye Ekle</b>
                    </Button>
                  ) : (
                    <Button disabled color="info">
                      <b style={{ color: "white" }}>Favoriye Ekle</b>
                    </Button>
                  )}
                </CardBody>
              </Card>

              <div style={{ marginTop: 15, marginLeft: 22 }}>{this.renderCardMusic(`sounds/${product.music}`)}</div>
            </Col>
          ))}
        </CardGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
    currentUser: state.checkLoginReducer,
    cart: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
