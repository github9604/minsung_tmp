import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

class FixedHeader extends Component {

  state = {
    visible: false,
    inputDir: ''
  }

  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleChange = (e) => {
    this.setState({ inputDir: e.target.value });
  };

  handleSubmit = () => {
    this.props.insertDirlist(this.state.inputDir);
  }

  render() {
    const logoutButton = (
      <li>
        <a onClick={this.props.onLogout}>
          <i className="material-icons">lock_open</i>
        </a>
      </li>
    );

    return (
      <Layout>
        <header className="header">
        <Link to="/MainPage" className="logo" id="header_a">KT Directory</Link>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
          <ul className="menu">
            <li id="header_li" ><Link to="/searchpage" id="header_a"> 구독 </Link></li>
            <li id="header_li" ><Link to="/MyFeed" id="header_a"> 피드 </Link></li>
            <li id="header_li" ><a onClick={this.props.onLogout}> 로그아웃 </a></li>
          </ul>
        </header>
      </Layout>
      // <Layout>
      //   <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      //     <div id="navbar-primary">
      //       <div >
      //         <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-primary-collapse">
      //           <span className="sr-only">Toggle navigation</span>
      //           <span className="icon-bar"></span>
      //           <span className="icon-bar"></span>
      //           <span className="icon-bar"></span>
      //         </button>
      //       </div>
      //       <div className="collapse navbar-collapse" id="navbar-primary-collapse">
      //         <ul className="nav navbar-nav">
      //           <li id="header_li" ><Link to="/searchpage" id="header_a"> 피드 추가 하기 </Link></li>
      //           <li id="header_li" ><Link to="/MyFeed" id="header_a"> 오늘 피드 보기 </Link></li>
      //           <li id="header_li" ><Link to="/MainPage" id="header_a"><img id="logo-navbar-middle" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32877/logo-thing.png" width="200" alt="Logo Thing main logo" /></Link></li>
      //           <li id="header_li" ><Link to="/AllDirectory" id="header_a"> 전체 디렉터리 </Link></li>
      //           <li id="header_li" ><Link to="/login" id="header_a"> 로그아웃 </Link></li>
      //         </ul>
      //       </div>
      //     </div>
      //   </Header>
      // </Layout>
      // <Layout>
      //   <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      //     <div className="header nav-wrapper blue darken-1">
      //       <Link to="/MainPage" className="brand-logo center">WEB</Link>
      //       <div className="right">
      //         <ul>
      //           {logoutButton}
      //           <li>
      //             <Link to="/searchpage"> 피드 추가 하기 </Link>
      //           </li>
      //           <li>
      //             <Link to="/mydirectory/asdf"> 내 디렉터리 </Link>
      //           </li>
      //           <li>
      //             <Link to="/MyFeed"> 오늘 피드 보기 </Link>
      //           </li>
      //         </ul>
      //       </div>
      //     </div>
      //   </Header>
      // </Layout>
    )
  }
}

FixedHeader.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
};

FixedHeader.defaultProps = {
  isLoggedIn: false,
  onLogout: () => { console.error("logout function not defined") }
};

export default FixedHeader;