import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
const { Search } = Input;

const SearchArea = (props) => {
    return (
        <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onChange={props.handleChange}
            onSearch={props.handleSubmit}
        />
        // <form className="searchform" action="" onSubmit={props.handleSubmit}>
        //     <Input size="large" placeholder="url input" type="text" onChange={props.handleChange} />
        //     <button onclick={props.handleSubmit}> 입력 </button>
        // </form>
    );
}

export default SearchArea;