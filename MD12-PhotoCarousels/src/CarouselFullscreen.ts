import { CarouselThumbs } from "./CarouselThumbs";

export class CarouselFullscreen extends CarouselThumbs {
  fullscreenBtn: HTMLDivElement;
  slideshowBtn: HTMLDivElement;
  // buttonsContainer: HTMLDivElement;
  isFullscreen: boolean;
  slideshowInterval: number;
  slidePeriod: number;

  constructor(selector: string) {
    super(selector);
    this.slidePeriod = 3000;
    this.fullscreenBtn = this.createFullscreenBtn();
    this.slideshowBtn = this.createSlideshowButton();
    this.isFullscreen = false;
    this.addFullScreenListener();
  }

  addFullScreenListener() {
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        this.showUiElements();
      }
    });
  }

  createFullscreenBtn(): HTMLDivElement {
    const btn = document.createElement("div");
    btn.innerHTML = '<i class="fa-solid fa-expand"></i>';
    btn.className = "carousel__fullscreen-btn small-btn";
    btn.addEventListener("click", this.toggleFullscreen.bind(this));
    this.buttonWrapper.appendChild(btn);
    return btn;
  }

  createSlideshowButton(): HTMLDivElement {
    const btn = document.createElement("div");
    btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    btn.className = "carousel__slideshow-btn small-btn";
    btn.addEventListener("click", this.startSlideshow.bind(this));
    this.buttonWrapper.appendChild(btn);
    return btn;
  }

  hideUiElements(): void {
    this.indicatorWrapper.classList.add("hidden");
    this.thumbWrapper.classList.add("hidden");
    this.fullscreenBtn.classList.add("hidden");
    this.slideshowBtn.classList.add("hidden");
    this.buttonWrapper.classList.add("hidden");
    this.imgContainer.classList.remove("image-container");
    this.imgContainer.classList.add("image-container--fullscreen");
  }

  showUiElements(): void {
    this.indicatorWrapper.classList.remove("hidden");
    this.thumbWrapper.classList.remove("hidden");
    this.fullscreenBtn.classList.remove("hidden");
    this.slideshowBtn.classList.remove("hidden");
    this.buttonWrapper.classList.remove("hidden");
    this.imgContainer.classList.remove("image-container--fullscreen");
    this.imgContainer.classList.add("image-container");
  }

  toggleFullscreen(): void {
    if (document.fullscreenElement) {
      this.showUiElements();

      document.exitFullscreen();
    } else {
      this.hideUiElements();

      this.rootElement.requestFullscreen();
    }
  }

  startSlideshow() {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
      this.slideshowBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
      this.slideshowInterval = null;
    } else {
      this.slideshowInterval = window.setInterval(() => {
        this.swapImage(1);
        if (this.currImgIndex === this.images.length - 1) {
          this.currImgIndex = 0;
        }
      }, this.slidePeriod);
      this.slideshowBtn.innerHTML = '<i class="fa-solid fa-circle-stop"></i>';
    }
  }

  stopSlideshow(): void {
    clearInterval(this.slideshowInterval);
  }
}
