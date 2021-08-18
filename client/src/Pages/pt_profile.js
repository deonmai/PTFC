import React, { Component } from 'react';


import './stylesheets/pt-profile.css'
import Header from '../Components/header';
import Footer from '../Components/footer';
import ImageUpload from '../Components/image_upload';

import Modal from 'react-modal';
import {get_pt_profile, post_pt_biography, post_pt_profile} from "../Components/UserFunctions";
import {MultiSelect, Option, ButtonIcon, Button, Textarea, Input, Select} from 'react-rainbow-components';
import {Link} from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPencilAlt, faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement('#root');

class pt_profile extends Component {
    state = {
        age: 21,
        expertise: ["programming"],
        location: "Adelaide",
        user: {},

        bio: "",
        firstname: "",
        lastname: "",
        contactnumber: "",
        email: "",
        hourlyrate: "",
        gender: "",
        locationpreference: "",


        expertisemodal:false,
        aboutmodal: false,
        profileinfomodal: false,

        selected_languages: [],
        selected_muscle_groups: [],

        dob_day: "",
        dob_month: "",
        dob_year: "",
        dob: "",

        options: {},
        days:[],
        months:[],
        years:[],
        genders:[],
        muscle_group:[],
        languages:[],
        location_preferences: [],
        full_address: "",
        street: "",
        city: "",
        postcode: "",
        address_state: "",
        country: "",

        loggedin: true,
    };

    componentDidMount = () => {
        if (localStorage.getItem('trainer_id') === null){
            this.props.history.push('/pt_login')
        }

        fetch("http://localhost:4000/options", {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then (response => response.json())
        .then (data => {
            this.setState({options: data})
            
            this.setState ({muscle_group: data.muscle_group})
            this.setState ({languages: data.languages})

            this.setState ({days: []})
            this.setState ({months: []})
            this.setState ({years: []})
            this.setState ({genders: []})
            this.setState ({location_preferences: []})

            data.days.forEach(element => this.state.days.push({
                value: element,
                label: element
            }))
            data.months.forEach(element => this.state.months.push({
                value: element,
                label: element
            }))
            data.years.forEach(element => this.state.years.push({
                value: element,
                label: element
            }))
            data.genders.forEach(element => this.state.genders.push({
                value: element,
                label: element
            }))
            data.location_preferences.forEach(element => this.state.location_preferences.push({
                value: element,
                label: element
            }))
        })
        .catch(err => console.log(err))

        get_pt_profile()
            .then(data => {
                console.log(data);
                this.setState({user: data});
                this.setState({dob_day: this.state.user.date_of_birth.substring(0,2)});
                this.setState({dob_month: this.state.user.date_of_birth.substring(3,6)});
                this.setState({dob_year: this.state.user.date_of_birth.substring(7,12)});
                
                // prefill form, ready for submit
                this.setState({selected_languages: []});
                this.setState({selected_muscle_groups: []});
                this.setState({bio: data.biography});
                this.setState({firstname: data.first_name});
                this.setState({lastname: data.last_name});
                this.setState({gender: data.gender});
                this.setState({contactnumber: data.mobile_number});
                this.setState({email: data.email});
                this.setState({locationpreference: data.location_preference});
                this.setState({hourlyrate: data.hourly_rate});
                
                JSON.parse(data.muscle_group).forEach(element => this.state.selected_muscle_groups.push({
                    "icon":null,
                    "label": element,
                    "name": element
                }))

                JSON.parse(data.languages_spoken).forEach(element => this.state.selected_languages.push({
                    "icon":null,
                    "label": element,
                    "name": element
                }))
                
            })
            .catch(err => console.log(err))
        
            fetch("http://localhost:4000/get_pt_address", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trainer_id: localStorage.getItem("trainer_id"),
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({full_address: data.address, street: data.street, city: data.city, address_state: data.state, postcode: data.postcode, country: data.country});
            })
        this.setState({aboutmodal: true});
        this.setState({aboutmodal: false});
    }

    onLanguageFilterChange = (value) => {
        var search_languages = [];
        this.setState({ selected_languages: value });
        value.forEach(element => search_languages.push(element.label));

        fetch("http://localhost:4000/update_languages", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: localStorage.getItem("trainer_id"),
                language: search_languages
            })
        })
        .catch(err => console.log(err))
    }

    onMuscleGroupFilterChange = (value) => {
        var search_muscle_groups = [];
        this.setState({ selected_muscle_groups: value });
        value.forEach(element => search_muscle_groups.push(element.label));

        fetch("http://localhost:4000/update_muscles", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: localStorage.getItem("trainer_id"),
                muscle: search_muscle_groups
            })
        })
        .catch(err => console.log(err))
    }

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
        var bio = this.state.bio;
        console.log(bio);
        localStorage.setItem('biography', bio);        
        // localStorage.removeItem('biography');
        post_pt_biography()
            .then(data => {
                // console.log("BIO", data.biography);
                this.componentDidMount();
            })
            .catch(err => console.log(err))
        
        this.setState({aboutmodal: false});
    }

    handleeditSubmit = (event) =>{
        var dob_month = this.state.dob_month;
        
        for (var i=0; i<12; i++) {
            if (this.state.months[i].value === dob_month) {
                dob_month = i+1;
            }
        }
        
        var user = {
            trainer_id: localStorage.getItem('trainer_id'),

            first_name : this.state.firstname,
            last_name : this.state.lastname,
            gender: this.state.gender,
            date_of_birth: this.state.dob_year + "/" + dob_month + "/" + this.state.dob_day,
            email : this.state.email,
            mobile_number : this.state.contactnumber,
            location_preferences: this.state.locationpreference,
            hourly_rate: this.state.hourlyrate,
            // street: document.getElementById("street_input").value,
            // city: document.getElementById("city_input").value,
            // state: document.getElementById("state_input").value,
            // postcode: document.getElementById("postcode_input").value,
            // country: document.getElementById("country_input").value

            street: this.state.street,
            city: this.state.city,
            state: this.state.address_state,
            postcode: this.state.postcode,
            country: this.state.country,
        };

        console.log("USER\n" + JSON.stringify(user));

        localStorage.setItem('pt_profile_changes', JSON.stringify(user));

        post_pt_profile()
            .then(data => {
                this.componentDidMount();
            })
            .catch(err => console.log(err))

        this.setState({profileinfomodal: false});
    }
    handleChange = (event) => {
        const value = event.target.value.replace(/\+|-/ig, '');
        this.setState({hourly_rate: value});
    }

    handleBioChange = (event) => {
        this.setState({bio: event.target.value});
    }

    handleFirstNameChange = (event) => {
        this.setState({firstname: event.target.value});
    }

    handleLastNameChange = (event) => {
        this.setState({lastname: event.target.value});
    }

    handleContactNumChange = (event) => {
        this.setState({contactnumber: event.target.value});
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handleHourlyrateChange = (event) => {
        this.setState({hourlyrate: event.target.value});
    }

    handleGenderChange = (event) => {
        this.setState({gender: event.target.value});
    }

    handleLocationPreferenceChange = (event) => {
        this.setState({locationpreference: event.target.value});
    }

    handleDayChange = (event) => {
        this.setState({dob_day: event.target.value});
    }

    handleMonthChange = (event) => {
        this.setState({dob_month: event.target.value});
    }

    handleYearChange = (event) => {
        this.setState({dob_year: event.target.value});
    }


    handleStreetChange = (event) => {
        this.setState({street: event.target.value});
    }
    handleCityChange = (event) => {
        this.setState({city: event.target.value});
    }
    handleStateChange = (event) => {
        this.setState({address_state: event.target.value});
    }
    handlePostcodeChange = (event) => {
        this.setState({postcode: event.target.value});
    }
    handleCountryChange = (event) => {
        this.setState({country: event.target.value});
    }
        


    render() {
        return (
        <div>
        <Header />
            <div className = "backgrounddiv">
                <div className = "centredivs">
                    <div className = "flexdiv">
                        <div className = "leftdiv">
                            <img className = "profilepic" alt="Trainer Profile" src = {`assets/img/trainer_images/${this.state.user.profile_image}`}></img>
                            <ImageUpload/>
                            <div className = "expertisediv">
                                <span><b>MUSCLE EXPERTISE</b></span>
                                <hr className = "line"></hr>
                                <MultiSelect
                                    className = "muscle-group-filter p-b-30"
                                    placeholder="Add muscles"
                                    onChange={this.onMuscleGroupFilterChange}
                                    value={this.state.selected_muscle_groups}
                                    label="Add muscle expertise"
                                    hideLabel
                                    labelAlignment = 'center'
                                    enableSearch
                                    variant = "chip"
                                    chipVariant = "brand"
                                    showCheckbox
                                    isBare
                                >
                                    <Option name="header" label="Select muscles" variant="header" />
                                    {this.state.muscle_group.map(muscle => <Option name={muscle} label={muscle}></Option>)}
                                </MultiSelect>
                            </div>
                           
                            <div className = "expertisediv">
                                <span><b>LANGUAGES SPOKEN</b></span>
                                <hr className = "line"></hr>
                                <MultiSelect
                                    className = "language-filter p-b-30"
                                    placeholder="Add langauges"
                                    onChange={this.onLanguageFilterChange}
                                    value={this.state.selected_languages}
                                    label="Add langauges spoken"
                                    hideLabel
                                    labelAlignment = 'center'
                                    enableSearch
                                    chipVariant = "brand"
                                    variant = "chip"
                                    showCheckbox
                                    isBare
                                >
                                    <Option name="header" label="Select langanges" variant="header" />
                                    {this.state.languages.map(language => <Option name={language} label={language}></Option>)}
                                </MultiSelect>
                            </div>
                        </div>
                        <div className = "rightdiv">
                            <div className = "ptheaddiv">
                                <span className = "ptname"><b>{this.state.user.first_name} {this.state.user.last_name}</b></span>
                            </div>
                            <span className = "namedescription"><b>Personal Trainer</b></span>
                            <div className = "rightmaindiv">
                                <div className = "rightdivheader">
                                    
                                    <span><b>BIOGRAPHY</b></span>
                                    <div className = "editaboutbutton">{this.state.loggedin &&<ButtonIcon onClick = {this.openaboutmodal} variant="outline-brand" size="small" icon={<FontAwesomeIcon icon={faPencilAlt} />} />}</div>
                                    <hr className = "line"></hr>
                                    <Modal isOpen = {this.state.aboutmodal} style={customStyles} onRequestClose={this.closeaboutmodal}>
                                        <div className = "expertisemodaldiv">
                                            <span><b>Edit My Biography</b></span>
                                            
                                            
                                            <div className = "closebutton"><ButtonIcon variant = "neutral" size="large" icon={<FontAwesomeIcon icon={faTimes} />} onClick = {this.closeaboutmodal}/></div>
                                            <div className = "editbiodiv">
                                                <form id = "editbio">
                                                    <Textarea
                                                        value = {this.state.bio}
                                                        onChange = {this.handleBioChange}
                                                        id = "editbiobox"
                                                        ref = "editbiobox2"
                                                        rows={8}
                                                        placeholder="Enter Bio"
                                                        style={containerStyles}
                                                        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                                    />
                                                </form> 
                                            </div>
                                            <div className = "cancelandsavebutton">
                                                <Button variant="neutral" className="rainbow-m-around_medium" onClick = {this.handleBioSubmit}>
                                                    <span className = "edit_avail_text">Save</span>
                                                    <FontAwesomeIcon icon={faCheck} className="rainbow-m-left_medium" />
                                                </Button>
                                            </div>
                                            
                                            
                                        </div>
                                    </Modal>
                                    <div className = "abouttext">
                                        <p className = "aboutp">{this.state.user.biography}</p>
                                    </div>
                                </div>

                                <div className = "rightdivheader">
                                    <span><b>ABOUT</b></span>
                                    <div className = "editaboutbutton">{this.state.loggedin &&<ButtonIcon onClick = {this.openprofileinfomodal} variant="outline-brand" size="small" icon={<FontAwesomeIcon icon={faPencilAlt} />} />}</div>
                                </div>
                                <hr className = "line"></hr>
                                <Modal isOpen = {this.state.profileinfomodal} style={customStyles} onRequestClose={this.closeprofileinfomodal}>
                                    <span><b>Edit Profile</b></span>
                                    <div className = "closebutton"><ButtonIcon variant = "neutral" size="large" icon={<FontAwesomeIcon icon={faTimes} />} onClick = {this.closeprofileinfomodal}/></div>
                                    <div className = "expertisemodaldiv">
                                        <div className = "infodiv">
                                            <div className="generaltext">
                                                <span><b>GENERAL INFORMATION</b></span><br></br>
                                            </div>
                                            <div className = "formdiv">
                                                <form className = "form">
                                                    <Input
                                                        label="First Name"
                                                        value = {this.state.firstname}
                                                        placeholder="Enter Firstname"
                                                        onChange = {this.handleFirstNameChange}
                                                        type="text"
                                                        className="rainbow-p-around_medium"
                                                        style={inputStyles}
                                                    />
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                <form className = "form">
                                                    <Input
                                                        label="Last Name"
                                                        value = {this.state.lastname}
                                                        onChange = {this.handleLastNameChange}
                                                        placeholder="Enter Lastname"
                                                        onChange = {this.handleLastNameChange}
                                                        type="text"
                                                        className="rainbow-p-around_medium"
                                                        style={inputStyles}
                                                    />
                                                </form>
                                            </div>


                                            <div className = "formdiv">

                                                    <Select
                                                        label="Gender"
                                                        options={this.state.genders}
                                                        onChange = {this.handleGenderChange}
                                                        value = {this.state.gender}
                                                        id="gender"
                                                        style={containerStyles}
                                                        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                                    />

                                            </div>

                                            <div className = "formdiv">
                                                <form className = "form">
                                                    <Input
                                                        label="Contact Number"
                                                        value = {this.state.contactnumber}
                                                        placeholder="Enter Contact Number"
                                                        onChange = {this.handleContactNumChange}
                                                        type="text"
                                                        className="rainbow-p-around_medium"
                                                        style={inputStyles}
                                                    />
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                <form className = "form">
                                                    <Input
                                                        label="Email"
                                                        value = {this.state.email}
                                                        onChange = {this.handleEmailChange}
                                                        placeholder="Enter Email"
                                                        type="text"
                                                        className="rainbow-p-around_medium"
                                                        style={inputStyles}
                                                    />
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                <Select
                                                    label="Birth Day"
                                                    value = {this.state.dob_day}
                                                    onChange = {this.handleDayChange}
                                                    options={this.state.days}
                                                    id="example-select-1"
                                                    style={containerStyles}
                                                    className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                                />
                                                <Select
                                                    label="Birth Month"
                                                    value = {this.state.dob_month}
                                                    onChange = {this.handleMonthChange}
                                                    options={this.state.months}
                                                    id="example-select-1"
                                                    style={containerStyles}
                                                    className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                                />
                                                <Select
                                                    label="Birth Year"
                                                    value = {this.state.dob_year}
                                                    onChange = {this.handleYearChange}
                                                    options={this.state.years}
                                                    id="example-select-1"
                                                    style={containerStyles}
                                                    className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                                />
                                            </div>

                                            <div className = "formdiv">
                                                    <Select
                                                        label="Location Preference"
                                                        value = {this.state.locationpreference}
                                                        onChange = {this.handleLocationPreferenceChange}
                                                        options={this.state.location_preferences}
                                                        id="example-select-1"
                                                        style={containerStyles}
                                                        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                                                    />
                                            </div>

                                            <div className = "formdiv">
                                                <form className = "form">
                                                    <Input
                                                        label="Hourly Rate"
                                                        placeholder="Enter Hourly Rate"
                                                        value = {this.state.hourlyrate}
                                                        onChange = {this.handleHourlyrateChange}
                                                        type="text"
                                                        className="rainbow-p-around_medium"
                                                        style={inputStyles}
                                                    />
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                {/* <form>
                                                    <span className = "street">Street: </span>
                                                    <input id="street_input" className="inputbox" type="text" pattern="[0-9]*"  defaultValue={this.state.street}/>
                                                </form> */}

                                                <form className = "form">
                                                    <Input
                                                        label="Street Address"
                                                        value = {this.state.street}
                                                        onChange = {this.handleStreetChange}
                                                        placeholder="Enter Street Name"
                                                        type="text"
                                                        className="rainbow-p-around_medium"
                                                        style={inputStyles}
                                                    />
                                                </form>

                                            </div>

                                            <div className = "formdiv">
                                                {/* <form>
                                                    <span className = "city">City: </span>
                                                    <input id="city_input" className="inputbox" type="text" pattern="[0-9]*"  defaultValue={this.state.city}/>
                                                </form> */}

                                                <form className = "form">
                                                    <Input
                                                        label="City"
                                                        value = {this.state.city}
                                                        onChange = {this.handleCityChange}
                                                        placeholder="Enter City Name"
                                                        type="text"
                                                        className="rainbow-p-around_medium"
                                                        style={inputStyles}
                                                    />
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                {/* <form>
                                                    <span className = "state">State: </span>
                                                    <input id="state_input" className="inputbox" type="text" pattern="[0-9]*"  defaultValue={this.state.address_state}/>
                                                </form> */}

                                                <form className = "form">
                                                    <Input
                                                        label="State"
                                                        value = {this.state.address_state}
                                                        onChange = {this.handleStateChange}
                                                        placeholder="Enter State"
                                                        type="text"
                                                        className="rainbow-p-around_medium"
                                                        style={inputStyles}
                                                    />
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                {/* <form>
                                                    <span className = "postcode">Postcode: </span>
                                                    <input id="postcode_input" className="inputbox" type="text" pattern="[0-9]*"  defaultValue={this.state.postcode}/>
                                                </form> */}

                                                <form className = "form">
                                                    <Input
                                                        label="Post Code"
                                                        value = {this.state.postcode}
                                                        onChange = {this.handlePostcodeChange}
                                                        placeholder="Enter Postcode"
                                                        type="text"
                                                        className="rainbow-p-around_medium"
                                                        style={inputStyles}
                                                    />
                                                </form>
                                            </div>

                                            <div className = "formdiv">
                                                {/* <form>
                                                    <span className = "country">Country: </span>
                                                    <input id="country_input" className="inputbox" type="text" pattern="[0-9]*"  defaultValue={this.state.country}/>
                                                </form> */}

                                                <form className = "form">
                                                    <Input
                                                        label="Country"
                                                        value = {this.state.country}
                                                        onChange = {this.handleCountryChange}
                                                        placeholder="Enter Country Name"
                                                        type="text"
                                                        className="rainbow-p-around_medium"
                                                        style={inputStyles}
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className = "cancelandsavebutton">
                                        <Button variant="neutral" className="rainbow-m-around_medium" onClick = {this.handleeditSubmit}>
                                            <span className = "edit_avail_text">Save</span>
                                            <FontAwesomeIcon icon={faCheck} className="rainbow-m-left_medium" />
                                        </Button>
                                    </div>
                                </Modal>                                
                                <div className = "infodiv">
                                    <div className = "infofields">
                                        <span>Gender: </span><br></br>
                                        <span>{this.state.user.gender}</span>
                                    </div>
                                    <div className = "infofields">
                                        <span className = "infoheader">Mobile Number: </span><br></br>
                                        <span className = "infocontent">{this.state.user.mobile_number}</span>
                                    </div>
                                    <div className = "infofields">
                                        <span>Email: </span><br></br>
                                        <span>{this.state.user.email}</span>
                                    </div>
                                    <div className = "infofields">
                                        <span>Date of Birth:</span><br></br>
                                        <span>{this.state.user.date_of_birth}</span>
                                    </div>
                                    <div className = "infofields">
                                        <span>Location Preference: </span><br></br>
                                        <span>{this.state.user.location_preference}</span>
                                    </div>
                                    <div className = "infofields">
                                        <span>Hourly Rate: </span><br></br>
                                        <span>{this.state.user.hourly_rate}</span>
                                    </div>
                                    <div className = "infofields">
                                        <span>Address: </span><br></br>
                                        <span>{this.state.full_address}</span>
                                    </div>
                                </div>

                                <Link to="pt_availability">
                                    
                                    <div className = "editavailability">
                                        <Button variant="brand" className="rainbow-m-around_medium">
                                            <span className = "edit_avail_text">Edit Availability</span>
                                            <FontAwesomeIcon icon={faArrowRight} className="rainbow-m-left_medium" />
                                        </Button>
                                    </div>
                                </Link>
                                
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

const containerStyles = {
    maxWidth: 1000,
};

const inputStyles = {
    width: 300,
};


export default pt_profile;