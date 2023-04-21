# 如何開始
- 安裝
```
npm i 
```
- 啟動
```
npm run start
```
- 建議使用Binance Smart Chain Testnet 進行測試
- 測試幣取得 https://testnet.bnbchain.org/faucet-smart

# 實現功能
## 首頁
- 登入幣安及MetaMask錢包
- 取得幣安及MetaMask錢包地址
- 登入後切換幣安及MetaMask錢包的netWrok

## 進入頁面後
- 取得幣安及MetaMask錢包，在該network的指定token(ERC20、主幣)的餘額數量
- MetaMask 可以點擊新增未在錢包內的token(ERC20) [目前幣安不支援]
- 進行幣安及MetaMask錢包ERC20的轉帳交易

## 監聽
- 幣安及MetaMask錢包可以監聽使用者自行切換network
- MetaMask錢包可以監聽使用者自行登出 [目前幣安不支援]

## 組件區分
- NavComponenst 
    1. 基本錢包api都在此完成(錢包監聽、切換及新增network功能)
    2. 需要用到套件功能已web3為主(抓取錢包地址)
    3. 登入/登出
    4. 實現選擇錢包功能(MetaMask、幣安錢包)

- 頁面Web3JS/EthersJS
    1. 實現選擇不同區塊鍊套件
    2. 完成交易轉帳
    3. 選擇該鍊貨幣抓取餘額並交易

## 其他套件使用
- React Router
    - 路由功能
- Redux
    - 存取登入狀態、錢包地址、Provider(選擇的錢包)、Network
- React icons

## 目前幣安不支援功能
- 監聽使用者錢包登出
- 新增token

---

## 沒做的功能
- 使用者自行變更帳戶監聽