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
                <div>
                    {
                        this.props.dirlists.map((result, i) => {
                            return (
                                <UserDirEach deleteDirectory={this.props.deleteDirectory} dir_name={result.dir_name} />
                            )
                        })
                    }
                    </div>
        );
    }
}

export default UserDirectoryList;