import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  contactItem: {
    marginBottom: 15,
  },
  deleteBtn: {
    marginLeft: 25,
  },
});

const ContactList = ({ contacts, onDeleteContact }) => {
  const { contactItem, deleteBtn } = useStyles();
  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={contactItem}>
          <span>
            {name}: {number}
          </span>
          <button
            type="button"
            className={deleteBtn}
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default ContactList;
