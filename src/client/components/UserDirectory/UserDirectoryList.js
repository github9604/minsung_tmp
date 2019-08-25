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
                            <UserDirEach onRemove={this.props.onRemove} index={i} dir_name={result.dir_name} owner_id={result.owner_id} dir_id={result.dir_id}/>
                        )
                    })
                }
                </div>
        );
    }
}

export default UserDirectoryList;