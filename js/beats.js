/* Runtime beat sheet for 模擬測驗講解／Mock 講解 · Book A Ch1–4.
   Mirrors beats.json durations. Global name stays CH4_BEATS so player.js can run unchanged. */
var CH4_BEATS = [
  {
    "id": "B01",
    "title": "開場｜Mock 講解 Book A Ch1–4",
    "headline": [
      "模擬測驗講解",
      "Book A · Ch1–4"
    ],
    "duration_s": 25.0,
    "visual": "Title card:「模擬測驗講解／Mock 講解 · Book A Ch1–4」. Score chips 50／甲20＋乙30. Stamp「Mock 講解」fades in then settles.",
    "keyword": "Mock 講解 · Book A",
    "cards": [
      "全卷 50 分",
      "甲部 20 分",
      "乙部 30 分"
    ],
    "stamp": "Mock 講解",
    "eyebrow": "YLCSS · S4 ICT · 純播放",
    "script_refs": {
      "yue": "B01",
      "cmn": "B01",
      "en": "B01"
    },
    "notes": "Intro only. PLACEHOLDER duration — no TTS yet.; VO wait/gap=0.35s (full-track); retime from TTS max=20.64s +0.4"
  },
  {
    "id": "B02",
    "title": "甲部 MC1–5",
    "headline": [
      "甲部",
      "第 1–5 題講解"
    ],
    "duration_s": 55.0,
    "visual": "Five MC cards flip: 1A 數據 · 2B IPO · 3D 非組件 · 4A 輸入 · 5C 查證. Letter stamps land as VO states each answer.",
    "keyword": "數據 · IPO · 輸入",
    "cards": [
      "數據",
      "IPO",
      "非組件",
      "輸入裝置",
      "查核來源"
    ],
    "stamp": "講解",
    "eyebrow": "YLCSS · S4 ICT · 甲部",
    "script_refs": {
      "yue": "B02",
      "cmn": "B02",
      "en": "B02"
    },
    "notes": "One answer+gist then one reason per Q. Key slice ABDAC. PLACEHOLDER ~55s.; VO wait/gap=0.35s (full-track); retime from TTS max=43.42s +0.4"
  },
  {
    "id": "B03",
    "title": "甲部 MC6–10",
    "headline": [
      "甲部",
      "第 6–10 題講解"
    ],
    "duration_s": 55.0,
    "visual": "Five MC cards: 6D 有效性 · 7C 主關鍵字 · 8D 直接存取 · 9B 數據控制 · 10A 存在檢查. Letter stamps in sequence.",
    "keyword": "檢驗 · 主關鍵字 · 存取",
    "cards": [
      "有效性檢驗",
      "主關鍵字",
      "直接存取",
      "數據控制",
      "存在檢查"
    ],
    "stamp": "講解",
    "eyebrow": "YLCSS · S4 ICT · 甲部",
    "script_refs": {
      "yue": "B03",
      "cmn": "B03",
      "en": "B03"
    },
    "notes": "Key slice DCDBA. PLACEHOLDER ~55s.; VO wait/gap=0.35s (full-track); retime from TTS max=40.78s +0.4"
  },
  {
    "id": "B04",
    "title": "甲部 MC11–15",
    "headline": [
      "數值表示",
      "位值 · 二進制補碼"
    ],
    "duration_s": 65.0,
    "visual": "Five cards: 11B 2B₁₆ · 12C 2³ 位值 · 13C 補碼 −53 · 14A 5 bytes · 15B 偶校驗位=1. Mini step flash on Q13 invert+1.",
    "keyword": "位值 · 二進制補碼",
    "cards": [
      "2B₁₆",
      "位值 2³",
      "補碼 −53",
      "5 位元組",
      "偶校驗"
    ],
    "stamp": "二進制補碼",
    "eyebrow": "YLCSS · S4 ICT · 甲部",
    "script_refs": {
      "yue": "B04",
      "cmn": "B04",
      "en": "B04"
    },
    "notes": "Use 位值; two's complement exact. Key BCCAB. Slightly longer for Q13. PLACEHOLDER ~65s.; VO wait/gap=0.35s (full-track); retime from TTS max=55.58s +0.4"
  },
  {
    "id": "B05",
    "title": "甲部 MC16–20",
    "headline": [
      "圖像",
      "點陣 · 解像度 · GIF"
    ],
    "duration_s": 55.0,
    "visual": "Five cards: 16A 鋸齒 · 17B 65536 · 18D 像素解像度 · 19D 96 KB · 20C GIF. Final MC key strip ABDACDCDBABCCABABDDC.",
    "keyword": "點陣 · 解像度 · GIF",
    "cards": [
      "鋸齒失真",
      "65536 色",
      "像素解像度",
      "約 96 KB",
      "GIF"
    ],
    "stamp": "圖像檔",
    "eyebrow": "YLCSS · S4 ICT · 甲部",
    "script_refs": {
      "yue": "B05",
      "cmn": "B05",
      "en": "B05"
    },
    "notes": "Full MC key ABDACDCDBABCCABABDDC. PLACEHOLDER ~55s.; VO wait/gap=0.35s (full-track); retime from TTS max=49.27s +0.4"
  },
  {
    "id": "B06",
    "title": "B1(a)｜硬件／軟件／數據／程序",
    "headline": [
      "網店訂單／倉庫",
      "硬件 · 軟件 · 數據 · 程序"
    ],
    "duration_s": 40.0,
    "visual": "網店／倉庫 scene. Four tiles drop into bins: 打印機→硬件 · 庫存App→軟件 · 訂單紀錄→數據 · 作業指引→程序. Badge「任答三項」.",
    "keyword": "四項歸類 · 網店",
    "cards": [
      "硬件",
      "軟件",
      "數據",
      "程序"
    ],
    "stamp": "任答三項",
    "eyebrow": "YLCSS · S4 ICT · 乙部 B1(a)",
    "script_refs": {
      "yue": "B06",
      "cmn": "B06",
      "en": "B06"
    },
    "notes": "B1 scenario = online shop/warehouse — IGNORE any MS header 電子點名. PLACEHOLDER ~40s.; VO wait/gap=0.35s (full-track); retime from TTS max=27.91s +0.4"
  },
  {
    "id": "B07",
    "title": "B1(b)｜兩種輸入裝置＋優點",
    "headline": [
      "倉庫核對編碼",
      "兩種輸入裝置＋優點"
    ],
    "duration_s": 35.0,
    "visual": "Two device+advantage pairs slide in (barcode/QR · PDA · RFID). Red X stamps on 輸出裝置 misused as input.",
    "keyword": "輸入裝置＋優點",
    "cards": [
      "條碼／QR 掃描器",
      "手提數據終端機",
      "RFID 讀取器"
    ],
    "stamp": "裝置＋優點",
    "eyebrow": "YLCSS · S4 ICT · 乙部 B1(b)",
    "script_refs": {
      "yue": "B07",
      "cmn": "B07",
      "en": "B07"
    },
    "notes": "Need device①+advantage① ×2. PLACEHOLDER ~35s.; VO wait/gap=0.35s (full-track); retime from TTS max=30.70s +0.4"
  },
  {
    "id": "B08",
    "title": "B1(c)｜格式檢查",
    "headline": [
      "貨品編碼",
      "格式檢查"
    ],
    "duration_s": 30.0,
    "visual": "Pattern chip「兩字母＋四數字」e.g. AB1234. Label 格式檢查／類型檢查. Purpose bullets light. Stamp ×核實 ×範圍檢查.",
    "keyword": "格式檢查 format check",
    "cards": [
      "兩字母＋四數字",
      "格式／類型檢查",
      "準確 · 一致"
    ],
    "stamp": "AB1234",
    "eyebrow": "YLCSS · S4 ICT · 乙部 B1(c)",
    "script_refs": {
      "yue": "B08",
      "cmn": "B08",
      "en": "B08"
    },
    "notes": "Not verification / not range check. PLACEHOLDER ~30s.; VO wait/gap=0.35s (full-track); retime from TTS max=26.09s +0.4"
  },
  {
    "id": "B09",
    "title": "B2(a)｜−78 步驟",
    "headline": [
      "二進制補碼",
      "還原 −78"
    ],
    "duration_s": 50.0,
    "visual": "Worked decode 10110010₂: MSB=1→負; invert→01001101; +1→01001110=78; stamp −78. Cross out +78 / unsigned 178.",
    "keyword": "二進制補碼 → −78",
    "cards": [
      "MSB = 1",
      "取反",
      "加一",
      "位值 = 78"
    ],
    "stamp": "−78",
    "eyebrow": "YLCSS · S4 ICT · 乙部 B2(a)",
    "script_refs": {
      "yue": "B09",
      "cmn": "B09",
      "en": "B09"
    },
    "notes": "CRITICAL full steps: MSB=1 → invert → +1 → 78 → −78. Term 二進制補碼（two's complement）. PLACEHOLDER ~50s.; VO wait/gap=0.35s (full-track); retime from TTS max=35.54s +0.4"
  },
  {
    "id": "B10",
    "title": "B2(b)｜MSB 符號位",
    "headline": [
      "二進制補碼",
      "MSB 符號位"
    ],
    "duration_s": 32.4,
    "visual": "MSB toggle: 1→負 · 0→非負／正或零. Caption: 符號位參與數值並決定正負. Stamp ×校驗位.",
    "keyword": "MSB 符號位",
    "cards": [
      "1 → 負數",
      "0 → 非負",
      "參與數值"
    ],
    "stamp": "符號位",
    "eyebrow": "YLCSS · S4 ICT · 乙部 B2(b)",
    "script_refs": {
      "yue": "B10",
      "cmn": "B10",
      "en": "B10"
    },
    "notes": "正=zing3 sense. Spell M S B. PLACEHOLDER ~28s.; VO wait/gap=0.35s (full-track); retime from TTS max=31.99s +0.4"
  },
  {
    "id": "B11",
    "title": "B2(c)｜奇校驗",
    "headline": [
      "奇校驗",
      "校驗位 = 1"
    ],
    "duration_s": 35.0,
    "visual": "Bits 1011001 highlight four 1s (even). Odd-parity rule board. Parity bit flips to 1 → five 1s. Stamp ×設0（偶校驗思路）.",
    "keyword": "奇校驗 · 校驗位=1",
    "cards": [
      "1011001",
      "四個 1",
      "校驗位 1",
      "五個 1"
    ],
    "stamp": "奇數",
    "eyebrow": "YLCSS · S4 ICT · 乙部 B2(c)",
    "script_refs": {
      "yue": "B11",
      "cmn": "B11",
      "en": "B11"
    },
    "notes": "CRITICAL: four 1s → parity bit 1. Contrast with MC15 even parity. PLACEHOLDER ~35s.; VO wait/gap=0.35s (full-track); retime from TTS max=24.91s +0.4"
  },
  {
    "id": "B12",
    "title": "B3(a)｜點陣 vs 向量",
    "headline": [
      "構成方式",
      "點陣 vs 向量"
    ],
    "duration_s": 40.0,
    "visual": "Split panel: pixel grid vs math curves. Vector examples (logo／字型／CAD) + reason. Stamp「本題不考放大鋸齒」.",
    "keyword": "點陣 · 向量構成",
    "cards": [
      "像素網格",
      "數學物件",
      "標誌／字型／CAD"
    ],
    "stamp": "可獨立縮放",
    "eyebrow": "YLCSS · S4 ICT · 乙部 B3(a)",
    "script_refs": {
      "yue": "B12",
      "cmn": "B12",
      "en": "B12"
    },
    "notes": "Composition contrast + vector use-case; NOT enlarge-jag (cleared vs MC16). PLACEHOLDER ~40s.; VO wait/gap=0.35s (full-track); retime from TTS max=30.02s +0.4"
  },
  {
    "id": "B13",
    "title": "B3(b)｜取樣 vs 量化",
    "headline": [
      "影像數碼化",
      "取樣 vs 量化"
    ],
    "duration_s": 35.0,
    "visual": "Two-step timeline: sampling grid (解像度) → quantization levels (色彩深度). Swap-definition X badge.",
    "keyword": "取樣 · 量化",
    "cards": [
      "取樣 sampling",
      "量化 quantization"
    ],
    "stamp": "不要對調",
    "eyebrow": "YLCSS · S4 ICT · 乙部 B3(b)",
    "script_refs": {
      "yue": "B13",
      "cmn": "B13",
      "en": "B13"
    },
    "notes": "度(量度)=dok6 awareness in yue. PLACEHOLDER ~35s.; VO wait/gap=0.35s (full-track); retime from TTS max=27.79s +0.4"
  },
  {
    "id": "B14",
    "title": "B3(c)｜5.93 MB 算式",
    "headline": [
      "檔案大小",
      "≈ 5.93 MB"
    ],
    "duration_s": 48.0,
    "visual": "Formula builds: 1920×1080×24÷8÷1024² → 6220800÷1048576 ≈5.93 MB. Stamp ×1000² · ×忘÷8.",
    "keyword": "≈5.93 MB",
    "cards": [
      "1920×1080×24",
      "÷8",
      "÷1024²"
    ],
    "stamp": "5.93 MB",
    "eyebrow": "YLCSS · S4 ICT · 乙部 B3(c)",
    "script_refs": {
      "yue": "B14",
      "cmn": "B14",
      "en": "B14"
    },
    "notes": "CRITICAL full formula; accept 5.93–5.94; use 1024². Speak ×÷= as 乘／除以／等於. PLACEHOLDER ~48s.; VO wait/gap=0.35s (full-track); retime from TTS max=33.62s +0.4"
  },
  {
    "id": "B15",
    "title": "結尾｜Outro",
    "headline": [
      "Mock 講解",
      "可以重播難點"
    ],
    "duration_s": 20.0,
    "visual": "Recap chips: 補碼 −78 · 奇校驗=1 · 5.93 MB. Fade「可重聽難點」. End card Mock 講解完.",
    "keyword": "重聽難點 · 完",
    "cards": [
      "補碼 −78",
      "奇校驗位 1",
      "≈ 5.93 MB"
    ],
    "stamp": "完",
    "eyebrow": "YLCSS · S4 ICT · 結尾",
    "script_refs": {
      "yue": "B15",
      "cmn": "B15",
      "en": "B15"
    },
    "notes": "No publish / no TTS. PLACEHOLDER ~20s.; VO wait/gap=0.35s (full-track); retime from TTS max=17.23s +0.4"
  }
];
