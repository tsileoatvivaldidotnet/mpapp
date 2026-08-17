let mode = '';
function init() {
    document.getElementById('txtPhoneNumber').focus();
    document.getElementById('frmSearch').addEventListener('keyup', 
        (e) => 
            { 
                if (e.code == "Enter") search();
            }
    );
    
    document.addEventListener('keydown', (e) => {
        if (mode == 'Delete') {
            if (e.code == 'KeyY') alert('Delete');
            else if (e.code == 'KeyN') closeDeleteModal();
        }
        else if (e.code == "F2") {
            e.preventDefault();
            menu();
        }
        else if (e.code == "F5") {
            e.preventDefault();
            edit(0);
        }
    });
    document.getElementById('divX').addEventListener('click', (e) => {
        closeDeleteModal(e);   
    });
    document.getElementById('btnDeleteYes').addEventListener('click', (e) => {});
    document.getElementById('btnDeleteNo').addEventListener('click', closeDeleteModal);
}

function closeDeleteModal(e) {
    document.getElementById('modalForm').style.display='none';
    enableDisable('searchForm', true);
    mode = '';
}

function search() {
    let phone = document.getElementById('txtPhoneNumber').value.trim();
    let city = document.getElementById('txtCity').value.trim();
    let lastName = document.getElementById('txtLastName').value.trim();
    let firstName = document.getElementById('txtFirstName').value.trim();

    if (phone == '' && city == '' && lastName == '' && firstName == '') {
        document.getElementById('divSearchError').classList.remove('hidden');
    }
    else {
        document.getElementById('divSearchError').classList.add('hidden');
        document.getElementById('frmSearch').submit();
    }
}

function edit(id) {
    let frm = document.querySelector('#frmEdit');
    frm.action = `/customer/edit/${id}`;
    frm.submit();
}

function custfunc(e, id) {
    if (e.code == "Enter") {
        const func = e.srcElement.value;
        if (func == 'E') edit(id);
        else if (func == 'D') {
            mode = 'Delete';
            document.getElementById('modalForm').style.display = 'flex';
            enableDisable('searchForm', false);
            document.getElementById('btnDeleteYes').focus();
            e.stopPropagation();
        }
    }
    else {
        e.srcElement.value = e.srcElement.value.toUpperCase();
    }
}

let menu = () => location.href="../menu";

//
document.addEventListener("DOMContentLoaded", init);

