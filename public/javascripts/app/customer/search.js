let mode = '';

function init() {
    const phone = document.getElementById('txtPhoneNumber');
    if (phone) phone.focus();

    const form = document.getElementById('frmSearch');
    if (form) {
        form.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                e.preventDefault();
                search();
            }
        });
    }

    document.getElementById('btnSearch').addEventListener('click', search);
    document.getElementById('btnMenu').addEventListener('click', menu);
    document.getElementById('btnNewCustomer').addEventListener('click', () => edit(0));
    document.getElementById('btnCloseDelete').addEventListener('click', closeDeleteModal);
    document.getElementById('btnDeleteYes').addEventListener('click', () => {});
    document.getElementById('btnDeleteNo').addEventListener('click', closeDeleteModal);

    const results = document.querySelector('.search-results');
    if (results) {
        results.addEventListener('click', onResultsClick);
        results.addEventListener('keyup', onResultsKeyUp);
    }

    document.addEventListener('keydown', onDocumentKeyDown);
}

function onDocumentKeyDown(e) {
    if (mode === 'Delete') {
        if (e.code === 'KeyY') alert('Delete');
        else if (e.code === 'KeyN') closeDeleteModal();
        return;
    }
    if (e.code === 'F2') {
        e.preventDefault();
        menu();
    } else if (e.code === 'F5') {
        e.preventDefault();
        edit(0);
    }
}

function onResultsClick(e) {
    const name = e.target.closest('.customer-name');
    if (!name) return;
    const id = customerIdFrom(name);
    if (id !== null) edit(id);
}

function onResultsKeyUp(e) {
    if (!e.target.classList.contains('function-input')) return;
    const id = customerIdFrom(e.target);
    if (id === null) return;
    custfunc(e, id);
}

function customerIdFrom(el) {
    const row = el.closest('tr');
    if (!row || row.dataset.customerId === undefined) return null;
    return row.dataset.customerId;
}

function openDeleteModal() {
    mode = 'Delete';
    document.getElementById('modalForm').classList.add('is-open');
    enableDisable('searchForm', false);
    document.getElementById('btnDeleteYes').focus();
}

function closeDeleteModal() {
    document.getElementById('modalForm').classList.remove('is-open');
    enableDisable('searchForm', true);
    mode = '';
}

function search() {
    const phone = document.getElementById('txtPhoneNumber').value.trim();
    const city = document.getElementById('txtCity').value.trim();
    const lastName = document.getElementById('txtLastName').value.trim();
    const firstName = document.getElementById('txtFirstName').value.trim();
    const error = document.getElementById('divSearchError');

    if (phone === '' && city === '' && lastName === '' && firstName === '') {
        error.classList.remove('hidden');
    } else {
        error.classList.add('hidden');
        document.getElementById('frmSearch').submit();
    }
}

function edit(id) {
    const frm = document.getElementById('frmEdit');
    frm.action = `/customer/edit/${id}`;
    frm.submit();
}

function custfunc(e, id) {
    if (e.code === 'Enter') {
        const func = e.target.value;
        if (func === 'E') edit(id);
        else if (func === 'D') {
            openDeleteModal();
            e.stopPropagation();
        }
    } else {
        e.target.value = e.target.value.toUpperCase();
    }
}

function menu() {
    location.href = '../menu';
}

document.addEventListener('DOMContentLoaded', init);
