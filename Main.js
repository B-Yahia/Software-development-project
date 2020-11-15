// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAUdwPIH-YVD5IQilq6nYQkRT3z-R1Ji68",
  authDomain: "finalproject-ca2f6.firebaseapp.com",
  databaseURL: "https://finalproject-ca2f6.firebaseio.com",
  projectId: "finalproject-ca2f6",
  storageBucket: "finalproject-ca2f6.appspot.com",
  messagingSenderId: "862539598761",
  appId: "1:862539598761:web:4f888f9b7072c6fe1f12b8",
  measurementId: "G-9HPWL1R83Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  let ref = firebase.database().ref("productType");

  function writeOrder(){
      finalOrder
  }

  //on() method to get the categories fro the firebase
  /*
  ref.on('value', gotData, errData)

  function gotData (data){
    data = data.val();
    let menuCat = Object.keys(data)
    console.log(menuCat)
    console.log(data[menuCat[1]].HP.Price)
    document.getElementById('cat-1').innerHTML = menuCat[0]
    document.getElementById('cat-2').innerHTML = menuCat[1]
    document.getElementById('cat-3').innerHTML = menuCat[2]
    
  }

  function errData (error){
    console.log(error.message , error.code)
  }*/

  // open the cart window
  const cartIcon = document.querySelector('.iconCart')
  const cartBox = document.querySelector('.cartBox')
  const iconClose = document.querySelector('.fa-close')
  cartIcon.addEventListener("click",function(){
      cartBox.classList.add('active')
  })
  iconClose.addEventListener("click",function(){
      cartBox.classList.remove('active')
  })

  const addToCart = document.getElementsByClassName('addToCart');

  let products = [
    {
        category:'Phones',
        name:'Samsung',
        price: 100,
        no: 0
    },
    {
        category:'Phones',
        name:'HTC',
        price: 150,
        no: 0
    },
    {
        category:'Phones',
        name:'Iphone',
        price: 200,
        no: 0
    },
    {
        category:'Laptops',
        name:'HP',
        price: 450,
        no: 0
    },
    {
        category:'Laptops',
        name:'Lenovo',
        price: 350,
        no: 0
    },
    {
        category:'Laptops',
        name:'Dell',
        price: 400,
        no: 0
    },
    {
      category:'Headphones',
      name:'Sony',
      price: 100,
      no: 0
    },
    {
      category:'Headphones',
      name:'JBL',
      price: 80,
      no: 0
    },
    {
      category:'Headphones',
      name:'Philips',
      price: 110,
      no: 0
    },


    
]




for(let i=0 ; i<addToCart.length ; i++){
    addToCart[i].addEventListener('click', () =>{
        cartNumbers(products[i])
        totalCost(products[i]);
    })
}
// to keep displaying the right number of product in the cart even after refreching the page.
function loadCartNumber() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.iconCart p').textContent = productNumbers
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    
    if(productNumbers){
        localStorage.setItem('cartNumbers' , productNumbers + 1);
        document.querySelector('.iconCart p').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers' , 1);
        document.querySelector('.iconCart p').textContent = 1;
    }

    addItemsToCart(product);
}

function addItemsToCart(product){
    let cartItems = localStorage.getItem("productsInCart");
    
    cartItems = JSON.parse(cartItems);
    
    if( cartItems !== null){
        if(cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]:product
            }
        }
        cartItems[product.name].no += 1;
    }else{
        product.no = 1 ;
        cartItems = {
            [product.name]: product
        }
    }
    
    localStorage.setItem("productsInCart",JSON.stringify(cartItems))
    displayCart();
    
    
}

function totalCost(product){
    let totalAmount = localStorage.getItem("totalprice");
    totalAmount = parseInt(totalAmount);

    if(totalAmount){
        localStorage.setItem("totalprice", product.price + totalAmount);
    }else{
        localStorage.setItem("totalprice", product.price)
    }
    
}
function displayCart(){
    
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    let prodContainer = document.querySelector('.products')
    let totalAmount = localStorage.getItem("totalprice");
    if(cartItems && prodContainer){
        prodContainer.innerHTML="";
        Object.values(cartItems).map( item => {
            prodContainer.innerHTML +=`
            <tr>
                <td>
                <div class="d-flex">
                    <span class="remove" onclick="removeFromCart('${item}')">Remove</span>
                    <h5> ${item.name}</h5>
                    </div>
                </td>
                <td>
                    <h5> ${item.price}</h5>
                </td>
                <td>
                <div class="d-flex">
                    <span class="dec-q" onclick="decreaseQ(${item.name})"><</span>
                    <h5> ${item.no}</h5>
                    <span class="inc-q" onclick="increatQ(${item.name})">></span>
                    </div>
                </td>
                <td>
                    ${item.price * item.no}
                </td>
            </tr>
            `;
        });
        prodContainer.innerHTML +=`
            <tr>
                <td></td>
                <td></td>
                <td>The cart total :</td>
                <td>
                ${totalAmount}
                </td>
            </tr>
            `;
            prodContainer.innerHTML +=`
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                <button type="button" class="btn btn-warning" onclick="sendOrder()">Order now</button>
                </td>
            </tr>
            `;
    }
}
function removeFromCart (item){
    console.log('1')
}
function increatQ (item){
    let cartItems = localStorage.getItem("productsInCart");
    
    cartItems = JSON.parse(cartItems);
    cartItems[product.name].no += 1;
}
function decreaseQ (item){
    let cartItems = localStorage.getItem("productsInCart");
    
    cartItems = JSON.parse(cartItems);
    cartItems[product.name].no -= 1;
    
    
}
function sendOrder (){
    saveOrder()
    //localStorage.clear();
    //cartBox.classList.remove('active')
    
    
}

function saveOrder (){
    let finalOrder = localStorage.getItem("productsInCart");
    finalOrder = JSON.parse(finalOrder);
    console.log(finalOrder)
    console.log(typeof finalOrder)
    let refO = firebase.database().ref().child('orders');
    
    refO.set({order : finalOrder}, function(error) {
        if (error) {
          console.log(error);
          
        } else {
            
            console.log('saved SS');
        }
      });
      
      
    
}



displayCart()
loadCartNumber()
