---
name: dashboard
description: Dashboard & App Management - Add, update, and manage HTML apps in the toolkit dashboard
---

# Dashboard & App Management Skill

## 何時使用這個 Skill
當需要執行以下任務時載入此 skill：
- 新增一個新的 HTML app/工具
- 更新 index.html dashboard
- 修改 apps.json 設定檔
- 變更分類結構
- 更新樣式或 UI 規範

---

## 架構總覽

```
project/
├── index.html           (Dashboard 入口)
├── apps.json            (所有 app 的設定檔)
├── shopping.html        (現有 app 範例)
├── AGENTS.md            (專案總指引)
├── SHOPPING_APP_SUMMARY.md (購物 app 文件)
└── skills/
    └── dashboard.md     (本檔案)
```

未來可以新增 `tools/` 子資料夾放置其他 app：
```
tools/
├── tip.html            (小費計算機)
├── todo.html           (待辦清單)
└── pomodoro.html       (番茄鐘)
```

---

## 技術規格（所有 app 必須遵守）

### 強制規範
1. **單一 HTML 檔案**：每個 app 是單一 .html 檔案，無外部依賴（除了 CDN）
2. **Tailwind CSS CDN**：使用 `https://cdn.tailwindcss.com`
3. **Google Fonts**：Figtree + DM Sans + Noto Sans TC（+ Roboto Mono 代碼）
4. **最小觸控目標**：所有按鈕保證最小 **44x44px**
5. **Safe Area 支援**：必須處理 iOS 的 notch 和動態島
6. **繁體中文 UI**：預設使用 zh-HK 語系

### 推薦規範
1. **localStorage 持久化**：如果需要儲存資料，使用 `shop_` 前綴的 key
2. **無構建工具**：不使用 npm、webpack、vite 等
3. **原生 JavaScript**：不使用框架（React/Vue 等）
4. **Toast 通知**：推薦使用底部彈出通知
5. **圓角風格**：rounded-2xl / rounded-3xl 為主

---

## apps.json 格式說明

### 根層級
```json
{
  "meta": {
    "title": "Dashboard 標題",
    "subtitle": "副標題",
    "lastUpdated": "更新日期"
  },
  "categories": [ ... ]
}
```

### Category 物件
```json
{
  "id": "唯一識別碼",
  "name": "分類名稱（顯示用）",
  "icon": "icon 名稱",
  "apps": [ ... ]
}
```

### App 物件
```json
{
  "id": "唯一識別碼",
  "name": "App 名稱",
  "description": "簡短描述",
  "path": "相對路徑（如 shopping.html 或 tools/tip.html）",
  "icon": "icon 名稱",
  "color": "顏色主題",
  "status": "狀態",
  "featured": true/false,
  "tags": ["標籤1", "標籤2"]
}
```

### 欄位詳解

| 欄位 | 說明 | 必要 |
|------|------|------|
| `id` | 唯一識別碼（英文、小寫、連字符） | ✅ |
| `name` | 顯示名稱（繁體中文） | ✅ |
| `description` | 一行說明（越詳細越好，可包含功能特色、預設值等） | ✅ |
| `path` | **路徑或 URL**：<br>• 本地檔案：`shopping.html` 或 `tools/tip.html`<br>• 外部連結：`https://...` 或 `http://...`（會開啟新分頁） | 狀態=active/featured 時 |
| `icon` | 參考下方可用 icon 列表 | ✅ |
| `color` | 參考下方可用顏色 | ✅ |
| `status` | `active`, `coming`, `idea` | ✅ |
| `featured` | 是否顯示在「精選工具」區 | ❌ 預設 false |
| `tags` | 標籤陣列（用於分類和搜尋，越詳細越好） | ❌ |

### 可用 Icon 列表
（對應 index.html 中的 `icons` 物件）

| icon 值 | 說明 |
|---------|------|
| `shopping-bag` | 購物袋 |
| `calculator` | 計算機 |
| `check-circle` | 打勾圓圈 |
| `list` | 清單 |
| `clock` | 時鐘 |
| `percent` | 百分比 |
| `arrow-left-right` | 左右箭頭 |
| `wallet` | 錢包 |
| `trending-up` | 趨勢向上 |
| `grid` | 網格（預設） |
| `music` | 音樂 |

### 可用顏色
| color 值 | 效果 |
|----------|------|
| `blue` | 藍色（主要色） |
| `green` | 綠色（成功/已達標） |
| `orange` | 橙色 |
| `red` | 紅色（警示/刪除） |
| `purple` | 紫色 |
| `emerald` | 翡翠綠 |

### Status 狀態
| status 值 | 行為 |
|-----------|------|
| `active` | 可點擊、正常顯示 |
| `featured` | 同上 + 顯示在「精選工具」區 + ⭐ 標籤 |
| `coming` | 不可點擊、顯示「即將推出」藍色標籤 |
| `idea` | 不可點擊、顯示「想法中」橙色標籤 |

---

## 新增一個 App 的完整流程

### 階段 1：建立 App 檔案
1. 決定放置位置：
   - 獨立 app：根目錄 `xxx.html`
   - 工具類：`tools/xxx.html`
2. 複製 **樣板**（見下方）或參考 `shopping.html`
3. 確保遵守技術規範（44px 按鈕、safe area 等）

### 階段 2：更新 apps.json
1. 決定所屬分類（或新增分類）
2. 在對應的 `categories[].apps` 陣列中新增 App 物件
3. 範例：
```json
{
  "id": "tip-calculator",
  "name": "小費計算機",
  "description": "快速計算小費、平分帳單",
  "path": "tools/tip.html",
  "icon": "percent",
  "color": "green",
  "status": "active",
  "featured": false,
  "tags": ["餐廳", "小費", "平分"]
}
```

### 階段 3：測試
1. 在瀏覽器重新整理 `index.html`
2. 確認卡片顯示正確
3. 點擊確認可導航到正確路徑
4. 測試新 app 的基本功能

---

## 新增外部連結 App 的流程

當使用者提供一個外部 URL 時，執行以下步驟：

### 階段 1：深度分析外部工具
1. 獲取 URL 的 HTML 內容
2. 分析架構和功能：
   - 使用的技術（Tailwind？框架？）
   - 主要功能
   - 預設內容/食譜/設定
   - 特殊功能（音效、震動、localStorage 等）
3. 撰寫詳細的 `description`（包含功能特色）
4. 建議適合的 `tags`（越詳細越好）

### 階段 2：更新 apps.json
1. 決定所屬分類
2. 新增 App 物件，使用完整 URL 作為 `path`
3. 範例：
```json
{
  "id": "hotpot-online",
  "name": "咕嚕咕嚕（線上版）",
  "description": "火鍋食材計時器線上版本、可愛卡通風格、預設食材：牛柏葉(7分鐘)、鮮沙白(3分鐘)、Q鮑魚(5分鐘)、滑烏冬(5分鐘)",
  "path": "https://codeguy-hotpot.s3.ap-east-1.amazonaws.com/index.html",
  "icon": "clock",
  "color": "orange",
  "status": "active",
  "featured": false,
  "tags": ["火鍋", "計時器", "烹飪", "外部連結", "Web Audio", "震動"]
}
```

### 階段 3：行為說明
- **開啟方式**：外部 URL 會自動以 `window.open(url, '_blank')` 開啟新分頁
- **本地檔案**：相對路徑（如 `shopping.html`）維持在同一頁導航
- **可選動作**：如果使用者想要，也可以同時：
  - 下載外部 HTML 成本地檔案（方便未來修改）
  - 修改本地版本符合規範（safe area、按鈕大小等）
  - 同時存在兩個版本：本地版 + 線上版

---

## 新增一個分類

在 `apps.json` 的 `categories` 陣列新增：
```json
{
  "id": "entertainment",
  "name": "娛樂",
  "icon": "grid",
  "apps": []
}
```

注意：分類會依照 `apps.json` 中的順序顯示。

---

## App 樣板（快速開始）

以下是一個最小化的 app 樣板，已包含所有必要規範：

```html
<!DOCTYPE html>
<html lang="zh-HK">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>App 名稱</title>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        display: ['Figtree', 'Noto Sans TC', 'sans-serif'],
                        body: ['DM Sans', 'Noto Sans TC', 'sans-serif'],
                    },
                    boxShadow: {
                        'tf-subtle': '0 1px 3px rgba(0,0,0,0.06)',
                        'tf-medium': '0 4px 12px rgba(0,0,0,0.08)',
                        'tf-large': '0 8px 24px rgba(0,0,0,0.12)',
                        'tf-overlay': '0 16px 48px rgba(0,0,0,0.18)',
                    }
                }
            }
        }
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&family=Roboto+Mono:wght@400&display=swap');
        
        :root {
            --sat: env(safe-area-inset-top, 0px);
            --sab: env(safe-area-inset-bottom, 0px);
            --sal: env(safe-area-inset-left, 0px);
            --sar: env(safe-area-inset-right, 0px);
        }
        
        body {
            font-family: 'DM Sans', 'Noto Sans TC', sans-serif;
            background-color: #f9fafb;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            padding-top: var(--sat);
            padding-bottom: var(--sab);
            padding-left: var(--sal);
            padding-right: var(--sar);
            min-height: 100vh;
            min-height: 100dvh;
        }
        
        button, label, [role="button"] {
            user-select: none;
            -webkit-user-select: none;
        }
        
        .touch-btn {
            min-height: 44px;
            min-width: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .touch-btn-sm {
            min-height: 44px;
            min-width: 44px;
            padding: 12px;
        }
        
        .scroll-smooth {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }
    </style>
</head>
<body class="overflow-x-hidden">
    <div class="max-w-md mx-auto bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col min-h-[95vh] min-h-[95dvh]">
        
        <!-- Header -->
        <div class="bg-blue-600 p-6 text-white shrink-0">
            <div class="flex items-center gap-3">
                <!-- 替換成你的 icon -->
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <h1 class="text-xl md:text-2xl font-extrabold" style="font-family: 'Figtree', 'Noto Sans TC', sans-serif;">App 名稱</h1>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto scroll-smooth p-4 md:p-6">
            <!-- 你的內容在這裡 -->
        </div>
        
        <!-- 返回 Dashboard 按鈕（選擇性但推薦） -->
        <div class="p-4 border-t border-slate-100 shrink-0" style="padding-bottom: max(1rem, var(--sab));">
            <button onclick="window.location.href='index.html'" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 min-h-[48px] rounded-xl transition-colors flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>
                返回 Dashboard
            </button>
        </div>

    </div>

    <!-- Toast Notification（選擇性但推薦） -->
    <div id="toast" class="fixed left-1/2 -translate-x-1/2 text-white px-6 py-3 rounded-2xl shadow-2xl opacity-0 transition-all duration-500 z-50 font-bold flex items-center gap-2 pointer-events-none" style="bottom: max(2rem, calc(2rem + var(--sab)));">
        <span id="toast-icon"></span> <span id="toast-msg"></span>
    </div>

    <script>
        function showToast(msg, icon, color) {
            const t = document.getElementById('toast');
            document.getElementById('toast-msg').innerText = msg;
            document.getElementById('toast-icon').innerText = icon;
            t.className = `fixed bottom-8 left-1/2 -translate-x-1/2 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 font-bold flex items-center gap-2 pointer-events-none transition-all duration-500 ${color}`;
            t.style.opacity = '1'; 
            t.style.transform =  'translateY(0) translateX(-50%)';
            setTimeout(() => { 
                t.style.opacity = '0'; 
                t.style.transform = 'translateY(20px) translateX(-50%)'; 
            }, 3000);
        }
        
        // 你的 JavaScript 在這裡
    </script>
</body>
</html>
```

---

## UI 設計模式（參考 shopping.html）

### 顏色系統（TouchFlow）
| 用途 | Class |
|------|-------|
| 主要 Header/按鈕 | `bg-blue-600` |
| Hover 狀態 | `hover:bg-blue-700` |
| 成功/已達標 | `bg-emerald-400` / `text-emerald-600` |
| 警示/刪除 | `bg-red-500` / `text-red-500` |
| 中性背景 | `bg-slate-50` |
| 次要文字 | `text-slate-400` |
| 主要文字 | `text-slate-800` |

### 圓角系統（TouchFlow）
| 用途 | Class | 像素 |
|------|-------|------|
| 外層容器 | `rounded-3xl` | 24px |
| 大卡片/面板 | `rounded-2xl` | 16px |
| 按鈕/輸入框 | `rounded-xl` | 12px |
| 小標籤 Badge | `rounded-lg` | 8px |
| 全圓 | `rounded-full` | 9999px |

### 陰影系統（TouchFlow）
| 用途 | Class | 數值 |
|------|-------|------|
| 靜止卡片 | `shadow-tf-subtle` | 0 1px 3px rgba(0,0,0,0.06) |
| 浮起按鈕 | `shadow-tf-medium` | 0 4px 12px rgba(0,0,0,0.08) |
| Modal/Toast | `shadow-tf-large` | 0 8px 24px rgba(0,0,0,0.12) |
| 覆蓋層 | `shadow-tf-overlay` | 0 16px 48px rgba(0,0,0,0.18) |

### 間距系統
| 用途 | Class |
|------|-------|
| Header 內距 | `p-6` |
| 主要內容區 | `p-4 md:p-6` |
| 卡片內距 | `p-4` 或 `p-5` |
| Flex 間距 | `gap-2`, `gap-3` |
| 垂直間距 | `space-y-3`, `space-y-4`, `space-y-6` |

### 字體系統（TouchFlow）
| 用途 | Class | 字重 |
|------|-------|------|
| 標題（Figtree） | `text-xl md:text-2xl` | `font-extrabold` |
| 卡片標題 | `text-base` | `font-bold` |
| 金額/數字 | `text-lg` 或 `text-2xl` | `font-black` |
| 內文 | `text-base` | 一般 |
| 輔助文字 | `text-sm` 或 `text-xs` | `font-medium` |
| 極小標籤 | `text-[10px]` | `font-bold` 或 `font-semibold` |

### 按鈕模式
**主要 CTA 按鈕：**
```html
<button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 min-h-[56px] rounded-2xl shadow-tf-medium active:scale-95 transition-all flex items-center justify-center gap-2">
    <svg>...</svg>
    按鈕文字
</button>
```

**次要按鈕：**
```html
<button class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 min-h-[48px] rounded-xl transition-colors">
    按鈕文字
</button>
```

**Icon-only 按鈕：**
```html
<button class="touch-btn-sm p-3 hover:bg-blue-500 rounded-full transition-colors" title="Tooltip 說明">
    <svg>...</svg>
</button>
```

---

## localStorage Key 命名規範

為了避免不同 app 之間的 key 衝突，請遵守以下規範：

```
shop_{appId}_{purpose}
```

範例：
- `shop_shopping_current` - 購物助手目前清單
- `shop_shopping_saved` - 購物助手已儲存清單
- `shop_shopping_history` - 購物助手歷史記錄
- `shop_todo_items` - 待辦清單的項目
- `shop_pom_settings` - 番茄鐘的設定

---

## 常見任務 Checklists

### 新增 App 檢查清單
- [ ] 已建立 .html 檔案
- [ ] 有 Tailwind CDN
- [ ] 有 Google Fonts（Inter + Noto Sans TC）
- [ ] 有 `:root` safe area 變數
- [ ] 有 body `touch-action: manipulation`
- [ ] 所有按鈕有 `min-h-[44px]` 或 `.touch-btn`
- [ ] 使用 `max-w-md mx-auto` 容器
- [ ] 有返回 Dashboard 按鈕（選擇性但推薦）
- [ ] 已更新 apps.json
- [ ] 測試可從 Dashboard 點擊開啟
- [ ] 測試基本功能

### 更新 Dashboard 檢查清單
- [ ] 已修改 apps.json
- [ ] JSON 格式正確（無 trailing comma）
- [ ] 測試重新整理 index.html
- [ ] 確認分類順序正確
- [ ] 確認所有連結可點擊（狀態=active）
- [ ] 確認不可點擊的項目有正確標示（coming/idea）

---

## 相關檔案參考

| 檔案 | 用途 |
|------|------|
| `index.html` | Dashboard 入口 |
| `apps.json` | 所有 app 的設定檔 |
| `shopping.html` | 完整的 app 範本 |
| `AGENTS.md` | 專案總體架構說明 |
| `SHOPPING_APP_SUMMARY.md` | 購物 app 詳細文件 |
| `.opencode/skills/dashboard/SKILL.md` | 本檔案 |

---

## 外部連結 vs 本地檔案比較

| 項目 | 本地檔案 | 外部連結 |
|------|----------|----------|
| **路徑格式** | `shopping.html` 或 `tools/tip.html` | `https://...` 或 `http://...` |
| **開啟方式** | 同一頁 `window.location.href` | 新分頁 `window.open('_blank')` |
| **可修改性** | ✅ 可直接編輯程式碼 | ❌ 無法修改（唯讀） |
| **連結穩定性** | ✅ 永遠存在 | ⚠️ 依賴外部伺服器 |
| **適用情境** | 自己開發或下載的工具 | 第三方工具、示範版本 |

**建議**：如果喜歡某個外部工具，可以同時存在兩個版本：
- 一個「線上版」（外部連結）
- 一個「本地版」（可修改的本地檔案）

---

## 版本記錄

| 日期 | 變更 |
|------|------|
| 2026-05-14 | 遷移到標準技能路徑 `.opencode/skills/dashboard/SKILL.md` |
| 2026-05-13 | 初始建立，包含 index.html、apps.json、skill 文件<br>• 新增外部 URL 支援（自動新分頁開啟）<br>• 新增「新增外部連結 App」完整流程 |
