import React, { Component } from 'react';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

class OtherFeed extends Component {
    render() {
        return (
            <div className="body_subtitle">
                <h3> 구독 중인 사이트 </h3>
                {
                    this.props.data.map((result, i) => {
                        return(
                        <Card hoverable={true} style={{ marginTop: 16 }} loading={false}>
                            <Meta
                                avatar={
                                    <img className="right floated mini ui image" src={result.feed_icon} />
                                }
                                title={result.feedname}
                                description={result.feed_description}
                            />
                        </Card>
                        )
                    })
                }
            </div>
        );
    }

}

export default OtherFeed;