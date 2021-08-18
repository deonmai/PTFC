import React, { Component } from 'react';
import Modal from 'react-modal';
import '../Pages/stylesheets/pt-resultpage.css'
import { MultiSelect } from 'react-rainbow-components';
import { Link } from 'react-router-dom';

class UserBlock extends Component {
    state={
        modal: false,
        user: this.props.trainer,
        muscle_group: [],
        muscle_group_shrink: [],
        languages_spoken: [],
        languages_spoken_shrink: [],

        expertisemodal:false,
        aboutmodal: false,
        profileinfomodal: false,

        loggedin: true,
    };

    

    componentDidMount=()=> {
        this.setState({modal: true});
        this.setState({modal: false});
        let max_bubbles=4;
        JSON.parse(this.props.trainer.muscle_group).forEach(element=> this.state.muscle_group.push({
            label: element,
            name: element
        }));

        if (this.state.muscle_group.length > max_bubbles) {
            for (let i=0; i<max_bubbles; i++) {
                this.state.muscle_group_shrink.push(this.state.muscle_group[i]);
            }
            let message=' +'.concat(this.state.muscle_group.length - max_bubbles) + " more";
            this.state.muscle_group_shrink.push({label: message, name: message});
        } else {
            this.setState({muscle_group_shrink: this.state.muscle_group})
        }

        JSON.parse(this.props.trainer.languages_spoken).forEach(element=> this.state.languages_spoken.push({
            label: element,
            name: element
        }));

        if (this.state.languages_spoken.length > max_bubbles) {
            for (let i=0; i<max_bubbles; i++) {
                this.state.languages_spoken_shrink.push(this.state.languages_spoken[i]);
            }
            let message=' +'.concat(this.state.languages_spoken.length - max_bubbles) + " more";
            this.state.languages_spoken_shrink.push({label: message, name: message});
        } else {
            this.setState({languages_spoken_shrink: this.state.languages_spoken});
        }
        
        var account_status_text = document.getElementsByClassName("account_status_text");
        for (let i=0; i<account_status_text.length; i++) {
            if (this.state.user.account_status === "Approved") {
                account_status_text[i].classList.add("account_status_approved")
            } else if (this.state.user.account_status === "Awaiting Approval") {
                account_status_text[i].classList.add("account_status_awaiting_approval")
            } else if (this.state.user.account_status === "Rejected") {
                account_status_text[i].classList.add("account_status_rejected")
            } else if (this.state.user.account_status === "Suspended") {
                account_status_text[i].classList.add("account_status_suspended")
            } 
        }

        // this.status_div = React.createRef();
        var change_status_button;
        if (this.state.user.hasOwnProperty("trainer_id")) {
            change_status_button = document.createElement("BUTTON");
            change_status_button.type = "button";
            change_status_button.innerHTML = "See Complete Profile";
            change_status_button.classList.add("account_details");
            change_status_button.addEventListener("click", this.openmodal)
            this.status_div.appendChild(change_status_button);

            if (this.state.user.account_status === "Approved") {
                change_status_button = document.createElement("BUTTON");
                change_status_button.type = "button";
                change_status_button.innerHTML = "Suspend";
                change_status_button.classList.add("account_status_suspended");
                change_status_button.onClick = "this.suspend_user(\"trainers\")";
                this.status_div.appendChild(change_status_button);
            } else if (this.state.user.account_status === "Awaiting Approval") {

            } else if (this.state.user.account_status === "Rejected") {

            } else if (this.state.user.account_status === "Suspended") {

            } 
        } else {
            console.log("IS CLIENT")
        }
    }

    suspend_user=(account_type)=>{
        console.log("SUSPEND USER FUNCTION EXE: " + account_type)
    }
    activate_user=(account_type)=>{
        console.log("ACTIVATE USER FUNCTION EXE: " + account_type)
    }
    reject_user=(account_type)=>{
        console.log("REJECT USER FUNCTION EXE: " + account_type)
    }

    openmodal=()=>{
        // localStorage.setItem('trainer_booking_id', this.state.trainer.trainer_id);
        this.setState({modal: true});
    }

    closemodal=()=>{
        localStorage.removeItem('trainer_booking_id');
        this.setState({modal: false});
    }

    render() {
        return (
            <React.Fragment>
                <div className="user_block_div">
                    <div className="image_div">
                        <img className="resultprofilepic" alt="Personal Trainer" src={`assets/img/trainer_images/${this.state.user.profile_image}`}></img>
                    </div>
                    <div className="resultblockrightdiv">
                        <div className="ptresultheaddiv">
                            <span className="ptresultname"><b>{this.state.user.first_name} {this.state.user.last_name}</b></span>
                            <button className="account_status_text">{this.state.user.account_status}</button>
                        </div>
                        <div className="locationdiv">
                            <img className="locationicon" alt="location icon" src="assets/img/locationicon.png"></img>
                            <span className="ptblocklocation">{this.state.user.location_preference}</span>
                            <img className="emailicon" alt="email icon" src="assets/img/emailicon.png"></img>
                            <span className="ptresultemail">{this.state.user.email}</span>
                            <img className="emailicon" alt="phone icon" src="assets/img/phoneicon.png"></img>
                            <span className="ptresultphone">{this.state.user.mobile_number}</span>
                        </div>
                        <hr></hr>
                        <div className="ptblockflexdiv">
                            <div className="ptblockflexleftdiv">
                                <span><b>Muscle Expertise: </b></span>
                            </div>
                            <div className="ptblockflexrightdiv">
                            <MultiSelect
                                id="multiselect-component-9"
                                placeholder="Not Specified"
                                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                value={this.state.muscle_group_shrink}
                                variant="chip"
                                chipVariant="brand"
                                labelAlignment='center'
                                readOnly
                                isBare
                            />
                            </div>
                        </div>

                        <div className="ptblockflexdiv">
                            <div className="ptblockflexleftdiv">
                                <span><b>Languages Spoken: </b></span>
                            </div>
                            <div className="ptblockflexrightdiv">
                            <MultiSelect
                                id="multiselect-component-9"
                                placeholder="Not Specified"
                                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                value={this.state.languages_spoken_shrink}
                                variant="chip"
                                chipVariant="brand"
                                labelAlignment='center'
                                readOnly
                                isBare
                            /> 
                            </div>
                        </div>
                    </div>
                    <div className="status_divs" ref={(DOMNodeRef) => {this.status_div=DOMNodeRef;}}></div>;
                    {/* <div className="status_divs" ref={this.status_div}>
                        <button>Wai</button>
                        <button>Ho</button>
                        <button>Ho</button>
                        <button>Ho</button>
                    </div> */}
                </div>
                
                <Modal isOpen={this.state.modal} style={customStyles} onRequestClose={this.closemodal} scrollable={true}>
                    <button className="close" type="button" onClick={this.closemodal} data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i className="fas fa-times" /></span></button>
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
                    <hr className="modalhr"></hr>
                    <div className="ptblockmodalbooknowdiv">
                    <Link to="/client_booking" >
                        <button className="booknowbutton">Book Now</button>
                    </Link >
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
export default UserBlock;