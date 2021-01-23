import './../css/client.css'
import ExcursionsAPI from './ExcursionsAPI';
import OrdersAPI from './OrdersAPI';


const excursions = new ExcursionsAPI();
const orders = new OrdersAPI();

function setTotalPrice() {

            const totalPrice = document.querySelector('.order__total-price-value');
            let total = basket.reduce((acc, ex) => {
              return  acc + (ex.priceAdult * ex.numberOfAdults) + (ex.priceChild * ex.numberOfChildren);    
              },0);

      totalPrice.innerText = total + ' ' + 'EUR';
  }


 document.addEventListener('DOMContentLoaded', init);

    function init() {
        loadEx()
        addOrdersToBasket()
        removeFromBasket()
        validationForm()
    }
    const summaryPanel = document.querySelector('.panel__summary')
    const ulEl = document.querySelector('.panel__excurions');
    const toClone = ulEl.querySelector('.excurions__item--prototype').cloneNode(true);

    let basket = [];

    function loadEx() {

       excursions.loadData()
          .then(data => {
          insertOrders( data);
        })
          .catch(err => console.error(err))
    }
  
 
    function insertOrders(item) {

 
          ulEl.innerHTML = ''
          item.forEach ( item => {
      
          const prototypeItem = toClone.cloneNode(true);
          prototypeItem.dataset.id = item.id;
    
   
          prototypeItem.querySelector('h2').innerText = item.name;
          prototypeItem.querySelector('p').innerText  = item.description;
          prototypeItem.querySelector('.price__adults').innerHTML = item.priceAdult
          prototypeItem.querySelector('.price__children').innerHTML = item.priceChild
          ulEl.appendChild(prototypeItem)
        })

        addOrdersToBasket()
        removeFromBasket()
    }

  
    function addOrdersToBasket() {
  
      const buttonsAdd = document.querySelectorAll('.add')
      buttonsAdd.forEach(function(btn) {

      btn.addEventListener('click', function(e) {

        e.preventDefault();
        const protoPanel = summaryPanel.querySelector('.summary__item--prototype')
        const newItem = protoPanel.cloneNode(true);
        
        const currentEx = btn.parentElement.parentElement.parentElement;
        const id = currentEx.dataset.id;
        newItem.dataset.id = id;
        const h2 = currentEx.querySelector('.excursions__title').innerText;
        const priceAdults =  currentEx.querySelector('.price__adults').innerText;
        const priceChildren=  currentEx.querySelector('.price__children').innerText;


        const numberOfChildren = currentEx.querySelector('.input--children');
        const valueNumChild = numberOfChildren.value;

        const numberOfAdults = currentEx.querySelector('.input--adult');
        const valueNumAdult = numberOfAdults.value;

        numberOfAdults.value = '';
        numberOfChildren.value = '';

        if(valueNumAdult.length === 0 || valueNumChild === 0) {
          alert('please enter the number of children!')
        } else {
          const item = {
            id: id,
            name: h2,
            priceAdult: parseInt(priceAdults),
            priceChild: parseInt(priceChildren),
            numberOfAdults: Number(valueNumAdult),
            numberOfChildren: Number(valueNumChild)
      
          };
  
  
    
  
        function checkID(item, basket )  {
              for(let i=0; i < basket.length; i++) {
                if(item.id === basket[i].id){
              
                alert(' You can only add one excursion!!')
                return false;
              } 
            }
            return true;
          }
  
          if(checkID(item, basket)) {
              basket.push(item);
            
              const totalSum = Number(item.priceAdult * valueNumAdult) + Number(item.priceChild * valueNumChild)
              console.log(totalSum)
  
  
          
              setTotalPrice()
                
  
  
              newItem.querySelector('.summary__title').innerHTML =   ` ${h2} ${totalSum} EUR<a href="" class="summary__btn-remove" title="usuń">X</a>`
  
                const summation = newItem.querySelector('.summary__prices');
  
                summation.innerHTML = `dorośli: ${valueNumChild} x ${priceAdults} EUR , children: ${valueNumAdult} x ${priceChildren} EUR`
                summaryPanel.appendChild(newItem)
  
            }
        }
      
    

        })
    
      })


    }
    

    function removeFromBasket() {
      const summaryPanel = document.querySelector('.panel__summary');
      summaryPanel.addEventListener('click', e => {

        if (e.target.classList.contains('summary__btn-remove'))  {
          e.preventDefault()
          const id = e.target.parentElement.parentElement.dataset.id;

          basket = basket.filter(item => {
            return Number(item.id) !== Number(id)
          });

          const deleteItem = e.target.closest('li');
          deleteItem.remove();
          setTotalPrice();
        }
      })
 
    }

    
      function validationForm() {

        const form = document.querySelector('.panel__order');
        form.addEventListener('submit',  e => {
        e.preventDefault()

        if(basket.length > 0) {
          const name = document.querySelector('.order__name');
          const email = document.querySelector('.order__email');


        const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
        let formsErrors = [];

        if(name.value.length <= 3) {
          formsErrors.push("Enter your first and last name correctly")
        } else if(!reg.test(email.value)){
          formsErrors.push("Enter Email correctly!")
        } if(!formsErrors.length) {

            const item = {};
            item.name = name.value;
            item.email = email.value;
            item.excursions = basket;
        
          

          orders.saveOrder(item)
          .then(() => {
            alert(`Thank you, the order has been sent to:  ${email.value}`)
            name.value = '';
            email.value = '';
          
            const panel = document.querySelector('.panel__summary');
            panel.innerHTML = ''
            const sumPanel = document.querySelector('.order__total-price-value');
            sumPanel.innerHTML = '___'
           
          
          })
          .catch(err => {
            alert(`Something went wrong, please try again!!`)
          })
        
        }

    
        if (formsErrors.length > 0) {
        e.preventDefault();
        const ul = document.querySelector('.errorsList')
        ul.innerHTML = '';
        formsErrors.forEach(function (err) {

              const newLi = document.createElement('li');
              newLi.innerText = err;
              ul.appendChild(newLi);
              newLi.style.color = "red";

           
          })

        } 
        
        } else {
         
          alert('You need to add at least one trip to your order!')


        }
        
        
      })
    }