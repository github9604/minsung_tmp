import React from 'react';
import SearchResult from './SearchResult';

const SearchResultList = (props) => {
    return (
        <div>
            {
                props.results.map((result, i) => {
                    return (
                        <SearchResult
                            defaultFeed={props.defaultFeed}
                            insertFeed={props.insertFeed}
                            btnNumber = {i}
                            feedId={result.feedId}
                            websiteTitle={result.websiteTitle}
                            website={result.website}
                            description={result.description}
                            iconUrl={result.iconUrl}
                            topics={result.topics}
                            btnColor={props.btnSet[i]}
                            />
                    )
                })
            }
        </div>
    );
}

export default SearchResultList;