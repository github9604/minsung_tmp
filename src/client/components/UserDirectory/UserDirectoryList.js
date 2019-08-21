import React, { Component } from 'react';
import UserDirEach from './UserDirEach';
import { Button } from 'antd';


class UserDirectoryList extends Component {
    state = {
        inputDir: ''
    }

    handleChange = (e) => {
        this.setState({ inputDir: e.target.value });
    };

    handleSubmit = () => {
        this.props.insertDirlist(this.state.inputDir);
    };

    render() {
        return (
            <Row type="flex" gutter={16}>
                {
                    this.props.dirlists.map((result, i) => {
                        return (
                            <UserDirEach deleteDirectory={this.props.deleteDirectory} dir_name={result.dir_name} />
                        )
                    })
                }
                <a>
                    <input placeholder="폴더명을 입력하세요" onChange={this.handleChange} />
                </a>
                <a>
                    <Button onClick={this.handleSubmit}>
                        <p>dir 추가</p>
                    </Button>
                </a>
            </Row>
        );
    }
}

export default UserDirectoryList;