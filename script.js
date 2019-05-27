const products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Food", price: "$1.99", stocked: true, name: "Cherry"},
  {category: "Stationary", price: "$10.99", stocked: false, name: "Mechenical Pencil"},
  {category: "Food", price: "$3.99", stocked: false, name: "Milk"},
  {category: "Stationary", price: "$4.99", stocked: true, name: "Eraser Set"},
  {category: "Stationary", price: "$1.99", stocked: true, name: "Glue"},
  {category: "Food", price: "$0.99", stocked: true, name: "Banana"}
];

const filter = {
  searchBoxValue: '',
}
let filterProducts;

const searchBox = document.querySelector('#searchBox');
const checkbox = document.querySelector('#checkbox');
const tbody = document.querySelector('#tbody');

function init() {
  // Clear tbody
  tbody.innerHTML = '';

  // Check whether or not in-stock only
  if(!checkbox.checked) { // all products
    filterProducts = products.filter(product => product.name.toLowerCase().includes(filter.searchBoxValue.toLowerCase()));
  } else { // in-stock only
    filterProducts = products.filter(product => product.name.toLowerCase().includes(filter.searchBoxValue.toLowerCase()) && product.stocked === true);
  }

  // Make categorized array
  let categories = filterProducts.map(product => product.category);
  let categorizedArray =[];
  filterProducts.forEach((product, i) => {
    let categoryId =categories.indexOf(product.category);
    categorizedArray[i] = [];
    // Add category tr if it's first occurance
    if(categories.indexOf(product.category) === i) {
      let categoryHeader = document.createElement('tr'); 
      categoryHeader.innerHTML = `<th colspan="2">${product.category}</th>`;
      categorizedArray[categoryId].push(categoryHeader);
    } 
    // Add product tr
    let tableRow = document.createElement('tr');
    let tdName = tableRow.insertCell(0);
    let tdPrice = tableRow.insertCell(1);
    tdName.innerHTML = product.name;
    tdPrice.innerHTML = product.price;
    // // Mark out-of-stock products
    if(!product.stocked) {
      tdName.setAttribute('style', 'color:red');
      tdPrice.setAttribute('style', 'color:red');
    }
    categorizedArray[categoryId].push(tableRow);
  });

  // Render all tr
  let rows = [];
  categorizedArray.forEach(arr => {
    rows = rows.concat(arr); // Collect only tr elements into rows
  });
  rows.forEach(row => {
    tbody.appendChild(row); // Render rows
  })
}

// Initialize display
init();

// Handle searchBox change
searchBox.addEventListener('keyup', (e) => {
  filter.searchBoxValue = e.target.value;
  init();
});

// Handle checkBox change
checkbox.addEventListener('change', () => {
  init();
});