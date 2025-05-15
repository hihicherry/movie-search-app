電影查詢網站 - MovieSearch
一個基於 React 的現代化電影與電視節目查詢平台，使用 TMDB API 提供即時資料
專案概述
MovieSearch 是一個開源的電影與電視節目查詢網站，旨在為使用者提供直觀、快速的影視資訊查詢體驗。透過整合 The Movie Database (TMDB) API，本專案允許使用者搜尋電影與電視節目、查看詳細資訊（如演員陣容、劇情簡介）並管理個人收藏清單。網站採用現代化前端技術棧，注重程式碼品質與使用者體驗。
專案目前部署於 GitHub Pages，適合影視愛好者、開發者與學習者使用或二次開發。
主要功能

影視搜尋：支援關鍵字搜尋電影與電視節目，顯示即時結果。
詳細資訊：提供影視的詳細資料，包括海報、標題、發行年份、劇情簡介與演員清單。
收藏管理：允許使用者將喜愛的影視加入個人收藏清單，並支援移除功能（使用 localStorage 持久化儲存）。
響應式設計：使用 Tailwind CSS 實現行動裝置與桌面端的適配，確保跨平台一致性。
動畫效果：透過 Framer Motion 實現流暢的 UI 動畫，提升互動體驗。
主題切換功能：新增深色與淺色主題切換，使用 React Context 管理主題狀態並儲存於 localStorage，提升使用者體驗。
程式碼品質：整合 ESLint 和 Prettier，確保程式碼一致性與可維護性。

技術棧

前端框架：React 19.0.0（使用 React Router 7.3.0 實現路由管理）
樣式方案：Tailwind CSS 3.4.14（搭配自訂主題色）
動畫效果：Framer Motion 12.6.2
API 整合：TMDB API（提供影視資料）
狀態管理：React Context（用於收藏清單管理）
構建工具：Vite 6.2.4（高效的開發與構建體驗）
程式碼品質：
ESLint 9.26.0（搭配 eslint-plugin-react、eslint-plugin-react-hooks、eslint-plugin-prettier）
Prettier 3.3.3（統一程式碼格式）

部署：GitHub Pages（透過 gh-pages 套件）

環境要求

Node.js：18.x 或更高版本（推薦使用 LTS 版本）
npm：9.x 或更高版本
瀏覽器：支援現代瀏覽器（Chrome、Firefox、Safari、Edge）

安裝與本地運行

1. 克隆專案
   git clone https://github.com/hihicherry/movie-search-app.git
   cd movie-search-app

2. 安裝依賴
   npm install

3. 配置 TMDB API

註冊 TMDB 帳戶 並獲取 API Key。

在專案根目錄創建 .env 檔案，添加以下內容：
VITE_TMDB_API_KEY=你的\_API_KEY

注意：請勿將 API Key 提交至 GitHub，確保 .env 已在 .gitignore 中。

4. 啟動開發伺服器
   npm run dev

伺服器將在 http://localhost:5173 啟動，開啟瀏覽器即可訪問。5. 構建與部署

構建生產版本：
npm run build

構建結果將輸出到 dist 目錄。

預覽構建結果：
npm run preview

部署到 GitHub Pages：
npm run deploy

使用說明

首頁搜尋：

在首頁輸入關鍵字（如電影名稱或演員），點擊搜尋按鈕。
搜尋結果以卡片形式展示，包含海報、標題與發行年份。

查看詳細資訊：

點擊卡片上的「詳細資訊」連結，進入影視詳情頁。
詳情頁顯示劇情簡介、演員清單與其他元資料。

管理收藏：

在卡片或詳情頁點擊「♥」按鈕，將影視加入或移除收藏清單。
收藏清單可在「Favorites」頁面查看，資料儲存於 localStorage。

程式碼結構
movie-search-app/
├── public/ # 靜態資源
├── src/
│ ├── components/ # 可重用組件（MovieCard、NavBar）
│ ├── contexts/ # React Context（MovieContext 管理收藏）
│ ├── pages/ # 頁面組件（Home、DetailPage、Favorites）
│ ├── services/ # API 呼叫邏輯（api.js）
│ ├── App.jsx # 應用程式入口
│ └── main.jsx # React 渲染入口
├── .eslintrc.json # ESLint 配置（計畫遷移到 eslint.config.js）
├── .prettierrc # Prettier 配置
├── tailwind.config.js # Tailwind CSS 自訂配置
├── vite.config.js # Vite 配置
├── package.json # 依賴與腳本
└── README.md # 專案說明

程式碼品質
本專案採用以下工具確保程式碼一致性與可維護性：

ESLint：使用 eslint:recommended、plugin:react/recommended、plugin:react-hooks/recommended 和 plugin:prettier/recommended，檢查程式碼規範並自動修復問題。
Prettier：統一程式碼格式（單引號、2 空格縮進）。
命名規範：已完成部分命名統一（例如 isFavorites 改為 isFavorite），確保符合駝峰命名法與語義清晰。

運行以下命令檢查與修復程式碼：
npm run lint:fix # 運行 ESLint 並自動修復
npm run format # 運行 Prettier 格式化程式碼

貢獻指南
歡迎對專案提出改進建議或貢獻程式碼！請遵循以下流程：

Fork 專案：點擊 GitHub 上的 Fork 按鈕，創建個人副本。
創建分支：git checkout -b feature/你的功能

提交變更：
確保程式碼通過 ESLint 和 Prettier 檢查。
提交訊息遵循 Conventional Commits（例如 feat: add search filter）。

推送並創建 Pull Request：git push origin feature/你的功能

在 GitHub 上提交 PR，描述變更內容與目的。

已知問題與未來計畫
已知問題

ESLint 配置：目前使用 .eslintrc.json，但 ESLint 10.0.0 將棄用此格式，計畫遷移到 eslint.config.js 以適應未來版本。

未來計畫

引入 TypeScript：將專案轉為 TypeScript，增強型別安全（計畫創建 tsconfig.json 並轉換 .jsx 為 .tsx）。
進階搜尋功能：新增篩選器（例如按年份、類型）與分頁功能，優化搜尋體驗。
單元測試：引入 Vitest 或 Jest，測試組件與 API 邏輯的穩定性。
多語言支援：透過 i18next 實現多語言介面（例如繁體中文、英文）。

聯繫方式

作者：Cherry（hihicherry）
GitHub：https://github.com/hihicherry
問題反饋：請在 GitHub Issues 提交問題或建議。

授權
本專案採用 MIT 授權，歡迎自由使用、修改與分享。

感謝使用 MovieSearch！希望你享受探索影視世界的樂趣！
