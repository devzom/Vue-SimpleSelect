module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/vue-simpleselect/" : "",
	outputDir: "docs",
	devServer: {
		disableHostCheck: true,
	},
};
