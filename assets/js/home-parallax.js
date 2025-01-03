window.cids = window.cids || {};

window.cids.HomeParallax = function () {
    this.hero = document.querySelector('.page__home .hero--with-image');

    if (window.innerWidth < 768 || !this.hero) {
        return;
    }

    this.titleContainer = this.hero.querySelector('.hero-text');
    this.title = this.hero.querySelector('h1');

    this.listen();
};

window.cids.HomeParallax.prototype = {
    listen: function() {
        this.checkScrollPosition();
        window.addEventListener('scroll', this.onScroll.bind(this));
    },
    onScroll: function () {
        this.scrollY = window.scrollY;

        this.hideTitle();
    },
    hideTitle: function() {
        this.title.style.setProperty('position', 'fixed')
        var transitionTrigger = this.title.offsetHeight / 2;
        var opacity = 1 - (this.scrollY - transitionTrigger) / transitionTrigger;

        opacity = Math.max(0, Math.min(opacity, 1));
        this.title.style.opacity = opacity;
    },
    checkScrollPosition: function() {
        this.scrollY = window.scrollY;
        var scrollLimit = this.hero.offsetHeight;

        if (this.scrollY > scrollLimit) {
            this.title.style.setProperty('opacity', '0');
        }
    },
};

window.addEventListener('load', function () {
    var cidsHomeParallax = new window.cids.HomeParallax();
});
