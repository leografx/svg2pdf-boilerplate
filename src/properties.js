const margins = document.querySelectorAll('.margins')
const bleeds = document.querySelectorAll('.bleeds')
const isMarginLinkedBtn = document.querySelector('#margin-link');
const isBleedLinkedBtn = document.querySelector('#bleed-link');


export let props = {

    toggleLink: function(e) {

        if (e.target.getAttribute('src') === "assets/link-01.svg") {
            e.target.setAttribute('src', 'assets/broken-link.svg')
            e.target.setAttribute('alt', 'broken-link')
        } else {
            e.target.setAttribute('src', 'assets/link-01.svg')
            e.target.setAttribute('alt', 'link')
        }

        console.log(e.target)

    },
    changeMargins: function(e) {
        if (isMarginLinkedBtn.getAttribute('alt') === 'link') {
            margins.forEach(element => {
                element.value = e.target.value;
            });
        }
    },
    changeBleeds: function(e) {
        if (isBleedLinkedBtn.getAttribute('alt') === 'link') {
            bleeds.forEach(element => {
                element.value = e.target.value;
            });
        }
    }
}