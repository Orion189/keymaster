import { useCallback, useEffect } from 'react';
import { THEME } from '@/enums';
import store from '@/store';

const useAppTheme = () => {
    const changeTheme = useCallback(async () => {
        // @ts-expect-error: broken typings
        const shouldUseDarkColors = await window?.shouldUseDarkColors?.();
        const theme = shouldUseDarkColors ? THEME.DARK : THEME.LIGHT;

        store.set('settings', { ...store.settings, theme });
    }, []);

    useEffect(() => {
        changeTheme();
        // @ts-expect-error: broken typings
        window?.electron?.onUpdateTheme(changeTheme);
    }, [changeTheme]);

    return null;
};

export default useAppTheme;
