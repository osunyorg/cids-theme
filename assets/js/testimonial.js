window.cids = window.cids || {};

var patternClass = '.quote-background';

window.cids.Testimonial = function () {
    this.testimonials = document.querySelectorAll('.block-testimonials .testimonials, .page__home .hero figure');
    if (!this.testimonials || window.innerWidth < 768) {
        return;
    }
    
    this.pattern = document.querySelector(patternClass);
    this.listen();
};

window.cids.Testimonial.prototype = {
    listen: function() {
        for (var i = 0; i < this.testimonials.length; i++) {
            this.setClonedPattern(this.testimonials[i]);
            this.setupPattern(this.testimonials[i]);
        }
        
        window.addEventListener('scroll', this.onScroll.bind(this));
    },
    
    setClonedPattern: function(element) {
        // Get pattern from hook and put it on tesimonials block
        var clonedPattern = this.pattern.cloneNode(true);
        element.appendChild(clonedPattern);
    },
    
    setupPattern: function(element) {
        // Setup everything for each pattern : hide svg
        var newPattern = element.querySelector(patternClass),
            patternPath = newPattern.querySelector('path'),
            patternLength = patternPath.getTotalLength();

        // stock everything to use it in scroll
        element.patternPath = patternPath;
        element.patternLength = patternLength;

        element.patternPath.style.strokeDashoffset = patternLength;
        element.patternPath.style.strokeDasharray = patternLength;
    },
    
    onScroll: function () {
        var windowHeight = window.innerHeight;
        
        for (var i = 0; i < this.testimonials.length; i++) {
            var element = this.testimonials[i],
                containerTop = element.getBoundingClientRect().top,
                distance = element.offsetHeight,
                speed = element.scrollSpeedFactor = (element.matches('.hero figure')) ? 1 : 1.5; // not sure about that : added speed to display entire pattern before ending animation > slowlier for home animation
            
            if (containerTop < windowHeight && containerTop > -distance) {
                var patternPath = element.patternPath,
                    patternLength = element.patternLength;

                // use element distance values to increase svg strokes
                var scrollProgress = Math.max(0, Math.min(1, (windowHeight - containerTop) / (windowHeight + distance)));
                var offset = patternLength * (1 - (scrollProgress * speed));

                offset = Math.max(0, Math.min(patternLength, offset)); // avoid reverse effect

                patternPath.style.strokeDashoffset = offset;
                patternPath.style.strokeDasharray = patternLength;
            }
        }
    }
};

window.addEventListener('load', function () {
    var cidsTestimonial = new window.cids.Testimonial();
});
