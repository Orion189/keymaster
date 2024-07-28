/// <reference types="vite/client" />

interface Window {
    __APP_PLATFORM__: string;
}

declare let __APP_PLATFORM__: string | undefined;