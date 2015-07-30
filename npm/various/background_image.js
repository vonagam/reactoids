'use strict';

var backgroundImage;

backgroundImage = function(url) {
  if (!url) {
    return;
  }
  return {
    backgroundImage: "url(" + url + ")"
  };
};

module.exports = backgroundImage;
