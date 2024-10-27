import type { ForgeConfig } from '@electron-forge/shared-types';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { makeUniversalApp } from '@electron/universal';
import * as path from 'node:path';
import 'dotenv/config';

const isMacAppStoreSubmission = process.env.SUBMISSION_TYPE;
const identity = isMacAppStoreSubmission
    ? `3rd Party Mac Developer Installer: Yevhen Lepekha (${process.env.APPLE_TEAM_ID})`
    : `Developer ID Application: Yevhen Lepekha (${process.env.APPLE_TEAM_ID})`;
const config: ForgeConfig = {
    packagerConfig: {
        name: 'KMaster',
        executableName: 'KMaster',
        appBundleId: 'com.orion189.keymaster',
        appVersion: '1.0.0',
        buildVersion: '1.0.0',
        asar: true,
        appCategoryType: 'public.app-category.education',
        icon: path.resolve(__dirname, 'public', 'icons', 'icon'),
        protocols: [
            {
                name: 'KMaster Launch Protocol',
                schemes: ['key-master']
            }
        ],
        win32metadata: {
            CompanyName: 'Yevhen Lepekha',
            OriginalFilename: 'KMaster'
        },
        osxSign: {
            identity,
            provisioningProfile: path.resolve(__dirname, 'tools', 'Developer_ID_Application.provisionprofile')
        },
        extendInfo: {
            LSMinimumSystemVersion: '12.0',
            'com.apple.security.app-sandbox': true
        }
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-pkg',
            config: {
                identity: 'Developer ID Installer: Yevhen Lepekha (98YLRBNZQ9)',
            },
            platforms: ['darwin', 'mas']
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
    publishers: [],
    /*hooks: {
        postMake: async (forgeConfig, makeResults) => {
            await makeUniversalApp({
                x64AppPath: path.resolve(__dirname, 'out', 'make', 'KMaster-1.0.0-x64.pkg'),
                arm64AppPath: path.resolve(__dirname, 'out', 'make', 'KMaster-1.0.0-arm64.pkg'),
                outAppPath: path.resolve(__dirname, 'out', 'make', 'KMaster-1.0.0-universal.pkg')
            });
        }
    }*/
};
/*
(() => {
    if (process.platform !== 'darwin' || !isMacAppStoreSubmission) {
        return;
    }

    config.makers!.push({
        name: '@electron-forge/maker-pkg',
        config: {
            identity
        },
        platforms: ['darwin', 'mas']
    });
})();

(() => {
    if (process.platform !== 'darwin' || isMacAppStoreSubmission) {
        return;
    }

    if (!process.env.APPLE_ID || !process.env.APPLE_PASSWORD || !process.env.APPLE_TEAM_ID) {
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
        console.log('Not in CI, skipping publishing to GitHub');
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
*/
export default config;
