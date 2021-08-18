import React, {Component} from 'react';
import Footer from '../Components/footer';
import Header from '../Components/header';
import DataTables from '../Components/AdminTable';
class AdminDashboard extends Component {
    render() {
        return (
            <React.Fragment>
            <div>
                <Header />
                <div style = {{marginTop: '6.0em'}}> </div>
                <DataTables/>
            <Footer />
            </div>
            </React.Fragment>
        )
    }
}
export default AdminDashboard;