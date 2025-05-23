import { jwtDecode  }from "jwt-decode";
import Cookies from "js-cookie";

export const tokenExpiry = () => {
  const token = Cookies.get("auth_token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (err) {
    return true; // if invalid token, treat as expired
  }
};