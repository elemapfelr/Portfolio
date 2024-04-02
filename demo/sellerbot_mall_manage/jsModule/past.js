// 과거 정산금현황 월별 상세보기 그리드용 데이터 반환 함수
var makeMonthGridData = function(list) {
    var gridData = new Array();

    var mappingGridList = new Array();
    for(var i = 1; i <= 12; i++) {
        mappingGridList.push('contents' + i);
    }

    var listColumns = ['sales_prc', 'dedu_prc', 'defer_prc_pstv', 'defer_prc_ngtv', 'dlv_prc', 'sett_acc_prc', 'last_month_per_sett_acc_prc', 'past_year_same_month_per_sett_acc_prc'];
    var gridFirstColumns = ['판매금액', '(-) 공제금액', '(+) 유보금', '(-) 유보금', '(+) 배송비', '정산금액', '└전월대비', '└전년 동월대비'];

    for (var i = 0; i < gridFirstColumns.length; i++) {
        var row = new Object();
        row.title1 = gridFirstColumns[i];

        for (var j = 0; j < list.length; j++) {
            var value = list[j][listColumns[i]];

            if(listColumns[i] == 'dedu_prc') {
                if(isNull(value))
                    row[mappingGridList[j]] = '-';
                else {
                    var ratio = list[j]['sales_prc_per_dedu_prc_rto'];
                    row[mappingGridList[j]] = fnAddComma(ratio, 2) + "%<br>" + fnAddComma(value);
                }
            }
            else if(listColumns[i] == 'defer_prc_pstv') {
                if(isNull(value))
                    row[mappingGridList[j]] = '-';
                else {
                    var ratio = list[j]['sales_prc_per_defer_prc_pstv_rto'];
                    row[mappingGridList[j]] = fnAddComma(ratio, 2) + "%<br>" + fnAddComma(value);
                }
            }
            else if(listColumns[i] == 'defer_prc_ngtv') {
                if(isNull(value))
                    row[mappingGridList[j]] = '-';
                else {
                    var ratio = list[j]['sales_prc_per_defer_prc_ngtv_rto'];
                    row[mappingGridList[j]] = fnAddComma(ratio, 2) + "%<br>" + fnAddComma(value);
                }
            }
            else if(listColumns[i] == 'last_month_per_sett_acc_prc' || listColumns[i] == 'past_year_same_month_per_sett_acc_prc') {
                if (value < 0)
                    row[mappingGridList[j]] = "<span class='text-red'>" + fnAddComma(value) + "</span>";
                else if (value > 0)
                    row[mappingGridList[j]] = "<span class='text-blue'>+" + fnAddComma(value) + "</span>";
                else if (value == 0)
                    row[mappingGridList[j]] = value;
                else     
                    row[mappingGridList[j]] = '-';
            }
            else {
                row[mappingGridList[j]] = fnAddComma(value);
            }
        }    

        gridData.push(row);
    }
    return gridData;            
};

// 과거 정산금현황 월별 상세보기 그리드용 컬럼 반환 함수
var makeMonthGridColumns = function(list) {
    var gridColumns = new Array();
    gridColumns.push({ 'header': '전체', 'name': 'title1' });

    for (var i = 0; i < list.length; i++) {
        var header = convertDate_YYYYMM(list[i].sett_acc_dt, "-", "", true);
        gridColumns.push({ 'header': header, 'name': 'contents'+(i+1) });
    }

    return gridColumns;              
};

// 월별 그래프용 데이터 반환 함수
var makeMonthChartData = function(list, name) {
    var data = new Array();

    for (var i = 0; i < list.length; i++) {
        if(list[i][name] != null)
            data.push(list[i][name]);
        else 
            data.push(0);
    }

    return data;              
};

// 월별 그래프용 컬럼 반환 함수
var makeMonthChartColumns = function(list) {
    var columns = new Array();

    for (var i = 0; i < list.length; i++) {
        var header = convertDate_YYYYMM(list[i].sett_acc_dt, "-", "", true);
        columns.push(header);
    }

    return columns;              
};

// 정산금 현황 조회하기
var search = function () {
    var startDateArray = $('#datepicker-input-start').val().split('-');
    var endDateArray = $('#datepicker-input-end').val().split('-');
    var sales_find_stt_dt = startDateArray[0] + startDateArray[1];
    var sales_find_end_dt = endDateArray[0] + endDateArray[1];
    var param = {
        "sales_find_stt_dt": sales_find_stt_dt,
        "sales_find_end_dt": sales_find_end_dt,
    };

    var mallCd = $('#mallSelect').val();
    if (mallCd != null && mallCd != "")
        param.mall_cd = mallCd;

    updateSearchData(param);    
    updateSummaryPeriod(param);
};

var updateSearchData = function(param) {
    $.get("/sub/past/pastMonthInfo", $.param(param), function (res) {
        var sett_acc_month = res.sett_acc_month;

        // 과거 정산금현황 그래프 갱신
        monthBarChart.data.labels = makeMonthChartColumns(sett_acc_month);
        monthBarChart.data.datasets[0].data = makeMonthChartData(sett_acc_month, 'sett_acc_prc');
        monthBarChart.update();

        // 조회 시 사용된 몰 이름 변경
        var mallNm = "전체";
        var mallCd = $('#mallSelect').val();
        if (mallCd != null && mallCd != "") {
            mallNm = $('#mallSelect option:selected').text();
        }

        // 요약 표시
        var dataColumns = ['sales_prc_sum', 'dedu_prc_sum', 'sale_prc_sum_per_dedu_prc_sum_rto', 'defer_prc_pstv_sum', 'sale_prc_sum_per_defer_prc_pstv_sum_rto', 'defer_prc_ngtv_sum', 'sale_prc_sum_per_defer_prc_ngtv_sum_rto', 'dlv_prc_sum',
            'sett_acc_prc_sum', 'sales_prc_avg', 'dedu_prc_avg', 'sale_prc_avg_per_dedu_prc_avg_rto', 'defer_prc_pstv_avg', 'sale_prc_avg_per_defer_prc_pstv_avg_rto', 'defer_prc_ngtv_avg', 'sale_prc_avg_per_defer_prc_ngtv_avg_rto', 'dlv_prc_avg',
            'sett_acc_prc_avg'];

        if (!checkEmptyData(res, dataColumns)) {
            // 과거 정산금현황 요약 그리드 컬럼 변경
            var statusGridColumns = grid2.getColumns();
            statusGridColumns[0].header = mallNm;
            grid2.setColumns(statusGridColumns);

            // 과거 정산금현황 요약 그리드 갱신
            grid2.resetData(createStatusData(res));

            $("#status_grid_1").css("display", "block");
            $("#status_grid_1_noData").css("display", "none");
        }
        else {
            $("#status_grid_1").css("display", "none");
            $("#status_grid_1_noData").css("display", "block");
        }

        // 월별 상세보기 표시
        var listColumns = ['sales_prc', 'dedu_prc', 'sales_prc_per_dedu_prc_rto', 'defer_prc_pstv', 'sales_prc_per_defer_prc_pstv_rto', 'defer_prc_ngtv', 'sales_prc_per_defer_prc_ngtv_rto', 'dlv_prc',
            'sett_acc_prc', 'last_month_per_sett_acc_prc', 'past_year_same_month_per_sett_acc_prc'];

        if (!checkEmptyList(sett_acc_month, listColumns)) {
             // 과거 정산금현황 월별 상세보기 그리드 컬럼
            var monthGridColumns = grid.getColumns();
            // 과거 정산금현황 월별 상세보기 그리드 컬럼 변경
            monthGridColumns[0].header = mallNm;

            // 과거 정산금현황 월별 상세보기 그리드 갱신
            var monthGridData = grid.getData();
            for(var i = 0; i < sett_acc_month.length; i++) {
                monthGridColumns[i+1].header = convertDate_YYYYMM(sett_acc_month[i].sett_acc_dt, "-", "", true);
                changeMonthGridData(monthGridData, sett_acc_month[i], i);
            }
            grid.setColumns(monthGridColumns);
            grid.resetData(monthGridData);

            $("#status_grid_2").css("display", "block");
            $("#status_grid_2_noData").css("display", "none");
        }
        else {
            $("#status_grid_2").css("display", "none");
            $("#status_grid_2_noData").css("display", "block");
        }

        // 몰별 상세보기 그리드 갱신
        if (mallCd != null && mallCd != "") {
            detailGridData = null;
            
            $.get("/sub/past/pastMonthDetailInfo", $.param(param), function (detailRes) {
                updateDetailGrid(detailRes);
                $("#grid3Wrapper").show();
                grid3.refreshLayout();
            });
        }
        else {
            $("#grid3Wrapper").hide();
        }
    });
};

var createSummaryPeriod = function(res) {
    var htmlText = "";
    var dateRangeStr = $('#datepicker-input-start').val() + "~" + $('#datepicker-input-end').val();
    htmlText += "<div class='title_highlight'><p>조회기간 기준 (" + dateRangeStr + ")</p></div>";

    // table_summary - start
    htmlText += "<div class=\"table_summary\">";
    // 가장 높음 영역
    htmlText += "<div class=\"high_tb\">";
    htmlText += "<p class=\"lb\">가장 높음</p>";
    // 공제금액
    if (res.max_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd != res.min_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd) {
        htmlText += "<div class=\"mall_box mb2\">";
        htmlText += "<p class=\"red\">" + res.max_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd_nm + " <br>";
        htmlText += "<span class=\"percent\">" + fnAddComma(res.max_sales_prc_per_sett_acc_dedu_prc_rto, 2) + "%</span></p>";
        htmlText += "</div>";
    }
    // 유보금
    if (res.max_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd != res.min_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd) {
        htmlText += "<div class=\"mall_box mb2\">";
        htmlText += "<p class=\"red\">" + res.max_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd_nm + " <br>";
        htmlText += "<span class=\"percent\">" + fnAddComma(res.max_sales_prc_per_sett_acc_defer_prc_sum_rto, 2) + "%</span></p>";
        htmlText += "</div>";
    }
    // 배송비
    if (res.max_dlv_prc_mall_cd != res.min_dlv_prc_mall_cd) {
        htmlText += "<div class=\"mall_box mb2\">";
        htmlText += "<p class=\"puple\">" + res.max_dlv_prc_mall_cd_nm + "</p>";
        htmlText += "</div>";
    }
    htmlText += "</div>";

    // 가운데 영역
    htmlText += "<div class=\"text_info_tb tb2\">";
    // 공제금액
    if (res.max_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd != res.min_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd) {
        htmlText += "<div class=\"item_text_info\"><p>공제금액<br>(판매금액 대비)</p></div>";
    }
    // 유보금
    if (res.max_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd != res.min_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd) {
        htmlText += "<div class=\"item_text_info\"><p>유보금<br>(판매금액 대비)</p></div>";
    }
    // 배송비
    if (res.max_dlv_prc_mall_cd != res.min_dlv_prc_mall_cd) {
        htmlText += "<div class=\"item_text_info\"><p>배송비</p></div>";
    }
    htmlText += "</div>";

    // 가장 낮음 영역
    htmlText += "<div class=\"low_tb\">";
    htmlText += "<p class=\"lb\">가장 낮음</p>";
    // 공제금액
    if (res.max_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd != res.min_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd) {
        htmlText += "<div class=\"mall_box mb2\">";
        htmlText += "<p class=\"blue\">" + res.min_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd_nm + "<br>";
        htmlText += "<span class=\"percent\">" + fnAddComma(res.min_sales_prc_per_sett_acc_dedu_prc_rto, 2) + "%</span></p>";
        htmlText += "</div>";
    }
    // 유보금
    if (res.max_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd != res.min_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd) {
        htmlText += "<div class=\"mall_box mb2\">";
        htmlText += "<p class=\"blue\">" + res.min_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd_nm + " <br>";
        htmlText += "<span class=\"percent\">" + fnAddComma(res.min_sales_prc_per_sett_acc_defer_prc_sum_rto, 2) + "%</span></p>";
        htmlText += "</div>";
    }
    // 배송비
    if (res.max_dlv_prc_mall_cd != res.min_dlv_prc_mall_cd) {
        htmlText += "<div class=\"mall_box mb2\">";
        htmlText += "<p class=\"puple\">" + res.min_dlv_prc_mall_cd_nm + "</p>";
        htmlText += "</div>";
    }
    htmlText += "</div>";
    htmlText += "</div>"; // table_summary - end


    // desc_summary
    htmlText += "<p class=\"desc_summary\">";
    // 공제금액
    if (res.max_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd != res.min_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd) {
        htmlText += "- <b>공제금액</b>의 비중은 <span class=\"red\">" + res.max_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd_nm + "</span>에서 ";
        htmlText += "<span class=\"red\">" + fnAddComma(res.max_sales_prc_per_sett_acc_dedu_prc_rto, 2) + "%</span>로 가장 높았고, ";
        htmlText += "<span class=\"blue\">" + res.min_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd_nm + "</span>에서 ";
        htmlText += "<span class=\"blue\">" + fnAddComma(res.min_sales_prc_per_sett_acc_dedu_prc_rto, 2) + "%</span>로 가장 낮았습니다.<br>";
    }
    // 유보금
    if (res.max_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd != res.min_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd) {
        htmlText += "- <b>유보금</b>의 비중은 <span class=\"red\">" + res.max_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd_nm + "</span>에서 ";
        htmlText += "<span class=\"red\">" + fnAddComma(res.max_sales_prc_per_sett_acc_defer_prc_sum_rto, 2) + "%</span>로 가장 높았고, ";
        htmlText += "<span class=\"blue\">" + res.min_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd_nm + "</span>에서 ";
        htmlText += "<span class=\"blue\">" + fnAddComma(res.min_sales_prc_per_sett_acc_defer_prc_sum_rto, 2) + "%</span>로 가장 낮았습니다.<br>";
    }
    // 배송비
    if (res.max_dlv_prc_mall_cd != res.min_dlv_prc_mall_cd) {
        htmlText += "- <b>배송비</b>가 가장 높은 몰은 <span class=\"name\">" + res.max_dlv_prc_mall_cd_nm + "</span>이며 가장 ";
        htmlText += "낮은 몰은 <span class=\"name\">" + res.min_dlv_prc_mall_cd_nm + "</span>입니다.";
    }
    htmlText += "</p>";

    $("#dataThird").html(htmlText);
    $("#dataThird_m_Box").html(htmlText);
    $("#dataThird_m_Box_2").html(htmlText);
};

var updateSummaryPeriod = function(param) {
    $.get("/sub/past/pastSummaryPeriod", $.param(param), function (res) {
        var deduMallCheck = res.max_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd == res.min_sales_prc_per_sett_acc_dedu_prc_rto_mall_cd;
        var deferMallCheck = res.max_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd == res.min_sales_prc_per_sett_acc_defer_prc_sum_rto_mall_cd;
        var dlvMallCheck = res.max_dlv_prc_mall_cd == res.min_dlv_prc_mall_cd;
        
        // No data
        if(deduMallCheck && deferMallCheck && dlvMallCheck) {
            var dateRangeStr = "조회기간 기준 (" + $('#datepicker-input-start').val() + "~" + $('#datepicker-input-end').val() + ")";
            $("#thirdDateRange").text(dateRangeStr);
            visibleStatus("dataThird", false)
        }
        else {
            createSummaryPeriod(res);
            visibleStatus("dataThird", true)
        }                
    });
};

// 과거 정산금현황 요약 그리드용 함수
var makeStatusGridData = function (res) {
    var gridData = [{
        title1: '합계',
        contents1: fnAddComma(res.sales_prc_sum),
        contents2: fnAddComma(res.dedu_prc_sum) + '(' + fnAddComma(res.sale_prc_sum_per_dedu_prc_sum_rto, 2) + '%)',
        contents3: fnAddComma(res.defer_prc_sum) + '(' + fnAddComma(res.sale_prc_sum_per_defer_prc_sum_rto, 2) + '%)',
        contents4: fnAddComma(res.dlv_prc_sum),
        contents5: fnAddComma(res.sett_acc_prc_sum),
    }, {
        title1: '평균',
        contents1: fnAddComma(res.sales_prc_avg),
        contents2: fnAddComma(res.dedu_prc_avg) + '(' + fnAddComma(res.sale_prc_avg_per_dedu_prc_avg_rto, 2) + '%)',
        contents3: fnAddComma(res.defer_prc_avg) + '(' + fnAddComma(res.sale_prc_avg_per_defer_prc_avg_rto, 2) + '%)',
        contents4: fnAddComma(res.dlv_prc_avg),
        contents5: fnAddComma(res.sett_acc_prc_avg),
    },];

    return gridData;
};

// 과거 정산금현황 월별 상세보기 그리드용 데이터 변경 함수
var changeMonthGridData = function (data, result, index) {
    var mappingGridList = new Array();
    for(var i = 1; i <= 12; i++) {
        mappingGridList.push('contents' + i);
    }

    var listColumns = ['sales_prc', 'dedu_prc', 'defer_prc_pstv', 'defer_prc_ngtv', 'dlv_prc', 'sett_acc_prc', 'last_month_per_sett_acc_prc', 'past_year_same_month_per_sett_acc_prc'];

    for (var i = 0; i < listColumns.length; i++) {
        var value = result[listColumns[i]];

        if (listColumns[i] == 'dedu_prc') {
            if (isNull(value))
                data[i][mappingGridList[index]] = '-';
            else {
                var ratio = result['sales_prc_per_dedu_prc_rto'];
                data[i][mappingGridList[index]] = fnAddComma(ratio, 2) + "%<br>" + fnAddComma(value);
            }
        }
        else if (listColumns[i] == 'defer_prc_pstv') {
            if (isNull(value))
                data[i][mappingGridList[index]] = '-';
            else {
                var ratio = result['sales_prc_per_defer_prc_pstv_rto'];
                data[i][mappingGridList[index]] = fnAddComma(ratio, 2) + "%<br>" + fnAddComma(value);
            }
        }
        else if (listColumns[i] == 'defer_prc_ngtv') {
            if (isNull(value))
                data[i][mappingGridList[index]] = '-';
            else {
                var ratio = result['sales_prc_per_defer_prc_ngtv_rto'];
                data[i][mappingGridList[index]] = fnAddComma(ratio, 2) + "%<br>" + fnAddComma(value);
            }
        }
        else if(listColumns[i] == 'last_month_per_sett_acc_prc' || listColumns[i] == 'past_year_same_month_per_sett_acc_prc') {
            if (value < 0)
                data[i][mappingGridList[index]] = "<span class='text-red'>" + fnAddComma(value) + "</span>";
            else if (value > 0)
                data[i][mappingGridList[index]] = "<span class='text-blue'>+" + fnAddComma(value) + "</span>";
            else if (value == 0)
                data[i][mappingGridList[index]] = value;
            else
                data[i][mappingGridList[index]] = '-';
        }
        else {
            data[i][mappingGridList[index]] = fnAddComma(value);
        }
    }
};

// 매출/정산 비교 그리드용 데이터 반환 함수 with 매출금액
var makeSettAccNSalesMonthGridData = function(settAccList, salesList) {
    var gridData = new Array();

    var mappingGridList = new Array();
    for(var i = 1; i <= 12; i++) {
        mappingGridList.push('contents' + i);
    }

    var firstRow = new Object();
    var secondRow = new Object();

    firstRow.title1 = '매출금액';
    secondRow.title1 = '정산금액';

    for (var i = 0; i < settAccList.length; i++) {
        firstRow[mappingGridList[i]] = isNull(salesList[i]['sales_prc']) ? '-' : fnAddComma(salesList[i]['sales_prc']);
        secondRow[mappingGridList[i]] = isNull(settAccList[i]['sett_acc_prc']) ? '-' : fnAddComma(settAccList[i]['sett_acc_prc']);
    }

    gridData.push(firstRow);
    gridData.push(secondRow);

    return gridData;              
};

// 매출/정산 비교 조회하기
var searchWithSales = function () {
    var startDateArray = $('#datepicker-input-start').val().split('-');
    var endDateArray = $('#datepicker-input-end').val().split('-');
    var sales_find_stt_dt = startDateArray[0] + startDateArray[1];
    var sales_find_end_dt = endDateArray[0] + endDateArray[1];
    var param = {
        "sales_find_stt_dt": sales_find_stt_dt,
        "sales_find_end_dt": sales_find_end_dt,
    };

    var mallCd = $('#mallSelect').val();
    if (mallCd != null && mallCd != "")
        param.mall_cd = mallCd;

    $.get("/sub/past/pastMonthInfo", $.param(param), function (settAccRes) {
        $.get("/sub/sales/month", $.param(param), function (salesRes) {
            updateData(settAccRes, salesRes);
        });
    });

    updateSummaryPeriod(param);
};

var updateSalesNSettAccStatus = function(settAcc, sales) {
    if(isNull(settAcc)) {
        $("#status_settAccSum").text('-');
        $("#status_settAccAvg").text('-');
    }
    else {
        var sett_acc_prc_sum = isNull(settAcc.sett_acc_prc_sum) ? '-' : fnAddComma(settAcc.sett_acc_prc_sum);
        var sett_acc_prc_avg = isNull(settAcc.sett_acc_prc_avg) ? '-' : fnAddComma(settAcc.sett_acc_prc_avg);

        $("#status_settAccSum").text(sett_acc_prc_sum);
        $("#status_settAccAvg").text(sett_acc_prc_avg);
    }

    if(isNull(sales)) {
        $("#status_salesSum").text('-');
        $("#status_salesAvg").text('-');
    }
    else {
        var sales_sum_prc = isNull(sales.sales_sum_prc) ? '-' : fnAddComma(sales.sales_sum_prc);
        var sales_avg_prc = isNull(sales.sales_avg_prc) ? '-' : fnAddComma(sales.sales_avg_prc);

        $("#status_salesSum").text(sales_sum_prc);
        $("#status_salesAvg").text(fnAddComma(sales.sales_avg_prc));
    }
}

var updateData = function(settAcc, sales) {
    var sett_acc_month = settAcc.sett_acc_month;
    var sales_month = sales.sales_month;

    // 매출/정산 비교 그래프 갱신
    monthBarChart.data.labels = makeMonthChartColumns(sett_acc_month);
    monthBarChart.data.datasets[0].data = makeMonthChartData(sales_month, 'sales_prc');
    monthBarChart.data.datasets[1].data = makeMonthChartData(sett_acc_month, 'sett_acc_prc');
    monthBarChart.update();


    // 월별 상세보기 표시
    var settAccListColumns = ['sett_acc_prc'];
    var salesColumns = ['sales_prc'];
    var settAccCheck = checkEmptyList(sett_acc_month, settAccListColumns);
    var salesCheck = checkEmptyList(sales_month, salesColumns);

    if (!settAccCheck || !salesCheck) {
        // 매출/정산 비교 요약 갱신
        updateSalesNSettAccStatus(settAcc, sales);

        // 매출/정산 비교 그리드 갱신
        var monthGridColumns = grid2.getColumns();

        // 조회 시 사용된 몰 이름 변경
        var mallNm = "전체";
        var mallCd = $('#mallSelect').val();
        if (mallCd != null && mallCd != "") {
            mallNm = $('#mallSelect option:selected').text();
        }

        // 과거 정산금현황 월별 상세보기 그리드 컬럼 변경
        monthGridColumns[0].header = mallNm;

        var monthGridData = grid2.getData();
        for (var i = 0; i < sett_acc_month.length; i++) {
            monthGridColumns[i + 1].header = convertDate_YYYYMM(sett_acc_month[i].sett_acc_dt, "-", "", true);
            changeSettAccNSalesMonthGridData(monthGridData, sett_acc_month[i], sales_month[i], i);
        }
        grid2.setColumns(monthGridColumns);
        grid2.resetData(monthGridData);
        
        $("#status_2_grid_1").css("display", "block");
        $("#status_2_grid_1_noData").css("display", "none");
    }
    else {
        // 매출/정산 비교 요약 갱신
        updateSalesNSettAccStatus(null, null);

        $("#status_2_grid_1").css("display", "none");
        $("#status_2_grid_1_noData").css("display", "block");
    }
};

// 매출/정산 비교 그리드용 데이터 변경 함수 with 매출
var changeSettAccNSalesMonthGridData = function (data, sett_acc_month, sales_month, index) {
    var mappingGridList = new Array();
    for(var i = 1; i <= 12; i++) {
        mappingGridList.push('contents' + i);
    }

    data[0][mappingGridList[index]] = isNull(sales_month.sales_prc) ? '-' : fnAddComma(sales_month.sales_prc);
    data[1][mappingGridList[index]] = isNull(sett_acc_month.sett_acc_prc) ? '-' : fnAddComma(sett_acc_month.sett_acc_prc);
};

var detailGridData;
var updateDetailGrid = function(res) {
    var mallNm = $('#mallSelect option:selected').text();
    var engColumns = res.eng_cul;
    var korColumns = res.kor_cul;
    var settAcc = res.sett_acc;

    // 몰별 상세보기 그리드 컬럼 변경
    var detailGridColumns = grid3.getColumns();
    detailGridColumns[0].header = mallNm;

    for (var i = 0; i < settAcc.length; i++) {
        detailGridColumns[i + 1].header = convertDate_YYYYMM(settAcc[i]["COM_SETT_ACC_DT"], "-", "", true);
    }
    grid3.setColumns(detailGridColumns);

    // 몰별 상세보기 그리드 데이터 변경
    if(detailGridData == null)
        detailGridData = new Array();

    var mappingGridList = new Array();
    for(var i = 1; i <= 12; i++) {
        mappingGridList.push('contents' + i);
    }

    for (var i = 0; i < korColumns.length; i++) {
        var row = new Object();
        row.title1 = korColumns[i];//changeKorTextLine(korColumns[i], 18);

        for (var j = 0; j < settAcc.length; j++) {
            var value = settAcc[j][engColumns[i]];

            if(!isNumber(value))
                row[mappingGridList[j]] = isNull(value) ? '-' : value;
            else {    
                if(row.title1.indexOf("율") != -1 || row.title1.indexOf("률") != -1)
                    row[mappingGridList[j]] = isNull(value) ? '-' : fnAddComma(value) + "%";
                else     
                    row[mappingGridList[j]] = isNull(value) ? '-' : fnAddComma(value);
            }
        }    

        detailGridData.push(row);
    }

    grid3.resetData(detailGridData.slice(0, pagination._options.itemsPerPage));

    pagination.setTotalItems(detailGridData.length);
    pagination._currentPage = 0;
    pagination.reset();
};

var createStatusData = function(res) {
    var data = new Array();

    // 합계 데이터
    var sales_prc_sum = isNull(res.sales_prc_sum) ? '-' : fnAddComma(res.sales_prc_sum);
    var dlv_prc_sum = isNull(res.dlv_prc_sum) ? '-' : fnAddComma(res.dlv_prc_sum);
    var sett_acc_prc_sum = isNull(res.sett_acc_prc_sum) ? '-' : fnAddComma(res.sett_acc_prc_sum);

    var sale_prc_sum_per_dedu_prc_sum_rto = fnAddComma(nvl(res.sale_prc_sum_per_dedu_prc_sum_rto, 0), 2) + "%";
    var sale_prc_sum_per_defer_prc_pstv_sum_rto = fnAddComma(nvl(res.sale_prc_sum_per_defer_prc_pstv_sum_rto, 0), 2) + "%";
    var sale_prc_sum_per_defer_prc_ngtv_sum_rto = fnAddComma(nvl(res.sale_prc_sum_per_defer_prc_ngtv_sum_rto, 0), 2) + "%";

    var dedu_prc_sum = '-';
    if(!isNull(res.dedu_prc_sum))
        dedu_prc_sum = fnAddComma(res.dedu_prc_sum) + "(" + sale_prc_sum_per_dedu_prc_sum_rto + ")";

    var defer_prc_pstv_sum = '-';
    if (!isNull(res.defer_prc_pstv_sum))
        defer_prc_pstv_sum = fnAddComma(res.defer_prc_pstv_sum) + "(" + sale_prc_sum_per_defer_prc_pstv_sum_rto + ")";

    var defer_prc_ngtv_sum = '-';
    if (!isNull(res.defer_prc_ngtv_sum))
        defer_prc_ngtv_sum = fnAddComma(res.defer_prc_ngtv_sum) + "(" + sale_prc_sum_per_defer_prc_ngtv_sum_rto + ")";        
    
    var sumData = {
        title1: '합계',
        contents1: sales_prc_sum,
        contents2: dedu_prc_sum,
        contents3: defer_prc_pstv_sum,
        contents4: defer_prc_ngtv_sum,
        contents5: dlv_prc_sum,
        contents6: sett_acc_prc_sum,
    }
    
    data.push(sumData);

    // 평균 데이터
    var sales_prc_avg = isNull(res.sales_prc_avg) ? '-' : fnAddComma(res.sales_prc_avg);
    var dlv_prc_avg = isNull(res.dlv_prc_avg) ? '-' : fnAddComma(res.dlv_prc_avg);
    var sett_acc_prc_avg = isNull(res.sett_acc_prc_avg) ? '-' : fnAddComma(res.sett_acc_prc_avg);

    var sale_prc_avg_per_dedu_prc_avg_rto = fnAddComma(nvl(res.sale_prc_avg_per_dedu_prc_avg_rto, 0), 2) + "%";
    var sale_prc_avg_per_defer_prc_pstv_avg_rto = fnAddComma(nvl(res.sale_prc_avg_per_defer_prc_pstv_avg_rto, 0), 2) + "%";
    var sale_prc_avg_per_defer_prc_ngtv_avg_rto = fnAddComma(nvl(res.sale_prc_avg_per_defer_prc_ngtv_avg_rto, 0), 2) + "%";

    var dedu_prc_avg = '-';
    if (!isNull(res.dedu_prc_avg))
        dedu_prc_avg = fnAddComma(res.dedu_prc_avg) + "(" + sale_prc_avg_per_dedu_prc_avg_rto + ")";

    var defer_prc_pstv_avg = '-';
    if (!isNull(res.defer_prc_pstv_avg))
        defer_prc_pstv_avg = fnAddComma(res.defer_prc_pstv_avg) + "(" + sale_prc_avg_per_defer_prc_pstv_avg_rto + ")";

    var defer_prc_ngtv_avg = '-';
    if (!isNull(res.defer_prc_ngtv_avg))
        defer_prc_ngtv_avg = fnAddComma(res.defer_prc_ngtv_avg) + "(" + sale_prc_avg_per_defer_prc_ngtv_avg_rto + ")";        

    var avgData = {
        title1: '평균',
        contents1: sales_prc_avg,
        contents2: dedu_prc_avg,
        contents3: defer_prc_pstv_avg,
        contents4: defer_prc_ngtv_avg,
        contents5: dlv_prc_avg,
        contents6: sett_acc_prc_avg,
    }

    data.push(avgData);

    return data;  
};

var visibleStatus = function(id, visible) {
    var status = visible ? "block" : "none";
    var noDataStatus = !visible ? "block" : "none";

    $("#" + id).css("display", status);
    $("#" + id + "_m_Box").css("display", status);
    $("#" + id + "_m_Box_2").css("display", status);

    $("#no_" + id).css("display", noDataStatus);
    $("#no_" + id + "_m_Box").css("display", noDataStatus);
    $("#no_" + id + "_m_Box_2").css("display", noDataStatus);
};