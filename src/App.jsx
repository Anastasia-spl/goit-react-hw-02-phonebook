import { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Section from './components/Section';
import Container from './components/Container';
import ContactForm from './components/Form';
import ContactList from './components/ContactsList';
import Filter from './components/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    ],
    filter: '',
  };

  onFormSubmit = contactData => {
    const checkDuplicateContacts = contact => {
      const isDuplicateNumber = this.state.contacts.find(
        ({ number }) => number === contact.number,
      );
      const isDuplicateName = this.state.contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase(),
      );

      if (isDuplicateNumber) {
        alert('This number is already in contacts.');
        return true;
      }

      if (isDuplicateName) {
        alert(`${isDuplicateName.name} is already in contacts.`);
        return true;
      }
    };

    if (checkDuplicateContacts(contactData)) {
      return;
    }

    contactData.id = uuidv4();
    this.setState(prevState => ({
      contacts: [contactData, ...prevState.contacts],
    }));
  };

  onFilterChange = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <Section title="Add contact:">
          <Container>
            <ContactForm onFormSubmit={this.onFormSubmit} />
          </Container>
        </Section>
        <Section>
          <Container>
            <Filter value={filter} onFilterChange={this.onFilterChange} />
          </Container>
        </Section>
        <Section title="Contacts">
          <Container>
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={this.onDeleteContact}
            />
          </Container>
        </Section>
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  filter: PropTypes.string,
};

export default App;
