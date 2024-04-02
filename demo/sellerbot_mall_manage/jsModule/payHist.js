var pagination = null;
var paginationMB = null;
var initPayHist = function() {
    // PC용 페이징
    pagination = new tui.Pagination('grid-pagination-container', {
        visiblePages: 10,
        itemsPerPage: 10,
        page: 1,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        usageStatistics: true
    });

    pagination.on('beforeMove', function (eventData) {
        search(eventData.page);
    });

    // 모바일용 페이징
    paginationMB = new tui.Pagination('grid-pagination-container-mb', {
        visiblePages: 3,
        itemsPerPage: 3,
        page: 1,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        usageStatistics: true
    });

    paginationMB.on('beforeMove', function (eventData) {
        search(eventData.page);
    });
};

// 결제 내역 조회
var search = function (page) {
    var isPC = true;
    if($(".mobile_asset").css("display") != "none")
        isPC = false

    var startDateArray = $('#datepicker-input-start').val().split('-');
    var endDateArray = $('#datepicker-input-end').val().split('-');
    var start_dt = startDateArray[0] + startDateArray[1];
    var end_dt = endDateArray[0] + endDateArray[1];

    var param = {
        "start_dt": start_dt,
        "end_dt": end_dt,
        "page": page - 1,
        "size": isPC ? pagination._options.itemsPerPage : paginationMB._options.itemsPerPage
    };

    $.get("/sub/my/payHistList", $.param(param), function (res) {
        // 테이블 갱신
        if(isPC)
            updatePayHistListForPC(res);
        else
            updatePayHistListForMB(res);
    });
}

// PC용 리스트 업데이트
var updatePayHistListForPC = function (res) {
    var htmlStr = "";

    if (res.dataList == null || res.dataList.length == 0) {
        $(".grid_noData").show();
    }
    else {
        $(".grid_noData").hide();

        for (var i = 0; i < res.dataList.length; i++) {
            htmlStr += "<tr>";
            htmlStr += "    <td>" + res.dataList[i].pay_date + "</td>";
            htmlStr += "    <td>" + res.dataList[i].pay_method + "</td>";
            htmlStr += "    <td>" + res.dataList[i].pay_bill_app_seq_no + "</td>";
            htmlStr += "    <td>" + res.dataList[i].goods_nm + "(" + res.dataList[i].pay_typ_cd_nm + ")" + "</td>";
            htmlStr += "    <td>" + fnAddComma(res.dataList[i].price) + "원</td>";
            htmlStr += "    <td>" + res.dataList[i].pay_STS_NM + "</td>";
            
            if(res.dataList[i].pay_STS_NM == "취소")
                htmlStr += "    <td>" + res.dataList[i].cancel_date + "</td>";
            else 
                htmlStr += "    <td>-</td>";

            htmlStr += "    <td>";
            if (res.dataList[i].bill_tid != null && res.dataList[i].bill_tid != "") {
                htmlStr += "        <span value='" + res.dataList[i].bill_tid + "' onclick='activeActive(this);' class='bold underLine popup_type_grid'>매출전표</span>";
            } else {
                htmlStr += "-";
            }
            htmlStr += "    </td>";
            htmlStr += "</tr>";
        }
    }

    // 조회 시 pagination 초기화
    if (res.page == 0) {
        pagination.setTotalItems(res.totalCount);
        pagination._currentPage = 0;
        pagination.reset();
    }

    $("#tableBodyForPC").html(htmlStr);

    // pagination 노출 처리
    if (res.dataList == null || res.dataList.length == 0)
        $("#grid-pagination-container").hide();
    else
        $("#grid-pagination-container").show();
};

// 모바일용 리스트 업데이트
var updatePayHistListForMB = function (res) {
    var htmlStr = "";

    if (res.dataList == null || res.dataList.length == 0) {
        htmlStr += '<div class="grid_noData mobile_asset">';
        htmlStr += '    <h1>결제 내역이 없습니다.</h1>';
        htmlStr += '</div>';
    }
    else {
        for (var i = 0; i < res.dataList.length; i++) {
            htmlStr += "<ul class='mb_table_service'>";
            htmlStr += "<li class='gray_bg' onclick='pressedMobileTableTitle(this);'>";
            htmlStr += "    <h1>결제일</h1>";
            htmlStr += "    <h2 class='blue_liner0'>" + res.dataList[i].pay_date + "</h2>";
            htmlStr += "    <img class='ac_menu_icon' src='/assets/images/icon/icon_top.png' alt=''>";
            htmlStr += "</li>";
            htmlStr += "<li>";
            htmlStr += "    <h1>결제수단</h1>";
            htmlStr += "    <h2>" + res.dataList[i].pay_method + "</h2>";
            htmlStr += "</li>";
            htmlStr += "<li>";
            htmlStr += "    <h1>결제번호</h1>";
            htmlStr += "    <h2>" + res.dataList[i].pay_bill_app_seq_no + "</h2>";
            htmlStr += "</li>";
            htmlStr += "<li>";
            htmlStr += "    <h1>내역</h1>";
            htmlStr += "    <h2>" + res.dataList[i].goods_nm + "(" + res.dataList[i].pay_typ_cd_nm + ")" + "</h2>";
            htmlStr += "</li>";
            htmlStr += "<li>";
            htmlStr += "    <h1>금액</h1>";
            htmlStr += "    <h2>" + fnAddComma(res.dataList[i].price) + "원</h2>";
            htmlStr += "</li>";
            htmlStr += "<li>";
            htmlStr += "    <h1>상태</h1>";
            htmlStr += "    <h2>" + res.dataList[i].pay_STS_NM + "</h2>";
            htmlStr += "</li>";
            htmlStr += "<li>";
            htmlStr += "    <h1>취소일시</h1>";

            if(res.dataList[i].pay_STS_NM == "취소")
                htmlStr += "    <h2>" + res.dataList[i].cancel_date + "</h2>";
            else 
                htmlStr += "    <h2>-</h2>";

            htmlStr += "</li>";
            htmlStr += "<li>";
            htmlStr += "    <h1>관리</h1>";
            htmlStr += "    <div class='s_mb_btn_row'>";
            if (res.dataList[i].bill_tid != null && res.dataList[i].bill_tid != "") {
                htmlStr += "        <button value='" + res.dataList[i].bill_tid + "' onclick='activeActive(this);' type='button' class='change_payment_btn'>매출전표</button>";
            } else {
                htmlStr += "-";
            }
            htmlStr += "    </div>";
            htmlStr += "</li>";
            htmlStr += "</ul>";
        }
    }

    // 조회 시 pagination 초기화
    if (res.page == 0) {
        paginationMB.setTotalItems(res.totalCount);
        paginationMB._currentPage = 0;
        paginationMB.reset();
    }

    $("#m_sec1_mb").html(htmlStr);

    // pagination 노출 처리
    if (res.dataList == null || res.dataList.length == 0)
        $("#grid-pagination-container-mb").hide();
    else
        $("#grid-pagination-container-mb").show();
};

var pressedMobileTableTitle = function(obj) {
    var state = $(obj).attr("state");
    if(state == "on") {
        $(obj).attr("state", "off");
        $(obj).siblings().css("display", "none");
        $(obj).find(".ac_menu_icon").attr("src", "/assets/images/icon/icon_bottom2.png");
    }
    else {
        $(obj).attr("state", "on");
        $(obj).siblings().css("display", "block");
        $(obj).find(".ac_menu_icon").attr("src", "/assets/images/icon/icon_top.png");
    }
};