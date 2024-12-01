export type Joke = {
  setup: string;
  punchline?: string;
  type?: string;
  joke?: string;
  delivery?: string;
  rating?: number;
};

export type JokeApiResponse = {
  type: string;
  setup?: string;
  delivery?: string;
  joke?: string;
};

export type JokesComponentProps = {
  isFavorites: boolean;
  jokes: Joke[];
  loading: boolean;
  error?: string | null;
};

export type JokeItemProps = {
  joke: Joke;
  index: number;
  onReveal: (index: number) => void;
  onSave: (joke: Joke) => void;
  onRate: (index: number, rating: number) => void;
  isFavorites: boolean;
};

export type JokesComponentEmits = {
  (event: "fetchMoreJokes", category: string): void;
  (event: "toggleCategory", category: string): void;
  (event: "updateJokeRating", joke: Joke): void;
};

export type ModalEmits = {
  close: () => void;
};

export type SearchFilterState = {
  searchQuery: string;
  sortOption: "alphabetically" | "rating";
  filterRating: string;
};
