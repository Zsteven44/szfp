

$('.dropdown-toggle').dropdown();


$('#product-dropdown-style-options li').on('click', function() {
    $('#product-dropdown-style-title').html($(this).find('a').html());
    });gi