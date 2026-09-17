# MovieSearch

一個以 React 與 TypeScript 撰寫的電影／電視劇查詢網站，資料來自 [The Movie Database (TMDB)](https://www.themoviedb.org/)。

**線上版：** [https://hihicherry.github.io/movie-search-app/](https://hihicherry.github.io/movie-search-app/)

## 主要功能

- **影視搜尋：** 依關鍵字搜尋電影或電視劇；輸入後約 0.4 秒會寫進 URL（`?q=`、`?type=tv`），也可按「查詢」立刻送出。從詳情頁返回時會還原同一批結果與頁碼。
- **進階篩選：** 搜尋欄旁的篩選按鈕可依電影／電視劇類型多選（`?genre=28` 或 `?genre=28,35`）。只選類型時顯示該類型熱門作品；再輸入關鍵字會在該類型中搜尋標題。
- **熱門清單：** 未搜尋、也未篩選類型時，顯示該媒體類型的熱門作品。
- **分頁：** 熱門、搜尋與類型篩選以頁碼切換（`?page=`，每頁 20 筆，最多 500 頁）。搜尋、篩選或切換電影／電視劇會回到第 1 頁。
- **詳情頁：** 海報、發行年份、劇情簡介、演員、預告片與台灣觀看平台；可分享或重整詳情 URL（需部署含 SPA fallback 的建置）。
- **收藏：** 以 `localStorage` 持久化，可在卡片或詳情頁加入／移除。
- **主題：** 紫色／藍色主題切換，狀態存在 `localStorage`。
- **響應式與動畫：** Tailwind CSS 適配桌面與行動裝置，Framer Motion 提供互動動畫。

## 技術棧

| 項目 | 使用 |
| --- | --- |
| 前端 | React 19、React Router 7（`basename` 對齊 Vite `base`） |
| 類型 | TypeScript 5（入口為 `src/main.tsx`，ESLint 掃 `.js`／`.jsx`／`.ts`／`.tsx`） |
| 伺服器狀態 | TanStack Query（熱門／搜尋／類型發現／詳情快取） |
| 客戶端狀態 | `ThemeContext`、`FavoritesContext` |
| 樣式 | Tailwind CSS 3 |
| 動畫 | Framer Motion |
| API | TMDB v3（金鑰來自 `VITE_TMDB_API_KEY`） |
| 建置 | Vite 6 |
| 部署 | GitHub Pages（`gh-pages` 套件，`base: /movie-search-app/`） |

## 環境要求

- Node.js 18 或以上（建議 LTS）
- npm 9 或以上
- 現代瀏覽器（Chrome、Firefox、Safari、Edge）

## 安裝與本機執行

```bash
git clone https://github.com/hihicherry/movie-search-app.git
cd movie-search-app
npm install
```

1. 到 [TMDB API 設定](https://www.themoviedb.org/settings/api) 申請 API Key。
2. 複製環境變數範本並填入金鑰：

```bash
cp .env.example .env
```

```
VITE_TMDB_API_KEY=你的_API_KEY
```

`.env` 已列入 `.gitignore`，請勿把真實金鑰提交到 GitHub。`VITE_*` 會打進前端 bundle，公開部署時等同暴露，請只用可公開的 TMDB API Key，不要放權限較高的 token。

啟動開發伺服器：

```bash
npm run dev
```

Vite 的 `base` 為 `/movie-search-app/`，本機請開：

[http://localhost:5173/movie-search-app/](http://localhost:5173/movie-search-app/)

## 構建與部署

```bash
npm run build      # 輸出到 dist（含複製 index.html → 404.html，供 GitHub Pages 深連結）
npm run preview    # 預覽生產建置
npm run deploy     # 建置後推到 gh-pages 分支
```

GitHub Pages 來源為 `gh-pages` 分支。部署後約數分鐘可到線上版查看。

## 使用說明

- **搜尋：** 在首頁輸入關鍵字，停一下或點「查詢」。結果以卡片顯示海報、標題與發行年份；用「上一頁／下一頁」或頁碼切換。切換電影／電視劇會回到該媒體類型熱門第 1 頁，並清掉關鍵字與類型篩選。
- **進階篩選：** 點搜尋欄旁的圖示展開類型標籤，可多選。只選類型時列表為該類型熱門作品（TMDB Discover）。再輸入關鍵字會在該類型中搜標題。再點一次可取消；「清除篩選」會拿掉所有類型。
- **詳情：** 點卡片進入 `/:mediaType/:id`。詳情頁的「返回」會回到上一頁（含搜尋結果或類型篩選）；導覽列 Home 則連到沒有搜尋參數的熱門首頁。
- **收藏：** 點 ♥ 加入或移除；到 Favorites 頁查看清單。
- **主題：** 在導覽列切換紫色／藍色。

## 程式碼結構

```
movie-search-app/
├── public/
├── src/
│   ├── components/    # MovieCard、NavBar、SkeletonCard、PaginationBar、AdvancedSearch、WatchProviders
│   ├── contexts/      # ThemeContext、FavoritesContext
│   ├── pages/         # Home、DetailPage、Favorites
│   ├── query/         # TanStack Query client 與 query keys
│   ├── services/      # TMDB API（tmdbApi.ts）
│   ├── types/         # TMDB 型別
│   ├── hooks/         # useDebouncedValue 等
│   ├── css/           # 全域樣式（index.css）
│   ├── App.tsx
│   └── main.tsx       # 掛上 BrowserRouter basename
├── .env.example
├── eslint.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.js
└── package.json
```

## 程式碼品質

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint（src 內 .js／.jsx／.ts／.tsx）
npm run lint:fix
npm run format      # Prettier
```

## 貢獻

歡迎開 Issue 或 Pull Request。建議流程：fork → 開功能分支 → 通過 lint／格式化 → 依 Conventional Commits 提交 → 開 PR。

## 已知限制

- 缺少單元測試。
- TMDB 無法在同一請求同時做標題搜尋與類型篩選；有關鍵字時會先搜標題，再留下符合任一所選類型的結果（最多掃描前 5 頁搜尋結果）。未輸入關鍵字、只選多個類型時，熱門列表仍須同時符合全部類型。
- GitHub Pages 為靜態 hosting：詳情深連結需建置時產出 `404.html`；`npm run deploy` 才會更新線上版，合併到 `main` 不會自動發布。

## 授權

MIT

作者：[Cherry（hihicherry）](https://github.com/hihicherry)  
問題反饋：請開 [GitHub Issues](https://github.com/hihicherry/movie-search-app/issues)。
