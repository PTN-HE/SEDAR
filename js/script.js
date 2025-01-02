// تفعيل مكتبة flatpickr على حقل التاريخ
document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#invoice_date", {
        dateFormat: "d/m/Y", // التنسيق المطلوب
    });
});

// دالة طباعة الفاتورة
function printInvoice() {
    window.print();
}

// دالة إضافة صف جديد
function addRow() {
    const tableBody = document.querySelector('tbody');
    const newRow = document.createElement('tr');
    newRow.className = 'item-row';
    newRow.innerHTML = `
        <td><input type="text" class="form-textbox" name="description[]"></td>
        <td><input type="number" class="form-textbox price" name="price[]" step="0.01"></td>
        <td><input type="number" class="form-textbox quantity" name="quantity[]" step="1"></td>
        <td><input type="number" class="form-textbox total" name="total[]" step="0.01" readonly></td>
    `;
    tableBody.appendChild(newRow);
}

// دالة حذف الصف الأخير
function removeRow() {
    const tableBody = document.querySelector('tbody');
    if (tableBody.rows.length > 1) {
        tableBody.deleteRow(-1);
    }
}

// دالة حساب الإجمالي للصف
function calculateRowTotal(row) {
    const price = parseFloat(row.querySelector('.price').value) || 0;
    const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
    const total = row.querySelector('.total');
    total.value = (price * quantity).toFixed(2);
}

// دالة حساب إجمالي الفاتورة
function calculateInvoiceTotal() {
    let totalInvoice = 0;
    document.querySelectorAll('.total').forEach(totalField => {
        totalInvoice += parseFloat(totalField.value) || 0;
    });
    document.querySelector('#invoice_total').value = totalInvoice.toFixed(2);
}

// دالة تحديث المتبقي
function updateRemaining() {
    const total = parseFloat(document.querySelector('#invoice_total').value) || 0;
    const previousBalance = parseFloat(document.querySelector('#previous_balance').value) || 0;
    const paid = parseFloat(document.querySelector('#paid_amount').value) || 0;
    document.querySelector('#remaining_balance').value = (total + previousBalance - paid).toFixed(2);
}

// تفعيل الحسابات عند الإدخال
document.addEventListener('input', () => {
    document.querySelectorAll('.item-row').forEach(row => calculateRowTotal(row));
    calculateInvoiceTotal();
    updateRemaining();
});