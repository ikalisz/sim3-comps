import React, {Component} from 'react'
import Axios from 'axios';
import {getUser} from '../../redux/reducers/userReducer'

class Profile extends Component {
    componentDidMount() {
        Axios.get(`/user/vacations?location=${'UnitedStates'}`)
    }
}

function mapStateToProps(reduxState) {
    return reduxState.user
}

const mapDispatchToProps = {
    getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)