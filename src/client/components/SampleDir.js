import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, Button, Card, Checkbox } from 'antd';
const { Meta } = Card;

class SampleDir extends Component {

    state = {
        modal_visible: false,
        confirmLoading: false,
        group_auth: [],
        default_auth: []
    }

    groupChange = (checkedValues) => {
        // console.log("value??: " + checkedValues);
        this.setState({ group_auth: checkedValues });
    }

    showModal = () => {
        this.setState({
            modal_visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: '권한 변경 중',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                modal_visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            modal_visible: false,
        });
    };

    handleRemove = () => {
        let deleteDirInput = this.props.data.dir_name;
        let index = this.props.index;
        this.props.onRemove(deleteDirInput, index);
    }
    render() {
        let arr = JSON.parse("[" + this.props.group_auth + "]");
        // console.log("???: " + this.props.data);
        return (
            <li>
                <a className="nav_a" >
                    <Link exact to={`/MyDirectory/${this.props.data.dir_name}`}>
                        {this.props.data.dir_name}
                    </Link>
                    <Button type="danger" onClick={this.handleRemove}> 삭제 </Button>
                    <a onClick={this.showModal}> 권한 수정 </a>
                    <Modal
                        title="Directory 생성"
                        visible={this.state.modal_visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                         <Checkbox.Group options={this.props.options} onChange={this.groupChange} defaultValue={arr} />
                    </Modal>
                </a>
            </li>
            // <a className="nav_a" >
            //     <Link exact to={`/UserDirectory/${this.props.data.dir_name}`}>{this.props.data.dir_name}</Link>
            //     {/* <Link exact to={`/UserDirectory/${this.props.data.dir_name}`}><Tag closable color="#87d068" onClose={this.handleRemove}> {this.props.data.dir_name} </Tag> </Link> */}
            //     <Button type="danger" onClick={this.handleRemove}> 삭제 </Button>
            // </a>
        );
    }
}

SampleDir.propTypes = {
    data: PropTypes.object,
    onRemove: PropTypes.func
};

SampleDir.defaultProps = {
    data: {
        data: 'All'
    },
    onRemove: (deleteDirInput, index) => {
        console.error('삭제 함수가 정의되어 있지 않음');
    }
}

export default SampleDir;