// 반품현황 월별 상세보기 그리드용 데이터 반환 함수
var makeMonthGridData = function(list) {
    var gridData = new Array();

    var mappingGridList = new Array();
    for(var i = 1; i <= 12; i++) {
        mappingGridList.push('contents' + i);
    }

    var listColumns = ['rtn_num', 'rtn_prc', 'rtn_num_rto'];
    var gridFirstColumns = ['반품건수', '반품금액', '반품률'];

    for (var i = 0; i < gridFirstColumns.length; i++) {
        var row = new Object();
        row.title1 = gridFirstColumns[i];

        for (var j = 0; j < list.length; j++) {
            var value = list[j][listColumns[i]];
            
            if(listColumns[i] == 'rtn_num_rto') {
                var rtnNum = list[j][listColumns[0]];
                if(isNull(rtnNum))
                    row[mappingGridList[j]] = '-';
                else
                    row[mappingGridList[j]] = isNull(value) ? '-' : fnAddComma(value, 2) + '%';
            }
            else     
                row[mappingGridList[j]] = isNull(value) ? '-' : fnAddComma(value);
        }    

        gridData.push(row);
    }

    return gridData;            
};

// 반품현황 월별 상세보기 그리드용 컬럼 반환 함수
var makeMonthGridColumns = function(list) {
    var gridColumns = new Array();
    gridColumns.push({ 'header': '전체', 'name': 'title1' });

    for (var i = 0; i < list.length; i++) {
        var header = convertDate_YYYYMM(list[i].rtn_dt, "-", "", true);
        gridColumns.push({ 'header': header, 'name': 'contents'+(i+1) });
    }

    return gridColumns;              
};

// 반품현황 그래프용 데이터 반환 함수
var makeMonthChartData = function(list) {
    var data = new Array();
    var lineData = new Array();
    var barData = new Array();

    for (var i = 0; i < list.length; i++) {
        lineData.push(nvl(list[i].rtn_num, 0));
        barData.push(nvl(list[i].rtn_prc, 0));
    }

    data.push(lineData);
    data.push(barData);
    return data;              
};

// 반품현황 그래프용 컬럼 반환 함수
var makeMonthChartColumns = function(list) {
    var columns = new Array();

    for (var i = 0; i < list.length; i++) {
        var header = convertDate_YYYYMM(list[i].rtn_dt, "-", "", true);
        columns.push(header);
    }

    return columns;              
};

var search = function () {
    var startDateArray = $('#datepicker-input-start').val().split('-');
    var endDateArray = $('#datepicker-input-end').val().split('-');
    var rtn_find_stt_dt = startDateArray[0] + startDateArray[1];
    var rtn_find_end_dt = endDateArray[0] + endDateArray[1];
    var param = {
        "rtn_find_stt_dt": rtn_find_stt_dt,
        "rtn_find_end_dt": rtn_find_end_dt,
    };

    var mallCd = $('#mallSelect').val();
    if (mallCd != null && mallCd != "")
        param.mall_cd = mallCd;

    updateSearchData(param);    
    updateSummaryPeriod(param);
};

var makeRtnStatus = function(res) {
    // 반품현황 요약 갱신
    if(isNull(res)){
        $("#status_rtnNum").text('-');
        $("#status_rtnPrc").text('-');
        $("#status_rtnNumAvg").text('-');
        $("#status_rtnPrcAvg").text('-');
        $("#status_rtnNumRtoAvg").text('-');
    }
    else {
        var rtn_num_sum = isNull(res.rtn_num_sum) ? '-' : fnAddComma(res.rtn_num_sum);
        var rtn_prc_sum = isNull(res.rtn_prc_sum) ? '-' : fnAddComma(res.rtn_prc_sum);
        var rtn_num_avg = isNull(res.rtn_num_avg) ? '-' : fnAddComma(res.rtn_num_avg, 2);
        var rtn_prc_avg = isNull(res.rtn_prc_avg) ? '-' : fnAddComma(res.rtn_prc_avg, 2);
        var rtn_num_avg_rto = fnAddComma(res.rtn_num_avg_rto, 2) + '%';
        
        $("#status_rtnNum").text(rtn_num_sum);
        $("#status_rtnPrc").text(rtn_prc_sum);
        // $("#status_rtnNumRto").text(fnAddComma(res.rtn_num_sum_rto)+'%');
        $("#status_rtnNumAvg").text(rtn_num_avg);
        $("#status_rtnPrcAvg").text(rtn_prc_avg);

        if(isNull(res.rtn_num_avg))
            $("#status_rtnNumRtoAvg").text('-');
        else
            $("#status_rtnNumRtoAvg").text(rtn_num_avg_rto);
    }
}

var updateSearchData = function(param) {
    $.get("/sub/return/rtnMonthInfo", $.param(param), function (res) {
        var rtn_month = res.rtn_month;
        
        // 반품현황 그래프 갱신
        var chartData = makeMonthChartData(rtn_month);
        monthBarChart.data.labels = makeMonthChartColumns(rtn_month);
        monthBarChart.data.datasets[0].data = chartData[0];
        monthBarChart.data.datasets[1].data = chartData[1];
        monthBarChart.update();

        // 월별 상세보기 표시
        var listColumns = ['rtn_num', 'rtn_prc', 'rtn_num_rto'];

        if(!checkEmptyList(rtn_month, listColumns)) {
            // 반품현황 요약 갱신
            makeRtnStatus(res);
            
            // 반품현황 월별 상세보기 갱신
            var monthGridColumns = grid2.getColumns();
            var mallNm = "전체";
            var mallCd = $('#mallSelect').val();
            if (mallCd != null && mallCd != "") {
                mallNm = $('#mallSelect option:selected').text();
            }
            monthGridColumns[0].header = mallNm;

            var monthGridData = grid2.getData();
            for(var i = 0; i < rtn_month.length; i++) {
                monthGridColumns[i+1].header = convertDate_YYYYMM(rtn_month[i].rtn_dt, "-", "", true);

                for (var j = 0; j < listColumns.length; j++) {
                    var value = rtn_month[i][listColumns[j]];
                    
                    if(listColumns[j] == 'rtn_num_rto') {
                        var rtnNum = rtn_month[i][listColumns[0]];
                        if(isNull(rtnNum))
                            monthGridData[j]['contents' + (i + 1)] = '-';
                        else
                            monthGridData[j]['contents' + (i + 1)] = isNull(value) ? '-' : fnAddComma(value, 2) + '%';
                    }
                    else     
                        monthGridData[j]['contents' + (i + 1)] = isNull(value) ? '-' : fnAddComma(value);
                } 
            }
            grid2.setColumns(monthGridColumns);
            grid2.resetData(monthGridData);
            
            $("#return_grid").css("display", "block");
            $("#return_grid_noData").css("display", "none");
        }
        else {
            // 반품현황 요약 갱신
            makeRtnStatus(null);

            $("#return_grid").css("display", "none");
            $("#return_grid_noData").css("display", "block");
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
    // 반품률
    if (res.max_rtn_num_rto_mall_cd != res.min_rtn_num_mall_cd) {
        htmlText += "<div class=\"mall_box mb2\">";
        htmlText += "<p class=\"red\">" + res.max_rtn_num_rto_mall_cd_nm + "</p>";
        htmlText += "</div>";
    }
    // 마켓유형별
    if (res.max_rtn_num_rto_mall_typ_cd != res.min_rtn_num_mall_typ_cd) {
        htmlText += "<div class=\"mall_box mb2\">";
        htmlText += "<p class=\"red\">" + res.max_rtn_num_rto_mall_typ_cd_nm + "</p>";
        htmlText += "</div>";
    }
    htmlText += "</div>";

    // 가운데 영역
    htmlText += "<div class=\"text_info_tb tb2\">";
    // 반품률
    if (res.max_rtn_num_rto_mall_cd != res.min_rtn_num_mall_cd) {
        htmlText += "<div class=\"item_text_info\"><p>반품률<br />(건수대비)</p></div>";
    }
    // 마켓유형별
    if (res.max_rtn_num_rto_mall_typ_cd != res.min_rtn_num_mall_typ_cd) {
        htmlText += "<div class=\"item_text_info\"><p>마켓유형별<br>(건수대비)</p></div>";
    }
    htmlText += "</div>";

    // 가장 낮음 영역
    htmlText += "<div class=\"low_tb\">";
    htmlText += "<p class=\"lb\">가장 낮음</p>";
    // 반품률
    if (res.max_rtn_num_rto_mall_cd != res.min_rtn_num_mall_cd) {
        htmlText += "<div class=\"mall_box mb2\">";
        htmlText += "<p class=\"blue\">" + res.min_rtn_num_mall_cd_nm + "</p>";
        htmlText += "</div>";
    }
    // 마켓유형별
    if (res.max_rtn_num_rto_mall_typ_cd != res.min_rtn_num_mall_typ_cd) {
        htmlText += "<div class=\"mall_box mb2\">";
        htmlText += "<p class=\"blue\">" + res.min_rtn_num_mall_typ_cd_nm + "</p>";
        htmlText += "</div>";
    }
    htmlText += "</div>";
    htmlText += "</div>"; // table_summary - end


    // desc_summary
    htmlText += "<p class=\"desc_summary\">";
    // 반품률
    if (res.max_rtn_num_rto_mall_cd != res.min_rtn_num_mall_cd) {
        htmlText += "- 건수대비 반품률은 <span class=\"blue\">" + res.min_rtn_num_mall_cd_nm + "</span>에서 가장 낮았고, ";
        htmlText += "<span class=\"red\">" + res.max_rtn_num_rto_mall_cd_nm + "</span>에서 가장 높았습니다.<br />";
    }
    // 마켓유형별
    if (res.max_rtn_num_rto_mall_typ_cd != res.min_rtn_num_mall_typ_cd) {
        htmlText += "- 마켓유형별 반품률은 <span class=\"red\">" + res.max_rtn_num_rto_mall_typ_cd_nm + "</span>에서 가장 높았고,<br />";
        htmlText += "<span class=\"blue\">" + res.min_rtn_num_mall_typ_cd_nm + "</span>에서 가장 낮았습니다.";
    }
    htmlText += "</p>";
    
    $("#dataThird").html(htmlText);
    $("#dataThird_m_Box").html(htmlText);
    $("#dataThird_m_Box_2").html(htmlText);
};

var updateSummaryPeriod = function(param) {
    $.get("/sub/return/rtnSummaryPeriod", $.param(param), function (res) {
        var mallCdCheck = res.max_rtn_num_rto_mall_cd == res.min_rtn_num_mall_cd;
        var mallTyCdCheck = res.max_rtn_num_rto_mall_typ_cd == res.min_rtn_num_mall_typ_cd;

        // No data
        if(mallCdCheck && mallTyCdCheck) {
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

// 반품분석 그래프용 데이터 반환 함수
var getMallGraphData = function(list) {
    var graphData = new Array();

    for (var i = 0; i < list.length; i++) {
        var row = new Object();
        row.mall = list[i].mall_cd_nm;
        row.litres = list[i].mall_rtn_num;
        graphData.push(row);
    }

    return graphData;
};

// 반품분석 그래프용 컬럼 반환 함수
var getMarketGraphData = function(list) {
    var graphData = new Array();

    for (var i = 0; i < list.length; i++) {
        var row = new Object();
        row.type = list[i].market_typ_cd_nm;
        row.litres = list[i].market_typ_rtn_num;
        graphData.push(row);
    }

    return graphData;
};

// 반품분석 그래프 조회하기
var searchGraph = function () {
    var startDateArray = $('#datepicker-input-start').val().split('-');
    var endDateArray = $('#datepicker-input-end').val().split('-');
    var rtn_find_stt_dt = startDateArray[0] + startDateArray[1];
    var rtn_find_end_dt = endDateArray[0] + endDateArray[1];
    var param = {
        "rtn_find_stt_dt": rtn_find_stt_dt,
        "rtn_find_end_dt": rtn_find_end_dt,
    };

    $.get("/sub/return/rtnGraphInfo", $.param(param), function (res) {
        if(res.rtn_num_sum == 0) {
            $("#graphNoDataArea").show();
            $("#mallGraphArea").hide();
            $("#marketGraphArea").hide();
        }
        else {
            $("#mallRtnNumSum").text(fnAddComma(res.rtn_num_sum)+'건');
            $("#marketRtnNumSum").text(fnAddComma(res.rtn_num_sum)+'건');

            chart.data = getMallGraphData(res.rtn_mall);
            chart4.data = getMarketGraphData(res.rtn_market_typ);   

            $("#graphNoDataArea").hide();
            $("#mallGraphArea").show();
            $("#marketGraphArea").show();
        }
    });

    updateSummaryPeriod(param);
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