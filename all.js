
//行動版選單相關
const menuMobileBtn = document.querySelector(".menu-mobile-header__btn");
const menuMobileMain = document.querySelector(".menu-mobile-main");

menuMobileBtn.addEventListener("click", ()=>{
    
    if(menuMobileMain.classList.contains('active')){
        menuMobileMain.classList.remove("active");
    }else{
        menuMobileMain.classList.add("active");
    }
})


//sticky相關
const productImg = document.querySelector(".product-img");
const bottle = document.querySelector(".bottle");
const photos = document.querySelector(".photos");

// bottle預設高度：視窗還沒 resize 時，用當下 bottle 高度作為 photos margin-top 退回的值
let bottleH = bottle.getBoundingClientRect().height;
photos.style.setProperty("margin-top", `-${bottleH}px`);


// 測試點擊抓取 bottle 實際高度
bottle.addEventListener("click", function(e){
  const rect = this.getBoundingClientRect().height; 
  //this等於 bottle，也就是取得 bottle 本身精細的高度
  console.log(rect);
  // console.log(this.clientHeight); //clientHeight回傳的是整數，不夠精準
});

// 監聽視窗尺寸變動
// 用 bottle 當下的高度當作 photos margin-top 的負值
// 設定 sticky 的元素依然保留在文件流中，其他元素會尊重它的高度
// 所以這邊要給 photos 一個 margin-top 的負值抵銷掉bottle的高度，使貼齊頂端
window.addEventListener("resize", function(){
  let bottleH = bottle.getBoundingClientRect().height; 
  //必須再宣告一次變數在function裡面，用來及時更新當下元素高度
  console.log(bottleH);
  photos.style.setProperty("margin-top", `-${bottleH}px`);

})
