import { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './PhoneBook/ContactForm';
import Filter from './PhoneBook/Filter';
import ContactList from './PhoneBook/ContactList';
import useLocalStorage from '../hooks/useLocalStorage';
import s from '../components/PhoneBook/PhoneBook.module.css';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = data => {
    let isContactNameFound = contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isContactNameFound) {
      alert(`${data.name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name: data.name,
        number: data.number,
      };
      setContacts([...contacts, contact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();
  return (
    <div className={s.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
