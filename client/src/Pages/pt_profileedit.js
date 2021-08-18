import React, { Component } from 'react';


import './stylesheets/pt-profile.css'
import Header from '../Components/header';
import Footer from '../Components/footer';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class pt_profile_edit extends Component {
    state = {
        id: 123,
        firstname: "Waiho",
        lastname: "Vong",
        gender: "Male",
        age: 21,
        expertise: ["programming"],
        languages: ["English","Cantonese"],
        experience: "Master Debater",
        training: "idk",
        contactnum: "0450500500",
        ptemail: "waihovong@gmail.com",
        musclegroup: ["bicep", "chest"],
        location: "Adelaide",
        travelradius: "5km",

        expertisemodal:false,
        aboutmodal: false,
        profileinfomodal: false,
        bio: "Levi has short, straight black hair styled in an undercut curtain, as well as narrow, intimidating dull gray eyes with dark circles under them and a deceptively youthful face. He is quite short, but his physique is well-developed in musculature from extensive vertical maneuvering equipment usage. He is usually either frowning or expressionless; that, plus his extremely calm demeanor, often makes it difficult for others to guess what he is thinking.",

        days:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],
        months: ["Janurary", "Feburary","March","April","May","June","July","August","September","October","November","December"],
        years: ["1998","1997"],

        loggedin: true,
    };

    openexpertisemodal = () =>{
        this.setState({expertisemodal: true});
    }

    closeexpertisemodal = () =>{
        this.setState({expertisemodal: false});
    }

    openaboutmodal = () =>{
        this.setState({aboutmodal: true});
    }

    closeaboutmodal = () =>{
        this.setState({aboutmodal: false});
    }

    openprofileinfomodal = () =>{
        this.setState({profileinfomodal: true});
    }

    closeprofileinfomodal = () =>{
        this.setState({profileinfomodal: false});
    }

    handleBioSubmit = (event) =>{
        const bio = document.getElementById("editbiobox");
        
        

        fetch("http://localhost:4000/pt_profileeditbio",{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bio: bio.value

            })

        });
        this.setState({aboutmodal: false});
        
        
    }

    handleeditSubmit = (event) =>{
        const fname = document.getElementById("fname");
        const lname = document.getElementById("lname");
        const ptlocation = document.getElementById("ptlocation");
        const travelradius = document.getElementById("travelradius");
        const ptemail = document.getElementById("ptemail");
        const ptcontactnumber = document.getElementById("ptcontactnumber");

        console.log(fname);


        fetch("http://localhost:4000/pt_profileeditbio",{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fname: fname.value,
                lname: lname.value,
                ptlocation: ptlocation.value,
                travelradius: travelradius.value,
                ptemail: ptemail.value,
                ptcontactnumber: ptcontactnumber.value,
                
                

            })

        });
        this.setState({profileinfomodal: false});
        this.setState({firstname: fname.value});
        this.setState({lastname: lname.value});
        this.setState({location: ptlocation.value});
        this.setState({contactnum: ptcontactnumber.value});
    }


    render() {
        return (
        <div>
        <Header />
            <div className = "backgrounddiv">
                <div className = "centredivs">
                    <div className = "flexdiv">
                        <div className = "leftdiv">
                            <img className = "profilepic" src = "assets/img/wai.JPG"></img>
                            <div className = "aboutdiv">
                                <span><b>ABOUT</b></span>
                                {this.state.loggedin && <button className = "editaboutbutton" onClick = {this.openaboutmodal}>Edit</button>}

                                {/* <button className = "editaboutbutton" onClick = {this.openaboutmodal}>Edit</button> */}

                                <Modal isOpen = {this.state.aboutmodal} style={customStyles} onRequestClose={this.closeaboutmodal}>
                                    <div className = "expertisemodaldiv">

                                        <span><b>Edit Bio</b></span>
                                        <button className = "closebutton" onClick = {this.closeaboutmodal}>Close</button>
                                        <div className = "editbiodiv">
                                            <form id = "editbio">
                                                <textarea className = "editbiobox" id = "editbiobox" defaultValue = {this.state.bio}></textarea>
                                            </form> 
                                        </div>
                                        <div className = "cancelandsavebutton">
                                            <button className = "cancelbutton" onClick = {this.closeaboutmodal}>Cancel</button>
                                            <button className = "savebutton" onClick = {this.handleBioSubmit}>Save</button>
                                        </div>
                                        
                                        
                                    </div>
                                </Modal>
                                <div className = "abouttext">
                                    <p className = "aboutp">{this.state.bio}</p>
                                </div>
                            </div>
                            <div className = "expertisediv">
                                <span><b>EXPERTISE</b></span>
                                {this.state.loggedin && <button className = "editaboutbutton" onClick = {this.openexpertisemodal}>Add Expertise</button>}
                                <Modal isOpen = {this.state.expertisemodal} style={customStyles} onRequestClose={this.closeexpertisemodal}>
                                    <div className = "expertisemodaldiv">

                                        <span><b>Add Expertise</b></span>
                                        <button className = "closebutton" onClick = {this.closeexpertisemodal}>Close</button>
                                        <div className = "cancelandsavebutton">
                                            <button className = "cancelbutton" onClick = {this.closeexpertisemodal}>Cancel</button>
                                            <button className = "savebutton">Save</button>
                                        </div>
                                    </div>
                                </Modal>
                                <ul className = "expertiselist">
                                    {this.state.expertise.map(expertise => <li>{expertise}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div className = "rightdiv">
                            <div className = "ptheaddiv">
                                <span className = "ptname"><b>{this.state.firstname} {this.state.lastname}</b></span>
                                <button className = "booknowbutton">Book Now</button>
                            </div>
                            <span className = "namedescription"><b>Personal Trainer</b></span>
                            <div className = "rightmaindiv">
                                <div className = "rightdivheader">
                                    <span>ABOUT</span>

                                    {this.state.loggedin && <button className = "editaboutbutton" onClick = {this.openprofileinfomodal}>Edit</button>}
                                </div>


                                <Modal isOpen = {this.state.profileinfomodal} style={customStyles} onRequestClose={this.closeprofileinfomodal}>
                                    <span><b>Edit Profile</b></span>
                                    <button className = "closebutton" onClick = {this.closeprofileinfomodal}>Close</button>
                                    <div className = "expertisemodaldiv">

                                        

                                        <div className = "infodiv">
                                            <div className="generaltext">
                                                <span><b>GENERAL INFORMATION</b></span><br></br>
                                            </div>
                                            <div className = "formdiv">
                                                <form>
                                                    <label htmlFor = "fname">First Name:</label>
                                                    <input className = "inputbox" type = "text" id = "fname" name = "fname" defaultValue = {this.state.firstname} ></input>
                                                </form>
                                            </div>
                                            <div className = "formdiv">
                                                <form>
                                                    <label htmlFor = "lname">Last Name:</label>
                                                    <input className = "inputbox" type = "text" id = "lname" name = "lname" defaultValue = {this.state.lastname} ></input>
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                <form>
                                                    <span className = "genderspan">Gender:</span>
                                                    <label htmlFor = "male">Male</label>
                                                    <input className = "genderraido" type = "radio" id = "male" name = "gender" value = "male"></input>

                                                    <label htmlfor = "female">Female</label>
                                                    <input className = "genderraido" type = "radio" id = "female" name = "gender" value = "female"></input>
                                                </form>
                                            </div>


                                            <div className = "formdiv">
                                                <form>
                                                    <label htmlFor = "dateofbirth">Date of Birth:</label>
                                                        <select className = "dateofbirthselect" name="dateofbirth" id="days">
                                                            {this.state.days.map(days => <option value={days}>{days}</option>)}
                                                        </select>
                                                        <select className = "dateofbirthselect" name="dateofbirth" id="months">
                                                            {this.state.months.map(months => <option value={months}>{months}</option>)}
                                                        </select>
                                                        <select className = "dateofbirthselect" name="dateofbirth" id="years">
                                                            {this.state.years.map(years => <option value={years}>{years}</option>)}
                                                        </select>
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                <form>
                                                    <label htmlFor = "ptlocation">Location:</label>
                                                    <input className = "inputbox" type = "text" id = "ptlocation" name = "ptlocation" defaultValue = {this.state.location} ></input>
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                <form>
                                                    <label htmlFor = "travelradius">Travel Radius:</label>
                                                    <input className = "inputbox" type = "text" id = "travelradius" name = "travelradius" defaultValue = {this.state.travelradius} ></input>
                                                </form>
                                            </div>
                                        </div>

                                        <div className = "infodiv">
                                            <div className="generaltext">
                                                <span><b>CONTACT INFORMATION</b></span><br></br>
                                            </div>
                                            <div className = "formdiv">
                                                <form>
                                                    <label htmlFor = "ptcontactnumber">Contact Number:</label>
                                                    <input className = "inputbox" type = "text" id = "ptcontactnumber" name = "ptcontactnumber" defaultValue = {this.state.contactnum} ></input>
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                <form>
                                                    <label htmlFor = "ptemail">Email Address:</label>
                                                    <input className = "inputbox" type = "text" id = "ptemail" name = "ptemail" defaultValue = {this.state.ptemail} ></input>
                                                </form>
                                            </div>

                                            
                                        </div>


                                        
                                    </div>
                                    <div className = "cancelandsavebutton">
                                        <button className = "cancelbutton" onClick = {this.closeprofileinfomodal}>Cancel</button>
                                        <button className = "savebutton" onClick = {this.handleeditSubmit}>Save</button>
                                    </div>
                                </Modal>
                                
                                
                                <hr className = "line"></hr>
                                <div className = "infodiv">
                                    <div className="generaltext">
                                        <span><b>GENERAL INFORMATION</b></span><br></br>
                                    </div>
                                    <div className = "infofields">
                                        <span className = "infoheader">Contact Information: </span><br></br>
                                        <span className = "infocontent">{this.state.contactnum}</span>
                                    </div>
                                    <div className = "infofields">
                                        <span>Email: </span><br></br>
                                        <span>{this.state.ptemail}</span>
                                    </div>
                                    <div className = "infofields">
                                        <span>Location: </span><br></br>
                                        <span>{this.state.location}</span>
                                    </div>
                                    <div className = "infofields">
                                        <span>Travel Radius: </span><br></br>
                                        <span>{this.state.travelradius}</span>
                                    </div>

                                </div>

                                <div className = "infodiv">
                                    <div className="generaltext">
                                        <span><b>BASIC INFORMATION</b></span><br></br>
                                    </div>
                                    <div className = "infofields">
                                        <span>Date of Birth:</span><br></br>
                                        <span>07/11/1998</span>
                                    </div>
                                    <div className = "infofields">
                                        <span>Age:</span><br></br>
                                        <span>21</span>
                                    </div>
                                    <div className = "infofields">
                                        <span>Languages Spoken: </span><br></br>
                                        <ul className = "languagelist">
                                            {this.state.languages.map(language => <li>{language}</li>)}
                                        </ul>
                                    </div>
                                </div>

                                <div className = "infodiv">
                                    <div className="generaltext">
                                        <span><b>PREVIOUS EXPERIENCE</b></span><br></br>
                                    </div>
                                    
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <Footer />
        </div>
        )
    }
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default pt_profile_edit;