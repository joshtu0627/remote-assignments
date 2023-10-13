function getPostData() {
  return new Promise((resolve) => {
    const postData = [
      {
        id: 0,
        title: "This is a sample title",
        content: "This is a sample post",
      },
      {
        id: 1,
        title: "Why do we use Node.js? What does it do?",
        content:
          "因為 React 本身以及它所需要的模組主要都以 Node.js 生態系統中的 npm 來進行管理，所以我們需要用 Node.js 來安裝所需的模組，並且在開發時使用 Node.js 的工具來進行編譯、打包等等的工作。",
      },
      {
        id: 2,
        title:
          "Explain the Styled-Component you made. What's CSS-in-JS, and how does it help compared to regular CSS?",
        content: `CSS-in-JS 是一個直接把 CSS 嵌入到 JS 程式的方法，我在 code 中宣告了兩種 Styled-Component，一個是 PostWrapper (包住每個 post 的 div)，一個是 LikeButton (按鈕的樣式)
        
        用 styled-components 的好處是，可以直接在 JS 中寫 CSS，不用再另外寫一個 CSS 檔案，而且可以直接在 JS 中使用 props，讓 CSS 更加彈性，把 CSS 跟 JS 整合在一起也可以避免命名衝突的問題。`,
      },
      {
        id: 3,
        title: "Discuss useState and useEffect. How did you use them?",
        content: `useState 是一個 React 的 hook，可以讓我們在 functional component 中使用 state，而不用再寫 class component 來使用 state。

        useEffect 是 React 另外一個 hook，可以讓我們在畫面渲染，或是 state 改變時，執行一些 code。
        
        在這個專案中，我使用 useState 來儲存每個 post 的 like 數量，以及判斷是否已經按過 like，並使用 useEffect 來取得資料，並初始化每個 post 的 like 狀態。`,
      },
      {
        id: 4,
        title:
          "Describe Client-Side Rendering vs. Server-Side Rendering. How did you achieve Server-Side Rendering in Next.js? Think about getServerSideProps.",
        content: `Client-Side Rendering 是指用戶在做出請求後，瀏覽器會先拿到一個空的 HTML，然後再透過 JavaScript 去取得資料，並且渲染畫面。

        Server-Side Rendering 是指用戶在做出請求後，瀏覽器會直接拿到一個已經有資料的 HTML，並且渲染畫面。
        
        在這個專案中，我使用的是 static generation，而不是 server-side rendering，在 build 後，會直接產生一個靜態的 HTML，並且在每次有人訪問時，直接回傳這個 HTML，而不用再重新產生。
        
        如果要使用 server-side rendering，可以使用 getServerSideProps，它會在每次有人訪問時，都依照使用者的請求，產生一個新的 HTML，並且回傳給使用者。`,
      },
      {
        id: 5,
        title: "Which coding styles did you follow when coding?",
        content: `我使用 Airbnb 的 coding style，以及在 vscode 中搭配 prettier 自動排版，並且使用 ESLint 來檢查程式碼。`,
      },
      {
        id: 6,
        title:
          "Think of a website with great user experience. What makes it good? Highlight three front-end aspects.",
        content: `我覺得 twitter (X) 的使用者體驗很好，以下它的優點:

        - 它的介面很簡單、直覺，不像其他社群網站有一大堆亂七八糟的功能，讓使用者可以專心的看貼文。
        - 介面設計很美觀，而且有深色模式。
        - 功能規劃分的很清楚，容易找到想要的功能。`,
      },
    ];
    resolve(postData);
  });
}

export default getPostData;
