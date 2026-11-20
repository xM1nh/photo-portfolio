"use strict";

const photoDialog = document.querySelector(".photo-dialog");

if (typeof photoDialog?.showModal === "function") {
  const fullPhoto = photoDialog.querySelector("img");
  const fullCaption = photoDialog.querySelector("figcaption");
  const photos = new Map();

  for (const plate of document.querySelectorAll(".plate[data-photo]")) {
    const id = plate.dataset.photo;
    photos.set(id, {
      thumbnail: plate.querySelector("img"),
      caption: document.getElementById(id).querySelector(".work-name").textContent,
    });
  }

  for (const link of document.querySelectorAll("a[data-photo]")) {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const photo = photos.get(link.dataset.photo);
      if (!photo) return;

      event.preventDefault();
      fullPhoto.src = link.href;
      fullPhoto.alt = photo.thumbnail.alt;
      fullPhoto.width = Number(photo.thumbnail.getAttribute("width"));
      fullPhoto.height = Number(photo.thumbnail.getAttribute("height"));
      fullCaption.textContent = photo.caption;
      photoDialog.showModal();
    });
  }

  photoDialog.querySelector(".photo-close").addEventListener("click", () => photoDialog.close());

  photoDialog.addEventListener("click", (event) => {
    if (event.target !== photoDialog) return;
    const bounds = photoDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      photoDialog.close();
    }
  });
}
