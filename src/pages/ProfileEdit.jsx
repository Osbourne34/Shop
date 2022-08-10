import React from 'react';

import PersonIcon from '@mui/icons-material/Person';

import Head from '../components/UserDashboard/Head';
import UserEditForm from '../components/UserDashboard/UserEditForm';

const ProfileEdit = () => {
    return (
        <>
            <Head
                Icon={PersonIcon}
                title="Редактирование профиля"
                button={'Назад к профилю'}
                link={'/profile'}
            />
            <UserEditForm />
        </>
    );
};

export default ProfileEdit;
