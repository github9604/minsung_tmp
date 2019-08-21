import React, { Component } from 'react';
import { Checkbox, Button } from 'antd';
import MatchResult from './MatchResult';

class MatchResultList extends Component {

    state = {
        group_auth: [],
        default_auth: []
    }
    
    groupChange = (checkedValues) => {
        // console.log("value??: " + checkedValues);
        this.setState({ group_auth: checkedValues });
    }

    setGroup = () => {
        console.log("selected group name parsing");
        let sendData = {
            group_auth: this.state.group_auth
        }
        this.props.changeDirAuth(sendData);
    }

    render() {
        let arr = JSON.parse("[" + this.props.group_auth + "]");
        return (
            
            <div>
                <h2> {this.props.now_dir} </h2>
                <Checkbox.Group options={this.props.options} onChange={this.groupChange} defaultValue={arr} />
                <Button onClick={this.setGroup}> 변경 </Button>
                {
                    this.props.match_results.map((result, i) => {
                        return (
                            <MatchResult title={result.article_title} author={result.author} content={result.article_content}/>
                            // <div>
                            //     <h2>{result.article_title}</h2>
                            //     <h3> {result.article_author} </h3>
                            //     <h4> {result.article_content} </h4>
                            // </div>
                            // <MatchResult title={result.title} author={result.author}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default MatchResultList;