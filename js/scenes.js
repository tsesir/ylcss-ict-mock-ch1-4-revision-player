/* Per-beat stages for 模擬測驗講解／Mock 講解 · Book A Ch1–4.
   MC beats use the five-step ladder. The answer letter appears only at step 5.
   Hammy is a Style C ballpoint doodle in the right margin. Pure playback. */
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

function beatDur(root) {
  var n = Number(root.dataset.duration);
  return n > 0 ? n : 40;
}

function atFrac(root, start, frac) {
  return start + beatDur(root) * frac;
}

function hammySvg(pose) {
  return (
    '<svg class="hammy" data-pose="' + pose + '" viewBox="0 0 200 180" aria-hidden="true">' +
      '<g class="wash-g">' +
        '<path class="wash fur" d="M62 98 C48 72 64 42 98 38 C134 34 156 64 150 102 C144 140 108 154 74 142 C50 132 46 114 62 98 Z"/>' +
        '<path class="wash belly" d="M88 112 C80 98 98 90 114 98 C130 108 124 138 102 142 C84 138 80 124 88 112 Z"/>' +
        '<path class="wash ear" d="M76 58 C68 32 94 28 98 54 Z"/>' +
        '<path class="wash ear" d="M116 52 C124 26 152 32 140 58 Z"/>' +
        '<path class="wash cheek" d="M72 104 C68 112 78 116 82 108 Z"/>' +
        '<path class="wash cheek" d="M130 100 C138 108 132 116 124 108 Z"/>' +
      "</g>" +
      '<g class="ink-g">' +
        '<path class="ink" d="M62 98 C48 72 64 42 98 38 C134 34 156 64 150 102 C144 140 108 154 74 142 C50 132 46 114 62 98 Z"/>' +
        '<path class="ink" d="M88 112 C80 98 98 90 114 98 C130 108 124 138 102 142 C84 138 80 124 88 112 Z"/>' +
        '<path class="ink" d="M76 58 C68 32 94 28 98 54"/>' +
        '<path class="ink" d="M116 52 C124 26 152 32 140 58"/>' +
        '<circle class="ink eye" cx="86" cy="86" r="8"/>' +
        '<circle class="ink eye" cx="122" cy="84" r="8"/>' +
        '<circle class="pupil" cx="88" cy="87" r="3"/>' +
        '<circle class="pupil" cx="124" cy="85" r="3"/>' +
        '<path class="ink" d="M102 98 C106 104 114 102 116 96"/>' +
        '<path class="ink" d="M96 112 C106 120 118 116 122 108"/>' +
        '<path class="ink" d="M64 118 C44 110 42 130 58 134"/>' +
        '<path class="ink" d="M146 116 C166 108 168 130 150 134"/>' +
        '<path class="ink" d="M80 146 C76 160 92 164 96 150"/>' +
        '<path class="ink" d="M118 148 C124 164 140 158 132 146"/>' +
      "</g>" +
      '<g class="part part-hat"><path class="wash hat" d="M72 46 H126 L120 24 H80 Z"/><path class="ink" d="M64 48 H138"/><path class="ink" d="M80 46 L86 20 H116 L122 46"/></g>' +
      '<g class="part part-glass"><circle class="ink" cx="34" cy="78" r="14"/><path class="ink" d="M46 88 L60 106"/></g>' +
      '<g class="part part-specs"><circle class="ink" cx="86" cy="86" r="13"/><circle class="ink" cx="122" cy="84" r="13"/><path class="ink" d="M99 84 H110"/></g>' +
      '<g class="part part-cap"><path class="wash hat" d="M74 50 C82 28 132 26 138 52 Z"/><path class="ink" d="M74 50 C82 28 132 26 138 52"/><path class="ink" d="M58 56 H152"/></g>' +
      '<g class="part part-marker"><rect class="wash mark" x="6" y="100" width="48" height="16" rx="4"/><rect class="ink" x="6" y="100" width="48" height="16" rx="4"/></g>' +
      '<g class="part part-seed"><ellipse class="wash seed" cx="104" cy="126" rx="11" ry="6"/><ellipse class="ink" cx="104" cy="126" rx="11" ry="6"/></g>' +
      '<g class="part part-sweat"><path class="ink" d="M156 58 C160 70 150 74 156 58"/><path class="ink" d="M168 72 C172 84 162 88 168 72"/></g>' +
      '<g class="part part-card"><rect class="card" x="154" y="96" width="26" height="34" rx="3"/><path class="ink" d="M154 96 H180 V130 H154 Z"/></g>' +
      '<g class="part part-star"><path class="wash star" d="M166 34 L170 46 L182 46 L172 54 L176 66 L166 58 L156 66 L160 54 L150 46 L162 46 Z"/><path class="ink" d="M166 34 L170 46 L182 46 L172 54 L176 66 L166 58 L156 66 L160 54 L150 46 L162 46 Z"/></g>' +
    "</svg>"
  );
}

function drawHammy(tl, root, start) {
  var ham = must(root, ".hammy");
  tl.fromTo(ham.querySelectorAll(".ink"), { strokeDashoffset: 900 }, {
    strokeDashoffset: 0,
    duration: 0.85,
    stagger: 0.012,
    ease: "none"
  }, start + 0.15);
  tl.fromTo(ham.querySelectorAll(".wash, .pupil, .card"), { opacity: 0 }, {
    opacity: 1,
    duration: 0.45
  }, start + 0.55);
}

function idleHammy(tl, root, at) {
  tl.to(must(root, ".hammy"), {
    y: -3,
    duration: 1.7,
    yoyo: true,
    repeat: 2,
    ease: "sine.inOut"
  }, at);
}

function nudgeHammy(tl, root, at) {
  tl.to(must(root, ".hammy"), {
    x: -8,
    duration: 0.35,
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut"
  }, at);
}

function setPose(tl, root, pose, at) {
  tl.call(function () {
    must(root, ".hammy").setAttribute("data-pose", pose);
  }, null, at);
}

var MC = {
  B02: { n: "1", cmd: "最宜稱為", stem: "原始讀數最宜稱為什麼？", yellow: ["原始讀數"], cyan: ["尚未製成圖表或警報"], herring: "郊區、每小時", draft: ["原始、未處理 → 數據", "處理後有意義 → 資訊", "題說「尚未」→ 停在數據"], answer: "A", opts: [["A", "數據", ""], ["B", "資訊", "已處理"], ["C", "知識", "層級過高"], ["D", "智慧", "更高一層"]] },
  B03: { n: "2", cmd: "最符合", stem: "收集選票、統計、顯示，最符合哪個模型？", yellow: ["收集", "統計", "顯示"], cyan: ["整段流程"], herring: "班會、平板", draft: ["收集選票 → 輸入", "統計 → 處理", "顯示結果 → 輸出"], answer: "B", opts: [["A", "儲存—輸出—輸入", "次序錯"], ["B", "輸入—處理—輸出", ""], ["C", "壓縮—傳輸—解壓", "無壓縮"], ["D", "加密—備份—還原", "無加密"]] },
  B04: { n: "3", cmd: "不是", stem: "哪一項不是資訊系統的組成部分？", yellow: ["掃描器", "軟件", "銷售紀錄"], cyan: ["不是"], herring: "攤位氣氛", draft: ["組件：硬件、軟件、數據、程序", "逐項對號", "對不上的就是出界項"], answer: "D", opts: [["A", "條碼掃描器", "屬組件"], ["B", "收銀軟件", "屬組件"], ["C", "銷售紀錄", "屬組件"], ["D", "佈置平面圖", ""]] },
  B05: { n: "4", cmd: "屬於", stem: "雨量感測器屬於哪類裝置？", yellow: ["雨量感測器", "降雨量"], cyan: ["量度"], herring: "天氣站位置", draft: ["外界數值經感測器入系統", "流向由外到內", "流入 → 輸入"], answer: "A", opts: [["A", "輸入裝置", ""], ["B", "輸出裝置", "方向反"], ["C", "顯示裝置", "無顯示"], ["D", "列印裝置", "無列印"]] },
  B06: { n: "5", cmd: "做法", stem: "具備資訊素養的做法是？", yellow: ["一律不可信"], cyan: ["一律", "資訊素養"], herring: "標題聳動", draft: ["先查證，後判斷", "不盲信，也不盲拒", "查作者、日期、來源"], answer: "C", opts: [["A", "立刻轉發", "未查證"], ["B", "直接刪除", "盲拒"], ["C", "查證後判斷", ""], ["D", "只看標題", "只看標題"]] },
  B07: { n: "6", cmd: "此做法屬於", stem: "身高必須介乎 40–250 cm，屬於？", yellow: ["身高", "40–250 cm"], cyan: ["必須介乎"], herring: "診所場景", draft: ["有上下限，系統自動查", "自動查規則 → 有效性檢驗", "不是雙重輸入對照"], answer: "D", opts: [["A", "核實", "易混淆"], ["B", "加密", "離題"], ["C", "備份", "離題"], ["D", "有效性檢驗", ""]] },
  B08: { n: "7", cmd: "最宜作為", stem: "全場唯一票號最宜作為？", yellow: ["票號"], cyan: ["全場唯一", "識別"], herring: "戲院場景", draft: ["唯一，加上識別", "就是主關鍵字", "還可關聯場次座位"], answer: "C", opts: [["A", "備註欄", "不唯一"], ["B", "校驗位元", "只查錯"], ["C", "主關鍵字", ""], ["D", "壓縮參數", "無關"]] },
  B09: { n: "8", cmd: "最接近", stem: "可跳至指定時點，無須由頭讀，最接近？", yellow: ["指定時段", "磁碟"], cyan: ["可跳至"], herring: "車流內容", draft: ["可跳 → 不用由頭讀", "不用由頭讀 → 直接存取", "磁碟支援直接存取"], answer: "D", opts: [["A", "順序存取", "由頭讀"], ["B", "磁帶串列", "講磁帶"], ["C", "整卷下載", "無此限"], ["D", "直接存取", ""]] },
  B10: { n: "9", cmd: "主要目的", stem: "施行數據控制的主要目的是？", yellow: ["借用紀錄", "數據控制"], cyan: ["主要目的"], herring: "體育室", draft: ["數據控制三個字訣", "準確、完整、授權", "與硬件速度無關"], answer: "B", opts: [["A", "阻嚇借用", "非目的"], ["B", "準確完整授權", ""], ["C", "提高解像度", "講硬件"], ["D", "加快時脈", "講效能"]] },
  B11: { n: "10", cmd: "此屬", stem: "必填欄不得留空，此屬哪種檢查？", yellow: ["若干欄位"], cyan: ["必填", "不得留空"], herring: "校際比賽", draft: ["只查有沒有填", "有沒有 → 存在", "存在檢查"], answer: "A", opts: [["A", "存在檢查", ""], ["B", "範圍檢查", "無範圍"], ["C", "類型檢查", "非類型"], ["D", "檢查位數", "無校驗"]] },
  B12: { n: "11", cmd: "轉換為", stem: "十進制 43 轉換為十六進制。", yellow: ["43"], cyan: ["十進制", "十六進制"], herring: "感測器讀數", draft: ["43 ÷ 16 = 2 餘 11", "11 寫成 B", "結果是 2B₁₆"], answer: "B", opts: [["A", "25₁₆", "得三十七"], ["B", "2B₁₆", ""], ["C", "2D₁₆", "得四十五"], ["D", "2F₁₆", "得四十七"]] },
  B13: { n: "12", cmd: "位值", stem: "101101₂ 由右數第三個 1 的位值。", yellow: ["101101₂"], cyan: ["由右至左", "第三個 1"], herring: "十進制總值", draft: ["由右：2⁰ 是第一個 1", "2² 是第二個 1", "2³ 是第三個 1"], answer: "C", opts: [["A", "2¹", "該位是零"], ["B", "2²", "只第二"], ["C", "2³", ""], ["D", "2⁴", "該位是零"]] },
  B14: { n: "13", cmd: "表示", stem: "八位元二進制補碼表示 −53。", yellow: ["−53", "八位元"], cyan: ["二進制補碼"], herring: "", draft: ["+53 → 00110101", "取反 → 11001010", "加一 → 11001011"], answer: "C", opts: [["A", "00110101", "未取反"], ["B", "10110100", "位元錯"], ["C", "11001011", ""], ["D", "01001011", "符號錯"]] },
  B15: { n: "14", cmd: "所需儲存空間", stem: "Hello 用標準 ASCII 需要多少儲存？", yellow: ["Hello", "1 位元組"], cyan: ["標準 ASCII", "每字元"], herring: "字的意思", draft: ["H e l l o → 5 個字元", "5 × 1 位元組", "等於 5 位元組"], answer: "A", opts: [["A", "5 位元組", ""], ["B", "6 位元組", "多計符"], ["C", "10 位元組", "雙位元組"], ["D", "40 位元組", "當位元"]] },
  B16: { n: "15", cmd: "校驗位應設為", stem: "1011011，偶校驗，校驗位應設為？", yellow: ["1011011"], cyan: ["偶校驗"], herring: "", draft: ["點算 1：一共五個", "五是奇數", "偶校驗要加 1"], answer: "B", opts: [["A", "設 0", "仍是奇"], ["B", "設 1", ""], ["C", "無法計算", "可計算"], ["D", "取決於介質", "無關介質"]] },
  B17: { n: "16", cmd: "最可能出現", stem: "點陣圖放大數倍，最可能出現？", yellow: ["點陣圖", "放大數倍"], cyan: ["最可能"], herring: "視藝、戶外", draft: ["點陣是像素網格", "放大，像素跟著變大", "邊緣出現鋸齒"], answer: "A", opts: [["A", "鋸齒失真", ""], ["B", "檔案變小", "無因果"], ["C", "色彩更鮮豔", "無根據"], ["D", "仍完全銳利", "混淆向量"]] },
  B18: { n: "17", cmd: "顏色種數", stem: "16 位元色彩深度可表示幾種顏色？", yellow: ["16 位元"], cyan: ["每像素", "種數"], herring: "數碼相機", draft: ["種數 = 2 的位元深度次方", "2¹⁶", "等於 65536"], answer: "B", opts: [["A", "16", "當種數"], ["B", "65536", ""], ["C", "32768", "十五次方"], ["D", "256", "八次方"]] },
  B19: { n: "18", cmd: "主要因為", stem: "大電視仍見清楚細節，主要因為？", yellow: ["細節仍見清楚"], cyan: ["主要因為", "更大尺寸"], herring: "手機型號", draft: ["細節多少看像素數量", "像素多，大屏也清楚", "較高像素解像度"], answer: "D", opts: [["A", "較低位元率", "損細節"], ["B", "較少音軌", "講聲音"], ["C", "較小檔案", "不保證"], ["D", "較高像素解像度", ""]] },
  B20: { n: "19", cmd: "檔案大小約為", stem: "1024×768 未壓縮單色，每像素 1 位元。", yellow: ["1024×768", "1 bit"], cyan: ["未壓縮", "1 KB = 1024 B"], herring: "", draft: ["1024 × 768 = 總位元", "÷ 8 → 位元組", "÷ 1024 = 96 KB"], answer: "D", opts: [["A", "768 KB", "漏除八"], ["B", "1024 KB", "亂套數"], ["C", "192 KB", "除數錯"], ["D", "96 KB", ""]] },
  B21: { n: "20", cmd: "較合適", stem: "要透明，同時要簡單幀動畫。", yellow: ["背景透明", "簡單幀動畫"], cyan: ["同時具備"], herring: "標誌設計", draft: ["條件一：透明", "條件二：簡單動畫", "兩樣都要，同時"], answer: "C", opts: [["A", "JPEG", "無透明"], ["B", "BMP", "已排除"], ["C", "GIF", ""], ["D", "TIFF", "已排除"]] }
};

function stepRail() {
  return "<ol class=\"step-rail\"><li>① 定題</li><li>② 降噪</li><li>③ 草稿</li><li>④ POE</li><li>⑤ 鎖定</li></ol>";
}

function chips(list, cls) {
  return list.map(function (text) {
    return '<span class="' + cls + '">' + esc(text) + "</span>";
  }).join("");
}

function buildMC(beat) {
  var spec = MC[beat.id];
  var herring = spec.herring
    ? '<p class="herring">踢走 ' + esc(spec.herring) + "</p>"
    : '<p class="herring is-none">題幹精簡</p>';
  var drafts = spec.draft.map(function (line) {
    return '<li><span>' + esc(line) + '</span><svg class="scribble" viewBox="0 0 300 8" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5 C40 2 90 7 150 4 C210 1 260 6 298 3"/></svg></li>';
  }).join("");
  var opts = spec.opts.map(function (row) {
    var cls = row[0] === spec.answer ? "opt is-answer" : "opt is-wrong";
    var tag = row[2] ? '<em class="tag">' + esc(row[2]) + "</em>" : "";
    return '<article class="' + cls + '"><b>' + esc(row[0]) + "</b><span>" + esc(row[1]) + "</span>" + tag + "</article>";
  }).join("");
  return dom(
    '<div class="scene-mc5">' +
      stepRail() +
      '<p class="stem"><span class="mark">1分</span><i class="slot"></i><span class="stem-zoom">' + esc(spec.stem) + '</span> <b class="cmd">' + esc(spec.cmd) + "</b></p>" +
      '<p class="hl-row">' + chips(spec.yellow, "chip-y") + chips(spec.cyan, "chip-c") + "</p>" +
      herring +
      '<ol class="draft">' + drafts + "</ol>" +
      '<div class="opt-grid">' + opts + "</div>" +
      '<p class="lock-letter">答案 ' + esc(spec.answer) + "</p>" +
      '<div class="hammy-slot">' + hammySvg("detective") + "</div>" +
    "</div>"
  );
}

function tweensMC(tl, root, start) {
  var s2 = atFrac(root, start, 0.16);
  var s3 = atFrac(root, start, 0.34);
  var s4 = atFrac(root, start, 0.56);
  var s5 = atFrac(root, start, 0.8);
  var rail = root.querySelectorAll(".step-rail li");
  drawHammy(tl, root, start);
  tl.call(function () { rail[0].classList.add("is-now"); }, null, start + 0.4);
  tl.call(function () { root.querySelector(".slot").classList.add("is-got"); }, null, start + 0.7);
  tl.fromTo(must(root, ".stem-zoom"), { scale: 0.96 }, {
    scale: 1,
    duration: 0.6,
    ease: "power2.out",
    transformOrigin: "left center"
  }, start + 0.3);
  tl.fromTo(must(root, ".hl-row"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, s2);
  setPose(tl, root, "highlight", s2);
  nudgeHammy(tl, root, s2);
  tl.call(function () {
    rail[0].classList.remove("is-now");
    rail[1].classList.add("is-now");
    var herring = root.querySelector(".herring");
    if (herring && !herring.classList.contains("is-none")) herring.classList.add("is-out");
  }, null, s2);
  tl.fromTo(all(root, ".draft li"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.18 }, s3);
  tl.fromTo(all(root, ".scribble path"), { strokeDashoffset: 320 }, {
    strokeDashoffset: 0,
    duration: 0.55,
    stagger: 0.18,
    ease: "none"
  }, s3);
  setPose(tl, root, "glasses", s3);
  idleHammy(tl, root, s3 + 0.4);
  tl.call(function () {
    rail[1].classList.remove("is-now");
    rail[2].classList.add("is-now");
  }, null, s3);
  tl.call(function () {
    rail[2].classList.remove("is-now");
    rail[3].classList.add("is-now");
    root.querySelectorAll(".opt.is-wrong").forEach(function (node) { node.classList.add("is-cut"); });
  }, null, s4);
  setPose(tl, root, "warn", s4);
  nudgeHammy(tl, root, s4);
  tl.fromTo(must(root, ".lock-letter"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, s5);
  tl.call(function () {
    rail[3].classList.remove("is-now");
    rail[4].classList.add("is-now", "is-lock");
    var keep = root.querySelector(".opt.is-answer");
    if (keep) keep.classList.add("is-lock");
  }, null, s5);
  setPose(tl, root, "star", s5);
  tl.to(root.querySelector(".opt.is-answer"), {
    boxShadow: "0 0 0 3px #00E676",
    duration: 0.55,
    yoyo: true,
    repeat: 3
  }, s5);
}

function slots(n) {
  var html = "";
  var i;
  for (i = 0; i < n; i++) html += '<i class="slot"></i>';
  return '<p class="slot-row">' + html + "</p>";
}

function lq(kicker, title, n, pose, body) {
  return dom(
    '<div class="lq">' +
      '<p class="mc-kicker">' + esc(kicker) + "</p>" +
      "<h2>" + esc(title) + "</h2>" +
      slots(n) +
      body +
      '<div class="hammy-slot">' + hammySvg(pose) + "</div>" +
    "</div>"
  );
}

function scribble(text) {
  return '<li class="formula-line"><span>' + esc(text) + '</span><svg class="scribble" viewBox="0 0 300 8" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5 C50 2 120 7 180 4 C240 2 270 6 298 3"/></svg></li>';
}

function buildB01() {
  return dom(
    '<div class="lq intro">' +
      '<p class="mc-kicker">YLCSS · S4 ICT · 純播放</p>' +
      "<h2>模擬測驗講解<br>Book A · Ch1–4</h2>" +
      '<div class="score-row">' +
        '<article class="inkbox"><b>50</b><span>全卷</span></article>' +
        '<article class="inkbox"><b>20</b><span>甲部</span></article>' +
        '<article class="inkbox"><b>30</b><span>乙部</span></article>' +
      "</div>" +
      stepRail() +
      '<p class="focus-line">答案字母留到第五步</p>' +
      '<div class="hammy-slot">' + hammySvg("idle") + "</div>" +
    "</div>"
  );
}

function tweensB01(tl, root, start) {
  drawHammy(tl, root, start);
  tl.fromTo(all(root, ".score-row article"), { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.12, duration: 0.3 }, start + 1);
  var rail = root.querySelectorAll(".step-rail li");
  rail.forEach(function (node, index) {
    tl.call(function () { node.classList.add("is-now"); }, null, start + 6 + index * 4.2);
  });
  tl.to(must(root, ".hammy"), { rotation: -8, duration: 0.35, yoyo: true, repeat: 1, transformOrigin: "50% 80%" }, start + 2);
  setPose(tl, root, "idle", start + 3);
  idleHammy(tl, root, start + 4);
  tl.fromTo(must(root, ".focus-line"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, start + 28);
}

function buildB22() {
  return lq("乙部 · B1(a) · 網店／倉庫", "四項歸類", 3, "glasses",
    '<p class="context chip-c">網店／倉庫</p>' +
    '<div class="mini-grid">' +
      '<article><b class="chip-y">熱敏打印機</b><span>硬件 · 實體裝置</span></article>' +
      '<article><b class="chip-y">庫存程式</b><span>軟件 · 可執行</span></article>' +
      '<article><b class="chip-y">訂單紀錄</b><span>數據 · 要儲存的事實</span></article>' +
      '<article><b class="chip-y">核對指引</b><span>程序 · 人員步驟</span></article>' +
    "</div>" +
    '<p class="warn-box">訂單紀錄 ≠ 軟件　打印機 ≠ 輸出數據</p>'
  );
}

function buildB23() {
  return lq("乙部 · B1(b)", "兩種輸入裝置，各加優點", 4, "courier",
    '<p class="beam">承上題 · 網店／倉庫</p>' +
    '<div class="mini-grid cols-2">' +
      '<article><b class="chip-y">條碼／QR 掃描器</b><span>輸入快，少鍵錯</span></article>' +
      '<article><b class="chip-y">RFID 讀取器</b><span>一次讀多件</span></article>' +
    "</div>" +
    '<p class="warn-box">只寫裝置名 → 不夠分</p>'
  );
}

function buildB24() {
  return lq("乙部 · B1(c)", "格式檢查", 3, "glasses",
    '<p class="formula">AB1234</p>' +
    '<p class="focus-line"><span class="chip-y">兩個大階字母 + 四位數字</span></p>' +
    '<ol class="draft">' + scribble("模式 LL####") + scribble("名稱：格式檢查") + scribble("目的：符合預定格式") + "</ol>" +
    '<p class="warn-box">不是核實，也不是範圍檢查</p>'
  );
}

function buildB25() {
  return lq("乙部 · B2(a) · 二進制補碼", "還原 10110010₂", 4, "glasses",
    '<ol class="draft">' +
      scribble("10110010  MSB = 1 → 負數") +
      scribble("取反 → 01001101") +
      scribble("加一 → 01001110 = 78") +
      scribble("十進制數值 → −78") +
    "</ol>" +
    '<p class="warn-box">+78 ✗　只取反 ✗　178 無符號 ✗</p>'
  );
}

function buildB26() {
  return lq("乙部 · B2(b)", "MSB 是符號位", 3, "courier",
    '<p class="beam">承上題 · MSB = 1 → 負數</p>' +
    '<div class="mini-grid cols-2">' +
      '<article><b class="chip-c">MSB = 1</b><span>負數</span></article>' +
      '<article><b class="chip-c">MSB = 0</b><span>正數或零</span></article>' +
    "</div>" +
    '<p class="warn-box">不要只寫「很重要」</p>'
  );
}

function buildB27() {
  return lq("乙部 · B2(c) · 奇校驗", "數據位 1011001", 3, "glasses",
    '<p class="focus-line"><span class="chip-y">1011001</span> <span class="chip-c">奇校驗</span></p>' +
    '<ol class="draft">' +
      scribble("點算 1：四個，偶數") +
      scribble("奇校驗要總數為奇") +
      scribble("校驗位 = 1 → 共五個") +
    "</ol>" +
    '<p class="warn-box">設 0 是偶校驗思路</p>'
  );
}

function buildB28() {
  return lq("乙部 · B3(a)", "點陣 vs 向量", 4, "glasses",
    '<div class="mini-grid cols-2">' +
      '<article><b class="chip-y">像素網格</b><span>點陣圖</span></article>' +
      '<article><b class="chip-y">線、曲線、形狀</b><span>向量圖</span></article>' +
    "</div>" +
    '<p class="focus-line"><span class="chip-c">本題不考放大鋸齒</span></p>' +
    '<p class="herring">放大鋸齒</p>'
  );
}

function buildB29() {
  return lq("乙部 · B3(b)", "取樣與量化", 3, "glasses",
    '<div class="mini-grid cols-2">' +
      '<article><b class="chip-y">樣本</b><span>取樣 · 關乎解像度</span></article>' +
      '<article><b class="chip-y">離散級別</b><span>量化 · 關乎位元深度</span></article>' +
    "</div>" +
    '<p class="warn-box">不要把兩個定義對調</p>'
  );
}

function buildB30() {
  return lq("乙部 · B3(c)", "約 5.93 MB", 3, "courier",
    '<p class="beam">承上題 · 量化 → 24 位元</p>' +
    '<ol class="draft">' +
      scribble("1920 × 1080 × 24 ÷ 8") +
      scribble("= 6 220 800 位元組") +
      scribble("÷ 1024² ≈ 5.93 MB") +
    "</ol>" +
    '<p class="warn-box">÷1000² → 6.22 ✗　漏 ÷8 ✗</p>'
  );
}

function buildB31() {
  return dom(
    '<div class="lq outro">' +
      '<p class="mc-kicker">Mock 講解</p>' +
      "<h2>重聽難點</h2>" +
      stepRail() +
      '<div class="mini-grid cols-3">' +
        "<article><b>−78</b><span>二進制補碼</span></article>" +
        "<article><b>校驗位 1</b><span>奇校驗</span></article>" +
        "<article><b>5.93 MB</b><span>1024 的二次方</span></article>" +
      "</div>" +
      '<p class="focus-line">字母留到第五步才填</p>' +
      '<div class="hammy-slot">' + hammySvg("star") + "</div>" +
    "</div>"
  );
}

function fillSlots(tl, root, start, step) {
  var nodes = root.querySelectorAll(".slot");
  Array.prototype.forEach.call(nodes, function (node, index) {
    tl.call(function () { node.classList.add("is-mark"); }, null, start + 1.2 + index * (step || 0.7));
  });
}

function showBlocks(tl, root, sel, at) {
  tl.fromTo(all(root, sel), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.32, stagger: 0.16 }, at);
}

function tweensLQ(tl, root, start) {
  drawHammy(tl, root, start);
  fillSlots(tl, root, start, 0.8);
  if (root.querySelector(".mini-grid article")) showBlocks(tl, root, ".mini-grid article", start + 1.4);
  if (root.querySelector(".formula-line")) {
    tl.fromTo(all(root, ".formula-line"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28, stagger: 0.35 }, start + 1.6);
    tl.fromTo(all(root, ".scribble path"), { strokeDashoffset: 320 }, {
      strokeDashoffset: 0,
      duration: 0.5,
      stagger: 0.35,
      ease: "none"
    }, start + 1.6);
    idleHammy(tl, root, start + 3);
  }
  if (root.querySelector(".beam")) {
    tl.fromTo(must(root, ".beam"), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.out" }, start + 0.8);
  }
  if (root.querySelector(".warn-box")) {
    tl.fromTo(must(root, ".warn-box"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, atFrac(root, start, 0.62));
    setPose(tl, root, "warn", atFrac(root, start, 0.62));
  }
  if (root.querySelector(".herring")) {
    tl.call(function () { root.querySelector(".herring").classList.add("is-out"); }, null, atFrac(root, start, 0.55));
  }
  if (root.querySelector(".focus-line") && !root.classList.contains("intro")) {
    tl.fromTo(must(root, ".focus-line"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, start + 2.4);
  }
}

function tweensB23(tl, root, start) {
  tweensLQ(tl, root, start);
  setPose(tl, root, "courier", start + 0.2);
}

function tweensB27(tl, root, start) {
  tweensLQ(tl, root, start);
  setPose(tl, root, "star", atFrac(root, start, 0.82));
}

function tweensB31(tl, root, start) {
  drawHammy(tl, root, start);
  var rail = root.querySelectorAll(".step-rail li");
  rail.forEach(function (node, index) {
    tl.call(function () { node.classList.add("is-now"); }, null, start + 1 + index * 1.1);
  });
  showBlocks(tl, root, ".mini-grid article", start + 6);
  tl.fromTo(must(root, ".focus-line"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, start + 10);
  idleHammy(tl, root, start + 2);
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
  B22: tweensLQ,
  B23: tweensB23,
  B24: tweensLQ,
  B25: tweensLQ,
  B26: tweensB23,
  B27: tweensB27,
  B28: tweensLQ,
  B29: tweensLQ,
  B30: tweensB23,
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
