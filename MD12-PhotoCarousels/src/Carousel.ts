export class Carousel {
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

    target.appendChild(imgContainer);
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
