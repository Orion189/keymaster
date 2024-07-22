import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import os from 'os';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@components': path.resolve(__dirname, './src/components')
            }
        },
        plugins: [react()],
        base: '', // because of Electron
        html: {
            cspNonce: env.VITE_NONCE
        },
        define: {
            __APP_PLATFORM__: JSON.stringify(os.platform())
        }
    };
});
