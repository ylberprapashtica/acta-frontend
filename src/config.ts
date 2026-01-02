/**
 * Dynamically determines the API URL based on the current hostname.
 * This allows the app to work when accessed from other devices on the local network.
 */
function getApiUrl(): string {
  // If explicitly set via environment variable, use that (for production)
  // if (import.meta.env.VITE_API_URL) {
  //   console.log('[Config] Using VITE_API_URL from env:', import.meta.env.VITE_API_URL);
  //   return import.meta.env.VITE_API_URL;
  // }

  // Get the current hostname (e.g., 'localhost', '192.168.1.27', etc.)
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = '3000'; // Backend port

  console.log('[Config] Detected hostname:', hostname, 'protocol:', protocol);

  // If accessing via localhost or 127.0.0.1, use localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const url = `http://localhost:${port}`;
    console.log('[Config] Using localhost URL:', url);
    return url;
  }

  // Otherwise, use the current hostname (IP address or domain)
  // Always use http for local network (not https)
  const url = `http://${hostname}:${port}`;
  console.log('[Config] Using network URL:', url);
  return url;
}

// Export as a getter function to ensure it's evaluated at runtime
export const getAPIUrl = getApiUrl;
export const API_URL = getApiUrl(); 