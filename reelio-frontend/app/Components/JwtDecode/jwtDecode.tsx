import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: number;
  exp: number;  
  iat: number;  
}

const decodeToken = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export default decodeToken;