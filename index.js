//Helper function to fetch data and convert data to JSON
const fetchData = url => {
    return window.fetch(url)
    .then(data => data.json())
};

//Call fetchData on separate APIs and store in variables
const products = fetchData('https://acme-users-api-rev.herokuapp.com/api/products');
const offerings = fetchData('https://acme-users-api-rev.herokuapp.com/api/offerings');
const companies = fetchData('https://acme-users-api-rev.herokuapp.com/api/companies');

//Calls promise.all on promises
Promise.all([products, offerings, companies])
.then(responses => {

//Stores each response in a variable
    const [products, offerings, companies] = responses;

//Grabs the app id
    const app = document.querySelector('#app')
  
//Calls combinedData function with responses and stores value
    const combinedData = combineData(products, offerings, companies);

//Calls render function with app container and value returned from combineData function
    render(app, combinedData);

})
.catch(e => console.error(e));

//combineData function
const combineData = (products, offerings, companies) => {

//maps over products
    return products.map(product => {

//returns only object with necessary values
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            suggestedPrice: product.suggestedPrice,
            offers: offerings

//filters offering data based product ID in product data
                .filter(offer => {
                    return offer.productId === product.id
                })

//maps over filtered offer to get an array of nested object that contains only necessary values
                .map(offer => {
                    return {

//finds company name in company data based on company ID in offer data.
                    companyName: companies.find(company => company.id === offer.companyId).name,

//sets price from the same filtered and mapped index
                    price: offer.price,
                    }
                })
        };
    });
};

//render function
const render = (container, data) => {

//maps over array of objects in data and stores in variable
    const html = data.map(product => {

//returns template literal accessing data from each object of array. list item tags map over array of nested objects accessing data from each obbject of array. price is set to two decimal places.
        return `
        <div>
            <h2>${product.name.toUpperCase()}</h2>
            <p>${product.description}</p>
            <p class='price'>$${product.suggestedPrice.toFixed(2)}</p>
            <ul>
                ${product.offers.map(offer => `<li>Offered by: ${offer.companyName} $${offer.price.toFixed(2)}</li>`).join('')}
            </ul>
        </div>
        `
    }).join('');

//app container is set to the huge ass string of joined mapped values of template literals
    container.innerHTML = html;
}