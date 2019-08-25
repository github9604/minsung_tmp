import React, {Component} from 'react';

class SearchResult extends Component {
    render(){
        return(
            <div>
            {
                this.props.data.map((result, i) => {
                    return(
                        <div className="folderContainer">
                        <a href="#">
                            <div className="folder">
                                <i className="fa fa-cogs"></i>
                            </div>
                            <h3>{result.dir_name}</h3>
                        </a>
                    </div>
                    )
                })
            }
            </div>
        )
    }
}

export default SearchResult;