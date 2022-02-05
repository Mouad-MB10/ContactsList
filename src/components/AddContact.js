import { selectOptions } from "@testing-library/user-event/dist/select-options";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import ContactList from "./ContactList";
import { Outlet, Link } from "react-router-dom";
class AddContat extends React.Component {
  state = {
    id: uuidv4(),
    name: "",
    email: "",
  };
  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All fiels is required Assat");
      return;
    } else {
      this.props.addContactHandler(this.state);
      this.setState({ id: uuidv4(), name: "", email: "" });
      this.props.history.push("/");
    }
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Contact To List</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="ui field">
            <label>Name</label>
            <input
              type="text"
              name="nm"
              placeholder="name"
              onChange={(e) => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
          </div>
          <div className="ui field">
            <label>Email</label>
            <input
              type="text"
              name="eml"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
          </div>
          <div className="ui field">
            <button className="ui button blue">Add Contact</button>
          </div>
        </form>
      </div>
    );
  }
}
export default AddContat;
