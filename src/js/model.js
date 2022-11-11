export const state = {
  currentComic: {},
  latestComicNum: 0,
};

// used https://github.com/Rob--W/cors-anywhere to solve the CORS issue when fetching data from xkcd api
const CORS_HEADER = "https://cors-anywhere-lambigegg.netlify.app";
const COMIC_URL = "https://xkcd.com";
const COMIC_JSON = "info.0.json";

const createComic = (data) => {
  const currentComic = data;
  return {
    month: currentComic.month,
    num: currentComic.num,
    link: currentComic.link,
    year: currentComic.year,
    news: currentComic.news,
    safe_title: currentComic.safe_title,
    transcript: currentComic.transcript,
    alt: currentComic.alt,
    img: currentComic.img,
    title: currentComic.title,
    day: currentComic.day,
  };
};

export const fetchComic = async (id = undefined) => {
  let requestUrl = "";
  if (id) {
    requestUrl = `${CORS_HEADER}/${COMIC_URL}/${id}/${COMIC_JSON}`;
  } else {
    requestUrl = `${CORS_HEADER}/${COMIC_URL}/${COMIC_JSON}`;
  }
  const res = await fetch(requestUrl);
  const data = await res.json();
  state.currentComic = createComic(data);
  if (state.latestComicNum < data.num) state.latestComicNum = data.num;
};
