import React, { Component } from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

class Login extends Component {

    handleLogin = (user_id, user_pw, group_id) => {
        return this.props.loginRequest(user_id, user_pw, group_id).then(
            () => {
                if (this.props.status === "SUCCESS") {
                    console.log("react login 성공");
                    let loginData = {
                        isLoggedIn: true,
                        user_id: user_id,
                        group_id: group_id
                    };
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    this.props.history.push('/MyFeed');
                    return true;
                } else {
                    console.log("react login 실패");
                    return false;
                }
            }
        );
    }
    render() {
        return (
            <div className="auth">
                <Authentication mode={true}
                    onLogin={this.handleLogin} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (user_id, user_pw, group_id) => {
            return dispatch(loginRequest(user_id, user_pw, group_id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);