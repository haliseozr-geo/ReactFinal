import React, { Component } from 'react'
import { Row, Col } from "reactstrap"
import CategoryList from "../categories/CategoryList"
import ProductList from "../products/ProductList"

export default class Dashboard extends Component {
    render() {

        return (
            <div style={{ backgroundColor: "rgb(26, 27, 28)" }}>

                <div style={{ marginLeft: 500 }}><CategoryList /></div>
                <br />
                <ProductList />
            </div>
        )
    }
}

