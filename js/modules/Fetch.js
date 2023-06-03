export class Fetch {
  static async get(url) {
    this.url = url
    const response = await fetch(this.url);
    return await response.json()
  }
}
