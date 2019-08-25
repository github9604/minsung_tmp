import React, { Component } from 'react';
import { Icon, Button, Popover } from 'antd';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import SelectSearch from 'react-select-search'
import "antd/dist/antd.css";

class UserFeed extends Component {

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
    window.open(this.props.originlink);
  }

  render() {
    let dirs = this.props.dirlists;
    let date = new Date(parseInt(this.props.time, 10));
    let ds = date.toString('MM/dd/yy HH:mm:ss');
    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={ds}
        iconStyle={{ background: '#2b2d42', color: '#2b2d42' }}
      >
        <h3 onClick={this.openWindow} className="vertical-timeline-element-title">{this.props.title} </h3>
        <br />
        <h4 className="vertical-timeline-element-subtitle">{this.props.author}</h4>
        <br />
        <div className="vertical-timeline-element-photo" dangerouslySetInnerHTML={{ __html: this.props.summary }}></div>
        <br />
        <div><Popover
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
      </VerticalTimelineElement>
    )
  }
}

export default UserFeed;