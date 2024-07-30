import { useCallback, FC, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';

const ErrorSoundHint: FC = observer(() => {
    const { t } = useTranslation();

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const isErrorSoundHintEnabled = event.target.checked;

        store.set('settings', { ...store.settings, isErrorSoundHintEnabled });
    }, []);

    return (
        <Box className={styles.cont}>
            <Typography variant="subtitle1" align="left">
                {t('components.shared.ErrorSoundHint.title')}
            </Typography>
            <Box>
                <Switch
                    onChange={handleChange}
                    checked={store.settings.isErrorSoundHintEnabled}
                    inputProps={{ 'aria-label': t('components.shared.ErrorSoundHint.title') }}
                />
            </Box>
        </Box>
    );
});

export default ErrorSoundHint;
