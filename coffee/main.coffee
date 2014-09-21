scroll = do ->
  $('.row').scrollNav({
    showHeadline: false
    showTopLink: false
    sectionElem: 'div'
    speed: 600
    insertTarget: this.containerElement
    insertLocation: 'prependTo',
  });
