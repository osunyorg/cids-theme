window.cids = window.cids || {};

window.cids.Meta = function () {
  this.pageContent = document.querySelector('.document-content');
  this.sidebar = document.querySelector('.section-sidebar');
  this.personImage = document.querySelector('.hero .content > figure');

  if (window.innerWidth <= 768 || !this.personImage) {
    return;
  }

  this.updatePosition = this.updatePosition.bind(this);
  this.updateContentHeight = this.updateContentHeight.bind(this);

  this.init();
  this.addEventListeners();
};

window.cids.Meta.prototype = {
  init: function () {
    var self = this;

    this.updatePosition();
    this.updateContentHeight();

    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(function () {
        self.updatePosition();
        self.updateContentHeight();
      });
      this.resizeObserver.observe(this.personImage);
    }
  },

  updatePosition: function () {
    if (this.sidebar) {
      this.sidebar.style.top = this.personImage.offsetHeight + 'px';
    }
  },

  updateContentHeight: function () {
    var sidebarHeight = this.sidebar ? this.sidebar.offsetHeight : 0;
    sidebarHeight += this.personImage.offsetHeight;
    this.pageContent.style.minHeight = sidebarHeight + 'px';
  },

  addEventListeners: function () {
    var self = this;

    window.addEventListener('resize', function () {
      self.updatePosition();
      self.updateContentHeight();
    });

    window.addEventListener('load', function () {
      self.updatePosition();
      self.updateContentHeight();
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  if (document.body.classList.contains('persons__page')) {
    new window.cids.Meta();
  }
});