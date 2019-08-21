import React, { Component } from 'react';
import UserFeed from './UserFeed';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

class UserFeedList extends Component {

    render() {
        return (
            <VerticalTimeline>
               {
                   this.props.results.map((result, i) => {
                    let sum_content = result && result.summary ? result.summary.content : null;
                    if(sum_content == null){
                        sum_content = result.content ? result.content.content : null;
                    }
                    let originlink = result.canonicalUrl ? result.canonicalUrl : result.origin.htmlUrl;
                    // console.log(sum_content);
                    return (
                        <UserFeed key={i} addtoDirectory={this.props.addtoDirectory} originlink={originlink} summary={sum_content} author={result.author} articleId = {result.id} dirlists = {this.props.dirlists} visualUrl = {result.visual} title={result.title} time={result.published}/>
                    )
                   })
               }
            </VerticalTimeline>
        )
    }
}

export default UserFeedList;