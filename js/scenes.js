/* Per-beat stages for 模擬測驗講解／Mock 講解 · Book A Ch1–4.
   One builder and one tween set per beat. Black/white projection stage.
   Pure playback: worked steps and lecture cards, no quiz controls. */
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
  tl.fromTo(
    target,
    Object.assign({ autoAlpha: 0, immediateRender: true }, fromVars || {}),
    Object.assign({ autoAlpha: 1, duration: 0.38, ease: "back.out(1.6)" }, toVars || {}),
    at
  );
}

function pulse(tl, el, at) {
  tl.to(el, {
    scale: 1.06,
    duration: 0.22,
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut",
    transformOrigin: "center center"
  }, at);
}

function ink(tl, nodes, at, step) {
  tl.to(nodes, {
    backgroundColor: "#000",
    color: "#fff",
    borderColor: "#000",
    duration: 0.22,
    stagger: step || 0.2,
    ease: "power2.out"
  }, at);
}

function caption(text) {
  return '<p class="caption anchor">' + esc(text) + "</p>";
}

function stampOf(beat) {
  return '<div class="stamp-wrap"><div class="stamp">' + esc(beat.stamp) + "</div></div>";
}

function explainGrid(items, cols) {
  return '<div class="explain-grid cols-' + cols + '">' + items.map(function (item) {
    var extra = item.extra ? '<p class="explain-extra">' + esc(item.extra) + "</p>" : "";
    var mark = item.mark ? '<span class="choice">' + esc(item.mark) + "</span>" : "";
    return '<article class="explain-card">' + mark +
      '<p class="explain-kicker">' + esc(item.kicker) + "</p>" +
      "<h3>" + esc(item.title) + "</h3>" +
      "<p>" + esc(item.body) + "</p>" + extra + "</article>";
  }).join("") + "</div>";
}

function bitRow(pattern, extra) {
  return '<div class="bit-row' + (extra ? " " + extra : "") + '">' + String(pattern).split("").map(function (ch) {
    if (ch === " ") return '<span class="bit gap"></span>';
    var on = ch === "1" ? " on" : "";
    return '<span class="bit' + on + '">' + esc(ch) + "</span>";
  }).join("") + "</div>";
}

function buildB01(beat) {
  return dom(
    '<div data-layout="title-scores">' +
      '<div class="hero sticker anchor">' +
        '<div><p class="eyebrow">' + esc(beat.eyebrow) + "</p><h2>" +
          esc(beat.headline[0]) + "<br>" + esc(beat.headline[1]) +
        "</h2></div>" +
        '<div class="chapter-badge inkbox">' + esc(beat.stamp) + "</div>" +
      "</div>" +
      '<div class="score-row">' +
        '<article class="score-card"><b>50</b><span>全卷</span></article>' +
        '<article class="score-card"><b>20</b><span>甲部</span></article>' +
        '<article class="score-card"><b>30</b><span>乙部</span></article>' +
      "</div>" +
      '<p class="lede">培進 Book A · 第一章至第四章 · 純播放講解</p>' +
    "</div>"
  );
}
function tweensB01(tl, root, start) {
  enter(tl, all(root, ".score-card"), start + 0.35, { y: 40 }, { y: 0, stagger: 0.14, duration: 0.45 });
  pulse(tl, must(root, ".chapter-badge"), start + 1.6);
  pulse(tl, must(root, ".chapter-badge"), start + 3.4);
}

function buildB02(beat) {
  return dom(
    '<div data-layout="lecture-five" class="board">' +
      caption(beat.keyword) +
      explainGrid([
        { kicker: "第 1 題", mark: "A", title: "數據", body: "原始讀數尚未詮釋" },
        { kicker: "第 2 題", mark: "B", title: "IPO", body: "選票 · 統計 · 顯示" },
        { kicker: "第 3 題", mark: "D", title: "非組件", body: "平面圖只是裝飾" },
        { kicker: "第 4 題", mark: "A", title: "輸入裝置", body: "雨量感測器" },
        { kicker: "第 5 題", mark: "C", title: "資訊素養", body: "查核作者、日期、來源" }
      ], 5) +
    "</div>"
  );
}
function tweensB02(tl, root, start) {
  enter(tl, all(root, ".explain-card"), start + 0.2, { y: 36 }, { y: 0, stagger: 0.16, duration: 0.42 });
  ink(tl, all(root, ".choice"), start + 1.8, 0.35);
}

function buildB03(beat) {
  return dom(
    '<div data-layout="lecture-five" class="board">' +
      caption(beat.keyword) +
      explainGrid([
        { kicker: "第 6 題", mark: "D", title: "有效性檢驗", body: "身高 40–250 厘米" },
        { kicker: "第 7 題", mark: "C", title: "主關鍵字", body: "全場唯一票號" },
        { kicker: "第 8 題", mark: "D", title: "直接存取", body: "跳至指定影像幀" },
        { kicker: "第 9 題", mark: "B", title: "數據控制", body: "準確、完整、獲授權" },
        { kicker: "第 10 題", mark: "A", title: "存在檢查", body: "必填欄位不得留空" }
      ], 5) +
    "</div>"
  );
}
function tweensB03(tl, root, start) {
  enter(tl, all(root, ".explain-card"), start + 0.2, { rotationX: -70, transformOrigin: "center top" }, { rotationX: 0, stagger: 0.14, duration: 0.42 });
  ink(tl, all(root, ".choice"), start + 1.9, 0.32);
}

function buildB04(beat) {
  return dom(
    '<div data-layout="numbers" class="board">' +
      caption("位值 · 二進制補碼（two's complement）") +
      '<div class="explain-grid cols-4">' +
        '<article class="explain-card"><p class="explain-kicker">第 11 題</p><h3>2B₁₆</h3><p>43 = 2×16 + 11</p></article>' +
        '<article class="explain-card"><p class="explain-kicker">第 12 題</p><h3>位值 2³</h3><p>101101 由右數第三個 1</p></article>' +
        '<article class="explain-card"><p class="explain-kicker">第 14 題</p><h3>5 位元組</h3><p>Hello · 每字元 1 byte</p></article>' +
        '<article class="explain-card"><p class="explain-kicker">第 15 題</p><h3>偶校驗</h3><p>五個 1 → 校驗位設 1</p></article>' +
      "</div>" +
      '<div class="work-strip">' +
        '<p class="explain-kicker">第 13 題 · 八位元二進制補碼 −53</p>' +
        '<div class="step-line"><span>00110101</span><b>取反再加一</b><span class="result-bits">11001011</span></div>' +
      "</div>" +
    "</div>"
  );
}
function tweensB04(tl, root, start) {
  enter(tl, all(root, ".explain-card"), start + 0.2, { y: 24 }, { y: 0, stagger: 0.12 });
  enter(tl, must(root, ".work-strip"), start + 1.3, { y: 20 }, { y: 0, duration: 0.4 });
  pulse(tl, must(root, ".result-bits"), start + 2.2);
}

function buildB05(beat) {
  return dom(
    '<div data-layout="images" class="board">' +
      caption(beat.keyword) +
      explainGrid([
        { kicker: "第 16 題", mark: "A", title: "鋸齒失真", body: "點陣圖放大，邊緣變模糊" },
        { kicker: "第 17 題", mark: "B", title: "65536 色", body: "2¹⁶ 色彩深度" },
        { kicker: "第 18 題", mark: "D", title: "像素解像度", body: "細節仍然清楚" },
        { kicker: "第 19 題", mark: "D", title: "約 96 KB", body: "1024×768 ÷ 8 ÷ 1024" },
        { kicker: "第 20 題", mark: "C", title: "GIF", body: "透明背景＋簡單幀動畫" }
      ], 5) +
    "</div>"
  );
}
function tweensB05(tl, root, start) {
  enter(tl, all(root, ".explain-card"), start + 0.15, { scale: 0.86 }, { scale: 1, stagger: 0.12, duration: 0.4 });
  ink(tl, all(root, ".choice"), start + 1.7, 0.28);
}

function buildB06(beat) {
  return dom(
    '<div data-layout="warehouse-bins" class="board">' +
      caption("網店訂單／倉庫 · " + beat.keyword) +
      '<div class="bin-grid">' +
        '<article class="bin"><p class="bin-item">熱敏出貨單打印機</p><h3>硬件</h3><p>實體裝置</p></article>' +
        '<article class="bin"><p class="bin-item">庫存管理應用程式</p><h3>軟件</h3><p>可執行程式</p></article>' +
        '<article class="bin"><p class="bin-item">顧客訂單紀錄</p><h3>數據</h3><p>需儲存的事實</p></article>' +
        '<article class="bin"><p class="bin-item">核對貨品的作業指引</p><h3>程序</h3><p>人員依循的步驟</p></article>' +
      "</div>" +
      stampOf(beat) +
    "</div>"
  );
}
function tweensB06(tl, root, start) {
  enter(tl, all(root, ".bin-item"), start + 0.2, { y: -30 }, { y: 0, stagger: 0.12 });
  enter(tl, all(root, ".bin h3"), start + 0.7, { y: 24 }, { y: 0, stagger: 0.12 });
  enter(tl, must(root, ".stamp"), start + 1.8, { scale: 1.2, rotation: -6 }, { scale: 1, rotation: -3 });
}

function buildB07(beat) {
  return dom(
    '<div data-layout="input-devices" class="board">' +
      caption(beat.keyword) +
      '<div class="device-grid">' +
        '<article class="device"><h3>條碼／QR 掃描器</h3><p>輸入快，減少人手鍵入錯漏</p></article>' +
        '<article class="device"><h3>手提數據終端機</h3><p>貨架旁即時核對</p></article>' +
        '<article class="device"><h3>RFID 讀取器</h3><p>一次讀取多件標籤</p></article>' +
      "</div>" +
      '<p class="warn-line"><span class="cross">×</span> 不要把輸出裝置當作輸入 · 要寫裝置加優點</p>' +
    "</div>"
  );
}
function tweensB07(tl, root, start) {
  enter(tl, all(root, ".device"), start + 0.25, { x: -48 }, { x: 0, stagger: 0.16, duration: 0.42 });
  enter(tl, must(root, ".warn-line"), start + 1.6, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
}

function buildB08(beat) {
  return dom(
    '<div data-layout="format-check" class="board">' +
      caption(beat.keyword) +
      '<div class="pattern-hero" aria-label="AB1234">' +
        '<span>A</span><span>B</span><span>1</span><span>2</span><span>3</span><span>4</span>' +
      "</div>" +
      '<p class="lede">兩個大寫英文字母＋四位數字 · 格式檢查／類型檢查</p>' +
      '<div class="purpose-row">' +
        '<article class="purpose">符合預定格式</article>' +
        '<article class="purpose">減少無效編碼</article>' +
        '<article class="purpose">準確 · 一致</article>' +
      "</div>" +
      '<p class="warn-line"><span class="cross">×</span> 不是核實　<span class="cross">×</span> 不是範圍檢查</p>' +
    "</div>"
  );
}
function tweensB08(tl, root, start) {
  enter(tl, all(root, ".pattern-hero span"), start + 0.15, { y: -20 }, { y: 0, stagger: 0.08, duration: 0.32 });
  enter(tl, all(root, ".purpose"), start + 1.1, { y: 16 }, { y: 0, stagger: 0.12 });
  enter(tl, must(root, ".warn-line"), start + 2.0, { autoAlpha: 0 }, { autoAlpha: 1 });
}

function buildB09(beat) {
  return dom(
    '<div data-layout="twos-complement" class="board">' +
      caption("二進制補碼（two's complement）") +
      '<ol class="decode">' +
        '<li><b>讀數</b>' + bitRow("10110010") + "</li>" +
        '<li><b>MSB = 1</b><span>負數</span></li>' +
        '<li><b>取反</b>' + bitRow("01001101") + "</li>" +
        '<li><b>加一</b>' + bitRow("01001110", "sum") + "</li>" +
        '<li><b>位值</b><span>64 + 8 + 4 + 2 = 78</span></li>' +
      "</ol>" +
      '<div class="result-row"><div class="stamp final">−78</div><div class="struck">+78</div></div>' +
    "</div>"
  );
}
function tweensB09(tl, root, start) {
  enter(tl, all(root, ".decode li"), start + 0.15, { x: -24 }, { x: 0, stagger: 0.28, duration: 0.36 });
  enter(tl, must(root, ".stamp.final"), start + 2.4, { scale: 1.3 }, { scale: 1, duration: 0.35 });
  enter(tl, must(root, ".struck"), start + 3.0, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
}

function buildB10(beat) {
  return dom(
    '<div data-layout="sign-bit" class="board">' +
      caption("二進制補碼 · MSB 符號位") +
      '<div class="sign-row">' +
        '<article class="sign-card on-bit"><b>1</b><h3>負數</h3><p>MSB = 1</p></article>' +
        '<article class="sign-card"><b>0</b><h3>非負</h3><p>正數或零</p></article>' +
      "</div>" +
      '<p class="lede">符號位參與數值計算，並決定正負。</p>' +
      '<p class="warn-line"><span class="cross">×</span> MSB 不是校驗位</p>' +
    "</div>"
  );
}
function tweensB10(tl, root, start) {
  enter(tl, all(root, ".sign-card"), start + 0.2, { y: 30 }, { y: 0, stagger: 0.18 });
  pulse(tl, must(root, ".on-bit b"), start + 1.2);
  enter(tl, must(root, ".warn-line"), start + 1.8, { autoAlpha: 0 }, { autoAlpha: 1 });
}

function buildB11(beat) {
  return dom(
    '<div data-layout="odd-parity" class="board">' +
      caption(beat.keyword) +
      '<div class="parity-board">' +
        '<p class="explain-kicker">數據位</p>' +
        bitRow("1011001", "data-bits") +
        '<p class="lede">四個 1 · 偶數</p>' +
        '<div class="parity-join"><span>奇校驗位</span><b class="parity-bit">1</b><span>共五個 1 · 奇數</span></div>' +
      "</div>" +
      '<p class="warn-line"><span class="cross">×</span> 設 0 是偶校驗思路</p>' +
    "</div>"
  );
}
function tweensB11(tl, root, start) {
  enter(tl, all(root, ".data-bits .bit"), start + 0.15, { y: -16 }, { y: 0, stagger: 0.06, duration: 0.28 });
  ink(tl, all(root, ".data-bits .bit.on"), start + 1.0, 0.12);
  enter(tl, must(root, ".parity-bit"), start + 1.8, { scale: 0.6 }, { scale: 1, duration: 0.35 });
  enter(tl, must(root, ".warn-line"), start + 2.5, { autoAlpha: 0 }, { autoAlpha: 1 });
}

function buildB12(beat) {
  return dom(
    '<div data-layout="bitmap-vector" class="board">' +
      caption(beat.keyword) +
      '<div class="split">' +
        '<article class="pane">' +
          '<h3>點陣圖</h3>' +
          '<div class="px-grid" aria-hidden="true"></div>' +
          '<p>由像素網格構成</p>' +
        "</article>" +
        '<article class="pane">' +
          '<h3>向量圖</h3>' +
          '<svg class="curve" viewBox="0 0 240 120" aria-hidden="true"><path d="M12 96 C 60 8, 120 8, 150 60 S 210 120, 228 28" fill="none" stroke="#000" stroke-width="6"/></svg>' +
          '<p>線、曲線、形狀定義</p>' +
        "</article>" +
      "</div>" +
      '<p class="lede">標誌 · 字型 · 線條圖 · CAD　可獨立縮放編輯</p>' +
    "</div>"
  );
}
function tweensB12(tl, root, start) {
  var grid = must(root, ".px-grid");
  var i;
  for (i = 0; i < 48; i++) {
    var cell = document.createElement("i");
    if (i % 7 === 0 || i % 5 === 0) cell.className = "on";
    grid.appendChild(cell);
  }
  enter(tl, all(root, ".pane"), start + 0.2, { y: 24 }, { y: 0, stagger: 0.16 });
  enter(tl, all(root, ".px-grid i"), start + 0.7, { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.01, duration: 0.2 });
  var path = must(root, ".curve path");
  var len = path.getTotalLength();
  path.style.strokeDasharray = String(len);
  path.style.strokeDashoffset = String(len);
  tl.to(path, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, start + 0.8);
}

function buildB13(beat) {
  return dom(
    '<div data-layout="sample-quant" class="board">' +
      caption(beat.keyword) +
      '<div class="split">' +
        '<article class="pane">' +
          '<p class="explain-kicker">1 · 取樣 sampling</p>' +
          '<h3>量度樣本</h3>' +
          '<div class="sample-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
          '<p>關乎解像度或取樣頻率</p>' +
        "</article>" +
        '<article class="pane">' +
          '<p class="explain-kicker">2 · 量化 quantization</p>' +
          '<h3>離散級別</h3>' +
          '<div class="level-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
          '<p>關乎色彩深度或位元深度</p>' +
        "</article>" +
      "</div>" +
      '<p class="warn-line"><span class="cross">×</span> 不要把兩個定義對調</p>' +
    "</div>"
  );
}
function tweensB13(tl, root, start) {
  enter(tl, all(root, ".pane"), start + 0.2, { x: -30 }, { x: 0, stagger: 0.2 });
  enter(tl, all(root, ".sample-dots i"), start + 0.8, { scale: 0 }, { scale: 1, stagger: 0.08, duration: 0.25 });
  tl.fromTo(all(root, ".level-bars i"), { scaleY: 0.2 }, { scaleY: 1, stagger: 0.1, duration: 0.35, transformOrigin: "center bottom" }, start + 1.3);
  enter(tl, must(root, ".warn-line"), start + 2.2, { autoAlpha: 0 }, { autoAlpha: 1 });
}

function buildB14(beat) {
  return dom(
    '<div data-layout="filesize" class="board">' +
      caption(beat.keyword) +
      '<p class="formula">1920 × 1080 × 24 ÷ 8 ÷ 1024²</p>' +
      '<div class="formula-steps">' +
        '<article><b>6,220,800</b><span>位元組</span></article>' +
        '<span class="arrow">÷</span>' +
        '<article><b>1,048,576</b><span>1024²</span></article>' +
        '<span class="arrow">=</span>' +
        '<article class="formula-result"><b>5.93 MB</b><span>接受 5.93–5.94</span></article>' +
      "</div>" +
      '<p class="warn-line"><span class="cross">×</span> 不要用 1000²　<span class="cross">×</span> 不要忘記 ÷8</p>' +
    "</div>"
  );
}
function tweensB14(tl, root, start) {
  enter(tl, must(root, ".formula"), start + 0.15, { y: -16 }, { y: 0 });
  enter(tl, all(root, ".formula-steps article"), start + 0.7, { y: 20 }, { y: 0, stagger: 0.2 });
  pulse(tl, must(root, ".formula-result"), start + 2.0);
  enter(tl, must(root, ".warn-line"), start + 2.6, { autoAlpha: 0 }, { autoAlpha: 1 });
}

function buildB15(beat) {
  return dom(
    '<div data-layout="outro" class="board">' +
      caption(beat.keyword) +
      '<div class="recap-row">' +
        '<article class="recap-panel"><h3>−78</h3><p>二進制補碼還原</p></article>' +
        '<article class="recap-panel"><h3>校驗位 1</h3><p>奇校驗</p></article>' +
        '<article class="recap-panel"><h3>5.93 MB</h3><p>圖像檔大小</p></article>' +
      "</div>" +
      '<p class="lede">有疑問就重播難點段落</p>' +
      stampOf(beat) +
    "</div>"
  );
}
function tweensB15(tl, root, start) {
  enter(tl, all(root, ".recap-panel"), start + 0.2, { y: -24 }, { y: 0, stagger: 0.14, duration: 0.42 });
  enter(tl, must(root, ".stamp"), start + 1.2, { scale: 1.25, rotation: -8 }, { scale: 1, rotation: -4, duration: 0.4 });
}

var SCENE_BUILDERS = {
  B01: buildB01,
  B02: buildB02,
  B03: buildB03,
  B04: buildB04,
  B05: buildB05,
  B06: buildB06,
  B07: buildB07,
  B08: buildB08,
  B09: buildB09,
  B10: buildB10,
  B11: buildB11,
  B12: buildB12,
  B13: buildB13,
  B14: buildB14,
  B15: buildB15
};

var SCENE_TWEENS = {
  B01: tweensB01,
  B02: tweensB02,
  B03: tweensB03,
  B04: tweensB04,
  B05: tweensB05,
  B06: tweensB06,
  B07: tweensB07,
  B08: tweensB08,
  B09: tweensB09,
  B10: tweensB10,
  B11: tweensB11,
  B12: tweensB12,
  B13: tweensB13,
  B14: tweensB14,
  B15: tweensB15
};

function buildScene(beat) {
  var fn = SCENE_BUILDERS[beat.id];
  if (!fn) throw new Error("No scene builder for " + beat.id);
  var node = fn(beat);
  node.classList.add("scene");
  node.id = "scene-" + beat.id;
  node.dataset.beat = beat.id;
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
