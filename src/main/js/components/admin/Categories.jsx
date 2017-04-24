import React from "react";
import axios from "axios";
import { Table, Button, ButtonToolbar, FormControl } from 'react-bootstrap';
import CommentList from "../CommentList.scss"; // eslint-disable-line
// import Input from "react-toolbox/components/input/Input.d";
// import { Switch }from "react-toolbox/lib/switch";

class Categories extends React.Component {

  constructor() {
    super();
    this.loadCategories = this.loadCategories.bind(this);
  }

  componentDidMount() {
    if (!this.state) {
      this.loadCategories();
    }
  }

  loadCategories() {
    let categories;
    axios.get('/categories')
      .then(
        success => {
          categories = success.data.map(cat => Categories.getCatRow(cat));
          this.setState({categories});
        },
            failure => console.log(failure)
      );
  }
  // {/*<td><Switch checked={cat.isActive} onChange={axios.post(`/categories/mode/${cat.categoryId}`, {})}/></td>*/}

  static getCatRow(cat) {
    return (<tr key={cat.categoryName}>
      <td><Button bsStyle="success" bsSize="xs">+</Button></td>
      <td>{cat.categoryName}</td>
      <td>{cat.timesUsed}</td>
      <td><ButtonToolbar><Button bsStyle="warning" onClick={() => axios.post('categories/mode/cat.categoryId')}>disable
      </Button>
      <Button bsStyle="danger" onClick={() => axios.delete('/categories', cat.categoryId)}>delete</Button>
      </ButtonToolbar></td>
    </tr>);
  }

  render() {
    return (<div>
        <Table striped bordered condensed hover>
          {Categories.getHeaderRow()}
          <tbody>
          {this.state ? this.state.categories : ""}
          {Categories.getAddCategoryRow()}
          </tbody>
          </Table>
      </div>
    );
  }

  static getHeaderRow() {
    return (
      <thead>
      <tr>
      <td>+</td>
      <td>Название</td>
      <td>Использована раз</td>
      <td>Активная</td>
      <td/>
      </tr>
      </thead>
    );
  }

  static getAddCategoryRow() {
    return (<tr>
      <td className="td-input"><FormControl className="table-input"/></td>
      <td/>
      <td>0</td>
      <td className="td-input">sasdf</td>
      <td><Button bsStyle="success" onClick={() => axios.post('/categories', {})}>Сохранить</Button></td>
    </tr>);
  }
}

export default Categories;
