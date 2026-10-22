// {
// 交易日期: "115.10.22",
// 種類代碼: "N04",
// 作物代號: "rest",
// 作物名稱: "休市",
// 市場代號: "104",
// 市場名稱: "台北二",
// 上價: 0,
// 中價: 0,
// 下價: 0,
// 平均價: 0,
// 交易量: 0
// }

// 蔬菜比價網：串接 API 顯示資料
// 蔬菜比價網：可以篩選『蔬菜』、『水果』、『花卉』三個類別
// 蔬菜比價網：可以搜尋作物名稱，並顯示當前搜尋的字詞和結果
// 蔬菜比價網：可以排序篩選、點擊表頭中的上下 icon 可以跟著排序（參考設計稿第五頁）

let marketData = [];
const tableBody = document.querySelector(".showList");
const categoryBtns = document.querySelectorAll(".btn-type");
const cropInput = document.querySelector("#crop");
const searchBtn = document.querySelector(".search");
const cropName = document.querySelector("#js-crop-name");

// 取得 API 資料
axios.get('./FarmTransData.json')
    .then(function (response) {
        marketData = response.data;
        renderTable(marketData);
    });


// 作物分類
categoryBtns.forEach((button) => {
    button.addEventListener("click", () => {
        const filteredData = marketData.filter((item) => {
            return item.種類代碼 === button.dataset.type;
        });
        renderTable(filteredData);
    });
});


// 渲染表格
function renderTable(data) {
    let html = "";
    data.forEach((product) => {
        html += `<tr>
                <td>${product.作物名稱}</td>
                <td>${product.市場名稱}</td>
                <td>${product.上價}</td>
                <td>${product.中價}</td>
                <td>${product.下價}</td>
                <td>${product.平均價}</td>
                <td>${product.交易量}</td>
                </tr>`;
    });
    tableBody.innerHTML = html;
}


// 搜尋作物

searchBtn.addEventListener("click", () => {
    const searchedData = marketData.filter((item) => {
        return item.作物名稱 && item.作物名稱.includes(cropInput.value);
    });
    cropName.textContent = `查看「${cropInput.value}」的比價結果`;
    renderTable(searchedData);
});