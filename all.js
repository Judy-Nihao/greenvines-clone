//上半部產品區塊
const containerProduct = document.querySelector(".container-product");
const bottle = document.querySelector(".bottle");
//行動版選單相關
const menuMobileBtn = document.querySelector(".menu__mobile__btn");
const menuMobileMain = document.querySelector(".menu-mobile-main");
//購物數量相關
const minus = document.querySelector(".minus");
const num = document.querySelector(".num");
const add = document.querySelector(".add");
const addToCart = document.querySelector(".addToCart");
//購物車icon相關
const cartIconCount = document.querySelector(".cart__count");
const cartIcon = document.querySelector(".cart");
const cartItem = document.querySelector(".cart__item");
const cartQuantity = document.querySelector(".cart__item__quantity");
const deleteBtn = document.querySelector(".delete__btn");
const overlay = document.querySelector(".overlay");
const subMenu = menuMobileMain.querySelector(".sub-menu");
const arrow = menuMobileMain.querySelector(".arrow");

//行動版漢堡選單點擊
menuMobileBtn.addEventListener("click", ()=>{
    document.body.classList.toggle('no-scroll');

    if(menuMobileMain.classList.contains('active')){
        menuMobileMain.classList.remove("active");
    }else{
        menuMobileMain.classList.add("active");
    }

    cartItem.classList.remove("active");
    overlay.classList.remove("active"); //頁面透黑色遮蓋

})

//行動版選單項目點擊
menuMobileMain.addEventListener("click", (e) => {
    if(e.target.tagName == "A"){
        subMenu.classList.add("active");
    }
})

arrow.addEventListener("click", () => {
    subMenu.classList.remove("active");
})


// 加入購物車數量計算
let number = 1;

minus.addEventListener("click", ()=>{
    click(-1);
    check();
});

add.addEventListener("click", ()=>{
    click(1);
    check();
});

function click(counting){
    number = number + counting;
    num.textContent = number;
  };

//加減數字同步購物車icon＋檢查數字最小為1
function check(){
    if(num.textContent < 1){
        number = 1; //最小等於1，不可以小於1
        num.textContent = 1;        
    }
}


// 點擊加入購物車按鈕，右上角購物車 icon 就累計數字
cartIconCount.textContent = 0;

addToCart.addEventListener("click", ()=>{
    cartIconCount.textContent = parseInt(cartIconCount.textContent) + parseInt(num.textContent);    
    cartQuantity.textContent = cartIconCount.textContent;

    if(parseInt(cartIconCount.textContent) > 0){
        cartIconCount.style.backgroundColor = "#C84601"; //數量大於0時數字背景變橘紅色
    }
})


//點擊購物車 icon：當選購數字大於0時才顯示購物車清單
let array = Array.from(cartItem.children);

cartIcon.addEventListener("click", ()=>{

    if(parseInt(cartIconCount.textContent) > 0){
        cartItem.classList.toggle("active");
        
        array.forEach(item=>{
            item.style.opacity = 1;
        });

        //頁面透黑色遮蓋
        if(overlay.classList.contains('active')){
            overlay.classList.remove("active");
        }else{
            overlay.classList.add("active");
        };
        
        //購物車清單點擊顯示時，漢堡遠單就要隱藏，body恢復可以捲動
        if(menuMobileMain.classList.contains('active')){
            menuMobileMain.classList.remove("active");
            document.body.classList.toggle('no-scroll');
        };
    }
})

//點擊購物車產品刪除按鈕
deleteBtn.addEventListener("click", ()=>{
    cartItem.classList.toggle("active");
    cartIconCount.textContent = 0;
    cartQuantity.textContent = cartIconCount.textContent;
    array.forEach(item=>{
        item.style.opacity = 0;
    });

    if(overlay.classList.contains('active')){
        overlay.classList.remove("active"); //頁面透黑色遮蓋
    }else{
        overlay.classList.add("active");
    }
    
    cartIconCount.style.backgroundColor = "grey";
});

// 點擊抓取 bottle 實際高度
// 用 bottle 的高度當作 photos 的 margin-top 的負值
bottle.addEventListener("click", function(e){
  const rect = this.getBoundingClientRect().height; 
  console.log(rect); 
  //回傳 453.40625
  //clientHeight回傳的是整數，不夠精準
});


// 監聽視窗尺寸變動
// window.addEventListener("resize", function(){
//   let bottleH = bottle.getBoundingClientRect().height; 
//   photos.style.setProperty("margin-top", `-${bottleH}px`);
// })


