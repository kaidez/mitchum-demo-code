var container, msnry, scroll;

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

container = document.getElementById('containerElement');

msnry = new Masonry(container, {
  columnWidth: 200,
  itemSelector: '.mas'
});
