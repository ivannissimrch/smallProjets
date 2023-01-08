const data = [
  "afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burma",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic",
  "Congo, Republic of the",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Greenland",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Mongolia",
  "Morocco",
  "Monaco",
  "Mozambique",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Samoa",
  "San Marino",
  "Sao Tome",
  "Saudi Arabia",
  "Senegal",
  "Serbia and Montenegro",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const autoCompleteInputEle =
  document.getElementsByClassName("autocomplete-input")[0];
const autoCompleteItemsEle =
  document.getElementsByClassName("autocomplete-items")[0];
const autoCompleteListEle =
  document.getElementsByClassName("autocomplete-list")[0];

const autocomplete = (input, data) => {
  input.addEventListener("input", handleUserInput);
};

/** Todo */
const mainContainer = document.getElementsByTagName("BODY")[0];
const autoCompleteBtnEle = document.getElementsByClassName("summitBtn")[0];
autoCompleteBtnEle.addEventListener("click", (event) => {
  event.preventDefault();
  fetch(
    `https://pixabay.com/api/?key=29808044-1a00c2461ca1f039b88fd2124&q=${autoCompleteInputEle.value}&image_type=photo`
  )
    .then((response) => response.json())
    .then((data) => {
      const image = data.hits[0].webformatURL;
      mainContainer.style.backgroundImage = `url(${image})`;
      autoCompleteInputEle.focus();
    });
});
autoCompleteInputEle.focus();

const handleUserInput = (event) => {
  //remove elements that are not longer matches
  const lis = document.querySelectorAll("li");
  if (lis.length >= 1) {
    lis.forEach((element) => autoCompleteListEle.removeChild(element));
  }

  //get and display matches
  const results = data.filter((element, idx) => {
    if (element.toLowerCase().startsWith(event.target.value.toLowerCase())) {
      openAutocomplete();
      const li = document.createElement("LI");
      autoCompleteListEle.appendChild(li);
      li.innerHTML = element;

      li.addEventListener("mouseover", () => {
        li.classList.add("active");
        event.target.value = li.innerHTML;
      });
      li.addEventListener("mouseleave", () => {
        li.classList.remove("active");
        event.target.value = li.innerHTML;
      });

      li.addEventListener("click", () => {
        closeAutocomplete();
      });

      if (
        element.toLowerCase() === event.target.value ||
        event.target.value === ""
      ) {
        closeAutocomplete();
      }
      return element;
    }
  });
};

let counter = 0;
autoCompleteInputEle.addEventListener("keydown", (event) => {
  const lis = document.querySelectorAll("li");

  if (event.key === "ArrowDown") {
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    lis[counter].classList.add("active");
    autoCompleteInputEle.value = lis[counter].innerHTML;
    counter++;
    if (counter >= lis.length) {
      counter = 0;
    }
  }
  if (event.key === "ArrowUp") {
    if (counter - 1 <= 0) {
      counter = lis.length + 1;
    }
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    lis[counter - 2].classList.add("active");
    autoCompleteInputEle.value = lis[counter - 2].innerHTML;
    counter--;
  }
  if (event.key === "Enter") {
    closeAutocomplete();
    event.preventDefault();
    autoCompleteBtnEle.focus();

    counter = 0;
  }
});

const closeAutocomplete = () => {
  const lis = document.querySelectorAll("li");
  lis.forEach((element) => autoCompleteListEle.removeChild(element));
  autoCompleteItemsEle.style.display = "none";
};

const openAutocomplete = () => {
  autoCompleteItemsEle.style.display = "block";
};

autocomplete(autoCompleteInputEle, data);
