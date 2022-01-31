const urlParams = new URLSearchParams(window.location.search);
const stockSymbol = urlParams.get("symbol");
const companyName = document.getElementById("company-name");
const logo = document.getElementById("company-logo");
const companyInfo = document.getElementById("company-info");
const priceInfo = document.getElementById("price-info");
const loaderCompany = document.getElementById("loader-company");
const companyHead = document.getElementById("company-head");

function changeStyleOfPercent(number) {
  if (number >= 0) {
    priceInfo.classList.add("company-price-info-plus");
  } else {
    priceInfo.classList.add("company-price-info-minus");
  }
}

async function getCompanyFromServer() {
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${stockSymbol}`;
  const response = await fetch(url);
  const data = await response.json();
  let priceInfoText;
  console.log(data.profile.companyName);
  console.log(data.profile.image);
  companyName.innerHTML = `<a href="${data.profile.website}">${data.profile.companyName}</a>`;
  logo.src = `${data.profile.image}`;
  companyInfo.innerHTML = `${data.profile.description}`;
  const percentVal = Number.parseFloat(data.profile.changesPercentage);
  console.log(percentVal);
  changeStyleOfPercent(percentVal);

  priceInfoText = `$${data.profile.price} <span>(${data.profile.changesPercentage}%)</span>`;

  priceInfo.innerHTML = priceInfoText;
}

async function getChartFromServer() {
  loaderCompany.style.display = "block";
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${stockSymbol}?serietype=line`;
  const response = await fetch(url);
  const data = await response.json();
  loaderCompany.classList.add("loader-enabled");
  console.log(data.historical[0]);
  let xValues = [];
  let yValues = [];
  for (let i = 0; i < 30; i++) {
    xValues.push(data.historical[i].date);
    yValues.push(data.historical[i].close);
  }
  xValues.reverse();
  yValues.reverse();
  console.log(xValues);
  console.log(yValues);

  const chartData = {
    labels: xValues,
    datasets: [
      {
        label: "Daily Stock Price Change Last 30 Days",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(0, 0, 0)",
        data: yValues,
      },
    ],
  };
  const config = {
    type: "line",
    data: chartData,
    options: {},
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
  loaderCompany.style.display = "none";
}

getCompanyFromServer();
getChartFromServer();
