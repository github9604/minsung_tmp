import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
const { Search } = Input;

class SearchArea extends Component {
    render() {
        return (
            <Search
                placeholder="검색할 디렉토리의 이름을 입력해주세요"
                enterButton="Search"
                size="large"
                onChange={this.props.handleChangeDir}
                onSearch={this.props.handleSubmit}
            />
        );
    }
}

export default SearchArea;