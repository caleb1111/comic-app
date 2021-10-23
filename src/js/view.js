const renderComic = (currentComic) => {
  const comicElement = document.getElementById("comic");
  const htmlTemplate = `
    <h2 class="comic_title">${currentComic.title}</h2>
            <div class="comic_img_container">
              <div>
                <img
                  src="${currentComic.img}"
                  alt="${currentComic.alt}"
                />
              </div>
            </div>
            <p class="comic_time"><span>Date Created: </span>${currentComic.year}/${currentComic.month}/${currentComic.day}</p>
            <p class="comic_transcript" id="comic_transcript">
            </p>
    `;
  comicElement.innerHTML = "";
  comicElement.insertAdjacentHTML("beforeend", htmlTemplate);
  parseTranscript(currentComic.transcript);
};

const parseTranscript = (transcript) => {
  const transcriptDiv = document.getElementById("comic_transcript");
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
  transcriptDiv.insertAdjacentHTML("beforeend", htmlTemplate);
};

const updateUrlAndRenderBtns = (state) => {
  const { currentComic, latestComicNum } = state;
  const previousBtn = document.getElementById("previous");
  const nextBtn = document.getElementById("next");
  // change ID in URL
  window.history.pushState(null, "", `#${currentComic.num}`);
  if (currentComic.num === latestComicNum) {
    nextBtn.classList.add("hidden");
  }
  if (currentComic.num < latestComicNum) {
    nextBtn.classList.remove("hidden");
  }
  if (currentComic.num === 1) {
    previousBtn.classList.add("hidden");
  }
  if (currentComic.num > 1) {
    previousBtn.classList.remove("hidden");
  }
};

export const render = (state) => {
  const { currentComic } = state;

  updateUrlAndRenderBtns(state);
  renderComic(currentComic);
};
