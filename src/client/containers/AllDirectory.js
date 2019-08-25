import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Row, Modal, Icon } from 'antd';
import { SampleWrite } from '../components';
import { SearchArea, SearchResult, UserDirectoryList, GroupDirectoryList } from '../components/UserDirectory'
import { dirPostRequest, dirListRequest, dirRemoveRequest, dirRemove } from '../actions/dirList';
import 'antd/dist/antd.css';
const { Content } = Layout;

class AllDirectory extends Component {

    constructor() {
        super();
        this.state = {
            grp_dirlists: [],
            loading_groupdir: true,
            has_groupdir: true,
            modal_visible: false,
            confirmloading: false,
            insertDirinput: '',
            searchDirinput: '',
            searchDirOpt: 'dir_name',
            searchMyDir: true,
            searchGroupDir: true,
            hideSearchResult: true,
            searchResult: [],
            searchGroupDirResult: []
        };
    }

    componentDidMount() {
        this.props.dirListRequest(true);
        this.groupDirList();
    }

    groupDirList = () => {
        axios.get('/api/dirlist/otherdirlist')
            .then((response) => {
                if (response.data.success) {
                    this.setState({ grp_dirlists: response.data.data, loading_groupdir: false, has_groupdir: true })
                } else {
                    this.setState({ loading_groupdir: false, has_groupdir: false })
                }
                // console.log("working::" + response.data);
                // console.log("response data[0]: " + response.data[0].dir_name);
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

    handleChangeDir = (e) => {
        console.log(e.target.value);
        this.setState({
            searchDirinput: e.target.value
        });
        if (!e.target.value) this.setState({ hideSearchResult: true });
    }

    handleChangeOpt = (value) => {
        console.log(value);
        this.setState({ searchDirOpt: value });
    }

    handleSubmit = () => {
        let obj = this.state.searchDirinput;
        let opt = this.state.searchDirOpt;
        if (opt == 'dir_name') {
            axios.post('/api/dirlist/search/dirname', { obj })
                .then((response) => {
                    // console.log(response.data.userdir);
                    // console.log(response.data.groupdir);
                    if (response.data.userdir.length == 0) {
                        this.setState({ searchMyDir: false });
                    } else {
                        this.setState({ searchMyDir: true, searchResult: response.data.userdir });
                    }
                    if (response.data.groupdir.length == 0) {
                        this.setState({ searchGroupDir: false });
                    } else {
                        this.setState({ searchGroupDir: true, searchGroupDirResult: response.data.groupdir });
                    }
                    this.setState({ hideSearchResult: false })
                })
        }
        else if (opt === 'dir_owner') {
            axios.post('/api/dirlist/search/dirowner', { obj })
                .then((response) => {
                    if (response.data.userdir.length == 0) {
                        this.setState({ searchMyDir: false });
                    } else {
                        this.setState({ searchMyDir: true, searchResult: response.data.userdir });
                    }
                    if (response.data.groupdir.length == 0) {
                        this.setState({ searchGroupDir: false });
                    } else {
                        this.setState({ searchGroupDir: true, searchGroupDirResult: response.data.groupdir });
                    }
                    this.setState({ hideSearchResult: false })
                })
        }

    }

    handlePost = () => {
        this.setState({ confirmloading: true });
        let insertDirinput = this.state.insertDirinput;
        return this.props.dirPostRequest(insertDirinput).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {
                    this.setState({ confirmloading: false, modal_visible: false });
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
                            <li ><Link to="/MyFeed"> <Icon type="container" /> 오늘 피드 </Link></li>
                            <li> <Link to="/AllDirectory"> <Icon type="folder-open" /> 디렉토리 </Link> </li>
                        </ul>
                    </div>
                </div>
                <Content className="searchpage">
                    <div className="body_search">
                        <Row className="body_search">
                            <h1 className="body_title">디렉토리</h1>
                            <SearchArea handleSubmit={this.handleSubmit} handleChangeOpt={this.handleChangeOpt} handleChangeDir={this.handleChangeDir} />
                        </Row>
                        <Row className="body_search">
                            <div className="body_subtitle"> <h3> 내 디렉토리 </h3>
                                {
                                    this.state.hideSearchResult ?
                                        (<div><div className="folderContainer">
                                            <a onClick={this.showModal}>
                                                <div className="folder">
                                                    <i className="fa fa-plus-circle"></i>
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
                                        </div><UserDirectoryList data={this.props.dirListData} onRemove={this.handleRemove} /> </div>)
                                        : (this.state.searchMyDir ? <SearchResult data={this.state.searchResult} /> : <h4> 일치하는 디렉토리가 없습니다 </h4>)
                                }
                            </div>

                        </Row>
                        <Row className="body_search">
                            {
                                this.state.hideSearchResult ?
                                    (
                                        this.state.loading_groupdir ?
                                            <div className="body_subtitle"> <h3> 공유 디렉토리 </h3> <h4> 로딩중 </h4> </div>
                                            : (this.state.has_groupdir ? <GroupDirectoryList data={this.state.grp_dirlists} /> : <div className="body_subtitle"> <h3> 공유 디렉토리 </h3> <h4> 공유된 디렉토리가 없습니다 </h4> </div>)
                                    )
                                    : (this.state.searchGroupDir ? <div className="body_subtitle"><h3> 공유 디렉토리 </h3> <SearchResult data={this.state.searchGroupDirResult} />  </div> : <div className="body_subtitle"> <h3> 공유 디렉토리 </h3> <h4> 일치하는 디렉토리가 없습니다 </h4> </div>)

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