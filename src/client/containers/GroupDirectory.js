import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { SampleGroupDirList } from '../components';
import { GroupDirMatch } from '../components/UserDirectory';
const { Content } = Layout;
import { Row, Col } from 'antd';
import { Tabs, Icon, Radio } from 'antd';
const { TabPane } = Tabs;

class GroupDirectory extends Component {

    constructor() {
        super();
        this.state = {
            match_results: [],
            grp_dirlists: [],
            now_dir: '',
            loading_group: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.dir_name !== this.props.match.params.dir_name) {
            // console.log("Next: " + nextProps.match.params.dir_name);
            // console.log("Now: " + this.props.match.params.dir_name);
            this.showArticleInDir(nextProps.location.state.now_groupdir_id);
        }
    }

    componentDidMount() {
        // console.log("wow: " + this.props.match.params.dir_name);
        console.log("now: " + this.props.location.state.now_groupdir_id);
        // console.log("working..?" + now_groupdir_id);
        this.groupDirList();
        if (this.props.location.state.now_groupdir_id != 0)
            this.showArticleInDir(this.props.location.state.now_groupdir_id);
    }

    groupDirList = () => {
        axios.get('/api/dirlist/otherdirlist')
            .then((response) => {
                // console.log("working::" + response.data);
                // console.log("response data[0]: " + response.data[0].dir_name);
                this.setState({
                    grp_dirlists: response.data
                });
            })
            .catch(error => {
                console.log('error fetching and parsing data in show dirlists');
            })
    }

    showArticleInDir = (now_dir_id) => {
        // console.log(sendDirName);
        let now_dir = this.props.location.state.now_groupdir_id;
        if (now_dir != now_dir_id) {
            now_dir = now_dir_id;
        }
        axios.post('/api/matchDirArticle/grp', { now_dir })
            .then((response) => {
                // console.log("why..?" + response.data);
                // console.log("check" + this.props.match.params.dir_name);
                this.setState({ match_results: response.data, now_dir: this.props.match.params.dir_name, loading_group: false });
            })
    }

    render() {
        return (
            <Layout>
                <Content>
                    {/* <Row type="flex" justify="center" align="center">
                        <Col span={6}> <img src="../src/asset/img/close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/AllDirectory" id="header_a"><p> 전체 폴더 </p></Link> </Col>
                        <Col span={6}> <img src="../src/asset/img/close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/UserDirectory" id="header_a"><p> 내 폴더 </p></Link> </Col>
                        <Col span={6}> <img src="../src/asset/img/mine_close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to={{
                                pathname: `/GroupDirectory`,
                                state: {
                                    now_groupdir_id: 0
                                }
                            }} id="header_a"><p> 공유 폴더 </p></Link></Col>
                    </Row> */}
                    <Tabs defaultActiveKey="3">
                        <TabPane
                            tab={
                                <Link to="/AllDirectory">
                                 <span className="tab_name">
                                 <Icon type="folder" />
                                    전체 디렉토리
                                </span>
                                </Link>
                            }
                            key="1"
                        >
                            전체 디렉토리
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
                            내 디렉토리
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
                                 <Icon type="folder-open" />
                                    공유받은 디렉토리
                                </span>
                                </Link>
                            }
                            key="3"
                        >
                            공유받은 디렉토리
                        </TabPane>
                    </Tabs>
                    <SampleGroupDirList data={this.state.grp_dirlists} />
                    <div class="matchdirart">
                        {
                            (this.state.loading_group)
                                ? <p> loading... </p>
                                : <GroupDirMatch match_results={this.state.match_results} now_dir={this.state.now_dir} />
                        }

                    </div>
                </Content>
            </Layout>
        );
    }

}

export default GroupDirectory;