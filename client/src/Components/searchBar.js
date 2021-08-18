// This is the search bar component (used in home page, search results page)
// Searches for PT name, filters by: gender, location, muscle group, languages
import React, { Component } from 'react';
import { MultiSelect, Option } from 'react-rainbow-components';
import { Link } from 'react-router-dom';
import './stylesheets/search-bar.css';
import '../Pages/stylesheets/gen-utility.css';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location_value: null,
            search_term: '',

            // used for selected bubbles
            selected_genders: [],
            selected_languages: [],
            selected_muscle_groups: [],
            selected_location_preferences: [],
            selected_suburbs: [],

            // options
            options: {},
            days:[],
            months:[],
            years:[],
            genders:[],
            muscle_group:[],
            languages:[],
            location_preferences: [],
            suburbs: []
        };
        this.apiKey = '513769989871-kvoln1qa7t15vm3l2hn6or1j6768ope1' // fake key yo
    }
    // ONLOAD
    componentDidMount = () => {
        fetch("http://localhost:4000/options", {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then (response => response.json())
        .then (data => {
            this.setState({options: data})
            this.setState ({days: data.days})
            this.setState ({months: data.months})
            this.setState ({years: data.years})
            this.setState ({genders: data.genders})
            this.setState ({muscle_group: data.muscle_group})
            this.setState ({languages: data.languages})
            this.setState ({location_preferences: data.location_preferences})
            this.setState ({suburbs: data.suburbs})
            console.log(data.suburbs);
            console.log(this.state.suburbs)
        })
        .catch(err => console.log(err))
    }

    // BACKEND HERE
    handleSubmit = () => { // this function handles the sending of the get request (based on search inputs)
        var search_genders = [];
        var search_languages = [];
        var search_location_preferences = [];
        var search_muscle_groups = [];
        var search_suburbs = [];

        // extract selected options
        this.state.selected_genders.forEach(element => search_genders.push(element.label));
        this.state.selected_languages.forEach(element => search_languages.push(element.label));
        this.state.selected_muscle_groups.forEach(element => search_muscle_groups.push(element.label));
        this.state.selected_location_preferences.forEach(element => search_location_preferences.push(element.label));
        this.state.selected_suburbs.forEach(element => search_suburbs.push(element.label));

        // set local storage for pt_results page
        var search_query = document.getElementById("search-input").value;
        localStorage.setItem('search_query', search_query);
        localStorage.setItem('search_genders', JSON.stringify(search_genders));
        localStorage.setItem('search_muscle_groups', JSON.stringify(search_muscle_groups));
        localStorage.setItem('search_languages', JSON.stringify(search_languages));
        localStorage.setItem('search_location_preferences', JSON.stringify(search_location_preferences));
        localStorage.setItem('search_suburbs', JSON.stringify(search_suburbs));
        // window.location.href = "pt_results";
    }

    onGenderFilterChange = (value) => {
        this.setState({ selected_genders: value });
    }

    onLanguageFilterChange = (value) => {
        this.setState({ selected_languages: value });
    }

    onMuscleGroupFilterChange = (value) => {
        this.setState({ selected_muscle_groups: value });
    }

    onLocationFilterChange = (value) => {
        this.setState({ selected_location_preferences: value });
    }

    onSuburbFilterChange = (value) => {
        this.setState({ selected_suburbs: value });
    }

    render() {
        return (
                <div>
                    <div className="search-bar-container">
                        <div className="tb">
                            <div className="td">
                                <input type="text" placeholder="Search for your next personal trainer now!" className = "search-input" id = "search-input" onChange = {(value)=> this.setState({search_term: value})}/>
                            </div>
                            <div className="td" id="s-cover">
                                <Link to = "/pt_results" >
                                <button type="submit" className = "animated-button" onClick = {this.handleSubmit}>
                                <div id="s-circle"></div>
                                <span></span>
                                </button>
                                </Link >
                            </div>
                        </div>
                    </div>
                    <div className = "all-filters m-t-20">
                        {/* <GoogleAddressLookup
                            className = "location-filter p-b-20"
                            id="gaddresslookup-4"
                            placeholder="Filter by location"
                            onChange={(value) => this.setState({ location_value: value })}
                            value={this.state.location_value}
                            apiKey={this.apiKey}
                            searchCustomOptions={{
                                location: {
                                    latitude: -34.921230,
                                    longitude: 138.599503,
                                },
                                country: 'au',
                                radius: 150000,
                                types: ['address'],
                            }}
                        /> */}
                        <h5 className = 'm-b-30 m-t-0'> Filter by </h5>
                        <MultiSelect
                            className = "force-inline gender-filter p-b-30"
                            placeholder="Gender"
                            onChange={this.onGenderFilterChange}
                            value={this.state.selected_genders}
                            label="Filter by gender"
                            hideLabel
                            variant = "chip"
                            chipVariant = "brand"
                            labelAlignment = 'center'
                            // style = {{margin: 'auto', display: 'block', maxWidth: '170px', paddingRight: '1em'}}
                            style = {{margin: 'auto', display: 'inline-block', maxWidth: '170px', paddingRight: '1em'}}
                            showCheckbox
                        >
                            <Option name="header" label="Filter by gender" variant="header" />
                            {this.state.genders.map(gender => <Option name={gender} label={gender}></Option>)}
                        </MultiSelect>
                        <MultiSelect
                            className = "muscle-group-filter p-b-30"
                            placeholder="Muscles"
                            onChange={this.onMuscleGroupFilterChange}
                            value={this.state.selected_muscle_groups}
                            label="Filter by muscle group"
                            hideLabel
                            labelAlignment = 'center'
                            enableSearch
                            variant = "chip"
                            chipVariant = "brand"
                            // style = {{margin: 'auto', display: 'block', maxWidth: '170px', paddingRight: '1em'}}
                            style = {{margin: 'auto', display: 'inline-block', maxWidth: '170px', paddingRight: '1em'}}
                            showCheckbox
                        >
                            <Option name="header" label="Muscle Group" variant="header" />
                            {this.state.muscle_group.map(muscle => <Option name={muscle} label={muscle}></Option>)}
                        </MultiSelect>
                        <MultiSelect
                            className = "language-filter p-b-30"
                            placeholder="Language"
                            onChange={this.onLanguageFilterChange}
                            value={this.state.selected_languages}
                            label="Filter by language"
                            hideLabel
                            labelAlignment = 'center'
                            enableSearch
                            chipVariant = "brand"
                            variant = "chip"
                            //style = {{margin: 'auto', display: 'block', maxWidth: '170px', paddingRight: '1em'}}
                            style = {{margin: 'auto', display: 'inline-block', maxWidth: '170px', paddingRight: '1em'}}
                            showCheckbox
                        >
                            <Option name="header" label="Filter by spoken language" variant="header" />
                            {this.state.languages.map(language => <Option name={language} label={language}></Option>)}
                        </MultiSelect>
                        <MultiSelect
                            className = "location-filter p-b-30"
                            placeholder="Location"
                            onChange={this.onLocationFilterChange}
                            value={this.state.selected_location_preferences}
                            label="Filter by location"
                            hideLabel
                            variant = "chip"
                            chipVariant = "brand"
                            labelAlignment = 'center'
                            //style = {{margin: 'auto', display: 'block', maxWidth: '170px', paddingRight: '1em'}}
                            style = {{margin: 'auto', display: 'inline-block', maxWidth: '170px', paddingRight: '1em'}}
                            showCheckbox
                        >
                            <Option name="header" label="Filter by location" variant="header" />
                            {this.state.location_preferences.map(location_preference => <Option name={location_preference} label={location_preference}></Option>)}
                        </MultiSelect>
                        <MultiSelect
                            className = "p-b-30"
                            placeholder="Suburb"
                            onChange={this.onSuburbFilterChange}
                            value={this.state.selected_suburbs}
                            label="Filter by suburb"
                            hideLabel
                            variant = "chip"
                            chipVariant = "brand"
                            labelAlignment = 'center'
                            style = {{margin: 'auto', display: 'inline-block', maxWidth: '170px', paddingRight: '1em'}}
                            //style = {{margin: 'auto', display: 'block', maxWidth: '170px', paddingRight: '1em'}}
                            showCheckbox
                        >
                            <Option name="header" label="Filter by Suburb" variant="header" />
                            {this.state.suburbs.map(suburb => <Option name={suburb} label={suburb}></Option>)}
                        </MultiSelect>
                    </div>
                </div>
        )
    }
}
export default SearchBar;
