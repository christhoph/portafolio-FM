const loader = document.getElementById("loader");

setTimeout(() => loader.classList.add("hide"), 3500);

window.addEventListener("load", () => {
  let grid;

  setTimeout(() => {
    grid = new Muuri(".grid", {
      layout: { rounding: false }
    });

    grid.refreshItems().layout();
    gridEl.classList.add("page-loaded");
  }, 3000);

  const searchInput = document.getElementById("gallery-search");

  searchInput.addEventListener("input", ({ target: { value } }) =>
    grid.filter(item => item.getElement().dataset.tags.includes(value))
  );

  const tabLinks = document.querySelectorAll(".category");

  tabLinks.forEach(el => {
    el.addEventListener("click", () => {
      tabLinks.forEach(el => el.classList.remove("active"));
      el.classList.add("active");

      const category = el.innerHTML.toLowerCase();

      category === "todos"
        ? grid.filter("[data-category]")
        : grid.filter(`[data-category="${category}"]`);
    });
  });

  const gridEl = document.querySelector(".grid");
  const template = (src, description, category, tags) => `
    <div
      class="item"
      data-description="${description}"
      data-category="${category}"
      data-tags="${tags}"
    >
      <div class="item-contenido">
        <img src=${src} alt="">
      </div>
    </div>
  `;

  imageData.map(({ src, description, category, tags }) =>
    gridEl.insertAdjacentHTML(
      "beforeend",
      template(src, description, category, tags)
    )
  );

  const overlay = document.getElementById("overlay");
  const images = document.querySelectorAll(".grid .item img");

  images.forEach((el, index) => {
    const route = el.getAttribute("src");
    const description = imageData[index].description;
    const overlayImage = document.querySelector("#overlay img");
    const overlayDescription = document.querySelector("#overlay .description");

    el.addEventListener("click", () => {
      overlay.classList.add("show");
      overlayImage.src = route;
      overlayDescription.innerHTML = description;
    });
  });

  const hideOverlay = document.getElementById("hide-overlay");

  hideOverlay.addEventListener("click", () => overlay.classList.remove("show"));
  overlay.addEventListener("click", ({ target: { id } }) =>
    id === "overlay" ? overlay.classList.remove("show") : ""
  );

  const currentYear = new Date().getFullYear();
  const yearText = document.getElementById("year");

  yearText.innerHTML = currentYear;
});
