'use strict';

console.log('Annoytate! This will really annoy you...');
var annotations = document.createElement('div');
annotations.id = 'annotations';
annotations.className = 'annotations';
document.body.appendChild(annotations);

var close = document.createElement('div');
close.textContent = 'X';
close.id = 'annotations-close';
close.addEventListener('click', (event) => {
      annotations.style.right = '-100%';
});

annotations.appendChild(close);

var annotationsList = document.createElement('ul');
annotationsList.id = 'annotations-list';
annotationsList.className += 'annotations-list';
annotations.appendChild(annotationsList);

document.head.innerHTML += `
  <style>
    #annotations-close:hover { 
      cursor: pointer; 
    }
    ::selection {  
      color: gray;  
      background: #E8FAFE; 
    }
    .annotations {  
      position: fixed;  
      width: 300px;  
      background-color: #fff; 
      height: 100%;  top: 0;  
      right: -100%; 
      z-index: 100000; 
      transition-duration: 300ms
    }
    .annotations-list {
      list-style-type: none;
    }
  </style>
`;