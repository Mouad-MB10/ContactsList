import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
const ContactList = (props) => {
  console.log(props);
  const inputRef = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHander={deleteContactHandler}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputRef.current.value);
  };
  return (
    <div className="ui celled list">
      <h2>Contact List</h2>

      <Link to="/add">
        <button className="ui button blue right">Add New Contact</button>
      </Link>
      {renderContactList.length > 0
        ? renderContactList
        : "no cantacts availible"}
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Contacts "
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
    </div>
  );
};
export default ContactList;
