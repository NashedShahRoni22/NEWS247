// load category items
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));
};
// display category items
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <li onclick="newsDetailsLoad(${category.category_id})">${category.category_name}</li>
        `;
    categoryContainer.appendChild(li);
  });
};
// load category all news
const newsDetailsLoad = (newsId) => {
  spinnerDisplay(true);
  const url = `https://openapi.programming-hero.com/api/news/category/0${newsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllNews(data.data))
    .catch((error) => console.log(error));
};

//display all
const displayAllNews = (allNews) => {
  //display all news
  const newsItems = document.getElementById("news-items");
  newsItems.innerText = allNews.length;
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  allNews.forEach((news) => {

    const ratingArray =[];
    ratingArray.push(news.total_view);
    console.log(ratingArray);
    const newsdetailsDiv = document.createElement("div");
    newsdetailsDiv.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${
                      news.thumbnail_url
                    }" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${news.title}</h5>
                      <p class="card-text">${news.details.slice(
                        0,
                        200
                      )}...<span class="text-primary">Read More</span></p>
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="img-left">
                    <img src="${news.author.img}" alt="" class="rounded-circle">
                  </div>
                  <div class="content-right">
                      <strong>${
                        news.author.name
                          ? news.author.name
                          : '<p class="text-danger">No Data Found</p>'
                      }</strong>
                      <p class="text-muted">${
                        news.author.published_date
                          ? news.author.published_date
                          : '<p class="text-danger">No Data Found</p>'
                      }</p>
                  </div>
                </div>
                <div>
                  <i class="fa-regular fa-eye text-primary"></i>
                  <span class="text-primary">${
                    news.total_view
                      ? news.total_view
                      : '<p class="text-danger">0 Views</p>'
                  }</span>
                </div>
                <div>
                <button data-bs-toggle="modal"
                data-bs-target="#exampleModal" class="bg-primary rounded-circle border-0" onclick="newsFullDetailsLoad('${
                  news._id
                }')">
                <i class="fa-solid fa-arrow-right text-white"></i>
                </button>
                </div>
              </div>
                  </div>
                </div>
            </div>
        `;
    newsContainer.appendChild(newsdetailsDiv);
  });
  spinnerDisplay(false);
};

const newsFullDetailsLoad = (detailsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${detailsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]))
    .catch((error) => console.log(error));
};
const displayNewsDetails = (newsDetails) => {
  // console.log(newsDetails);
  const newsDetailsModal = document.getElementById("news-details-modal");
  newsDetailsModal.innerHTML = `
  <img src="${newsDetails.image_url}" alt="" class="img-fluid">
  <h5 class="my-3">${newsDetails.title}</h5>
  <p>${newsDetails.details}</p>
  `;
};

// display category all news
const spinnerDisplay = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
//globally load
newsDetailsLoad(08);
loadCategories();
