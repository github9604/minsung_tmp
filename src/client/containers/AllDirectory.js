import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Row, Modal } from 'antd';
import { SampleWrite } from '../components';
import { SearchArea, UserDirectoryList, GroupDirectoryList } from '../components/UserDirectory'
import { dirPostRequest, dirListRequest, dirRemoveRequest, dirRemove } from '../actions/dirList';
import 'antd/dist/antd.css';
const { Content } = Layout;

class AllDirectory extends Component {

    constructor() {
        super();
        this.state = {
            grp_dirlists: [],
            now_dir: '',
            loading_mydir: true,
            loading_groupdir: true,
            modal_visible: false,
            insertDirinput: '',
            confirmloading: false
        };
    }

    componentDidMount() {
        this.props.dirListRequest(true);
        this.groupDirList();
    }

    groupDirList = () => {
        axios.get('/api/dirlist/otherdirlist')
            .then((response) => {
                // console.log("working::" + response.data);
                // console.log("response data[0]: " + response.data[0].dir_name);
                this.setState({
                    grp_dirlists: response.data, loading_groupdir: false
                });
                console.log("all directory page group directory load");
            })
            .catch(error => {
                console.log('error fetching and parsing data in show dirlists');
            })
    }

    showModal = () => {
        this.setState({
            modal_visible: true,
        });
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            modal_visible: false,
        });
    };

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            insertDirinput: e.target.value
        });
    }

    handlePost = () => {
        this.setState({ confirmloading: true });
        let insertDirinput = this.state.insertDirinput;
        return this.props.dirPostRequest(insertDirinput).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {
                    this.setState({confirmloading:false, modal_visible:false});
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
        // this.props.onPost(insertDirinput).then(
        //     () => {
        //         this.setState({
        //             insertDirinput: ""
        //         });
        //     }
        // );
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

    render() {
        return (
            <Layout>
                <div className="sidenav">
                    <div className="sidenav_content">
                        <ul>
                            <li ><Link to="/MyFeed"> 오늘의 피드 </Link></li>
                            <li> <Link to="/AllDirectory"> 디렉토리 </Link> </li>
                        </ul>
                    </div>
                </div>
                <Content className="searchpage">
                    <div className="body_search">
                        <Row className="body_search">
                            <h1 className="body_title">디렉토리</h1>
                            <SearchArea />
                        </Row>
                        <Row className="body_search">
                            <div className="body_subtitle"> <h3> 내 디렉토리 </h3>
                                <div class="folderContainer">
                                    <a onClick={this.showModal}>
                                        <div class="folder">
                                            <i class="fa fa-plus-circle"></i>
                                        </div>
                                        <h3>디렉토리 추가</h3>
                                    </a>
                                    <Modal
                                        title="Directory 생성"
                                        visible={this.state.modal_visible}
                                        onOk={this.handlePost}
                                        onCancel={this.handleCancel}
                                        confirmLoading={this.state.confirmloading}
                                    >
                                        <SampleWrite handleChange={this.handleChange} />
                                    </Modal>
                                </div><UserDirectoryList data={this.props.dirListData} /></div>

                        </Row>
                        <Row className="body_search">
                            {
                                this.state.loading_groupdir ?
                                    <div className="body_subtitle"> <h3> 공유 디렉토리 </h3> <h4> 로딩중 </h4> </div>
                                    : <GroupDirectoryList data={this.state.grp_dirlists} />
                            }
                        </Row>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllDirectory);