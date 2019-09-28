import _ from 'underscore';
import baseConfig from './base';

var developmentConfig = {
	env: 'development'
};

export default () => _(baseConfig()).extend(developmentConfig);
