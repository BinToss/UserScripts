import baseConfig from '@halospv3/hce.shared-config/eslintConfig';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const config = defineConfig([
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.greasemonkey,
      },
    },
  },
]);
export default config;
