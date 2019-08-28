import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResult extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.map((result, i) => {
                        return (
                            <div className="folderContainer">
                                <Link to={{
                                    pathname: `/DirInfo/${result.dir_name}`,
                                    state: {
                                        now_dir_owner_id: result.owner_id,
                                        now_dir_id: result.dir_id,
                                        now_user: false
                                    }
                                }}>
                                    <a href="#">
                                        <div className="folder">
                                            <i class="fas fa-search"></i>
                                        </div>
                                        <h3>{result.dir_name}</h3>
                                    </a>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SearchResult;