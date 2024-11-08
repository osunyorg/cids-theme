window.cids = window.cids || {};

window.cids.Testimonial = function () {
    this.testimonials = document.querySelectorAll('.block-testimonials .testimonials');
    if (!this.testimonials && window.innerWidth > 768) {
        return;
    }
    
    this.pattern = document.querySelector('.quote-background');
    this.listen();
};

window.cids.Testimonial.prototype = {
    listen: function() {
        for (var i = 0; i < this.testimonials.length; i++) {
            this.setClonedPattern(this.testimonials[i]);
            window.addEventListener('scroll', this.onScroll(this.testimonials[i]).bind(this));
          }
    },
    setClonedPattern: function(element) {
        // Get pattern from hook and put it on tesimonials block
        var clonedPattern = this.pattern.cloneNode(true);
        element.appendChild(clonedPattern);
        this.newPattern = element.querySelector('.quote-background');
        this.GetPatternLength(this.newPattern);
    },
    GetPatternLength: function (pattern) {
        this.patternPath = pattern.querySelector('path');
        this.patternLength = this.patternPath.getTotalLength();
        this.patternPath.style.strokeDashoffset = this.patternLength;
        this.patternPath.style.strokeDasharray = this.patternLength;
    },
    onScroll: function (element) {
        var containerTop = element.getBoundingClientRect().top;
        
    }
};

window.addEventListener('load', function () {
    var cidsTestimonial = new window.cids.Testimonial();
});