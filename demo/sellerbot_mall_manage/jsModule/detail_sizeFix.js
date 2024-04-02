//////////////////////////////테이블 1//////////////////////////////
  $(document).ready(function() {
    var length1 = $(".get_length_1 .new_payment_detail_top_board_list").length;
    var realLength = length1 / 2;
    for (i = 0; i <= length1; i++) {
      var getWidth1 = realLength * "11.1" + "rem";
      var tableListNum = $(".get_table_list").length;
      var tableListNum1 = tableListNum / 2
      $(".new_payment_detail_top_board_list_wrap_cont").css('width', getWidth1);
    }
    if (length1 / 2 <= 6) {
      $(".new_payment_detail_top_board_list_wrap").removeClass("new_payment_detail_top_board_list_wrap_1");
      $(".new_payment_detail_top_board_content").removeClass("new_payment_detail_top_board_content_1");
    }
    if (length1 / 2 > 6) {
      $(".new_payment_detail_wrap_1 .new_payment_detail_top_board_list_wrap").addClass("new_payment_detail_top_board_list_wrap_1");
      $(".new_payment_detail_wrap_1 .new_payment_detail_top_board_content").addClass("new_payment_detail_top_board_content_1");
    }
    if (matchMedia("screen and (max-width: 500px)").matches) {
      var length1 = $(".get_length_1 .new_payment_detail_top_board_list").length;
      var realLength = length1 / 2;
      for (i = 0; i <= length1; i++) {
        var getWidth1 = realLength * "9.1" + "rem";
        var tableListNum = $(".get_table_list").length;
        var tableListNum1 = tableListNum / 2
        $(".new_payment_detail_top_board_list_wrap_cont").css('width', getWidth1);
      }
      if (length1 <= 6) {
        $(".new_payment_detail_top_board_list_wrap").removeClass("new_payment_detail_top_board_list_wrap_1");
        $(".new_payment_detail_top_board_content").removeClass("new_payment_detail_top_board_content_1");
      }
    }
  });
  $(document).ready(function() {
    var length1 = $(".payment_popup_list .get_length_1 .new_payment_detail_top_board_list").length;
    var realLength = length1;
    for (i = 0; i <= length1; i++) {
      var getWidth1 = realLength * "11.1" + "rem";
      var tableListNum = $(".payment_popup_list .get_table_list").length;
      var tableListNum1 = tableListNum / 2
      $(".payment_popup_list .new_payment_detail_top_board_list_wrap_cont").css('width', getWidth1);
    }
    if (length1 <= 6) {
      $(".payment_popup_list .new_payment_detail_top_board_list_wrap").removeClass("new_payment_detail_top_board_list_wrap_1");
      $(".payment_popup_list .new_payment_detail_top_board_content").removeClass("new_payment_detail_top_board_content_1");
    }
    if (matchMedia("screen and (max-width: 500px)").matches) {
      var length1 = $(".payment_popup_list .get_length_1 .new_payment_detail_top_board_list").length;
      var realLength = length1 / 2;
      for (i = 0; i <= length1; i++) {
        var getWidth1 = realLength * "9.1" + "rem";
        var tableListNum = $(".payment_popup_list .get_table_list").length;
        var tableListNum1 = tableListNum / 2
        $(".payment_popup_list .new_payment_detail_top_board_list_wrap_cont").css('width', getWidth1);
      }
      if (length1 <= 6) {
        $(".payment_popup_list .new_payment_detail_top_board_list_wrap").removeClass("new_payment_detail_top_board_list_wrap_1");
        $(".payment_popup_list .new_payment_detail_top_board_content").removeClass("new_payment_detail_top_board_content_1");
      }
    }
  });
  //////////////////////////////테이블 2//////////////////////////////
  $(document).ready(function() {
    function tableSizeFix() {
    var realLength = $(".sizeFix_2").length;
    for (i = 0; i <= realLength; i++) {
      var getWidth1 = realLength * "11.1" + "rem";
      $(".new_payment_detail_top_board_list_wrap_cont_2").css('width', getWidth1);
    }
    if (matchMedia("screen and (max-width: 500px)").matches) {
      for (i = 0; i <= realLength; i++) {
        var getWidth1 = realLength * "9.1" + "rem";
        $(".new_payment_detail_top_board_list_wrap_cont_2").css('width', getWidth1);
      }
    }
  }
  tableSizeFix();
});
