const btn = document.getElementById('btn');
const input = document.getElementById('input');
const caseContainer = document.getElementById('case_container');
const select = document.getElementById('select');

btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value === '') {
        return;
    }
    const caseBox = document.createElement('div');
    const btnDelete = document.createElement('div');
    let caseCheckbox = document.createElement('div');
    let caseText = document.createElement('p');
    caseBox.classList.add('case_box');
    btnDelete.classList.add('btn_delete');
    caseCheckbox.classList.add('case_checkbox');
    caseText.textContent = input.value;
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