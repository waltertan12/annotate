'use strict';

var scripts = [
  'js/insertScript.js',
  'js/listeners.js'
  ],
  index, scriptTag;

for (index = 0; index < scripts.length; index++) {
  scriptTag = document.createElement('script');
  scriptTag.src = chrome.extension.getURL(scripts[index]);
  (document.head || document.documentElement).appendChild(scriptTag);
}