import { container } from "webpack";

class Carousel {
  rootElement: HTMLDivElement;
  imgContainer: HTMLDivElement;
  images: HTMLImageElement[];
  currImgIndex: number;
  buttonWrapper: HTMLDivElement;
  nextButton: HTMLDivElement;
  prevButton: HTMLDivElement;
  prevImgIndex: number;
  imgNumber: number;

  constructor(selector: string) {
    this.rootElement = document.querySelector(selector);
    this.currImgIndex = 0;
    this.images = Array.from(this.rootElement.querySelectorAll(`img`));
    this.imgNumber = this.images.length;
    this.init();
  }

  init() {
    this.imgContainer = this.createImgContainer(this.images, this.rootElement);
    this.hideAll(this.images);
    this.unhideNeighbours(this.images, this.currImgIndex);
    this.buttonWrapper = this.createButtonWrapper();
    this.nextButton = this.createButton("next", "fa-solid fa-chevron-right");
    this.prevButton = this.createButton("prev", "fa-solid fa-chevron-left");
    this.handleBtnVisibility(this.currImgIndex);
  }

  createImgContainer(
    images: HTMLImageElement[],
    target: HTMLDivElement
  ): HTMLDivElement {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");

    images.forEach((image) => {
      image.classList.add("image");
      imgContainer.appendChild(image);
    });

    this.rootElement.appendChild(imgContainer);
    return imgContainer;
  }

  hideAll(elements: HTMLImageElement[]) {
    elements.forEach((element, i) => {
      element.classList.add("hidden");
    });
  }

  unhideNeighbours(images: HTMLElement[], index: number) {
    images.forEach((image, i) => {
      if (i === index) {
        image.classList.add("fade-in");
        image.classList.remove("fade-out");
      } else {
        image.classList.add("fade-out");
        image.classList.remove("fade-in");
      }

      if (Math.abs(i - index) > 1) {
        image.classList.add("hidden");
      } else {
        image.classList.remove("hidden");
      }
    });
  }

  createButtonWrapper(): HTMLDivElement {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    this.imgContainer.appendChild(buttonWrapper);
    return buttonWrapper;
  }

  createButton(type: string, iconStyle: string): HTMLDivElement {
    const button = document.createElement("div");
    // button.innerText = type;

    const span = document.createElement("span");
    span.className = "icon";
    const icon = document.createElement("i");
    icon.className = iconStyle;
    button.append(span);
    span.append(icon);

    button.classList.add("button", type);
    button.addEventListener("click", () => {
      if (type === "prev") {
        this.swapImage(-1);
      } else {
        this.swapImage(1);
      }
    });
    this.buttonWrapper.appendChild(button);
    return button;
  }

  handleBtnVisibility(index: number) {
    if (index <= 0) {
      this.prevButton.classList.add("button--hidden");
    } else {
      this.prevButton.classList.remove("button--hidden");
    }
    if (index >= this.imgNumber - 1) {
      this.nextButton.classList.add("button--hidden");
    } else {
      this.nextButton.classList.remove("button--hidden");
    }
  }

  swapImage(direction: number) {
    if (
      (direction === -1 && this.currImgIndex === 0) ||
      (direction === 1 && this.currImgIndex === this.imgNumber - 1)
    ) {
      return;
    }
    this.currImgIndex += direction;
    this.handleBtnVisibility(this.currImgIndex);
    this.unhideNeighbours(this.images, this.currImgIndex);
  }
}

class CarouselIndic extends Carousel {
  indicatorWrapper: HTMLDivElement;
  indicators: HTMLDivElement[];

  constructor(selector: string) {
    super(selector);
    this.indicatorWrapper = this.createIndicatorWrapper();
    this.indicators = this.createIndicators();
    this.updateIndicator();
  }

  createIndicatorWrapper(): HTMLDivElement {
    const indicatorWrapper = document.createElement("div");
    indicatorWrapper.classList.add("indicator-wrapper");
    this.rootElement.appendChild(indicatorWrapper);
    return indicatorWrapper;
  }

  createIndicators(): HTMLDivElement[] {
    let indicators: HTMLDivElement[] = [];
    for (let i = 0; i < this.images.length; i++) {
      const indicator = document.createElement("div");
      indicator.classList.add("indicator");
      indicator.addEventListener("click", () => {
        this.swapImage(i - this.currImgIndex);
      });
      this.indicatorWrapper.appendChild(indicator);
      indicators.push(indicator);
    }
    return indicators;
  }

  updateIndicator() {
    this.indicators.forEach((indicator, i) => {
      if (i === this.currImgIndex) {
        indicator.classList.add("indicator--current");
      } else {
        indicator.classList.remove("indicator--current");
      }
    });
  }

  swapImage(direction: number) {
    super.swapImage(direction);
    this.updateIndicator();
  }
}

class CarouselThumbs extends CarouselIndic {
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

class CarouselFullscreen extends CarouselThumbs {
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

const carousel1 = new Carousel(".carousel--1");
const carousel2 = new CarouselIndic(".carousel--2");
const carousel3 = new CarouselThumbs(".carousel--3");
const carousel4 = new CarouselFullscreen(".carousel--4");
