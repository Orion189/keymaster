import { useCallback, FC, useState, SyntheticEvent } from 'react';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LangSelector from '@/components/shared/LangSelector';
import TypingSpeedSelector from '@/components/shared/TypingSpeedSelector';
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
        <Drawer open={store.app.isDrawerOpened} onClose={closeDrawer} PaperProps={{ className: styles.cont }}>
            <Typography variant="h6" align="center">
                Settings
            </Typography>
            <Container>
                <LangSelector />
                <TypingSpeedSelector />
                <Box className={styles.setting}>
                    <Typography variant="subtitle1" align="left">
                        Show key hints
                    </Typography>
                    <Box className={styles.settingValue}></Box>
                </Box>
                <Box className={styles.setting}>
                    <Typography variant="subtitle1" align="left">
                        Show hands hints
                    </Typography>
                    <Box className={styles.settingValue}></Box>
                </Box>
                <Box className={styles.setting}>
                    <Typography variant="subtitle1" align="left">
                        Error sound
                    </Typography>
                    <Box className={styles.settingValue}></Box>
                </Box>
            </Container>
            <Typography variant="h6" align="center">
                Exercises
            </Typography>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Auto" />
                <Tab label="Manual" />
            </Tabs>
        </Drawer>
    );
});

export default SideMenu;
