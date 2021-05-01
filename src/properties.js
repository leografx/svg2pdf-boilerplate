const margins = document.querySelectorAll('.margins')
const isLinkedBtn = document.querySelector('#margin-link');

export let props = {

    toggleLinkMargin: function(e) {

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
        if (isLinkedBtn.getAttribute('alt') === 'link') {
            margins.forEach(element => {
                element.value = e.target.value;
            });
        }
    }
}