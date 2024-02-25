function initialAppScrollEventListener () {
  document.addEventListener('scroll', function () {
    triggerTargetSectionAnimation();
    toggleScrollToTopButtonVisible();
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

function initialCherishSectionMediaGallery (subSectionIndex, mediaGalleryId, mediaInfoList) {
  new Swiper(`#${mediaGalleryId}`, {
    loop: true,
    effect: 'fade',
    speed: 350,
    autoplay: {
      delay: 3000
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination'
    },
    on: {
      realIndexChange: (swiper) => {
        const currentMediaInfo = mediaInfoList[swiper.realIndex];
        const targetSubSectionElem = document.querySelectorAll('.cherish__section')[subSectionIndex];
        const targetMediaDescElem = targetSubSectionElem.querySelector('.cherish__media-desc p');
        const targetMediaBtnElem = targetSubSectionElem.querySelector('.cherish__media-btn');
        targetMediaDescElem.innerHTML = currentMediaInfo.desc;
        targetMediaBtnElem.setAttribute('href', currentMediaInfo.url);
      }
    }
  });
}

function initialCherishSection1stSubSectionMediaGallery () {
  const mediaInfoList = [
    { desc: '安麗全球核心高層齊聚台灣，推廣全方位健康幸福理念', url: 'https://www.cw.com.tw/article/5127971' },
    { desc: '安麗推廣大健康永續理念 致力成為地球永續推手', url: 'https://www.cw.com.tw/article/5126778' }
  ];
  initialCherishSectionMediaGallery(0, 'cherish-section-subsection-1-media-gallery', mediaInfoList);
}

function initialCherishSection2ndSubSectionMediaGallery () {
  const mediaInfoList = [
    { desc: '我適合創業嗎？一人如何創業？想清楚３件事，到５大平台找資源', url: 'https://www.cheers.com.tw/article/article.action?id=5099062' },
    { desc: '化興趣為事業其實並不難！安麗的堅持與熱情，感動台灣霹靂舞之光陳柏均與極限超馬好手陳彥博', url: 'https://www.cw.com.tw/article/5120359' },
    { desc: '輕鬆創玩你的事業', url: 'https://web.amway.com.tw/business/business/?utm_source=OFFICIAL_SITE&utm_medium=bo_index_intro&utm_content=business' }
  ];
  initialCherishSectionMediaGallery(1, 'cherish-section-subsection-2-media-gallery', mediaInfoList);
}

function initialCherishSection3rdSubSectionMediaGallery () {
  const mediaInfoList = [
    { desc: '工作與自由可兼得？開創「斜槓」人生必備的４大能力', url: 'https://www.cheers.com.tw/article/article.action?id=5101445' },
    { desc: '彈性多元選擇 安麗提供新世代展現的舞台！', url: 'https://www.cw.com.tw/article/5121856' },
    { desc: '數位支持 助你成功創業、持續成長', url: 'https://web.amway.com.tw/business/business-tools/?utm_source=OFFICIAL_SITE&utm_medium=bo_index_intro&utm_content=tool' }
  ];
  initialCherishSectionMediaGallery(2, 'cherish-section-subsection-3-media-gallery', mediaInfoList);
}

function toggleLoadingMaskVisible (visible) {
  const bodyElem = document.querySelector('body');
  const loadingMaskElem = document.querySelector('.loading-mask');
  if (bodyElem && loadingMaskElem) {
    if (visible) {
      bodyElem.classList.add('scroll-lockup');
      loadingMaskElem.classList.add('loading-mask--active');
    } else {
      loadingMaskElem.classList.add('loading-mask--anim');
      setTimeout(() => {
        bodyElem.classList.remove('scroll-lockup');
        loadingMaskElem.classList.remove('loading-mask--active');
      }, 1500);
    }
  }
}

function toggleScrollToTopButtonVisible () {
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

function scrollToTargetSection (device, navElem) {
  const headerElem = document.querySelector('header');
  const sectionElem = document.querySelector(`.${navElem.dataset.targetSection}`);
  if (headerElem && sectionElem) {
    const sectionElemOffsetTop = sectionElem.offsetTop - headerElem.clientHeight;
    const navSiblingsElems = navElem.parentElement.children;
    Array.from(navSiblingsElems).forEach((elem) => elem.classList.contains(`header__${device}-nav-item--active`) && elem.classList.remove(`header__${device}-nav-item--active`));
    navElem.classList.add(`header__${device}-nav-item--active`);
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
    const descElems = document.querySelectorAll('.cogitation__scope-desc');
    if (windowBottomPos >= titleElemTopPos && !titleElem.classList.contains('cogitation__title--active')) {
      titleElem.classList.add('cogitation__title--active');
    }
    Array.from(descElems).forEach((elem) => {
      const elemTopPos = elem.getBoundingClientRect().top + window.scrollY;
      if (windowBottomPos >= elemTopPos && !elem.classList.contains('cogitation__scope-desc--active')) {
        elem.classList.add('cogitation__scope-desc--active');
      }
    });
  }
  if (previewedSectionNameList.includes('join')) {
    const titleElem = document.querySelector('.join__title');
    const titleElemTopPos = titleElem.getBoundingClientRect().top + window.scrollY;
    const descElem = document.querySelector('.join__desc');
    const descElemTopPos = descElem.getBoundingClientRect().top + window.scrollY;
    const mediaItemElems = document.querySelectorAll('.join__media-item');
    if (windowBottomPos >= titleElemTopPos && !titleElem.classList.contains('join__title--active')) {
      titleElem.classList.add('join__title--active');
    }
    if (windowBottomPos >= descElemTopPos && !descElem.classList.contains('join__desc--active')) {
      descElem.classList.add('join__desc--active');
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
    const mediaElem = document.querySelector('.podcast__media-item-cover');
    const mediaElemTopPos = mediaElem.getBoundingClientRect().top + window.scrollY;
    if (windowBottomPos >= titleElemTopPos && !titleElem.classList.contains('podcast__title--active')) {
      titleElem.classList.add('podcast__title--active');
    }
    if (windowBottomPos >= descElemTopPos && !descElem.classList.contains('podcast__desc--active')) {
      descElem.classList.add('podcast__desc--active');
    }
    if (windowBottomPos >= mediaElemTopPos && !mediaElem.classList.contains('podcast__media-item-cover--active')) {
      mediaElem.classList.add('podcast__media-item-cover--active');
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

function openMediaModal (event, sectionName) {
  const bodyElem = document.querySelector('body');
  const mediaItemElem = event.target.closest(`.${sectionName}__media-item`);
  const mediaModalElem = document.querySelector('.media-modal');
  if (bodyElem && mediaItemElem && mediaModalElem) {
    const iframeElem = mediaModalElem.querySelector('iframe');
    const sourceUrl = mediaItemElem.dataset.mediaSourceUrl;
    if (iframeElem && sourceUrl) {
      iframeElem.setAttribute('src', sourceUrl);
      bodyElem.classList.add('scroll-lockup');
      mediaModalElem.classList.add('media-modal--active');
    } else {
      openComingSoonModal();
    }
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

function openComingSoonModal () {
  const bodyElem = document.querySelector('body');
  const comingSoonModalElem = document.querySelector('.coming-soon-modal');
  if (bodyElem && comingSoonModalElem) {
    bodyElem.classList.add('scroll-lockup');
    comingSoonModalElem.classList.add('coming-soon-modal--active');
  }
}

function closeComingSoonModal () {
  const bodyElem = document.querySelector('body');
  const comingSoonModalElem = document.querySelector('.coming-soon-modal');
  if (bodyElem && comingSoonModalElem) {
    bodyElem.classList.remove('scroll-lockup');
    comingSoonModalElem.classList.remove('coming-soon-modal--active');
  }
}

function onHeaderNav (event) {
  scrollToTargetSection('pc', event.currentTarget);
}

function onHeaderMobileNav (event) {
  scrollToTargetSection('mobile', event.currentTarget);
  toggleMobileMenu(false);
}

function onScrollToTop () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  toggleLoadingMaskVisible(true);
  includeHTML(function () {
    triggerTargetSectionAnimation();
    initialAppScrollEventListener();
    initialAppWheelEventListener();
    initialMarquee('cogitation-marquee', 3000);
    initialMarquee('podcast-marquee', 5000);
    initialMarquee('cherish-section-subsection-1-marquee', 3000);
    initialMarquee('cherish-section-subsection-2-marquee', 3000);
    initialMarquee('cherish-section-subsection-3-marquee', 3000);
    initialCherishSection1stSubSectionMediaGallery();
    initialCherishSection2ndSubSectionMediaGallery();
    initialCherishSection3rdSubSectionMediaGallery();
  });
});

window.addEventListener('load', function () {
  toggleLoadingMaskVisible(false);
});
