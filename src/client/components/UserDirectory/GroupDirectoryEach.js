import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

class GroupDirectoryEach extends Component{
    render() {
        return (
            <div class="folderContainer">
                <a href="#">
                    <div class="folder">
                        <i class="fa fa-cogs"></i>
                    </div>
                    <h3>{this.props.dir_name}</h3>
                </a>
            </div>
            
        );
    }
}

export default GroupDirectoryEach;