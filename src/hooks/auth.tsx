import React, { useContext, createContext, ReactNode, useState } from 'react';

import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
  children: ReactNode;
};

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  singnInWithGoogle(): Promise<void>; 
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({  } as IAuthContextData);
  const [user, setUser] = useState<User>({} as User);

  async function singnInWithGoogle() {
    try {
      const CLIENT_ID = '1077178368381-vvi5vkl3higio9oiiamb81r5olb1rmsk.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@deividalan/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = 
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if(type === 'success'){
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const useInfo = await response.json();

        setUser({
          id: useInfo.id,
          email: useInfo.email,
          name: useInfo.given_name,
          photo: useInfo.picture 
        });
      }
      
    } catch (error) {
      throw new Error(error);
    }
  }


function AuthProvider({ children }: AuthProviderProps ){
  return(
    <AuthContext.Provider value={{ user, singnInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(){
  const context = useContext(AuthContext);
  
  return context;
}

export { AuthProvider, useAuth }

