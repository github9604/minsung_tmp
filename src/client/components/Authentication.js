import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Authentication extends Component {
    state = {
        user_id: "",
        user_pw: "",
        group_id: ""
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin = () => {
        let user_id = this.state.user_id;
        let user_pw = this.state.user_pw;
        this.props.onLogin(user_id, user_pw).then(
            (success) => {
                if (!success) {
                    this.setState({
                        user_pw: ''
                    });
                }
            }
        );
    }

    groupChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleKeyPress = (e) => {
        if (e.charCode == 13) {
            if (this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    handleRegister = () => {
        let user_id = this.state.user_id;
        let user_pw = this.state.user_pw;
        let group_id = this.state.group_id;
        console.log("입력확인" + user_id);
        console.log("입력확인" + user_pw);

        this.props.onRegister(user_id, user_pw, group_id).then(
            (result) => {
                if (!result) {
                    this.setState({
                        user_id: '',
                        user_pw: '',
                        group_id: ''
                    });
                }
            }
        )
    };

    render() {
        const inputBoxes = (
            <div className="login-form">
                <div className="register-row">
                    <h3 className="register-title">
                        <label htmlFor="user_id"> 아이디 </label>
                    </h3>
                    <input
                        placeholder="아이디"
                        name="user_id"
                        type="text"
                        className="validate"
                        onChange={this.handleChange} />
                </div>
                <div className="register-row">
                    <h3 className="register-title">
                        <label htmlFor="user_pw"> 비밀번호 </label>
                    </h3>
                    <input
                        placeholder="비밀번호"
                        name="user_pw"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}/>
                </div>
                <div className="register-row">
                    <h3 className="register-title">
                        <label htmlFor="group_id"> 소속 부서 </label>
                    </h3>
                    <select className="form-control" name="group_id" id="group_id"
                        value={this.state.group_id} onChange={this.groupChange}>
                        <option selected>소속 부서를 선택해주세요</option>
                        <option name="group_id"
                            className="validate"
                            value="1">SW아키텍처TF</option>
                        <option name="group_id"
                            className="validate"
                            value="2">GIS플랫폼개발TF</option>
                        <option name="group_id"
                            className="validate"
                            value="3">AI IoT개발TF</option>/option>
                            <option name="group_id"
                            className="validate"
                            value="4">Connected Car 플랫폼 TF</option>
                    </select>
                </div>
            </div>
        );

        const LoginBoxes = (
            <div className="login-form">
                <div className="register-row">
                    <h3 className="register-title">
                        <label htmlFor="user_id"> 아이디 </label>
                    </h3>
                    <input
                        placeholder="아이디"
                        name="user_id"
                        type="text"
                        className="validate"
                        onChange={this.handleChange} />
                </div>
                <div>
                    <h3 className="register-title">
                        <label htmlFor="user_pw"> 비밀번호 </label>
                    </h3>
                    <input
                        placeholder="비밀번호"
                        name="user_pw"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress} />
                </div>
            </div>
        );

        const loginView = (
            <div className="form">
                {LoginBoxes}
                <button className="login_btn"
                    onClick={this.handleLogin}>로그인</button>
                <p className="message">아직 회원이 아니신가요? <Link to="/register"> 회원가입</Link> </p>
            </div>
        );

        const registerView = (
            <div className="form">
                {inputBoxes}
                <button className="register_btn"
                    onClick={this.handleRegister}>CREATE</button>
                <p className="message">이미 회원이신가요? <Link to="/login">로그인</Link></p>
            </div>
        );

        return (
            <div>
                {this.props.mode ? loginView : registerView}
            </div>
        )
    }
}

Authentication.PropTypes = {
    mode: PropTypes.bool,
    onRegister: PropTypes.func,
    onLogin: PropTypes.func
};


Authentication.defaultProps = {
    mode: true,
    onRegister: (user_id, user_pw, group_id) => { console.error("register function is not defined"); },
    onLogin: (user_id, user_pw) => { console.error("login function not defined"); }
};

export default Authentication;