import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { SampleWrite, SampleDirList, SampleGroupDirList } from '../components';
import { GroupDirMatch } from '../components/UserDirectory';
import { connect } from 'react-redux';
const { Content } = Layout;
import { Row, Col } from 'antd';
import { Tabs, Modal, Icon, Radio } from 'antd';
const { TabPane } = Tabs;
import { dirPostRequest, dirListRequest, dirRemoveRequest, dirRemove } from '../actions/dirList';

class GroupDirectory extends Component {

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
            auth_waiting: true,
            loading_group: true
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
            // console.log("Next: " + nextProps.match.params.dir_name);
            // console.log("Now: " + this.props.match.params.dir_name);
            this.showArticleInDir(nextProps.location.state.now_groupdir_id);
        }
    }

    componentDidMount() {
        // console.log("wow: " + this.props.match.params.dir_name);
        // console.log("now: " + this.props.location.state.now_groupdir_id);
        // console.log("working..?" + now_groupdir_id);
        if (this.props.location.state.now_groupdir_id != 0)
            this.showArticleInDir(this.props.location.state.now_groupdir_id);
        // this.showArticleInDir(this.props.match.params.dir_name);
        // if (this.props.location.state.now_groupdir_id != 0)
        //     this.showArticleInDir(this.props.location.state.now_groupdir_id);
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
            <div class="d-flex" id="wrapper">
                <div className="sidenav">
                    <div className="sidenav_content">
                        <ul>
                            <li ><Link to="/MyFeed"> 오늘의 피드 </Link></li>
                            <li className="insertDir">
                                <a onClick={this.showModal}> DIRECTORY 생성 </a>
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
                    <div class="container-fluid">
                        {
                            (this.state.loading_group)
                                ? <p> loading... </p>
                                : <GroupDirMatch match_results={this.state.match_results} now_dir={this.state.now_dir} />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDirectory);