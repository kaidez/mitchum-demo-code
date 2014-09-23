scroll = do ->
  $('.row').scrollNav({
    showHeadline: false
    showTopLink: false
    sectionElem: 'div'
    speed: 600
    insertTarget: this.containerElement
    insertLocation: 'prependTo',
  });


container = document.getElementById('containerElement');
msnry = new Masonry( container, {

  columnWidth: 300
  itemSelector: '.masonryImage'
  "gutter": 10
});
