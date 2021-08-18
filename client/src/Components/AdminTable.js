import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import DataRow from './AdminResult';
import {
    Row, Col,
    Button,
    Card,
    TabContent,
    TabPane,
} from 'reactstrap';

class DataTables extends Component {
    constructor() {
        super();
        this.state = {
            allPTs: [],
            activePT:[],
            susPT:[],
            waitPT:[],
            rejectPT:[],

            allClients: [],
            activeClients: [],
            susClients: [],

            dropdownOpen: false,
            activeTab1: 'trainers',
            displayPTTable: 'block',
            displayClientTable: 'none',
            selectedButton: '',
            activePTStatusTab: 1,
            activeClientStatusTab: 1,
        };
        this.toggle1 = this.toggle1.bind(this);
    }
    componentDidMount = () => {
        this.change_query("trainers", "All");
        this.change_query("trainers", "Active");
        this.change_query("trainers", "Suspended");
        this.change_query("trainers", "Awaiting Approval");
        this.change_query("trainers", "Rejected");
        this.change_query("clients", "All");
        this.change_query("clients", "Active");
        this.change_query("clients", "Suspended");
    }
    toggle1(tab) {
        if (this.state.activeTab1 === 'trainers') {
            this.setState({
                activeTab1: tab,
                displayPTTable: 'none',
                displayClientTable: 'block',
            });
        } else if (this.state.activeTab1 === "clients") {
            this.setState({
                activeTab1: tab,
                displayPTTable: 'block',
                displayClientTable: 'none',
            });
        }
    }

    handleSubmit = (event) => { // BACKEND STUFF HERE
        window.location.replace("http://localhost:3000/admin_results");
    }
    change_query = (account_type, account_status) => {
        console.log(account_type + " " +account_status)

        fetch("http://localhost:4000/admin_search", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account_type: account_type,
                account_status: account_status
            })
        })
        .then (response => response.json())
        .then (data => {
            if (account_type === "clients") {
                data.forEach(function (user) {
                    user.button_visible = "none";
                })
            } else {
                data.forEach(function (user) {
                    user.button_visible = "inline-block";
                })
            }

            if (account_type === "clients" && account_status === "All") {
                this.setState({ allClients: data });
            }
            if (account_type === "clients" && account_status === "Active") {
                this.setState({ activeClients: data });
            }
            if (account_type === "clients" && account_status === "Suspended") {
                this.setState({ susClients: data });
            }

            if (account_type === "trainers" && account_status === "All") {
                this.setState({ allPTs: data });
            }
            if (account_type === "trainers" && account_status === "Active") {
                this.setState({ activePT: data });
            }
            if (account_type === "trainers" && account_status === "Suspended") {
                this.setState({ susPT: data });
            }
            if (account_type === "trainers" && account_status === "Awaiting Approval") {
                this.setState({ waitPT: data });
            }
            if (account_type === "trainers" && account_status === "Rejected") {
                this.setState({ rejectPT: data });
            }

        })
        .catch(err => console.log(err))
    }

    render() {
        return (
                <ReactCSSTransitionGroup>
                    <div>
                        <Row style = {{marginLeft: '0.3em', width: '99.5%'}}>
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <div className="card-header">.
                                        <div className="btn-actions-pane-right">
                                            <div role="group" className="btn-group-sm btn-group">
                                            <Button outline
                                                className={"border-0 btn-pill btn-wide btn-transition " + classnames({active: this.state.activeTab1 === 'trainers'})}
                                                color="primary"
                                                style = {{marginRight: '1em', borderRadius: '5px'}}
                                                onClick={() => {this.toggle1('trainers');}}
                                                >Personal Trainers
                                            </Button>
                                            <Button outline
                                                className={"border-0 btn-pill btn-wide btn-transition " + classnames({active: this.state.activeTab1 === 'clients'})}
                                                color="primary"
                                                style = {{marginRight: '1em', borderRadius: '5px'}}
                                                onClick={() => { this.toggle1('clients');}}
                                                >Clients
                                            </Button>
                                                <div style = {{backgroundColor: '#999999', width: '1px', marginRight: '2em'}}></div>
                                                <TabContent activeTab={this.state.activeTab1}>
                                                <TabPane tabId="trainers">
                                                {/* <div className={`status_badge ${this.state.user.account_status}_class`}>{this.state.user.account_status}</div> */}

                                                <button className= {`btn btn-info ${ (this.state.selectedButton === 'All') ? 'active-btn' : ''}`} style = {{marginRight: '1em'}} onClick={() => this.setState({ activePTStatusTab: 1})}>All</button>
                                                <button className= {`btn btn-info ${ (this.state.selectedButton === 'Active') ? 'active-btn' : ''}`} style = {{marginRight: '1em'}} onClick={() => this.setState({ activePTStatusTab: 2})}>Active</button>
                                                <button className= {`btn btn-info ${ (this.state.selectedButton === 'Suspended') ? 'active-btn' : ''}`} style = {{marginRight: '1em'}} onClick={() => this.setState({ activePTStatusTab: 3})}>Suspended</button>
                                                <button className= {`btn btn-info ${ (this.state.selectedButton === 'Awaiting Approval') ? 'active-btn' : ''}`} style = {{marginRight: '1em'}} onClick={() => this.setState({ activePTStatusTab: 4})}>Awaiting Approval</button>
                                                <button className= {`btn btn-info ${ (this.state.selectedButton === 'Rejected') ? 'active-btn' : ''}`} style = {{marginRight: '1em'}} onClick={() => this.setState({ activePTStatusTab: 5})}>Rejected</button>
                                                </TabPane>
                                                <TabPane tabId="clients">
                                                <button className="btn btn-info" style = {{marginRight: '1em'}} onClick={() => this.setState({ activeClientStatusTab: 1})}>All</button>
                                                <button className="btn btn-info" style = {{marginRight: '1em'}} onClick={() => this.setState({ activeClientStatusTab: 2})}>Active</button>
                                                <button className="btn btn-info" style = {{marginRight: '1em'}} onClick={() => this.setState({ activeClientStatusTab: 3})}>Suspended</button>
                                                </TabPane>
                                                </TabContent>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive" style = {{display: this.state.displayPTTable}}>
                                        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th className="text-center">ID</th>
                                                <th>Name</th>
                                                <th className="text-center">Profile</th>
                                                <th className="text-center">Account Status</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                            </thead>
                                            {this.state.activePTStatusTab === 1 ?
                                                <tbody>
                                                    {this.state.allPTs.map(pt1 => <DataRow user={pt1} {...pt1}/>)}
                                                </tbody>
                                            : ''
                                            }
                                            {this.state.activePTStatusTab === 2 ?
                                                <tbody>
                                                    {this.state.activePT.map(pt2 => <DataRow user={pt2} {...pt2}/>)}
                                                </tbody>
                                            : ''
                                            }
                                            {this.state.activePTStatusTab === 3 ?
                                                <tbody>
                                                    {this.state.susPT.map(pt3 => <DataRow user={pt3} {...pt3}/>)}
                                                </tbody>
                                            : ''
                                            }
                                            {this.state.activePTStatusTab === 4 ?
                                                <tbody>
                                                    {this.state.waitPT.map(pt4 => <DataRow user={pt4} {...pt4}/>)}
                                                </tbody>
                                            : ''
                                            }
                                            {this.state.activePTStatusTab === 5 ?
                                                <tbody>
                                                    {this.state.rejectPT.map(pt5 => <DataRow user={pt5} {...pt5}/>)}
                                                </tbody>
                                            : ''
                                            }
                                        </table>
                                    </div>
                                    <div className="table-responsive" style = {{display: this.state.displayClientTable}}>
                                        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th className="text-center">ID</th>
                                                <th>Name</th>
                                                <th className="text-center">Profile</th>
                                                <th className="text-center">Account Status</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                            </thead>
                                                {/**client code */}
                                                {this.state.activeClientStatusTab === 1 ?
                                                    <tbody>
                                                        {this.state.allClients.map(c1 => <DataRow user={c1} {...c1}/>)}
                                                    </tbody>
                                                : ''
                                                }
                                                {this.state.activeClientStatusTab === 2 ?
                                                    <tbody>
                                                        {this.state.activeClients.map(c2 => <DataRow user={c2} {...c2}/>)}
                                                    </tbody>
                                                : ''
                                                }
                                                {this.state.activeClientStatusTab === 3 ?
                                                    <tbody>
                                                        {this.state.susClients.map(c3 => <DataRow user={c3} {...c3}/>)}
                                                    </tbody>
                                                : ''
                                                }
                                                {/* <DataRow/> */}
                                        </table>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </ReactCSSTransitionGroup>
        )
    }
}
export default DataTables;
