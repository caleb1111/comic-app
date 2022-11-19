import * as model from "./model";
import paginationView from "./views/paginationView";
import comicView from "./views/comicView";

const controlComicLoad = async () => {
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
