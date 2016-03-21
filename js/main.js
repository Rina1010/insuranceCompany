$(window).load(function(){
    pageResize();
});

$(document).ready(function(){
    setDatePickerDate();
    userChoiceFormChanges();

    $(".links-group .link-option span").click(function(){
        $(this).parents(".links-group").first().find("span").removeClass("currOption");
        $(this).addClass("currOption");
    });

    $(".field-notice span.notice").click(function(){
        $(this).toggleClass("currOption");
    });

    $("select:not('.curr-city select')").fancySelect();

    $(".curr-city select").ddslick({
        defaultSelectedIndex: 0,
        height: 200,
        width: '100%'
    });

    $(".phoneField").inputmask({"mask": "+38(999) 999-99-99"});

    pageResize();

});

$(window).resize(function(){
    pageResize();
});

function pageResize(){

    $("#navPanel .section-wrap, #mainPanel .section-wrap, .news-section  .section-wrap").css({
        "padding-top": $("#header").height()
    });

    $(".user-info-form").css({
        "padding-bottom": $(".check-form").outerHeight() + 10
    });

    $(".main-form").css({
        "padding-bottom": function(){
            getFooterHeight() + 10
            //return getFooterHeight() > $(".custom-liveChat").outerHeight() ? (getFooterHeight() + 10) : ($(".custom-liveChat").outerHeight() + 10)
        }
    });

    $(".check-user-form").css({
        "height": function () {
            return $(".main-form").height() > $(".user-info-form").outerHeight() ? ($("#mainPanel .section-wrap").outerHeight() - getFooterHeight()) : "auto"
        }
    });

    $("#navPanel .section-wrap").height(function(){
        return $("#navPanel").outerHeight() - $("#header").height();
    });

    $("#navPanel .section-wrap").height(function(){
        return $("#navPanel").outerHeight() - $("#header").height();
    });

    function getFooterHeight() {
        return ($(".footer-bar").outerHeight());
    }

    //$.scrollify({
    //    section: "section"
    //});
}

function setDatePickerDate() {
    $(".date-fields .datepicker").each(function(){
        $(this).datepicker({
            showOn: "button",
            defaultDate: new Date(),
            minDate: new Date(),
            onSelect: function(dateText) {
                var datePieces = dateText.split("/"),
                    month = datePieces[0],
                    day = datePieces[1],
                    year = datePieces[2],
                    $currRow = $(this).parents(".date-fields").first();
                $currRow.find("select[name=month]").val(month).trigger("update");
                $currRow.find("select[name=day]").val(day).trigger("update");
                $currRow.find("select[name=year]").val(year).trigger("update");
            }
        });
    });

    $(".date-fields select").each(function(){
        $(this).on("change.fs", function (){
            var $currRow = $(this).parents(".date-fields").first(),
                currReminderDate = $currRow.find("select[name=month]").val() + "/" + $currRow.find("select[name=day]").val() + "/" + $currRow.find("select[name=year]").val();
            $currRow.find(".datepicker").datepicker("setDate", new Date(currReminderDate));
        });
    });

    $(".date-fields .showDatepicker").each(function(){
        $(this).click(function(){
            var $currRow = $(this).parents(".date-fields").first();
            $currRow.find(".datepicker").datepicker("show");
        })
    });
}

function userChoiceFormChanges() {
    $(".change-lnk > a").click(function(){
        var $parentRow = $(this).parents(".form-row").first();
        $parentRow.find(".select-row").fadeToggle("fast");
        $parentRow.find("p").fadeToggle("fast");
        return false;
    });

    $(".user-choice select").on("blur.fs", function(){
        var $parentRow = $(this).parents(".form-row").first();
        $parentRow.find("span.curr-text").text($(this).find("option:selected").text());
        $parentRow.find(".select-row").fadeToggle("fast");
        $parentRow.find("p").fadeToggle("fast");
    });
}

