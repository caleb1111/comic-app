export const state = {
  currentComic: {},
  latestComicNum: 0,
};

// TODO: CAN ADD AN ERROR PAGE TO HANDLE THE BAD REQUESTS I.E. WHERE COMIC NUMBER < 0 => NO SUCH COMIC
const URL =
  "https://express-cors-comics-lambigegg.netlify.app/.netlify/functions/server";

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
    requestUrl = `${URL}/${id}`;
  } else {
    requestUrl = `${URL}`;
  }
  const res = await fetch(requestUrl);
  const data = await res.json();
  state.currentComic = createComic(data);
  if (state.latestComicNum < data.num) state.latestComicNum = data.num;
};
