import React, { Component } from 'react';
import { Checkbox, Button } from 'antd';
import MatchResult from './MatchResult';

class MatchResultList extends Component {

    state = {
        group_auth: [],
        default_auth: []
    }

    groupChange = (checkedValues) => {
        // console.log("value??: " + checkedValues);
        this.setState({ group_auth: checkedValues });
    }

    setGroup = () => {
        console.log("selected group name parsing");
        let sendData = {
            group_auth: this.state.group_auth
        }
        this.props.changeDirAuth(sendData);
    }

    render() {
        let arr = JSON.parse("[" + this.props.group_auth + "]");
        // console.log(this.props.options[0]);
        return (
            <div>
                <div className="dir_title">
                    <h2 className="dir_title_content"> {this.props.now_dir} </h2>
                </div>
                <table cellpadding="20px">
                    <tr className="dir_auth_content">
                        {
                            this.props.group_auth.map((element, i) => {
                                return (
                                    <td className="dir_auth_content_td"> #{this.props.options[element].label} </td>
                                )
                            })
                        }
                        <td className="dir_auth_content_td" onClick={this.setGroup}> 권한변경 </td>
                    </tr>
                </table>
                {/* <Checkbox.Group options={this.props.options} onChange={this.groupChange} defaultValue={arr} /> */}
                {
                    this.props.match_results.map((result, i) => {
                        return (
                            <MatchResult title={result.article_title} author={result.author} content={result.article_content} />
                            // <div>
                            //     <h2>{result.article_title}</h2>
                            //     <h3> {result.article_author} </h3>
                            //     <h4> {result.article_content} </h4>
                            // </div>
                            // <MatchResult title={result.title} author={result.author}/>
                        )
                    })
                }
            </div >
        )
    }
}

export default MatchResultList;