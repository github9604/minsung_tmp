import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class UserDirEach extends Component {

    handleDelete = () => {
        this.props.deleteDirectory(this.props.dir_name);
    };
    // setDirName = () => {
    //     console.log("selected directory name parsing");
    //     let sendDirName = {
    //         dirName: this.props.dir_name
    //     }
    //     this.props.showArticleInDir(sendDirName);
    // }
    render() {
        return (
            <div className="folderContainer">
                 <Link to={{
                    pathname: `/DirInfo/${this.props.dir_name}`,
                    state: {
                        now_dir_owner_id: this.props.owner_id,
                        now_dir_id: this.props.dir_id,
                        now_user: true
                    }
                }}>
                    <div className="folder">
                        <i className="fa fa-user"></i>
                    </div>
                    <h3>{this.props.dir_name}</h3>
                </Link>
            </div>
            // <li>
            //     <a class="nav_a" >
            //         <Link exact to={`/MyDirectory/${this.props.dir_name}`}>{this.props.dir_name}</Link>
            //         <Button color='red' onClick={this.handleDelete}> 삭제 </Button>
            //     </a>
            // </li>
        );
    }
}

export default withRouter(UserDirEach);