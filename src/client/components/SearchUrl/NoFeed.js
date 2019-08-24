import React, { Component } from 'react';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

class NoFeed extends Component {
    render() {
        return (
            <div className="body_subtitle">
                <h3> 구독 중인 사이트 </h3>
                <Card hoverable={true} style={{ marginTop: 16 }} loading={false}>
                    <Meta
                        avatar={
                            <Icon type="close" />
                        }
                        title="구독 중인 사이트가 없습니다"
                        description="구독 할 사이트를 추가해주세요"
                    />
                </Card>
            </div>
        );
    }
}

export default NoFeed;