import React, { Component } from 'react';
import axios from 'axios';
import { UserFeedResultList, UserFeedList } from '../components/UserFeed';
import { Select } from 'react-select';
import { Layout, Spin, Icon } from 'antd';
import { stringify } from 'querystring';
const { Header, Footer, Sider, Content } = Layout;

class MyFeed extends Component {

    constructor() {
        super();
        this.state = {
            results: [],
            dirlists: [],
            loading: true,
            totalResults: 0,
            page: 0,
            prevY: 0,
            wholeloading: false
        };
    }

    componentDidMount() {
        this.showTodayFeed(this.state.page);
        this.showDirLists();
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const lastUser = this.state.results[this.state.results.length - 1];
            const curPage = 6 + this.state.page;
            // console.log("changing: " + curPage);
            this.showTodayFeed(curPage, this.state.results);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    showTodayFeed = (page, results) => {
        this.setState({ wholeloading: true });
        axios.post('/api/showtodayfeed', { page, results })
            .then((response) => {
                console.log("my feed page: showtodayfeed");
                // console.log("response: " + response);
                // console.log("response data: " + response.data);
                this.setState({
                    results: response.data,
                    wholeloading: false
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    showDirLists = () => {
        axios.get('/api/dirlist')
            .then((response) => {
                // console.log("response data[0]: " + response.data[0].dir_name);
                for (let i = 0; i < response.data.length; i++) {
                    let tmp = response.data[i].dir_name;
                    let tmplist = this.state.dirlists;
                    tmplist.push({
                        name: tmp,
                        value: tmp
                    })
                    this.setState({ dirlists: tmplist });
                    // console.log("tmp: " + tmp);
                }
                this.setState({
                    dirlist: tmpdirlists
                });
                console.log("my feed page: show dir lists");
            })
            .catch(error => {
                console.log('error fetching and parsing data');
            })
    }

    addtoDirectory = (selectdir) => {
        // console.log("parsed selectdir data: " + selectdir.dirId);
        // console.log("origin: " + selectdir.articleId);
        let tmp = selectdir.articleId.split('/');
        // console.log("changed: " + tmp[0]);
        // console.log(tmp[1]);
        let dirId = selectdir.dirId;
        let articleId = selectdir.articleId;
        let article_originId = selectdir.article_originId;
        let article_author = selectdir.article_author;
        let article_content = selectdir.article_content;
        let article_title = selectdir.article_title;

        axios.post('/api/showTodayFeed/dirarticlemap', { dirId, articleId, article_originId, article_author, article_content, article_title })
            .then((response) => {
                console.log("my feed page: add to directory");
            })
    }

    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };
        const antIcon = <Icon type="loading" stype={{ fontSize: 50 }} spin />
        const loadingTextCSS = { display: this.state.wholeloading ? "block" : "none" };
        return (
            <Layout>
                <Content>
                    <h1 className="body_title">Today's Feed</h1>
                    <div>
                        <UserFeedList addtoDirectory={this.addtoDirectory} showTodayFeed={this.showTodayFeed} showDirLists={this.showDirLists} dirlists={this.state.dirlists} results={this.state.results}/>
                        {/* <div> <UserFeedResultList addtoDirectory={this.addtoDirectory} showTodayFeed={this.showTodayFeed} showDirLists={this.showDirLists} dirlists={this.state.dirlists} results={this.state.results} /> </div> */}
                    </div>
                    <div
                        ref={loadingRef => (this.loadingRef = loadingRef)}
                        style={loadingCSS}
                    ></div>
                    <Spin dicidator={antIcon} />
                </Content>
            </Layout>
        );
    }
}

export default MyFeed;