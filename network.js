class Network {
  async getArticles(url) {
    const response = await fetch(url);

    if (response.status === 200) {
      return await response.json();
    }

    throw new Error('Something went wrong ' + response.status);
  }
}