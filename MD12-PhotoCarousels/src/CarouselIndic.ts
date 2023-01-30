import { Carousel } from "./Carousel";

export class CarouselIndic extends Carousel {
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
