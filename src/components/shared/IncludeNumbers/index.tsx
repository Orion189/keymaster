import { useCallback, FC, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';

const IncludeNumbers: FC = observer(() => {
    const { t } = useTranslation();

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const isNumbersEnabled = event.target.checked;

        store.set('settings', { ...store.settings, isNumbersEnabled });
    }, []);

    return (
        <Box className={styles.cont}>
            <Typography variant="subtitle1" align="left">
                {t('components.shared.IncludeNumbers.title')}
            </Typography>
            <Box>
                <Switch
                    onChange={handleChange}
                    checked={store.settings.isNumbersEnabled}
                    inputProps={{ 'aria-label': t('components.shared.IncludeNumbers.title') }}
                />
            </Box>
        </Box>
    );
});

export default IncludeNumbers;
