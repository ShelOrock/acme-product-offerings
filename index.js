// const fetchStuff = url => {
//     return window.fetch(url)
//     .then(data => data.json())
//     // .then(data => console.log(data))
// };

const app = document.querySelector('#app')

const products = fetch('https://acme-users-api-rev.herokuapp.com/api/products').then(data => data.json())

const offerings = fetch('https://acme-users-api-rev.herokuapp.com/api/offerings').then(data => data.json())

const companies = fetch('https://acme-users-api-rev.herokuapp.com/api/companies').then(data => data.json())

const fetchEverything = Promise.all([products, offerings, companies])
.then(responses => {
    const [products, offerings, companies] = responses;
    
    products.forEach(product => {
        const newCard = document.createElement('div');
        const header = document.createElement('h1');
        const description = document.createElement('p');
        const price = document.createElement('p');
        const list = document.createElement('ul');

        header.innerHTML = product.name;
        description.innerHTML = product.description;
        price.innerHTML = product.suggestedPrice;

        let id = product.id;
        let offeringsArr = [
            companies: [],
        ];
        offerings.forEach(offering => {
            if (offering.productId === id) {
                offeringsArr.push({companies})
            }
        })

        app.appendChild(newCard);
    })

})

// const getOfferings = (products, offerings, companies) => {
//     offerings.forEach(offering => {

//     })
// }

// console.log(fetchEverything);