import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './ListUser.css';

class ListUser extends Component {
    render() {
        return (
            <div className="ListUser">
                <h1>User</h1>
                <table>
                    <thead>
                        <tr key="Title">
                            <th>ID</th>
                            <th>Name</th>
                        </tr>

                    </thead>
                    <tbody>{this.state.array}</tbody>
                </table>
                <p>{JSON.stringify(this.state.payload)}</p>
            </div>
        );

    }

    componentDidMount() {
        this.getPatientInfo(1)
    }

    constructor(props) {
        super(props);
        this.state = {
            array: null
        };

        this.getPatientInfo = this.getPatientInfo.bind(this);
    }

    getPatientInfo = async (Page) => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': Cookies.get("username"),
                'secret': Cookies.get("secret")
            }
        };

        fetch(`/api/user/mypatients/${Page}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                let payload = data.payload;
                let array = []
                for (const patient of payload.patients) {

                    let name = patient.pat_info.fname + " " + patient.pat_info.lname
                    array.push(
                        <tr key={patient.pat_info.id}>
                            <td>{patient.pat_info.id}</td>
                            <Link to={`https://google.com`} >
                                <td>{name}</td>
                            </Link>
                        </tr>
                    )

                }
                this.setState({
                    array: array
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default ListUser;