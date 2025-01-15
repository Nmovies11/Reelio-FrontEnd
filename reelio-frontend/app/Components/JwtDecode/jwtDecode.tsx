import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: number;
  exp: number;  // Expiry time
  iat: number;  // Issued at time
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