var msnry, scroll;

scroll = (function() {
  return $(".row").scrollNav({
    showHeadline: false,
    showTopLink: false,
    sectionElem: "div",
    speed: 600,
    insertTarget: this.containerElement,
    insertLocation: "prependTo"
  });
})();

msnry = new Masonry("#containerElement", {
  columnWidth: 300,
  itemSelector: ".masonryImage",
  "gutter": 10
});
