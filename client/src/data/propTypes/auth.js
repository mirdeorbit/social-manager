const PropTypes = require('prop-types');

export const User = PropTypes.shape({
	fullName: PropTypes.string.isRequired,
	_id: PropTypes.number.isRequired
});