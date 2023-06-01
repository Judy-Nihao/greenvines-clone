# 實作紀錄：Clone 綠藤生機護膚蜜產品展示頁
自己本身是綠藤生機的消費者，喜歡他產品的包裝質感，偶然間逛到新品護膚蜜時，看到產品頁面上的瓶罐可以透明滑動在背景圖上，很喜歡這樣的呈現巧思，於是思考是不是可以自己分析，試著重構出同樣的版面。

## 實作網址
gh-pages
https://judy-nihao.github.io/greenvines-clone/

GitHub Repo
https://github.com/Judy-Nihao/greenvines-clone

## 實作功能：分析版面＋切版重現

- 研究欣賞的版面設計，思考實現方式
- 再現半透明瓶罐疊合照片＋定區滾動效果
- 左半邊圖像滾動時，固定右半邊說明區塊保持不動
- 下拉選單順滑顯示
- 手風琴收合資訊卡
- RWD版面調整

![image](https://hackmd.io/_uploads/rJK2-WSI2.jpg)

![image](https://hackmd.io/_uploads/H1R2GWSL3.gif)

## 筆記

研究官網的開發者工具後，跟猜想的一樣，背景滑動但是瓶罐不動的效果，主要是 `position: sticky`影響。



### 黏貼定位 position: sticky

`position: sticky` 我自己覺得有點介於 `position: fixed` 和 `position: absolute`

 - `position: fixed` : 固定定位的元素，永遠以網頁根元素，也就是 HTML 元素，作為定位依據，不管網頁怎麼捲動， 固定定位的元素會永遠固定在視窗指定位置，且元素本身脫離文件流，其他元素不再尊重此元素的空間存在，所以固定定位元素最好要記得設定 z-index ，確保元素層次高過其他元素，才不會被擋住。
 
- `position: absolute`：絕對定位的元素也會脫離文件流，會以最接近它的、具有可定位屬性的父層，當作定位依據，通常會是父層設定相對定位`position: relative`，子層設定絕對定位，讓子層元素可以相對於父層移動位置。如果沒有特別指定父層，那設定絕對定位的元素，會一路往源頭追朔到根元素 HTML當作對位依據。此外，父層元素的定位其實沒有規定非得要「相對定位」，只要是「靜態定位」 `position: static`「以外」的都可以。也可以父層和子層都是絕對定位。

- `position: sticky`：也是以父層的位置依據，父層可以設定相對定位，子層黏貼定位就會相對父層排版。


**和前兩種定位的相似與差異在於，黏貼定位是有條件的觸發**

```htmlembedded!
<div class="box-other"></div>
<div class="box-parent">
  <div class="box-child"></div>
</div>
```
```css!
body{
  padding: 0px;
  margin: 0;
  min-height: 300vh;
}

.box-other{
  width: 250px;
  height: 250px;
  background-color: tomato;
}
.box-parent{
  position: relative;
  width: 400px;
  height: 400px;
  background-color: lightgrey;
}

.box-child{
  position: sticky;
  width: 200px;
  height: 200px;
  background-color: seagreen;
  top: 100px;
}
}
```
![image](https://hackmd.io/_uploads/rJSdjWHUh.gif)


圖片中的灰色盒子：相對定位 (父層)
圖片中的綠色盒子：黏貼定位（子層）

**和固定定位相似的地方：黏在視窗**

黏貼定位的 `top: 100px` 屬性，這 100px 是指它相對於視窗頂端 100px 的意思，而不是相對於它的父層。從圖片中可以看到綠色子層，一開始是貼齊灰色父層的頂端的，並沒有吃到 100px 的影響。

一旦視窗因為捲動，使得黏貼定位的元素抵達指定位置時，黏貼定位才開始生效，做出像是固定定位的行為，固定在距離視窗頂端 100px 的地方，任由底下的父層滾動，產生某種前後景分離的滑動視覺效果。


**和絕對定位相似的地方：跟著父層離開**

但是這個固定視窗的效果，作用範圍僅限它的父層元素還在畫面上的時候。父層一路順著滾輪滑走，直到黏貼定位的子元素，碰觸到父層最底端時，黏貼定位的元素就會跟著父層元素一起滾動離開畫面。


**和相對定位相似的地方：鄰居元素會尊重空間份量**
有趣的是，元素即使設定黏貼定位，和它同層鄰居元素，在一開始尚未捲動時，依然會尊重他的空間。這點在實現綠藤生機版面時就有遇到。


### 應用在綠藤產品頁上的 position:sticky 結構

相同的道理應用在瓶罐與花朵照片也是一樣意思。

結構上是用一個 `product-img` 把 `bottle` 和 `photos` 包起來，`photos` 裡面是整排的花草照片。

`product-img` 設定 `position: relative` ，

`bottle` 設定 `position: sticky`，

`photos`的花草照片會跟著父層`product-img`一起移動，但是`bottle` 會黏在視窗上。

![image](https://hackmd.io/_uploads/SJznpWHI2.png)

![image](https://hackmd.io/_uploads/Hyl8CWrU3.jpg)

開始捲動後，就能營造出花草照片在透著瓶罐，在瓶罐下方持續往上捲動的視覺效果，直到花草照片離開畫面，瓶罐也會跟著被捲走。

但是，開始捲動後表現正常，還沒開始捲動時呢？

### 還沒開始捲動時出現的上方空隙

設定黏貼定位的元素，它的鄰居元素在還沒捲動時，還是會尊重黏踢元素的空間佔位，類似相對定位那樣，

例如：下圖的狀況

![image](https://hackmd.io/_uploads/BkPVezBI2.png)

花草照片上方的空間，其實就是瓶罐圖片的高度，

解除空隙的方式就是對`photos`的花草照片施加負值的 `margin-top`，數值去抓瓶罐高度。

這邊要注意，如果圖片高度沒有剛好是整數，數值指定不精確的話，頂端還是會有很細微的空隙。

可以在 JavaScript 對 bottle 使用 `getBoundingClientRect().height` 就可以取得很精確的小數點的高度值。

```javascript!
//點擊後
bottle.addEventListener("click", function(e){
  const rect = this.getBoundingClientRect().height; 
  console.log(rect); //回傳453.40625
});
```

取得元素高度的屬性，常見還有`clientHeight` ，不過 `clientHeight` 回傳的是整數，如果圖片高度不是剛好是整數的話，就不夠精準。

`photos` 加上 `margin-top: -453.40625px` 之後就抵銷花草照片距離頂端的距離。
![image](https://hackmd.io/_uploads/rJEVMQS83.png)

![image](https://hackmd.io/_uploads/HkmqfmBU3.png)

### 右半邊文字資訊同步暫時凝結

觀察官網會發現，除了左半邊的瓶罐有黏在畫面上的效果，右半邊的文字資訊在滾動時，也會停留在畫面上一陣子，這樣才能左右兩邊同進度一起在最後往上滑走。

如果不固定住右半邊，會出現左右兩邊元素滑動速率不同調的視覺落差。

所以右半邊也是包兩層，對`product__info`設定 `position:sticky`。

![image](https://hackmd.io/_uploads/B1VtFmrUh.png)

兩天都設定黏貼定位，就很接近原始頁面的兩邊同步暫時凝結

### 其他點擊互動

- 產品購買數量加減：加號減號修改購買數字
- 加入購物車按鈕：點擊後會將數字更新給右上角的購物車 icon 累計 
- 購物車 icon：點擊後會呈現數量即時更新的購物清單。產品畫面覆蓋淡灰色塊。
- 購物車清單：點擊 x 可以清空購買數量並關閉購物清單
- RWD 版面調整：
  + 版面過渡到行動裝置時，選單收納轉為漢堡選單。
  + 漢堡選單開啟時，選單滿版，並隱藏購物車清單。


我還記得最一開始看到綠藤頁面的憧憬，當時還很不熟悉切版，完全想像不出來這種透明瓶罐滑動的視覺是怎麼做到的，只能對畫面小巧思驚呼可愛～

直到現在能自己解析版面，重構再現，增添互動小細節，對我而言是一大進步。