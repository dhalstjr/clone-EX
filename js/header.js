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

  // 1. 스크롤 위치에 따라 속성을 다르게 주는 코드
  // 현재 위치의 스크롤 값 구하기 (스크롤 값으로 맨 위를 찾기 위해서)
  // 자바스크립트에서는 현재 스크롤값을 구하기 위해서는 document.documentElement.scrollTop
  var thisScroll = window.pageYOffset || document.documentElement.scrollTop;
  console.log(thisScroll);

  // 이건 스크롤 값만을 통해 top인지 no-top인지 확인하는 코드. -> 스크롤과 연동하기 위해서는 scroll 이벤트를 줘야함.
  // 1 -1 if/else 문을 통해 현재 위치 값이 0이 아닐 떄 -> 한마디로 스크롤 위치가 맨 위가 아니라면
  // 현재 스크롤 값이 0보다 크면
  if (thisScroll > 0) {
    document.body.setAttribute("data-top", "no-top");
  } else {
    // 현재 스크롤이 맨 위에 위치했다면 top
    document.body.setAttribute("data-top", "top");
  }

  // 1 - 2 스크롤 이벤트를 이용하여 no-top과 top의 속성을 주느 코드를 유동적으로 실행
  window.addEventListener("scroll", function () {
    // 스크롤 이벤트에서 현재 스크롤 값을 저장하여 비교
    const thisScroll = window.pageYOffset || document.documentElement.scrollTop;
    console.log(thisScroll);

    // if/else 문을 횔용 -> 저 위에 처럼
    // 스크롤 이벤트에 적용하여 사용하면 스크롤 값에 유동적인 위치에 따라 no-top과 top의 속성이 부여된다.
    if (thisScroll > 0) {
      document.body.setAttribute("data-top", "no-top");
    } else {
      document.body.setAttribute("data-top", "top");
    }
  });

  // 2. 스크롤 위치(위 아래)에 따라 헤더의 변화

  // 이전 스크롤값을 변수로 저장 (let)
  // 이전 스크롤값을 변수로 저장하는 이유는 스크롤 방향을 판단하기 위해 이전 스크롤값을 기억해두는 것이다.
  // 이가 필요한 이유는 현재 스크롤값만 가지고 방향을 알 수가 없기 때문에 이다.
  // 즉, 방향을 판단하기 위해서는 이전 스크롤 값을 알아야만 방향을 알 수가 있다. -> 이전 스크롤 값이 100이라면 현재 스크롤 값이 200이라고 치면 계산을 하여 음수, 양수가 나올텐데 그걸 통해서 방향을 판단하고 효과를 줄 수 있을 것이다.
  // 0으로 저장한 이유는 페이지가 처음 열릴 때 아직 스크롤하지 않았다면 이전 위치는 무조건 0이기 때문에 0으로 저장한 것이다.
  // 2-1 스크롤 업다운에 따른 변화
  let prevScrollTop = 0;
  nowScrollTop = 0;

  // 2-2 스크롤 방향을 판단하는 함수
  // 스크롤 방향은 값만 가지고 판단할 수 없다. -> 조건문을 활용하여 방향을 판단.

  let wheelMove = function () {
    // return는 함수가 실행될 때 결과값을 반환하는 명령어
    // 이 함수는 결과값이 'up' , "down" 이 있기에 둘 중 하나만 결과값으로 도출한다.
    // ?는 삼향 연산자를 말하고, 삼향 연산자는 (조건식 ? "A" : "B") if/else문법을 짧게 사용한 문법이다.
    // 삼향 연산자를 사용하기 적합할 때는 결과가 하나이 값만을 반환할 때와, 짧고 명확한 조건일 때 사용되는 것이 좋다.
    return prevScrollTop - nowScrollTop > 0 ? "up" : "down";
  };

  // 2-3 창 내부에 스크롤 이벤트 구현하여 클래스 부여
  window.addEventListener("scroll", function () {
    // 이렇게 하면 스크롤의 Y의 값을 알 수 있다.
    // console.log(window.scrollY);
    // 그래서 이걸 현재 스크롤값으로 변수로 저장한다.
    // const nowScrollTop = window.scrollY;
    // console.log(nowScrollTop);

    // 저 위 코드와 현재 스크롤 값을 구하는 방식과 코드는 맞다. 하지만 브라우저 호환성을 최대한 확보하고 싶을 때 이 코드가 더 좋을 것이다.
    // 최신 브라우저만 사용한다면 저 위에 코드가 좀 더 간결하고 좋다.
    // 여러 브라우저에서 사용하고 싶다면 이 밑에 코드를 사용하는 것이 좋다.

    // console.log(nowScrollTop);

    // 이벤트 밖 let nowScrollTop = 0; 전역 변수로 선언을 하고,
    // 이벤트 안에 값을 새로 갱신하여 사용한다.
    // const를 사용하니 지역 변수로, 함수 안에서만 유효하다 보니, 값이 갱신이 안되니 wheelMove()가 전역의 nowScrollTop = 0 값만을 계속 계산하게 되는 것이다.
    nowScrollTop = window.pageYOffset || document.documentElement.scrollTop();

    // 2-4 일단 스크롤이 맨 위(0)가 아닐 때와 맨위일 때를 if/else문으로 설정
    if (nowScrollTop > 0) {
      // 2-5 스크롤이 맨 위가 아닐 때 스크롤 방향을 판단하여 클래스 부여 및 제거
      // 함수로 만든 wheelMove를 가져와 스크롤의 방향을 판단.
      if (wheelMove() === "up") {
        // 스크롤 방향이 위라면 "up" -> 위로 스크롤하고 있다면 scroll-down 클래스 삭제
        document.documentElement.classList.remove("scroll-down");
      } else {
        // 스크롤 방향이 아래라면 "down" -> 아래로 스크롤하고 있다면 scroll-down 클래스 부여
        document.documentElement.classList.add("scroll-down");
      }

      // 지금 이런 상태세어 prevScrollTop만이 콘솔에 찍히고 nowScrollTop값은 콘솔에 찍히지 않는 이유는
      // prevScrollTop은 전역변수인 let = prevScrollTop = 0;이 전역변수로 선언돼 있어서 찍히고, nowScrollTop은 찍히지 않는다.
      // 하지만 nowScrollTop을 전역변수로 선언하면 콘솔 창에 찍히지만 이 코드의 동작은 실행이 되지 않는다.
      prevScrollTop = nowScrollTop;
      console.log(nowScrollTop, prevScrollTop);
    } else {
      // 스크롤이 맨 위라면 클래스 삭제
      document.documentElement.classList.remove("scroll-down");
    }

    // 일단 이렇게 하면 스크롤값에 따라 active를 추가하긴 하지만, 자연스러운 새로고침을 통해서 나온다. -> 부자연스러운 효과를 구현
    // if 문을 통해서 스크롤 값이 0보다 클 때를 만들어준다
    // 현재 스크롤값과 이전 스크롤 값을 비교하여 방향을 판단.
    // > 0을 붙인 이유는 방향을 알 기 위해서 이다. 양수와 음수로 방향을 판단.
    // 아직 이렇게만 구현하면 스크롤이 위로 아래든 똑같이 active 클래스가 구현된다.
    // 아직 방향을 판단하는 코드가 없으면 스크롤 방향을 판단하지 못한다는 것이다.
    // if (prevScrollTop - nowScrollTop > 0) {
    //   btnTop을 class를 기입해서 구현, Jquery처럼 show 가능 이런 게 없음
    //   btnTop.classList.remove("active");
    // } else if (prevScrollTop - nowScrollTop < 0) {
    //   btnTop.classList.add("active");
    // }
  });

  // 2. top 버튼 클릭 시 홈페이지 맨 위로 이동

  // top 버튼 변수로 저장 -> id값의 속성으로 한 것은 getElementById로 하고 #은 뺴준다.
  const btnTop = document.getElementById("top-btn");
  console.log(btnTop);

  // header의 top위치(0)를 구해서 그 쪽으로 이동시킬 수 있도록 변수로 저장해둠.
  let clickTop = document.getElementById("header").offsetTop;
  //   console.log(clickTop);

  const scrollToTop = () => {
    //scrollTo() 함수는 창의 스크롤 위치를 특정 좌표로 이동시키는 기능이다.
    window.scrollTo({
      top: clickTop, // top 값을 바꿔도 위치롤 이동하지 않음. 뭔가 원초적으로 잘못됐음. 시벌
      // 오타 내지 말장
      behavior: "smooth", // 부드러운 스크롤
    });
  };
  // top 버튼에 클릭 이벤트를 걸어주기
  btnTop.addEventListener("click", function (e) {
    // 시발 e.preventDefault의 () <- 이거를 안붙혀서 scrollTo가 개같이 실행했던거임 젠장. 다음엔 이런 실수 절대 안한다 개자식들아 덤벼
    e.preventDefault(); // a 링크의 기본 동작 막기 -> 사용한 이유는 click했을 때 a의 기본적인 동작 때문에 이동하는 건지 효과를 주어서 이동하는 지 확인 차에

    scrollToTop();
  });
});
