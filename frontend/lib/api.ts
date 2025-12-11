// frontend/lib/api.ts

/**
 * A wrapper around the native fetch function that automatically injects the session_id.
 * It retrieves the session_id from localStorage and adds it to the request body
 * for 'POST' requests or as a query parameter for other request types.
 *
 * @param url The URL to fetch.
 * @param options The options for the fetch request.
 * @returns A Promise that resolves to the Response object.
 */
export async function fetchWithSession(
  url: string | URL,
  options: RequestInit = {}
): Promise<Response> {
  const sessionId = localStorage.getItem('session_id');

  if (!sessionId) {
    console.error('Session ID not found. Please ensure SessionProvider is working.');
    // Optionally, you could throw an error or handle session creation here.
    // For now, we proceed without it, but logging an error is crucial.
  }

  const modifiedOptions: RequestInit = { ...options };

  // Example for POST with urlencoded data, as seen in chat/page.tsx
  if (modifiedOptions.method?.toUpperCase() === 'POST' && modifiedOptions.body instanceof URLSearchParams) {
    modifiedOptions.body.append('session_id', sessionId || '');
  }
  // You can add more logic here for other request types, e.g., JSON bodies
  else if (modifiedOptions.method?.toUpperCase() === 'POST' && typeof modifiedOptions.body === 'string') {
      try {
        const body = JSON.parse(modifiedOptions.body);
        body.session_id = sessionId;
        modifiedOptions.body = JSON.stringify(body);

        if (modifiedOptions.headers) {
            (modifiedOptions.headers as Record<string, string>)['Content-Type'] = 'application/json';
        } else {
            modifiedOptions.headers = { 'Content-Type': 'application/json' };
        }

      } catch (e) {
        console.error("Failed to parse body as JSON, cannot inject session_id", e);
      }
  }
  // For GET requests, you might append it as a query parameter
  else {
    const urlObject = new URL(url.toString(), window.location.origin);
    if (sessionId) {
      urlObject.searchParams.append('session_id', sessionId);
    }
    url = urlObject.toString();
  }


  return fetch(url, modifiedOptions);
}
