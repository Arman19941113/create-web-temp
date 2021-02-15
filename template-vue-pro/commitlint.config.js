module.exports = {
  // type(scope?): subject
  extends: ['@commitlint/config-conventional'],
  // Available rules: https://commitlint.js.org/#/reference-rules
  // Level [0, 1, 2]: 0 disables the rule. For 1 it will be considered a warning for 2 an error.
  // Applicable [always,never]: never inverts the rule.
  // Value: value to use for this rule.
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'fix',
        'feat',
        'perf',
        'style',
        'optimize',
        'refactor',
        'revert',
        'docs',
        'test',
        'build',
        'chore',
      ],
    ],
  },
}
