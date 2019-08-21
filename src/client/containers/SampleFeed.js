import React, { Component } from 'react';
import axios from 'axios';
import { UserFeedResultList } from '../components/UserFeed';
import { Select } from 'react-select';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class SampleFeed extends Component {

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
            console.log("changing: " + curPage);
            this.showTodayFeed(curPage, this.state.results);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    showTodayFeed = (page, results) => {
        this.setState({ wholeloading: true });
        axios.post('/api/showtodayfeed', { page, results})
            .then((response) => {
                console.log("response: " + response);
                console.log("response data: " + response.data);
                this.setState({
                    results: response.data,
                    wholeloading: false
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    showDirLists = () => {
        axios.get('/api/showtodayfeed/dirlist')
            .then((response) => {
                console.log("response data[0]: " + response.data[0].dir_name);
                for (let i = 0; i < response.data.length; i++) {
                    let tmp = response.data[i].dir_name;
                    let tmplist = this.state.dirlists;
                    tmplist.push({
                        name: tmp,
                        value: tmp
                    })
                    this.setState({ dirlists: tmplist });
                    console.log("tmp: " + tmp);
                }
                this.setState({
                    dirlist: tmpdirlists
                });
            })
            .catch(error => {
                console.log('error fetching and parsing data');
            })
    }


    handleDirInput = () => {
        console.log("handleDirInput");
    }

    addtoDirectory = (selectdir) => {
        console.log("parsed selectdir data: " + selectdir.dirId);
        console.log("origin: " + selectdir.articleId);
        let tmp = selectdir.articleId.split('/');
        console.log("changed: " + tmp[0]);
        console.log(tmp[1]);
        let dirId = selectdir.dirId;
        let articleId = tmp[0] + tmp[1];
        axios.post('/api/showTodayFeed/diratriclemap', { dirId, articleId })
            .then((response) => {
                console.log("article and directory mapping success");
            })
    }

    nextPage = (pageNumber) => {

    }

    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };
        const loadingTextCSS = { display: this.state.wholeloading ? "block" : "none" };
        return (
            <Layout>
                <Content>
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div> my feed page </div>
                            <div>
                                <div> <UserFeedResultList addtoDirectory={this.addtoDirectory} showTodayFeed={this.showTodayFeed} showDirLists={this.showDirLists} dirlists={this.state.dirlists} results={this.state.results} /> </div>
                            </div>
                            <div
                                ref={loadingRef => (this.loadingRef = loadingRef)}
                                style={loadingCSS}
                            ></div>
                            <span style={loadingTextCSS}>Loading...</span>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default SampleFeed;