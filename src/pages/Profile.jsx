import React from 'react';

import PersonIcon from '@mui/icons-material/Person';

import Head from '../components/UserDashboard/Head';
import UserInfo from '../components/UserDashboard/UserInfo';

const Profile = () => {
    return (
        <>
            <Head
                Icon={PersonIcon}
                title="Профиль"
                button={'Редактировать профиль'}
                link={'edit'}
            />
            <UserInfo />
        </>
    );
};

export default Profile;
