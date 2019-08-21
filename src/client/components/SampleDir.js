import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row, Avatar, Tag } from 'antd';
const { Meta } = Card;

class SampleDir extends Component {

    handleRemove = () => {
        let deleteDirInput = this.props.data.dir_name;
        let index = this.props.index;
        this.props.onRemove(deleteDirInput, index);
    }
    render() {
        // console.log("???: " + this.props.data);
        return (
            <Col xs={16} sm={16} md={12} lg={6} xl={6} style={{ width: 300, marginTop: 16 }}>
                <Link exact to={`/userDirectory/${this.props.data.dir_name}`}>
                    <Card hoverable={true} loading={false}>
                        <Meta
                            avatar={
                                <Avatar src="../src/asset/img/folder.png" />
                            }
                            title={this.props.data.dir_name}
                            description={this.props.data.owner_id}
                        />
                    </Card>
                </Link>
            </Col>
            // <a className="nav_a" >
            //     <Link exact to={`/UserDirectory/${this.props.data.dir_name}`}>{this.props.data.dir_name}</Link>
            //     {/* <Link exact to={`/UserDirectory/${this.props.data.dir_name}`}><Tag closable color="#87d068" onClose={this.handleRemove}> {this.props.data.dir_name} </Tag> </Link> */}
            //     <Button type="danger" onClick={this.handleRemove}> 삭제 </Button>
            // </a>
        );
    }
}

SampleDir.propTypes = {
    data: PropTypes.object,
    onRemove: PropTypes.func
};

SampleDir.defaultProps = {
    data: {
        data: 'All'
    },
    onRemove: (deleteDirInput, index) => {
        console.error('삭제 함수가 정의되어 있지 않음');
    }
}

export default SampleDir;