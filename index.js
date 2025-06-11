document.addEventListener('DOMContentLoaded', function() {
  
    const productImage1 = document.getElementById('productImage1');
    const productImage2 = document.getElementById('productImage2');
    const productImage3 = document.getElementById('productImage3');

    const imageConfigurations = {
        'productImage1': {
            element: productImage1,
            originalSrc: './images/label1.jpg',
            altSrc: './images/label11.jpg',
            isActive: false
        },
        'productImage2': {
            element: productImage2,
            originalSrc: './images/label2.jpg',
            altSrc: './images/label22.jpg',
            isActive: false
        },
        'productImage3': {
            element: productImage3,
            originalSrc: './images/label3.jpg',
            altSrc: './images/label33.jpg',
            isActive: false
        }
    };

    let currentlyExpandedImageId = null;

    function resetAllImages(excludeImageId = null) {
        for (const id in imageConfigurations) {
            const config = imageConfigurations[id];
            if (config.element && id !== excludeImageId && config.isActive) {
                config.element.src = config.originalSrc;
                config.isActive = false;
            }
        }
    }

    for (const id in imageConfigurations) {
        const config = imageConfigurations[id];
        if (config.element) {
            config.element.addEventListener('click', function() {
                if (config.isActive) {
                    this.src = config.originalSrc;
                    config.isActive = false;
                    currentlyExpandedImageId = null;
                } else {
                    resetAllImages(id);
                    this.src = config.altSrc;
                    config.isActive = true;
                    currentlyExpandedImageId = id;
                }
            });
            
            config.element.style.cursor = 'pointer'; 
        }
    }

    const continueButton = document.getElementById('continueButton');
    const dataForm = document.querySelector('.data-form');
    const validationMessageContainer = document.getElementById('validationMessageContainer');

    console.log("Searching for continueButton:", continueButton);
    console.log("Searching for dataForm:", dataForm);
    console.log("Searching for validationMessageContainer:", validationMessageContainer);


    if (continueButton && dataForm && validationMessageContainer) {
        console.log("All required validation elements have been found. I'm adding an event listener."); 
        continueButton.addEventListener('click', function(event) {
            console.log("Button 'CONTINUE' is clicked!"); 
            event.preventDefault();

            let formIsValid = true;
            
            const requiredFormElements = dataForm.querySelectorAll('input[required], select[required]'); 
            
            console.log("Number of required elements found:", requiredFormElements.length); 
            
            requiredFormElements.forEach(element => {
                element.classList.remove('invalid-field');
                const label = dataForm.querySelector(`label[for="${element.id}"]`);
                if (label) {
                    label.classList.remove('invalid-label');
                }
               
                const errorMessageSpan = document.getElementById(`error-${element.id}`);
                if (errorMessageSpan) {
                    errorMessageSpan.textContent = '';
                }
            });
            validationMessageContainer.style.display = 'none';

            requiredFormElements.forEach(element => {
                let value = element.value.trim();
                console.log(`Checking field: ${element.id}, Value: '${value}'`); 
                
                if (value === '' || (element.tagName === 'SELECT' && (value === 'Select Country' || value === 'Select State / Province'))) {
                    console.log(`Field ${element.id} is empty! Setting it to invalid.`); 
                    element.classList.add('invalid-field');
                    const label = dataForm.querySelector(`label[for="${element.id}"]`);
                    if (label) {
                        label.classList.add('invalid-label');
                    }
                    
                    const errorMessageSpan = document.getElementById(`error-${element.id}`);
                    if (errorMessageSpan) {
                        let message = '';
                        switch (element.id) {
                            case 'first-name':
                                message = 'Please enter your first name.';
                                break;
                            case 'last-name':
                                message = 'Please enter your last name.';
                                break;
                            case 'email':
                                message = 'Please enter your email address.'; 
                                break;
                            case 'phone':
                                message = 'Please enter your phone number.';
                                break;
                            case 'street-address':
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
                        errorMessageSpan.textContent = message;
                    }
                    formIsValid = false;
                }
            });

            console.log("Validation finished. formIsValid:", formIsValid); 

            if (!formIsValid) {
                validationMessageContainer.style.display = 'block'; 
            } else {
                alert('The form has been succesfully filled. Move on to the next step.');
            }
        });
    } else {
        console.error("Dugme 'continueButton', forma 'dataForm' ili kontejner za validaciju nisu pronađeni. Proverite HTML ID-je i klase.");
    }
});