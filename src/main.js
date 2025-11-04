// ====== Kütüphaneler ======
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// ====== DOM öğeleri ======
const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector("#loader");

// ====== API Ayarları ======
const API_KEY = "53081449-0d1e064c0b2c3f50b0b9354c8"; 
const BASE_URL = "https://pixabay.com/api/";

// ====== Lightbox örneği ======
let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

// ====== Loader kontrolü ======
function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

// ====== Form gönderimi ======
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = e.target.elements.query.value.trim();
  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search term!",
      position: "topRight",
    });
    return;
  }

  gallery.innerHTML = "";
  showLoader();

  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo&orientation=horizontal&safesearch=true`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        title: "No Results",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

    const markup = data.hits
      .map(
        (img) => `
        <li class="gallery-item">
          <a href="${img.largeImageURL}">
            <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><b>Likes</b> ${img.likes}</p>
            <p><b>Views</b> ${img.views}</p>
            <p><b>Comments</b> ${img.comments}</p>
            <p><b>Downloads</b> ${img.downloads}</p>
          </div>
        </li>
      `
      )
          .join("");

    gallery.innerHTML = markup;
    lightbox.refresh();
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: "Error",
      message: "Something went wrong! Please try again later.",
      position: "topRight",
    });
    console.error("Fetch error:", error);
    }

});
