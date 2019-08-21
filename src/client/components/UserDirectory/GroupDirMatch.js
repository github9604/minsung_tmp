import React, { Component } from 'react';
import MatchResult from './MatchResult';

class GroupDirMatch extends Component {

    render() {
        return (
            <div>
                <h2> {this.props.now_dir} </h2>
                {
                    this.props.match_results.map((result, i) => {
                        return (
                            <MatchResult title={result.article_title} author={result.author} content={result.article_content}/>
                            // <MatchResult title={result.title} author={result.author}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default GroupDirMatch;