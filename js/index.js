const btn = document.getElementById('btn');
const input = document.getElementById('input');
const caseContainer = document.getElementById('case_container');
const select = document.getElementById('select');

window.addEventListener('DOMContentLoaded', () => {
    if (window.localStorage.length === 0) {
        return;
    }
    let localResponse = JSON.parse(window.localStorage.getItem('savedCases'));
    for (let i = 0; i < localResponse.length; i++) {
        createCase(localResponse[i]);
    }
})

const createCase = (value) => {
    const caseBox = document.createElement('div');
    const btnDelete = document.createElement('div');
    let caseCheckbox = document.createElement('div');
    let caseText = document.createElement('p');
    caseBox.classList.add('case_box');
    btnDelete.classList.add('btn_delete');
    caseCheckbox.classList.add('case_checkbox');
    caseText.textContent = value;
    caseText.classList.add('case-find');
    caseBox.append(caseCheckbox, caseText, btnDelete);
    caseContainer.append(caseBox);
    caseBox.addEventListener('click', (event) => {
        const target = event.target;
        if (target === caseText || target === caseCheckbox) {
            caseCheckbox.classList.toggle('checked');
            caseText.classList.toggle('strike');
        }
    })
    btnDelete.addEventListener('click', () => {
        btnDelete.parentElement.remove();
    })

}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value === '') {
        return;
    }
    createCase(input.value);
})

select.onchange = () => {
    const cases = document.querySelectorAll('.case-find');
    if (select.value === 'completed') {
        cases.forEach((e) => {
            if (!e.classList.contains('strike')) {
                e.parentElement.classList.add('hide');
            }
            if (e.classList.contains('strike')) {
                e.parentElement.classList.remove('hide');
            }
        })
    }
    if (select.value === 'uncompleted') {
        cases.forEach((e) => {
            if (e.classList.contains('strike')) {
                e.parentElement.classList.add('hide');
            }
            if (!e.classList.contains('strike')) {
                e.parentElement.classList.remove('hide');
            }
        })
    }
    if (select.value === 'all') {
        cases.forEach((e) => {
            e.parentElement.classList.remove('hide')
        })
    }
}

window.addEventListener('unload', () => {
    if (window.localStorage.length != 0) {
        window.localStorage.clear();
    }
    if (document.querySelector('.case-find') !== null) {
        let localData = [];
        document.querySelectorAll('.case-find').forEach((e) => {
            localData.push(e.textContent);
        })
        window.localStorage.setItem('savedCases', JSON.stringify(localData))
    }
})