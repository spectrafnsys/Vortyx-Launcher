export type NewsItem = {
  id: number;
  about: {
    author: string;
    date: string;
    image: string;
    hasVideo: boolean;
    video: string;
  };
  body: {
    message: string;
    title: string;
    width: number;
    height: number;
  };
};
