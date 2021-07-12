import { handleSubmit } from './js/formHandler'

//Adding event listener for submit button
document.querySelector('.submit-btn').addEventListener('click', (event) => {
    event.preventDefault();

    const destination = document.querySelector('#destination').value;
    const startDate = document.querySelector('#startDate').value;
    const endDate = document.querySelector('#endDate').value;

    //ensuring the input data are non-empty
    if(destination == '' || startDate == '' || endDate == '') {
        alert('please enter the missing data');
    }else{
        handleSubmit(destination);
    }
});

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/resets.scss'

export {
    handleSubmit
}