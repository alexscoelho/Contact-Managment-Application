import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

const AddContact = props => {
	// test contact accesible from witchRouter and props.location.state.contact
	let testContact =
		typeof props.location.state !== "undefined" && typeof props.location.state.contact !== "undefined"
			? props.location.state.contact
			: null;
	const { store, actions } = useContext(Context);
	const [fullName, setFullName] = useState(testContact !== null ? testContact.full_name : "");
	const [address, setAddress] = useState(testContact !== null ? testContact.address : "");
	const [email, setEmail] = useState(testContact !== null ? testContact.email : "");
	const [phone, setPhone] = useState(testContact !== null ? testContact.phone : "");
	const [id, setId] = useState(testContact !== null ? testContact.id : "");
	const [contact, setContact] = useState(testContact !== null ? props.location.state.contact : null);
	const [message, setMessage] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		if (testContact !== null) {
			// editing contact - use update fetch (PUT)
			actions.updateContact(id, fullName, address, email, phone);
		} else {
			// adding contact - use add fetch (POST)
			actions.addingContact(fullName, address, email, phone);
		}
		setFullName("");
		setAddress("");
		setEmail("");
		setPhone("");
		setMessage(true);
	};

	return (
		<div className="container">
			<form onSubmit={e => handleSubmit(e)}>
				<h1 className="text-center mt-5">{contact !== null ? "Edit" : "Add a new"} contact</h1>
				{message ? (
					<div className="alert alert-success" role="alert">
						Saved
					</div>
				) : null}
				<div className="form-group">
					<label>Full Name</label>
					<input
						// set the state with values from the form
						onChange={e => setFullName(e.target.value)}
						value={fullName}
						type="text"
						className="form-control"
						placeholder="Full Name"
					/>
				</div>
				<div className="form-group">
					<label>Email</label>
					<input
						onChange={e => setEmail(e.target.value)}
						value={email}
						type="email"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						required
						className="form-control"
						placeholder="Enter email"
					/>
				</div>
				<div className="form-group">
					<label>Phone</label>
					<input
						onChange={e => setPhone(e.target.value)}
						value={phone}
						type="phone"
						className="form-control"
						placeholder="Enter phone"
					/>
				</div>
				<div className="form-group">
					<label>Address</label>
					<input
						onChange={e => setAddress(e.target.value)}
						value={address}
						type="text"
						className="form-control"
						placeholder="Enter address"
					/>
				</div>
				<button type="submit" className="btn btn-primary form-control">
					save
				</button>
				<Link className="mt-3 w-100 text-center" to="/">
					or get back to contacts
				</Link>
			</form>
		</div>
	);
};

// this is how you validate location
AddContact.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
		state: PropTypes.object.isRequired
	}).isRequired
};

export default withRouter(AddContact);
