import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProfile} from "../../actions/profileAction";

const Dashboard = ({
                       getCurrentProfile,
                       auth: {user},
                   }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <section className="container">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"/> Welcome {user && user.name}
            </p>
        </section>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

const mapDispatchToProps = dispatch => {
    return {
        ...getProfile(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
