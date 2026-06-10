// ============================================================
// events.js — ライブイベントデータ管理ファイル
// 【役割】KLAVIERサイト全体で使うライブスケジュールのデータを
//         ここ1ファイルにまとめています。
//         毎月の更新はこのファイルだけ編集すればOKです。
//         ホームのスライドショーとイベントページの両方が
//         このデータを自動的に読み込みます。
// ============================================================

// 【書き方のルール】
// 各イベントは以下の形式で追加してください：
// {
//   month: 数字（1〜12）,        ← 開催月
//   date: "日付の文字列",        ← 例: "6月7日（土）"
//   title: "イベントタイトル",
//   artist: "出演アーティスト",
//   time: "開演時間",            ← 例: "19:30 open / 20:00 start"
//   charge: "料金",              ← 例: "¥3,000（1ドリンク付）"
//   description: "説明文",       ← 任意・短い紹介文
//   image: "画像ファイルのパス", ← 例: "images/june-live.jpg"（画像がない場合は "" に）
// }

const KLAVIER_EVENTS = [

  // ──────────── 1月 ────────────
  // ここに1月のイベントを追加してください
  // 例:
  // {
  //   month: 1,
  //   date: "1月25日（土）",
  //   title: "New Year Jazz Night",
  //   artist: "豊田チカ with トリオ",
  //   time: "19:30 open / 20:00 start",
  //   charge: "¥3,500（1ドリンク付）",
  //   description: "新年最初のジャズライブ。温かい音楽でお迎えします。",
  //   image: "",
  // },

  // ──────────── 2月 ────────────

  // ──────────── 3月 ────────────

  // ──────────── 4月 ────────────

  // ──────────── 5月 ────────────
  {
    month: 5,
    date: "5月22日（金）",
    artist: "Me-Know trio. 井上尚彦(ds), 野口久和(pf) & 山村隆一(b)",
    title: "Me-Know trio.",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 5,
    date: "5月23日（土）",
    artist: "塚山エリコ(pf), 斉藤クジラ誠(b) & 市原康(ds)",
    title: "塚山エリコ trio",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥4,000",
    description: "",
    image: "",
  },
  {
    month: 5,
    date: "5月29日（金）",
    artist: "谷口英治(cl) & 土田晴信(p)",
    title: "谷口英治 & 土田晴信",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 5,
    date: "5月30日（土）",
    artist: "小林陽一JJM太田寛二(pf), 栗山勇輝(tp), 櫻井智則(ts) & 安田幸司(b)",
    title: "小林陽一JJM",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥4,000",
    description: "",
    image: "",
  },

  // ──────────── 6月 ────────────
  {
    month: 6,
    date: "6月5日（金）",
    artist: "里見紀子(vl) & 森下滋(p)",
    title: "里見紀子 & 森下滋",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 6,
    date: "6月6日（土）",
    artist: "New Standars Quintet. 木村由紀夫(ds), 須藤俊也(p), 山田晃路(b), 右近茂(sax) & 駒野逸美(tb)",
    title: "New Standars Quintet",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,900",
    description: "",
    image: "",
  },
  {
    month: 6,
    date: "6月12日（金）",
    artist: "山川秀明(vo,p), 滝沢ミナコ(fl) & 山口友生(b)",
    title: "山川秀明 trio",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 6,
    date: "6月19日（金）",
    artist: "鈴木良雄(p), 榊原太郎(b)",
    title: "鈴木良雄 & 榊原太郎",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 6,
    date: "6月20日（土）",
    artist: "嶋津健一(p) & 加藤真一(b)",
    title: "嶋津健一 & 加藤真一",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 6,
    date: "6月26日（金）",
    artist: "久米雅之(ds), 加藤友彦(p), 石川隆一(b) & 江澤茜(sax)",
    title: "久米雅之 quartet",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,500",
    description: "",
    image: "",
  },
  {
    month: 6,
    date: "6月27日（土）",
    artist: "向井滋春(tb), 河上修(b) & 小沢咲希(p)",
    title: "向井滋春 trio",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },

  // ──────────── 7月 ────────────

  // ──────────── 8月 ────────────

  // ──────────── 9月 ────────────

  // ──────────── 10月 ────────────

  // ──────────── 11月 ────────────

  // ──────────── 12月 ────────────
  {
    month: 7,
    date: "7月3日(金)",
    title: "佐藤節雄d,吉岡秀晃p &横山裕b。",
    artist: "佐藤節雄d,吉岡秀晃p &横山裕b",
    time: "OPEN 19:00/START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 7,
    date: "７月４日(土)",
    title: "川嶋哲郎sax,熊谷ヤスマサp &本川悠平b",
    artist: "川嶋哲郎sax,熊谷ヤスマサp &本川悠平b",
    time: "OPEN 7:00/START 7:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 7,
    date: "7月10日(金)",
    title: "クラヴィエールSuper Jam Session,vol 4",
    artist: "関根敏行p &水橋孝b",
    time: "OPEN 19:00/START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 7,
    date: "7月11日(土)",
    title: "Vocal Jam Session.神村晃司p &堀江大輔b",
    artist: "神村晃司p &堀江大輔b",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,000",
    description: "ﾌﾟﾛﾐｭｰｼﾞｼｬﾝはゲスト扱いです。",
    image: "",
  },
  {
    month: 7,
    date: "🈵7月17日(金)",
    title: "🈵豊田チカ,田中裕士p,水橋孝b & 小山太郎d",
    artist: "豊田チカ,田中裕士p,水橋孝b & 小山太郎d",
    time: "OPEN 19:00/ START 19:30",
    charge: "¥3,900",
    description: "",
    image: "",
  },
  {
    month: 7,
    date: "7月18日(土)",
    title: "高瀬龍一tp,平岡遊一郎g &続木徹p",
    artist: "高瀬龍一tp,平岡遊一郎g &続木徹p",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 7,
    date: "7月24日(金)",
    title: "井上祐一p,本川悠平b &田村陽介d ",
    artist: "井上祐一p,本川悠平b &田村陽介d ",
    time: "OPEN 19:00/START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },
  {
    month: 7,
    date: "7月25日(土)",
    title: "杉本篤彦g, 進藤陽悟p",
    artist: "杉本篤彦g, 進藤陽悟p",
    time: "OPEN 19:00 / START 19:30",
    charge: "¥3,000",
    description: "",
    image: "",
  },








];

// ============================================================
// 【関数】指定した月のイベントだけを返す
// 使い方: getEventsByMonth(6) → 6月のイベント配列が返る
// ============================================================
function getEventsByMonth(month) {
  return KLAVIER_EVENTS.filter(event => event.month === month);
}

// ============================================================
// 【関数】日本時間で「今月」のイベントを返す
// 【重要】JavaScriptのDateは実行環境のタイムゾーンに依存するため、
//         日本時間（UTC+9）を明示的に計算しています。
// ============================================================
function getCurrentMonthEvents() {
  // UTCの現在時刻に9時間（32400秒）を足して日本時間を求める
  const nowJST = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const currentMonth = nowJST.getUTCMonth() + 1; // getUTCMonth()は0始まりなので+1
  return getEventsByMonth(currentMonth);
}

// ============================================================
// 【関数】日本時間の「今月」の月番号を返す（1〜12）
// ============================================================
function getCurrentMonthNumber() {
  const nowJST = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return nowJST.getUTCMonth() + 1;
}
