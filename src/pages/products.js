import React, { Component } from 'react';

function hex2rgba(hex, a) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
          c = [ c[0], c[0], c[1], c[1], c[2], c[2] ];
      }
      c = '0x' +c.join('');
      return 'rgba(' + [(c>>16)&255, (c>>8)&255, c&255].join(',') + ', ' + a + ')';
  }
  return '';
}

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      value: ''
    };
  }

  handleDeleteClick(e) {
    let items = this.state.items.slice();
    items.splice(items.indexOf(e.target.text), 1);

    this.setState({
      items: items
    });
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e) {
    if (this.state.value.trim() !== "") {
      let items = this.state.items.slice();
      items.push(this.state.value.trim());

      this.setState({
        items: items,
        value: ''
      });
    }
    e.preventDefault();
  }

  render() {
    let items = [];
    for (let i = 0; i < this.state.items.length; i++) {
      let colorHex = '#' + Math.floor(Math.random()*16777215).toString(16);
      let anchorStyle = {
        color: colorHex,
        background: hex2rgba(colorHex, 0.05)
      };
      items.push(
          <a key={i} href={'#' + this.state.items[i].split(" ").join("-")} className="list-group-item p-link" onClick={(i) => this.handleDeleteClick(i)} title={'Delete ' + this.state.items[i]} style={anchorStyle}>
            {this.state.items[i]}
          </a>
      );
    }
    return (
      <div className="container-fluid">
        <h1 className="s-blk-shadow">
          Products
        </h1>

        <form className="product-form" onSubmit={(e) => this.handleSubmit(e)}>
          <h2>Item ({this.state.items.length})</h2>
          <input className="new-item form-control col-md-12" type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} placeholder="Enter new item" />
        </form>

        <div className="item-container list-group" style={{marginTop:'60px'}}>
          {items}
        </div>

      </div>
    );
  }

}

export default Products;
