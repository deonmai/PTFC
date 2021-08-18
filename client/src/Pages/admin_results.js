import React, { Component } from 'react';

import './stylesheets/pt-resultpage.css'
import Header from '../Components/header';
import Footer from '../Components/footer';
import Modal from 'react-modal';
import UserBlock from '../Components/UserBlock';

Modal.setAppElement('#root');

class admin_results extends Component {
    constructor(props){
        super(props);
        this.state = {
            location_value: null,
            gender: {name: '', label: ''},
            muscle_group: {name: '', label: ''},
            language: {name: '', label: ''},
            search_term:'',
            trainers: [],
        };
    }
    /*
        trainers - awaiting approval (default)
        trainers - rejected
        trainers - approved
        trainers - suspended

        clients - active (default)
        clients - suspended
    */

   goBack = (event) => { // BACKEND STUFF HERE
    window.location.replace("http://localhost:3000/admin_dashboard");
    
    }
    componentDidMount = () => {
        fetch("http://localhost:4000/admin_results", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // account_type: localStorage.getItem('account_type'),
                // account_status: localStorage.getItem('accout_status')
                account_type: "trainers",
                account_status: "Approved"
            })
        })
        .then (response => response.json())
        .then (data => {
            this.setState ({ trainers: data})
        })
        .catch(err => console.log(err))
    }
    
    render() {
        return (
            <React.Fragment>
                <Header />
                    <div className = "resultbackgrounddiv">
                        <div className = "filter_and_ptresultdiv">
                            {/* <div className = "filterdiv">
                            </div> */}
                            <div className = "ptresultdiv">
                                {this.state.trainers.map(trainers => <UserBlock trainer = {trainers} />)}
                            </div>
                        </div>
                    </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default admin_results; 