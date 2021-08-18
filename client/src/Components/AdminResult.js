import '../Pages/stylesheets/pt-resultpage.css'
import '../Pages/stylesheets/admin.css'
import React, {Component} from 'react';
import Modal from 'react-modal';
import { MultiSelect } from 'react-rainbow-components';

class DataRow extends Component {
    // constructor() {
    //     super(props);
    //     // super();
    //     this.
    state = {
        modal: false,
        user: this.props.user,
        dropdownOpen: false,
        muscle_group: [],
        languages_spoken: [],
        button_visible: {
            approve: 'none',
            activate: 'none',
            reject: 'none',
            suspend: 'none',
        }
    };
        // this.toggle1 = this.toggle1.bind(this);
    // }
    componentDidMount = () => {
        if (Object.keys(this.state.user)[0] == "trainer_id") {
            this.setState({user_id: this.state.user.trainer_id})
            JSON.parse(this.props.user.muscle_group).forEach(element=> this.state.muscle_group.push({
                label: element,
                name: element
            }));
            JSON.parse(this.props.user.languages_spoken).forEach(element=> this.state.languages_spoken.push({
                label: element,
                name: element
            }));
        } else {
            this.setState({user_id: this.state.user.client_id})
            console.log(this.state.button_visible.profile)
        }

        if (Object.keys(this.state.user)[0] === "trainer_id") {
            switch (this.state.user.account_status) {
                case "Active":
                    this.setState({button_visible: {suspend: "inline-block"}});
                    break;
                case "Awaiting Approval":
                    this.setState({button_visible: {approve: "inline-block", reject: "inline-block"}});
                    break;
                case "Rejected":
                    this.setState({button_visible: {approve: "inline-block"}});
                    break;
                case "Suspended":
                    this.setState({button_visible: {activate: "inline-block"}});
                    break;
            }
        } else if (Object.keys(this.state.user)[0] === "client_id") {
            switch (this.state.user.account_status) {
                case "Active":
                    this.setState({button_visible: {suspend: "inline-block"}});
                    break;
                case "Suspended":
                    this.setState({button_visible: {activate: "inline-block"}});
                    break;
            }
        }
    }
    open_modal=()=>{
        this.setState({modal: true});
    }
    close_modal=()=>{
        this.setState({modal: false});
    }
    update_status=(status)=>{
        console.log(this.state.user.first_name);
        console.log(status)

        fetch("http://localhost:4000/update_account_status", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user,
                account_status: status
            })
        })
        .then (response => response.json())
        .then (data => {
            // console.log(data)
            this.setState({user: data})

            this.setState({button_visible: {approve: "none", suspend: "none", reject: "none", activate: "none"}});

            if (Object.keys(data)[0] === "trainer_id") {
                switch (this.state.user.account_status) {
                    case "Active":
                        this.setState({button_visible: {suspend: "inline-block"}});
                        break;
                    case "Awaiting Approval":
                        this.setState({button_visible: {approve: "inline-block", reject: "inline-block"}});
                        break;
                    case "Rejected":
                        this.setState({button_visible: {approve: "inline-block"}});
                        break;
                    case "Suspended":
                        this.setState({button_visible: {activate: "inline-block"}});
                        break;
                }
            } else if (Object.keys(this.state.user)[0] === "client_id") {
                switch (this.state.user.account_status) {
                    case "Active":
                        this.setState({button_visible: {suspend: "inline-block"}});
                        break;
                    case "Suspended":
                        this.setState({button_visible: {activate: "inline-block"}});
                        break;
                }
            }
        })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <React.Fragment>
                <tr>
                    <td className="text-center text-muted">{this.state.user_id}</td>
                    <td>
                        <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                                <div className="widget-content-left flex2">
                                    <div className="widget-heading"><b>{this.state.user.first_name + " " + this.state.user.last_name}</b></div>
                                    <div className="widget-subheading opacity-7">{this.state.user.email}</div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="text-center">
                        <button type="button" className="btn btn-primary btn-sm" style={{display: `${this.state.user.button_visible}`}} onClick={this.open_modal}>View Complete Profile</button>
                    </td>
                    <td className="text-center">
                        {/**<div className="badge badge-warning">Pending</div> */}
                        {/** <div className="badge badge-info">Suspended</div> */}
                        {/**<div className="badge badge-danger">Rejected</div> */}
                        {/* <div className="badge badge-success">{this.state.user.account_status}</div> */}
                        <div className={`status_badge ${this.state.user.account_status}_class`}>{this.state.user.account_status}</div>
                    </td>
                    <td className="text-center">
                        <button type="button" className="btn Approval_class" style = {{ display: `${this.state.button_visible.approve}` }} onClick={()=>this.update_status("Active")}>Approve</button>
                        <button type="button" className="btn Active_class" style = {{ display: `${this.state.button_visible.activate}` }} onClick={()=>this.update_status("Active")}>Activate</button>
                        <button type="button" className="btn Suspended_class" style = {{ display: `${this.state.button_visible.suspend}` }} onClick={()=>this.update_status("Suspended")}>Suspend</button>
                        <button type="button" className="btn Rejected_class" style = {{ display: `${this.state.button_visible.reject}` }} onClick={()=>this.update_status("Rejected")}>Reject</button>
                    </td>

                </tr>

                <Modal isOpen={this.state.modal} style={customStyles} onRequestClose={this.close_modal} scrollable={true}>
                <button className="close" type="button" onClick={this.close_modal} data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i className="fas fa-times" /></span></button>
                <div className="modalnametitle">
                    <h2 className="portfolio-modal-title text-secondary mb-0">{this.state.user.first_name} {this.state.user.last_name}</h2>
                </div>
                <div className="divider-custom">
                <div className="divider-custom-line" />
                <div className="divider-custom-icon"><i className="fas fa-star" /></div>
                <div className="divider-custom-line" />
                </div>
                <div className="ptmodaldiv">
                    <div className="modalprofilepicdiv">
                        <img className="modalprofilepic" alt="Personal Trainer" src={`assets/img/trainer_images/${this.state.user.profile_image}`}></img>
                        <div className="modalaboutmediv">
                            <span className="aboutmetext">About Me</span>

                            <div className="locationdiv">
                                <img className="locationicon" alt="location icon" src="assets/img/locationicon.png"></img>
                                <span className="ptblocklocation">{this.state.user.location_preference}</span>
                                <img className="emailicon" alt="email icon" src="assets/img/emailicon.png"></img>
                                <span className="ptresultemail">{this.state.user.email}</span>
                                <img className="emailicon" alt="phone icon" src="assets/img/phoneicon.png"></img>
                                <span className="ptresultphone">{this.state.user.mobile_number}</span>
                            </div>

                            <hr></hr>

                            <div className="aboutmecontent">
                                <p>{this.state.user.biography}</p>
                            </div>
                        </div>
                    </div>
                    <div className="modalcontentsdiv">
                        <div className="modalgeneralinfo">
                            <div className="inforsection">
                            <span className="aboutmetext">Muscle Expertise</span>

                            <MultiSelect
                                id="multiselect-component-9"
                                placeholder="Not Specified"
                                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                value={this.state.muscle_group}
                                variant="chip"
                                chipVariant="brand"
                                labelAlignment='center'
                                readOnly
                                isBare
                            />
                            </div>
                        </div>
                        <div className="modalgeneralinfo">
                            <div className="inforsection">
                            <span className="aboutmetext" >Languages Spoken</span>
                            <MultiSelect
                                id="multiselect-component-9"
                                placeholder="Not Specified"
                                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                value={this.state.languages_spoken}
                                variant="chip"
                                chipVariant="brand"
                                labelAlignment='center'
                                readOnly
                                isBare
                            />
                            </div>
                        </div>
                    </div>
                </div>
                </Modal>
            </React.Fragment>
        )
    }
}

const customStyles={
    content : {
        position: 'absolute',
        top: '20px',
        left: '300px',
        right: '300px',
        // bottom: 'auto',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'hidden',
        //WebkitOverflowScrolling: 'touch',
        borderRadius: '10px',
        outline: 'none',
        padding: '20px'
    },
    overlay: {zIndex: 1000000}
  };
export default DataRow;
