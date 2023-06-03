/* eslint-disable react/prop-types */

const ContactForm = ({
	onSubmit,
	name,
	onNameChange,
	phone,
	onPhoneChange,
}) => {
	return (
		<form name="contactform" onSubmit={onSubmit}>
			<div>
				name:{' '}
				<input
					placeholder="Name"
					type="text"
					value={name}
					onChange={onNameChange}
				/>
			</div>
			<div>
				number:{' '}
				<input
					type="text"
					value={phone}
					onChange={onPhoneChange}
					placeholder="XX-XXXXXXXXX"
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default ContactForm;
