import View from "./View";

class ComicView extends View {
  _parentElement = document.getElementById("comic");
  _transcriptElement = document.getElementById("comic_transcript");

  addHandlerRenderOnload(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerRenderOnHashChange(handler) {
    window.addEventListener("hashchange", handler);
  }

  _generateMarkup() {
    const { currentComic } = this._data;
    return `
    <h2 class="comic_title">${currentComic.title}</h2>
    <div class="comic_img_container">
        <div>
        <img
            src="${currentComic.img}"
            alt="${currentComic.alt}"
        />
        </div>
    </div>
    <p class="comic_time"><span>Date Created: </span>${currentComic.year}/${
      currentComic.month
    }/${currentComic.day}</p>
    <div class="comic_transcript" id="comic_transcript">${this._generateTranscript(
      currentComic.transcript
    )}</div>
    `;
  }

  _generateTranscript = (transcript) => {
    let htmlTemplate = "";
    transcript
      .split("\n")
      .filter(
        (transcript) =>
          transcript !== "" &&
          !transcript.toLowerCase().includes("title text") &&
          !transcript.toLowerCase().includes("alt")
      )
      .forEach((transcript) => (htmlTemplate += `<p>${transcript}</p>`));
    return htmlTemplate;
  };
}

export default new ComicView();
