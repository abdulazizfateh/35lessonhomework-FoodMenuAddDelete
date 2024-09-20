const url = "https://food-pos-data.vercel.app";


const middleFoodOptions = document.querySelector(".middle-food-options");
const middleCards = document.querySelector(".middle-cards");
const rightOrders = document.querySelector(".right-orders");

const renderOptionsData = async (data) => { //222 bu funksiya backenddan kelgan ma'umotni qabul qiladi va shu ma'lumotni render qiladi
    middleFoodOptions.innerHTML = data.map((item) => `
        <a data-path="${item.path}" class="middle-food-options-link transition-all duration-200 font-[B600] text-[14px] leading-[140%] pb-[13px] border-b-[3px] text-white hover:text-[#EA7C69]
         border-transparent hover:border-[#EA7C69]" href="#">${item.name}</a>
    `
    ).join("");
    const middleFoodOptionsLink = document.getElementsByClassName("middle-food-options-link");
    middleFoodOptionsLink[0].style.color = "#EA7C69";
    middleFoodOptionsLink[0].style.borderColor = "#EA7C69"; // birinchi user kirganda default contentni tabi active qilingan
}




const renderContentData = async (data) => { //333 bu funksiya backenddan kelgan ma'umotni qabul qiladi va shu ma'lumotni render qiladi
    middleCards.innerHTML = data.map((item) => `
     <div class="middle-card relative w-[192px] pt-[114px] pb-[18px] px-[40px] bg-[#1F1D2B] flex flex-col justify-between gap-[6px] items-center rounded-[16px] text-center">
        <img class="absolute top-[-38px] left-[36px] w-[120px] h-[120px] rounded-[50%] object-cover" src="${item.img}" alt="">
        <p class="middle-card-title text-[14px] text-white font-[B500] leading-[130%]">${item.title}</p>
        <p class="text-white font-[B400] text-[14px] leading-[140%]">${item.price}</p>
        <p class="text-[#ABBBC2] font-[B400] text-[14px] leading-[140%]">${item.text}</p>
        <button data-path="hotdishes" data-id="${item.id}" class="middle-card-btn-add bg-[#2D303E] border border-[#393C49] py-[4px] px-[7px] rounded-[4px] mt-[8px] active:bg-[#3e4358]
        text-white font-[B400] text-[14px] leading-[140%]">Add</button>
    </div>
    `
    ).join("");
}



const getContentData = async (path) => { //222 bu funksiya path qabul qiladi, va tabiiyki o'sha pathdagi ma'lumotni olib keladi va shu olib kelingan ma'lumotni
    // render qiluvchi funksiyani chaqiradi
    try {
        const request = await fetch(`${url}/${path}`);
        const data = await request.json();
        renderContentData(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}


const getOptionsData = async () => { //111 tab ya'ni food optionlari ma'lumoti backenddan olib kelingan. Uni render qiluvchi funksiya chaqirilgan
    // va default holati uchun ham birinchi content datasini backenddan olib keluvchi va u o'zini ichida shu o'zi olib kelgan ma'lumotni render
    // qiluvchi funksiya chaqirilgan  
    try {
        const request = await fetch(`${url}/catalog`);
        const data = await request.json();
        renderOptionsData(data);
        getContentData(data[0].path);
        return data;
    } catch (error) {
        console.log(error);
    }
}

getOptionsData();



middleFoodOptions.addEventListener("click", (e) => { //444(qachonki shu foodOptions bosilganda) bosilgan catalogni contenti chiqishi va qaysi catalogni 
    // contenti chiqib turgani haqida habar beruvchi stil ya'ni active berilgan
    const optionPath = e.target.dataset.path;
    if (optionPath) {
        getContentData(optionPath); // ezilgan elementni path dataseti bo'lsa o'sha ezilgan elementni pathiga teng content ma'lumotini olib keluvchi
        // funksiya chaqirilgan 
        const middleFoodOptionsLink = document.getElementsByClassName("middle-food-options-link");
        for (let i of middleFoodOptionsLink) {
            i.style.color = "";
            i.style.borderColor = "";
        }
        e.target.style.color = "#EA7C69";
        e.target.style.borderColor = "#EA7C69";
    }
});

const defaultFunction = async () => { // boshqa joy ezilganda default holatiga qaytadi va color va border colori o'zgaradi, aynan default contenti active 
    // bo'lganligini bildirish uchun
    const data = await getOptionsData();
    middleFoodOptions.addEventListener("click", (e) => {
        const middleFoodOptionsLink = document.getElementsByClassName("middle-food-options-link");
        for (let i of middleFoodOptionsLink) {
            if (e.target.dataset.path === undefined) {
                i.style.color = "";
                i.style.borderColor = "";
            }
        }
        if (e.target.dataset.path === undefined) {
            getContentData(data[0].path);
            middleFoodOptionsLink[0].style.color = "#EA7C69";
            middleFoodOptionsLink[0].style.borderColor = "#EA7C69";
        }
    });
}

defaultFunction();







// 19.09.2024

const renderCardDataToOrder = async (localData) => {
    rightOrders.innerHTML = localData.map((item) => `
            <div class="right-order flex items-center gap-[16px]">
              <div class="right-order-c w-[297px]">
                <div class="right-order-c-top flex items-center justify-between mb-[10px]">
                  <div class="right-order-c-top-food flex items-center gap-[6px]">
                    <div class="right-order-c-top-food-img">
                      <img class="w-[40px] h-[40px] rounded-full" src="${item.img}" alt="">
                    </div>
                    <div class="right-order-c-top-food-info">
                      <p class="mb-[4px] font-[B500] text-white text-[14px] leading-[130%]">${item.title}</p>
                      <p class="font-[B500] text-[#ABBBC2] text-[12px] leading-[130%]">${item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button data-id="${item.id}" class="right-order-delete p-[14px] active:bg-[#252236] rounded-[8px] border border-[#FF7CA3]">
                <img data-id="${item.id}" src="../images/right-delete.svg" alt="">
              </button>
            </div>
    `
    ).join("");
};









const saveLocal = async (data) => {
    const oldData = JSON.parse(localStorage.getItem("cardData")) || [];
    localStorage.setItem("cardData", JSON.stringify([data, ...oldData]));
    const localData = JSON.parse(localStorage.getItem("cardData"));
    renderCardDataToOrder(localData);
};

const getCardData = async (path, id) => {
    try {
        const request = await fetch(`${url}/${path}/${id}`);
        const data = await request.json();
        saveLocal(data);
    } catch (error) {
        console.log(error);
    }
}

middleCards.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    const path = e.target.dataset.path;
    if (id) {
        getCardData(path, id);
    }
});



const getDeleteCardData = async (id) => {
    console.log(id);
    const getLocal = JSON.parse(localStorage.getItem("cardData")) || [];
    console.log(getLocal);
    const updateLocal = getLocal.filter(item => item.id != id);
    localStorage.setItem("cardData", JSON.stringify(updateLocal));
    renderCardDataToOrder(updateLocal);
    console.log(updateLocal);
}


rightOrders.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        getDeleteCardData(e.target.dataset.id);
    }
});






