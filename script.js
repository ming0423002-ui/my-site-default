/* =========================================================
   script.js — 동작 로직 및 수정 포인트 주석
   역할 요약:
   1) 상단의 카테고리(태그) 버튼을 클릭하면
      - 소개(헤더) 아래에 있는 gallery-section을 보이게 하고
      - 클릭한 카테고리와 같은 data-category를 가진 <section class="gallery"> 만 표시
   2) "active" 클래스는 클릭된 버튼 UI를 바꿔줌
   수정 포인트:
   - 버튼을 추가/삭제할 때는 HTML의 <button data-filter="..."> 값과
     <section data-category="..."> 값이 정확히 매치되는지 확인하세요.
   ========================================================= */

/* DOM에서 필요한 요소들을 선택해 변수에 저장합니다. */
const buttons = document.querySelectorAll(".filter-btn");   // 모든 필터 버튼
const galleries = document.querySelectorAll(".gallery");    // 모든 카테고리 섹션
const gallerySection = document.getElementById("gallery-section"); // 전체 갤러리 래퍼

/* 버튼마다 클릭 이벤트 리스너를 붙입니다. */
buttons.forEach(button => {
  button.addEventListener("click", () => {
    // 1) 버튼 UI 처리: 모든 버튼에서 active 제거 후 클릭한 버튼에만 active 추가
    buttons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    // 2) gallery-section을 화면에 보이게 설정 (헤더만 보이는 초기 상태를 해제)
    gallerySection.style.display = "block";

    // 3) 클릭한 버튼의 data-filter 값을 읽어와 각 섹션의 data-category와 비교
    const filter = button.dataset.filter;

    // 4) 각 갤러리 섹션을 순회하면서 현재 선택된 카테고리와 같으면 보이고,
    //    다르면 숨깁니다. (display: block / none)
    galleries.forEach(gallery => {
      if (gallery.dataset.category === filter) {
        gallery.style.display = "block";
      } else {
        gallery.style.display = "none";
      }
    });

    // 추가 아이디어(선택):
    // - 페이지 맨 위로 스크롤: window.scrollTo({ top: gallerySection.offsetTop, behavior: 'smooth' });
    // - URL 쿼리 변경: history.pushState({}, '', '?cat=' + encodeURIComponent(filter));
  });
});

/* ============================
   추가: 이미지 클릭 시 라이트박스(확대) 기능 넣기 (옵션)
   - 아래 코드는 선택사항입니다. 원하면 활성화하세요.
   - 방법: 주석 처리(아래 전체 블록 주석) 해제하면 동작합니다.
   - 동작: 이미지 클릭 -> 어두운 배경의 중앙에 큰 이미지 표시 -> 바깥 클릭 또는 ESC로 닫기
   ============================ */

/* 사용을 원하면 아래 블록의 시작/끝 주석(/* ... * /)을 제거하세요. */

/*
(function enableLightbox() {
  // 라이트박스 요소를 동적으로 만들고 본문에 추가
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  // 기본 스타일은 CSS에 추가해야 함(예: position:fixed; inset:0; display:flex; ...)
  document.body.appendChild(lightbox);

  // 모든 그리드 이미지 선택
  const gridImages = document.querySelectorAll('.image-grid img');

  gridImages.forEach(img => {
    img.style.cursor = 'zoom-in'; // 커서 표시
    img.addEventListener('click', () => {
      // 라이트박스 내부 초기화
      lightbox.innerHTML = '';
      const bigImg = document.createElement('img');
      bigImg.src = img.src;
      bigImg.alt = img.alt || '';
      bigImg.style.maxWidth = '90%';
      bigImg.style.maxHeight = '90%';
      lightbox.appendChild(bigImg);
      lightbox.classList.add('active'); // CSS에서 #lightbox.active로 표시
    });
  });

  // 라이트박스 클릭 시 닫기
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('active');
  });
})();
*/

/* ===============================
   📸 라이트박스 팝업 기능
   =============================== */

// 1. 라이트박스(div)를 동적으로 생성해서 body에 추가
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

// 2. 모든 이미지 선택
const images = document.querySelectorAll('.image-grid img');

// 3. 각 이미지에 클릭 이벤트 추가
images.forEach(img => {
  img.style.cursor = 'zoom-in'; // 마우스 커서 변경
  img.addEventListener('click', () => {
    // 라이트박스 활성화
    lightbox.classList.add('active');

    // 라이트박스 안의 기존 내용 제거
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }

    // 클릭한 이미지 복제해서 라이트박스에 추가
    const enlargedImg = document.createElement('img');
    enlargedImg.src = img.src;
    enlargedImg.alt = img.alt || '';
    lightbox.appendChild(enlargedImg);
  });
});

// 4. 라이트박스 클릭 시 닫기
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});
