import React, { Component } from 'react';
import { UserDirectoryList, MatchResultList, GroupList } from '../components/UserDirectory';
import { SampleWrite, SampleDirList, SampleGroupDirList } from '../components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Dropdown, Icon, Button } from 'antd';
import { string } from 'prop-types';
import { dirPostRequest, dirListRequest, dirRemoveRequest, dirRemove } from '../actions/dirList';

class MyDirectory extends Component {

    constructor() {
        super();
        this.state = {
            dirlist_results: [],
            match_results: [],
            grp_dirlists: [],
            group_results: [],
            auth_results: [],
            now_dir: '',
            group_auth: '',
            modal_visible: false,
            auth_waiting: true
        };
    }

    showModal = () => {
        this.setState({
            modal_visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                modal_visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            modal_visible: false,
        });
    };

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

    handleRemove = (deleteDirInput, index) => {
        console.log("doiing: " + index);
        this.props.dirRemoveRequest(deleteDirInput, index).then(() => {
            console.log("wonder: " + this.props.dirListData);
            this.props.dirListRequest(true);
            console.log("user directory page: remove dir");
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.dir_name !== this.props.match.params.dir_name) {
            console.log("Next: " + nextProps.match.params.dir_name);
            console.log("Now: " + this.props.match.params.dir_name);
            this.showArticleInDir(nextProps.match.params.dir_name);
            this.setState({ auth_waiting: true });
            this.setDefault(nextProps.match.params.dir_name);
        }
    }

    componentDidMount() {
        this.props.dirListRequest(true);
        this.groupDirList();
        this.performGroupList();
        this.showArticleInDir(this.props.match.params.dir_name);
        this.setDefault(this.props.match.params.dir_name);
    }

    setDefault = (now_dir_name) => {
        axios.post('/api/dirlist/setuserdefault', { now_dir_name })
            .then(response => {
                // console.log(response);
                // console.log(response.data);
                let tmp = [];
                for (let i = 0; i < response.data.length; i++) {
                    tmp[i] = response.data[i].dir_auth;
                    // tmp.push(response.data[i].dir_auth);
                }
                // console.log(tmp);
                this.setState({ auth_results: tmp, auth_waiting: false });
            })
    }

    performDirList = () => {
        axios.get('/api/dirlist')
            .then(response => {
                console.log("dirlist" + response);
                // console.log("dirlist: " + response.data[0].share_group_id);
                this.setState({
                    dirlist_results: response.data
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
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

    insertDirlist = (insertDir) => {
        let insertDirinput = insertDir;
        axios.post('/api/dirlist/insertDir', { insertDirinput })
            .then((response) => {
                if (response.data === "success") {
                    axios.get('/api/dirlist')
                        .then((response) => {
                            this.setState({ dirlist_results: response.data });
                        })
                        .catch(error => {
                            console.log('error fetching and parsing data', error);
                        })
                }
            })
            .catch(error => {
                console.log('error fetching and parsing data', error);
            })
    }

    deleteDirectory = (dirname) => {
        console.log(dirname);
        let deleteDirInput = dirname;
        axios.delete('/api/dirlist/delete', { data: { deleteDirInput: deleteDirInput } })
            .then((response => {
                if (response.data === "success") {
                    axios.get('/api/dirlist')
                        .then((response) => {
                            console.log("sdf?: " + response.data);
                            this.setState({ dirlist_results: response.data });
                            // this.props.history.push('/MyDirectory/${this.props.match.params.dir_name}');
                        })
                        .catch(error => {
                            console.log('error fetching and parsing data', error);
                        })
                }
            }))
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

    showArticleInDir = (now_dir_name) => {
        // console.log(sendDirName);

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

    changeDirAuth = (dirauth) => {
        console.log(dirauth.group_auth);
        let group_auth = dirauth.group_auth;
        let now_dir = this.state.now_dir;
        axios.post('/api/dirlist/groupAuth', { group_auth, now_dir })
            .then((response) => {
                console.log(response.data);
            })
    }

    groupSubmit = (e) => {
        e.preventDefault();
        console.log("working");
        console.log(this.state.group_auth);
        // let group_auth = this.state.group_auth;
        // let now_dir = this.state.now_dir;
        // axios.post('/api/dirlist/groupAuth', {group_auth, now_dir})
        // .then((response) => {
        //     console.log(response.data);
        // })
    }

    render() {
        return (
            <div className="d-flex" id="wrapper">
                <div className="sidenav">
                    <div className="sidenav_content">
                        <ul>
                            <li ><Link to="/MyFeed"> 오늘의 피드 </Link></li>
                            <li className="insertDir">
                                <a  onClick={this.showModal}> DIRECTORY 생성 </a>
                                <Modal
                                    title="Directory 생성"
                                    visible={this.state.modal_visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                     <SampleWrite onPost={this.handlePost} />
                                </Modal>
                            </li>
                            <SampleDirList group_auth={this.state.auth_results} changeDirAuth={this.changeDirAuth} options={this.state.group_results} data={this.props.dirListData} onRemove={this.handleRemove} />
                            <SampleGroupDirList group_auth={this.state.auth_results} changeDirAuth={this.changeDirAuth} options={this.state.group_results} data={this.state.grp_dirlists} />
                        </ul>
                    </div>
                </div>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        {
                            this.state.auth_waiting ? null : <div className="matchdirart">
                                <MatchResultList group_auth={this.state.auth_results} changeDirAuth={this.changeDirAuth} options={this.state.group_results} match_results={this.state.match_results} now_dir={this.state.now_dir} />
                            </div>
                        }
                    </div>
                </div>
            </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(MyDirectory);