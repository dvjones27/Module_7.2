import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { auth, Providers } from '../config/firebase'

interface Props {
    children: React.ReactNode;
}

// const auth = getAuth();
// getRedirectResult(auth)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;

//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

const AuthChecker = ({ children}: Props) => {
  const navigate = useNavigate();
  // This will just check if the user is logged in, if so, it returns the children
  // (which are passed as props - it's just whatever component is either protected
  // or not)
  // otherwise it sends them to the login route
  useEffect(() => {
    if (!auth.currentUser) {
        navigate("../")
        signInWithRedirect(auth, Providers.google)
        
        // add fetch request for flask login 
    }
  }, []),
  
  useEffect(() => {
    fetch("/signup")
    .then(response => response.json()
    .then(profileData => {
      console.log(profileData)
    })
  )}, []);
  
  return (
    <>{children}</>
  )
}

export default AuthChecker