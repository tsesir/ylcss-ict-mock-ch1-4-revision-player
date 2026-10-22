# Add-on: 解題領航倉鼠 Hammy（Nik 2026-10-22）— applies to MC + LQ explainer animations
Functional only (avoid seductive details). SVG/CSS Q版倉鼠, ~5–8% of frame (≈ two text lines), never covers stem/graph axes/code.
Actions bound to steps:
1 審題: 偵探帽+放大鏡，敲 [N分] 敲出 N 個得分槽；指住指令詞點頭。
2 降噪: 抱巨型螢光筆滑過關鍵字（黃/青）；嫌棄表情掃走/踢走紅鯡魚→opacity 25%。
3 承上啟下(LQ): 速遞員抱 (a) 答案沿青光軌塞入 (b)（ECF）。
4 草稿/踩點: 實驗袍(Phy)/黑客眼鏡(ICT)，每行關鍵式後跳起蓋 +1M/+1A 印章。
5 排除/警告: MC 錯選放地雷+紅封鎖線；LQ 籠統/漏單位→吹哨舉紅牌、擦走重寫。
Guardrails: Active 0.5–1.0s move → Idle 3–5s (捧葵花籽/輕呼吸) while formula/SQL shown; 表情=閱卷員: 籠統→流汗搖頭舉 0 Mark；滿分→雙眼發光舉星星。

## Chosen style (Nik 2026-10-22): C 手繪原子筆 doodle
Blue ballpoint (#1A237E-ish) + pencil linework, light orange/yellow watercolour fill, slight hand-drawn jitter; looks drawn on the exam paper. Reference: /workspace/vo-rules/hammy/hammy_style_C_reference.jpg
Guardrails: keep backgrounds clean (no lined-paper noise behind stem text), linework must not compete with question text; build as SVG paths (stroke-dashoffset draw-on) so it animates and stays light.
