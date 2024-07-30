import store from '@/store';
import { reaction } from 'mobx';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useAppTheme = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        reaction(
            () => store.settings.lang,
            lang => i18n.changeLanguage(lang)
        );
    }, []);

    return null;
};

export default useAppTheme;
