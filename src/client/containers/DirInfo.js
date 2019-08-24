import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MatchResultList } from '../components/UserDirectory';
import axios from 'axios';
import { Layout, Modal, Checkbox } from 'antd';
const { Content } = Layout;

class DirInfo extends Component {

    constructor() {
        super();
        this.state = {
            match_results: [],
            match_result_exist: true,
            loading_match: true,
            auth_results: [],
            group_results: [],
            modal_visible: false,
            change_auth: [],
            confirmLoading:false
        };
        this.performGroupList();
    }

    componentDidMount() {
        this.showArticleInDir();
        this.setDefault();
    }

    showArticleInDir = () => {
        // console.log("wahta:" + now_dir_name);
        //얘를 기준으로 생각하면 됨! 
        let dir_id = this.props.location.state.now_dir_id;

        axios.post('/api/matchDirArticle', { dir_id })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    this.setState({ match_results: response.data.data, match_result_exist: true, loading_match: false });
                } else {
                    this.setState({ loading_match: false, match_result_exist: false })
                }
            })
    }

    setDefault = () => {
        let dir_id = this.props.location.state.now_dir_id;
        axios.post('/api/dirlist/setuserdefault', { dir_id })
            .then(response => {
                let tmp = [];
                for (let i = 0; i < response.data.length; i++) {
                    tmp[i] = response.data[i].dir_auth;
                }
                console.log("tmp" + tmp);
                this.setState({ auth_results: tmp })
            })
    }

    changeDirAuth = () => {
        this.setState({confirmLoading: true});
        let group_auth = this.state.change_auth;
        let now_dir_id = this.props.location.state.now_dir_id;
        axios.post('/api/dirlist/groupAuth', { group_auth, now_dir_id })
            .then((response) => {
                console.log(response.data);
                this.setDefault();
                this.setState({confirmLoading:false, modal_visible: false});
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

    showModal = () => {
        this.setState({
            modal_visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            modal_visible: false,
        });
    };

    groupChange = (checkedValues) => {
        // console.log("value??: " + checkedValues);
        this.setState({ change_auth: checkedValues });
    }

    render() {
        let arr = JSON.parse("[" + this.state.auth_results + "]");
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
                <Content>
                    <div className="withsidetitle"> <h1 className="body_title"> {this.props.match.params.dir_name}  </h1> </div>
                    {
                        this.state.loading_match ?
                            <h4 className="body_subtitle"> 로딩중 </h4> :
                            (
                                this.state.match_result_exist ?
                                    (
                                        <MatchResultList showModal={this.showModal} group_auth={this.state.auth_results} options={this.state.group_results} match_results={this.state.match_results} />
                                    ) : <h4> 글을 추가해주세요 </h4>
                            )
                    }
                    <Modal
                        title="해당 디렉토리 권한 변경"
                        visible={this.state.modal_visible}
                        onCancel={this.handleCancel}
                        onOk={this.changeDirAuth}
                        confirmLoading={this.state.confirmLoading}
                    >
                        <Checkbox.Group options={this.state.group_results} onChange={this.groupChange} defaultValue={arr} />
                    </Modal>
                </Content>
            </Layout>
        )
    }
}

export default DirInfo;