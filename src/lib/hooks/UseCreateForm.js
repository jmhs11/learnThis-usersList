import { useEffect, useState } from 'react';
import { validateName, validateUsername } from '../users/userValidations';

export const useCreateForm = () => {
	const [formValues, setFormValues] = useState({
		name: {
			value: '',
			error: undefined
		},
		username: {
			value: '',
			loading: false,
			error: undefined
		}
	});

	const validateUsernameAsync = async (username, setUsernameError, signal) => {
		let error;

		try {
			const res = await fetch(
				`http://localhost:4000/users?username=${username}`,
				{ signal }
			);
			if (res.ok) {
				const data = await res.json();
				if (data.length) error = 'El username ya existe';
			} else {
				error = 'Error al validar el username';
			}
		} catch {
			error = 'Error al validar el username';
		}

		setUsernameError(error);
	};

	const setName = newName => {
		const error = validateName(newName);

		setFormValues({
			...formValues,
			name: { value: newName, error }
		});
	};

	const setUsername = newUsername => {
		const error = validateUsername(newUsername);

		setFormValues({
			...formValues,
			username: { value: newUsername, error, loading: !error }
		});
	};

	const setUsernameError = error =>
		setFormValues(prevFormValues => ({
			...prevFormValues,
			username: {
				value: prevFormValues.username.value,
				loading: false,
				error
			}
		}));

	useEffect(() => {
		if (formValues.username.loading) {
			const controler = new AbortController();
			const timeoutId = setTimeout(
				() =>
					validateUsernameAsync(
						formValues.username.value,
						setUsernameError,
						controler.signal
					),
				500
			);
			return () => {
				controler.abort();
				clearTimeout(timeoutId);
			};
		}
	}, [formValues.username.value, formValues.username.loading]);

	return { ...formValues, setName, setUsername };
};
