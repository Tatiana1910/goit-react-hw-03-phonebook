import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import {
  Container,
  Title,
  SectionStyle,
  Section,
  SectionTitle,
} from './App.styled';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    // console.log('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts !== null) {
      this.setState({ contacts: parsedContacts });
      return;
    }

    this.setState({ contacts: this.state.contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (values, { resetForm }) => {
    let newContact = values;

    const check = this.state.contacts.filter(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (check.length) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      newContact.id = nanoid();

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));

      resetForm({
        name: '',
        number: '',
      });
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterContacts = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <Container>
        <GlobalStyle />
        <Title>Phonebook</Title>
        <SectionStyle>
          <Section>
            <SectionTitle>Add contacts</SectionTitle>
            <ContactForm onSubmit={this.addContact} />
          </Section>
          <Section>
            <SectionTitle>Contacts</SectionTitle>
            <Filter value={this.state.filter} onChange={this.filterContacts} />
            <ContactList
              contacts={this.getFilteredContacts()}
              onDeleteContact={this.deleteContact}
            />
          </Section>
        </SectionStyle>
      </Container>
    );
  }
}
