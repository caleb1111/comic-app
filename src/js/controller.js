import * as model from "./model";

const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const randomBtn = document.getElementById("random");
const comicElement = document.getElementById("comic");
const comicSection = document.getElementsByClassName("comic_content")[0];

window.addEventListener("hashchange", async () => {
  const id = window.location.hash.slice(1);
  if (!id) return;

  await model.getComic(id);
  updateUrl();
  renderComic();
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
  await loadCurrentComic();
  updateUrl();
  renderComic();
});

previousBtn.addEventListener("click", async () => {
  await model.getPreviousComic();
  updateUrl();
  renderComic();
});

nextBtn.addEventListener("click", async () => {
  await model.getNextComic();
  updateUrl();
  renderComic();
});

randomBtn.addEventListener("click", async () => {
  await model.getRandomComic();
  updateUrl();
  renderComic();
});

const renderComic = () => {
  const { currentComic } = model.state;
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

const loadCurrentComic = async () => {
  await model.getCurrentComic();
};

const parseTranscript = (transcript) => {
  const transcriptDiv = document.getElementById("comic_transcript");
  let htmlTemplate = "";
  const transcripts = transcript
    .split("\n")
    .filter(
      (transcript) =>
        transcript !== "" && !transcript.toLowerCase().includes("title text")
    )
    .forEach((transcript) => (htmlTemplate += `<p>${transcript}</p>`));
  transcriptDiv.insertAdjacentHTML("beforeend", htmlTemplate);
};

const updateUrl = () => {
  const { currentComic, latestComicNum } = model.state;
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
