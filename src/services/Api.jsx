import axios from 'axios';

export const addContact = (newContact) => {
	return axios
		.post(
			'https://my-json-server.typicode.com/MenotiFilho/phoneserver/db',
			newContact
		) // Envia uma requisição POST para adicionar um novo contato
		.then((response) => response.data) // Retorna os dados do contato adicionado em caso de sucesso
		.catch((error) => {
			throw new Error(`Error adding contact: ${error}`); // Lança um erro com uma mensagem personalizada em caso de erro
		});
};

export const getContacts = () => {
	return axios
		.get('https://my-json-server.typicode.com/MenotiFilho/phoneserver/db') // Envia uma requisição GET para obter a lista de contatos
		.then((response) => response.data) // Retorna os dados dos contatos em caso de sucesso
		.catch((error) => {
			throw new Error(`Error getting contacts: ${error}`); // Lança um erro com uma mensagem personalizada em caso de erro
		});
};

export const deleteContact = (contactId) => {
	return axios
		.delete(
			`https://my-json-server.typicode.com/MenotiFilho/phoneserver/db/${contactId}`
		) // Envia uma requisição DELETE para deletar um contato pelo ID
		.then((response) => response.data) // Retorna os dados do contato deletado em caso de sucesso
		.catch((error) => {
			throw new Error(`Error deleting contact: ${error}`); // Lança um erro com uma mensagem personalizada em caso de erro
		});
};

export const updateContact = (contactId, updatedContact) => {
	return axios
		.put(
			`https://my-json-server.typicode.com/MenotiFilho/phoneserver/db/${contactId}`,
			updatedContact
		) // Envia uma requisição PUT para atualizar um contato pelo ID
		.then((response) => response.data) // Retorna os dados do contato atualizado em caso de sucesso
		.catch((error) => {
			throw new Error(`Error updating contact: ${error}`); // Lança um erro com uma mensagem personalizada em caso de erro
		});
};
