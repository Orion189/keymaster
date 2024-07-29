import { useCallback, useState, FC, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LOCALE } from '@/enums';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';

type LangItemProps = {
    lang: LOCALE;
    handleMenuClose: () => void;
};

const LangItem: FC<LangItemProps> = observer(({ lang, handleMenuClose }) => {
    const { t } = useTranslation();
    const onClickHandler = useCallback(() => {
        store.set('settings', { ...store.settings, lang });

        handleMenuClose();
    }, [handleMenuClose, lang]);

    return (
        <MenuItem onClick={onClickHandler} selected={store.settings.lang === lang}>
            <ListItemIcon>
                <SvgIcon
                    classes={{
                        root: `${styles.flag} ${styles[lang]}`
                    }}
                />
            </ListItemIcon>
            <ListItemText>{t(`components.shared.LangSelector.locale.${lang}`)}</ListItemText>
        </MenuItem>
    );
});

const LangSelector: FC = observer(() => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();
    const handleMenuOpen = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        },
        [setAnchorEl]
    );
    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    return (
        <Box className={styles.cont}>
            <Typography variant="subtitle1" align="left">
                {t('components.shared.LangSelector.title')}
            </Typography>
            <Box>
                <Button
                    id="lang-button"
                    aria-controls={open ? 'lang-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleMenuOpen}
                    startIcon={
                        <SvgIcon
                            classes={{
                                root: `${styles.flag} ${styles[store.settings.lang]}`
                            }}
                        />
                    }
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    <Typography variant="subtitle1" align="left">
                        {t(`components.shared.LangSelector.locale.${store.settings.lang}`)}
                    </Typography>
                </Button>
                <Menu
                    id="lang-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        'aria-labelledby': 'lang-button'
                    }}
                >
                    {[LOCALE.EN, LOCALE.UK, LOCALE.RU].map((lang) => (
                        <LangItem key={lang} lang={lang} handleMenuClose={handleMenuClose} />
                    ))}
                </Menu>
            </Box>
        </Box>
    );
});

export default LangSelector;
