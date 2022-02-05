import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddContat from "./AddContact";
import "./App.css";
import ContactDetail from "./ContactDetail";
import ContactList from "./ContactList";
import Header from "./Header.js";
import api from "../api/contacts";
import { v4 as uuidv4 } from "uuid";
import EditContat from "./EditContact";

function App() {
  const Local_Storage_Key = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // retrieve Contacts

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");

    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          ?.toLowerCase()
          .includes(searchTerm?.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };
  useEffect(() => {
    // const retrieveContacts= JSON.parse(localStorage.getItem(Local_Storage_Key))
    // if (retrieveContacts) {
    //   setContacts(retrieveContacts);
    // }

    const getAllContacts = async () => {
      const getAll = await retrieveContacts();
      if (getAll) {
        setContacts(getAll);
      }
    };
    getAllContacts();
  }, []);
  useEffect(() => {
    // localStorage.setItem(Local_Storage_Key, JSON.stringify(contacts));
  }, [contacts]);

  const removeContactHandler = async (id) => {
    await api.delete(`contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  return (
    <div className="ui container">
      <Header />
      <br />
      <br />
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContat {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/contact/:id"
            component={(props) => <ContactDetail {...props} />}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditContat
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
        </Switch>
      </Router>

      {/* <AddContat addContactHandler={addContactHandler}/>
     <ContactList contacts={contacts} getContactId={removeContactHandler}/>*/}
    </div>
  );
}

export default App;
