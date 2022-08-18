import { useState } from 'react';
import { USER_ROLES } from '../../constants/userRoles';
import { useCreateForm } from '../../lib/hooks/UseCreateForm';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import CrossIcon from '../icons/CrossIcon';
import style from './UserCreateForm.module.css';

const UserCreateForm = ({ onClose }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username, name, setName, setUsername } = useCreateForm();

	const isDisabled =
		!username.value ||
		!name.value ||
		username.error ||
		name.error ||
		username.loading ||
		isSubmitting;

	return (
		<div className={style.wrapper}>
			<IconButton
				filled
				icon={CrossIcon}
				className={style.close}
				onClick={onClose}
			/>
			<form
				onSubmit={ev =>
					handleSubmit(ev, name, username, setIsSubmitting, onClose)
				}
			>
				<div className={style.row}>
					<InputText
						className={style.input}
						label='Nombre'
						placeholder='John Doe'
						error={name.error}
						value={name.value}
						onChange={ev => setName(ev.target.value)}
					/>
					<InputTextAsync
						className={style.input}
						label='Username'
						placeholder='John Doe'
						error={username.error}
						loading={username.loading}
						success={username.value && !username.error && !username.loading}
						value={username.value}
						onChange={ev => setUsername(ev.target.value)}
					/>
				</div>
				<div className={style.row}>
					<Select name='role'>
						<option value={USER_ROLES.TEACHER}>Profesor</option>
						<option value={USER_ROLES.STUDENT}>Alumno</option>
						<option value={USER_ROLES.OTHER}>Otro</option>
					</Select>
					<div className={style.active}>
						<InputCheckbox name='active' />
						<span>¿Activo?</span>
					</div>
					<Button type='submit' disabled={isDisabled}>
						{isSubmitting ? 'Cargando...' : 'Crear usuario'}
					</Button>
				</div>
			</form>
		</div>
	);
};

const handleSubmit = async (ev, name, username, setIsSubmitting, onClose) => {
	ev.preventDefault();

	setIsSubmitting(true);

	const user = {
		id: crypto.randomUUID(),
		username: username.value,
		name: name.value,
		role: ev.target.role.value,
		active: ev.target.active.checked
	};

	console.log(user);

	const res = await fetch('http://localhost:4000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	});

	if (res.ok) {
		// TODO: Actualizar los usuarios
		onClose();
	} else {
		setIsSubmitting(false);
	}
};

export default UserCreateForm;
