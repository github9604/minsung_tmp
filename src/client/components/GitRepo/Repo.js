import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

class Repo extends Component {

openWindow = () => {
  // console.log(this.props.url);
  window.open(this.props.url);
}

  render() {
    return (
      <Card hoverable={true} onClick={this.openWindow} style={{ marginTop: 16 }} loading={false}>
        <Meta
          avatar={
            <img className="right floated mini ui image" src={this.props.avatar} />
          }
          title={this.props.name}
          description={this.props.description}
        />
      </Card>
    )
  }

  // <p>  
  //   <a href={props.url} target="_BLANK">{props.name}</a>
  //   <img src={props.avatar}/>
  //   <span>{props.description}</span>
  // </p>
};

export default Repo;