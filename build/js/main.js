var scroll;

scroll = (function() {
  return $('.row').scrollNav({
    showHeadline: false,
    showTopLink: false,
    sectionElem: 'div',
    speed: 600,
    insertTarget: this.containerElement,
    insertLocation: 'prependTo'
  });
})();
