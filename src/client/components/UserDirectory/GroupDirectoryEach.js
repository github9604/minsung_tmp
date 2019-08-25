import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class GroupDirectoryEach extends Component {
    render() {
        return (
            <div className="folderContainer">
                <Link to={{
                    pathname: `/DirInfo/${this.props.dir_name}`,
                    state: {
                        now_dir_owner_id: this.props.owner_id,
                        now_dir_id: this.props.dir_id,
                        now_user: false
                    }
                }}>
                    <div className="folder">
                        <i className="fa fa-share-alt"></i>
                    </div>
                    <h3>{this.props.dir_name}</h3>
                </Link>
            </div>

        );
    }
}

export default GroupDirectoryEach;