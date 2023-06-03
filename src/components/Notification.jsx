/* eslint-disable react/prop-types */
const Notification = ({ message, contact }) => {
	if (message === null) {
		return null;
	} else if (
		message === 'Please enter a valid name' ||
		message ===
			'Please enter a valid name and a valid telephone number (XX-XXXXXXXXX)' ||
		message === 'Please enter a valid telephone number (XX-XXXXXXXXX)' ||
		message === `Information of ${contact} has already been removed from server`
	) {
		return <div className="error">{message}</div>;
	} else {
		return <div className="success">{message}</div>;
	}
};

export default Notification;
