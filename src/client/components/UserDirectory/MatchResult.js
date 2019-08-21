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
                {/* <h3> {this.props.title} </h3>
                <h4> {this.props.author} </h4>
                <h5> {this.props.summary} </h5> */}
            </div>
        );
    }
}

export default MatchResult;