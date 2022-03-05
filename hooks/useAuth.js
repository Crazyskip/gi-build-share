import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../firebase/firebase.config";
import { checkNewUser, getUsername } from "../firebase/firebase.utils";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(
      firebaseAuth,
      (currentUser) => {
        if (currentUser) {
          loggedIn(currentUser).then((response) => {
            setUser(response.currentUser);
            setIsLoading(false);
          });
        } else {
          setUser(currentUser);
          setIsLoading(false);
        }
      }
    );

    return unsubscribeFromAuth;
  });

  const loggedIn = async (currentUser) => {
    await checkNewUser(currentUser);
    const username = await getUsername(currentUser.uid);
    currentUser.username = username;
    return { currentUser };
  };

  const signin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithRedirect(firebaseAuth, googleProvider);
  };

  const signout = () => {
    firebaseAuth.signOut();
  };

  return {
    user,
    isLoading,
    signin,
    signout,
  };
};
