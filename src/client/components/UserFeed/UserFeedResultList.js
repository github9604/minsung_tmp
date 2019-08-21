import React from 'react';
import UserFeedResult from './UserFeedResult';

const UserFeedResultList = (props) => {

    return (
        <div>
            {
                props.results.map((result, i) => {
                    // console.log(result.summary);
                    // console.log(result);
                    let sum_content = result && result.summary ? result.summary.content : null;
                    if(sum_content == null){
                        sum_content = result.content ? result.content.content : null;
                    }
                    let originlink = result.canonicalUrl ? result.canonicalUrl : result.origin.htmlUrl;
                    // console.log(sum_content);
                    return (
                        <UserFeedResult key={i} addtoDirectory={props.addtoDirectory} originlink={originlink} summary={sum_content} author={result.author} articleId = {result.id} dirlists = {props.dirlists} visualUrl = {result.visual} title={result.title} />
                    )
                })
            }
        </div>
    );
}

export default UserFeedResultList;