# Changelog

## 0.3.0 — 2026-10-22

- 換上 v3 聲軌：31 節，`duration_s` 合計 **1836.2 秒**。
- 甲部每題跟五步破題法。答案字母在第五步先出現。
- 加入 Hammy Style C 原子筆手繪，畫在題幹旁邊。
- 懶載入、舞台點按暫停、播放／重播、收合控制列、全螢幕 contain 保持不變。

## 0.1.2 — 2026-10-22

- 播放中撳舞台中央會暫停，再撳一下繼續。暫停時中央淡入「暫停」。
- 開頭「播放」、結尾「重播」、控制列同進度列保持原有行為。拖曳不會當成暫停。
- 仍然只解碼目前聲線的這一節和下一節。

## 0.1.1 — 2026-10-22

- 修正旁白卡頓。不再一次預載 45 段 mp3；只解碼目前聲線的這一節和下一節。
- 播放中不再每幀把未緩衝的聲音 seek 回去。詳見 `ROOT_CAUSE.md`。
- 聲軌檔案與節長 620.4 秒未改。

## 0.1.0 — 2026-10-22

- 新增根目錄純播放器：模擬測驗講解／Mock 講解 · Book A Ch1–4。
- 15 節。`js/beats.js` 的 `duration_s` 合計 **620.4 秒**。
- 聲軌 `audio/{yue,cmn,en}/B01.mp3`–`B15.mp3`，同名 `.vtt`／`.srt`，以及 `audio/manifest.json`。
- `js/cues.js` 由各節 VTT 生成，並寫入 `CH4_AUDIO_DURATIONS`（ffprobe，同 manifest 一致）。
- 粵語／普通話 mp3 已包含英文片段前後各 0.05 秒的 EN pad，沒有再轉碼。粵語「正」字幕仍寫「正」。
- `js/scenes.js` 逐節獨立舞台：網店訂單／倉庫，二進制補碼、奇偶校驗、圖像檔大小。黑白投影。沒有練習或答題紙。
- 外殼對齊第4章播放器：收合頂欄、全螢幕 contain、0.5x–2.0x、旁白停頓、粵／普／英、字幕小／中／大、舞台中央播放與重播。
- `localStorage` 用 `mock-ch14-player-sub-size`、`mock-ch14-ui-collapse-dock`。
- `vendor/gsap.min.js` 本機載入。`_headers` 設 `frame-ancestors *`。
