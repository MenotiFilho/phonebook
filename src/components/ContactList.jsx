/* eslint-disable react/prop-types */
const ContactList = ({ persons, onDeleteContact }) => {
	return (
		<>
			{persons.map((person) => (
				<div key={person.name}>
					<p>
						{person.name} {person.number}
						<button onClick={() => onDeleteContact(person.id)}>Delete</button>
					</p>
				</div>
			))}
		</>
	);
};

export default ContactList;
