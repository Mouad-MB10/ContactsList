import React from "react";
import { v4 as uuidv4 } from "uuid";

class EditContat extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email } = props.location.state.contact;
    this.state = {
      id,
      name,
      email,
    };
  }
  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All fiels is required Assat");
      return;
    } else {
      this.props.updateContactHandler(this.state);
      this.setState({ id: uuidv4(), name: "", email: "" });
      this.props.history.push("/");
    }
  };
  render() {
    return (
      <div className="ui main">
        <h2>Edit Contact </h2>
        <form className="ui form" onSubmit={this.update}>
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
            <button className="ui button blue">Update Contact</button>
          </div>
        </form>
      </div>
    );
  }
}
export default EditContat;
