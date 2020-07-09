function setInitialColor() {
    if (!localStorage.getItem('color')) {
        localStorage.setItem('color', "#008cff");
    }

    let color = localStorage.getItem('color');
    document.querySelector('#header').style.backgroundColor = color;
    document.querySelector('#sub1').style.backgroundColor = color;
    document.querySelector('#sub2').style.backgroundColor = color;
    document.querySelector('#badge').style.backgroundColor = color;
    document.querySelector('#c').value = color;
}

function add(n1,m1) {
    for (let i = 0; i < n1; i++) {
        for (let j = 0; j < m1; j++) {
            document.querySelector(`#a${i}${j}`).innerHTML = parseInt(document.querySelector(`#f${i}${j}`).value)
                + parseInt(document.querySelector(`#s${i}${j}`).value);
        }
    }
    unhideBadge();
}

function sub(n1,m1) {
    for (let i = 0; i < n1; i++) {
        for (let j = 0; j < m1; j++) {
            document.querySelector(`#a${i}${j}`).innerHTML = parseInt(document.querySelector(`#f${i}${j}`).value)
                - parseInt(document.querySelector(`#s${i}${j}`).value);
        }
    }
    unhideBadge();
}

function mul(n1,m1,m2) {
    for (let i = 0; i < n1; i++) {
        for (let j = 0; j < m2; j++) {
            let sum = 0;
            for (let k = 0; k < m1; k++) {
                sum += parseInt(document.querySelector(`#f${i}${k}`).value)
                    * parseInt(document.querySelector(`#s${k}${j}`).value);
            }
            document.querySelector(`#a${i}${j}`).innerHTML = sum;
        }
    }
    unhideBadge();
}

function displaySizeMismatch() {
    const answerMatrix = document.querySelector('#answerMatrix');

    answerMatrix.innerHTML = "The dimensions of the given matrices need to be the same for the requested operation."
}

function displayUncompatibleMatrices() {
    const answerMatrix = document.querySelector('#answerMatrix');

    answerMatrix.innerHTML = "The dimensions of the given matrices aren't compatible for matrix multiplication."
}

function loadAnswerMatrix(n3, m3) {
    const answerMatrix = document.querySelector('#answerMatrix');

    let aM = "";

    for (let i = 0; i < n3; i++) {
        aM += "<div class=\"row\">";
        for (let j = 0; j < m3; j++) {
            aM += `<div class=\"col-sm\" style=\"position:
                 relative; margin-top: 20px;\" id=\"a${i}${j}\"></div>`;
        }
        aM += "</div>";
    }

    answerMatrix.innerHTML = aM;
}

function hideElements() {
    document.querySelector('#calc').style.display = "none";
    document.querySelector('#badge').style.display = "none";
}

function unhideElements() {
    document.querySelector('#calc').style.display = "block";
}

function unhideBadge() {
    document.querySelector('#badge').style.display = "block";
}

document.addEventListener('DOMContentLoaded', function () {

    // Load previous color (or) create new color entry in local storage
    setInitialColor();

    // Hide submit and operations button till size is chosen
    hideElements();

    // Handle operations
    document.querySelector('#sub1').onclick = () => {
        const n1 = parseInt(document.querySelector('#n1').value);
        const m1 = parseInt(document.querySelector('#m1').value);
        const n2 = parseInt(document.querySelector('#n2').value);
        const m2 = parseInt(document.querySelector('#m2').value);

        const firstMatrix = document.querySelector('#firstMatrix');
        const secondMatrix = document.querySelector('#secondMatrix');

        let fM = "";
        let sM = "";

        for (let i = 0; i < n1; i++) {
            fM += "<div class=\"row\">";
            for (let j = 0; j < m1; j++) {
                fM += `<div class=\"col-sm\"><input type=\"text\" style=\"position:
                 relative; margin-top: 20px;\" class=\"form-control\" id=\"f${i}${j}\"></div>`;
            }
            fM += "</div>";
        }

        for (let i = 0; i < n2; i++) {
            sM += "<div class=\"row\">";
            for (let j = 0; j < m2; j++) {
                sM += `<div class=\"col-sm\"><input type=\"text\" style=\"position:
                 relative; margin-top: 20px;\" class=\"form-control\" id=\"s${i}${j}\"></div>`;
            }
            sM += "</div>";
        }

        firstMatrix.innerHTML = fM;
        secondMatrix.innerHTML = sM;

        unhideElements();

        return false;
    };

    // Handle Matrix Operations
    document.querySelector('#calc').onsubmit = () => {
        const n1 = parseInt(document.querySelector('#n1').value);
        const m1 = parseInt(document.querySelector('#m1').value);
        const n2 = parseInt(document.querySelector('#n2').value);
        const m2 = parseInt(document.querySelector('#m2').value);

        switch (document.querySelector('#option').value) {
            case "add": {
                if (n1 === n2 && m1 === m2) {
                    loadAnswerMatrix(n1,m1);
                    add(n1,m1);
                } else {
                    displaySizeMismatch();
                }
                break;
            }
            case "sub": {
                if (n1 === n2 && m1 === m2) {
                    loadAnswerMatrix(n1,m1);
                    sub(n1,m1);
                } else {
                    displaySizeMismatch();
                }
                break;
            }
            case "mul": {
                if (n2 === m1) {
                    loadAnswerMatrix(n1,m2);
                    mul(n1,n2,m2);
                } else {
                    displayUncompatibleMatrices();
                }
                break;
            }
            default: {
                document.querySelector('#answer').innerHTML = `Invalid Operation.`;
            }
        }

        return false;
    };

    // Handle color change
    document.querySelector('#c').onchange = function () {
        document.querySelector('#header').style.backgroundColor = this.value;
        document.querySelector('#sub1').style.backgroundColor = this.value;
        document.querySelector('#sub2').style.backgroundColor = this.value;
        document.querySelector('#badge').style.backgroundColor = this.value;
        localStorage.setItem('color', this.value);
    };
}); 