// This the update availability page for personal trainers.
// Last updated: 8/09/2020
// TO FIND THE STUFF YOU NEED IN BACKEND: search 'backend' :)
import React, { Component } from 'react';
import Footer from '../Components/footer';
import Header from '../Components/header';
import { Application, Card, MonthlyCalendar, Drawer, Badge } from 'react-rainbow-components';
import styled from 'styled-components';

// import {get_pt_profile_client_booking} from "../Components/UserFunctions";

// CSS
import './stylesheets/date-time-picker.css';
import './stylesheets/login-signup.css';
import './stylesheets/gen-utility.css';

const StyledIconContainer = styled.div`
    margin-right: 10px;
    font-size: 18px;
`;

const StyledContainer = styled.div
`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: start;
    justify-content: flex-end;
    padding: 4px;
`;

const StyledAssignedLabel = styled.div
`
    text-transform: uppercase;
    font-size: 12px;
    cursor: pointer;
    padding-left: 2px;
    color: #999999;
`;

const StyledAvailableLabel = styled.div.attrs(props => {
})
`
    text-transform: uppercase;
    cursor: pointer;
    font-size: 12px;
    border-radius: 1rem;
    margin: 4px 0 2px;
    padding: 2px 10px 3px 9px;
    color: #FFF
    ${props => props.count <= 1 &&
        `
            background: red;
        `}
    ${props => props.count > 1 && props.count <= 3 &&
        `
            background: #FC0;
        `}
    ${props => props.count > 3 &&
        `
            background: #1DE9B6;
        `}
`;

const StyledTitle = styled.h1
`
    margin: 0 1.25rem;
    padding: 1.375rem 1rem 1.325rem;
    display: block;
    box-sizing: border-box;
    font-family: "SB Heading", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: bold;
    line-height: 1.2;
    font-size: 2rem;
    color: #30a49c;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
`;

const StyledStatisticsContainer = styled.div
`
    color: #999999;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding-left: 0.5em;
    font-family: "SB Heading", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: 700;
    justify-content: space-between;
`;

const StyledInformationContainer = styled.div
`
    color: #999999;
    margin-Bottom: 8px;
    border-radius: 12px;
    border: solid 2px #f0f0f7;
    padding-bottom: 12px;
`;

const StyledHeaderContainer = styled.div
`
    display: flex;
    align-items: center;
    font-size: 16px;
    margin: 8px 0 0 9px;
`;

const StyledHourContainer = styled.div
`
    color: #999999;
    font-size: 14px;
    margin-left: 11px;
`;

const StyledContentContainer = styled.div
`
    color: #999999;
    display: flex;
    align-items: right;
    margin: auto;
    padding-top: 5px;
    padding-left: 60px;
    font-size: 14px;
`;

const StyledStatusText = styled.div
`
    font-size: 16px;
    font-weight: bold;
    font-family: "SB Body", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    text-align: right;
    color: #999999;
`;

function DailyTasks(props) {
    const {
        availableTasksCount, assignedTasksCount
    } = props;

    if (!availableTasksCount && !assignedTasksCount) return null;

    return (
        <StyledContainer>
            {assignedTasksCount > 0 &&
                <StyledAssignedLabel>
                    {`${assignedTasksCount} Booked`}
                </StyledAssignedLabel>
            }
            {availableTasksCount > 0 &&
                <StyledAvailableLabel count={availableTasksCount}>
                    {`${availableTasksCount} ${availableTasksCount === 1 ? 'SESSION LEFT' : 'SESSIONS LEFT'}`}
                </StyledAvailableLabel>
            }
        </StyledContainer>
    );
}

function areDatesEqual(date1, date2) {
    const first = new Date(date1);
    const second = new Date(date2);

    return first.getYear() === second.getYear()
        && first.getMonth() === second.getMonth()
        && first.getDate() === second.getDate();
}

function getAvailableTasksCountForDate(date, tasks) {
    return tasks.filter(task => areDatesEqual(date, task.date) && !task.isBooked).length;
}

function getAssignedTasksCountForDate(date, tasks) {
    return tasks.filter(task => areDatesEqual(date, task.date) && task.isBooked).length;
}

function getFormattedDate(selectedDate) {
    const option = { month: 'long', day: 'numeric' }
    return selectedDate ? new Intl.DateTimeFormat( 'en-US', option).format(selectedDate) : null
}

function printBookingStatus(time, bookingStatus, onClick) {
    let props = {
        currentSession: time,
        bookingStatus: bookingStatus,
    }
    if (bookingStatus === "Cancelled") {
        return (
            <StyledContentContainer>
                <StyledIconContainer>
                    <i style = {{color: '#FE4849'}} className="zmdi zmdi-close-circle"></i>
                </StyledIconContainer>
                    <StyledStatusText>Cancelled</StyledStatusText>
            </StyledContentContainer>
        );
    }
    if (bookingStatus === "Pending") {
        return (
            <StyledContentContainer style = {{cursor: 'pointer'}} onClick={()=>onClick(props)}>
                <StyledIconContainer>
                    <i style = {{color: "#FC0"}} className="zmdi zmdi-minus-circle"></i>
                </StyledIconContainer>
                <StyledStatusText>Pending</StyledStatusText>
            </StyledContentContainer>
        );
    }
    if (bookingStatus === "Confirmed") {
        return (
            <StyledContentContainer style = {{cursor: 'pointer'}} onClick={()=>onClick(props)}>
                <StyledIconContainer>
                    <i style = {{color: '#1DE9B6'}} className="zmdi zmdi-check-circle"></i>
                </StyledIconContainer>
                <StyledStatusText>Confirmed</StyledStatusText>
            </StyledContentContainer>
        );
    }
    else { // else, the time is still available!
        return (
            <StyledContentContainer style = {{cursor: 'pointer'}} onClick={()=>onClick(props)}>
                <StyledStatusText>Book now</StyledStatusText>
            </StyledContentContainer>
        );
    }
}

const TasksBasicInformation = ({ count, name, title }) => count ? (
    <StyledStatisticsContainer>
        {name}
        <Badge className="rainbow-m-around_medium" label={count} title={title} />
    </StyledStatisticsContainer> ) : null;

const TaskInformation = ({time, description, bookingStatus, onClick}) => {
    let status = printBookingStatus(time, bookingStatus, onClick);

    return (
        <StyledInformationContainer>
            <StyledHeaderContainer>
                <StyledHourContainer>{time}</StyledHourContainer>
            </StyledHeaderContainer>
            <StyledContentContainer>
                {description}
            </StyledContentContainer>
                {status}
        </StyledInformationContainer>
    );
}

const DrawerTasks = ( props ) => {
    const { date, tasks } = props;
    const bookedHours = tasks.filter(task => areDatesEqual(date, task.date) && task.isBooked);
    const availableHours = tasks.filter(task => areDatesEqual(date, task.date) && !task.isBooked);

    return (
        <div>
            <TasksBasicInformation
                key = {1}
                count={bookedHours.length}
                name="BOOKED"
                title="BookedHours"
            />
            {bookedHours.map(task => (
                <TaskInformation key = {task.id} onClick = {props.onClick} {...task} />
            ))}
            <TasksBasicInformation
                key = {2}
                count={availableHours.length}
                name="AVAILABLE"
                title="AvailableHours"
            />
            {availableHours.map(task => (
                <TaskInformation key = {task.id} onClick = {props.onClick} {...task} />
            ))}
        </div>
    );
}

class ClientBooking extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentMonth: new Date(), // to change month
            selectedDate: undefined,
            isOpen: false,
            confirmBookingDisplay: false,
            confirmCancelDisplay: false,

            // Trainer details
            trainerName: '',
            location: '', //gym
            hourly_rate: '$66', // pt charge
            availabilityList : [],
        }
        this.today = new Date();
        this.trainer_id = localStorage.getItem("trainer_booking_id");
        this.client_id = localStorage.getItem('client_id');
        this.address_id = localStorage.getItem('address_id');
        this.onSessionSelect = this.onSessionSelect.bind(this);
        this.selectedSession = '';
        this.selectedTrainer = ''; // This is for each session
        this.selectedAddress = ''; // Specific to each session
        this.selectedDate = '';
    }

    // function to get the trainer availability
    getTrainerAvailability = () => {
        fetch("http://localhost:4000/get_pt_availability", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: this.trainer_id,            // change to session
            })
        })
        .then(response => response.json())
        .then(data => {
            var copyList = this.state.availabilityList;
            for (var i = 0; i < data.length; i++) {
                // assuming that the date and time are saved in the following format
                // yyyy-mm-dd 00:00:00
                let split_start_dt = data[i].start_date_time.split(" ");
                let current_date = split_start_dt[0];
                let current_time = split_start_dt[1];

                let findingSession = copyList.find(dt => (dt.date === current_date && dt.time === current_time));
                let notBooked = (findingSession === undefined);
                var pt_name = data[i].first_name + " " + data[i].last_name;
                var address = data[i].street + ", " + data[i].city + ", " + data[i].state + ", " + data[i].post_code;

                if(data[i].street == '')
                {
                    address = '';
                }

                if (notBooked === true) {
                    copyList.push(
                        { trainer_id: this.trainer_id, date: current_date, time: current_time, duration: '1 hour', description: '', trainer_name: pt_name, address: address, hourly_rate: data[i].hourly_rate, bookingStatus: 'Available', isBooked: false },
                    );
                }
            }
            this.setState({ availabilityList: copyList });
            console.table(this.state.availabilityList);
        });
    }

    getClientsBookings() {
        fetch("http://localhost:4000/get_client_bookings", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: this.client_id,
            })
        })
        .then(response => response.json())
        .then(data => {
            var copyList = this.state.availabilityList;
            for (var i = 0; i < data.length; i++)
            {
                // date is formatted in yyyy-mm-dd 00:00:00
                let split_date_time = data[i].start_date_time.split(" ");
                let status = data[i].booking_status;
                let bookedCheck = (status === "Pending" || status === "Confirmed" || status === "Cancelled");
                let session_description = "Session with PT " + data[i].first_name + " " + data[i].last_name;
                var trainer_name = data[i].first_name + " " + data[i].last_name;
                var address = data[i].street + ", " + data[i].city + ", " + data[i].state + ", " + data[i].post_code;

                    if(data[i].street == '')
                    {
                        address = '';
                    }

                copyList.push(
                    { trainer_id: data[i].trainer_id, date: split_date_time[0], time: split_date_time[1], duration: '1 hour', address: address, trainer_name: trainer_name, description: session_description, bookingStatus: status, isBooked: bookedCheck }
                );
            }
            this.setState({ availabilityList: copyList });
            console.table(copyList);
        });
    }

    getTrainerProfile = () => {
        fetch("http://localhost:4000/get_pt_profile", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: this.trainer_id,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.location_preference);
            this.setState({trainerName: data.first_name + ' ' + data.last_name,
                            hourly_rate: data.hourly_rate,
                            });
        })
    }

    componentDidMount = () => {
        if (localStorage.getItem('client_id') === null){
            this.props.history.push('/client_login')
        } else {
            this.getTrainerProfile();
            this.getClientsBookings();
            this.getTrainerAvailability(); // load this second always, so the booked ones come out first and block the repeated sessions
        }
    }

    //---------------------- FORMATTING FUNCTIONS --------------------------
    formatDate = (date) => { // formats given dates
        let cur_date = new Date();
        cur_date = new Intl.DateTimeFormat().format(date).toString();
        var day = cur_date.substring(0,2);
        var month = cur_date.substring(3,5)
        var year = cur_date.substring(cur_date.length - 4);
        var formatted_date = year + "-" + month + "-" + day;
        return formatted_date;
    }

    // --------------- BOOKING FUNCTIONS ---------------------------------
    onSessionSelect = (props) => {
        this.selectedSession = ''; // clearing
        this.selectedSession = props.currentSession;
        var status = props.bookingStatus;
        var toCancelCheck = (status === "Confirmed" || status === "Pending");
        // console.log("The selected session is: " + this.selectedSession + "  on the " + this.state.selectedDate);
        if (this.selectedSession && toCancelCheck === false) {
            this.setState({ confirmBookingDisplay: true }, () => {
                // console.log("Going to confirm booking screen: " + this.state.confirmBookingDisplay);
            });
        } else if (this.selectedSession && toCancelCheck) {
            this.setState({ confirmCancelDisplay: true }, () => {
                // console.log("Going to confirm cancellation screen: " + this.state.confirmCancelDisplay);
            });
        }
    }

    // -------------------------- BACKEND REQUEST STUFF -----------------------------
    // This function handles when user selects an available time & confirms booking
    // SEND TO BACKEND STUFF :D
    handleBooking = () => {
        // KEY INFO TO SEND
        var selTime = this.selectedSession;
        var selDate = this.formatDate(this.state.selectedDate);
        // var description = "Session with " + this.state.trainerName;
        var selected_start_date_time = selDate + " " + selTime;
        var selected_end_date_time = "";


        // making sure the end time is right - if it is 11pm, the date must change to the next day midnight as the end itme
        if (selTime.substring(0,2) === 23) {
            var next_date = new Date(selDate);
            next_date.setDate(next_date.getDate()+1);
            selected_end_date_time = this.formatDate(next_date) + " 00:00:00"
        } else {
            var end_time = parseInt(selTime.substring(0,2)) + 1;
            if (end_time <= 9) {
                end_time = "0" + end_time.toString() + ":00:00"
            } else {
                end_time = end_time.toString() + ":00:00"
            }
            selected_end_date_time = selDate + " " + end_time
        }

        // Update PT's availability
        fetch("http://localhost:4000/make_client_booking", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: this.trainer_id,                    // change to session
                client_id: this.client_id,
                start_date_time: selected_start_date_time,
                end_date_time: selected_end_date_time,
                address_id: this.address_id,
            })
        })
        .then(response => {
            this.setState({availabilityList: []});
            this.getClientsBookings();
            this.getTrainerAvailability(); // always put this second please ^_^
            // var updatedAvailabilityList = this.state.availabilityList;
            this.setState({ availabilityList: this.state.availabilityList, isOpen: false });
        })
    }

    // This function handles when user selects a booked time & confirms cancelling
    handleCancelling = () => {
        // KEY INFO TO SEND
        var cancel_time = this.selectedSession;
        var cancel_date = this.formatDate(this.state.selectedDate);
        var cancelled_start_date_time = cancel_date + " " + cancel_time;
        var cancelled_end_date_time = "";

        // making sure the end time is right - if it is 11pm, the date must change to the next day midnight as the end itme
        if (cancel_time.substring(0,2) === 23) {
            var next_date = new Date(cancel_date);
            next_date.setDate(next_date.getDate()+1);
            cancelled_end_date_time = this.formatDate(next_date) + " 00:00:00"
        } else {
            var end_time = parseInt(cancel_time.substring(0,2)) + 1;
            if (end_time <= 9) {
                end_time = "0" + end_time.toString() + ":00:00"
            } else {
                end_time = end_time.toString() + ":00:00"
            }
            cancelled_end_date_time = cancel_date + " " + end_time
        }

        // getting the correct trainer id (client may cancel sessions booked w other pts)
        var selectedSessionToCancel = this.state.availabilityList.find(dt => (dt.date === cancel_date && dt.time === cancel_time));
        var trainerOfCancelSession = selectedSessionToCancel.trainer_id;

        // console.log(cancelled_end_date_time)
        fetch("http://localhost:4000/cancel_booking", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                booking_status: "Cancelled by client",
                trainer_id: trainerOfCancelSession,                    // change to session
                client_id: this.client_id,                                // change to session
                start_date_time: cancelled_start_date_time,
                end_date_time: cancelled_end_date_time,
            })
        })
        .then(response => {
            this.setState({ confirmCancelDisplay: false, confirmBookingDisplay: false })
            this.state.availabilityList = [];
            this.getClientsBookings();
            this.getTrainerAvailability(); // always put this second please ^_^
            this.setState({ availabilityList: this.state.availabilityList, isOpen: false });
        });
    }

    renderCorrectPage = () => { // function that chooses which to render
        if (this.state.confirmCancelDisplay) {
            let findingSession = this.state.availabilityList.find(dt => (dt.date === this.formatDate(this.state.selectedDate) && dt.time === this.selectedSession));
            let notFound = (findingSession === undefined);
            var location = "Unknown";
            var trainer_name = "Unknown";
            if (notFound === false) {
                location = findingSession.address;
                trainer_name = findingSession.trainer_name;
            }
            return(
                <div className = "p-l-15 chachaFromRight">
                    <h1 className = "modal-heading" style = {{fontSize: '1.5em'}}> Want to cancel your booking? </h1>
                    <p><b>Personal Trainer: </b>{trainer_name}</p>
                    <p><b>Time: </b>{this.selectedSession}</p>
                    <p><b>Location: </b>{location}</p>

                    <div className = "p-t-10">
                        <p className = "fine-print">By cancelling your booking below, you accept that you will not be allowed to re-book this session.</p>
                    </div>
                    <div style = {{ marginTop: '1em', marginBottom: '2em'}} className="container-login100-form-btn">
                       <div className="wrap-login100-form-btn">
                          <div className="login100-form-bgbtn"></div>
                              <button className="login100-form-btn" onClick = {this.handleCancelling}>
                                CANCEL NOW
                              </button>
                          </div>
                       </div>
                       <span>
                           <i className = "fas fa-arrow-left fine-print"></i><span> </span>
                           <button className="fine-print" style= {{fontStyle: "normal"}} onClick = {() => this.setState({confirmCancelDisplay: false, confirmBookingDisplay: false})}>  Go back</button>
                       </span>
                   </div>);
        }
        if (this.state.confirmBookingDisplay) {
            let findingSession = this.state.availabilityList.find(dt => (dt.date === this.formatDate(this.state.selectedDate) && dt.time === this.selectedSession));
            let notFound = (findingSession === undefined);
            var location = "Unknown";
            var trainer_name = "Unknown";
            var hourly_rate = "Unknown";
            if (notFound === false) {
                location = findingSession.address;
                trainer_name = findingSession.trainer_name;
                hourly_rate = findingSession.hourly_rate;
            }
            return(
                <div className = "p-l-15 chachaFromRight">
                    <h1 className = "modal-heading" style = {{fontSize: '1.5em'}}> Confirm your booking </h1>
                    <p><b>Personal Trainer: </b>{trainer_name}</p>
                    <p><b>Time: </b>{this.selectedSession}</p>
                    <p><b>Location: </b>{location}</p>
                    <p><b>Hourly rate: </b>{hourly_rate}</p>

                    <div className = "p-t-10 p-b-5">
                        <p className = "fine-print">By confirming your booking below, you accept the <a href="/">Terms & Conditions</a> of booking through PT Club.</p>
                    </div>
                    <div style = {{ marginTop: '1em', marginBottom: '2em'}} className="container-login100-form-btn">
                       <div className="wrap-login100-form-btn">
                          <div className="login100-form-bgbtn"></div>
                              <button className="login100-form-btn" onClick = {this.handleBooking}>
                                CONFIRM NOW
                              </button>
                          </div>
                       </div>
                       <span>
                           <i className = "fas fa-arrow-left fine-print"></i><span> </span>
                           <button className="fine-print" style= {{fontStyle: "normal"}} onClick = {() => this.setState({confirmCancelDisplay: false, confirmBookingDisplay: false})}>  Go back</button>
                       </span>
                </div>);
        }
        // OTHERWISE RETURN NORMAL DRAWER TASKS
        return(
            <DrawerTasks
                date={this.state.selectedDate}
                tasks={this.state.availabilityList}
                onClick={this.onSessionSelect}
            />
        );
    }

    render() {
        return (
            <div>
                <Header />
                <div style = {{marginTop: '4em'}}> </div>
                <div style = {{padding: '3em'}}>
                    <div className = "main-heading p-t-50">
                        <h1> Book your next session with {this.state.trainerName} now! </h1>
                    </div>
                    <p className = "fine-print p-l-20 p-t-20">Click on any date below to make a booking or check your existing bookings.</p>
                </div>
                <div>
                    <Card className="card-limiter" onLoad = {this.handleRender}>
                        <MonthlyCalendar
                            className = "monthly-calendar modal-general"
                            selectedDate={this.state.selectedDate}
                            currentMonth={this.state.currentMonth}
                            onSelectDate={({ date }) => this.setState({ selectedDate: date, isOpen: true, confirmBookingDisplay: false, confirmCancelDisplay: false})}
                            onMonthChange={({ month }) => this.setState({ currentMonth: month})}
                            minDate={this.today}
                            dateComponent={date => (
                                <DailyTasks
                                    availableTasksCount={getAvailableTasksCountForDate(date, this.state.availabilityList)}
                                    assignedTasksCount={getAssignedTasksCountForDate(date, this.state.availabilityList)}
                                />
                            )}
                        />
                    </Card>
                    <div>
                        <Drawer
                            className="drawer-limiter"
                            slideFrom="right"
                            header={<StyledTitle>{getFormattedDate(this.state.selectedDate)}</StyledTitle>}
                            isOpen={this.state.isOpen}
                            onRequestClose={() => this.setState({ isOpen : false, timetableIsOpen: false, confirmBookingDisplay: false, confirmCancelDisplay: false})}
                        >
                            {this.renderCorrectPage()}
                        </Drawer>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default ClientBooking;
