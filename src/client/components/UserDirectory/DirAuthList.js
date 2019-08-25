import React, { Component } from 'react';
import { Checkbox, Button } from 'antd';

class DirAuthList extends Component {

    render() {
        return (
            <div className="body_subtitle">
                <table cellPadding="20px">
                    <tr className="dir_auth_content">
                        {
                            this.props.group_auth.map((element, i) => {
                                return (
                                    <td className="dir_auth_content_td"> #{this.props.options[element].label} </td>
                                )
                            })
                        }
                        <td className="dir_auth_content_td" id="submit_auth"> <a onClick={this.props.showModal}> 권한변경 </a> </td>
                    </tr>
                </table>
            </div >
        )
    }
}

export default DirAuthList;