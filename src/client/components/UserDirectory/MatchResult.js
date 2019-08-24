import React, {Component} from 'react';
import {Card} from 'antd';
import "antd/dist/antd.css";
const { Meta } = Card;

class MatchResult extends Component {
    
    render(){
        return(
            <div>
                <Card title={this.props.title}>
                       <div dangerouslySetInnerHTML={{ __html: this.props.content }}></div>
                </Card>
                <br/>
            </div>
        );
    }
}

export default MatchResult;