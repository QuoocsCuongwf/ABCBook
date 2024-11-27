document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.getElementById('customer-form');
    const customerTable = document.getElementById('customer-table').querySelector('tbody');
    const editModal = document.getElementById('edit-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const confirmEditBtn = document.getElementById('confirm-edit');

    const nameInput = document.getElementById('edit-name');
    const emailInput = document.getElementById('edit-email');
    const phoneInput = document.getElementById('edit-phone');
    const addressInput = document.getElementById('edit-address');

    let customerId = 1; // Mã khách hàng, bắt đầu từ 1
    let editingRow = null; // Biến lưu hàng khách hàng đang chỉnh sửa

    // Xử lý sự kiện submit form thêm khách hàng mới
    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();

        if (name && email && phone && address) {
            addCustomer(name, email, phone, address);
            customerForm.reset(); // Xóa trắng form sau khi thêm
        } else {
            alert('Vui lòng điền đầy đủ thông tin!');
        }
    });

    // Hàm thêm khách hàng vào bảng
    function addCustomer(name, email, phone, address) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${generateCustomerCode(customerId++)}</td>
            <td><b>${name}</b></td>
            <td><b>${email}</b></td>
            <td><b>${phone}</b></td>
            <td><b>${address}</b></td>
            <td>
                <button class="edit-btn">Chỉnh sửa</button>
                <button class="delete-btn">Xóa</button>
            </td>
        `;

        // Nút chỉnh sửa
        row.querySelector('.edit-btn').addEventListener('click', () => {
            openEditModal(row);
        });

        // Nút xóa
        row.querySelector('.delete-btn').addEventListener('click', () => {
            row.remove();
        });

        customerTable.appendChild(row);
    }

    // Hàm mở modal chỉnh sửa
    function openEditModal(row) {
        editingRow = row; // Ghi lại hàng đang được chỉnh sửa

        // Lấy dữ liệu từ hàng và điền vào modal
        const name = row.querySelector('td:nth-child(2)').textContent.trim();
        const email = row.querySelector('td:nth-child(3)').textContent.trim();
        const phone = row.querySelector('td:nth-child(4)').textContent.trim();
        const address = row.querySelector('td:nth-child(5)').textContent.trim();

        nameInput.value = name;
        emailInput.value = email;
        phoneInput.value = phone;
        addressInput.value = address;

        // Hiển thị modal
        editModal.style.display = 'block';
    }

    // Hàm xác nhận chỉnh sửa
    confirmEditBtn.addEventListener('click', () => {
        if (editingRow) {
            // Lấy dữ liệu từ modal
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const phone = phoneInput.value.trim();
            const address = addressInput.value.trim();

            if (name && email && phone && address) {
                // Cập nhật dữ liệu trong hàng
                editingRow.querySelector('td:nth-child(2)').innerHTML = `<b>${name}</b>`;
                editingRow.querySelector('td:nth-child(3)').innerHTML = `<b>${email}</b>`;
                editingRow.querySelector('td:nth-child(4)').innerHTML = `<b>${phone}</b>`;
                editingRow.querySelector('td:nth-child(5)').innerHTML = `<b>${address}</b>`;

                // Đóng modal
                editModal.style.display = 'none';
                editingRow = null; // Reset biến lưu hàng đang chỉnh sửa
            } else {
                alert('Vui lòng điền đầy đủ thông tin!');
            }
        }
    });

    // Nút đóng modal
    closeModalBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
        editingRow = null; // Reset biến lưu hàng đang chỉnh sửa
    });

    // Hàm tạo mã khách hàng
    function generateCustomerCode(id) {
        return `#KH${String(id).padStart(3, '0')}`; // Thêm số 0 phía trước nếu cần
    }
});
