import React, { Component } from 'react';
import { SampleWrite, SampleDirList } from '../components';
import { UserDirectoryList, MatchResultList } from '../components/UserDirectory';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { Tabs, Icon, Radio } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import { dirPostRequest, dirListRequest, dirRemoveRequest, dirRemove } from '../actions/dirList';
const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;

class UserDirectory extends Component {

    constructor() {
        super();
        this.state = {
            match_results: [],
            group_results: [],
            auth_results: [],
            now_dir: '',
            group_auth: '',
            auth_waiting: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.dir_name !== this.props.match.params.dir_name) {
            // console.log("Next: " + nextProps.match.params.dir_name);
            // console.log("Now: " + this.props.match.params.dir_name);
            // this.performGroupList();
            this.showArticleInDir(nextProps.match.params.dir_name);
            this.setState({ auth_waiting: true });
            this.setDefault(nextProps.match.params.dir_name);
        }
    }

    componentDidMount() {
        this.props.dirListRequest(true);
        this.performGroupList();
        this.showArticleInDir(this.props.match.params.dir_name);
        this.setDefault(this.props.match.params.dir_name);
    }

    setDefault = (now_dir_name) => {
        axios.post('/api/dirlist/setuserdefault', { now_dir_name })
            .then(response => {
                // console.log(response);
                console.log(response.data);
                let tmp = [];
                for (let i = 0; i < response.data.length; i++) {
                    tmp[i] = response.data[i].dir_auth;
                    // tmp.push(response.data[i].dir_auth);
                }
                this.setState({ auth_results: tmp, auth_waiting: false });
                // console.log("working..?: " + this.state.group_auth);
            })
    }

    performGroupList = () => {
        axios.post('/api/dirlist/grouplist')
            .then(response => {
                // console.log(response);
                // console.log(response.data);
                this.setState({
                    group_results: response.data
                });
                console.log("userdirectory page: group list");
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            })
    }

    changeDirAuth = (dirauth) => {
        console.log(dirauth.group_auth);
        let group_auth = dirauth.group_auth;
        let now_dir = this.state.now_dir;
        axios.post('/api/dirlist/groupAuth', { group_auth, now_dir })
            .then((response) => {
                console.log(response.data);
            })
    }

    showArticleInDir = (now_dir_name) => {
        // console.log("wahta:" + now_dir_name);
        //얘를 기준으로 생각하면 됨! 
        let now_dir = this.props.match.params.dir_name;
        if (now_dir != now_dir_name) {
            now_dir = now_dir_name;
        }
        console.log(now_dir_name);
        axios.post('/api/matchDirArticle/mine', { now_dir })
            .then((response) => {
                this.setState({ match_results: response.data, now_dir: now_dir });
            })
    }

    loadNewDir() {
        if (this.props.listStatus === 'WAITING') {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }
        if (this.props.dirListData.length === 0) {
            return this.props.dirListRequest(true);
        }

        return this.props.dirListRequest(false);
    }

    handleRemove = (deleteDirInput, index) => {
        console.log("doiing: " + index);
        this.props.dirRemoveRequest(deleteDirInput, index).then(() => {
            console.log("wonder: " + this.props.dirListData);
            this.props.dirListRequest(true);
            console.log("user directory page: remove dir");
        });
    }

    handlePost = (insertDirinput) => {
        // const {addToast} = useToasts();
        return this.props.dirPostRequest(insertDirinput).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {
                    this.loadNewDir().then(
                        () => {
                            console.log("user directory page: dir insert");
                        }
                    );
                    // addToast('성공적으로 디렉토리가 추가됐습니다', {appearance: 'success'})
                } else {
                    switch (this.props.postStatus.error) {
                        case 3:
                            console.log("실패");
                        // addToast('디렉토리 이름을 지정해주세요', {appearance: 'error'})
                    }
                }
            }
        )
    }

    render() {
        return (
            <Layout>
                <Content>
                    <SampleWrite onPost={this.handlePost} />
                    <SampleDirList data={this.props.dirListData} onRemove={this.handleRemove} />
                    {
                        this.state.auth_waiting ? null : <div className="matchdirart">
                            <MatchResultList group_auth={this.state.auth_results} changeDirAuth={this.changeDirAuth} options={this.state.group_results} match_results={this.state.match_results} now_dir={this.state.now_dir} />
                        </div>
                    }



                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.dirList.post,
        dirListData: state.dirList.list.data,
        listStatus: state.dirList.list.status,
        removeStatus: state.dirList.remove
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dirPostRequest: (insertDirinput) => {
            return dispatch(dirPostRequest(insertDirinput));
        },
        dirListRequest: (isInitial) => {
            return dispatch(dirListRequest(isInitial));
        },
        dirRemoveRequest: (deleteDirInput, index) => {
            return dispatch(dirRemoveRequest(deleteDirInput, index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDirectory);