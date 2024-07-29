import store from '@/store';
import { autorun } from 'mobx';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useAppTheme = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        autorun(() => i18n.changeLanguage(store.settings.lang));
    }, []);

    return null;
};

export default useAppTheme;
