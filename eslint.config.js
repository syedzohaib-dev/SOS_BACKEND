const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const promisePlugin = require('eslint-plugin-promise');
const prettierPlugin = require('eslint-plugin-prettier');
const babelParser = require('@babel/eslint-parser');

module.exports = [
    js.configs.recommended,
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '*.config.js', 'eslint.config.js'],
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                requireConfigFile: false,
                ecmaFeatures: {
                    classes: true,
                    experimentalObjectRestSpread: true,
                },
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'writable',
                Buffer: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
            },
        },
        plugins: {
            import: importPlugin,
            promise: promisePlugin,
            prettier: prettierPlugin,
        },
        rules: {
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1,
                },
            ],
            'no-var': 'error',
            'no-alert': 'error',
            'no-undef': 'error',
            'no-console': 'error',
            'no-debugger': 'error',
            'valid-jsdoc': 'off',
            'require-jsdoc': 'off',
            'new-cap': 'off',
            camelcase: [
                'error',
                {
                    properties: 'never',
                },
            ],
            'valid-typeof': 'error',
            'no-invalid-this': 'error',
            'no-mixed-spaces-and-tabs': 'error',
            'no-unused-expressions': 'error',
            'space-before-blocks': 'error',
            'arrow-spacing': 'error',
            'key-spacing': [
                'error',
                {
                    afterColon: true,
                    mode: 'minimum',
                },
            ],
            'brace-style': ['error', '1tbs'],
            'comma-spacing': [
                'error',
                {
                    before: false,
                    after: true,
                },
            ],
            'comma-style': [
                'error',
                'last',
                {
                    exceptions: {
                        VariableDeclaration: true,
                    },
                },
            ],
            'computed-property-spacing': ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'prefer-const': 'error',
            'max-len': [
                'error',
                {
                    code: 120,
                    ignoreStrings: true,
                    ignoreComments: true,
                    ignoreTemplateLiterals: true,
                },
            ],
            'prettier/prettier': 'error',
        },
    },
    prettier,
];
