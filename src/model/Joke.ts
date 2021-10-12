interface JokeFlag {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}

export interface Joke {
  error: boolean;
  category: string;
  type: string;
  joke: string;
  setup: string;
  delivery: string;
  flags: JokeFlag;
  id: number;
  safe: boolean;
  lang: string;
}
