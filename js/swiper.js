$(function () {
  // 슬라이드 구현 ->  카드 UI 슬라이드
  let ContentThreeSlide = new Swiper(".main-con3-slide", {
    // 일단 이렇게 slide 구간을 설정하면 slide가 가능하다. -> 마우스로
    speed: 1000, // 슬라이드 전환 속도
    loop: true, // 슬라이드가 마지막에 도달해도 다시 처음으로 돌아가면서 무한반복
    // loopedSlides: 6,
    allowTouchMove: true, // 시용자가 마우스 또는 손가락으로 슬라이드할 수 있게
    slidePerView: "auto", // 페이지당 슬라이드 개수를 판단 1,2,3 등의 수는 슬라이드를 1개 보여줄건지 판단
    spaceBetween: 32, // 슬라이드 아이템 각의 간격

    // 슬라이드 개수를 늘려 슬라이드가 짤리는 것을 방지
    // loopAdditionalSlides: 5,
    mousewheel: false, // 마우스 휠로 슬라이드를 이동하지 않게 설정

    watchSlidesVisibility: true,

    // pagination -> 슬라이드 진행 상황을 보여주는
    pagination: {
      // 불릿을 감싸는 요소만 적용, 직접 bullet을 적용하면 불릿이 두개가 생김.
      el: ".main-con3-swiper-area .swiper-pagination",
      clickable: true, // 클릭 시 해당 슬라이드로 화면 이동
    },

    // 클릭 시 다음 슬라이드로 이동하는 버튼
    navigation: {
      nextEl: ".arrow-next",
      prevEl: ".arrow-prev",
    },
  });
});
