import { useCallback, FC, memo } from 'react';
import { Outlet } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import SideMenu from '@components/shared/SideMenu';
import store from '@/store';
import styles from './style.module.scss';
import { observer } from 'mobx-react-lite';

const OpenDrawerBtn = observer(() => {
    const openDrawer = useCallback(() => {
        store.set('app', { ...store.app, isDrawerOpened: true });
    }, []);

    return (
        <IconButton
            tabIndex={-1}
            onClick={openDrawer}
            className={styles.settingsBtn}
            disabled={store.app.isDrawerOpened}
        >
            <SettingsIcon fontSize="large" />
        </IconButton>
    );
});

const Root: FC = memo(() => {
    return (
        <div className={styles.cont}>
            <OpenDrawerBtn />
            <SideMenu />
            <Outlet />
        </div>
    );
});

export default Root;
