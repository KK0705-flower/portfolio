const { createApp, ref, onMounted } = Vue;

// 外部サイトからの埋め込み（iframe）を制限する処理
if (window.self !== window.top) {
  window.top.location = window.self.location;
}

createApp({
  setup() {
    // --- 1. リアクティブなデータ ---
    const currentYear = ref(new Date().getFullYear());
    const isModalOpen = ref(false);
    const videoUrl = ref("./image/todolist_movie.mp4");
    const currentVideo = ref("");

    // --- 2. 関数（モーダル操作） ---
    const openModal = () => {
      currentVideo.value = videoUrl.value;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      currentVideo.value = "";
    };

    // --- 3. ライフサイクル（マウント時に実行） ---
    onMounted(() => {
      // --- レーダーチャートの描画 ---
      if (typeof renderRadarChart === 'function') {
        renderRadarChart("js-result--front-end", ["HTML", "CSS", "JS", "jQuery", "Vue.js"], [5, 5, 4, 3, 3], "rgb(255, 99, 132)");
        renderRadarChart("js-result--back-end", ["Python", "Django", "PHP", "Node.js"], [4, 4, 3, 2], "rgb(99, 141, 255)");
      }

      // --- フェードイン監視（IntersectionObserver） ---
      const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const fadeElements = document.querySelectorAll('.fade-in-offset');
      fadeElements.forEach((el) => observer.observe(el));

      // --- マウスストーカーの処理 ---
      const stalker = document.getElementById('mouse-stalker');
      if (stalker) {
        window.addEventListener('mousemove', (e) => {
          stalker.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        const linkElements = document.querySelectorAll('a, button, .photo img');
        linkElements.forEach(link => {
          link.addEventListener('mouseenter', () => {
            stalker.classList.add('is-active'); // CSSで scale を操作するのがおすすめ
          });
          link.addEventListener('mouseleave', () => {
            stalker.classList.remove('is-active');
          });
        });
      }
    });

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