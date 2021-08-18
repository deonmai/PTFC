import React, { Component } from 'react';

import './stylesheets/pt-resultpage.css'
import Header from '../Components/header';
import Footer from '../Components/footer';
import Modal from 'react-modal';
import PT_block from '../Components/PT_block';
import MiniSearchBar from '../Components/miniSearchBar';

Modal.setAppElement('#root');

class pt_results extends Component {
        filters = {
            locationArray: [
                { key: "Northern suburbs", cat: "location" },
                { key: "North-east suburbs", cat: "location" },
                { key: "Eastern suburbs", cat: "location" },
                { key: "South-east suburbs", cat: "location" },
                { key: "Southern suburbs", cat: "location" },
                { key: "South-west suburbs", cat: "location" },
                { key: "Western suburbs", cat: "location" },
                { key: "North-western suburbs", cat: "location" }
              ],

            genderArray: [
                { key: "Male", cat: "gender" },
                { key: "Female", cat: "gender" },
            ],

            bodyArray: [
                { key: "Legs", cat: "body" },
                { key: "Chest", cat: "body" },
                { key: "Deltoids", cat: "body" },
                { key: "Triceps", cat: "body" },
                { key: "Biceps", cat: "body" },
            ],

            languageArray: [
                { key: "English", cat: "language" },
                { key: "Mandarin", cat: "language" },
                { key: "Vietnamese", cat: "language" },
                { key: "Italian", cat: "language" },
                { key: "Greek", cat: "language" },
            ],

        };

        style = {
            chips: {
              background: "#fdaf7d",
              color: "black"
            },
            searchBox: {
              border: "2px solid #30a49c",
              "border-radius": "50px",
              width: "auto",
              color: "black",
              height: "75px",
              "padding-left": "20px"

            },
            inputField: {
                color: "black",
                height: "auto"
            },
            groupHeading: {
                color: "black"
            },
            multiselectContainer: {
              color: "black",
              height: "auto"
            },
            option: {
                color: "black"
            },
            optionContainer: {
                width: "auto",
                color: "black",
                height: "auto"
            },

          };

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            location_value: null,
            search_term: '',

            // used for selected bubbles
            selected_genders: [],
            selected_languages: [],
            selected_muscle_groups: [],
            selected_location_preferences: [],

            // options
            options: {},
            days:[],
            months:[],
            years:[],
            genders:[],
            muscle_group:[],
            languages:[],
            location_preferences: [],
            trainers: [],
            suburb: []
        };
    }

    componentDidMount = () => {
        this.setState({search_term: localStorage.getItem('search_query')})
        fetch("http://localhost:4000/pt_search", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                search_term: localStorage.getItem('search_query'),
                gender: JSON.parse(localStorage.getItem('search_genders')),
                muscle: JSON.parse(localStorage.getItem('search_muscle_groups')),
                language: JSON.parse(localStorage.getItem('search_languages')),
                location: JSON.parse(localStorage.getItem('search_location_preferences')),
                suburb: JSON.parse(localStorage.getItem('search_suburbs'))
            })
        })
        .then (response => response.json())
        .then (data => {
            this.setState ({ trainers: data})
        })
        .catch(err => console.log(err))
    }

    // function to add selected values to the arrays
    onSelect(selectedList, selectedItem) {
        if (selectedItem.cat === "gender") {
            this.state.selected_gender.push(selectedItem.key);
            console.log(this.state.selected_gender);
        } else if (selectedItem.cat === "body") {
            this.state.selected_body.push(selectedItem.key);
            console.log(this.state.selected_body);
        } else if (selectedItem.cat === "language") {
            this.state.selected_language.push(selectedItem.key);
            console.log(this.state.selected_language);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />

                    <div className = "resultbackgrounddiv" style = {{margin: 'auto', textAlign: 'center'}}>
                        <div className = "search-and-filters-bg">
                            {/* search bar */}
                            <MiniSearchBar />
                            {/* end of search bar stuff copied from searchBar  */}
                        </div>
                        <div style = {{marginTop: '2em', textAlign: 'center'}}>
                            <h1 style = {{color: '#1f2833', fontSize: '3em'}}>Search Results</h1>
                        </div>

                        <div className = "ptresultdiv">
                            {this.state.trainers.map(trainers => <PT_block trainer = {trainers} />)}
                        </div>
                    </div>
                <Footer />
            </React.Fragment>
        )
    }
}
export default pt_results;
