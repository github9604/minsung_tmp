import React, {Component} from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class SampleWrite extends Component {

    state = {
        insertDirinput: ''
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            insertDirinput: e.target.value
        });
    }

    handlePost = () => {
        let insertDirinput = this.state.insertDirinput;
        this.props.onPost(insertDirinput).then(
            () => {
                this.setState({
                    insertDirinput: ""
                });
            }
        );
    }

    render(){
        return(
            <div>
                <input placeholder="폴더 이름 입력" onChange={this.handleChange} value={this.state.insertDirinput} />
                <a onClick={this.handlePost}> 폴더 추가 </a>
            </div>
        );
    }
}

SampleWrite.propTypes = {
    onPost: PropTypes.func
}

SampleWrite.defaultProps = {
    onPost: (insertDirinput) => {console.error("post function not defined");}
}

export default SampleWrite;