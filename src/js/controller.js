import * as model from "./model";
import * as view from "./view";

const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const randomBtn = document.getElementById("random");
const comicSection = document.getElementsByClassName("comic_content")[0];

window.addEventListener("hashchange", async () => {
  const id = window.location.hash.slice(1);
  if (!id) return;

  await model.fetchComic(id);
  view.render(model.state);
});

window.addEventListener("load", async () => {
  const containerHeight = window.innerHeight;
  const headerHeight =
    document.getElementsByClassName("header")[0].scrollHeight;
  const footerHeight =
    document.getElementsByClassName("footer")[0].scrollHeight;
  comicSection.style.height = `${
    containerHeight - headerHeight - footerHeight
  }px`;
  await model.fetchComic();
  view.render(model.state);
});

previousBtn.addEventListener("click", async () => {
  const id = model.state.currentPage - 1;
  await model.fetchComic(id);
  view.render(model.state);
});

nextBtn.addEventListener("click", async () => {
  const id = model.state.currentPage + 1;
  await model.fetchComic(id);
  view.render(model.state);
});

randomBtn.addEventListener("click", async () => {
  const randomId = Math.floor(Math.random() * model.state.latestComicNum + 1);
  await model.fetchComic(randomId);
  view.render(model.state);
});
