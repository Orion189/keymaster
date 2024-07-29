import { useCallback, useState, FC, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TYPING_SPEED } from '@/enums';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';

type TypingSpeedItemProps = {
    typingSpeed: TYPING_SPEED;
    handleMenuClose: () => void;
};

const TypingSpeedItem: FC<TypingSpeedItemProps> = observer(({ typingSpeed, handleMenuClose }) => {
    const { t } = useTranslation();
    const onClickHandler = useCallback(() => {
        store.set('settings', { ...store.settings, typingSpeed });

        handleMenuClose();
    }, [handleMenuClose, typingSpeed]);

    return (
        <MenuItem onClick={onClickHandler} selected={store.settings.typingSpeed === typingSpeed}>
            <ListItemText>{t(`components.shared.TypingSpeedSelector.options.${typingSpeed}`)}</ListItemText>
        </MenuItem>
    );
});

const TypingSpeedSelector: FC = observer(() => {
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
                {t('components.shared.TypingSpeedSelector.title')}
            </Typography>
            <Box>
                <Button
                    id="typingSpeed-button"
                    aria-controls={open ? 'typingSpeed-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleMenuOpen}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    <Typography variant="subtitle1" align="left">
                        {t(`components.shared.TypingSpeedSelector.options.${store.settings.typingSpeed}`)}
                    </Typography>
                </Button>
                <Menu
                    id="typingSpeed-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        'aria-labelledby': 'typingSpeed-button'
                    }}
                >
                    {[TYPING_SPEED.CHARACTERS, TYPING_SPEED.WORDS].map((typingSpeed) => (
                        <TypingSpeedItem key={typingSpeed} typingSpeed={typingSpeed} handleMenuClose={handleMenuClose} />
                    ))}
                </Menu>
            </Box>
        </Box>
    );
});

export default TypingSpeedSelector;
