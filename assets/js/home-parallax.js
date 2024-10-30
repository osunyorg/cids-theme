window.cids = window.cids || {};

window.cids.HomeParallax = function () {
    this.hero = document.querySelector('.page__home .hero');
    this.imageContainer = this.hero.querySelector('figure');
    this.titleContainer = this.hero.querySelector('.hero-text');
    this.title = this.hero.querySelector('h1');

    if (!this.imageContainer) {
        return;
    }

    this.listen();
};

window.cids.HomeParallax.prototype = {
    listen: function() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    },
    onScroll: function () {
        var scrollLimit = this.imageContainer.offsetHeight;
        this.scrollY = window.scrollY;

        if (this.scrollY <= scrollLimit) {
            this.translateImage();
            this.hideTitle();
        }
    },
    translateImage: function() {
        var translateTop = -this.scrollY * 0.3;
        this.imageContainer.style.marginTop = `${translateTop}px`;
    },
    hideTitle: function() {
        var transitionTrigger = this.title.offsetHeight / 2;
        var opacity = 1 - (this.scrollY - transitionTrigger) / transitionTrigger;

        opacity = Math.max(0, Math.min(opacity, 1));
        this.title.style.opacity = opacity;
    }
};

window.addEventListener('load', function () {
    var cidsHomeParallax = new window.cids.HomeParallax();
});
