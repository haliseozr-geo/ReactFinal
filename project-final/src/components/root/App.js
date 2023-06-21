import React, { Component } from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Route, Switch } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import NotFound from "../common/NotFound";
import Login from "./Login";
import ProductList from "../products/ProductList";
import Register from "./Register";

export default class App extends Component {



  render() {
    return (

      <div>
        <Navi />
        <Container>
          <Switch>
            <Route exact path="/" component={Login} />

            <Route path="/product" component={Dashboard} />
            <Route path="/cart" component={CartDetail} />
            <Route
              path="/login"
              component={Login}
            />
            <Route
              path="/productlist"
              render={() => <ProductList />}
            />

            <Route path="/register" component={Register} />
            <Route component={NotFound} />


          </Switch>

        </Container >

      </div>

    );
  }
}

