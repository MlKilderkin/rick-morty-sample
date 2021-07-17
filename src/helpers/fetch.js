export const handleRequest = url => {
  try {
    return fetch(url, {})
      .then(async response => {
        if (response.ok) {
          return await response.json();
        }

        const errorMessage = await response.text();
        return Promise.reject(new Error(errorMessage));
      });
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
}
