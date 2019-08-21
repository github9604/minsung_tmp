import React, { Component } from 'react';
import { SampleDir } from '../components';
import {Row} from 'antd';
import PropTypes from 'prop-types';

class SampleDirList extends Component {
    render() {
        const mapToComponents = data => {
            // console.log("????: " + data);
            return data.map((result, i) => {
                // console.log("::::: " + result);
                return (
                    <SampleDir
                        key={i}
                        data={result}
                        index={i}
                        onRemove={this.props.onRemove}
                    />
                );
            })
        }
        return (
            <Row type="flex" gutter={16}>
                {mapToComponents(this.props.data)}
            </Row>
        );
    }
}

SampleDirList.propTypes = {
    data: PropTypes.array,
    onRemove: PropTypes.func
};

SampleDirList.defaultProps = {
    data: [],
    onRemove: (deleteDirInput, index) => {
        console.error('remove function not defined');
    }
}

export default SampleDirList;