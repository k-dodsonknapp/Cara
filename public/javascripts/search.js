const searchBar = document.querySelector('.search-bar');
const searchContainer = document.querySelector('.search-container');

searchBar.addEventListener('input', async (event) => {
  let targetVal = event.target.value.toLowerCase();
  searchContainer.action = `/search/${targetVal}`
})
