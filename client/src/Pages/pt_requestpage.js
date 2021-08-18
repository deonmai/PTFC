import React, { Component } from 'react';

import './stylesheets/pt_requestpage.css'
import Header from '../Components/header';
import Footer from '../Components/footer';
import Modal from 'react-modal';
// import PT_block from '../Components/PT_block';

Modal.setAppElement('#root');

class pt_requestpage extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                    <div className = "requestbackgrounddiv">
                        <div className = "requestpagecenterdiv">
                            <span className = "pendingtext">Pending</span>
                        </div>
                    </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default pt_requestpage;