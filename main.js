document.addEventListener('mouseup', (event) => {
  var annotations = document.getElementById('annotations');
  var selection = document.getSelection(),
      selectionString = selection.toString(),
      range, customTag, annotation;

  if (selectionString.length > 0) {
    annotation = prompt('Annotate this!');
    
    annotations.innerHTML += '<li>' + '"' +
      selectionString + '"' +
      ': '  + 
      annotation + 
      '</li>';

    range = selection.getRangeAt(0);
    customTag = document.createElement('mark');
    customTag.textContent = selectionString;
    customTag.style.cursor = 'pointer';

    customTag.addEventListener('mouseenter', (event) => {
      event.target.style.backgroundColor = "#d3f9e9";
    });

    customTag.addEventListener('mouseleave', (event) => {
      event.target.style.backgroundColor = "#bcf6de";
    });

    customTag.addEventListener('click', (event) => {
      alert('You\'ve annotated the web!');
    })

    range.deleteContents();
    range.insertNode(customTag);
  }
}, false);