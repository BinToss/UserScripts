import baseConfig from '@halospv3/hce.shared-config/commitlintConfig';

const scopes = {
  CHANGELOG: 'Affects "CHANGELOG.md".',
  commitlint:
    'Affects "commitlint.config.js".',
  deps: 'Affects dependencies required at runtime.',
  'deps-dev':
    'Affects dependencies required in the dev environment or during build time.',
  eslint:
    'Affects "eslint.config.js".',
  NMMMT: 'Affects "src/Nexus Mods | Minimal Mod Title.user.js".',
  NMSTDP: 'Affects "src/Nexus Mods | Strip tab=description Parameter.user.js".',
  package: 'Affects "package.json" or its tests.',
  README: 'Affects "README.md".',
  release: 'Reserved for release commits.',
  renovate: 'Affects "./.github/renovate.json".',
  TODO: 'Affects "TODO.md".',
  vscode: 'Affects ".vscode/".',
  VSLSMNA: 'Affects "src/Vintage Story | Left-Side Mod Notification Actions.user.js".',
  VSMMT: 'Affects "src/Vintage Story | Minimal ModDB Title.user.js".',
  VSSFH:'Affects "src/Vintage Story | Strip #follow Hash.user.js".',
  VSSMTWARA: 'Affects "src/Vintage Story | Strip Mod Title Whitespace And Replace Ampersand.user.js".',
  VSSTDH: 'Affects "src/Vintage Story | Strip #tab-description Hash.user.js".'
};

/**@type {import('@commitlint/types').UserConfig} */
const config = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    'scope-enum': [
      2,
      'always',
      Object.keys(scopes),
    ],
  },
};
export default config;
