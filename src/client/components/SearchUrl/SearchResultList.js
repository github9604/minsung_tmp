import React from 'react';
import SearchResult from './SearchResult';

const SearchResultList = (props) => {
    return (
        <div className="body_subtitle">
              <h3> 검색 결과 </h3>
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