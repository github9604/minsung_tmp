import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Avatar } from 'antd';
const { Meta } = Card;

class UserDirectoryList extends Component {
    render() {
        return (
            <Row type="flex" gutter={16}>
                {
                    this.props.data.map((result, i) => {
                        return (
                            <Col key={i} xs={16} sm={16} md={12} lg={6} xl={6} style={{width: 300, marginTop: 16}}>
                                <Card key={i} hoverable={true} loading={false}>
                                    <Meta
                                        avatar={
                                            <Avatar src="../src/asset/img/folder.png" />
                                        }
                                        title={result.dir_name}
                                        description={result.owner_id}
                                    />
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        )
    }
}

export default UserDirectoryList;