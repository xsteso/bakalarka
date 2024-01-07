import { useState } from "react";

/** function used in Form to store values and handle changing
 *
 * @param {Object} initialFValues initial values of form
 * @param validate
 */
export const useForm = (initialFValues) => {
	const [values, setValues] = useState<any>(initialFValues);
	const [errors, setErrors] = useState<any>({});

	const handleInputChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target;
		const errorCpy = errors;
		errorCpy[name] = "";

		setErrors(errorCpy);
		setValues({
			...values,
			[name]: value,
		});
	};

	return {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
	};
};
