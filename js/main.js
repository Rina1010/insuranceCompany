pageResize();

$(window).load(function(){
    pageResize();
});

$(document).ready(function(){
    pageResize();
    setDatePickerDate();
    userChoiceFormChanges();

    $(".links-group .link-option span").click(function(){
        $(this).parents(".links-group").first().find("span").removeClass("currOption");
        $(this).addClass("currOption");
    });

    $(".field-notice span.notice").click(function(){
        $(this).toggleClass("currOption");
    });

    $("select").fancySelect();
    $("#phoneField").inputmask({"mask": "+38(999) 999-99-99"});


});

$(window).resize(function(){
    console.log("2");
    pageResize();
});

function pageResize(){

    $("ul.insuranse-type").css({
        "padding-top": $("#navPanel .nav-header").outerHeight(),
        "margin-top": 0 - $("#navPanel .nav-header").outerHeight()
    });

    $("#main-content .main-content, #navPanel").css({
        "height": getMinHeight($("#main-content section"), $("section.insurance"))
    });

    $("#main-content #mainPanel").css({
        "height": getMinHeight($("#main-content #mainPanel"), $(".section-content"))
    });

    $(".section-wrap").css({
        "padding-top": $("#header").outerHeight()
    });

    $(".section-wrap .form-wrap").css({
        "padding-bottom": getFooterHeight()
    });
    $("#mainPanel .section-wrap").css({
        "padding-bottom": getFooterHeight()
    });

    $("ul.insuranse-type").height($(".section-content").outerHeight() - $(".nav-header").outerHeight() - $("#header").outerHeight());


    if (getFooterHeight()) {
        $(".footer-bar").height(getFooterHeight());
    }

    $("#main-content section").each(function(){
        $(this).css({
            "min-height": function() {
                if ($(this).height() < $(window).height() && $(window).height() > 768) {
                    return $(window).height();
                } else  {
                    return 768;
                }
            }
        })
    });

    $("#main-content section .section-content").each(function(){
        $(this).css({
            "min-height": function() {
                return $(this).parent("section").outerHeight()
            }
        })
    });

    if ($("#mainPanel").outerHeight() < $(".section-wrap .main-form").outerHeight()) {
        $("#mainPanel").css({
            "height": $(".section-wrap .main-form").outerHeight() + $("#header").outerHeight()
        })
    }

    function getMinHeight($section, $largeSection) {
        var minHeight = "auto";
        if ($section.outerHeight() <= $largeSection.outerHeight()) {
            minHeight = $largeSection.outerHeight();
        }
        return minHeight;
    }

    function getFooterHeight() {
        return ($(".prices-section").height() + $(".action-panel").height());
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

