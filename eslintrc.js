module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ["plugin:vue/recommended", "eslint:recommended", "plugin:prettier/recommended"],
	parserOptions: {
		parser: "babel-eslint",
	},
	rules: {
		"vue/component-name-in-template-casing": ["error", "PascalCase"],
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"prettier/prettier": [
			"off",
			{
				singleQuote: true,
				semi: false,
				trailingComa: false,
			},
		],
	},
};
