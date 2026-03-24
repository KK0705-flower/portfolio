const { createApp, ref, onMounted } = Vue;

      if (window.self !== window.top) {
        window.top.location = window.self.location;
      }


createApp({
  setup() {
    
    // --- 1. リアクティブなデータ（State） ---
    const currentYear = ref(new Date().getFullYear()); 
    const isModalOpen = ref(false);
    const videoUrl = ref("./image/todolist_movie.mp4");
    const currentVideo = ref(""); // 動画を格納するための変数

    // --- 2. 関数（Methods） ---
    const openModal = () => {
      currentVideo.value = videoUrl.value;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      currentVideo.value = "";
    };

    // --- 3. ライフサイクル（Lifecycle Hooks） ---
 onMounted(() => {
    // --- 既存のグラフ描画処理 ---
    if (typeof renderRadarChart === 'function') {
        renderRadarChart("js-result--front-end", ["HTML", "CSS", "JS", "jQuery", "Vue.js"], [5, 5, 4, 3, 3], "rgb(255, 99, 132)");
        renderRadarChart("js-result--back-end", ["Python", "Django", "PHP", "JS"], [4, 4, 3, 2], "rgb(99, 141, 255)");
    }

    // --- ここから追加：フェードイン監視処理 ---
  // --- ここから追加：フェードイン監視処理 ---
const observerOptions = {
    root: null,
    // threshold を 0.2 から 0.1（10%）または 0.05（5%）に下げます
    // rootMargin を設定することで、画面に入る少し手前で発火させることができます
    threshold: 0.05, 
    rootMargin: '0px 0px -50px 0px' // 画面下端から50px手前で判定（スマホでのモタつき防止）
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            // 一度表示されたら監視を止める
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 監視対象を登録する処理（もし書いていなければ追記）
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-offset');
    fadeElements.forEach((el) => observer.observe(el));
});


    const stalker = document.getElementById('mouse-stalker');
  
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    // 要素をマウスの位置まで移動させる
    stalker.style.transform = `translate(${x}px, ${y}px)`;
  });

  // --- リンクの上に乗った時に大きくする（お好みで！） ---
  const linkElements = document.querySelectorAll('a, button, .photo img');
  linkElements.forEach(link => {
    link.addEventListener('mouseenter', () => {
      stalker.style.transform += ' scale(4)'; // 4倍に
      stalker.style.backgroundColor = 'rgba(197, 216, 255, 0.6)'; // もっと薄く
    });
    link.addEventListener('mouseleave', () => {
      stalker.style.transform = stalker.style.transform.replace(' scale(4)', '');
      stalker.style.backgroundColor = 'rgba(221, 232, 255, 0.6)';
    });
  });
});

    // すべてをテンプレートに公開
    return {
      currentYear,
      isModalOpen,
      videoUrl,
      currentVideo,
      openModal,
      closeModal
    };
  }
  
}).mount('#app');