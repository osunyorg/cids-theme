window.cids = window.cids || {};

window.cids.ContactDetails = function () {
  this.pageContent = document.querySelector('.document-content');
  this.sidebar = document.querySelector('.section-sidebar');
  this.personImage = document.querySelector('.hero .content > figure')

  if (window.innerWidth <= 768) {
    return;
  }
  
  this.updatePosition();
  this.updatePosition = this.updatePosition.bind(this);  
  this.updateContentHeight();
  this.addEventListeners();
};

window.cids.ContactDetails.prototype = {
  updatePosition: function () {
    if (this.sidebar) {
      this.sidebar.style.top = this.personImage.offsetHeight + 'px';
    }
  },

  updateContentHeight: function() {
    var self = this;
    var sidebarHeidht = this.sidebar ? this.sidebar.offsetHeight : 0,
        sidebarHeight = sidebarHeidht + this.personImage.offsetHeight;
    
    this.pageContent.style.minHeight = `calc(${sidebarHeight}px)`;
  },
  
  addEventListeners: function () {
    var self = this;
    
    window.addEventListener('resize', function() {
      self.updatePosition();
      self.updateContentHeight();
    });
    
    window.addEventListener('load', function() {
      self.updatePosition();
      self.updateContentHeight();
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  if (document.body.classList.contains('persons__page')) {
    new window.cids.ContactDetails();
  }
});