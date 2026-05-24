/**
 * Decode a JWT token payload without a library.
 * NOTE: This backend does NOT embed role in JWT claims.
 * Role is determined by calling the API after login.
 */
export function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// Get email (subject) from token
export function getEmailFromToken(token) {
  const claims = decodeToken(token);
  return claims?.sub || null;
}
