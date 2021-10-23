import * as model from "./model";
import paginationView from "./views/paginationView";
import comicView from "./views/comicView";

const comicSection = document.getElementsByClassName("comic_content")[0];

const controlComicLoad = async () => {
  const containerHeight = window.innerHeight;
  const headerHeight =
    document.getElementsByClassName("header")[0].scrollHeight;
  const footerHeight =
    document.getElementsByClassName("footer")[0].scrollHeight;
  comicSection.style.height = `${
    containerHeight - headerHeight - footerHeight
  }px`;
  await model.fetchComic();
  comicView.render(model.state);
  paginationView.render(model.state);
};

const controlComicOnHashChange = async () => {
  const id = window.location.hash.slice(1);
  if (!id) return;
  await model.fetchComic(id);
  comicView.render(model.state);
  paginationView.render(model.state);
};

const controlPagination = async (gotoPage) => {
  await model.fetchComic(gotoPage);
  comicView.render(model.state);
  paginationView.render(model.state);
};

const init = function () {
  comicView.addHandlerRenderOnload(controlComicLoad);
  comicView.addHandlerRenderOnHashChange(controlComicOnHashChange);
  paginationView.addHandleClick(controlPagination);
};

init();
