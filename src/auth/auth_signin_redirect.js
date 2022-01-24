import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from '../firebase';

signInWithRedirect(auth,provider);

