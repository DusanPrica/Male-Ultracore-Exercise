document.addEventListener('DOMContentLoaded', function() {
  
    const productImage1 = document.getElementById('productImage1');
    const productImage2 = document.getElementById('productImage2');
    const productImage3 = document.getElementById('productImage3');

    // Reference na modal elemente (OBAVEZNO DOBIJANJE REFERENCI NAKON ŠTO SE HTML UČITA)
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close-button');
    const captionText = document.getElementById('caption');


    const imageConfigurations = {
        'productImage1': {
            element: productImage1,
            originalSrc: './images/label1.jpg',
            altSrc: './images/label11.jpg', // Slika za hover
            isActive: false // Prati stanje hovera
        },
        'productImage2': {
            element: productImage2,
            originalSrc: './images/label2.jpg',
            altSrc: './images/label22.jpg', // Slika za hover
            isActive: false
        },
        'productImage3': {
            element: productImage3,
            originalSrc: './images/label3.jpg',
            altSrc: './images/label33.jpg', // Slika za hover
            isActive: false
        }
    };

    let currentlyExpandedImageId = null; // Prati koja je slika trenutno "proširena" (ako se primenjuje)

    // Ova funkcija je bila problematična u prethodnom kodu, ali nije direktno vezana za modal
    function resetAllImages(excludeImageId = null) {
        for (const id in imageConfigurations) {
            const config = imageConfigurations[id];
            if (config.element && id !== excludeImageId && config.isActive) {
                config.element.src = config.originalSrc;
                config.isActive = false;
            }
        }
    }

    // Prolazak kroz konfiguracije slika i dodavanje event listenera
    for (const id in imageConfigurations) {
        const config = imageConfigurations[id];

        if (config.element) {
            // Hover efekat za slike (originalni kod)
            config.element.addEventListener('mouseenter', function() {
                if (!config.isActive) {
                    config.element.src = config.altSrc;
                    config.isActive = true;
                }
            });

            config.element.addEventListener('mouseleave', function() {
                // Proveri da li je slika proširena klikom (ako postoji takva funkcionalnost, inače izbriši currentlyExpandedImageId)
                if (currentlyExpandedImageId === null || currentlyExpandedImageId !== id) {
                    config.element.src = config.originalSrc;
                    config.isActive = false;
                }
            });

            // KLJUČNI DEO: Klik na dugme "VIEW LABEL"
            const labelButton = config.element.nextElementSibling; // Uzima sledeći element, što je dugme
            if (labelButton && labelButton.classList.contains('label-button')) {
                labelButton.addEventListener('click', function(event) {
                    event.preventDefault(); // OVO JE KRITIČNO! Sprečava podrazumevano ponašanje (npr. otvaranje linka ako je dugme unutar <a>)

                    // Postavi sliku i otvori modal
                    modalImage.src = config.originalSrc; // Postavlja src attribute modalu
                    captionText.innerHTML = config.element.alt; // Postavlja alt tekst slike kao opis modala
                    imageModal.style.display = "block"; // Prikazuje modal
                });
            }
        }
    }

    // Logika za zatvaranje modala kada se klikne na X dugme
    if (closeButton) { // Proveri da li closeButton postoji
        closeButton.addEventListener('click', function() {
            imageModal.style.display = "none"; // Sakrij modal
        });
    }

    // Logika za zatvaranje modala kada se klikne van slike (na tamnu pozadinu)
    if (imageModal) { // Proveri da li imageModal postoji
        window.addEventListener('click', function(event) {
            if (event.target === imageModal) { // Ako je kliknuto direktno na modal (pozadinu)
                imageModal.style.display = "none"; // Sakrij modal
            }
        });
    }


    // --- TVOJ POSTOJEĆI KOD ZA VALIDACIJU FORME (nije menjan) ---
    const continueButton = document.getElementById('continueButton');
    const dataForm = document.getElementById('dataForm');
    const validationMessageContainer = document.getElementById('validationMessageContainer');

    if (continueButton && dataForm && validationMessageContainer) {
        continueButton.addEventListener('click', function(event) {
            event.preventDefault(); // Sprečava podrazumevano slanje forme

            let formIsValid = true;
            validationMessageContainer.style.display = 'none'; // Sakrij poruku na početku validacije
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(span => {
                span.textContent = ''; // Obriši prethodne poruke o greškama
            });

            const inputs = dataForm.querySelectorAll('input[required], select[required]');

            inputs.forEach(input => {
                const errorMessageSpan = input.nextElementSibling; // Uzmi span za poruku o grešci

                if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        if (errorMessageSpan) {
                            errorMessageSpan.textContent = 'Please enter a valid email address.';
                        }
                        formIsValid = false;
                    }
                } else if (input.tagName === 'SELECT') {
                    if (input.value === "" || input.value === "none") { // Proverava da li je odabrana podrazumevana opcija
                        if (errorMessageSpan) {
                            errorMessageSpan.textContent = 'Please select an option.';
                        }
                        formIsValid = false;
                    }
                } else if (input.value.trim() === '') {
                    if (errorMessageSpan) {
                        let message = '';
                        switch (input.id) {
                            case 'first-name':
                                message = 'Please enter your first name.';
                                break;
                            case 'last-name':
                                message = 'Please enter your last name.';
                                break;
                            case 'email':
                                message = 'Please enter your email.';
                                break;
                            case 'phone':
                                message = 'Please enter your phone number.';
                                break;
                            case 'address':
                                message = 'Please enter your address.';
                                break;
                            case 'city':
                                message = 'Please enter your city.';
                                break;
                            case 'country':
                                message = 'Please enter your country.';
                                break;
                            case 'state-province':
                                message = 'Please enter your province.';
                                break;
                            case 'zip-code':
                                message = 'Please enter your zip code.';
                                break;
                            default:
                                message = 'This field is required.';
                        }
                        errorMessageSpan.textContent = message; // Prikaži specifičnu poruku
                    }
                    formIsValid = false; // Forma nije validna
                }
            });

            console.log("Validation finished. formIsValid:", formIsValid);

            // Akcija nakon validacije
            if (!formIsValid) {
                validationMessageContainer.style.display = 'block';
            } else {
                alert('The form has been successfully filled. Move on to the next step.');
                // dataForm.submit(); // Odkomentarisi ako zelis da se forma zaista posalje
            }
        });
    } else {
        console.error("Dugme 'continueButton', forma 'dataForm' ili kontejner za validaciju nisu pronađeni. Proverite HTML ID-je i klase.");
    }
});