
function modifyClientQty(val) {

    var qty = $('#product-client-qty').val();
    var new_qty = parseInt(qty,10) + val;

    if (new_qty < 0) {
        new_qty = 0;
    }

    $('#product-client-qty').val(new_qty);
    return new_qty;
}