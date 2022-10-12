import { useEffect, useState } from 'react';
import { findUserByUsername } from '../api/usersApi';
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
		if (!formValues.username.loading) return;

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
	}, [formValues.username.value, formValues.username.loading]);

	const isFormValid =
		!formValues.username.value ||
		!formValues.name.value ||
		formValues.username.error ||
		formValues.name.error ||
		formValues.username.loading;

	return { ...formValues, setName, setUsername, isFormValid };
};

const validateUsernameAsync = async (username, setUsernameError, signal) => {
	const { user, error, aborted } = await findUserByUsername(username, signal);

	if (aborted) return;
	if (error) return setUsernameError('Error al validar');

	setUsernameError(user ? 'Ya esta en uso' : undefined);
};
