/* eslint-disable react/prop-types */
const ContactList = ({ persons, onDeleteContact }) => {
	return (
		<>
			{persons.map((person) => (
				<div key={person.phone}>
					<p>
						{person.name} {person.phone}
						<button onClick={() => onDeleteContact(person.id)}>Delete</button>
					</p>
				</div>
			))}
		</>
	);
};

export default ContactList;
