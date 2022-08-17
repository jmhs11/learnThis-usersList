import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions';

const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: SORT_OPTIONS.DEFAULT,
		page: 1,
		itemsPerPage: 2
	});

	const setSearch = search => setFilters({ ...filters, search, page: 1 });

	const setOnlyActive = onlyActive => {
		const newSortBy =
			onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE
				? SORT_OPTIONS.DEFAULT
				: filters.sortBy;

		setFilters({ ...filters, onlyActive, sortBy: newSortBy, page: 1 });
	};

	const setSortBy = sortBy => setFilters({ ...filters, sortBy });

	const setPage = newPage => setFilters({ ...filters, page: newPage });

	const setItemsPerPage = newItemsPerPage =>
		setFilters({ ...filters, itemsPerPage: newItemsPerPage });

	return {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setItemsPerPage
	};
};

export default useFilters;
