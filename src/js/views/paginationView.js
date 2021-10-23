import View from "./View";

class PaginationView extends View {
  _parentElement = document.getElementById("buttons");

  addHandleClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");

      if (!btn) return;

      const gotoId = +btn.dataset.goto;
      handler(gotoId);
    });
  }

  _generateMarkup() {
    const { currentComic, latestComicNum } = this._data;
    const currentPage = currentComic.num;
    const randomId = Math.floor(Math.random() * latestComicNum + 1);

    // change ID in URL
    window.history.pushState(null, "", `#${currentPage}`);

    if (currentPage === latestComicNum) {
      return `
        <div>
            <button class="btn" data-goto="${currentPage - 1}">
            <i class="fas fa-chevron-left"></i>&nbsp;Previous
            </button>
        </div>
        <div>
            <button class="btn" data-goto="${randomId}">
            <i class="fas fa-dice"></i>&nbsp;Random
            </button>
        </div>
        <div></div>`;
    }
    if (currentPage < latestComicNum && currentPage !== 1) {
      return `
        <div>
            <button class="btn" data-goto="${currentPage - 1}">
            <i class="fas fa-chevron-left"></i>&nbsp;Previous
            </button>
        </div>
        <div>
            <button class="btn" data-goto="${randomId}">
            <i class="fas fa-dice"></i>&nbsp;Random
            </button>
        </div>
        <div>
            <button class="btn" data-goto="${currentPage + 1}">
              Next&nbsp;<i class="fas fa-chevron-right"></i>
            </button>
        </div>`;
    }
    if (currentPage === 1) {
      return `
        <div></div>
        <div>
            <button class="btn" data-goto="${randomId}">
            <i class="fas fa-dice"></i>&nbsp;Random
            </button>
        </div>
        <div>
            <button class="btn" data-goto="${currentPage + 1}">
              Next&nbsp;<i class="fas fa-chevron-right"></i>
            </button>
        </div>`;
    }
  }
}

export default new PaginationView();
