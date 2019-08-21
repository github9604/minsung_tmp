import React, { Component } from 'react';
import { Button } from 'antd';
import "antd/dist/antd.css";
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

class SearchResult extends Component {
    constructor() {
        super();
        this.state = {
            feedId: '',
            websiteTitle: ''
        };
    }

    openWindow = () => {
        console.log(this.props.website);
        window.open(this.props.website);
      }

    setData = () => {
        console.log("insert article to db btn clicked");
        let insert_results = {
            feedId: this.props.feedId,
            iconUrl: this.props.iconUrl,
            websiteTitle: this.props.websiteTitle,
            description: this.props.description,
            topics: this.props.topics[0]
        }
        this.props.insertFeed(insert_results, this.props.btnColor, this.props.btnNumber);
    }

    
    // setButton = () => {
    //     let defaultFeed = this.props.defaultFeed;
    //     for(let i=0; i<defaultFeed.length; i++){
    //         if(defaultFeed[i].feed_id == this.props.feedId){
    //             this.state.alreadyscrap = "true";
    //             break;
    //         }
    //         else{
    //             this.state.alreadyscrap = "false";
    //             break;
    //         }
    //     }
    // }
    // state = {
    //     visible: false
    // };

    // hide = () => {
    //     this.setState({
    //         visible: false
    //     });
    // };

    // handleVisibleChange = visible => {
    //     this.setState({ visible });
    // };

    render() {
        return (
            <div>
                <Card hoverable={true} onClick={this.openWindow} style={{ marginTop: 16 }} loading={false}>
                    <Meta
                        avatar={
                            <img className="right floated mini ui image" src={this.props.iconUrl} />
                        }
                        title={this.props.websiteTitle}
                        description={this.props.description}
                    />
                </Card>
                <br/>
                {
                    (this.props.btnColor === '1')
                    ? <Button type="primary" onClick={this.setData}> 이미 구독중 </Button>
                    : <Button type="default" onClick={this.setData}> Feed 구독 </Button>

                }
            </div>

            // <div class="card">
            //     <div class="content">
            //         <img class="right floated mini ui image" src={this.props.iconUrl} />
            //         <div class="header"> {this.props.websiteTitle} </div>
            //         <div class="meta"> {this.props.topics[0]} /> </div>
            //         <div class="description">
            //             <h5> {this.props.description} </h5>
            //         </div>
            //         {/* <h3>{this.props.websiteTitle}</h3> */}
            //         {/* <img src={this.props.iconUrl} /> */}
            //         {/* <h3> {this.props.topics[0]} /></h3> */}
            //         {/* <h5> {this.props.description} </h5>*/}
            //     <Button onClick={this.setData}> Feed 구독 </Button> 
            //         {/* <Popover
            //         content={<div> <div>{AddDirForm}</div> <div> {DirList} </div> <a onClick={this.hide}>Close</a> </div>}
            //         title="Title"
            //         trigger="click"
            //         visible={this.state.visible}
            //         onVisibleChange={this.handleVisibleChange}
            //         placement="bottom"
            //     >
            //         <Button type="primary">Click me</Button>
            //     </Popover> */}
            //     </div>
            // </div>
        );
    }
}

export default SearchResult;