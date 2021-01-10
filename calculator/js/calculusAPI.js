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

    // Handle operations
    document.querySelector('#calc').onsubmit = () => {
        const exp = document.querySelector('#poly').value;

        const opr = document.querySelector('#validationCustom04').value;
        const operation = (opr === 'derive') ? 'derivative' : 'integral';
        const constant = (opr === 'derive') ? '' : ' + C';

        fetch(`https://newton.now.sh/api/v2/${opr}/${exp}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#answer').innerHTML = `The ${operation} of ${exp} is ${data.result}${constant}`;
            });

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