import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ProfileItem from './ProfileItem';
import {getProfiles} from './../../actions/profileAction'
import Spinner from './../common/Spinner'

const Profiles = ({getAllProfile, profile: {profiles, loading}}) => {
    useEffect(() => {
        getAllProfile();
    }, [getAllProfile]);

    let profileItems
    if (profiles === null || loading) {
        profileItems = <Spinner/>
    } else {
        if (profiles.length > 0) {
            profileItems = profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile}/>
            ))
        } else {
            profileItems = <h4> No profiles found...</h4>
        }
    }
    return (
        <div>
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="display-4 text-center">
                                <h1>Developer Profile</h1>
                                {profileItems}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

Profiles.propTypes = {
    getAllProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

const mapDispatchToProps = dispatch => {
    return {
        ...getProfiles(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
