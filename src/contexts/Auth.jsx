import React, { createContext, useContext, useMemo, useState } from 'react';

export const AuthContext = createContext();

export function useAuthContext() {
	return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const contextValue = useMemo(
		() => ({
			user,
			setUser,
		}),
		[user]
	);
	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}
