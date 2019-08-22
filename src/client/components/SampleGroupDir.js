import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row, Avatar, Tag } from 'antd';
const { Meta } = Card;

class SampleGroupDir extends Component {

    render() {
        // console.log("???: " + this.props.data);
        return (
            <li>
                <a class="nav_a" >
                    <Link to={{
                        pathname: `/GroupDirectory/${this.props.data.dir_name}`,
                        state: {
                            now_groupdir_id: this.props
                        }
                    }}>
                        {this.props.data.dir_name}
                    </Link>
                    <h4> {this.props.data.owner_id} </h4>
                </a>
            </li>

            // <Col xs={16} sm={16} md={12} lg={6} xl={6} style={{ width: 300, marginTop: 16 }}>
            //     <Link to={{
            //         pathname: `/GroupDirectory/${this.props.data.dir_name}`,
            //         state: {
            //             now_groupdir_id: this.props
            //         }
            //     }}>
            //     {/* <Link exact to={`/GroupDirectory/${this.props.data.dir_name}`}> */}
            //         <Card hoverable={true} loading={false}>
            //             <Meta
            //                 avatar={
            //                     <Avatar src="../src/asset/img/folder.png" />
            //                 }
            //                 title={this.props.data.dir_name}
            //                 description={this.props.data.owner_id}
            //             />
            //         </Card>
            //     </Link>
            // </Col>
        );
    }
}

SampleGroupDir.propTypes = {
    data: PropTypes.object
};

SampleGroupDir.defaultProps = {
    data: {
        data: 'All'
    }
}

export default SampleGroupDir;

