import React, {Component} from 'react';
import { Button, Input } from 'antd';

class SampleWrite extends Component {

    render(){
        return(
            <div>
                 <Input size="large" placeholder="생성할 폴더 이름을 입력하세요" onChange={this.props.handleChange} />
            </div>
        );
    }
}

export default SampleWrite;