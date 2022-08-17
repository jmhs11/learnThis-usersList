import style from './IconButton.module.css';

const IconButton = ({
	kind = 'black',
	filled,
	icon: Icon,
	className,
	...props
}) => {
	const CLASSNAMES = {
		black: {
			normal: style.black,
			filled: style.blackFilled
		},
		red: {
			normal: style.red,
			filled: style.redFilled
		}
	};

	const classNames = CLASSNAMES[kind];
	const classNameKey = filled ? 'filled' : 'normal';
	const kindClassName = classNames[classNameKey];

	return (
		<button
			{...props}
			className={`${style.button} ${kindClassName} ${className}`}
		>
			<Icon className={style.icon} />
		</button>
	);
};

export default IconButton;
