'use strict';

// Integer 형태의 날짜 정보를 지정된 포맷으로 변경
// ex) 2019년 3월 : convertDate_YYYYMM(yyyymm, "년 ", "월")
// ex) 2019-03월 : convertDate_YYYYMM(yyyymm, "-", "월", true)
var convertDate_YYYYMM = function (yyyyMM, afterYYYY, afterMM, fillZero) {
    var date = new Date(yyyyMM / 100, (yyyyMM % 100) - 1);
    var rtnStr = "";
    rtnStr += date.getFullYear() + afterYYYY;

    if((fillZero && date.getMonth() + 1) < 10)
        rtnStr += "0";

    rtnStr += (date.getMonth() + 1);
    rtnStr += afterMM;
    return rtnStr;
};

// Integer 형태의 날짜 정보를 Date형으로 반환
var stringToDate_YYYYMM = function(yyyyMM) {
    var dateStr = String(yyyyMM);
    var date = new Date(yyyyMM / 100, (yyyyMM % 100) - 1);
    return date;
};

// 금월 기준으로 인자 값이 월에 반영된 Date형 반환
// ex) 전월 : getAddMonth(new Date(), -1)
var getAddMonth = function(dateValue, intMonth) {
    var month = dateValue.getMonth();
    dateValue.setMonth(month + intMonth);
    return dateValue;
};

var changeKorTextLine = function (str, len) {
    var i, l = 0;
    for (i=0; i<str.length; i++) { 
        l += (str.charCodeAt(i) > 128) ? 2 : 1; 
        
        if (l > len) 
            return str.substring(0, i) + "<br>" + str.substring(i, str.length);
    } 
    return str;    
};

// 데이터 컬럼들의 빈 값 여부 반환
var checkEmptyData = function(data, columns) {
    if(data == null)
        return true;

    var total = 0;
    for(var i = 0; i < columns.length; i++) {
        var value = data[columns[i]];
        total += Math.abs(value);
    }

    if(total ==  0)
        return true;

    return false;
};

// 리스트의 빈 값 여부 반환
var checkEmptyList = function(list, columns) {
    if(list == null)
        return true;

    for(var i = 0; i < list.length; i++) {
        if(!checkEmptyData(list[i], columns))
            return false; 
    }

    return true;
};