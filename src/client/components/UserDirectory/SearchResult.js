import React, {Component} from 'react';

class SearchResult extends Component {
    render(){
        return(
            <div>
            {
                this.props.data.map((result, i) => {
                    return(
                        <div class="folderContainer">
                        <a href="#">
                            <div class="folder">
                                <i class="fa fa-cogs"></i>
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