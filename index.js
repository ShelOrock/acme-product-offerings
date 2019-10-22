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

    const app = document.querySelector('#app')
    
    const combinedData = combineData(products, offerings, companies);
    console.log(combineData);

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

        combinedData.forEach(product => {
            const list = document.createElement('ul');
            // product.offers.forEach(offer => {
            //     let listItem = document.createElement('li')
            //     listItem.innerHTML = `Offered by: ${offer.companyName} $${offer.price}`
            //     list.appendChild(listItem);
            // });
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

const combineData = (products, offerings, companies) => {
    // let obj = {
    //     companies: [],
    //     prices: [],
    // };

    const data = products.map(product => {

        let poo = 
        {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.suggestedPrice,
            offers: offerings
                .filter(offer => {
                    return offer.productId === product.id
                })
                .map(offer => {
                    return {
                        companyName: companies.find(company => company.id === offer.companyId).name,
                        price: offer.price,
                    }
                })
            }
                
console.log(poo);
return poo
            // companyName = product.off

        // if(!obj[product.id]) {
        //     obj[product.id] = product.id 

    });
    // console.log(mappedProducts);

    // data.forEach(product => {
    //     product.offers.forEach(offer => {
    //         offer.companyName = companies.find(company => company.id === offer.companyId).name;
    //     })
    // })
    return data
}

// console.log(fetchEverything);