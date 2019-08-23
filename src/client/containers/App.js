import React, { Component } from 'react';
import FixedHeader from '../components/FixedHeader';
import { connect } from 'react-redux';
import axios from 'axios';
import { getStatusRequest, logoutRequest } from '../actions/authentication';
import { Layout } from 'antd';
const { Footer } = Layout;

class App extends Component {
    constructor() {
        super();
        this.state = {
            dirlist_results: []
        };
    }

    handleLogout = () => {
        this.props.logoutRequest().then(
            () => {
                console.log("logout");
                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                alert("로그아웃 됐습니다");
                document.location.href="/login";
            }
        );
    }

    componentDidMount() {

        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // get loginData from cookie
        let loginData = getCookie('key');
        // if loginData is undefined, do nothing
        if (typeof loginData === "undefined") return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));
        console.log("로그인 여부" + loginData);
        // if not logged in, do nothing
        if (!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                console.log(this.props.status.valid);
                // if session is not valid
                if (!this.props.status.valid) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        user_id: '',
                        group_id: ''
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    // and notify
                    alert("비로그인 상태입니다.\n로그인 화면으로 이동합니다.");
                    document.location.href="/login";
                }
            }
        );
        this.performDirList();
    }

    performDirList = () => {
        axios.get('/api/dirlist')
            .then(response => {
                console.log(response);
                console.log(response.data);
                this.setState({
                    dirlist_results: response.data
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
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


    render() {

        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
                <div >
                    {isAuth ? undefined : <FixedHeader insertDirlist={this.insertDirlist}
                        dirlists={this.state.dirlist_results}
                        isLoggedIn={this.props.status.isLoggedIn}
                        onLogout={this.handleLogout} />}
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);