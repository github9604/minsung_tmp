import React, { Component } from 'react';
import { SearchArea, SearchResultList, OtherFeed, NoFeed} from '../components/SearchUrl';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Layout, Row } from 'antd';
const { Content } = Layout;

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            searchTerm: '',
            inputArticle: '',
            buttonStatus: [],
            user_feeds: [],
            loading_result: '',
            loading_userfeedlist: true,
            hasFeed: false,
            hideResult: true
        };
    }

    componentDidMount() {
        this.loadUserFeeds();
    }

    loadUserFeeds = () => {
        console.log("searchpage loaduserfeeds");
        axios.get('/api/showTodayFeed/feedlist')
        .then((response) => {
          if(response.data.success){
              console.log(response.data.data);
              this.setState({user_feeds: response.data.data, hasFeed: true, loading_userfeedlist: false});
          } else{
              this.setState({loading_userfeedlist: false, hasFeed:false})
          }
        })
    }

    insertFeed = (insert_results, btnColor, btnNumber) => {
        // console.log("right..?" + insert_results);
        // console.log(btnColor);
        // console.log(btnNumber);
        axios.post('/api/urlsearch/insertFeed', { insert_results })
            .then((response) => {
                console.log("searchpage insertfeed");
                // console.log("스크랩 여부: " + response.data.has_scrapped);
                // console.log(this.state.buttonStatus);
                if (btnColor == "0")
                    this.state.buttonStatus[btnNumber] = "1";
                else if (btnColor == "1")
                    this.state.buttonStatus[btnNumber] = "0";
                this.setState({ buttonStatus: this.state.buttonStatus });
                this.loadUserFeeds();
                // console.log(this.state.buttonStatus);
                // this.setState({ buttonStatus: response.data.has_scrapped });
            })
    }

    handleSubmit = (e) => {
        // console.log(e);
        // e.preventDefault();
        let obj = this.state.searchTerm;
        axios.post('/api/urlsearch', { obj })
            .then((response) => {
                console.log("searchpage handlesubmit");
                console.log(response);
                // console.log("hello: " + response.data.whole);
                console.log("bye : " + response.data.btn);
                this.setState({ results: response.data.whole, buttonStatus: response.data.btn, hideResult: false });
                console.log("yes : " + this.state.buttonStatus);
                // this.loadUserFeeds();
            })
    }

    handleChange = (value) => {
        this.setState({ searchTerm: value.target.value })
        if (!value.target.value) this.setState({ hideResult: true });
        // console.log(value.target.value);
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
                    <Row className="body_search">
                    <h1 className="body_title">구독 사이트 검색</h1>   
                    <SearchArea handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                    <br/>            
                    {
                        this.state.hideResult ? (
                        this.state.loading_userfeedlist ? 
                        <div className="body_subtitle"> <h3> 구독 중인 사이트 </h3> <h4> 로딩중 </h4> </div>: 
                        ( this.state.hasFeed ?  <OtherFeed loadUser={this.loadUserFeeds} data={this.state.user_feeds}/> : <NoFeed />))
                            : <SearchResultList btnSet={this.state.buttonStatus} insertFeed={this.insertFeed} results={this.state.results} />
                    } 
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default SearchPage;