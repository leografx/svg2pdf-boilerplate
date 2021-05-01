import { svg } from './svg.js'
import { props } from './properties.js'

const marginLink = document.querySelector('#margin-link');
const saveBtn = document.querySelector('#save-btn');
const margins = document.querySelectorAll('.form-group .margins');

saveBtn.addEventListener('click', svg.save);
marginLink.addEventListener('click', props.toggleLinkMargin);
margins.forEach(elm => elm.addEventListener('change', props.changeMargins))