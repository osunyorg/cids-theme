window.cids = window.cids || {};

window.cids.ContactDetails = function () {
  this.pageContent = document.querySelector('.document-content');
  this.taxonomies = document.querySelector('.taxonomies-container');
  this.contactDetails = document.querySelector('.contacts-details');
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
    if (this.taxonomies) {
      var taxoTop = this.taxonomies.offsetTop;
      var taxoHeight = this.taxonomies.offsetHeight;
      var positionFromTop = taxoTop + taxoHeight;
    }
      
    if (this.contactDetails) {
      this.contactDetails.style.position = 'absolute';
      this.contactDetails.style.top = positionFromTop + 'px';
    }
  },

  updateContentHeight: function() {
    var self = this;
    var contactDetailsHeidht = this.contactDetails ? this.contactDetails.offsetHeight : 0,
        taxonomiesHeidht = this.taxonomies ? this.taxonomies.offsetHeight : 0,
        sidebarHeight = taxonomiesHeidht + contactDetailsHeidht + this.personImage.offsetHeight;
    
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