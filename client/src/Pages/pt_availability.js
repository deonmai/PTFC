// This the update availability page for personal trainers.
// Last updated: 8/09/2020
// TO FIND THE STUFF YOU NEED IN BACKEND: search 'backend' :)
import React, { Component } from 'react';
import Footer from '../Components/footer';
import Header from '../Components/header';
import { Application, Card, MonthlyCalendar, Drawer, Badge } from 'react-rainbow-components';
import styled from 'styled-components';

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

const StyledBookedLabel = styled.div
`
    text-transform: uppercase;
    cursor: pointer;
    font-size: 12px;
    border-radius: 1rem;
    margin: 4px 0 2px;
    padding: 2px 10px 3px 9px;
    color: #FFF;
    background: var(--success);
`;

const StyledPendingLabel = styled.div
`
    text-transform: uppercase;
    cursor: pointer;
    font-size: 12px;
    border-radius: 1rem;
    margin: 4px 0 2px;
    padding: 2px 10px 3px 9px;
    color: #FFF;
    background: var(--warning);
`;

const StyledAvailableLabel = styled.div
`
    text-transform: uppercase;
    font-size: 12px;
    cursor: pointer;
    padding-left: 2px;
    color: #999999;
`;

const StyledTitle = styled.h1
`
    margin: 0 1.25rem;
    padding: 1.375rem 1rem 1.325rem;
    display: block;
    box-sizing: border-box;
    font-family: "SB Heading", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: 700;
    line-height: 1.2;
    font-size: 2rem;
    color: var(--primary);
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
`;

const StyledStatisticsContainer = styled.div
`
    display: flex;
    align-items: center;
    font-size: 16px;
    padding-left: 0.5em;
    font-family: "SB Heading", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: 700;
    color: #999999;
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

const StyledHeaderContainer = styled.div`
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
    align-items: center;
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
        availableTasksCount, assignedTasksCount, pendingTasksCount
    } = props;

    if (!availableTasksCount && !assignedTasksCount && !pendingTasksCount) return null;

    return (
        <StyledContainer>
            {availableTasksCount > 0 &&
                <StyledAvailableLabel>
                    {`${availableTasksCount} Available`}
                </StyledAvailableLabel>
            }
            {pendingTasksCount > 0 &&
                <StyledPendingLabel count={pendingTasksCount}>
                    {`${pendingTasksCount} Pending`}
                </StyledPendingLabel>
            }
            {assignedTasksCount > 0 &&
                <StyledBookedLabel>
                    {`${assignedTasksCount} Booked`}
                </StyledBookedLabel>
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
    return tasks.filter(task => areDatesEqual(date, task.date) && task.isBooked && (task.bookingStatus==="Confirmed")).length;
}

function getPendingTasksCountForDate(date, tasks) {
    return tasks.filter(task => areDatesEqual(date, task.date) && task.isBooked && (task.bookingStatus==="Pending")).length;
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
    if (bookingStatus === "Pending") {
        return (
            <StyledContentContainer style = {{cursor: 'pointer'}} onClick={()=>onClick(props)}>
                <StyledIconContainer>
                    <i style = {{color: "#FC0"}} class="zmdi zmdi-minus-circle"></i>
                </StyledIconContainer>
                <StyledStatusText>Confirm session</StyledStatusText>
            </StyledContentContainer>
        );
    }
    if (bookingStatus === "Confirmed") {
        return (
            <StyledContentContainer style = {{cursor: 'pointer'}} onClick={()=>onClick(props)}>
                <StyledIconContainer>
                    <i style = {{color: '#1DE9B6'}} className="zmdi zmdi-check-circle"></i>
                </StyledIconContainer>
                <StyledStatusText>Session confirmed</StyledStatusText>
            </StyledContentContainer>
        );
    }
    else { // if cancelled or otherwise available,
        return (
            <StyledContentContainer>
                <StyledStatusText>Available for booking</StyledStatusText>
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

const DrawerTasks = props => {
    const { date, tasks } = props;
    const bookedHours = tasks.filter(task => areDatesEqual(date, task.date) && task.isBooked && (task.bookingStatus === "Confirmed"));
    const availableHours = tasks.filter(task => areDatesEqual(date, task.date) && !task.isBooked);
    const pendingBookings = tasks.filter(task => areDatesEqual(date, task.date) && task.isBooked && (task.bookingStatus === "Pending"));

    return (
        <div>
            <TasksBasicInformation
                key = {3}
                count={pendingBookings.length}
                name="PENDING"
                title="Bookings Pending Confirmation"
            />
            {pendingBookings.map(task => (
                <TaskInformation key = {task.id} onClick = {props.onClick} {...task} />
            ))}
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

class PTAvailability extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentMonth: new Date(), // to change month
            selectedDate: undefined,
            isOpen: false,
            timetableIsOpen: false, // add more hours check
            confirmBookingDisplay: false,
            confirmCancelDisplay: false,

            // AVAILABLE TIMES (probably a more elegant way of doing this, but for now)
            clicked0: false,
            clicked1: false,
            clicked2: false,
            clicked3: false,
            clicked4: false,
            clicked5: false,
            clicked6: false,
            clicked7: false,
            clicked8: false,
            clicked9: false,
            clicked10: false,
            clicked11: false,
            clicked12: false,
            clicked13: false,
            clicked14: false,
            clicked15: false,
            clicked16: false,
            clicked17: false,
            clicked18: false,
            clicked19: false,
            clicked20: false,
            clicked21: false,
            clicked22: false,
            clicked23: false,

            availabilityList: [],
        }
        this.today = new Date();
        this.allSelectedTimes = []; // time array
        //this.trainer_id = 99;
        this.trainer_id = localStorage.getItem("trainer_id");
        this.newAvailablity = [];
    }

    // function to get previously recorded availabilities
    getTrainerAvailability = () => { // always call AFTER trainer bookings
        fetch("http://localhost:4000/get_pt_availability", {
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
            var copyList = this.state.availabilityList;
            for (var i = 0; i < data.length; i++) {
                // assuming that the date and time are saved in the following format
                // yyyy-mm-dd 00:00:00
                var split_date_time = data[i].start_date_time.split(" ");
                let current_date = split_date_time[0];
                let current_time = split_date_time[1];

                let findingSession = copyList.find(dt => (dt.date === current_date && dt.time === current_time));
                let notBooked = (findingSession === undefined);

                if (notBooked === true || findingSession.bookingStatus === "Cancelled") {
                    copyList.push(
                        { trainer_id: this.trainer_id, date: current_date, time: current_time, duration: '1 hour', description: '', bookingStatus: 'Available', isBooked: false },
                    );
                }
            }
            this.setState({ availabilityList: copyList });
        });
    }

    // get trainer bookings
    getTrainerBookings = () => {
        fetch("http://localhost:4000/get_pt_bookings", {
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
            var copyList = this.state.availabilityList;
            for (var i = 0; i < data.length; i++) {
                var split_start_date_time = data[i].start_date_time.split(" ");
                var client_name = data[i].first_name + " " + data[i].last_name;
                var address = data[i].street + ", " + data[i].city + ", " + data[i].state + ", " + data[i].post_code;
                if (data[i].street === '') {
                    address = '';
                }
                copyList.push(
                    { trainer_id: this.trainer_id, date: split_start_date_time[0], time: split_start_date_time[1], client_name: client_name, address: address, duration: '1 hour', description: '', bookingStatus: data[i].booking_status, isBooked: true }
                );
            }
            this.setState({ availabilityList: copyList });
            console.table(this.state.availabilityList);
        });
    }

    componentDidMount = () => {
        if (localStorage.getItem('trainer_id') === null){
            this.props.history.push('/pt_login')
        } else {
            // on load function to get the PTs availability and add it to the availabilty list
            this.getTrainerBookings();
            this.getTrainerAvailability();
        }
    }

    // ------------------- TIME ARRAY ----------------------------
    buildTimeArray = () => { // building the array of selected times. Called when modal closes
        this.allSelectedTimes = []; // clearing
        let currently_selected = [  this.state.clicked0,
                                    this.state.clicked1,
                                    this.state.clicked2,
                                    this.state.clicked3,
                                    this.state.clicked4,
                                    this.state.clicked5,
                                    this.state.clicked6,
                                    this.state.clicked7,
                                    this.state.clicked8,
                                    this.state.clicked9,
                                    this.state.clicked10,
                                    this.state.clicked11,
                                    this.state.clicked12,
                                    this.state.clicked13,
                                    this.state.clicked14,
                                    this.state.clicked15,
                                    this.state.clicked16,
                                    this.state.clicked17,
                                    this.state.clicked18,
                                    this.state.clicked19,
                                    this.state.clicked20,
                                    this.state.clicked21,
                                    this.state.clicked22,
                                    this.state.clicked23,
                                 ]
        let time_to_add = '';
        for (var i = 0; i < 24; i++) { // populating array
            if (currently_selected[i] === true) {
                if (i < 10) { // need to add an extra 0 for formatting
                    time_to_add = "0" + i + ":00";
                    this.allSelectedTimes.push(time_to_add);
                } else {
                    time_to_add = i + ":00";
                    this.allSelectedTimes.push(time_to_add);
                }
            }
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

    // converting the given date and time into the datetime format for SQL table
    // TAKES IN STRING DATE & 24H TIME
    convertDateTime = (date, time) => {
        const len = date.length;
        var year    = date.substring(len - 4, len); // Format is: dd/mm/yyyy
        var month   = date.substring(len - 7, len - 5);
        var day     = date.substring(0 , 2);

        // converting to format: yyyy-mm-dd 00:00:00 for table entry
        var formattedDateTime = year + "-" + month + "-" + day + " " + time + ":00";
        return formattedDateTime;
    }

    formatTime = (time) => {
        var hour = time.substring(0 , 2);
        var formattedTime = "";
        if (hour > 12) {
            hour = hour - 12;
            formattedTime = hour + ":00 PM"
        } else {
            formattedTime = hour + ":00 AM"
        }
        return formattedTime;
    }

    // ----------------- FULL AVAILABILITY ARRAY (date & time) --------------------
    // This builds the full availability array in the format (Date startTime, Date endTime)
    buildAvailabilityArray = () => {
        let dateCopy = new Date(this.state.selectedDate); // making a copy that is adjustable jic
        this.buildTimeArray(); // building selected times
        var numberOfTimeIntervals = this.allSelectedTimes.length; // getting the number of times
        this.newAvailability = []; // clearing array

        for (var time_index = 0; time_index < numberOfTimeIntervals; time_index++) {
            let currentFormattedDate = new Intl.DateTimeFormat().format(dateCopy); // changing date to readable format
            let currentStartTime = this.allSelectedTimes[time_index];
            var saveStart = this.convertDateTime(currentFormattedDate, currentStartTime);
            var saveEnd;

            let nextHour = parseInt(currentStartTime.substring(0,2)) + 1; // getting hour + 1
            let currentEndTime = nextHour + ":00";
            if (nextHour < 10) { // 01:00 > need that first 0
                currentEndTime = "0" + currentEndTime;
            }
            if (currentEndTime === "24:00") { // end of day, change to next day
                currentEndTime = "00:00";
                dateCopy.setDate(dateCopy.getDate()+1);
                currentFormattedDate =  new Intl.DateTimeFormat().format(dateCopy);

            }
            saveEnd = this.convertDateTime(currentFormattedDate, currentEndTime);
            this.newAvailability.push([saveStart, saveEnd]);
        }
    }

    // ---------------------- TIME TABLE STYLING ------------------------------
    // This fetches previous times for selected date ONLY
    fetchPreviousTimes = (date) => {
        var formattedDate = this.formatDate(date);
        fetch("http://localhost:4000/get_day_availability", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: this.trainer_id,
                start_date: formattedDate,
            })
        })
        .then(response => response.json())
        .then(data => {
            this.clearColour(); // clearing current colour
            for (var i = 0; i < data.length; i++) {
                // assuming that the date and time are saved in the following format
                // yyyy-mm-dd 00:00:00
                var date = data[i].toString();
                var new_hour = date.substring(16,24);
                this.toggleColour(new_hour); // set the colour
            }
        });
    }

    handleBooking = () => {
        var start_time = this.selectedSession;
        var start_date = this.formatDate(this.state.selectedDate);
        var selected_start_date_time = start_date + " " + start_time;

        fetch("http://localhost:4000/confirm_booking", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: this.trainer_id,
                start_date_time: selected_start_date_time,
            })
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                this.setState({availabilityList: []});
                this.getTrainerBookings();
                this.getTrainerAvailability(); // always put this second please ^_^
                this.setState({ isOpen: false, confirmBookingDisplay: false, confirmCancelDisplay: false });

            }
        });
    }

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

        fetch("http://localhost:4000/trainer_cancel_booking", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: this.trainer_id,
                start_date_time: cancelled_start_date_time,
                end_date_time: cancelled_end_date_time
            })
        })
        .then(response => {
            if (response.ok) {
                this.setState({ availabilityList : [], isOpen: false, confirmBookingDisplay: false, confirmCancelDisplay: false });
                this.getTrainerBookings();
                this.getTrainerAvailability();
            }
        });
    }

    // Clears current time list styling
    clearColour = (time) => {
        this.setState({ clicked0: false,
                        clicked1: false,
                        clicked2: false,
                        clicked3: false,
                        clicked4: false,
                        clicked5: false,
                        clicked6: false,
                        clicked7: false,
                        clicked8: false,
                        clicked9: false,
                        clicked10: false,
                        clicked11: false,
                        clicked12: false,
                        clicked13: false,
                        clicked14: false,
                        clicked15: false,
                        clicked16: false,
                        clicked17: false,
                        clicked18: false,
                        clicked19: false,
                        clicked20: false,
                        clicked21: false,
                        clicked22: false,
                        clicked23: false,
                    });
    }

    // (Replaces check colour & update colour) Along with newColour below, toggles the table colours WHEN CLICKED
    toggleColour = (time) => {
        switch(time) {
            default:
            case "00:00:00": this.setState({clicked0: !this.state.clicked0}); break;
            case "01:00:00": this.setState({clicked1: !this.state.clicked1}); break;
            case "02:00:00": this.setState({clicked2: !this.state.clicked2}); break;
            case "03:00:00": this.setState({clicked3: !this.state.clicked3}); break;
            case "04:00:00": this.setState({clicked4: !this.state.clicked4}); break;
            case "05:00:00": this.setState({clicked5: !this.state.clicked5}); break;
            case "06:00:00": this.setState({clicked6: !this.state.clicked6}); break;
            case "07:00:00": this.setState({clicked7: !this.state.clicked7}); break;
            case "08:00:00": this.setState({clicked8: !this.state.clicked8}); break;
            case "09:00:00": this.setState({clicked9: !this.state.clicked9}); break;
            case "10:00:00": this.setState({clicked10: !this.state.clicked10}); break;
            case "11:00:00": this.setState({clicked11: !this.state.clicked11}); break;
            case "12:00:00": this.setState({clicked12: !this.state.clicked12}); break;
            case "13:00:00": this.setState({clicked13: !this.state.clicked13}); break;
            case "14:00:00": this.setState({clicked14: !this.state.clicked14}); break;
            case "15:00:00": this.setState({clicked15: !this.state.clicked15}); break;
            case "16:00:00": this.setState({clicked16: !this.state.clicked16}); break;
            case "17:00:00": this.setState({clicked17: !this.state.clicked17}); break;
            case "18:00:00": this.setState({clicked18: !this.state.clicked18}); break;
            case "19:00:00": this.setState({clicked19: !this.state.clicked19}); break;
            case "20:00:00": this.setState({clicked20: !this.state.clicked20}); break;
            case "21:00:00": this.setState({clicked21: !this.state.clicked21}); break;
            case "22:00:00": this.setState({clicked22: !this.state.clicked22}); break;
            case "23:00:00": this.setState({clicked23: !this.state.clicked23}); break;
        }
    }

    newColour = (clickedIndex) => { // returns appropriate background colour depending on above function
        if (clickedIndex === true) {
            return "#1DE9B6"; // a noice green colour
        }
        return "";
    }

    // --------------- CANCEL PAGE FUNCTIONS ---------------------------------
    onSessionSelect = (props) => { // selects which page to render in the side drawer
        this.selectedSession = ''; // clearing
        this.selectedSession = props.currentSession;
        var status = props.bookingStatus;
        console.log("The selected session is: " + this.selectedSession + "  on the " + this.state.selectedDate);
        if (this.selectedSession && (status==="Pending")) {
            this.setState({ confirmBookingDisplay: true }, () => {
                console.log("Going to pending booking screen");
            });
        }
        if (this.selectedSession && (status==="Confirmed")) {
            this.setState({ confirmCancelDisplay: true }, () => {
                console.log("Going to cancel booking screen");
            });
        }
    }

    renderDrawerPage = () => { // returns the correct page
        if ( (this.state.confirmBookingDisplay && this.state.timetableIsOpen) || (this.state.confirmCancelDisplay && this.state.timetableIsOpen) ) {
            this.setState({timetableIsOpen: false}); // close timetable just in case it's open
        }
        if (this.state.confirmBookingDisplay) {
            let findingSession = this.state.availabilityList.find(dt => (dt.date === this.formatDate(this.state.selectedDate) && dt.time === this.selectedSession));
            let found = (findingSession !== undefined);
            var location = "Unknown";
            var clientName = "Unknown";
                if (found === true) {
                   location = findingSession.address;
                   clientName = findingSession.client_name;
                }
            return(
                <div className = "p-l-15 chachaFromRight">
                    <h1 className = "modal-heading" style = {{fontSize: '1.5em'}}> Confirm your session </h1>
                    <p><b>Client: </b>{clientName}</p>
                    <p><b>Time: </b>{this.selectedSession}</p>
                    <p><b>Location: </b>{location}</p>

                    <div className = "p-t-10">
                        <p className = "fine-print">By confirming to the session below, you are agreeing to attend and act as a personal trainer for this client. Non-attendance will incur a penalty fee and your account may be temporarily suspended. PT Club is not liable for any loss in income or time in the event of an unforeseen cancellation by the client party.</p>
                    </div>
                    <div style = {{margin: '3em'}} className="container-login100-form-btn">
                       <div className="wrap-login100-form-btn">
                          <div className="login100-form-bgbtn"></div>
                              <button className="login100-form-btn" onClick = {this.handleBooking}>
                                CONFIRM NOW
                              </button>
                          </div>
                       </div>
                       <span>
                           <i className = "fas fa-arrow-left fine-print"></i><span> </span>
                           <button className="fine-print" style= {{fontStyle: "normal"}} onClick = {() => this.setState({confirmBookingDisplay: false})}>  Go back</button>
                       </span>
                   </div>);
        }
        if (this.state.confirmCancelDisplay) { // cancel page
            // console.log(this.formatDate(this.state.selectedDate));
            let findingSession = this.state.availabilityList.find(dt => (dt.date === this.formatDate(this.state.selectedDate) && dt.time === this.selectedSession));
            console.log(findingSession);
            let notFound = (findingSession === undefined);
            var location = "Unknown";
            var clientName = "Unknown";
            if (notFound === false) {
                location = findingSession.address;
                clientName = findingSession.client_name;
            }

            return (
                <div className = "p-l-15 chachaFromRight">
                    <h1 className = "modal-heading" style = {{fontSize: '1.5em'}}> Want to cancel your booking? </h1>
                    <p><b>Client: </b>{clientName}</p>
                    <p><b>Time: </b>{this.selectedSession}</p>
                    <p><b>Location: </b>{location}</p>

                    <div className = "p-t-10">
                        <p className = "fine-print">Please note that if you cancel this session and change your mind, you will have to manually add this session again.</p>
                    </div>

                    <div style = {{margin: '3em'}} className="container-login100-form-btn">
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
        } else {
            return (
                <div>
                    <DrawerTasks
                        date={this.state.selectedDate}
                        tasks={this.state.availabilityList}
                        onClick={this.onSessionSelect}
                    />
                    <div style = {{margin: '3em'}} className="container-login100-form-btn">
                         <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" onClick = {this.handleAddMore}>
                                  {this.state.timetableIsOpen ? 'SAVE SELECTION' : 'CHANGE YOUR HOURS'}
                                </button>
                         </div>
                    </div>
                </div>
            );
        }
    }
    // -------------------- FINAL BACKEND REQUEST  ------------------------------
    // this function sends ONE entry to the backend
    postRequest = (start, end) => {
        if (start && end) {
            fetch("http://localhost:4000/delete_availability", { // deleting similar entries before updating
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trainer_id: this.trainer_id,
                    start_date: start,
                })
                // wait for a response before adding the new availabilty (delete before adding)
            }).then(response => {
                var availabilityResult = JSON.stringify({ trainer_id: this.trainer_id, start_date_time: start, end_date_time: end });
                fetch("http://localhost:4000/update_availability", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: availabilityResult
                });
            });
        }
    }

    // this function displays the time table & sends the selected times to backend
    handleAddMore = () => {
        if (this.state.timetableIsOpen) { // if already open, then we save selection
            this.buildAvailabilityArray();
            console.table(this.newAvailability);
            var copyList = []; // clearing beforehand

            for (var j = 0; j < this.newAvailability.length; j++) {
                let start_date_time = this.newAvailability[j][0];
                let end_date_time = this.newAvailability[j][1];
                this.postRequest(start_date_time, end_date_time); // send to posting function
                let split_date_time = start_date_time.split(" ");
                copyList.push({ date: split_date_time[0], time: split_date_time[1], duration: '1 hour', description: '', bookingStatus: "Available", isBooked: false })
                this.setState({ availabilityList: copyList });
            }

            console.log("building new availability list")
            this.getTrainerBookings();
            this.getTrainerAvailability();
            this.setState( {timetableIsOpen: false} ); // close after done
        } else { // if not open, then we open it
            this.fetchPreviousTimes(this.state.selectedDate);
            this.setState( {timetableIsOpen: true} );
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div style = {{marginTop: '4em'}}> </div>
                <div style = {{padding: '3em'}}>
                    <div className = "main-heading p-t-50">
                        <h1> When are you next available? </h1>
                    </div>
                    <p className = "fine-print p-l-20 p-t-20">Click on any date below to check your bookings or add your availability.</p>
                </div>
                <div>
                    <Card className="card-limiter">
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
                                    pendingTasksCount={getPendingTasksCountForDate(date, this.state.availabilityList)}
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
                            onRequestClose={() => this.setState({ isOpen : false, timetableIsOpen: false, confirmBookingDisplay: false, confirmCancelDisplay: false })}
                        >
                            {this.renderDrawerPage()}
                            {this.state.timetableIsOpen ?
                               <div className = "p-t-10 p-b-30 p-l-10 p-r-10">
                                    <table className = "timetable">
                                       <tbody>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked0)}} onClick = {() => this.toggleColour("00:00:00")}> 12:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked1)}} onClick = {() => this.toggleColour("01:00:00")}> 1:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked2)}} onClick = {() => this.toggleColour("02:00:00")}> 2:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked3)}} onClick = {() => this.toggleColour("03:00:00")}> 3:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked4)}} onClick = {() => this.toggleColour("04:00:00")}> 4:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked5)}} onClick = {() => this.toggleColour("05:00:00")}> 5:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked6)}} onClick = {() => this.toggleColour("06:00:00")}> 6:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked7)}} onClick = {() => this.toggleColour("07:00:00")}> 7:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked8)}} onClick = {() => this.toggleColour("08:00:00")}> 8:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked9)}} onClick = {() => this.toggleColour("09:00:00")}> 9:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked10)}} onClick = {() => this.toggleColour("10:00:00")}> 10:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked11)}} onClick = {() => this.toggleColour("11:00:00")}> 11:00am </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked12)}} onClick = {() => this.toggleColour("12:00:00")}> 12:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked13)}} onClick = {() => this.toggleColour("13:00:00")}> 1:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked14)}} onClick = {() => this.toggleColour("14:00:00")}> 2:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked15)}} onClick = {() => this.toggleColour("15:00:00")}> 3:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked16)}} onClick = {() => this.toggleColour("16:00:00")}> 4:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked17)}} onClick = {() => this.toggleColour("17:00:00")}> 5:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked18)}} onClick = {() => this.toggleColour("18:00:00")}> 6:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked19)}} onClick = {() => this.toggleColour("19:00:00")}> 7:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked20)}} onClick = {() => this.toggleColour("20:00:00")}> 8:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked21)}} onClick = {() => this.toggleColour("21:00:00")}> 9:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked22)}} onClick = {() => this.toggleColour("22:00:00")}> 10:00pm </td></tr>
                                           <tr><td className = "label-input100 row-style" style = {{backgroundColor: this.newColour(this.state.clicked23)}} onClick = {() => this.toggleColour("23:00:00")}> 11:00pm </td></tr>
                                       </tbody>
                                   </table>
                                </div>
                                : ''}
                        </Drawer>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default PTAvailability;
