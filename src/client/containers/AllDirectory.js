import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { Tabs, Icon, Radio } from 'antd';
import { SampleGroupDirList } from '../components';
import { SampleDirList } from '../components';

const { Content } = Layout;
const { TabPane } = Tabs;

class AllDirectory extends Component {

    constructor() {
        super();
        this.state = {
            user_dirlists: [],
            grp_dirlists: [],
            now_dir: '',
            loading_group: false
        };
    }

    componentDidMount() {
        this.groupDirList();
        this.userDirList();
    }

    groupDirList = () => {
        axios.get('/api/dirlist/otherdirlist')
            .then((response) => {
                // console.log("working::" + response.data);
                // console.log("response data[0]: " + response.data[0].dir_name);
                this.setState({
                    grp_dirlists: response.data
                });
                console.log("all directory page group directory load");
            })
            .catch(error => {
                console.log('error fetching and parsing data in show dirlists');
            })
    }

    userDirList = () => {
        axios.get('/api/dirlist')
            .then((response) => {
                this.setState({
                    user_dirlists: response.data
                });
                console.log("all directory page user directory load");
            })
            .catch(error => {
                console.log('error fetching and parsing data in show user dirlists');
            })
    }

    render() {
        return (
            <Layout>
                <Content>
                <h1 className="body_title">Directory</h1>
                    {/* <Tabs defaultActiveKey="1">
                        <TabPane
                            tab={
                                <Link to="/AllDirectory">
                                    <span className="tab_name">
                                        <Icon type="folder-open" />
                                        전체 디렉토리
                                </span>
                                </Link>
                            }
                            key="1"
                        >
                        </TabPane>
                        <TabPane
                            tab={
                                <Link to="/UserDirectory">
                                    <span className="tab_name">
                                        <Icon type="folder" />
                                        내 디렉토리
                                </span>
                                </Link>

                            }
                            key="2"
                        >
                        </TabPane>
                        <TabPane
                            tab={
                                <Link to={{
                                    pathname: `/GroupDirectory`,
                                    state: {
                                        now_groupdir_id: 0
                                    }
                                }}>
                                    <span className="tab_name">
                                        <Icon type="folder" />
                                        공유받은 디렉토리
                                </span>
                                </Link>
                            }
                            key="3"
                        >
                        </TabPane>
                    </Tabs> */}
                    <Row>
                    <div className="folderContainer">
                        <a href="/AllDirectory">
                            <div className="folder">
                                <i className="fa fa-users"></i>
                            </div>
                            <h4>전체 디렉토리</h4>
                        </a>
                    </div>
                    <div className="folderContainer">
                        <a href="/UserDirectory">
                            <div className="folder">
                                <i className="fa fa-user"></i>
                            </div>
                            <h4>내 디렉토리</h4>
                        </a>
                    </div>
                    <div className="folderContainer">
                        <a href="/GroupDirectory">
                            <div className="folder">
                                <i className="fa fa-user"></i>
                            </div>
                            <h4>공유 디렉토리</h4>
                        </a>
                    </div>
                    </Row>
                    <br/>
                    <h3><mark> My Dir </mark></h3>
                    <SampleDirList data={this.state.user_dirlists} />
                    <br/>
                    <h3><mark> Shared Dir </mark></h3>
                    <SampleGroupDirList data={this.state.grp_dirlists} />
                </Content>
            </Layout>
        );
    }
}

export default AllDirectory;