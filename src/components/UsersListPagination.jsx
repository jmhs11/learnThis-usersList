import Select from './forms/Select';
import styles from './UsersListPagination.module.css';

const UsersListPagination = ({
	page,
	itemsPerPage,
	setPage,
	setItemsPerPage
}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.itemsPerPage}>
				<Select
					value={itemsPerPage}
					onChange={ev => setItemsPerPage(ev.target.value)}
				>
					<option value={2}>2</option>
					<option value={4}>4</option>
					<option value={6}>6</option>
				</Select>
				<p>Elementos por página</p>
			</div>
		</div>
	);
};

export default UsersListPagination;
