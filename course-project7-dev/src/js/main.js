/* ----------------------------------- */
/* ------ Custom ------ */
/* ----------------------------------- */
// -- Detect Browser
// 偵測瀏覽器加入對應 js 文件
function isMobile() {
  try {
    document.createEvent('TouchEvent')
    return true;
  } catch (e) {
    return false;
  }
}
if (!isMobile()) {
  var explorer = navigator.userAgent
  if (explorer.indexOf('Firefox') > -1) {
    $('body').append('<script async src="js/smooth-scrolling-chrome.js"></script>')
  } else if (explorer.indexOf('Chrome') > -1) {
    $('body').append('<script async src="js/smooth-scrolling-chrome.js"></script>')
  } else if (explorer.indexOf('Safari') > -1) {
    $('body').append('<script async src="js/smooth-scrolling-safari.js"></script>')
  }
}


$(function() {
  var pathname = location.pathname
  console.log(pathname)
  $('a').each(function() {
    var aHref = $(this).attr('href')
    if (pathname.indexOf(aHref) > -1) {
      $(this).addClass('is-active')
    }
  })

  if (!$('#app').hasClass('is-home')) {
    $('.c-navbar').addClass('is-fixed')
  }

  $(window).scroll(function() {
    if ($('#app').hasClass('is-home')) {
      if (this.scrollY > $('.l-header').outerHeight() / 2) {
        $('.c-navbar').addClass('is-fixed')
      } else {
        $('.c-navbar').removeClass('is-fixed')
      }
    }

    if ($('.l-news')[0] !== undefined) {
      var $news = $('.l-news')
      // news 相對於頂端的距離
      var newsTop = $news.offset().top
      // outerHeight 包含 padding 的高度
      var newsBottom = $news.offset().top + $news.outerHeight()
      // console.log(this)
      if (this.scrollY > newsTop && this.scrollY < newsBottom) {
        $('body').addClass('is-news-active')
      } else {
        $('body').removeClass('is-news-active')
      }
    }
  })

  var debounce
  $(window).on('resize load', function () {
    // 另建 self 變數，因為 function 作用域，所以 this 會指向 setTimeout
    var self = this
    // 防止持續執行（防抖）
    if (debounce) clearTimeout(debounce)
    debounce = setTimeout(function() {
      if (self.matchMedia('(max-width: 767.98px)').matches) {
        $('.c-navbar').addClass('is-burger')
      } else {
        $('.c-navbar').removeClass('is-burger')
      }
    }, 100)
  })
})

var isOpened = false
function handleBurger() {
  if (!isOpened) {
    $('.o-burger').addClass('is-opened')
    $('.c-navbar').addClass('is-opened')
    setTimeout(function() {
      $('.c-navbar__body').css({
        overflow: 'auto'
      })
    }, 1000)
    isOpened = true
  } else {
    $('.o-burger').removeClass('is-opened')
    $('.c-navbar').removeClass('is-opened')
    setTimeout(function() {
      $('.c-navbar__body').css({
        overflow: 'hidden'
      })
    }, 100)
    isOpened = false
  }
}

var isGotop = false
$('.o-gotop').click(function() {
  if (!isGotop) {
    $('html, body').animate({
      scrollTop: 0
    }, 1000)
    isGotop = true
    setTimeout(function() {
      isGotop = false
    }, 1000)
  }
})

/* ----------------------------------- */
/* ------ Plugin ------ */
/* ----------------------------------- */
// 等 DOM 結構載入後執行
// $(document).ready(function() {
//
// })

var lazyLoadImgs
$(function() {
  // https://png-pixel.com/
  $('img.js-lazy').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsCAQAAABHvi1JAAACNUlEQVR42u3TMQEAAAgDINc/mLE0gZ8ndCA9BRwiCAgCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAKCCAKCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoKAIIKAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAgIIggIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCDwZwF2ixVTTYF0mAAAAABJRU5ErkJggg==')

  // https://github.com/verlok/vanilla-lazyload
  lazyLoadImgs = new LazyLoad({
    elements_selector: 'img.js-lazy',
    // 設定距離可視區(視窗)底部多遠觸發
    threshold: 500,
    callback_loaded: function() {
      AOS.refresh()
    }
  })
})

// 縮寫
// Parallax
$(function() {
  var jsParallax = []
  // new Parallax($('#scene')[0], {})
  $('.js-parallax').each(function() {
    jsParallax.push(
      // 初始化插件
      new Parallax(this, {
        // 滑鼠進入元素內才生效
        hoverOnly: true,
        // 滑鼠相對於指定元素（預設為可視區）
        relativeInput: true
      })
    )
  })
})


// gsap.js
var shapePath = [
  { d: 'M101.984 0L1486.33 178.762L1270.23 788.591L0 829.293L101.984 0Z' },
  { d: 'M0 182.409L1498.74 0L1292.37 872.121L89.854 756.921L0 182.409Z' },
  { d: 'M188.265 0L1441.82 45.919L1399.71 744.419L0 846.809L188.265 0Z' }
]
function shapeAni(index) {
  gsap.to('#banner-shape path', {
    // attribute HTML屬性
    attr: { d: shapePath[index].d },
    duration: 1.6,
    ease: 'power1.out'
  })
}

// Swiper
$(function() {
  var headerSwiper = new Swiper ('.l-header__swiper', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    // 緩慢施放
    longSwipesRatio: 0.1,
    loop: true, // 循環,
    // 等同transition
    speed: 1600,
    autoplay: {
      delay: 3000,
      // 控制滑鼠進入後是否停止自動撥放
      disableOnInteraction: false
    },
    on: {
      slideChange: function() {
        // realIndex 比起官方文檔的 activeIndex 在 loop 狀態下不會錯亂
        // alert(this.realIndex)
        shapeAni(this.realIndex)
      }
    }
  })

  var newsSwiper = new Swiper ('.l-news__swiper', {
    longSwipesRatio: 0.1,
    loop: true,
    speed: 1600,
    slidesPerView: 1,
    spaceBetween: 4,
    navigation: {
      prevEl: '.l-news__btn-swiper.--pre',
      nextEl: '.l-news__btn-swiper.--next'
    },
    breakpoints: {
      1366: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 15
      }
    },
    on: {
      init: function() {
        lazyLoadImgs.update()
      }
    }
  })
})