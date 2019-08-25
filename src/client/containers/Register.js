import React, {Component} from 'react';
import {Authentication} from '../components';
import {connect} from 'react-redux';
import {registerRequest} from '../actions/authentication';

class Register extends Component {
    handleRegister = (user_id, user_pw, group_id) => {
        return this.props.registerRequest(user_id, user_pw, group_id).then(
            () => {
                if(this.props.status === "SUCCESS") {
                   console.log("react: 회원가입 성공");
                   let loginData = {
                    isLoggedIn: true,
                    user_id: user_id,
                    group_id: group_id
                };
                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    this.props.history.push('/login');
                    return true;
                } else {
                   console.log("react: 회원가입 실패");
                    return false;
                }
            }
        );
    }
    render(){
        return (
            <div className="auth">
               <Authentication mode={false} 
               onRegister = {this.handleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (user_id, user_pw, group_id) => {
            return dispatch(registerRequest(user_id, user_pw, group_id));
        }
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Register);