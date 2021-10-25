module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        "no-unused-vars": 'off',
        "no-mixed-spaces-and-tabs": 0,
        "vue/no-unused-components": "off"
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}