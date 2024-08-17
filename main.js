const currencyToCountry = {
  USD: "united-states-of-america",
  EUR: "europe",
  GBP: "united-kingdom",
  AUD: "australia",
  CHF: "switzerland",
  CAD: "canada",
  JPY: "japan",
  EGP: "egypt",
  KRW: "south-korea",
  DZD: "algeria",
  PAB: "panama",
  BHD: "bahrain",
  MAD: "morocco",
  ZAR: "south-africa",
  IQD: "iraq",
  BOB: "bolivia",
  HKD: "hongkong",
  THB: "thailand",
  TWD: "taiwan",
  UZS: "uzbekistan",
  KWD: "kuwait",
  ILS: "israel",
  PEN: "peru",
  TJS: "tajikistan",
  OMR: "oman",
  HUF: "hungary",
  UAH: "ukraine",
  CLP: "chile",
  SEK: "sweden",
  SGD: "singapore",
  CNY: "china",
  ISK: "iceland",
  AZN: "azerbaijan",
  HTG: "haiti",
  DOP: "dominican-republic",
  LBP: "lebanon",
  MYR: "malaysia",
  IRR: "iran",
  UYU: "uruguay",
  ANG: "netherlands-antilles",
  PHP: "philippines",
  XOF: "west-africa",
  LYD: "libya",
  JOD: "jordan",
  TRY: "turkey",
  NGN: "nigeria",
  RSD: "serbia",
  NZD: "new-zealand",
  CZK: "czech-republic",
  BYN: "belarus",
  ARS: "argentina",
  NOK: "norway",
  QAR: "qatar",
  BDT: "bangladesh",
  RON: "romania",
  MDL: "moldova",
  CRC: "costa-rica",
  VES: "venezuela",
  IDR: "indonesia",
  MXN: "mexico",
  AMD: "armenia",
  PYG: "paraguay",
  AED: "united-arab-emirates",
  NPR: "nepal",
  XAF: "central-african-republic",
  KGS: "kyrgyzstan",
  BRL: "brazil",
  INR: "india",
  TND: "tunisia",
  VND: "vietnam",
  TMT: "turkmenistan",
  DKK: "denmark",
  LKR: "sri-lanka",
  BGN: "bulgaria",
  RUB: "russia",
  GEL: "georgia",
  PKR: "pakistan",
  PLN: "poland",
  KZT: "kazakhstan",
  COP: "colombia",
  SAR: "saudi-arabia",
};


const exchangeRates = { usd: 1 };
const inputAmount = document.querySelector(
  ".converter-container .input-amount"
);
const result = document.querySelector(".converter-container .result");
const swapBtn = document.querySelector(".converter-container .swap-btn");

const currentValues = {
  fromCurrency: "USD - U.S. Dollar",
  fromFlag: "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png",
  fromCode: "USD",
  toCurrency: "EUR - Euro",
  toFlag: "https://cdn.countryflags.com/thumbs/europe/flag-square-250.png",
  toCode: "EUR",
};

const convert = () => {
  const inputValue = parseFloat(inputAmount.value);
  const fromCurrencyValue = document
    .querySelector("#from .currency-input")
    .dataset.selectedCurrencyCode.toLowerCase();
  const toCurrencyValue = document
    .querySelector("#to .currency-input")
    .dataset.selectedCurrencyCode.toLowerCase();

  const convertedValue =
    (inputValue * exchangeRates[toCurrencyValue]) /
    exchangeRates[fromCurrencyValue];

  const resultValue = `<span class='result-currency'>${toCurrencyValue}</span> ${convertedValue.toFixed(
    2
  )}`;

  result.innerHTML = isNaN(convertedValue) ? "Invalid Input" : resultValue;
};

swapBtn.addEventListener("click", () => {
  const tempFromCurrency = currentValues.fromCurrency;
  const tempFromFlag = currentValues.fromFlag;
  const tempFromCode = currentValues.fromCode;

  currentValues.fromCurrency = currentValues.toCurrency;
  currentValues.fromFlag = currentValues.toFlag;
  currentValues.fromCode = currentValues.toCode;

  currentValues.toCurrency = tempFromCurrency;
  currentValues.toFlag = tempFromFlag;
  currentValues.toCode = tempFromCode;

  updateValues();

  convert();
});

const createFlagImage = (currencyCode) => {
  const countryCode = currencyToCountry[currencyCode];
  const img = document.createElement("img");

  if (countryCode === "" || !countryCode) {
    img.src = "images/flag-placeholder.png"; // صورة بديلة في حال عدم وجود رمز للدولة
  } else {
    img.src = `https://cdn.countryflags.com/thumbs/${countryCode.toLowerCase()}/flag-square-250.png`;
  }

  img.classList.add("flag-icon");
  return img;
};


const setInputValues = (currency, flag, code, id) => {
  const dropdown = document.querySelector(`#${id}`);
  const currencyInput = dropdown.querySelector(".currency-input");
  const inputFlag = dropdown.querySelector(".input-flag");

  currencyInput.value = currency;
  inputFlag.src = flag;
  inputFlag.style.display = "block";
  currencyInput.style.paddingLeft = "48px";
  currencyInput.dataset.selectedCurrencyCode = code;
};

const updateValues = () => {
  setInputValues(
    currentValues.fromCurrency,
    currentValues.fromFlag,
    currentValues.fromCode,
    "from"
  );

  setInputValues(
    currentValues.toCurrency,
    currentValues.toFlag,
    currentValues.toCode,
    "to"
  );
};

const createOption = (code, name, id) => {
  if (!id) return;

  const dropdown = document.querySelector(`#${id}`);
  const option = document.createElement("div");
  option.classList.add("option");

  const flagImage = createFlagImage(code);

  const flagDiv = document.createElement("div");
  flagDiv.classList.add("flag");
  flagDiv.appendChild(flagImage);

  const currencyText = `${code} - ${name}`;
  const currencyDiv = document.createElement("div");
  currencyDiv.textContent = currencyText;

  option.appendChild(flagDiv);
  option.appendChild(currencyDiv);

  option.addEventListener("click", () => {
    options.classList.remove("active");
    setInputValues(currencyText, flagImage.src, code, id);

    if (id === "from") {
      currentValues.fromCurrency = currencyText;
      currentValues.fromFlag = flagImage.src;
      currentValues.fromCode = code;
    } else if (id === "to") {
      currentValues.toCurrency = currencyText;
      currentValues.toFlag = flagImage.src;
      currentValues.toCode = code;
    }

    convert();
  });

  const options = dropdown.querySelector(".options");
  options.appendChild(option);
};

const addEventListeners = (id) => {
  const dropdown = document.querySelector(`#${id}`);
  const currencyInput = dropdown.querySelector(".currency-input");
  const inputFlag = dropdown.querySelector(".input-flag");
  const options = dropdown.querySelector(".options");
  const allOptions = dropdown.querySelectorAll(".option");

  currencyInput.addEventListener("input", () => {
    filterOptions(id, allOptions);
  });

  currencyInput.addEventListener("click", () => {
    if (id === "from") {
      const toDropdownOptions = document.querySelector("#to .options");
      toDropdownOptions.classList.remove("active");

      setInputValues(
        currentValues.toCurrency,
        currentValues.toFlag,
        currentValues.toCode,
        "to"
      );
    } else if (id === "to") {
      const fromDropdownOptions = document.querySelector("#from .options");
      fromDropdownOptions.classList.remove("active");

      setInputValues(
        currentValues.fromCurrency,
        currentValues.fromFlag,
        currentValues.fromCode,
        "from"
      );
    }

    inputFlag.style.display = "none";
    currencyInput.value = "";
    currencyInput.style.paddingLeft = "16px";
    options.classList.add("active");

    if (allOptions) {
      filterOptions(id, allOptions);
    }
  });
};

const init = async () => {
  try {
    const res = await fetch("https://www.floatrates.com/daily/usd.json");
    const data = await res.json();

    if (res.ok) {
      console.log(data);
      createOption("USD", "U.S. Dollar", "from");
      createOption("USD", "U.S. Dollar", "to");

      for (const currencyCode in data) {
        const currencyInfo = data[currencyCode];
        const { code, name } = currencyInfo;
        createOption(code, name, "from");
        createOption(code, name, "to");

        exchangeRates[currencyCode] = currencyInfo.rate;
      }

      updateValues();

      addEventListeners("from");
      addEventListeners("to");

      convert();
    }
  } catch (error) {
    console.log(error);
  }
};

init();

const filterOptions = (id, allOptions) => {
  const dropdown = document.querySelector(`#${id}`);
  const currencyInput = dropdown.querySelector(".currency-input");
  const searchTerm = currencyInput.value.toLowerCase();

  allOptions.forEach((option) => {
    const currencyText = option.textContent.toLowerCase();

    if (currencyText.includes(searchTerm)) {
      option.style.display = "flex";
    } else {
      option.style.display = "none";
    }
  });
};

document.addEventListener("click", (e) => {
  const from = document.querySelector("#from");
  const to = document.querySelector("#to");
  const fromOptions = document.querySelector("#from .options");
  const toOptions = document.querySelector("#to .options");

  if (
    e.target !== from &&
    e.target !== to &&
    !from.contains(e.target) &&
    !to.contains(e.target) &&
    !toOptions.contains(e.target) &&
    !fromOptions.contains(e.target)
  ) {
    toOptions.classList.remove("active");
    fromOptions.classList.remove("active");

    updateValues();
  }
});

inputAmount.addEventListener("input", convert);
