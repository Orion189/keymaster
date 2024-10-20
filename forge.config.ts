import type { ForgeConfig } from '@electron-forge/shared-types';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import * as path from 'node:path';
import 'dotenv/config';

const isMacAppStoreSubmission = process.env.SUBMISSION_TYPE;
const identity = isMacAppStoreSubmission
    ? `3rd Party Mac Developer Installer: Yevhen Lepekha (${process.env.APPLE_TEAM_ID})`
    : `Developer ID Application: Yevhen Lepekha (${process.env.APPLE_TEAM_ID})`;
const config: ForgeConfig = {
    packagerConfig: {
        name: 'KMaster',
        executableName: 'key-master',
        appBundleId: 'com.orion189.keymaster',
        appVersion: '1.0.0',
        buildVersion: '1.0.0',
        asar: true,
        appCategoryType: 'public.app-category.education',
        icon: path.resolve(__dirname, 'public', 'icons', 'icon'),
        /*extendInfo: {},*/
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
            /*identity,
            type: isMacAppStoreSubmission ? 'distribution' : 'development',
            provisioningProfile: path.resolve(__dirname, 'tools', 'distribution.provisionprofile'),
            optionsForFile: (filePath) => {
                const entitlements = filePath.includes('.app/')
                    ? path.resolve(__dirname, 'tools', 'entitlements.mas.child.plist')
                    : path.resolve(__dirname, 'tools', 'entitlements.mas.plist');

                return {
                    hardenedRuntime: false,
                    entitlements
                };
            },*/
        }
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-zip',
            config: {},
            platforms: ['darwin', 'mas']
        },
        {
            name: '@electron-forge/maker-pkg',
            config: {
                identity
            },
            platforms: ['darwin', 'mas']
        }/*,
        {
            name: '@electron-forge/maker-squirrel',
            config: {}
        },
        {
            name: '@electron-forge/maker-dmg',
            config: {
                format: 'ULFO'
            }
        }*/
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

export default config;
