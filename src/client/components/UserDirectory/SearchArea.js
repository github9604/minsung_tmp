import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Select } from 'antd';
const { Search } = Input;
const { InputGroup } = Input;
const { Option } = Select;

class SearchArea extends Component {
    render() {
        return (
            //     <InputGroup compact>
            //     <Select defaultValue="Zhejiang">
            //       <Option value="Zhejiang">Zhejiang</Option>
            //       <Option value="Jiangsu">Jiangsu</Option>
            //     </Select>
            //     <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
            //   </InputGroup>
            <div >
                <Select onChange={this.props.handleChangeOpt} size={"large"} defaultValue="dir_name">
                    <Option value="dir_name">디렉토리 이름</Option>
                    <Option value="dir_owner">디렉토리 주인</Option>
                </Select>
                <Search
                    placeholder="검색할 디렉토리의 이름을 입력해주세요"
                    enterButton="Search"
                    size="large"
                    onChange={this.props.handleChangeDir}
                    onSearch={this.props.handleSubmit}
                />
            </div>
        );
    }
}

export default SearchArea;