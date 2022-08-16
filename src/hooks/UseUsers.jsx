import { useState } from 'react';

const useUsers = initialUsers => {
	const [users] = useState(initialUsers);

	return {
		users
	};
};

export default useUsers;
