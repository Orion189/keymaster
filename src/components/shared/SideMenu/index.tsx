import { useCallback, FC, useState, SyntheticEvent } from 'react';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from './style.module.scss';

const SideMenu: FC = observer(() => {
    const closeDrawer = useCallback(() => {
        store.set('app', { ...store.app, isDrawerOpened: false });
    }, []);
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Drawer open={store.app.isDrawerOpened} onClose={closeDrawer}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Auto" />
                <Tab label="Manual" />
            </Tabs>
        </Drawer>
    );
});

export default SideMenu;
