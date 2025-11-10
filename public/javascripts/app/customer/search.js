function init() {
    document.getElementById('txtPhoneNumber').focus();
    document.getElementById('frmSearch').addEventListener('keyup', 
        (e) => 
            { 
                if (e.code == "Enter") search();
                else if (e.code == "F5") edit(0);
                else if (e.code == "F2") menu();
            }
    );
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
    let frm = document.getElementById('frmSearch');
    frm.action = '/app/customer/edit';
    document.getElementById('txtCustomerId').value = id;
    frm.submit();
}

function custfunc(e, id) {
    if (e.code == "Enter") {
        if (e.srcElement.value.toLowerCase() == 'e') edit(id);
    }
}

let menu = () => location.href="../customer/menu";

document.addEventListener("DOMContentLoaded", init);