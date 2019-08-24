import React, { Component } from 'react';
import GroupDirectoryEach from './GroupDirectoryEach';

class GroupDirectoryList extends Component {
    render() {
        return (
            <div className="body_subtitle">
                <h3> 공유 디렉토리 </h3>
                {
                    this.props.data.map((result, i) => {
                        return (
                            <GroupDirectoryEach dir_name={result.dir_name} owner_id={result.owner_id} dir_id={result.dir_id}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default GroupDirectoryList;