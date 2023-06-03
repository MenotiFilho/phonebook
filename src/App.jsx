/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import {
	addContact,
	getContacts,
	deleteContact,
	updateContact,
} from './services/Api';
import Notification from './components/Notification';

const App = () => {
	// Definindo os estados iniciais
	const [persons, setPersons] = useState([]); // Estado para armazenar os contatos
	const [newName, setNewName] = useState(''); // Estado para armazenar o novo nome
	const [newPhone, setNewPhone] = useState(''); // Estado para armazenar o novo número de telefone
	const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar o termo de busca
	const [message, setMessage] = useState(null); // Estado para armazenar mensagem de sucesso
	const [contatoSelecionado, setContatoSelecionado] = useState(null);

	// Carregar os contatos do servidor quando o componente for montado
	useEffect(() => {
		getContacts()
			.then((contacts) => {
				setPersons(contacts);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	// Função para validar o número de telefone
	const validatePhoneNumber = (phoneNumber) => {
		const phonePattern = /^\d{2}-\d{9}$/;
		return phonePattern.test(phoneNumber);
	};

	// Função para validar o nome
	const validateName = (name) => {
		const namePattern = /^[A-Za-z\s]{2,}$/;
		return namePattern.test(name);
	};

	// Função para lidar com a exclusão de um contato
	const handleDeleteContact = (contactId) => {
		// Encontrar o contato a ser excluído pelo ID
		const contactToDelete = persons.find((person) => person.id === contactId);
		// Exibir uma mensagem de confirmação
		const confirmed = window.confirm(`Delete ${contactToDelete.name}`);
		if (confirmed) {
			// Deletar o contato no servidor
			deleteContact(contactId)
				.then(() => {
					const updatedContacts = persons.filter(
						(person) => person.id !== contactId
					);
					setPersons(updatedContacts);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	// Função para adicionar ou atualizar um contato
	const handleAddContact = (event) => {
		event.preventDefault();

		// Verificar se o nome é válido

		switch (true) {
			case !validateName(newName) && !validatePhoneNumber(newPhone):
				setMessage(
					'Please enter a valid name and a valid telephone number (XX-XXXXXXXXX)',
					null
				);
				return;
			case !validateName(newName):
				setMessage('Please enter a valid name', null);
				return;
			case !validatePhoneNumber(newPhone):
				setMessage(
					'Please enter a valid telephone number (XX-XXXXXXXXX)',
					null
				);
				return;
		}

		// Verificar se o nome do contato já existe na lista
		const existingContact = persons.find((person) => person.name === newName);
		if (existingContact) {
			const confirmed = window.confirm(
				`${existingContact.name} is already added to the phonebook, replace the old number with a new one?`
			);

			if (confirmed) {
				// Atualizar o número de telefone do contato existente
				const updatedContact = {
					...existingContact,
					number: newPhone,
				};

				updateContact(existingContact.id, updatedContact)
					.then((updatedContact) => {
						const updatedContacts = persons.map((person) =>
							person.id === existingContact.id ? updatedContact : person
						);
						setPersons(updatedContacts);
						setMessage(
							`${existingContact.name}'s number has been updated.`,
							updatedContact
						);
						setTimeout(() => {
							setMessage(null, null);
						}, 5000);
					})
					.catch((error) => {
						setMessage(
							`Information of ${existingContact.name} has already been removed from server`,
							null
						);
						setContatoSelecionado(existingContact.name);
						setTimeout(() => {
							setMessage(null, null);
						}, 5000);
						console.error(error);
					});
			}
		} else {
			// Adicionar um novo contato
			const newContact = {
				name: newName,
				number: newPhone,
			};

			addContact(newContact)
				.then((addedContact) => {
					setPersons([...persons, addedContact]);
					setMessage(`${newContact.name} contact has been added.`);
					setContatoSelecionado(newContact.name);
					setTimeout(() => {
						setMessage(null, null);
					}, 5000);
				})
				.catch((error) => {
					console.error(error);
				});
		}

		setNewName('');
		setNewPhone('');
	};

	// Funções para lidar com as alterações nos campos do formulário
	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handlePhoneChange = (event) => {
		setNewPhone(event.target.value);
	};

	// Função para lidar com as alterações no campo de busca
	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	// Filtrar os contatos com base no termo de busca
	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} contact={contatoSelecionado} />
			<Filter value={searchQuery} onChange={handleSearchChange} />
			<h2>Add a new</h2>
			<ContactForm
				onSubmit={handleAddContact}
				name={newName}
				onNameChange={handleNameChange}
				phone={newPhone}
				onPhoneChange={handlePhoneChange}
			/>
			<h2>Numbers</h2>
			<ContactList
				persons={filteredPersons}
				onDeleteContact={handleDeleteContact}
			/>
		</div>
	);
};

export default App;
