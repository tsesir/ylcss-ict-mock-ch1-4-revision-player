# 模擬測驗講解／Mock 講解 · Book A Ch1–4

YLCSS S4 ICT 純播放旁白講解。培進 Book A 第一章至第四章，15 節。沒有練習、選擇題作答或答題紙。

播放器外殼對齊 [ICT 第4章](https://github.com/tsesir/ylcss-ch4-revision-player) 同 [S4 ICT 第1–3章](https://github.com/tsesir/ylcss-ict-ch1-3-revision-players)。

| 項目 | 值 |
|------|-----|
| 節數 | 15（B01–B15） |
| `js/beats.js` 總長 | **620.4 秒** |
| 聲線 | 粵語、普通話、English |
| 情境 | 網店訂單／倉庫；二進制補碼、奇偶校驗、圖像檔大小 |

總長是各節 `duration_s` 相加，未計播放器的旁白停頓（預設 0.5 秒）。

標題只用「模擬測驗講解／Mock 講解」。介面、字幕同本說明不會改稱其他公開考試。

## Pages

```
https://tsesir.github.io/ylcss-ict-mock-ch1-4-revision-player/
```

Notion 用 `/embed` 貼上面網址。根目錄有 `_headers`（`frame-ancestors *`）同 `.htaccess`。GitHub Pages 本身不會套用 `_headers`；預設已允許嵌入。

## 播放控制

- 純播放。聲線 `yue`／`cmn`／`en`。缺 mp3 時該聲線按鈕停用，動畫仍會靜音播放。
- 速度 0.5x–2.0x，跟時間軸同步。
- 旁白停頓 0–3 秒，預設 0.5 秒。
- 字幕開／關，以及小／中／大。預設大。字幕由各節 `.vtt` 生成，寫入 `js/cues.js`。
- 舞台標題同卡片用固定大字，不跟字幕大小改變。
- 控制列預設收合，由頂欄向下展開，收合時向上縮回。
- 全螢幕優先用 Fullscreen API。失敗時加 `.is-fs-fallback` 填滿視窗。舞台以 `min(slotW/1280, slotH/720)` 包含縮放，可以大於 1。
- 未播放時，第一幀中央有「播放」。最後一節完結、暫停在結尾時，中央有「重播」。
- 播放中撳舞台（按鈕同控制列以外）會暫停，再撳一下繼續。中央短暫顯示「暫停」。拖曳超過少許距離不會當暫停，避免誤觸進度列。
- 舞台 1280×720，黑白、方便投影。`vendor/gsap.min.js` 放喺本機，離線不必靠 CDN。

`js/player.js` 讀全域 `CH4_BEATS`／`CH4_CUES`／`CH4_AUDIO_DURATIONS`。呢個名只係程式介面。

## localStorage

| 用途 | 鍵 |
|------|-----|
| 字幕大小 | `mock-ch14-player-sub-size` |
| 控制列 | `mock-ch14-ui-collapse-dock` |

值：字幕 `s`／`m`／`l`；控制列 `open` 或 `collapsed`。第一次沒有紀錄，控制列係收合。

## 聲軌

- `audio/{yue,cmn,en}/B01.mp3` … `B15.mp3`，同名 `.vtt` 與 `.srt`
- `audio/manifest.json` 列出 `lang`、`beat`、`duration_s`
- 粵語／普通話：英文片段前後 EN pad **0.05 秒**，已燒錄在 mp3。English 聲線沒有 EN pad。
- 粵語「正」以 zing3 合成；字幕仍寫「正」。

用詞：混淆、位值、二進制補碼（two's complement）。

## 本機預覽

```bash
python3 -m http.server 8765
# http://127.0.0.1:8765/
```
