import React, { Component } from 'react';
import {Row} from 'antd';
import { SampleGroupDir } from '../components';
import PropTypes from 'prop-types';

class SampleGroupDirList extends Component {
    render() {
        const mapToComponents = data => {
            // console.log("????: " + data);
            return data.map((result, i) => {
                // console.log("::::: " + result);
                return (
                    <SampleGroupDir
                        key={i}
                        data={result}
                        index={i}
                    />
                );
            })
        }
        return (
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

SampleGroupDirList.propTypes = {
    data: PropTypes.array
};

SampleGroupDirList.defaultProps = {
    data: []
}

export default SampleGroupDirList;