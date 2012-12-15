/* developed by michael ruddy 2012 */

var ToryStrangePhotography = ToryStrangePhotography || {};

ToryStrangePhotography.ImageSwitcher = function(photos, $photoSwitcher) {
  if (!jQuery) { // depends on jQuery
    return;
  }
  this.timerHandle = null;
  this.currentIndex = 0; // which image is displayed
  this.sleepTime = 5000; // milliseconds between transitions
  this.photos = this.getValidPhotos(photos);
  this.$photoSwitcher = ($photoSwitcher instanceof jQuery) ? $photoSwitcher : new jQuery();
  this.valid = (this.photos.length > 0) && (this.$photoSwitcher.length === 1);
  this.setup();
};

ToryStrangePhotography.ImageSwitcher.prototype.getValidPhotos = function(photos) {
  var result = [];
  if (photos instanceof Array) {
    for (var i = 0; i < photos.length; i++) {
      if ("string" === typeof photos[i].bigurl) {
        result.push(photos[i]);
      }
    }
  }
  return result;
};

ToryStrangePhotography.ImageSwitcher.prototype.setup = function() {
  if (!this.valid) {
    return;
  }
  var temp = [];
  for (var i = 0; i < this.photos.length; i++) {
    temp.push('<span>' + (i + 1) + '</span>');
  }
  temp[this.currentIndex] = '<span class="active">' + (this.currentIndex + 1) + '</span>';
  this.$selectorDiv = jQuery('div.switcher-ui', this.$photoSwitcher);
  this.$selectorDiv.html(temp.join(''));
  var me = this;
  this.$spans = jQuery('span', this.$photoSwitcher);
  this.$spans.mouseenter(function () {
    var $this = jQuery(this);
    if (!$this.hasClass('active')) {
      me.switchPhoto($this.index());
    }
  });
  this.$image = jQuery('img', this.$photoSwitcher);
  this.$link = jQuery('a', this.$photoSwitcher);
  this.valid = this.valid && (this.$selectorDiv.length === 1) && (this.$spans.length > 0) && (this.$image.length === 1) && (this.$link.length === 1);
  this.preloadImages();
};

ToryStrangePhotography.ImageSwitcher.prototype.preloadImages = function() {
  if (!this.valid || !Image) {
    return;
  }
  for (var i = 0; i < this.photos.length; i++) {
    new Image().src = this.photos[i].bigurl;
  }
};

ToryStrangePhotography.ImageSwitcher.prototype.switchPhoto = function(switchToIndex) {
  if (!this.valid) {
    return;
  }
  this.stop();
  if (undefined === switchToIndex) {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
  } else {
    if (("number" === typeof switchToIndex) && (switchToIndex >= 0) && (switchToIndex < this.photos.length)) {
      this.currentIndex = switchToIndex;
    } else {
      return; // got bogus input
    }
  }
  var me = this;
  this.$image.fadeTo("fast", 0.01, function() {
    var photo = me.photos[me.currentIndex];
    me.$link.attr('href', photo.link);
    me.$spans.removeClass("active").eq(me.currentIndex).addClass("active");
    me.$image.attr('src', photo.bigurl).attr('title', photo.title).fadeTo("slow", 1);
    me.timerHandle = setTimeout(function() { me.switchPhoto(); }, me.sleepTime);
  });
};

ToryStrangePhotography.ImageSwitcher.prototype.start = function() {
  if (!this.valid) {
    return;
  }
  var me = this;
  me.timerHandle = setTimeout(function() { me.switchPhoto(); }, me.sleepTime);
};

ToryStrangePhotography.ImageSwitcher.prototype.stop = function() {
  if (this.timerHandle) {
    clearTimeout(this.timerHandle);
    this.timerHandle = null;
  }
};

ToryStrangePhotography.photos = [
  {
    'bigurl': 'images/x1000/light-offshore.png?v=20121212',
    'title': 'Light Offshore by Tory Strange',
    'category': 'Sunrise',
    'link': 'light-offshore.html'
  },
  {
    'bigurl': 'images/x1000/pier-into-the-distance.png?v=20121212',
    'title': 'Pier Into The Distance by Tory Strange',
    'category': 'Pier',
    'link': 'pier-into-the-distance.html'
  },
  {
    'bigurl': 'images/x1000/pier-sunrise.png?v=20121212',
    'title': 'Pier Sunrise by Tory Strange',
    'category': 'Pier',
    'link': 'pier-sunrise.html'
  },
  {
    'bigurl': 'images/x1000/lazy-day.png?v=20121212',
    'title': 'Lazy Day by Tory Strange',
    'category': 'Pier',
    'link': 'lazy-day.html'
  },
  {
    'bigurl': 'images/x1000/summer-swell.png?v=20121212',
    'title': 'Summer Swell by Tory Strange',
    'category': 'Surf',
    'link': 'summer-swell.html'
  },
  {
    'bigurl': 'images/x1000/cloud-bed.png?v=20121212',
    'title': 'Cloud Bed by Tory Strange',
    'category': 'Sunrise',
    'link': 'cloud-bed.html'
  },
  {
    'bigurl': 'images/x1000/tri-piling.png?v=20121212',
    'title': 'Tri-Piling by Tory Strange',
    'category': 'Pier',
    'link': 'tri-piling.html'
  },
  {
    'bigurl': 'images/x1000/morning-ray.png?v=20121212',
    'title': 'Morning Ray by Tory Strange',
    'category': 'Sunrise',
    'link': 'morning-ray.html'
  },
  {
    'bigurl': 'images/x1000/sky-alive.png?v=20121212',
    'title': 'Sky Alive by Tory Strange',
    'category': 'Sunrise',
    'link': 'sky-alive.html'
  },
  {
    'bigurl': 'images/x1000/dawn-patrol.png?v=20121212',
    'title': 'Dawn Patrol by Tory Strange',
    'category': 'Surf',
    'link': 'dawn-patrol.html'
  },
  {
    'bigurl': 'images/x1000/morning-oats.png?v=20121212',
    'title': 'Morning Oats by Tory Strange',
    'category': 'Beach',
    'link': 'morning-oats.html'
  },
  {
    'bigurl': 'images/x1000/shiny-shoal.png?v=20121212',
    'title': 'Shiny Shoal by Tory Strange',
    'category': 'Beach',
    'link': 'shiny-shoal.html'
  }
];
