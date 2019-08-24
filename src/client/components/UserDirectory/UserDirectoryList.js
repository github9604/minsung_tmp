import React, { Component } from 'react';
import UserDirEach from './UserDirEach';


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
                    this.props.data.map((result, i) => {
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