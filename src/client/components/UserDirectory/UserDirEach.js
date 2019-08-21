import React, {Component} from 'react';
import { Link, withRouter} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

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
        return(
            <a class="nav_a" > 
            <Link exact to={`/MyDirectory/${this.props.dir_name}`}>{this.props.dir_name}</Link> 
            <Button color='red' onClick={this.handleDelete}> 삭제 </Button> 
            </a>
        );
    }
}

export default withRouter(UserDirEach);