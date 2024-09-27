$('.btn-number').click(function(e) {
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function() {
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }


});
$(".input-number").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

var maxData = 3;
let i = 2;

$(document).ready(function() {
    var radius = 200;
    var fields = $(".itemDot");
    var container = $(".dotCircle");
    var width = container.width();
    radius = width / 2.5;

    var height = container.height();
    var angle = 0,
        step = (2 * Math.PI) / fields.length;
    fields.each(function() {
        var x = Math.round(
            width / 2 + radius * Math.cos(angle) - $(this).width() / 2
        );
        var y = Math.round(
            height / 2 + radius * Math.sin(angle) - $(this).height() / 2
        );
        if (window.console) {
            console.log($(this).text(), x, y);
        }

        $(this).css({
            left: x + "px",
            top: y + "px"
        });
        angle += step;
    });

    $(".itemDot").click(function() {
        var dataTab = $(this).data("tab");
        $(".itemDot").removeClass("active");
        $(this).addClass("active");
        $(".CirItem").removeClass("active");
        $(".CirItem" + dataTab).addClass("active");
        i = dataTab;

        $(".dotCircle").css({
            transform: "rotate(" + (360 - (i - 1) * 36) + "deg)",
            transition: "2s"
        });
        $(".itemDot").css({
            transform: "rotate(" + (i - 1) * 36 + "deg)",
            transition: "1s"
        });
    });

    setInterval(function() {
        var dataTab = $(".itemDot.active").data("tab");
        if (dataTab > maxData || i > maxData) {
            dataTab = 1;
            i = 1;
        }
        $(".itemDot").removeClass("active");
        $('[data-tab="' + i + '"]').addClass("active");
        $(".CirItem").removeClass("active");
        $(".CirItem" + i).addClass("active");
        i++;

        $(".dotCircle").css({
            transform: "rotate(" + (360 - (i - 2) * 36) + "deg)",
            transition: "2s"
        });
        $(".itemDot").css({
            transform: "rotate(" + (i - 2) * 36 + "deg)",
            transition: "1s"
        });
    }, 5000);
});
