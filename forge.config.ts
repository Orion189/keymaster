import type { ForgeConfig } from '@electron-forge/shared-types';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import * as path from 'node:path';
import 'dotenv/config';

const config: ForgeConfig = {
    packagerConfig: {
        name: 'KeyMaster',
        executableName: 'key-master',
        appBundleId: 'com.orion189.keymaster',
        asar: true,
        appCategoryType: 'public.app-category.education',
        icon: path.resolve(__dirname, 'public', 'icons', 'logo'),
        protocols: [
            {
                name: 'KeyMaster Launch Protocol',
                schemes: ['key-master']
            }
        ],
        win32metadata: {
            CompanyName: 'Yevhen Lepekha',
            OriginalFilename: 'KeyMaster'
        },
        osxSign: {
            identity: `Developer ID Application: Yevhen Lepekha (${process.env.APPLE_TEAM_ID})`
        }
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {}
        },
        {
            name: '@electron-forge/maker-zip',
            config: {},
            platforms: ['darwin']
        }
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {}
        },
        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true
        })
    ],
    publishers: []
};

(() => {
    if (process.platform !== 'darwin') {
        return;
    }

    if (!process.env.CI) {
        console.log('Not in CI, skipping notarization');
        return;
    }

    if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
        console.warn(
            'Should be notarizing, but environment variables APPLE_ID or APPLE_ID_PASSWORD, or APPLE_TEAM_ID are missing!'
        );
        return;
    }

    config.packagerConfig!.osxNotarize = {
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_PASSWORD,
        teamId: process.env.APPLE_TEAM_ID
    };
})();

(() => {
    if (!process.env.CI) {
        console.log('Not in CI, skipping notarization');
        return;
    }

    config.publishers!.push({
        name: '@electron-forge/publisher-github',
        config: {
            repository: {
                owner: 'Orion189',
                name: 'keymaster'
            },
            prerelease: false,
            draft: true
        }
    });
})();

export default config;
