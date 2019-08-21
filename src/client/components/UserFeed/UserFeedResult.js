import React, { Component } from 'react';
import { Button, Popover } from 'antd';
import SelectSearch from 'react-select-search'
import "antd/dist/antd.css";

class UserFeedResult extends Component {

  state = {
    visible: false,
    selectdir: '',
  }

  hide = () => {
    this.setState({
      visible: false
    });
  };

  setData = () => {
    console.log("selected directory name parsing");
    let sendData = {
      dirId: this.state.selectdir,
      articleId: this.props.articleId,
      article_originId: this.props.originlink,
      article_author: this.props.author,
      article_content: this.props.summary,
      article_title: this.props.title
    }
    this.props.addtoDirectory(sendData);
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  onChangeValue = (dir) => {
    console.log(dir);
    console.log(dir.name);
    this.setState({ selectdir: dir.name });
    console.log(this.state.selectdir);
  }

  openWindow = () => {
    console.log(this.props.originlink);
    window.open(this.props.originlink);
  }

  render() {
    // console.log("dirlists: " + this.props.dirlists)
    let dirs = this.props.dirlists;
    
    // const friends = [
    //   {
    //     name: "Annie Cruz",
    //     value: "annie.cruz",
    //     photo: "https://randomuser.me/api/portraits/women/60.jpg"
    //   },
    //   {
    //     name: "Eli Shelton",
    //     value: "eli.shelton",
    //     photo: "https://randomuser.me/api/portraits/men/7.jpg"
    //   },
    //   {
    //     name: "Loretta Rogers",
    //     value: "loretta.rogers",
    //     photo: "https://randomuser.me/api/portraits/women/51.jpg"
    //   },
    //   {
    //     name: "Lloyd Fisher",
    //     value: "lloyd.fisher",
    //     photo: "https://randomuser.me/api/portraits/men/34.jpg"
    //   },
    //   {
    //     name: "Tiffany Gonzales",
    //     value: "tiffany.gonzales",
    //     photo: "https://randomuser.me/api/portraits/women/71.jpg"
    //   }
    // ];
    return (
      <div border="1px">
        <h3> {this.props.title} </h3>
        <h4> {this.props.author} </h4>
        <div dangerouslySetInnerHTML={{ __html: this.props.summary }}></div>
        <h5> {this.props.summary} </h5>
        <Button onClick={this.openWindow}> 해당 페이지로 이동 </Button>
        <Popover
          content={<div><SelectSearch options={dirs} value={this.state.selectdir ? this.state.selectdir : ''} 
          onChange={(dir) => this.onChangeValue(dir)} placeholder="폴더를 입력하세요" /> <Button onClick={this.setData}> 폴더에 추가 </Button></div>}
          placement="bottom"
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button type="primary"> 스크랩 </Button>
        </Popover>
      </div>
    );
  }
}

export default UserFeedResult;