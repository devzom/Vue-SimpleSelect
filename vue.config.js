module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/Vue-SimpleSelect/" : "",
	devServer: {
		disableHostCheck: true,
	},
};
