/* Per-beat stages for 模擬測驗講解／Mock 講解 · Book A Ch1–4.
   31 beats: intro, MC1–MC20, Section B parts, outro.
   Pure playback lecture cards. No quiz controls. */
function dom(html) {
  var tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function must(root, sel) {
  var node = root.querySelector(sel);
  if (!node) throw new Error("Missing " + sel + " in " + (root.id || "scene"));
  return node;
}

function all(root, sel) {
  var list = root.querySelectorAll(sel);
  if (!list.length) throw new Error("Missing " + sel + " in " + (root.id || "scene"));
  return list;
}

function enter(tl, target, at, fromVars, toVars) {
  var to = Object.assign({ autoAlpha: 1, duration: 0.38, ease: "power2.out" }, toVars || {});
  delete to.y;
  delete to.x;
  delete to.scale;
  tl.fromTo(target, { autoAlpha: 0, immediateRender: true }, to, at);
}

function beatDur(root) {
  var n = Number(root.dataset.duration);
  return n > 0 ? n : 40;
}

function revealAt(root, start, lead) {
  return start + Math.max(lead, beatDur(root) - 6);
}

var MC = {
  B02: { n: "1", title: "數據 vs 資訊", focus: "原始讀數，尚未製成圖表或警報", answer: "A", why: "尚未詮釋 → 數據", opts: [["A", "數據 · 未詮釋"], ["B", "資訊 · 已處理"], ["C", "知識"], ["D", "智慧"]] },
  B03: { n: "2", title: "IPO 模型", focus: "收集選票 → 統計 → 顯示結果", answer: "B", why: "輸入、處理、輸出", opts: [["A", "儲存—輸出—輸入"], ["B", "輸入—處理—輸出"], ["C", "壓縮—傳輸—解壓"], ["D", "加密—備份—還原"]] },
  B04: { n: "3", title: "不是系統組件", focus: "邊一項不是資訊系統組成部分", answer: "D", why: "平面圖只是裝飾", opts: [["A", "掃描器 · 硬件"], ["B", "收銀軟件"], ["C", "銷售紀錄 · 數據"], ["D", "佈置平面圖"]] },
  B05: { n: "4", title: "感測器是輸入", focus: "雨量感測器量度降雨並送入系統", answer: "A", why: "量度後送入 → 輸入", opts: [["A", "輸入裝置"], ["B", "輸出裝置"], ["C", "顯示裝置"], ["D", "列印裝置"]] },
  B06: { n: "5", title: "資訊素養", focus: "網上文章聲稱一律不可信", answer: "C", why: "查證來源再判斷", opts: [["A", "立刻轉發"], ["B", "刪除、不再查證"], ["C", "查核來源再判斷"], ["D", "只看標題"]] },
  B07: { n: "6", title: "有效性檢驗", focus: "身高必須介乎 40–250 cm", answer: "D", why: "範圍規則 → 有效性檢驗", opts: [["A", "核實"], ["B", "加密"], ["C", "備份"], ["D", "有效性檢驗"]] },
  B08: { n: "7", title: "主關鍵字", focus: "全場唯一票號，用以識別", answer: "C", why: "唯一識別 → 主關鍵字", opts: [["A", "備註欄"], ["B", "校驗位元"], ["C", "主關鍵字"], ["D", "壓縮參數"]] },
  B09: { n: "8", title: "直接存取", focus: "可跳至指定時點，不必由頭讀", answer: "D", why: "可定位 → 直接存取", opts: [["A", "順序存取"], ["B", "只適用磁帶"], ["C", "整卷下載"], ["D", "直接存取"]] },
  B10: { n: "9", title: "數據控制", focus: "借用系統施行數據控制的目的", answer: "B", why: "準確、完整、獲授權", opts: [["A", "增加步驟阻嚇"], ["B", "準確、完整、授權"], ["C", "提高解像度"], ["D", "加快處理器時脈"]] },
  B11: { n: "10", title: "存在檢查", focus: "必填欄不得留空", answer: "A", why: "有沒有填 → 存在檢查", opts: [["A", "存在檢查"], ["B", "範圍檢查"], ["C", "類型檢查"], ["D", "檢查位數"]] },
  B12: { n: "11", title: "43 轉十六進制", focus: "43 ÷ 16 = 2 餘 11", answer: "B", why: "餘數 11 寫成 B", opts: [["A", "25₁₆"], ["B", "2B₁₆"], ["C", "2D₁₆"], ["D", "2F₁₆"]] },
  B13: { n: "12", title: "位值 2³", focus: "101101₂，由右數第三個 1", answer: "C", why: "第三個 1 的位值是 2³", opts: [["A", "2¹"], ["B", "2²"], ["C", "2³"], ["D", "2⁴"]] },
  B14: { n: "13", title: "−53 二進制補碼", focus: "八位元二進制補碼表示 −53", answer: "C", why: "取反加一 → 11001011", opts: [["A", "00110101"], ["B", "10110100"], ["C", "11001011"], ["D", "01001011"]] },
  B15: { n: "14", title: "ASCII 五位元組", focus: "Hello · 每字元一位元組", answer: "A", why: "5 字元 × 1 位元組", opts: [["A", "5 位元組"], ["B", "6 位元組"], ["C", "10 位元組"], ["D", "40 位元組"]] },
  B16: { n: "15", title: "偶校驗位 = 1", focus: "1011011 · 五個 1 · 偶校驗", answer: "B", why: "奇數個 1，校驗位設 1", opts: [["A", "設 0"], ["B", "設 1"], ["C", "無法計算"], ["D", "取決於介質"]] },
  B17: { n: "16", title: "點陣放大", focus: "點陣圖放大數倍作大型輸出", answer: "A", why: "像素放大 → 鋸齒失真", opts: [["A", "鋸齒失真"], ["B", "檔案必然變小"], ["C", "色彩自動更鮮豔"], ["D", "仍完全銳利"]] },
  B18: { n: "17", title: "2¹⁶ = 65536", focus: "十六位元色彩深度的顏色種數", answer: "B", why: "2¹⁶ = 65536", opts: [["A", "16"], ["B", "65536"], ["C", "32768"], ["D", "256"]] },
  B19: { n: "18", title: "像素解像度", focus: "手機與大電視都仍然清楚", answer: "D", why: "較高像素解像度保留細節", opts: [["A", "較低位元率"], ["B", "較少音軌"], ["C", "較小檔案"], ["D", "較高像素解像度"]] },
  B20: { n: "19", title: "96 KB 單色", focus: "1024×768 · 1 bit · 未壓縮", answer: "D", why: "÷8 ÷1024 = 96 KB", opts: [["A", "768 KB"], ["B", "1024 KB"], ["C", "192 KB"], ["D", "96 KB"]] },
  B21: { n: "20", title: "GIF 透明與動畫", focus: "背景透明，同時要簡單幀動畫", answer: "C", why: "GIF 可透明加簡單動畫", opts: [["A", "JPEG"], ["B", "BMP"], ["C", "GIF"], ["D", "TIFF"]] }
};

function buildB01() {
  return dom(
    '<div data-layout="intro">' +
      '<p class="mc-kicker">YLCSS · S4 ICT · 純播放</p>' +
      "<h2>模擬測驗講解<br>Book A · Ch1–4</h2>" +
      '<div class="score-row">' +
        '<article class="inkbox"><b>50</b><span>全卷</span></article>' +
        '<article class="inkbox"><b>20</b><span>甲部</span></article>' +
        '<article class="inkbox"><b>30</b><span>乙部</span></article>' +
      "</div>" +
      '<div class="tech-row">' +
        "<article class=\"inkbox\"><h3>1 標重點</h3></article>" +
        "<article class=\"inkbox\"><h3>2 分有用</h3></article>" +
        "<article class=\"inkbox\"><h3>3 逐個剔</h3></article>" +
        "<article class=\"inkbox\"><h3>4 最後揭示</h3></article>" +
      "</div>" +
    "</div>"
  );
}

function tweensB01(tl, root, start) {
  enter(tl, must(root, "h2"), start + 0.2, { y: 28 });
  enter(tl, all(root, ".score-row article"), start + 1.2, { y: 16 }, { y: 0, stagger: 0.12 });
  enter(tl, all(root, ".tech-row article"), start + 4, { y: 18 }, { y: 0, stagger: 0.2, duration: 0.36 });
}

function buildMC(beat) {
  var spec = MC[beat.id];
  var cards = spec.opts.map(function (pair) {
    var cls = pair[0] === spec.answer ? "opt is-answer" : "opt is-wrong";
    return '<article class="' + cls + '" data-letter="' + esc(pair[0]) + '"><b>' + esc(pair[0]) + "</b><span>" + esc(pair[1]) + "</span></article>";
  }).join("");
  return dom(
    '<div class="scene-mc" data-layout="mc">' +
      '<p class="mc-kicker">甲部 · 第 ' + esc(spec.n) + " 題</p>" +
      "<h2>" + esc(spec.title) + "</h2>" +
      '<p class="focus-line">' + esc(spec.focus) + "</p>" +
      '<div class="opt-grid">' + cards + "</div>" +
      '<p class="answer-stamp">答案 ' + esc(spec.answer) + " · " + esc(spec.why) + "</p>" +
    "</div>"
  );
}

function tweensMC(tl, root, start) {
  var dur = beatDur(root);
  enter(tl, must(root, "h2"), start + 0.15, { y: 20 });
  enter(tl, must(root, ".focus-line"), start + 1.1, { x: -16 });
  enter(tl, all(root, ".opt"), start + 2.4, { y: 16 }, { y: 0, stagger: 0.1, duration: 0.3 });
  var wrong = root.querySelectorAll(".opt.is-wrong");
  var gap = Math.min(4.5, Math.max(1.5, (dur - 16) / Math.max(wrong.length, 1)));
  Array.prototype.forEach.call(wrong, function (node, index) {
    tl.call(function () { node.classList.add("is-cut"); }, null, start + 7 + index * gap);
  });
  var at = revealAt(root, start, 12);
  tl.call(function () {
    var keep = root.querySelector(".opt.is-answer");
    if (keep) keep.classList.add("is-keep");
  }, null, at);
  enter(tl, must(root, ".answer-stamp"), at, { scale: 1.25 }, { scale: 1, duration: 0.32 });
}

function cards(items) {
  return items.map(function (item) {
    return '<article class="explain-card"><p class="explain-kicker">' + esc(item[0]) + "</p><h3>" + esc(item[1]) + "</h3><p>" + esc(item[2]) + "</p></article>";
  }).join("");
}

function buildB22() {
  return dom(
    '<div data-layout="classify">' +
      '<p class="mc-kicker">乙部 · B1(a) · 網店／倉庫</p>' +
      "<h2>四項歸類</h2>" +
      '<div class="explain-grid cols-4">' + cards([
        ["硬件", "熱敏出貨單打印機", "實體裝置"],
        ["軟件", "庫存管理應用程式", "可執行程式"],
        ["數據", "顧客訂單紀錄", "要儲存的事實"],
        ["程序", "核對貨品指引", "人員依循的步驟"]
      ]) + "</div>" +
    "</div>"
  );
}

function tweensGrid(tl, root, start) {
  enter(tl, must(root, "h2"), start + 0.15, { y: 18 });
  enter(tl, all(root, ".explain-card"), start + 1.2, { y: 16 }, { y: 0, stagger: 0.16, duration: 0.34 });
}

function buildB23() {
  return dom(
    '<div data-layout="devices">' +
      '<p class="mc-kicker">乙部 · B1(b)</p>' +
      "<h2>兩種輸入裝置，各加優點</h2>" +
      '<div class="explain-grid cols-3">' + cards([
        ["例子", "條碼／QR 掃描器", "輸入快，少鍵錯"],
        ["例子", "手提數據終端機", "貨架旁即時核對"],
        ["例子", "RFID 讀取器", "一次讀多件標籤"]
      ]) + "</div>" +
      '<p class="warn-line anchor">要寫裝置加優點</p>' +
    "</div>"
  );
}

function tweensB23(tl, root, start) {
  tweensGrid(tl, root, start);
  enter(tl, must(root, ".warn-line"), revealAt(root, start, 8), { y: 10 });
}

function buildB24() {
  return dom(
    '<div data-layout="format">' +
      '<p class="mc-kicker">乙部 · B1(c)</p>' +
      "<h2>格式檢查</h2>" +
      '<p class="formula">AB1234</p>' +
      '<p class="focus-line">兩個大階英文字母 + 四位數字</p>' +
      '<div class="explain-grid cols-2">' + cards([
        ["目的", "符合預定格式", "減少無效編碼"],
        ["不是", "核實／範圍檢查", "重點是字元模式"]
      ]) + "</div>" +
    "</div>"
  );
}

function tweensB24(tl, root, start) {
  enter(tl, must(root, ".formula"), start + 0.3, { scale: 0.8 }, { scale: 1 });
  enter(tl, must(root, ".focus-line"), start + 1.4, { y: 12 });
  enter(tl, all(root, ".explain-card"), start + 3, { y: 14 }, { y: 0, stagger: 0.16 });
}

function bitRow(pattern) {
  return '<div class="bit-row">' + String(pattern).split("").map(function (ch) {
    return '<span class="bit' + (ch === "1" ? " on" : "") + '">' + esc(ch) + "</span>";
  }).join("") + "</div>";
}

function buildB25() {
  return dom(
    '<div data-layout="twos">' +
      '<p class="mc-kicker">乙部 · B2(a) · 二進制補碼</p>' +
      "<h2>還原 10110010₂</h2>" +
      '<div class="step-row">' +
        '<article class="step inkbox"><span>1</span><b>MSB = 1<small>負數</small></b></article>' +
        '<article class="step inkbox"><span>2</span><b>取反<small>01001101</small></b></article>' +
        '<article class="step inkbox"><span>3</span><b>加一<small>01001110 = 78</small></b></article>' +
      "</div>" +
      bitRow("10110010") +
      '<p class="answer-stamp">−78</p>' +
    "</div>"
  );
}

function tweensB25(tl, root, start) {
  enter(tl, must(root, "h2"), start + 0.15, { y: 16 });
  enter(tl, all(root, ".step"), start + 1.4, { y: 14 }, { y: 0, stagger: 0.45, duration: 0.34 });
  enter(tl, must(root, ".bit-row"), start + 4.2, { y: 10 });
  enter(tl, must(root, ".answer-stamp"), revealAt(root, start, 10), { scale: 1.3 }, { scale: 1 });
}

function buildB26() {
  return dom(
    '<div data-layout="msb">' +
      '<p class="mc-kicker">乙部 · B2(b)</p>' +
      "<h2>MSB 是符號位</h2>" +
      '<div class="pair-grid">' +
        '<article class="explain-card"><h3>1</h3><p>負數</p></article>' +
        '<article class="explain-card"><h3>0</h3><p>正數或零</p></article>' +
      "</div>" +
      '<p class="focus-line">符號位參與計算，並決定正負</p>' +
    "</div>"
  );
}

function tweensB26(tl, root, start) {
  enter(tl, all(root, ".explain-card"), start + 0.6, { y: 16 }, { y: 0, stagger: 0.2 });
  enter(tl, must(root, ".focus-line"), start + 3.2, { y: 12 });
}

function buildB27() {
  return dom(
    '<div data-layout="parity">' +
      '<p class="mc-kicker">乙部 · B2(c) · 奇校驗</p>' +
      "<h2>數據位 1011001</h2>" +
      bitRow("1011001") +
      '<div class="explain-grid cols-2">' + cards([
        ["數一", "四個 1", "偶數"],
        ["校驗位", "設為 1", "合計五個 1"]
      ]) + "</div>" +
      '<p class="answer-stamp">奇校驗位 = 1</p>' +
    "</div>"
  );
}

function tweensB27(tl, root, start) {
  enter(tl, must(root, ".bit-row"), start + 0.4, { y: 12 });
  tweensGrid(tl, root, start + 1);
  enter(tl, must(root, ".answer-stamp"), revealAt(root, start, 8), { scale: 1.2 }, { scale: 1 });
}

function buildB28() {
  return dom(
    '<div data-layout="graphics">' +
      '<p class="mc-kicker">乙部 · B3(a)</p>' +
      "<h2>點陣 vs 向量</h2>" +
      '<div class="pair-grid">' + cards([
        ["點陣圖", "像素網格", "由點構成"],
        ["向量圖", "線、曲線、形狀", "數學物件描述"]
      ]) + "</div>" +
      '<p class="focus-line">標誌、字型、線條圖較適合向量圖</p>' +
    "</div>"
  );
}

function tweensB28(tl, root, start) {
  tweensGrid(tl, root, start);
  enter(tl, must(root, ".focus-line"), start + 4, { y: 12 });
}

function buildB29() {
  return dom(
    '<div data-layout="digitise">' +
      '<p class="mc-kicker">乙部 · B3(b)</p>' +
      "<h2>取樣與量化</h2>" +
      '<div class="pair-grid">' + cards([
        ["取樣", "按間距擷取樣本", "關乎解像度"],
        ["量化", "連續值對應離散級", "關乎色彩深度"]
      ]) + "</div>" +
    "</div>"
  );
}

function buildB30() {
  return dom(
    '<div data-layout="filesize">' +
      '<p class="mc-kicker">乙部 · B3(c)</p>' +
      "<h2>估算檔案大小</h2>" +
      '<p class="formula">1920 × 1080 × 24 ÷ 8 ÷ 1024²</p>' +
      '<div class="formula-steps explain-grid">' +
        '<article class="inkbox"><b>6,220,800</b><span>位元組</span></article>' +
        '<span class="arrow">→</span>' +
        '<article class="inkbox formula-result"><b>≈ 5.93 MB</b><span>接受 5.93–5.94</span></article>' +
      "</div>" +
    "</div>"
  );
}

function tweensB30(tl, root, start) {
  enter(tl, must(root, ".formula"), start + 0.3, { y: -12 });
  enter(tl, all(root, ".formula-steps article"), start + 2.2, { y: 14 }, { y: 0, stagger: 0.35 });
}

function buildB31() {
  return dom(
    '<div data-layout="outro">' +
      '<p class="mc-kicker">Mock 講解</p>' +
      "<h2>重播難點</h2>" +
      '<div class="explain-grid cols-3 recap-row">' + cards([
        ["B2(a)", "−78", "二進制補碼"],
        ["B2(c)", "校驗位 1", "奇校驗"],
        ["B3(c)", "5.93 MB", "1024 的二次方"]
      ]) + "</div>" +
      '<p class="focus-line">甲部：先標重點、剔錯項，最後先填答案字母</p>' +
    "</div>"
  );
}

function tweensB31(tl, root, start) {
  tweensGrid(tl, root, start);
  enter(tl, must(root, ".focus-line"), start + 3.4, { y: 12 });
}

var SCENE_BUILDERS = {
  B01: buildB01,
  B22: buildB22,
  B23: buildB23,
  B24: buildB24,
  B25: buildB25,
  B26: buildB26,
  B27: buildB27,
  B28: buildB28,
  B29: buildB29,
  B30: buildB30,
  B31: buildB31
};

var SCENE_TWEENS = {
  B01: tweensB01,
  B22: tweensGrid,
  B23: tweensB23,
  B24: tweensB24,
  B25: tweensB25,
  B26: tweensB26,
  B27: tweensB27,
  B28: tweensB28,
  B29: tweensGrid,
  B30: tweensB30,
  B31: tweensB31
};

Object.keys(MC).forEach(function (id) {
  SCENE_BUILDERS[id] = buildMC;
  SCENE_TWEENS[id] = tweensMC;
});

function buildScene(beat) {
  var fn = SCENE_BUILDERS[beat.id];
  if (!fn) throw new Error("No scene builder for " + beat.id);
  var node = fn(beat);
  node.classList.add("scene");
  node.id = "scene-" + beat.id;
  node.dataset.beat = beat.id;
  node.dataset.duration = String(beat.duration_s);
  return node;
}

function addSceneTweens(tl, beat, root, start) {
  var fn = SCENE_TWEENS[beat.id];
  if (!fn) throw new Error("No scene tweens for " + beat.id);
  fn(tl, root, start);
}

function mountScenes(stack) {
  stack.innerHTML = "";
  CH4_BEATS.forEach(function (beat) {
    if (!SCENE_BUILDERS[beat.id] || !SCENE_TWEENS[beat.id]) {
      throw new Error("Missing scene " + beat.id);
    }
    stack.appendChild(buildScene(beat));
  });
}
