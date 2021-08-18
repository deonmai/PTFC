import React, { Component } from 'react';

import Header from '../Components/header';
import Footer from '../Components/footer';
import SearchBar from '../Components/searchBar'
import Modal from 'react-modal';
import { MultiSelect } from 'react-rainbow-components';
import { Link } from 'react-router-dom';

import { get_home_pts } from '../Components/UserFunctions';

class Home extends Component {
  state = {
    trainer:{},
    trainers:{},
    pt0: {},
    pt1: {},
    pt2: {},
    pt3: {},
    pt4: {},
    pt5: {},
    languages_spoken: [],
    muscle_group: [],

    pt1_modal: false,
  }

  componentDidMount = () => {
    get_home_pts()
      .then(data => {
        this.setState({trainers: data})

        this.setState({pt0: data[0]})
        this.setState({pt1: data[1]})
        this.setState({pt2: data[2]})
        this.setState({pt3: data[3]})
        this.setState({pt4: data[4]})
        this.setState({pt5: data[5]})

        for (let i=0; i<6; i++) {
          let temp = [];
          // this.setState({trainer: data[i]})
          JSON.parse(this.state.trainers[i].languages_spoken).forEach(element => temp.push({
            label: element,
            name: element
          }));
          this.state.trainers[i].languages_spoken = temp;

          temp = [];
          JSON.parse(this.state.trainers[i].muscle_group).forEach(element => temp.push({
            label: element,
            name: element
          }));
          this.state.trainers[i].muscle_group = temp;
        }


      })
      .catch(err => console.log(err))
  }

  openmodal = (index) =>{
    this.setState({trainer: this.state.trainers[index]});
    this.setState({pt1_modal: true});
  }

  closemodal = () =>{
    this.setState({pt1_modal: false});
  }

    render() {
        return (
    <div>
    <Header />

      <div>
        <header className="skew-section bg-home bg-home-img masthead bg-primary text-white text-center">
          <div className = "no-skew logo"> <div id = "PT-logo"/><div id = "CLUB-logo"/> </div>
          <div className="no-skew container d-flex align-items-center flex-column">
            {/* Masthead Heading*/}
            {/* Icon Divider*/}
            <div className="m-t-0 divider-custom divider-light">
              <div className="divider-custom-line" />
              <div className="divider-custom-icon"><i className="fas fa-dumbbell" /></div>
              <div className="divider-custom-line" />
            </div>
            <SearchBar />
          </div>
        </header>
        <section className="page-section portfolio" id="portfolio">
          <div className="container">
            {/* Portfolio Section Heading*/}
            <div className="text-center">
              <h2 className="page-section-heading text-secondary mb-0 d-inline-block">Featured Personal Trainers</h2>
            </div>
            {/* Icon Divider*/}
            <div className="divider-custom">
              <div className="divider-custom-line" />
              <div className="divider-custom-icon"><i className="fas fa-star" /></div>
              <div className="divider-custom-line" />
            </div>
            {/* Portfolio Grid Items*/}
            <div className="row justify-content-center mb-5">
              {/* Portfolio Items*/}
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto" onClick={() => this.openmodal(0)}>
                  <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                    <div className="portfolio-item-caption-content text-center text-white">{this.state.pt0.first_name + " " + this.state.pt0.last_name}</div>
                  </div><img className="img-fluid" src = {`assets/img/trainer_images/${this.state.pt0.profile_image}`} alt="Personal Trainer 1" />
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto" onClick={() => this.openmodal(1)}>
                  <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                    <div className="portfolio-item-caption-content text-center text-white">{this.state.pt1.first_name + " " + this.state.pt1.last_name}</div>
                  </div><img className="img-fluid" src = {`assets/img/trainer_images/${this.state.pt1.profile_image}`} alt="Personal Trainer 2" />
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto" onClick={() => this.openmodal(2)}>
                  <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                    <div className="portfolio-item-caption-content text-center text-white">{this.state.pt2.first_name + " " + this.state.pt2.last_name}</div>
                  </div><img className="img-fluid" src = {`assets/img/trainer_images/${this.state.pt2.profile_image}`} alt="Personal Trainer 3" />
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto" onClick={() => this.openmodal(3)}>
                  <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                    <div className="portfolio-item-caption-content text-center text-white">{this.state.pt3.first_name + " " + this.state.pt3.last_name}</div>
                  </div><img className="img-fluid" src = {`assets/img/trainer_images/${this.state.pt3.profile_image}`} alt="Personal Trainer 4" />
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto" onClick={() => this.openmodal(4)}>
                  <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                    <div className="portfolio-item-caption-content text-center text-white">{this.state.pt4.first_name + " " + this.state.pt4.last_name}</div>
                  </div><img className="img-fluid" src = {`assets/img/trainer_images/${this.state.pt4.profile_image}`} alt="Personal Trainer 5" />
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto" onClick={() => this.openmodal(5)}>
                  <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                    <div className="portfolio-item-caption-content text-center text-white">{this.state.pt5.first_name + " " + this.state.pt5.last_name}</div>
                  </div><img className="img-fluid" src = {`assets/img/trainer_images/${this.state.pt5.profile_image}`} alt="Personal Trainer 6" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Portfolio Modal*/}
        {/* Would ideally want the Modal to be a PT Block Modal */}
        {/* MODAL HERE */}
        <Modal isOpen = {this.state.pt1_modal} style = {customStyles} onRequestClose={this.closemodal} scrollable={true}>
          <button className="close" type="button" onClick = {this.closemodal} data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i className="fas fa-times" /></span></button>
          <div className = "modalnametitle">
              <h2 className="portfolio-modal-title text-secondary mb-0">{this.state.trainer.first_name} {this.state.trainer.last_name}</h2>
          </div>
          <div className="divider-custom">
          <div className="divider-custom-line" />
          <div className="divider-custom-icon"><i className="fas fa-star" /></div>
          <div className="divider-custom-line" />
          </div>
          <div className = "ptmodaldiv">
              <div className = "modalprofilepicdiv">
                  <img className = "modalprofilepic" alt="Trainer Profile" src = {`assets/img/trainer_images/${this.state.trainer.profile_image}`}></img>
                  <div className = "modalaboutmediv">
                      <span className = "aboutmetext">About Me</span>

                      <div className = "locationdiv">
                          <img className = "locationicon" alt="location icon" src = "assets/img/locationicon.png"></img>
                          <span className = "ptblocklocation">{this.state.trainer.location_preference}</span>
                          <img className = "emailicon" alt="email icon" src = "assets/img/emailicon.png"></img>
                          <span className = "ptresultemail">{this.state.trainer.email}</span>
                          <img className = "emailicon" alt="phone icon" src = "assets/img/phoneicon.png"></img>
                          <span className = "ptresultphone">{this.state.trainer.mobile_number}</span>
                      </div>

                      <hr></hr>

                      <div className = "aboutmecontent">
                          <p>{this.state.trainer.biography}</p>
                      </div>
                  </div>
              </div>
              <div className = "modalcontentsdiv">
                  <div className = "modalgeneralinfo">
                      <div className="inforsection">
                      <span className = "aboutmetext">Muscle Expertise</span>

                      <MultiSelect
                          id="multiselect-component-9"
                          placeholder="Not Specified"
                          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                          value={this.state.trainer.muscle_group}
                          variant="chip"
                          chipVariant = "brand"
                          labelAlignment = 'center'
                          readOnly
                          isBare
                      />
                      </div>
                  </div>
                  <div className = "modalgeneralinfo">
                      <div className="inforsection">
                      <span className = "aboutmetext" >Languages Spoken</span>
                      <MultiSelect
                          id="multiselect-component-9"
                          placeholder="Not Specified"
                          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                          value={this.state.trainer.languages_spoken}
                          variant="chip"
                          chipVariant = "brand"
                          labelAlignment = 'center'
                          readOnly
                          isBare
                      />
                      </div>
                  </div>

              </div>
          </div>
          <hr className = "modalhr"></hr>
          <div className = "ptblockmodalbooknowdiv">
          <Link to = "/client_booking" >
              <button className = "booknowbutton">Book Now</button>
          </Link >
          </div>
        </Modal>
        <section className="skew-section page-section bg-primary text-white mb-0" id="about">
          <div className="no-skew container">
          {/* About Section Heading*/}
          <div className="text-center mt-0">
            <h2 id="about-heading" className="skewed-heading page-section-heading d-inline-block text-white">ABOUT</h2>
          </div>
            {/* About Section Content*/}
            <div className="row pb-4 pt-2">
              <div className="col-lg-4 ml-auto">
                <p className="pre-wrap lead text-white">We are a group of motivated registered personal fitness trainers dedicated to having a positive impact on the health and wellbeing of our clients. To get started sign up and book a personal trainer. Feel free to explore the wide range of trainers before booking. </p>
              </div>
              <div className="col-lg-4 mr-auto">
                <p className="pre-wrap lead text-white">If you are a motivated personal trainer ready to expand your customer base, register as a personal trainer to become part of our personal trainer family. We provide a wide range of tools to empower you to get the best experience with your clients.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-section" id="contact">
          <div className="container">
            {/* Contact Section Heading*/}
            <div className="text-center mb-5">
              <h2 id = "contact-heading" className="skewed-heading page-section-heading text-secondary d-inline-block mb-0">CONTACT</h2>
            </div>
            {/* Contact Section Content*/}
            <div className="row justify-content-center">
              <div className="col-lg-4 mt-6">
                <div className="d-flex flex-column align-items-center">
                  <div className="icon-contact mb-3"><i className="fas fa-mobile-alt" /></div>
                  <div className="text-muted">Phone</div>
                  <div className="lead font-weight-bold">(+61) 8455-1236</div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="d-flex flex-column align-items-center">
                  <div className="icon-contact mb-3"><i className="far fa-envelope" /></div>
                  <div className="text-muted">Email</div><a className="lead font-weight-bold" href="mailto:name@example.com">pt_club@example.com</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    <Footer />
    </div>
)
    }
}

const customStyles = {
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
export default Home;
