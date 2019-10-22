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
    
    const allOfferings = getOfferings(products, offerings, companies);
    console.log(allOfferings);

    products.forEach(product => {
        const newCard = document.createElement('div');
        const header = document.createElement('h1');
        const description = document.createElement('p');
        const price = document.createElement('p');

        header.innerHTML = product.name;
        description.innerHTML = product.description;
        price.innerHTML = product.suggestedPrice;

        newCard.appendChild(header);
        newCard.appendChild(description);
        newCard.appendChild(price);

        allOfferings.forEach(product => {
            const list = document.createElement('ul');
            product.offers.forEach(offer => {
                let listItem = document.createElement('li')
                listItem.innerHTML = `Offered by: ${offer.companyName} $${offer.price}`
                list.appendChild(listItem);
            });
            newCard.appendChild(list);
        });


        


        // let id = product.id;
        // let offeringsArr = [
        //     companies: [],
        // ];
        // offerings.filter(offering => {

        // });
        // console.log(offerings);
        app.appendChild(newCard);
    });


})

const getOfferings = (products, offerings, companies) => {
    // let obj = {
    //     companies: [],
    //     prices: [],
    // };

    const mappedProducts = products.map(product => {
        let currObj = {
            product: product.id,
            offers: offerings.filter(offer => {
                return offer.productId === product.id
            }),
        }

        return currObj
        
        // if(!obj[product.id]) {
        //     obj[product.id] = product.id 

    });
    // console.log(mappedProducts);

    mappedProducts.forEach(product => {
        product.offers.forEach(offer => {
            offer.companyName = companies.find(company => company.id === offer.companyId).name;
        })
    })
    return mappedProducts
}

// console.log(fetchEverything);