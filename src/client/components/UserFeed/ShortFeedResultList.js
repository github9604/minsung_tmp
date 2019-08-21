import React from 'react';
import UserFeed from './UserFeed';

const ShortFeedResultList = (props) => {

    console.log(props.results.length);
    let sliced = [];
    for(let i=0; i<6; i++){
        sliced[i] = props.results[i];
    }
    return (
        <div>
            {
                sliced.map((result, i) => {
                    // console.log(result.summary);
                    // console.log(result);
                    let sum_content = result && result.summary ? result.summary.content : null;
                    let originlink = result.canonicalUrl ? result.canonicalUrl : result.origin.htmlUrl;
                    // console.log(sum_content);
                    return (
                        <UserFeed addtoDirectory={props.addtoDirectory} originlink={originlink} summary={sum_content} author={result.author} articleId = {result.id} dirlists = {props.dirlists} visualUrl = {result.visual} title={result.title} />
                    )
                })
            }
        </div>
    );
}

export default ShortFeedResultList;