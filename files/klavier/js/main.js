// ============================================================
// main.js — KLAVIERサイト 共通JavaScript
// 【役割】ナビゲーションの動作、スクロール検知など
//         全ページ共通で使う動きを書いています。
// ============================================================

// ============================================================
// ① ナビゲーション：スクロールしたら影を付ける
// ============================================================
const nav = document.querySelector('.nav');

if (nav) {
  // ページをスクロールするたびにこの関数が呼ばれる
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');    // 20px以上スクロールしたら影クラスを追加
    } else {
      nav.classList.remove('scrolled'); // 上に戻ったら影クラスを除去
    }
  });
}

// ============================================================
// ② ハンバーガーメニュー（スマートフォン用）
// ============================================================
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    // .open クラスのオンオフでメニューの表示・非表示を切り替える
    navLinks.classList.toggle('open');
  });

  // メニューのリンクをクリックしたらメニューを閉じる
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ============================================================
// ③ スライドショー（ホームページの「今月のおすすめ」）
// 【役割】events.js のデータから今月のイベントを取得し、
//         スライドを生成してカード表示する。
//         自動で数秒ごとに次のスライドへ切り替わる。
// ============================================================
function initSlideshow() {
  const container = document.getElementById('slideshow-container'); // スライドを入れる場所
  const dotsContainer = document.getElementById('slideshow-dots');  // ドットナビを入れる場所
  const monthLabel = document.getElementById('current-month-label');

  if (!container) return; // スライドショーがないページでは何もしない

  // 日本時間の今月のイベントを取得（events.js の関数を使う）
  const events = getCurrentMonthEvents();
  const currentMonth = getCurrentMonthNumber();

  // 今月の表示名をセット（例:「6月のライブ」）
  if (monthLabel) {
    monthLabel.textContent = currentMonth + '月のライブ';
  }

  // イベントが0件の場合
  if (events.length === 0) {
    container.innerHTML = `
      <div class="no-events">
        <p>今月のライブ情報は準備中です。<br>お楽しみに。</p>
      </div>
    `;
    return;
  }

  // ── スライドを生成する ──
  events.forEach((event, index) => {
    // スライド要素を作成
    const slide = document.createElement('div');
    slide.classList.add('slide');
    if (index === 0) slide.classList.add('active'); // 最初のスライドだけ表示

    // 画像があれば img タグ、なければプレースホルダーを表示
    const imageHTML = event.image
      ? `<img src="${event.image}" alt="${event.title}">`
      : `<div class="event-card-image-placeholder">♩</div>`;

    // カードのHTMLを組み立てる
    slide.innerHTML = `
      <div class="event-card">
        <div class="event-card-image">${imageHTML}</div>
        <div class="event-card-body">
          <div class="event-card-date">${event.date}</div>
          <h3 class="event-card-title">${event.title}</h3>
          <p class="event-card-artist">${event.artist}</p>
          <div class="event-card-detail">
            <strong>時間</strong>${event.time}<br>
            <strong>料金</strong>${event.charge}
          </div>
          <p style="font-size:0.82rem; color: var(--color-text-muted);">${event.description}</p>
        </div>
      </div>
    `;
    container.appendChild(slide);

    // ドット（ナビゲーション用の小さな丸）を生成
    if (dotsContainer) {
      const dot = document.createElement('button');
      dot.classList.add('slideshow-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', (index + 1) + '枚目のスライド');

      // ドットをクリックしたらそのスライドに移動
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    }
  });

  // ── スライドを切り替える関数 ──
  let currentSlide = 0; // 今表示中のスライド番号

  function goToSlide(index) {
    const slides = container.querySelectorAll('.slide');
    const dots   = dotsContainer ? dotsContainer.querySelectorAll('.slideshow-dot') : [];

    // 全スライド・ドットから active クラスを外す
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    // 指定スライドだけ active に
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    currentSlide = index;
  }

  // ── 自動スライド切り替え（5秒ごと）──
  if (events.length > 1) { // スライドが2枚以上ある場合のみ自動再生
    setInterval(() => {
      const slides = container.querySelectorAll('.slide');
      const next = (currentSlide + 1) % slides.length; // 最後のスライドの次は最初に戻る
      goToSlide(next);
    }, 5000); // 5000ミリ秒 = 5秒
  }
}

// ============================================================
// ④ イベントページの月別タブ切り替え
// 【役割】月タブをクリックすると、その月のイベントを
//         events.js のデータから取得して表示する。
// ============================================================
function initEventTabs() {
  const tabsContainer  = document.getElementById('month-tabs');
  const eventsContainer = document.getElementById('events-list');

  if (!tabsContainer || !eventsContainer) return; // イベントページ以外では何もしない

  const currentMonth = getCurrentMonthNumber();

  // ── 12ヶ月分のタブボタンを生成する ──
  const monthNames = ['1月','2月','3月','4月','5月','6月',
                      '7月','8月','9月','10月','11月','12月'];

  monthNames.forEach((name, i) => {
    const month = i + 1; // 配列は0始まりなので+1
    const tab = document.createElement('button');
    tab.classList.add('month-tab');
    tab.textContent = name;

    // 今月のタブにはデフォルトで active クラスを付与
    if (month === currentMonth) tab.classList.add('active');

    // タブをクリックしたらその月のイベントを表示
    tab.addEventListener('click', () => {
      // 全タブから active を外す
      tabsContainer.querySelectorAll('.month-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active'); // クリックしたタブだけ active に

      renderEvents(month); // イベント一覧を再描画
    });

    tabsContainer.appendChild(tab);
  });

  // ── イベント一覧を描画する関数 ──
  function renderEvents(month) {
    const events = getEventsByMonth(month); // events.js から取得
    eventsContainer.innerHTML = ''; // 一旦中身をクリア

    if (events.length === 0) {
      // イベントがない月
      eventsContainer.innerHTML = `
        <div class="no-events">
          <p>この月のイベント情報は<br>現在準備中です。</p>
        </div>
      `;
      return;
    }

    // イベントの数だけリストアイテムを生成
    events.forEach(event => {
      const item = document.createElement('div');
      item.classList.add('event-list-item');

      item.innerHTML = `
        <div class="event-list-date">
          <div class="event-list-date-text">${event.date}</div>
        </div>
        <div class="event-list-body">
          <h3 class="event-list-title">${event.title}</h3>
          <p class="event-list-artist">${event.artist}</p>
          <div class="event-list-meta">
            <strong>時間</strong>${event.time}<br>
            <strong>料金</strong>${event.charge}<br>
            ${event.description ? '<span style="color:var(--color-text-muted)">' + event.description + '</span>' : ''}
          </div>
        </div>
        <div class="event-list-cta">
          <a href="tel:0333930418" class="btn-primary" style="white-space:nowrap;">予約する</a>
        </div>
      `;

      eventsContainer.appendChild(item);
    });
  }

  // ページ読み込み時に今月のイベントを表示
  renderEvents(currentMonth);
}

// ============================================================
// ページが読み込まれたら各初期化関数を実行する
// DOMContentLoaded: HTMLの読み込みが完了したタイミングで発火するイベント
// ============================================================
// ============================================================
// ⑤ 予約フォーム（Formspree）送信処理
// 【役割】フォームをAjaxで送信し、ページ遷移せずに
//         完了メッセージを表示する。
// 【仕組み】fetchでFormspreeにPOST送信。成功したら
//           フォームを非表示にして完了メッセージを表示。
// ============================================================
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return; // 予約フォームがないページでは何もしない

  form.addEventListener('submit', async function(e) {
    e.preventDefault(); // デフォルトのページ遷移を止める

    const btn = document.getElementById('reservation-submit');
    btn.textContent = '送信中...';
    btn.disabled = true; // 二重送信を防ぐ

    try {
      // FormspreeにAjaxでデータを送信
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form), // フォームの入力内容をそのまま送る
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // 送信成功 → フォームを隠して完了メッセージを表示
        form.style.display = 'none';
        document.getElementById('reservation-success').style.display = 'block';
      } else {
        // 送信失敗
        btn.textContent = '送信に失敗しました。再度お試しください。';
        btn.disabled = false;
      }
    } catch (error) {
      btn.textContent = 'エラーが発生しました。お電話にてご予約ください。';
      btn.disabled = false;
    }
  });
}

// ============================================================
// ページが読み込まれたら各初期化関数を実行する
// DOMContentLoaded: HTMLの読み込みが完了したタイミングで発火するイベント
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initSlideshow();        // スライドショーの初期化
  initEventTabs();        // 月別タブの初期化
  initReservationForm();  // 予約フォームの初期化
});
