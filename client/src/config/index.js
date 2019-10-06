import developmentConfig from "./development";

const configs = {
	development: developmentConfig()
};

export default configs[process.env.NODE_ENV || 'development'];