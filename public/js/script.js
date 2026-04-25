const taxSwitch = document.querySelector("#taxSwitch");
const prices = document.querySelectorAll(".price");

taxSwitch.addEventListener("change", () => {

    prices.forEach(price => {

        let basePrice = Number(price.dataset.price);

        if(taxSwitch.checked){
            let total = basePrice + (basePrice * 0.18);
            price.innerHTML = `₹${total.toLocaleString("en-IN")}`;
        } else {
            price.innerHTML = `₹${basePrice.toLocaleString("en-IN")}`;
        }

    });

});