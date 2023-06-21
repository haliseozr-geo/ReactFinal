import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Badge } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (event) => {
    const categoryId = parseInt(event.target.value);
    if (categoryId === 0) {
      this.props.actions.getProducts();
      this.props.actions.changeCategory({ id: 0, categoryName: "Tüm Şarkılar" });
    } else {
      const category = this.props.categories.find((cat) => cat.id === categoryId);
      this.props.actions.changeCategory(category);
      this.props.actions.getProducts(categoryId);
    }
  };

  render() {
    const { categories, currentCategory } = this.props;

    return (
      <div>
        <select
          onChange={this.selectCategory}
          value={currentCategory.id}
          style={{
            backgroundColor: "rgb(73, 88, 103)",
            color: "white",
            fontSize: "16px",
            marginTop: 10,
            padding: "8px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        >
          <option value={0} style={{ backgroundColor: "rgb(73, 88, 103)" }}>
            Tüm Şarkılar
          </option>
          {categories.map((category) => (
            <option
              value={category.id}
              key={category.id}
              style={{
                backgroundColor: "rgb(73, 88, 103)",
                borderRadius: "10px",
                fontSize: "16px",
              }}
            >
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
    products: state.productListReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...categoryActions, ...productActions },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
