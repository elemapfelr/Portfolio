var mallList = null;
const gItemsPerPage = 10;
// 몰 리스트 생성
var createMallList = function() {
    if(mallList == null || mallList.length == 0) {
        var htmlText = "";
        htmlText += '   <ul>';
        htmlText += '       <li class="fl_wrap">';
        htmlText += '           <dl class="th_line">';
        htmlText += '               <dt>마켓유형</dt>';
        htmlText += '               <dt>판매몰명</dt>';
        htmlText += '               <dt>아이디</dt>';
        htmlText += '               <dt>상태<p class="btn_info">?<span class="over_text"> \'셀러봇서비스\'는 셀러봇캐시에서 정산예정금 등 데이터 조회가 가능하다는 것을 의미하며 \'오류\'는 판매몰 오류를, \'점검\'은 판매몰이 현재 점검 중이라는 것을 의미합니다.</span></p></dt>';
        htmlText += '               <dt></dt>';
        htmlText += '           </dl>';
        htmlText += '       </li>';
        htmlText += '       <li class="text_center">데이터가 없습니다.</li>';
        htmlText += '   </ul>';

        $("#mallList").html(htmlText);
        $("#mallListPagingWrapper").css("display", "none");
        return;
    }
    
    var maxLen = (mallList.length > gItemsPerPage) ? gItemsPerPage : mallList.length;
    updateMallList(mallList.slice(0, maxLen));

    // 페이징 설정
    if(mallList.length > gItemsPerPage) {
        var pagination = new tui.Pagination('grid-pagination-container', {
            visiblePages: gItemsPerPage,
            itemsPerPage: gItemsPerPage,
            page: 1,
            centerAlign: false,
            firstItemClassName: 'tui-first-child',
            lastItemClassName: 'tui-last-child',
            usageStatistics: true
        });

        pagination.on('beforeMove', function (eventData) {
            var last = eventData.page * pagination._options.itemsPerPage;
            var start = last - pagination._options.itemsPerPage;

            if (last > pagination.totalItems) {
                last = pagination.totalItems;
            }
            
            updateMallList(mallList.slice(start, last));
        });

        pagination.setTotalItems(mallList.length);
        pagination._currentPage = 0;
        pagination.reset();
    }
};

// 몰 리스트 갱신
var updateMallList = function(list) {
    var htmlText = getHtmlForMallList(list, gItemsPerPage);
    $("#mallList").html(htmlText);
};

// 몰 리스트 설정
var getHtmlForMallList = function(list, itemsPerPage) {
    var htmlText = "";
    htmlText += '   <ul>';
    htmlText += '       <li class="fl_wrap">';
    htmlText += '           <dl class="th_line">';
    htmlText += '               <dt>마켓유형</dt>';
    htmlText += '               <dt>판매몰명</dt>';
    htmlText += '               <dt>아이디</dt>';
    htmlText += '               <dt>상태<p class="btn_info">?<span class="over_text"> \'셀러봇서비스\'는 셀러봇캐시에서 정산예정금 등 데이터 조회가 가능하다는 것을 의미하며 \'오류\'는 판매몰 오류를, \'점검\'은 판매몰이 현재 점검 중이라는 것을 의미합니다.</span></p></dt>';
    htmlText += '               <dt></dt>';
    htmlText += '           </dl>';
    htmlText += '       </li>';

    var maxLen = (list.length < itemsPerPage ) ? list.length : itemsPerPage;

    for (var i = 0; i < maxLen; i++) {
        htmlText += '       <li class="fl_wrap">';
        htmlText += '           <dl>';
        htmlText += '               <dd>' + list[i].mall_typ_cd_nm + '</dd>';
        htmlText += '               <dd class="text_center"><img src="/imagefile/' + list[i].stor_path + list[i].stor_file_nm + '" class="logo"></dd>';
        htmlText += '               <dd class="text_center">' + list[i].mall_cert_1st_id + '</dd>';

        if(list[i].cust_mall_sts_cd == "NR")
            htmlText += '               <dd><p class="store_con"><span class="bullet_blu"></span>셀러봇 서비스</p></dd>';
        else if(list[i].cust_mall_sts_cd == "INS")
            htmlText += '               <dd><p class="store_con"><span class="bullet_gry"></span>점검</p></dd>';
        else if(list[i].cust_mall_sts_cd == "ERR")
            htmlText += '               <dd><p class="store_con"><span class="bullet_red"></span>오류</p></dd>';
        else
            htmlText += '               <dd><p class="store_con"><span class="bullet_gry"></span>' + list[i].cust_mall_sts_cd_nm + '</p></dd>';

        // 현대홈쇼핑, NS홈쇼핑, KSINS은 별도의 설치 프로그램 필요, 자동로그인 지원 불가
        if(list[i].mall_cd == "020" || list[i].mall_cd == "028" || list[i].mall_cd == "035") {
            htmlText += '               <dd class="text_right pr30"><a href="javascript:jumpToMallNotLogin(\'' + list[i].mall_cd + '\');">이동하기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
        }
        else if($("#deviceType").val() == "PC") {
            if(list[i].cust_mall_sts_cd == "NR")
                htmlText += '               <dd class="text_right pr30"><a href="javascript:jumpToMall(' + list[i].cust_mall_seq_no + ');">자동로그인 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
            else    
                htmlText += '               <dd class="text_right pr30"><a href="javascript:jumpToMallNotLogin(\'' + list[i].mall_cd + '\');">이동하기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
        }
        else
            htmlText += '               <dd class="text_right pr30"><a href="javascript:jumpToMallNotLogin(\'' + list[i].mall_cd + '\');">이동하기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';

        htmlText += '           </dl>';
        htmlText += '       </li>';
    }

    htmlText += '   </ul>';
    
    return htmlText;
};

var jumpMap = null;
// 점프 사이트 등록 모달 설정
var createAddModalHtml = function(jump_cate_cd) {
    var htmlText = "";
    htmlText += '<div class="modal_popup position_r">';
    htmlText += '   <div class="modal_con pop_setting">';
    htmlText += '       <p class="mt05 mb02 txt_s12"><input type="checkbox" id="' + jump_cate_cd + '_CHECK_ALL" onclick="javascript:selectedAll(this);"> 전체 선택';
    htmlText += '       <div class="scroll">';
    htmlText += '           <ul class="fl_wrap" id="' + jump_cate_cd + '_LIST">';

    var jumpList = jumpMap[jump_cate_cd];
    for (var i = 0; i < jumpList.length; i++) {
        var id = jump_cate_cd + "_" + jumpList[i].jump_seq_no;

        // 사용자 점프 리스트 체크
        var hasJumpSeqNo = false
        var custJumpList = null;
        if(custJumpMap != null)
            custJumpList = custJumpMap[jump_cate_cd];
        
        if(custJumpList != null && custJumpList.length > 0) {
            custJumpList.forEach(function(item){ 
                if(item.jump_seq_no == jumpList[i].jump_seq_no)
                    hasJumpSeqNo = true;
            });
        }

        // IE11 지원안함
        // if(custJumpList.some(item => item.jump_seq_no === jumpList[i].jump_seq_no))
        if(hasJumpSeqNo)
            htmlText += '               <li id="' + id + '" onclick="javascript:pressedJumpItem(this);" class="current">'+ jumpList[i].jump_item_nm + '</li>';
        else
            htmlText += '               <li id="' + id + '" onclick="javascript:pressedJumpItem(this);">'+ jumpList[i].jump_item_nm + '</li>';
    }

    htmlText += '           </ul>';
    htmlText += '       </div>';
    htmlText += '       <p class="mt05 mb02">원하시는 사이트가 목록에 없을 경우, <a href="/sub/my/ask">1:1문의</a>를 통해 요청해주시길 바랍니다.</p>';
    htmlText += '       <div class="setting_select"><b id="' + jump_cate_cd + '_CNT">0건</b> 선택완료</div>';
    htmlText += '   </div>';
    htmlText += '</div>';
    return htmlText;                                    
};

// 점프 사이트 클릭 시 처리
var pressedJumpItem = function(obj) {
    if($("#" + obj.id).hasClass("current")) {
        // pass
    }
    else if($("#" + obj.id).hasClass("add_click")) {
        $("#" + obj.id).removeClass("add_click");
    }
    else {
        $("#" + obj.id).addClass("add_click");
    }

    var jump_cate_cd = obj.id.split("_")[0];
    var checkBoxAllId = jump_cate_cd + "_CHECK_ALL";
    var isSelected = $("input:checkbox[id='" + checkBoxAllId + "']").is(":checked");
    if(isSelected) {
        $("input:checkbox[id='" + checkBoxAllId + "']").prop("checked", false);
    }
    updateSelectedCount(jump_cate_cd);
};

// 전체 선택/해제
var selectedAll = function(obj) {
    var isSelected = $("input:checkbox[id='" + obj.id + "']").is(":checked");
    var jump_cate_cd = obj.id.split("_")[0];

    if(isSelected) {
        $("#" + jump_cate_cd + "_LIST").find("li").not(".current").addClass("add_click");
    }
    else {
        $("#" + jump_cate_cd + "_LIST").find(".add_click").removeClass("add_click");
    }

    updateSelectedCount(jump_cate_cd);
};

// 선택된 사이트들을 카운팅
var updateSelectedCount = function(jump_cate_cd) {
    var countId = jump_cate_cd + "_CNT";
    var selectedCount = $("#" + jump_cate_cd + "_LIST").find(".add_click").length;
    $("#" + countId).html(selectedCount + "건");
};

var createCustJumpListNoData = function() {
    var htmlText = "";
    htmlText += '<li class="text_center">데이터가 없습니다.</li>';
    $("#CUST_FINA_LIST").html(htmlText);
    $("#CUST_MAMG_LIST").html(htmlText);
    $("#CUST_PUCH_LIST").html(htmlText);
};

// 사용자의 등록된 점프 리스트
var custJumpMap = null;
var createCustJumpList = function() {
    if(custJumpMap == null) {
        createCustJumpListNoData();
        return;
    }

    var custJumpMapLength = Object.getOwnPropertyNames(custJumpMap).length;
    if(custJumpMapLength == 0) {
        createCustJumpListNoData();
        return;
    }

    for(var key in custJumpMap) {
        var htmlText = "";
        var jumpList = custJumpMap[key];
        var maxLen = (jumpList.length%3 == 0) ? jumpList.length/3 : (jumpList.length/3) + 1;
        maxLen = Math.floor(maxLen);

        for (var i = 0; i < maxLen; i++) {
            htmlText += '<li class="fl_wrap">';

            for (var j = 0; j < 3; j++) {
                var index = (i * 3) + j;
                if(index < jumpList.length) {
                    var id = "CUST_" + key + "_" + jumpList[index].cust_jump_seq_no;
                    var disabledOpt = (jumpList[index].auto_set_yn == "Y") ? "disabled" : "";

                    htmlText += '   <dl class="fl_wrap">';
                    htmlText += '       <dt><input type="checkbox" id="' + id + '" ' + disabledOpt + '></dt>';
                    htmlText += '       <dd>' + jumpList[index].jump_item_nm + ' <span class="fl_right pr30"><a href="javascript:jumpUrl(\'' + jumpList[index].jump_url + '\');">이동하기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></span></dd>';
                    htmlText += '   </dl>';
                }
            }

            htmlText += '</li>';
        }

        $("#CUST_" + key + "_LIST").html(htmlText);
    }
};

var updateCustJumpList = function() {
    $.post("/sub/jump/custJumpList", function (res) {
        custJumpMap = res;
        createCustJumpList();
    })
    .fail(function (response) {
        location.reload();
    });
};

// 관공서 리스트 생성
var createGOOFList = function() {
    var htmlText = "";
    htmlText += '<li class="fl_wrap">';
    
    var jumpList = jumpMap["GOOF"];
    for (var i = 0; i < jumpList.length; i++) {
        htmlText += '   <dl class="fl_wrap">';
        htmlText += '       <dd>' + jumpList[i].jump_item_nm + ' <span class="fl_right pr30"><a href="javascript:jumpUrl(\'' + jumpList[i].jump_url + '\');">이동하기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></span></dd>';
        htmlText += '   </dl>';
    }

    htmlText += '</li>';
    $("#GOOF_LIST").html(htmlText);
};

// 점프 사이트 등록
var addJumpSite = function(e, jump_cate_cd) {
    var selectedCount = $("#" + jump_cate_cd + "_LIST").find(".add_click").length;
    if(selectedCount == 0) {
        showAlert("등록하실 사이트를 선택해주세요.");
        // e.preventDefault();
        return false;
    }
    
    var list = new Array();
    $("#" + jump_cate_cd + "_LIST").find(".add_click").each(function(index, item){ 
        list.push(item.id.split("_")[1]);
    });
    
    var param = {
        "jumpSeqNoList": list.join(",")
    };
    $.post("/sub/jump/addJumpItems", $.param(param), function (res) {
        showAlert("등록되었습니다.");
        updateCustJumpList();
    })
    .fail(function (response) {
        showAlert("요청이 실패하였습니다.");
    });

    return true;
};

// 등록된 점프 사이트 삭제
var deleteJumpSite = function(jump_cate_cd) {
    var selectedCount = $("#CUST_" + jump_cate_cd + "_LIST").find("input[type='checkbox']:checked").length;
    if(selectedCount == 0) {
        showAlert("삭제하실 사이트를 선택해주세요.");
        return;
    }
    
    var list = new Array();
    $("#CUST_" + jump_cate_cd + "_LIST").find("input[type='checkbox']:checked").each(function(index, item){ 
        list.push(item.id.split("_")[2]);
    });
    
    var param = {
        "custJumpSeqNoList": list.join(",")
    };
    
    $.post("/sub/jump/deleteJumpItems", $.param(param), function (res) {
        showAlert("삭제되었습니다.");
        updateCustJumpList();
    })
    .fail(function (response) {
        showAlert("요청이 실패하였습니다.");
    });
};

// 자동로그인
var jumpToMall = function(seq) {
    var param = {
        "cust_mall_seq_no": seq
    };

    $.post("/sub/jump/mallInfo", $.param(param), function (res) {
        if(res == null) {
            showAlert("점프 가능한 데이터가 없습니다.");
            return;
        }
        else if(res.mall_cert_1st_id == null || res.mall_cert_1st_id == "") {
            showAlert("점프 가능한 ID가 없습니다.");
            return;
        }
        else if(res.mall_cert_1st_passwd == null || res.mall_cert_1st_passwd == "") {
            showAlert("점프 가능한 패스워드가 없습니다.");
            return;
        }

        var authParam = {
            "id": res.mall_cert_1st_id,
            "pw": res.mall_cert_1st_passwd,
        };

        if (res.passwd_step >= 1)
            authParam["param"] = res.mall_cert_2nd_passwd;

        if (res.cert_step >= 1)
            authParam["cert"] = res.sub_mall_cert_1st;

        if (res.cert_step >= 2)
            authParam["cert2"] = res.sub_mall_cert_2nd;

        var authList = new Array();
        authList.push(authParam);

        var mallParam = {
            "mall_cd": res.mall_cd,
            "auth": authList
        };
        
        var cmdParam = {
            "cmd": "AUTO_LOGIN",
            "args": mallParam
        };

        send(JSON.stringify(cmdParam));
    })
    .fail(function (response) {
        showAlert("데이터 조회에 실패하였습니다.\n다시 시도해 주시기 바랍니다.");
    });
};

var jumpToMallNotLogin = function(mall_cd) {
    var _win = window.open();

    var param = {
        "mall_cd": mall_cd
    };

    $.post("/sub/jump/basicMallInfo", $.param(param))
    .then(function(res) {
        if(res == null) {
            showAlert("점프 가능한 데이터가 없습니다.");
            return;
        }
        else if(res.mall_url == null || res.mall_url == "") {
            showAlert("점프 가능한 URL이 없습니다.");
            return;
        }

        _win.location = res.mall_url;
    })
    .fail(function (response) {
        showAlert("데이터 조회에 실패하였습니다.\n다시 시도해 주시기 바랍니다.");
    });
};

// 점프 사이트 이동
var jumpUrl = function(url) {
    window.open(url);
};

var download = function() {
    location.href = "/download/installer";
}