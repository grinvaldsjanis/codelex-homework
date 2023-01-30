import { CarouselIndic } from "./CarouselIndic";

export class CarouselThumbs extends CarouselIndic {
  thumbWrapper: HTMLDivElement;
  thumbs: HTMLDivElement[];

  constructor(selector: string) {
    super(selector);
    this.thumbWrapper = this.createThumbWrapper();
    this.thumbs = this.createThumbs();
    this.swapThumbs();
    this.updateThumb();
  }

  swapThumbs() {
    this.rootElement.appendChild(this.thumbWrapper);
    this.rootElement.appendChild(this.indicatorWrapper);
  }

  createThumbWrapper(): HTMLDivElement {
    const thumbWrapper = document.createElement("div");
    thumbWrapper.classList.add("thumb-wrapper");
    this.rootElement.appendChild(thumbWrapper);
    return thumbWrapper;
  }

  createThumbs(): HTMLDivElement[] {
    let thumbs: HTMLDivElement[] = [];
    for (let i = 0; i < this.images.length; i++) {
      const thumb = document.createElement("img");
      thumb.src = this.images[i].src;
      thumb.classList.add("thumb");
      thumb.addEventListener("click", () => {
        this.swapImage(i - this.currImgIndex);
      });
      this.thumbWrapper.appendChild(thumb);
      thumbs.push(thumb);
    }
    return thumbs;
  }

  updateThumb() {
    this.thumbs.forEach((thumb, i) => {
      if (i === this.currImgIndex) {
        thumb.classList.add("thumb--current");
      } else {
        thumb.classList.remove("thumb--current");
      }
    });
  }

  swapImage(direction: number) {
    super.swapImage(direction);
    this.updateThumb();
  }
}
