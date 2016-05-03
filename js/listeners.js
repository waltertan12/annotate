'use strict';

var id = 0;

document.addEventListener('mouseup', (event) => {
  var annotations = document.getElementById('annotations');
  var selection = document.getSelection(),
      idNumber = id,
      selectionString = selection.toString(),
      range, customTag, annotation;

  if (selectionString.length > 0) {
    annotation = prompt('Annotate this!');
    console.log(annotation);
    if (annotation) {
      var annotationListItem = document.createElement('li');
      annotationListItem.innerHTML = '<strong>' + selectionString + '</strong>: ' + annotation;
      annotationListItem.id = 'annotation-' + id;

      annotations.appendChild(annotationListItem);
      annotations.style.right = '0%';

      range = selection.getRangeAt(0);
      customTag = document.createElement('mark');
      customTag.textContent = selectionString;
      customTag.style.cursor = 'pointer';
      customTag.id = 'annotation-' + id;

      customTag.addEventListener('mouseenter', (event) => {
        event.target.style.backgroundColor = "#d3f9e9";
      });

      customTag.addEventListener('mouseleave', (event) => {
        event.target.style.backgroundColor = "#bcf6de";
      });

      customTag.addEventListener('click', (event) => {
        annotations.style.right = '0%';
      });

      range.deleteContents();
      range.insertNode(customTag);

      annotationListItem.addEventListener('click', (event) => {
        console.log(idNumber);
        var annotatedTextElement = document.getElementById('annotation-' + idNumber);
        var x = annotatedTextElement.getBoundingClientRect().left,
            y = annotatedTextElement.getBoundingClientRect().top;
        window.scroll(x, y);
      });

      id++;
    }
  }
}, false);