const timeStep = 3;
const placeholder = "Enter text here";
const colorSet5 = ['#1FC2AE', '#EDF67D', '#CA7DF9', '#F9B5AC', '#EE7674'];
const allBoxColor = "#18D5E1"


//
// ---Initialize base structure
//
const body = document.body;
const wrapper = document.createElement('section');
wrapper.className = "wrapper";
const menuContainer = document.createElement('div');
menuContainer.className = "container container--menu";
const boxesContainer = document.createElement('div');
boxesContainer.className = "container container--boxes";
const lastContainer = document.createElement('div');
lastContainer.className = "container container--last";

// -- Append structure
body.append(wrapper);
wrapper.append(menuContainer);
wrapper.append(boxesContainer);
wrapper.append(lastContainer);
// -- buttons

// ---Initialize Top buttons
const buttonTooltipTexts = [
    'Make 1st square yellow',
    "Change text in 2nd square to 'Success'",
    '3rd square becomes invisible',
    'Toggle visibility of 4th square',
    'Toggle random color to 5th square',
    '6th square Counts to 10 at speed 1/3sec.',
];

for (let i = 0; i < 6; i++) {
    const button = document.createElement("div");
    // button.type = 'button';
    button.classList.add(`button`);
    button.classList.add(`button--${i + 1}`);
    button.id = (`button${i + 1}`);
    button.setAttribute("data-tooltip", buttonTooltipTexts[i]);
    button.innerHTML = (`Button ${i + 1}`);
    menuContainer.appendChild(button);
}

// -7 - bottom button
const button7 = document.createElement('div');
// button7.type = 'button';
button7.className = 'button button--7';
button7.setAttribute('data-tooltip', 'All the squares change color to #18D5E1, background turns into #000');
button7.innerHTML = 'Button7';


//
// ---Initialize Green squares
// -1

const boxTexts = [
    "",
    "FAIL",
    "",
    "",
    "0",
    "0"
];

for (let i = 0; i < 6; i++) {
    const square = document.createElement("div");
    square.classList.add(`square`);
    square.classList.add(`square--${i + 1}`);
    square.id = (`square${i + 1}`);
    square.setAttribute("data-tooltip", `square ${i + 1}`);
    square.innerHTML = (boxTexts[i]);
    boxesContainer.appendChild(square);
}

//
// ---Initialize input textfield and text p
//
const textField = document.createElement('input');
textField.type = 'text';
textField.className = 'text-field';

//
const text = document.createElement('p');
text.className = 'text';

//
// --- Append all other the elements
lastContainer.append(button7);
// -- Input and text
lastContainer.append(textField);
lastContainer.append(text);

//---------------------------------------------------------------------------
// ---Text field function
textField.placeholder = placeholder;
text.textContent = placeholder;
textField.addEventListener("input", () => {
    if (!textField.value) {
        text.textContent = placeholder;
    } else {
        text.textContent = textField.value;
    }
});

// ---First button changes 1st box to yellow
let button1 = document.querySelector<HTMLButtonElement>("#button1");
let square1 = document.querySelector<HTMLButtonElement>("#square1");
button1.addEventListener("click", () => {
    square1.style.backgroundColor = 'yellow';
});
// - change color on hover

let originalColor1 = square1.style.backgroundColor;
square1.addEventListener("mouseover", () => {
    square1.style.backgroundColor = "red";
    square1.style.transition = "1s";
});
square1.addEventListener("mouseout", () => {
    square1.style.backgroundColor = originalColor1;
    square1.style.transition = "1s";
});

// --- Second button changes text to SUCCESS

let box2Changed = false;
let button2 = document.getElementById("button2") as HTMLButtonElement;
let square2 = document.getElementById("square2") as HTMLButtonElement;
button2.addEventListener("click", () => {
    if (!box2Changed) {
        square2.innerHTML = "SUCCESS";
        box2Changed = true;
    }
});

// ---Third button makes third box disappear

let button3 = document.getElementById("button3") as HTMLButtonElement;
let square3 = document.getElementById("square3") as HTMLButtonElement;
button3.addEventListener("click", () => {
    square3.style.opacity = '0';
});

// ---Fourth button makes forth box disappear and appear;

let box4isVisible = true;
let button4 = document.getElementById("button4") as HTMLButtonElement;
let square4 = document.getElementById("square4") as HTMLButtonElement;
button4.addEventListener("click", () => {
    box4isVisible = !box4isVisible;
    square4.style.opacity = box4isVisible ? "1" : "0";
});

// ---Fifth button changes background of 5th box between 5 colors
let button5 = document.getElementById("button5") as HTMLButtonElement;
let square5 = document.getElementById("square5") as HTMLButtonElement;
button5.addEventListener("click", () => {
    let randomColor;
    do {
        randomColor = colorSet5[Math.floor(Math.random() * colorSet5.length)];
    } while (randomColor === square5.style.backgroundColor);
    square5.style.backgroundColor = randomColor;
});
// - The timer on hover over the 5th square

let timer5 = 0;
let interval: any;

square5.addEventListener("mouseover", () => {
    interval = setInterval(() => {
        timer5++;
        square5.innerHTML = timer5.toString();
        if (timer5 === 10) {
            clearInterval(interval);
        }
    }, 200);
});

square5.addEventListener("mouseout", () => {
    timer5 = 0;
    square5.innerHTML = "0";
    clearInterval(interval);
});

// --6th button makes timer from 1 to 10 with 3sec delay

let countN = 1;
let button6 = document.getElementById("button6") as HTMLButtonElement;
let square6 = document.getElementById("square6") as HTMLButtonElement;
//
button6.addEventListener("click", () => {
    button6.disabled = true;
    if (countN <= 10) {
        square6.innerHTML = countN.toString();
        countN++;
        setTimeout(() => {
            button6.dispatchEvent(new Event("click"));
        }, 3000);
    } else {
        button6.disabled = false;
        button6.addEventListener("click", resetCount);
    }
});

const resetCount = () => {
    countN = 1;
    button6.removeEventListener("click", resetCount);
};

// --7th button changes color of all the buttons to # and also background color of body

let backgroundReal = true;
const squares = [square1, square2, square3, square4, square5, square6];
button7.addEventListener("click", () => {
    backgroundReal = !backgroundReal;
    for (const square of squares) {
        square.style.backgroundColor = allBoxColor;
        square.style.opacity = "1"
    }

    body.style.backgroundColor = backgroundReal ? "white" : "black";
    text.style.color = backgroundReal ? "black" : "white";
});

// -- 

class Tooltip {
    private tooltip: HTMLElement;

    constructor(private el: HTMLElement) {
        this.el.addEventListener('mouseenter', this.showTooltip.bind(this));
        this.el.addEventListener('mouseleave', this.hideTooltip.bind(this));
        this.el.addEventListener('mousemove', this.moveTooltip.bind(this));
    }

    showTooltip(event: MouseEvent) {
        const tooltipText = this.el.getAttribute("data-tooltip");
        if (tooltipText) {
            if (!this.tooltip) {
                this.tooltip = document.createElement('span');
                this.tooltip.classList.add('tooltip');
                this.tooltip.innerText = tooltipText;
                this.el.appendChild(this.tooltip);
            }
            this.tooltip.style.display = 'block';
        }
    }

    hideTooltip() {
        if (this.tooltip)
            this.tooltip.style.display = 'none';
    }

    moveTooltip(event: MouseEvent) {
        if (this.tooltip) {
            let buttonRect = this.el.getBoundingClientRect();
            this.tooltip.style.top = (event.clientY - buttonRect.top + 20) + 'px';
            this.tooltip.style.left = (event.clientX - buttonRect.left - 60) + 'px';
        }
    }
}

const divs = document.querySelectorAll('[data-tooltip]');
divs.forEach((div: Element) => new Tooltip(div as HTMLElement));