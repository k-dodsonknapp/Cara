const searchBox = document.getElementsById('search-box')
const searchButton = document.getElementsByClassName('search-bar-submit-button')
console.log(searchBox)
searchBox.addEventListener('keyUp', async(e) => {
  let target = e.target.value
  searchButton.action = `/search/${target}`
})
