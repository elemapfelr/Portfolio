$(document).ready(function () {
  /*header*/
  $(".modal_menu p").click(function () {
    $(".modal_menu p").removeClass("focus");
    $(this).addClass("focus");
    var numAlarm = $(this).index() + 1;
    $(".list_alarm").removeClass("active");
    $(".list_alarm[data-alarm=list" + numAlarm + "]").addClass("active");
  });

  $(".m_alarm").click(function () {
    $(".modal_alarm").show();
    $(".modal_service_prepare").hide();
    $(".modal_alarm .close_modal").click(function () {
      $(".modal_alarm").hide();
    });
    return false;
  });
  $(".right_menu .m_premium").click(function () {
    $(".modal_service_prepare").show();
    $(".modal_alarm").hide();
    $(".modal_service_prepare .close_modal").click(function () {
      $(".modal_service_prepare").hide();
    });
    return false;
  });
  var clickCon = $(".modal_service_prepare").attr("class");
  $(document).click(function (e) {
    // console.log(e.target.className)
    if (clickCon == e.target.className || e.target.className == "msg_prepare") { } else {
      $(".modal_service_prepare, .modal_alarm").hide();
    }
  });
  var toggle_num = 0;
  $(".m_menu_wra").click(function () {
    $(this).addClass("active");
    $(".m_sideMenu_wra").addClass("active");
    $(".m_sideMenu_cover").addClass("active");
    $("body").addClass("active_back");
    toggle_num++;
    if (toggle_num >= 2) {
      $(this).removeClass("active");
      $(".m_sideMenu_wra").removeClass("active");
      $(".m_sideMenu_cover").removeClass("active");
      $("body").removeClass("active_back");
      toggle_num = 0;
    }
  });


  /*index */
  $(".n_banner_notice .close_banner").click(function () { /** 20200212 수정 **/
    $(this).parents(".n_banner_notice").hide();  /** 20200212 수정 **/
  });

  $(".pagination .page").click(function () {
    $(".pagination .page").removeClass("focus");
    $(this).addClass("focus");
  });

  /*side menu*/
  $(".side_menu_area .icon").click(function () {
    $(this).parents(".side_menu_area").addClass("active");
    $(".title_menu img").click(function () {
      $(".side_menu_area").removeClass("active");
    });
  });
  $(".depth1").click(function () {
    $(this).parents(".menu").toggleClass("open");
    $(this).siblings(".sub_gnb_side").stop().slideDown(300);
    if ($(this).parents(".menu").hasClass("open") == false) {
      $(".sub_gnb_side").stop().slideUp(300);
    }
    $(".sub_gnb_side").not($(this).siblings(".sub_gnb_side")).slideUp(300);
    $(".menu").not($(this).parents(".menu")).removeClass("open");
  });

  //side menu active//
  var menuUrl = window.location.search.substr(1);

  function slideOn() {
    $(".side_menu_area").addClass("active");
    $(".title_menu img").click(function () {
      $(".side_menu_area").removeClass("active");
    });
  }
  if (menuUrl == "menu=1") {
    slideOn();
  }
  if (menuUrl == "menu=2") {
    slideOn();
    $(".sub_gnb_side_1").stop().slideDown(300);
    $(".menu_1").addClass("open");
  }
  if (menuUrl == "menu=3") {
    slideOn();
    $(".sub_gnb_side_2").stop().slideDown(300);
    $(".menu_2").addClass("open");
  }
  if (menuUrl == "menu=4") {
    slideOn();
    $(".sub_gnb_side_3").stop().slideDown(300);
    $(".menu_3").addClass("open");
  }
  /*term agree*/
  $(".item_agree_join .link_agree").click(function () {
    $(".popup_terms").show();
    $(".popup_terms .btn_confirm_terms").click(function () {
      $(".popup_terms").hide();
    });
    return false;
  });

  /*market*/
  $(".type_market").click(function () {
    if ($(this).hasClass("open") == false) {
      $(".type_market").removeClass("open");
      $(this).addClass("open");
    } else {
      $(this).removeClass("open");
    }

  });
  if (matchMedia("screen and (max-width: 5000px) and (min-width:1400px)").matches) {
    var toggle_open = 0;
    $(".title_summary").click(function () {
      $(this).removeClass("open");
      $(".swiper-wrapper").css("height", "33px");
      $(".swiper-wrapper").css("marginBottom", "0");
      $(".summary_report_section_m_Box_2").css("marginBottom", "2rem");
      toggle_open++;
      if (toggle_open >= 2) {
        $(".title_summary").addClass("open");
        $(".swiper-wrapper").css("height", "unset");
        $(".swiper-wrapper").css("marginBottom", "1rem");
        $(".summary_report_section_m_Box_2").css("marginBottom", "0rem");
        toggle_open = 0;
      }
    });
  }

  $(".toggle_type_box span").click(function () {
    //버튼스타일
    $(".toggle_type_box span").removeClass("focus");
    $(this).addClass("focus");
    //차트타입변경
    if ($(".toggle_type_box span").eq(1).hasClass("focus")) {
      $(".graph_bar_box").eq(0).hide();
      $(".graph_bar_box").eq(1).show();
      $(".label_gh_m").eq(0).addClass("label_gh_m_display");
    }
    if ($(".toggle_type_box span").eq(0).hasClass("focus")) {
      $(".graph_bar_box").eq(1).hide();
      $(".graph_bar_box").eq(0).show();
      $(".label_gh_m").eq(0).removeClass("label_gh_m_display");
    }
  });


  $(".guide_txt").click(function () {
    $(".guide_pop_detail").addClass("active");
    $(".guide_pop_detail .close_guide").click(function () {
      $(".guide_pop_detail").removeClass("active");
    });
  });

  $(".sh_mall_btn").click(function () {
    var winW = $(window).width();
    if (960 >= winW) {
      $(".body_cover").addClass("active");
    }
    $(".popup_account.type1").addClass("active");
    $(".popup_account.type1 .close_pop").click(function () {
      $(".popup_account.type1").removeClass("active");
      $(".body_cover").removeClass("active");
      return false;
    });
  });


  //scroll
  $(".modal_alarm, .market_box").mouseover(function () {
    $('body').css("overflowY", "hidden").css("width", "calc(100% - 11px)");
    $('.header_wra').css("width", "calc(100% - 11px)");
    $(".popup_account").addClass("popup_account_over");
  });

  $(".modal_alarm ,.market_box").mouseout(function () {
    $('body').css("overflowY", "scroll").css("width", "100%");
    $('.header_wra').css("width", "100%");
    $(".popup_account").removeClass("popup_account_over");

  });

  /*menu/popup z-index*/
  $(".m_menu_wra").click(function () {
    if ($(".m_sideMenu_wra").hasClass("active")) {
      $(".modal").css("zIndex", "3999");
    } else {
      $(".modal").css("zIndex", "9000");
    }
  });


  //pre_calculate_popup//
  /*
  $(".sel_pop_up_2 li").click(function() {
    $(this).addClass("sel_pop_up_2_on");
    $(".sel_pop_up_2 li").not(this).removeClass("sel_pop_up_2_on");
  });
  $(".sel_pop_up_2_dir_input").click(function() {
    $(".sel_pop_up_2 li").removeClass("sel_pop_up_2_on");
  });
  $(".new_popup_close").click(function() {
    $(".new_popup_wrap").css("display", "none");
    $(".display_none_back").hide();
    $(".pop_up_all").hide();
  });
  */
  //팝업 첫 번째 검증//
  /*
  $(".popup_1_btn_none").click(function() {
    var input_pre_chk = document.getElementsByName("chkbox_1");
    if (!input_pre_chk[0].checked) {
      $(".error_popup_1_1").css("display", "block");
    }
    if (input_pre_chk[0].checked) {
      $(".pop_up_1").css("display", "none");
      $(".pop_up_2").css("display", "block");
    }
  });
  $(".popup_1_btn_join").click(function() {
    var input_pre_chk = document.getElementsByName("chkbox_1");
    if (!input_pre_chk[0].checked) {
      $(".error_popup_1_1").css("display", "block");
    }
    if (input_pre_chk[0].checked) {
      $(".new_popup_wrap").css("display", "none");
      $(".pop_up_1").hide();
      $(".display_none_back").hide();
    }
  });
  */
  //팝업 두 번째 담당자 검증//
  /*
  $(".popup_2_btn").click(function() {
    var text_area = $(".sel_pop_up_2_dir_input").val();
    if (text_area.length < 1 && $(".sel_pop_up_2 li").hasClass("sel_pop_up_2_on")) {
      $(".pop_up_2").css("display", "none");
      $(".pop_up_3").css("display", "block");
    }
    if (!$(".sel_pop_up_2 li").hasClass("sel_pop_up_2_on") && text_area.length > 0) {
      $(".pop_up_2").css("display", "none");
      $(".pop_up_3").css("display", "block");
    }
    if (!$(".sel_pop_up_2 li").hasClass("sel_pop_up_2_on") && !text_area.length > 0) {
      alert("담당자를 지정해 주세요.");
    }
    if ($(".sel_pop_up_2 li").hasClass("sel_pop_up_2_on") && text_area.length > 0) {
      $("한 분만 선택해주세요.");
    }
  });
  */
  //팝업3번 검증//
  /*
  $(".popup_3_btn").click(function() {
    var input_pre_chk_2 = document.getElementsByName("chkbox_2");
    var popup_ph = $(".sel_pop_up_3_dir_input").val();
    if (!input_pre_chk_2[0].checked) {
      if (popup_ph.length < 11) {
        $(".error_popup_3_1,.error_popup_3_2").css("display", "block");
      }
    }
    if (!input_pre_chk_2[0].checked && popup_ph.length == 11) {
      $(".error_popup_3_2").css("display", "block");
      $(".error_popup_3_1").css("display", "none");
    }
    if (input_pre_chk_2[0].checked && popup_ph.length < 11) {
      $(".error_popup_3_1").css("display", "block");
      $(".error_popup_3_2").css("display", "none");
    }
    if (input_pre_chk_2[0].checked && popup_ph.length >= 11) {
      $(".pop_up_3").css("display", "none");
      $(".pop_up_alert_1").css("display", "block");
    }
  });
  //팝업 4번 넘기기//
  $(".popup_4_btn").click(function() {
    $(".pop_up_alert_1").css("display", "none");
    $(".pop_up_alert_2").css("display", "block");
  });
  */
  //팝업 5번 넘기기//
  /*
  $(".popup_4_btn").click(function() {
    $(".pop_up_alert_2").css("display", "none");
    $(".pop_up_alert_3").css("display", "block");
  });
  */
  //팝업 6번 넘기기//
  /*
  $(".popup_5_btn").click(function() {
    $(".new_popup_wrap").css("display", "none");
    $(".display_none_back").hide();
    $(".pop_up_all").hide();
  });
  */

  //배경//
  /*
  $(".pre_page_con_right_btn_1,.pre_page_con_right_btn_2").click(function() {
    $(".new_popup_wrap").css("display", "flex");
    $(".pop_up_1").show();
    $(".display_none_back").show();
  });
  */
  //slide focus
  /*
  var nowUrl = window.location.href;
  var peersale = "http://sellerbot.dkbrothers.co.kr/sub/peersale/state.html?menu=1";
  var peersaleNoSlide = "http://sellerbot.dkbrothers.co.kr/sub/peersale/state.html";
  var peersaleSub = "http://sellerbot.dkbrothers.co.kr/sub/peersale/state_change.html?menu=1";
  var peersaleSubNoSlide = "http://sellerbot.dkbrothers.co.kr/sub/peersale/state_change.html";

  function changeColor() {
    $(".gnb_side .menu:nth-of-type(3) a").css("color", "#86c5ff");
  }
  if (nowUrl == peersale) {
    changeColor();
  } else if (nowUrl == peersaleNoSlide) {
    changeColor();
  } else if (nowUrl == peersaleSub) {
    changeColor();
  } else if (nowUrl == peersaleSubNoSlide) {
    changeColor();
  }

  if (matchMedia("screen and (max-width: 1000px)").matches) {
    var getLength = $(".gnb_top li").length;
    var sizeFix = getLength * 143 + "px";
    var numSizeFixValue = getLength * 143;
    $(".menu_top").css("width", sizeFix);



    var tepleng = $(".gnb_top li").length;
    for (i = 0; i <= tepleng; i++) {
      if (i > 2) {
        if ($(".gnb_top li").eq(i).hasClass("focus")) {
          $(".menu_top").scrollLeft(numSizeFixValue / tepleng * i - 2);
        }
      }
    }
  }
  */


  $(".cal_add_pooup_close").click(function () {
    $(".pop_up_1").css("display", "none");
    $(".new_popup_wrap").css("display", "none");
    $(".display_none_back").css("display", "none");
  });

  //데이터 없을경우 타이틀 자동완성
  // if ($(".menu_name").html() == "매출통계") {
  //   $(".first_nodata_title").html("19년 3월 매출");
  //   $(".second_nodata_title").html("최근 1년 매출");
  //   $(".third_nodata_title").html("조회기간 기준 (2019-04~2019-03)");
  // }
  // if ($(".menu_name, .name").html() == "과거정산금 통계") {
  //   $(".first_nodata_title").html("19년 3월 정산금");
  //   $(".second_nodata_title").html("최근 1년 정산금");
  //   $(".third_nodata_title").html("조회기간 기준 (2019-04~2019-03)");
  // }
  // if ($(".menu_name").html() == "반품통계") {
  //   $(".first_nodata_title").html("19년 3월 반품률");
  //   $(".second_nodata_title").html("최근 1년 반품률");
  //   $(".third_nodata_title").html("조회기간 기준 (2019-04~2019-03)");
  // }
  $(".peer_rank_board_wrap ul").not(".peer_rank_board_con_my, .peer_rank_board_title").mouseover(function () {
    $(this).css("background", "#ffb8af");
  });
  $(".peer_rank_board_wrap ul").not(".peer_rank_board_con_my, .peer_rank_board_title").mouseout(function () {
    $(this).css("background", "none");
  });

  if ($(".desc_summary").eq(0).children("span").length == 1) {
    $(".change_word").html("하였습니다.");
  }
  // var allLeng = $(".tui-grid-cell-content").length;
  // for (i = 0; i < allLeng; i++) {
  //   var textList = $(".tui-grid-cell-content").eq(i).text();
  //   if ($(".tui-grid-cell-content").eq(i).text().indexOf('+') >= 0) {
  //     $(".tui-grid-cell-content").eq(i).css("color","#009ACA");
  //   }
  //   if ($(".tui-grid-cell-content").eq(i).text().indexOf('-') >= 0) {
  //     $(".tui-grid-cell-content").eq(i).css("color","#F4715B");
  //   }
  // }
}); //end

//before document.ready 
// var ticketHref = "/css/ticket.css"
// function loadStyle(href) {
//   for (var i = 0; i < document.styleSheets.length; i++) {
//     if (document.styleSheets[i].href == href) {
//       return;
//     }
//   }
//   var head = document.getElementsByTagName("head")[0];
//   var link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.type = "text/css";
//   link.href = "/assets" + href;
//   head.appendChild(link);
// }
// var paymentUrl = ["/sub/payment/product", "/sub/payment/payment", "/sub/payment/result", "/sub/my/paidInfo", "/sub/my/payHist", "/sub/my/poiHist", "/sub/my/paidCancel"];
// for(var i = 0; i < paymentUrl.length; i++) {
//   if(location.href.indexOf(paymentUrl[i]) != -1) {
//     loadStyle(ticketHref);
//   }
// }