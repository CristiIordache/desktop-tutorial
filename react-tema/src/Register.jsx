import { useEffect, useState } from "react";
import { validationRules } from "../../../utils/validations/validation";

function Register() {
	const [form, setForm] = useState({
		email: "",
		firstName: "",
		lastName: "",
		age: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({
		email: null,
		firstName: null,
		lastName: null,
		age: null,
		password: null,
		confirmPassword: null,
	});
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		// console.log(name);
		// console.log(value);
		setForm({ ...form, [name]: value });
		validateFields(name, value);
	};

	const validateFields = (fieldName, inputValue) => {
		let validationResponse = null;
		if (fieldName === "confirmPassword") {
			validationResponse = validationRules[fieldName](
				inputValue,
				form.password
			);
		} else {
			validationResponse = validationRules[fieldName](inputValue);
		}

		setErrors({ ...errors, [fieldName]: validationResponse });
	};

	useEffect(() => {
		const errorsArray = Object.values(errors).map(
			(repsonseObj) => repsonseObj && repsonseObj.success
		);
		const isValid = errorsArray.every((value) => value === true);

		if (isValid) setIsFormValid(true);
	}, [errors, form]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isFormValid) return;
		console.log("Submitted form");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="login_input">
				<label>Email</label>
				<input
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
				/>
				<span>{errors.email && <p>{errors.email.message}</p>}</span>
			</div>
			<div className="login_input">
				<label>First Name</label>
				<input
					type="text"
					name="firstName"
					value={form.firstName}
					onChange={handleChange}
				/>
				<span>{errors.firstName && <p>{errors.firstName.message}</p>}</span>
			</div>
			<div className="login_input">
				<label>Last Name</label>
				<input
					type="text"
					name="lastName"
					value={form.lastName}
					onChange={handleChange}
				/>
				<span>{errors.lastName && <p>{errors.lastName.message}</p>}</span>
			</div>
			<div className="login_input">
				<label>Age</label>
				<input
					type="text"
					name="age"
					value={form.age}
					onChange={handleChange}
				/>
				<span>{errors.age && <p>{errors.age.message}</p>}</span>
			</div>
			<div className="login_input">
				<label>Password</label>
				<input
					type="text"
					name="password"
					value={form.password}
					onChange={handleChange}
				/>
				<span>{errors.password && errors.password.message}</span>
			</div>
			<div className="login_input">
				<label>Confirm Password</label>
				<input
					type="text"
					name="confirmPassword"
					value={form.confirmPassword}
					onChange={handleChange}
				/>
				<span>
					{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
				</span>
			</div>
			<button type="submit" disabled={!isFormValid}>
				Sign up
			</button>
		</form>
	);
}

export default Register;
