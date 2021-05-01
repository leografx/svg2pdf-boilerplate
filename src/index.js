import { svg } from './svg.js'
import { props } from './properties.js'

const marginLink = document.querySelector('#margin-link');
const bleedLink = document.querySelector('#bleed-link');
const saveBtn = document.querySelector('#save-btn');
const margins = document.querySelectorAll('.form-group .margins');
const bleeds = document.querySelectorAll('.form-group .bleeds');

saveBtn.addEventListener('click', svg.save);
marginLink.addEventListener('click', props.toggleLink);
bleedLink.addEventListener('click', props.toggleLink);
margins.forEach(elm => elm.addEventListener('change', props.changeMargins))
bleeds.forEach(elm => elm.addEventListener('change', props.changeBleeds))