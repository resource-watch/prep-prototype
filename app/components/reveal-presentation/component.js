import Ember from 'ember';

export default Ember.Component.extend({
  isShowingContentModal: false,
  isShowingDownloadModal: false,
  tooltips: {
    up:false,
    down:false,
    left:false,
    right:false
  },
  animations: {
    up:false,
    down:false,
    left:false,
    right:true
  },
  slidesTitles:Em.A(),
  nextSlideTitle: 'Next slide',
  showTooltip: false,
  classNames: 'reveal-container',
  actions: {
    goToSlide: function(indexh,indexv) {
      this.toggleProperty('isShowingContentModal');
      Reveal.slide(indexh, indexv);
    },
    toggleModal: function(modal) {
      switch (modal) {
        case 'content':
          this.toggleProperty('isShowingContentModal');
          break;
        case 'download':
          this.toggleProperty('isShowingDownloadModal');
          break;
        default:
      }
    },
    downloadDashboard: function() {
      console.log('Download dashboard');
    },
  },

  didInsertElement: function() {
    this.slidesTitlesEl = this.$('#sliderTitles');
    this.setSlidesTitles();
    this.initializeReveal();
  },

  setSlidesTitles: function() {
    this.$('.slides > section').each(function(index,section){
      var sections = $(section).find('section');
      var sectionsLenght = sections.length;
      this.slidesTitles[index]= [];
      if (sectionsLenght) {
        sections.each(function(index2,slide){
          this.slidesTitles[index].push({title:slide.dataset.title,active:false});
        }.bind(this));
      } else {
        this.slidesTitles[index].push({title:section.dataset.title,active:false});
      }
    }.bind(this));
  },

  initializeReveal: function() {
    Reveal.initialize({
      controls: false,
      progress: false,
      slideNumber: true,
      history: false,
      keyboard: true,
      overview: true,
      center: true,
      touch: true,
      loop: false,
      hideAddressBar: true, // Hides the address bar on mobile devices
      transition: 'slide', // none/fade/slide/convex/concave/zoom
      transitionSpeed: 'default', // default/fast/slow
    });
    // Slide number formatting can be configured using these variables:
    //  "h.v":  horizontal . vertical slide number (default)
    //  "h/v":  horizontal / vertical slide number
    //    "c":  flattened slide number
    //  "c/t":  flattened slide number / total slides
    Reveal.slide(0, 0);
    Reveal.configure({ slideNumber: 'c/t' });
    Reveal.addEventListener( 'ready', function( event ) {
      this.updateSlidesInfo(event);
    }.bind(this));
    Reveal.addEventListener( 'slidechanged', function( event ) {
      this.updateSlidesInfo(event);
    }.bind(this));
  },

  updateSlidesInfo: function(event){
    this.updateActiveIndex();
    this.updateTitle(event.indexh,event.indexv);
    this.setTooltipVisibles();
    this.setAnimations();
  },

  updateActiveIndex: function() {
    var slidesTitles = this.get("slidesTitles");
    if (this.currentSlideActive) {
      Em.set(slidesTitles.objectAt(this.currentSlideActive.indexh).objectAt(this.currentSlideActive.indexv),'active',false);
    }
    this.currentSlideActive = this.getCurrentSlideIndex();
    Em.set(slidesTitles.objectAt(this.currentSlideActive.indexh).objectAt(this.currentSlideActive.indexv),'active',true);
  },

  getCurrentSlideIndex: function() {
    let index = Reveal.getIndices(Reveal.getCurrentSlide());
    index.v = index.v ? index.v:0;
    return {indexh:index.h,indexv:index.v};
  },

  updateTitle: function(indexh, indexv) {
    let title = this.slidesTitles[indexh][indexv].title;
    if(title.length > 50) title = title.slice(0, 50) + '…';
    this.slidesTitlesEl.html(title);
  },

  setAnimations: function(){
    this.set('animations', {
      up: this.getAnimationStatus('up'),
      down: this.getAnimationStatus('down'),
      left: this.getAnimationStatus('left'),
      right: this.getAnimationStatus('right')
    });
  },

  getAnimationStatus: function(position){
    let {indexh,indexv} = this.currentSlideActive;
    var isLastVerticalSlide = function (){
      return this.slidesTitles[indexh][indexv+1]? false:true;
    }.bind(this);
    switch (position) {
      case 'left':
        return isLastVerticalSlide();
      case 'right':
        return isLastVerticalSlide();
      case 'up':
        return isLastVerticalSlide();
      case 'down':
        return indexh>0 && indexv===0;
      default:
        return false;
    }
  },

  setTooltipVisibles: function(){
    this.set('tooltips', {
      up: this.getNextSlideTitle('up'),
      down: this.getNextSlideTitle('down'),
      left: this.getNextSlideTitle('left'),
      right: this.getNextSlideTitle('right')
    });
  },

  getNextSlideTitle: function(type) {
    let {indexh,indexv} = this.currentSlideActive;
    switch (type) {
      case 'left':
        indexv = 0;
        indexh = indexh-1;
        break;
      case 'right':
        indexv = 0;
        indexh = indexh+1;
        break;
      case 'up':
        indexv = indexv-1;
        break;
      case 'down':
        indexv = indexv+1;
        break;
      default:
    }
    if (this._indexInsideArray(indexh,indexv) && this.slidesTitles[indexh][indexv]){
      return this.slidesTitles[indexh][indexv].title;
    } else {
      return false;
    }
  },
  _indexInsideArray: function(indexh,indexv){
    if (indexh > -1 && indexh < this.slidesTitles.length){
      return indexv > -1 && indexv < this.slidesTitles[indexh].length;
    } else {
      return false;
    }
  }
});
