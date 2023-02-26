const loadPhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url);
  const data = await res.json()
  displyPhones(data.data, dataLimit)
}
const displyPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById('phones-container')
  phonesContainer.innerText = ''
  // Shaw all phone
  const showAll = document.getElementById('show-all')
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10)
    showAll.classList.remove('d-none')
  } else {
    showAll.classList.add('d-none')
  }


  // search no phone
  const searchNoPhone = document.getElementById('no-phone-massege')
  if (phones.length === 0) {
    searchNoPhone.classList.remove('d-none')
  } else {
    searchNoPhone.classList.add('d-none')
  }

  // display all phone
  phones.forEach(phone => {
    const phoneDiv = document.createElement('div')
    phoneDiv.classList.add('col');
    console.log(phone)
    phoneDiv.innerHTML = `
              <div class="card">
                <img src="${phone.image}" class="card-img-top p-5" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                  <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="p-2 btn btn-outline-danger" data-bs-toggle="modal"data-bs-target="#phoneDetailModal">Show Details</button>
                  
                </div>
              </div>
        `;
    phonesContainer.appendChild(phoneDiv)
  })
  // stop spinner
  toggleSpenner(false)
}

const processSearch = (dataLimit) => {
  toggleSpenner(true)
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value
  loadPhone(searchText, dataLimit)
}

document.getElementById('btn-search').addEventListener('click', function () {
  // spinner start
  processSearch(10)
  processSearch()

})
// Search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processSearch(10)
  }
});
const toggleSpenner = isLoading => {
  const loadSection = document.getElementById('loader')
  if (isLoading) {
    loadSection.classList.remove('d-none')
  } else {
    loadSection.classList.add('d-none')
  }
}
// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch()
})

const loadPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}

  `
  const res = await fetch(url)
  const data1 = await res.json()
  displayPhoneDetail(data1.data)
}
const displayPhoneDetail = phone => {
  console.log(phone)
  const modalTitle = document.getElementById('phoneDetailModalLabel')
  modalTitle.innerText = phone.name
  const phoneDetails = document.getElementById('phone-details')
  phoneDetails.innerHTML = `
  <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No phone found'}</p>
  <img src="${phone.image}">
  <p>Display: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'no display size found'}</p>
  <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no display size found'}</p>
  <p>Chip Set: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'no display size found'}</p>
  <p>WLAN: ${phone.others ? phone.others.WLAN : 'no display size found'}</p>
  <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'no display size found'}</p>
  <p>GPS: ${phone.others ? phone.others.GPS : 'no display size found'}</p>
  `
}
// displayPhoneDetail()

loadPhone('oppo')