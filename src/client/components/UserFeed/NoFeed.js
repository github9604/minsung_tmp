import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

class NoFeed extends Component {

    render() {
        return (
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={"구독할 사이트를 추가해주세요"}
                    iconStyle={{ background: '#2b2d42', color: '#2b2d42' }}
                >
                    <h3 onClick={this.openWindow} className="vertical-timeline-element-title"> 구독할 사이트를 추가해주세요 </h3>
                    <br />
                    <div className="vertical-timeline-element-photo" >  현재 구독한 사이트가 없습니다. 상단의 구독 버튼을 클릭하거나 하단의 구독 버튼을 클릭하여 구독할 사이트를 추가하고 나만의 피드를 만들어보세요. 나만의 피드에서 구독한 사이트에 올라온 글들을 실시간으로 확인할 수 있습니다.  </div>
                    <br />
                    <Link to='./searchpage'><Button type="primary"> 구독 사이트 추가 </Button></Link>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={"구독할 사이트를 추가해주세요"}
                    iconStyle={{ background: '#2b2d42', color: '#2b2d42' }}
                >
                    <h3 onClick={this.openWindow} className="vertical-timeline-element-title"> 구독할 사이트를 추가해주세요 </h3>
                    <br />
                    <div className="vertical-timeline-element-photo" >  현재 구독한 사이트가 없습니다. 상단의 구독 버튼을 클릭하거나 하단의 구독 버튼을 클릭하여 구독할 사이트를 추가하고 나만의 피드를 만들어보세요. 나만의 피드에서 구독한 사이트에 올라온 글들을 실시간으로 확인할 수 있습니다.  </div>
                    <br />
                    <Button type="primary" onClick={() => { this.props.history.push('/searchpage') }}> 구독 사이트 추가 </Button>
                </VerticalTimelineElement>
            </VerticalTimeline>
        )
    }

}

export default NoFeed;