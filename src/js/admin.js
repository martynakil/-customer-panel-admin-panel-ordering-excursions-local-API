import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';


const excursions = new ExcursionsAPI();



const ulEl = document.querySelector('.panel__excurions');
const toClone = ulEl.querySelector('.excurions__item--prototype').cloneNode(true);

 document.addEventListener('DOMContentLoaded', init);



    function init() {
   
    loadExcursions()
    addExcursions()
    removeExcursions()
 
    }

    function loadExcursions() {

      excursions.loadData()
        .then(data => {
        insertExcursions( data );
      })
        .catch(err => console.error(err))
    }



    function insertExcursions(data) {
      const ulEl = document.querySelector('.panel__excurions');
      ulEl.innerHTML = ''
      data.forEach ( item => {

    
    
        const prototypeItem = toClone.cloneNode(true);
     

       prototypeItem.dataset.id = item.id;

    
        prototypeItem.querySelector('h2').innerText = item.name;
        prototypeItem.querySelector('p').innerText  = item.description;
        prototypeItem.querySelector('.excursions__field-name--adults').innerHTML = `Adults <strong class="price__adults">${item.priceAdult}  </strong> EUR`
        prototypeItem.querySelector('.excursions__field-name--children').innerHTML = `Children: <strong class="price__children">${item.priceChild}  </strong> EUR`
        ulEl.appendChild(prototypeItem)

      })

      removeExcursions()
      updateExcursions()

    }

    function addExcursions() {
      const form = document.querySelector('.form');

      form.addEventListener('submit', e => {
          console.log('add')
        
      e.preventDefault()

      const name = document.querySelector('.form__field--name');      
      const description = document.querySelector('.form__field--longtext');
      const numAdults = document.querySelector('.form__field--adults');
      const numChildren = document.querySelector('.order__form__field--children');
     
      const fieldName = name.value;
      const fieldDesciptions = description.value;
      const numberOfAdults = numAdults.value;
      const numberOfChildren = numChildren.value;
    


      if(name.value.length === 0 || description.value.length === 0 || numAdults.value.length === 0 || numChildren.value.length === 0) {
        alert('please fill in all fields!')
      } else {


          const data = {
            name: fieldName,
            description: fieldDesciptions,
            priceAdult: numberOfAdults,
            priceChild: numberOfChildren,
            
        }
          excursions.addData(data)
          .catch(err => console.error(err))
          .finally( loadExcursions )

          name.value = '';
          description.value = '';
          numAdults.value = '';
          numChildren.value = '';


        }


      })
  
    
     
 }


 function removeExcursions() {

    const removeButton = document.querySelectorAll('.excursions__field-input--remove')
    removeButton.forEach(function(button) {
    button.addEventListener('click', function(e) {
    e.preventDefault()
      const targetEl = e.target;
      if (targetEl.value === "delete") {
          const parentEl = targetEl.parentElement.parentElement.parentElement;
          console.log(parentEl)
          const id = parentEl.dataset.id;
          console.log(id)
          
        excursions.removeData(id)
          .catch(err => console.error(err))
          .finally ( loadExcursions )
      }
    })
  })
 }

 function updateExcursions() {
   const updateButton = document.querySelectorAll('.excursions__field-input--update');
 
   updateButton.forEach(function(btn) {
   
     btn.addEventListener('click', function(e) { 
  

      e.preventDefault()

        const liElement = btn.parentElement.parentElement.parentElement;
        const id = liElement.dataset.id;

        const targetEl = e.target;
        const headerElement = liElement.querySelector('h2')
        const pElement = liElement.querySelector('p')
        const priceAdult = liElement.querySelector('.price__adults');
        const priceChild = liElement.querySelector('.price__children');
  




        if(targetEl.value === "edit") {
      
    
            headerElement.setAttribute('contentEditable', true);
            pElement.setAttribute('contentEditable', true);
            priceAdult.setAttribute('contentEditable', true);
            priceChild.setAttribute('contentEditable', true);

            btn.value = 'save';
          

        } else {

            const data = {
                name: headerElement.innerText,
                description: pElement.innerText,
                priceAdult: priceAdult.innerText,
                priceChild: priceChild.innerText
              }


            btn.value = 'edit';
            headerElement.setAttribute('contentEditable', false);
            pElement.setAttribute('contentEditable',false);
            priceAdult.setAttribute('contentEditable',false);
            priceChild.setAttribute('contentEditable', false);
           

            excursions.updateData(id, data)
              .catch(err => console.error(err))
              .finally ( addExcursions)
        }
         


        
      })
  

   })
  }
    



   
   