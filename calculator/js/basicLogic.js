function setInitialColor() {
    if (!localStorage.getItem('color')) {
        localStorage.setItem('color', "#008cff");
    }

    let color = localStorage.getItem('color');
    document.querySelector('#header').style.backgroundColor = color;
    document.querySelector('#sub').style.backgroundColor = color;
    document.querySelector('#c').value = color;
}

function hideElements() {
    document.querySelector('#blk').style.display = "none";
}

function unhideElements() {
    document.querySelector('#blk').style.display = "block";
}

document.addEventListener('DOMContentLoaded', function () {
    
    // Load previous color (or) create new color entry in local storage
    setInitialColor();

    hideElements();

    // Handle arithmetic operations
    document.querySelector('#calc').onsubmit = () => {
        const a = parseInt(document.querySelector('#f').value);
        const b = parseInt(document.querySelector('#s').value);
        switch (document.querySelector('#validationCustom04').value) {
            case "add": {
                document.querySelector('#answer').innerHTML = `The sum of ${a} and ${b} is ${a + b}.`;
                break;
            }
            case "sub": {
                document.querySelector('#answer').innerHTML = `The difference of ${a} and ${b} is ${a - b}.`;
                break;
            }
            case "mul": {
                document.querySelector('#answer').innerHTML = `The product of ${a} and ${b} is ${a * b}.`;
                break;
            }
            case "div": {
                if (b === 0) {
                    document.querySelector('#answer').innerHTML = `Divison by zero not allowed.`;
                } else {
                    document.querySelector('#answer').innerHTML = `${a} divided by ${b} is ${a / b}.`;
                }
                break;
            }
            default: {
                document.querySelector('#answer').innerHTML = `Invalid Operation.`;
            }
        }

        unhideElements();
        return false;
    };

    // Handle color change
    document.querySelector('#c').onchange = function () {
        document.querySelector('#header').style.backgroundColor = this.value;
        document.querySelector('#sub').style.backgroundColor = this.value;
        localStorage.setItem('color', this.value);
    }
}); 