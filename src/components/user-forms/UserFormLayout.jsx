import IconButton from '../buttons/IconButton';
import CrossIcon from '../icons/CrossIcon';
import style from './UserFormLayout.module.css';

const UserFormLayout = ({ onClose, children }) => (
	<div className={style.wrapper}>
		<IconButton
			filled
			icon={CrossIcon}
			className={style.close}
			onClick={onClose}
		/>
		{children}
	</div>
);
export default UserFormLayout;
