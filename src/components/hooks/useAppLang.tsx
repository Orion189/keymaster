import { useCallback, useEffect } from 'react';
import { autorun } from 'mobx';
import { useTranslation } from 'react-i18next';
import { LOCALE } from '@/enums';
import store from '@/store';

const useAppLang = () => {
    const { i18n } = useTranslation();
    const changeLanguage = useCallback(
        (lang: LOCALE) => {
            if (i18n.language !== lang) {
                i18n.changeLanguage(lang);
            }
        },
        [i18n]
    );

    useEffect(() => {
        autorun(() => changeLanguage(store.settings.lang));
    }, []);

    return null;
};

export default useAppLang;
