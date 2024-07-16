import { useState, useCallback, FC } from 'react';
import { Outlet } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './style.module.scss';

const Root: FC = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = useCallback(
        (newOpen: boolean) => () => {
            setOpen(newOpen);
        },
        [setOpen]
    );

    return (
        <div className={styles.cont}>
            <IconButton aria-label="settings" onClick={toggleDrawer(true)} className={styles.settingsBtn}>
                <SettingsIcon fontSize="large" />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                'Drawer'
            </Drawer>
            <Outlet />
        </div>
    );
};

export default Root;
