const loadCategories =()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
}
const displayCategories =(categories)=>{
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML =
        `
        <li>${category.category_name}</li>
        `;
        categoryContainer.appendChild(li);
    });   
}
loadCategories();