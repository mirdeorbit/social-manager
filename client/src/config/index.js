import developmentConfig from "./development";

console.log(developmentConfig)

const configs = {
	development: developmentConfig()
};

export default configs[process.env.NODE_ENV || 'development'];