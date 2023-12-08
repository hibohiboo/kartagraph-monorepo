module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "ignorePatterns": ["dist", ".eslintrc.cjs"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["import", "unused-imports"],
  "rules": {
    "semi": ["error", "always"],
    "unused-imports/no-unused-imports": "warn", 
    'unused-imports/no-unused-vars': ['warn',{ vars: 'all',varsIgnorePattern: '^_',args: 'after-used',argsIgnorePattern: '^_' }],
    "import/order": ["warn", { "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"] // importの並び順の設定
                             , "pathGroupsExcludedImportTypes": ["builtin"]
                             , "pathGroups": [{ "pattern": "@kartagraph/**", "group": "parent", "position": "before"}] // エイリアスの位置を指定
                             , "alphabetize": { "order": "asc"} // グループ内のソート順
                             }
                    ]
  },
};
