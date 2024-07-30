import { useCallback, FC, useState, SyntheticEvent } from 'react';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import LangSelector from '@/components/shared/LangSelector';
import TypingSpeedSelector from '@/components/shared/TypingSpeedSelector';
import ShowKeyHint from '@/components/shared/ShowKeyHint';
import ShowHandsHint from '@/components/shared/ShowHandsHint';
import ErrorSoundHint from '@/components/shared/ErrorSoundHint';
import Exercises from '@/components/shared/Exercises';
import IncludeUpperCase from '@/components/shared/IncludeUpperCase';
import IncludeNumbers from '@/components/shared/IncludeNumbers';
import IncludePunctuation from '@/components/shared/IncludePunctuation';
import styles from './style.module.scss';

const SideMenu: FC = observer(() => {
    const { t } = useTranslation();
    const closeDrawer = useCallback(() => {
        store.set('app', { ...store.app, isDrawerOpened: false });
    }, []);
    const [value, setValue] = useState(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Drawer open={store.app.isDrawerOpened} onClose={closeDrawer} PaperProps={{ className: styles.cont }}>
            <Container>
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    <Tab label={t('components.shared.SideMenu.sections.exercises.title')} />
                    <Tab label={t('components.shared.SideMenu.sections.settings.title')} />
                </Tabs>
                <Box hidden={value !== 0}>
                    <Exercises />
                </Box>
                <Box hidden={value !== 1}>
                    <LangSelector />
                    <TypingSpeedSelector />
                    <ShowKeyHint />
                    <ShowHandsHint />
                    <ErrorSoundHint />
                    <IncludeUpperCase />
                    <IncludeNumbers />
                    <IncludePunctuation />
                </Box>
            </Container>
        </Drawer>
    );
});

export default SideMenu;
