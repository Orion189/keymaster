import { useCallback, FC, memo } from 'react';
import { Outlet, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import SideMenu from '@components/shared/SideMenu';
import store from '@/store';
import styles from './style.module.scss';
import { observer } from 'mobx-react-lite';

const SettingsBtn = observer(() => {
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

const ResultsBtn = memo(() => (
    <Link to={'/results'}>
        <IconButton tabIndex={-1} className={styles.resultsBtn}>
            <BarChartIcon fontSize="large" />
        </IconButton>
    </Link>
));

const RootLayout: FC = memo(() => {
    return (
        <div className={styles.cont}>
            <SettingsBtn />
            <SideMenu />
            <Outlet />
            <ResultsBtn />
        </div>
    );
});

export default RootLayout;
