scroll = do ->
  $(".row").scrollNav({
    showHeadline: false
    showTopLink: false
    sectionElem: "div"
    speed: 600
    insertTarget: this.headerElements
    insertLocation: "appendTo",
  });

msnry = new Masonry( "#containerElement", {
  columnWidth: 300
  itemSelector: ".masonryImage"
  "gutter": 10
});
