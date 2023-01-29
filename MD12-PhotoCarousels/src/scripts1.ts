// class Carousel {
//     rootElement:HTMLDivElement;
//     images: HTMLImageElement[];
//     currImgIndex: number;
//     buttonWrapper:HTMLDivElement;
//     nextButton: HTMLButtonElement;
//     prevButton: HTMLButtonElement;

//     constructor(selector: string, directory: string) {
//         this.images = this.createImages(directory);
//         this.rootElement = document.querySelector(selector);
//         // this.images = Array.from(this.rootElement.querySelectorAll(`img`));
//         console.log(this.images)
//         this.currImgIndex = 0;
//         this.images.forEach(image => image.classList.add('hidden'));
//         this.buttonWrapper = this.createButtonWrapper();
//         this.nextButton = this.createButton("next");
//         this.prevButton = this.createButton("prev");
//         this.displayCurrentImage();
//     }

//     createButtonWrapper(): HTMLDivElement {
//         const buttonWrapper = document.createElement('div');
//         buttonWrapper.classList.add('button-wrapper');
//         this.rootElement.appendChild(buttonWrapper);
//         return buttonWrapper;
//     }

//     createButton(type: string): HTMLButtonElement {
//         const button = document.createElement('button');
//         button.innerText = type;
//         button.classList.add(type);
//         button.addEventListener('click', () => {
//             if (type === 'prev') {
//                 this.previousImage();
//             } else {
//                 this.nextImage();
//             }
//         });
//         this.buttonWrapper.appendChild(button);
//         return button;
//     }

//     previousImage() {
//         if (this.currImgIndex === 0) {
//             return;
//         }
//         this.currImgIndex -= 1;
//         this.displayCurrentImage();
//     }

//     nextImage() {
//         if (this.currImgIndex === this.images.length - 1) {
//             return;
//         }
//         this.currImgIndex += 1;
//         this.displayCurrentImage();
//     }

//     displayCurrentImage() {
//         this.images.forEach(image => image.classList.add('hidden'));
//         this.images[this.currImgIndex].classList.remove('hidden');
//         this.prevButton.classList.toggle('hidden', this.currImgIndex === 0);
//         this.nextButton.classList.toggle('hidden', this.currImgIndex === this.images.length - 1);
//     }
    
// }

// const carousel = new Carousel('.carousel--1','.assets/images/');
