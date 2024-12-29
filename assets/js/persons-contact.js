window.cids = window.cids || {};

window.cids.ContactDetails = function () {
  this.taxonomies = document.querySelector('.taxonomies-single');
  this.contactDetails = document.querySelector('.contacts-details');
  
  if (!this.taxonomies || !this.contactDetails || window.innerWidth <= 768) {
    return;
  }
  
  this.updatePosition();
  this.updatePosition = this.updatePosition.bind(this);  
  this.addEventListeners();
};

window.cids.ContactDetails.prototype = {
  updatePosition: function () {
    var taxoTop = this.taxonomies.offsetTop;
    var taxoHeight = this.taxonomies.offsetHeight;
    var positionFromTop = taxoTop + taxoHeight;
        
    this.contactDetails.style.position = 'absolute';
    this.contactDetails.style.top = positionFromTop + 'px';
  },
  
  addEventListeners: function () {
    var self = this;
    
    window.addEventListener('resize', function() {
      self.updatePosition();
    });
    
    window.addEventListener('load', function() {
      self.updatePosition();
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  if (document.body.classList.contains('persons__page')) {
    new window.cids.ContactDetails();
  }
});