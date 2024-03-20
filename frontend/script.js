const goodsname = document.querySelector('#goodsname')
const description = document.querySelector('#desc')
const price = document.querySelector('#price')
const quantity = document.querySelector('#quant')
const fetchBtn = document.querySelector('#fetchBtn')

const shopForm = document.querySelector('#shop_form')

const baseurl = 'http://localhost:5000'

shopForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const obj = {
        goodsName: goodsname.value,
        description: description.value,
        price: price.value,
        quantity: quantity.value
    }
    try {
        const response = await axios.post(`${baseurl}/api/create`, obj)
        if (response.data.message) {
            alert(response.data.message)
            fetchAllItems()
        }
    }
    catch (error) {
        console.log(error)
    }
})


fetchBtn.addEventListener('click', fetchAllItems)

async function fetchAllItems() {
    try {
        const response = await axios.get(`${baseurl}/api/getdata`)
        console.log(response)
        if(response.data.allItems.length > 0){
            displayOnScreen(response.data.allItems)
        }
        else{
            return alert('no data to show')
        }
    }
     catch (error) {
        console.log(error)
    }
}

function displayOnScreen(allItems){
    allItems.forEach(element => {
        let html = `<li> id: ${element.id}, ${element.goodsName} ${element.price} ,quantity: ${element.quantity}  <button onclick="purchase('${element.id}')">purchase</button></li>`;

        document.getElementById('list').insertAdjacentHTML('beforeend',html)
    });
}

function purchase(id){
    prompt
}

