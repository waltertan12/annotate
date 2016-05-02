// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var insertScript = `
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

  document.head.innerHTML += '<style>#annotations-close:hover { cursor: pointer; }::selection {  color: gray;  background: #E8FAFE; } body {font-family: sans-serif;} .annotations {  position: fixed;  width: 300px;  background-color: #fff; height: 100%;  top: 0;  right: -100%; z-index: 100000; transition-duration: 300ms} .annotations-list {list-style-type: none;}</style>';

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
`;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.extension.getBackgroundPage().console.log(tab);
  chrome.tabs.executeScript({
    code: insertScript
  });
});