import {Joke} from '../model/Joke';

export default class JokeAPI {
  private async send(request: any): Promise<Joke> {
    const url = 'https://v2.jokeapi.dev/joke/programming?idRange=0-100';
    try {
      const response = await fetch(url, request);
      const json: Joke = await response.json();
      return json;
    } catch (error) {
      throw error;
    }
  }

  public async getJoke(): Promise<Joke> {
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return await this.send(request);
  }
}
