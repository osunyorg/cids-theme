window.cids = window.cids || {};

window.cids.Toc = function () {
  this.summary = document.querySelector('.extended-summary');
  if (!this.summary) {
    return;
  }
  this.floatingToc = document.querySelector('.document-content > .toc-cta');
  window.addEventListener('scroll', this.onScroll.bind(this))
};

window.cids.Toc.prototype = {
  onScroll: function () {
    var rect = this.summary.getBoundingClientRect();

    if (rect.y < -rect.height) {
      this.floatingToc.classList.add('is-visible');
    } else {
      this.floatingToc.classList.remove('is-visible');
    }
  }
};

window.addEventListener('load', function () {
  var cidsToc = new window.cids.Toc();
});
