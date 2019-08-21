import React, { Component } from 'react';

export default class SearchForm extends Component {
  
  state = {
    searchText: ''
  }
  
  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.query.value);
  }
  
  render() {  
    return (
      <form className="search-form" onSubmit={this.handleSubmit} >
        {/* <label className="is-hidden" htmlFor="search">Github 검색</label> */}
        <h2> <mark>Github 검색 </mark> </h2>
        <input type="search" 
               onChange={this.onSearchChange}
               name="search" 
               ref={(input) => this.query = input}
               placeholder="Search..." />

</form>      
    );
  }
}