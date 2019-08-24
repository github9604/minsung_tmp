import React, { Component } from 'react';
import { Checkbox, Button } from 'antd';
import MatchResult from './MatchResult';

class MatchResultList extends Component {

    state = {
        group_auth: [],
        default_auth: []
    }

    // groupChange = (checkedValues) => {
    //     // console.log("value??: " + checkedValues);
    //     this.setState({ group_auth: checkedValues });
    // }

    // setGroup = () => {
    //     console.log("selected group name parsing");
    //     let sendData = {
    //         group_auth: this.state.group_auth
    //     }
    //     this.props.changeDirAuth(sendData);
    // }

    render() {
        console.log(this.props.match_results);
        // console.log("in matchresultlist" + this.props.group_auth);
        // let arr = JSON.parse("[" + this.props.group_auth + "]");
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
                        <td className="dir_auth_content_td"> <a onClick={this.props.showModal}> 권한변경 </a> </td>
                    </tr>
                </table>
                {/* <Checkbox.Group options={this.props.options} onChange={this.groupChange} defaultValue={arr} /> */}
                {
                    this.props.match_results.map((result, i) => {
                        return (
                            <MatchResult title={result.article_title} author={result.author} content={result.article_content} />
                        )
                    })
                }
            </div >
        )
    }
}

export default MatchResultList;