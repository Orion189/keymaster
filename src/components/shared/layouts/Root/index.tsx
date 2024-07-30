import { useCallback, FC } from 'react';
import { Outlet } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import SideMenu from '@components/shared/SideMenu';
import store from '@/store';
import styles from './style.module.scss';

const Root: FC = () => {
    const openDrawer = useCallback(() => {
        store.set('app', { ...store.app, isDrawerOpened: true });
    }, []);

    return (
        <div className={styles.cont}>
            <IconButton onClick={openDrawer} className={styles.settingsBtn}>
                <SettingsIcon fontSize="large" />
            </IconButton>
            <SideMenu />
            <Outlet />
        </div>
    );
};

export default Root;
