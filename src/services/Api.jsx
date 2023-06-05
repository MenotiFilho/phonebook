import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

export const addContact = (newContact) => {
	return axios
		.post(baseUrl, newContact) // Envia uma requisição POST para adicionar um novo contato
		.then((response) => response.data) // Retorna os dados do contato adicionado em caso de sucesso
		.catch((error) => {
			throw new Error(`Error adding contact: ${error}`); // Lança um erro com uma mensagem personalizada em caso de erro
		});
};

export const getContacts = () => {
	return axios
		.get(baseUrl) // Envia uma requisição GET para obter a lista de contatos
		.then((response) => response.data) // Retorna os dados dos contatos em caso de sucesso
		.catch((error) => {
			throw new Error(`Error getting contacts: ${error}`); // Lança um erro com uma mensagem personalizada em caso de erro
		});
};

export const deleteContact = (contactId) => {
	return axios
		.delete(`${baseUrl}/${contactId}`) // Envia uma requisição DELETE para deletar um contato pelo ID
		.then((response) => response.data) // Retorna os dados do contato deletado em caso de sucesso
		.catch((error) => {
			throw new Error(`Error deleting contact: ${error}`); // Lança um erro com uma mensagem personalizada em caso de erro
		});
};

export const updateContact = (contactId, updatedContact) => {
	return axios
		.put(`${baseUrl}/${contactId}`, updatedContact) // Envia uma requisição PUT para atualizar um contato pelo ID
		.then((response) => response.data) // Retorna os dados do contato atualizado em caso de sucesso
		.catch((error) => {
			throw new Error(`Error updating contact: ${error}`); // Lança um erro com uma mensagem personalizada em caso de erro
		});
};
