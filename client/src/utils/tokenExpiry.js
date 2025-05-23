import { jwtDecode }from "jwt-decode";
import Cookies from "js-cookie";

export const tokenExpiry = () => {
  const token = Cookies.get("auth_token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const expired = decoded.exp < currentTime;
    if (expired) {
      console.log("Token has expired.");
    }
    return expired;
  } catch (err) {
    console.log("Failed to decode token:", err);
    return true;
  }
};