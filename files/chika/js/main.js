// ============================================================
// main.js — 豊田チカサイト 共通JavaScript
// 【役割】ナビゲーションの動作・フォーム送信・現在ページの強調など
// ============================================================

// ============================================================
// ① ナビゲーション：スクロール時に影を付ける
// ============================================================
const nav = document.querySelector('.nav');

if (nav) {
  window.addEventListener('scroll', () => {
    // 30px以上スクロールしたらnavに.scrolledクラスを付与
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });
}

// ============================================================
// ② ハンバーガーメニュー（スマートフォン用）
// ============================================================
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    // アクセシビリティ：メニューの開閉状態をaria属性で伝える
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================================
// ③ 現在のページのナビリンクを強調する
// 【仕組み】現在のURLのファイル名と各リンクのhref属性を比較して
//           一致したリンクに .current クラスを付ける
// ============================================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop();
  if (linkPage === currentPage) {
    link.classList.add('current');
  }
});

// ============================================================
// ④ Vocal Lessonページ：フォーム送信処理
// 【役割】フォームの入力値をGmailのmailto:リンクで送信する。
//         サーバー不要でシンプルに実装。
//         ※ 宛先メールアドレスは後で設定（TO_EMAIL の部分）
// ============================================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // フォームのデフォルト送信（ページリロード）を止める

    // 各入力フィールドの値を取得
    const name    = document.getElementById('form-name').value.trim();
    const contact = document.getElementById('form-contact').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // 未入力チェック
    if (!name || !contact || !message) {
      alert('すべての項目をご記入ください。');
      return;
    }

    // ── メールの内容を組み立てる ──
    // %0A は改行を表すURLエンコード
    const subject = encodeURIComponent('【ボイスレッスンのお問い合わせ】' + name + '様');
    const body    = encodeURIComponent(
      'お名前：' + name + '\n' +
      '連絡先：' + contact + '\n\n' +
      'メッセージ：\n' + message
    );

    // ── mailto: リンクを生成してGmailを開く ──
    // TO_EMAIL の部分に実際の宛先アドレスを入れてください
    const TO_EMAIL = ''; // ← ここに宛先メールアドレスを入力してください
    const mailtoLink = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;

    // メールクライアントを開く
    window.location.href = mailtoLink;

    // 送信完了メッセージを表示
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success');

    if (successMsg) {
      contactForm.style.display = 'none'; // フォームを非表示
      successMsg.style.display = 'block'; // 完了メッセージを表示
    }
  });
}
