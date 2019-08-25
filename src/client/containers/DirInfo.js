import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MatchResultList, DirAuthList } from '../components/UserDirectory';
import axios from 'axios';
import { Layout, Modal, Checkbox, Card } from 'antd';
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
            confirmLoading:false,
            loading_groupList: true,
            loading_auth: true
        };
       
    }

    componentDidMount() {
        this.performGroupList();
        this.setDefault();
        this.showArticleInDir();
    }

    showArticleInDir = () => {
        // console.log("wahta:" + now_dir_name);
        //얘를 기준으로 생각하면 됨! 
        let dir_id = this.props.location.state.now_dir_id;
        axios.post('/api/matchDirArticle', { dir_id })
            .then((response) => {
                console.log(response.data.success);
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
                // console.log("tmp" + tmp);
                this.setState({ auth_results: tmp, loading_auth:false})
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
        let obj = this.props.location.state.now_dir_owner_id;
        axios.post('/api/dirlist/grouplist', {obj})
            .then(response => {
                // console.log(response);
                // console.log(response.data);
                console.log(response.data);
                this.setState({
                    group_results: response.data,
                    loading_groupList: false
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
                        this.state.loading_groupList ? <h4 className="body_subtitle"> 권한 로딩중 </h4> : (this.state.loading_auth ? <h4 className="body_subtitle"> 권한 로딩중 </h4> : <DirAuthList showModal={this.showModal} setDefault={this.setDefault} group_auth={this.state.auth_results} options={this.state.group_results}/>)
                    }
                    {
                        this.state.loading_match ? <h4 className="body_subtitle"> 로딩중 </h4> 
                        : ( this.state.match_result_exist ? <MatchResultList match_results={this.state.match_results}/>:<div className="body_subtitle">
                            <Card title="해당 디렉토리에 저장된 글이 없습니다"></Card></div>)
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