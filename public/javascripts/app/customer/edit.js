function init() {
    const vehicles = document.querySelector('.vehicle-list');
    if (vehicles) {
        vehicles.addEventListener('click', onVehicleClick);
        vehicles.addEventListener('keyup', onVehicleKeyUp);
    }

    document.getElementById('btnEdit').addEventListener('click', () => editCustomer());
    document.getElementById('btnDelete').addEventListener('click', () => deleteCustomer());
    document.getElementById('btnAddVehicle').addEventListener('click', () => addVehicle());

    document.addEventListener('keydown', onDocumentKeyDown);

    if (window.$ && $.fn.jqxComboBox) {
        $('.vehicle-combo').jqxComboBox({
            source: ['Tommy DeVito', 'Jimmy Conway', 'Hendry Hill'],
            width: '200px',
            height: '25px'
        });
    }
}

function onDocumentKeyDown(e) {
    if (e.code === 'F3') {
        e.preventDefault();
        addVehicle();
    }
}

function onVehicleClick(e) {
    const year = e.target.closest('.vehicle-year');
    if (!year) return;
    const id = vehicleIdFrom(year);
    if (id !== null) editVehicle(id);
}

function onVehicleKeyUp(e) {
    if (!e.target.classList.contains('function-input')) return;
    e.target.value = e.target.value.toUpperCase();
    if (e.code !== 'Enter') return;
    const id = vehicleIdFrom(e.target);
    if (id === null) return;
    if (e.target.value === 'E') editVehicle(id);
    else if (e.target.value === 'D') deleteVehicle(id);
}

function vehicleIdFrom(el) {
    const row = el.closest('tr');
    if (!row || row.dataset.vehicleId === undefined) return null;
    return row.dataset.vehicleId;
}

function editCustomer() {}
function deleteCustomer() {}
function addVehicle() {}
function editVehicle(_id) {}
function deleteVehicle(_id) {}

document.addEventListener('DOMContentLoaded', init);
