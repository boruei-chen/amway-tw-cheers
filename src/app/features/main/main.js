function initialAppScrollEventListener () {
  document.addEventListener('scroll', function () {
    triggerTargetSectionAnimation();
    handleScrollToTopButtonVisible();
  });
}

function initialAppWheelEventListener () {
  document.addEventListener('wheel', function () {
    setHeaderNavigationItemActive();
  });
}

function initialMarquee (id, speed) {
  new Swiper(`#${id}`, {
    direction: 'horizontal',
    slidesPerView: 'auto',
    allowTouchMove: false,
    loop: true,
    speed: speed,
    autoplay: {
      delay: 1
    }
  });
}

function initialGallery (id) {
  new Swiper(`#${id}`, {
    loop: true,
    effect: 'fade',
    speed: 1000,
    autoplay: {
      delay: 3000
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination'
    }
  });
}

function handleScrollToTopButtonVisible () {
  const btnElem = document.querySelector('.scroll-to-top-btn');
  const secondSectionOffsetTop = document.querySelector('.cogitation').offsetTop;
  if (window.scrollY >= secondSectionOffsetTop) {
    btnElem.classList.add('scroll-to-top-btn--active');
  } else {
    btnElem.classList.remove('scroll-to-top-btn--active');
  }
}

function setHeaderNavigationItemActive () {
  const headerElemHeight = document.querySelector('header').clientHeight;
  const currentScrollPos = window.scrollY + headerElemHeight;
  const pcNavItemElems = document.querySelectorAll('.header__pc-nav-item');
  const mobileNavItemElems = document.querySelectorAll('.header__mobile-nav-item');
  const sectionOffsetTopList = Array.from(pcNavItemElems).map((elem) => document.querySelector(`.${elem.dataset.targetSection}`).offsetTop);
  const navActiveItemIndex = sectionOffsetTopList.indexOf(sectionOffsetTopList.filter((offsetTop) => currentScrollPos >= offsetTop).pop());
  if (navActiveItemIndex !== -1) {
    Array.from(pcNavItemElems).forEach((elem, index) => (navActiveItemIndex !== index && elem.classList.contains('header__pc-nav-item--active')) && elem.classList.remove('header__pc-nav-item--active'));
    Array.from(mobileNavItemElems).forEach((elem, index) => (navActiveItemIndex !== index && elem.classList.contains('header__mobile-nav-item--active')) && elem.classList.remove('header__mobile-nav-item--active'));
    if (!pcNavItemElems[navActiveItemIndex].classList.contains('header__pc-nav-item--active')) {
      pcNavItemElems[navActiveItemIndex].classList.add('header__pc-nav-item--active');
    }
    if (!mobileNavItemElems[navActiveItemIndex].classList.contains('header__mobile-nav-item--active')) {
      mobileNavItemElems[navActiveItemIndex].classList.add('header__mobile-nav-item--active');
    }
  } else {
    Array.from(pcNavItemElems).forEach((elem) => elem.classList.contains('header__pc-nav-item--active') && elem.classList.remove('header__pc-nav-item--active'));
    Array.from(mobileNavItemElems).forEach((elem) => elem.classList.contains('header__mobile-nav-item--active') && elem.classList.remove('header__mobile-nav-item--active'));
  }
}

function scrollToTargetSection (event, device) {
  const headerElem = document.querySelector('header');
  const sectionElem = document.querySelector(`.${event.target.dataset.targetSection}`);
  if (headerElem && sectionElem) {
    const sectionElemOffsetTop = sectionElem.offsetTop - headerElem.clientHeight;
    const siblingsElems = event.target.parentElement.children;
    Array.from(siblingsElems).forEach((elem) => elem.classList.contains(`header__${device}-nav-item--active`) && elem.classList.remove(`header__${device}-nav-item--active`));
    event.target.classList.add(`header__${device}-nav-item--active`);
    window.scrollTo({ top: sectionElemOffsetTop, behavior: 'smooth' });
  }
}

function triggerTargetSectionAnimation () {
  const windowBottomPos = window.scrollY + window.innerHeight;
  const sectionElems = document.querySelectorAll('section');
  const sectionList = Array.from(sectionElems).map((elem) => ({ name: elem.className, offsetTop: elem.offsetTop, height: elem.clientHeight }));
  const currentSectionIndex = sectionList.indexOf(sectionList.filter((section) => windowBottomPos > section.offsetTop).pop());
  const previewedSectionNameList = sectionList.map((section) => section.name).filter((_, index) => index <= currentSectionIndex);
  if (previewedSectionNameList.includes('main')) {
    const titleElem = document.querySelector('.main__title');
    const titleElemTopPos = titleElem.getBoundingClientRect().top + window.scrollY;
    const descElem = document.querySelector('.main__desc');
    const descElemTopPos = descElem.getBoundingClientRect().top + window.scrollY;
    if (windowBottomPos >= titleElemTopPos && !titleElem.classList.contains('main__title--active')) {
      titleElem.classList.add('main__title--active');
    }
    if (windowBottomPos >= descElemTopPos && !titleElem.classList.contains('main__desc--active')) {
      descElem.classList.add('main__desc--active');
    }
  } 
  if (previewedSectionNameList.includes('cogitation')) {
    const titleElem = document.querySelector('.cogitation__title');
    const titleElemTopPos = titleElem.getBoundingClientRect().top + window.scrollY;
    const descElems = document.querySelectorAll('.cogitation__scope-content p');
    if (windowBottomPos >= titleElemTopPos && !titleElem.classList.contains('cogitation__title--active')) {
      titleElem.classList.add('cogitation__title--active');
    }
    Array.from(descElems).forEach((elem) => {
      const elemTopPos = elem.getBoundingClientRect().top + window.scrollY;
      if (windowBottomPos >= elemTopPos && !elem.parentNode.classList.contains('cogitation__scope-content--active')) {
        elem.parentNode.classList.add('cogitation__scope-content--active');
      }
    });
  }
  if (previewedSectionNameList.includes('join')) {
    const titleElem = document.querySelector('.join__title');
    const titleElemTopPos = titleElem.getBoundingClientRect().top + window.scrollY;
    const descElem = document.querySelector('.join__desc');
    const descElemTopPos = descElem.getBoundingClientRect().top + window.scrollY;
    const mobileDescElem = document.querySelector('.join__mobile-desc');
    const mobileDescElemTopPos = mobileDescElem.getBoundingClientRect().top + window.scrollY;
    const mediaItemElems = document.querySelectorAll('.join__media-item');
    if (windowBottomPos >= titleElemTopPos && !titleElem.classList.contains('join__title--active')) {
      titleElem.classList.add('join__title--active');
    }
    if (windowBottomPos >= descElemTopPos && !descElem.classList.contains('join__desc--active')) {
      descElem.classList.add('join__desc--active');
    }
    if (windowBottomPos >= mobileDescElemTopPos && !mobileDescElem.classList.contains('join__mobile-desc--active')) {
      mobileDescElem.classList.add('join__mobile-desc--active');
    }
    Array.from(mediaItemElems).forEach((elem) => {
      const elemTopPos = elem.getBoundingClientRect().top + window.scrollY;
      if (windowBottomPos >= elemTopPos) {
        const coverElem = elem.querySelector('.join__media-item-cover');
        if (!coverElem.classList.contains('join__media-item-cover--active')) {
          coverElem.classList.add('join__media-item-cover--active');
        }
      }
    });
  }
  if (previewedSectionNameList.includes('podcast')) {
    const titleElem = document.querySelector('.podcast__title');
    const titleElemTopPos = titleElem.getBoundingClientRect().top + window.scrollY;
    const descElem = document.querySelector('.podcast__desc');
    const descElemTopPos = descElem.getBoundingClientRect().top + window.scrollY;
    const mediaElem = document.querySelector('.podcast__media');
    const mediaElemTopPos = mediaElem.getBoundingClientRect().top + window.scrollY;
    if (windowBottomPos >= titleElemTopPos && !titleElem.classList.contains('podcast__title--active')) {
      titleElem.classList.add('podcast__title--active');
    }
    if (windowBottomPos >= descElemTopPos && !descElem.classList.contains('podcast__desc--active')) {
      descElem.classList.add('podcast__desc--active');
    }
    if (windowBottomPos >= mediaElemTopPos && !mediaElem.classList.contains('podcast__media--active')) {
      mediaElem.classList.add('podcast__media--active');
    }
  }
  if (previewedSectionNameList.includes('cherish')) {
    const titleElem = document.querySelector('.cherish__title');
    const titleElemTopPos = titleElem.getBoundingClientRect().top + window.scrollY;
    const sectionTitleElems = document.querySelectorAll('.cherish__section-title');
    const mediaItemElems = document.querySelectorAll('.cherish__media-item');
    if (windowBottomPos >= titleElemTopPos && !titleElem.classList.contains('cherish__title--active')) {
      titleElem.classList.add('cherish__title--active');
    }
    Array.from(sectionTitleElems).forEach((elem) => {
      const elemTopPos = elem.getBoundingClientRect().top + window.scrollY;
      if (windowBottomPos >= elemTopPos && !elem.classList.contains('cherish__section-title--active')) {
        elem.classList.add('cherish__section-title--active');
      }
    });
    Array.from(mediaItemElems).forEach((elem) => {
      const elemTopPos = elem.getBoundingClientRect().top + window.scrollY;
      if (windowBottomPos >= elemTopPos && !elem.classList.contains('cherish__media-item--active')) {
        elem.classList.add('cherish__media-item--active');
      }
    });
  }
}

function toggleMobileMenu (active) {
  const bodyElem = document.querySelector('body');
  const mobileMenuElem = document.querySelector('.header__mobile-menu');
  if (bodyElem && mobileMenuElem) {
    if (active) {
      bodyElem.classList.add('scroll-lockup');
      mobileMenuElem.classList.add('header__mobile-menu--active');
    } else {
      bodyElem.classList.remove('scroll-lockup');
      mobileMenuElem.classList.remove('header__mobile-menu--active');
    }
  }
}

function openMediaModal (sourceUrl) {
  const bodyElem = document.querySelector('body');
  const mediaModalElem = document.querySelector('.media-modal');
  if (bodyElem && mediaModalElem) {
    const iframeElem = mediaModalElem.querySelector('iframe');
    if (iframeElem) iframeElem.setAttribute('src', sourceUrl);
    bodyElem.classList.add('scroll-lockup');
    mediaModalElem.classList.add('media-modal--active');
  }
}

function closeMediaModal () {
  const bodyElem = document.querySelector('body');
  const mediaModalElem = document.querySelector('.media-modal');
  if (bodyElem && mediaModalElem) {
    const iframeElem = mediaModalElem.querySelector('iframe');
    if (iframeElem) iframeElem.removeAttribute('src');
    bodyElem.classList.remove('scroll-lockup');
    mediaModalElem.classList.remove('media-modal--active');
  }
}

function onHeaderNav (event) {
  scrollToTargetSection(event, 'pc');
}

function onHeaderMobileNav (event) {
  scrollToTargetSection(event, 'mobile');
  toggleMobileMenu(false);
}

function onScrollToTop () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  includeHTML(function () {
    triggerTargetSectionAnimation();
    initialAppScrollEventListener();
    initialAppWheelEventListener();
    initialMarquee('cogitation-marquee', 3000);
    initialMarquee('podcast-marquee', 5000);
    initialMarquee('cherish-section-subsection-1-marquee', 3000);
    initialMarquee('cherish-section-subsection-2-marquee', 3000);
    initialMarquee('cherish-section-subsection-3-marquee', 3000);
    initialMarquee('cherish-section-subsection-4-marquee', 3000);
    initialGallery('cherish-section-subsection-1-media-gallery');
    initialGallery('cherish-section-subsection-2-media-gallery');
    initialGallery('cherish-section-subsection-3-media-gallery');
    initialGallery('cherish-section-subsection-4-media-gallery');
  });
});
