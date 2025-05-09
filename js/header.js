// header javaScript - > JQuery 사용하지 않고 해보기.
$(function () {
  const header = document.querySelector("#header");

  const menuItem = document.querySelectorAll(".menu-item a");

  const headerSub = document.querySelector("#header .navigation-gnb-pc");

  const headerSubList = document.querySelector(
    "#header .navigation-gnb-pc .nav-gnb-item"
  );

  const navItems = document.querySelectorAll(".nav-gnb-list-item");

  console.log(header, menuItem, headerSub, headerSubList, navItems);

  // javaScript는 이벤트를 실행하려면 addEventListener를 사용
  // addEventListener에 hover라는 이벤트가 없음 -> 대신에 mouseenter,mouseleave, mouseover,mouseout 등 4가지가 있음
  // 이렇게 사용하면 안됨. querySelectorAll()로 가져온 것은 여러 개의 요소(NodeList는 배열처럼 보이지만 배열이 아님)로 반환하기 떄문에
  // addEventListener는 개별적인 요소에게 사용해야 한다. -> querySelector() 에 사용
  //   menuItem.addEventListener("mouseenter", function (e) {
  //     console.log(e);
  //   });

  // forEach문을 사용해야함.
  // => 은 화살표함수(Arrow Function)를 정의할 때 사용하는 문법 , function 키워드를 사용하지 않고 간결하게 표현
  // forEach를 사용하여 item의 index값을 가져온다. index는 NodeList에 0,1,2,.. 이 숫자를 의미한다.
  menuItem.forEach((item, index) => {
    item.addEventListener("mouseover", function (e) {
      console.log(item, [index === 1], e);

      menuItem[index].classList.add("active");
      headerSub.classList.add("active");
      headerSubList.classList.add("active");

      // 연결된 nav-gnb-list-item에도 active 추가
      // []는 '빈 배열'을 의미한다. 아무런 요소가 없는 배열을 만들 때 사용된다.
      // [index]는 배열의 특정 요소에 접근하기 위한 표기법이다. 이를 사용해 특정 인덱스에 있는 요소를 읽거나 수정할 수 있음.
      // ?는 if/else 문법을 대체하여 코드를 간결하게 만들 때 사용
      // navItems[index]는 querySelectorAll로 NodeList로 값을 가져왔으며, menuItem과 인덱스 값이 같다는 것을 가정해서 navItems[index]로 사용한 것이다.
      // ?(옵셔널 체이닝)는  navItems[index]가 존재할 경우에만 .classList.add('active)를 실행한다. ?는 그 값이 존재하지 않는다면 실행하지 않는다. 이건 안전한 접근방식으로 navItems[index]의 요소가 없거나 undefined이면 그 뒤에 명령값을 실행하지는 않는다.
      // 이 코드를 요약하자면 navItems[index]가 존재한다면 'active' 클래스를 추가하라는 것이다.
      // ?로 사용하지 않고 if문을 사용한다면 v
      //   if (navItems[index]) {
      //     navItems[index].classList.add("active");
      //   } 이런 식으로 사용할 수 있다.

      navItems[index]?.classList.add("active");

      console.log(navItems[index]);
    });
  });

  // 각각의 요소에게 active를 제거하기 위해서는 forEach()로 접근해서 사용해야한다.
  // 그리고 이것도 item, index를 같이 불러와야 undefined가 되지 않는다.-> 몰랐당
  menuItem.forEach((item, index) => {
    item.addEventListener("mouseleave", function () {
      navItems[index]?.classList.remove("active");

      menuItem[index].classList.remove("active");
    });
  });

  navItems.forEach((item, index) => {
    item.addEventListener("mouseenter", function () {
      menuItem[index].classList.add("active");
    });
  });

  navItems.forEach((item, index) => {
    item.addEventListener("mouseleave", function () {
      menuItem[index].classList.remove("active");
    });
  });

  headerSub.addEventListener("mouseleave", function () {
    headerSub.classList.remove("active");
    headerSubList.classList.remove("active");
  });

  // 메뉴 아이콘을 선택했을 떄 서브 메뉴 활성화
  // 메뉴 아이콘 변수에 저장
  const menuIcon2 = document.querySelector(".icon2");
  //   console.log(menuIcon2);

  menuIcon2.addEventListener("click", function () {
    // classList에 toggle을 이용하여 상호작용해서 메뉴 아이콘 클릭시 추가 및 제거 실시
    headerSub.classList.toggle("active");
    headerSubList.classList.toggle("active");
  });

  // scroll을 이용해 헤더 효과 적용 해야함 (scrollTop일 때)
  // header가 fixed일 때 스크롤 값을 연동해서 스크롤이 내려가면 헤더가 사라지고 스크롤이 올라가면 헤더가 나오게 하기

  // top 버튼 변수로 저장 -> id값의 속성으로 한 것은 getElementById로 하고 #은 뺴준다.
  const btnTop = document.getElementById("top-btn");
  console.log(btnTop);

  // 스크롤 값이 구하기
  // 자바스크립트에서는 현재 스크롤값을 구하기 위해서는 document.documentElement.scrollTop
  var thisScroll = document.documentElement.scrollTop;
  console.log(thisScroll);

  // 현재 스크롤값만 구해서는 안되고,

  // 창 내부에 스크롤 이벤트 구현
  window.addEventListener("scroll", function (e) {
    // 이렇게 하면 스크롤의 Y의 값을 알 수 있다.
    // console.log(window.scrollY);

    // 일단 이렇게 하면 스크롤값에 따라 active를 추가하긴 하지만, 자연스러운 새로고침을 통해서 나온다. -> 부자연스러운 효과를 구현
    //if 문을 통해서 스크롤 값이 0보다 클 때를 만들어준다
    if (thisScroll > 0) {
      // btnTop을 class를 기입해서 구현, Jquery처럼 show 가능 이런 게 없음
      btnTop.classList.add("active");
    } else {
      btnTop.classList.remove("active");
    }
  });

  // 2. top 버튼 클릭 시 홈페이지 맨 위로 이동

  // header의 top위치를 구해서 그 쪽으로 이동시킬 수 있도록 변수로 저장해둠.
  let clickTop = document.getElementById("header").offsetTop;
  console.log(clickTop);
  // top 버튼에 클릭 이벤트를 걸어주기
  btnTop.addEventListener("click", function (e) {
    e.preventDefault; // a 링크의 기본 동작 막기 -> 사용한 이유는 click했을 때 a의 기본적인 동작 때문에 이동하는 건지 효과를 주어서 이동하는 지 확인 차에
    //scrollTo() 함수는 창의 스크롤 위치를 특정 좌표로 이동시키는 기능이다.
    window.scrollTo({
      top: 0,
      // 오타 내지 말장
      behavior: "smooth",
    });
  });
});
