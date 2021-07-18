export const handleRequest = url => {
  try {
    return fetch(url, {})
      .then(async response => {
        if (response.ok) {
          return await response.json();
        }

        return Promise.reject(new Error('Could not fetch the result'));
      });
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};
