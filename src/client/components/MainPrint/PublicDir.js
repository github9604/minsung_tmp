import React, { Component } from 'react';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

class PublicDir extends Component {

    render() {
        return (
            <div>
                {
                    this.props.dirlists.map((result, i) => {
                        return (
                            <div>
                                <Link exact to={`/GroupDirectory/${result.dir_name}`} id="header_a">
                                    <Card hoverable={true} key={i} style={{ width: 300, marginTop: 16 }} loading={false}>
                                        <Meta
                                            avatar={
                                                <Icon type="file" />
                                            }
                                            title={result.dir_name}
                                            description={result.owner_id}
                                        />
                                    </Card>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

}

export default PublicDir;