/* eslint-disable no-console */
import { onAuthStateChanged } from 'firebase/auth';
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { getUserByEmail } from 'utils/data/users';
import { auth } from 'utils/firebase';

export const AuthContext = createContext();

export function useAuthContext() {
	return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [appInitialized, setAppInitialized] = useState(false);
	const refreshAuthState = useCallback(async () => {
		try {
			const currUser = auth.currentUser;
			if (currUser) {
				const currUserObj = await getUserByEmail(currUser.email);
				setUser(currUserObj);
			} else {
				setUser(null);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setAppInitialized(true);
		}
	}, []);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async () => {
			unsubscribe();
			refreshAuthState();
		});
	}, [refreshAuthState]);

	const contextValue = useMemo(
		() => ({
			user,
			appInitialized,
			refreshAuthState,
		}),
		[user, appInitialized, refreshAuthState]
	);
	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}
