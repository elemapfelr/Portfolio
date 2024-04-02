function fnInit(list) {
    // 은행 설정
    var selectBank = $("#bank_cert_m_seq_no");
    selectBank.empty();
    var options = [];
    $.each(list, function () {
        options.push("<option value=\"" + this.bank_cert_m_seq_no + "\">" + this.bank_nm + " </option>");
    });
    selectBank.append(options.join(""));
    fnViewChange(list[0].bank_cert_m_seq_no, list);
}

// 은행에 따라 등록칸 변경
function fnViewChange(bank_cert_m_seq_no, list) {
    initAcctFields();
    fnShowGuide(bank_cert_m_seq_no);
    var bankInfo = fnGetJsonData(bank_cert_m_seq_no, list);
    var keys = Object.keys(bankInfo);
    var key = "";
    var val = "";
    var target;
    var id;
    for (var i in keys) {
        key = keys[i];
        val = bankInfo[key];
        target = $("." + key); // 상위 dom
        id = key.replace("_use_yn", "");
        id = id.replace("_use_cd", "");
        
        if (val == 'N') {
            target.hide();
            $("#" + id).removeAttr('required');
        } else {
            target.show();
            if (id != "crc") {
                $("#" + id).prop("required", true);
            }

        }

        if(id != "bank_cert_m_seq_no" && id != "crc" && $("#" + id) != undefined)
            $("#" + id).val("");

        // 예금주 데이터 초기화
        $("#dpsi_nm").val("");
        $("#dpsi_nm").prop("required", true);
    }

    if (bank_cert_m_seq_no == 10) {
        // 계좌번호가 숫자 + 알파벳인 경우 validation 예외처리
        $("#acct_no").attr("data-valitype", "acctNo_numberNLetter");

        // 대구은행인 경우만 계좌번호와 비밀번호 타이틀 변경
        $("#acctNoTitle").text("안전계좌번호");
        $("#acctPwdTitle").text("안전계좌비밀번호");
    }
    else {
        $("#acctNoTitle").text("계좌번호");
        $("#acctPwdTitle").text("계좌비밀번호");
    }
}

// 은행에 따라 등록칸 변경
function fnViewChangeForMdfy(bank_cert_m_seq_no, list) {
    initAcctFields();
    fnShowGuide(bank_cert_m_seq_no);
    var bankInfo = fnGetJsonData(bank_cert_m_seq_no, list);
    var keys = Object.keys(bankInfo);
    var key = "";
    var val = "";
    var target;
    var id;
    for (var i in keys) {
        key = keys[i];
        val = bankInfo[key];
        target = $("." + key); // 상위 dom
        id = key.replace("_use_yn", "");
        id = id.replace("_use_cd", "");
        
        if (val == 'N') {
            target.hide();
            $("#" + id).removeAttr('required');
        } else {
            target.show();
            if (id != "crc") {
                $("#" + id).prop("required", true);
            }
        }
    }

    if (bank_cert_m_seq_no == 10) {
        // 계좌번호가 숫자 + 알파벳인 경우 validation 예외처리
        $("#acct_no").attr("data-valitype", "acctNo_numberNLetter");

        // 대구은행인 경우만 계좌번호와 비밀번호 타이틀 변경
        $("#acctNoTitle").text("안전계좌번호");
        $("#acctPwdTitle").text("안전계좌비밀번호");
    }
    else {
        $("#acctNoTitle").text("계좌번호");
        $("#acctPwdTitle").text("계좌비밀번호");
    }
}

function fnGetJsonData(bank_cert_m_seq_no, list) {
    var arrResult = list.filter(function (item) {
        if (item.bank_cert_m_seq_no == bank_cert_m_seq_no) {
            return item;
        }
    });
    return arrResult[0];
}

// 가이드 문구 처리
function fnShowGuide(bank_cert_m_seq_no) {
    var guide = $(".guide_register_detail");
    guide.empty();

    var html = getGuideInfo(bank_cert_m_seq_no);
    guide.append(html.join(""));
}

/**
 * 2020-06-23 데이터를 한곳에서 처리하기 위해서 은행별 도움말 문구를 분리
 * 2020-07-27 정산계좌 화면의 퍼블리싱 변경으로 인하여 accountModal.js에 은행별 도움말 문구 추가됨,
 * 서비스 반영 예정일(2020-08-14)이 다가오는데 아직도 기존 화면에 대한 내용은 미정의된 상태임
 * 추후, 기존 화면 변경 시 mngAcct.js와 accountModal.js의 도움말 문구를 한곳에서 처리하도록 수정 필요
 */
var getGuideInfo = function(bank_cert_m_seq_no) {
    var html = [];
    var seqNo = typeof(bank_cert_m_seq_no) == 'number' ? bank_cert_m_seq_no : parseInt(bank_cert_m_seq_no);

    switch (seqNo) {
        case 1: // 산업은행
            html.push("<b>산업은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 산업은행 홈페이지 <a href=\"http://www.kdb.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.kdb.co.kr)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ [뱅킹관리 → 계좌관리 → 계좌관리] 에서 등록");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 산업은행 홈페이지 <a href=\"http://www.kdb.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.kdb.co.kr)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ - A. 기업뱅킹 (USB 1개 사용) : [뱅킹관리 → 계좌관리 → 빠른조회대상계좌설정]에서 등록<br />");
            html.push("	③ - B. 기업뱅킹 (USB 2개 이상) : [대표관리자 인터넷뱅킹 접속 → 뱅킹관리 → 계좌관리 → 빠른조회대상계좌설정] 에서 등록");    
            break;
        case 2: // 기업은행
            html.push("<b>기업은행</b><br/>");
            html.push("	▣ 개인뱅킹/기업뱅킹 공통<br />");
            html.push("	① 기업은행 홈페이지 <a href=\"http://www.ibk.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.ibk.co.kr)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ 【뱅킹관리 → 계좌관리 → 빠른계좌조회서비스 신청/해지】에서 신청");
            html.push("	<br />");
            break;
        case 3: // 국민은행
            html.push("<b>국민은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 국민은행 홈페이지 <a href=\"http://www.kbstar.com\" target = \"_brank\" style=\"color: blue;\">(http://www.kbstar.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ 【뱅킹관리 → 계좌관리 → 빠른조회서비스】에서 신청");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 국민은행 홈페이지 <a href=\"http://www.kbstar.com\" target = \"_brank\" style=\"color: blue;\">(http://www.kbstar.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ 【뱅킹관리 → MASTER 설정 → 빠른조회서비스 등록/해제】에서 신청");
            break;
        case 4: // 수협은행
            html.push("<b>수협은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 수협은행 홈페이지 <a href=\"http://www.suhyup-bank.com\" target = \"_brank\" style=\"color: blue;\">(http://www.suhyup-bank.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ [MY정보 > 계좌정보관리 > 간편조회서비스]에서 등록");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 수협은행 홈페이지 <a href=\"http://www.suhyup-bank.com\" target = \"_brank\" style=\"color: blue;\">(http://www.suhyup-bank.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ [MY정보 > 계좌정보관리 > 간편조회서비스]에서 등록");
            break;
        case 5: // 농협
            html.push("<b>농협은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 농협 홈페이지 <a href=\"http://banking.nonghyup.com\" target = \"_brank\" style=\"color: blue;\">(http://banking.nonghyup.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ 【MY뱅크 → 뱅킹서비스관리 → 빠른조회】에서 등록/해지");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 농협 홈페이지 <a href=\"http://banking.nonghyup.com\" target = \"_brank\" style=\"color: blue;\">(http://banking.nonghyup.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ 【기업인터넷뱅킹 → 이용자관리 → 계좌관리 → 빠른 조회 계좌관리】에서 등록");
            break;
        case 6: // 우리
            html.push("<b>우리은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 우리은행 홈페이지 <a href=\"http://wooribank.com\" target = \"_brank\" style=\"color: blue;\">(http://wooribank.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ 【뱅킹관리 → 뱅킹계좌관리 → 스피드조회계좌등록/해지】에서 신청");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 우리은행 홈페이지 <a href=\"http://wooribank.com\" target = \"_brank\" style=\"color: blue;\">(http://wooribank.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ 【뱅킹관리 → 뱅킹계좌관리 → 스피드조회계좌등록/해지】에서 신청");
            break;
        case 7: // sc은행
            html.push("<b>SC은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 스탠다드차타드은행 홈페이지 <a href=\"https://www.standardchartered.co.kr/\" target = \"_brank\" style=\"color: blue;\">(https://www.standardchartered.co.kr/)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③ 인터넷뱅킹 가입고객 : 【서비스 및 설정 → 통장관리 → 스피드조회등록】에서 신청");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 스탠다드차타드은행 홈페이지 <a href=\"https://www.standardchartered.co.kr/\" target = \"_brank\" style=\"color: blue;\">(https://www.standardchartered.co.kr/)</a>에 접속<br />");
            html.push("	② 공인인증서를 통하여 인터넷뱅킹 로그인<br />");
            html.push("	③-A. First Biz 가입고객 : 【이용자관리 → 관리자 업무 → 계좌정보관리 → 스피드계좌관리】에서 등록<br>");
            html.push("	③-B. Straight2Bank 가입고객 : 【관리자화면 → 계좌정보관리 → 스피드계좌등록/해지】에서 등록");
            break;
        case 8: // 신한은행
            html.push("<b>신한은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 신한은행 홈페이지 <a href=\"http://www.shinhan.com\" target = \"_brank\" style=\"color: blue;\">(http://www.shinhan.com)</a>에 접속<br />");
            html.push("	② 좌측중앙 [간편조회서비스] > [계좌조회] > 로그인(홈페이지 회원 아이디와 비밀번호 필요)<br />");
            html.push("	③ 로그인후 좌측상단 [계좌조회] > [간편계좌관리] > [간편계좌조회 추가하기]");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 신한은행 홈페이지 <a href=\"http://www.shinhan.com\" target = \"_brank\" style=\"color: blue;\">(http://www.shinhan.com)</a>에 접속<br />");
            html.push("	② 좌측중앙 [간편조회서비스] > [계좌조회] > 로그인(홈페이지 회원 아이디와 비밀번호 필요)<br />");
            html.push("	③ 로그인후 좌측상단 [계좌조회] > [간편계좌관리] > [간편계좌조회 추가하기]");
            break;
        case 9: // 씨티은행
            html.push("<b>씨티은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 씨티은행 홈페이지 <a href=\"http://www.citibank.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.citibank.co.kr)</a>에 접속<br />");
            html.push("	② 빠른조회 서비스 신청 - [개인 로그인 > 웹회원가입 > 웹회원등록]");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 씨티은행 홈페이지 <a href=\"http://www.citibank.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.citibank.co.kr)</a>에 접속<br />");
            html.push("	② [법인 로그인 > 웹회원가입 > 기업인터넷뱅킹 > 인증서 로그인> CAT-i 메뉴 > 이용자관리 > 빠른조회서비스]에서 등록");
            break;
        case 10: // 대구은행
            html.push("<b>대구은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 대구은행 홈페이지 <a href=\"https://www.dgb.co.kr\" target = \"_brank\" style=\"color: blue;\">(https://www.dgb.co.kr)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [안전계좌조회 > 안전계좌신청]에서 등록");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 대구은행 홈페이지 <a href=\"https://www.dgb.co.kr\" target = \"_brank\" style=\"color: blue;\">(https://www.dgb.co.kr)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [안전계좌조회 > 안전계좌신청]에서 등록");
            break;
        case 11: // 부산은행
            html.push("<b>부산은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 부산은행 홈페이지 <a href=\"http://www.busanbank.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.busanbank.co.kr)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [메인화면중앙 > 빠른조회서비스 > 개인빠른조회 계좌등록]에서 등록");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 부산은행 홈페이지 <a href=\"http://www.busanbank.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.busanbank.co.kr)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [메인화면중앙 > 빠른조회서비스 > 기업빠른조회 계좌등록]에서 등록");
            break;
        case 12: // 광주은행
            html.push("<b>광주은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 광주은행 홈페이지 <a href=\"http://www.kjbank.com\" target = \"_brank\" style=\"color: blue;\">(http://www.kjbank.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [마이뱅킹관리 > 계좌통합관리 > 빠른서비스 사용계좌관리]에서 등록");
            html.push("	<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① 광주은행 홈페이지 <a href=\"http://www.kjbank.com\" target = \"_brank\" style=\"color: blue;\">(http://www.kjbank.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [사용자관리 > 계좌통합관리 > 빠른서비스 계좌등록]에서 등록");
            break;
        case 13: // 제주은행
            html.push("<b>제주은행</b><br/>");
            html.push("	▣ 개인/기업뱅킹<br />");
            html.push("	① 제주은행 홈페이지 <a href=\"http://www.e-jejubank.com\" target = \"_brank\" style=\"color: blue;\">(http://www.e-jejubank.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [사용자관리 > 바로바로서비스 신청]에서 신청 <br />");
            break;
        case 14: // 전북은행
            html.push("<b>전북은행</b><br/>");
            html.push("	▣ 개인/기업뱅킹<br />");
            html.push("	① 전북은행 홈페이지 <a href=\"http://www.jbbank.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.jbbank.co.kr)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [뱅킹관리 > 계좌관리 > 바로바로서비스 계좌관리]에서 등록 <br />");
            break;
        case 15: // 경남은행
            html.push("<b>경남은행</b><br/>");
            html.push("	▣ 개인/기업뱅킹<br />");
            html.push("	① 경남은행 홈페이지 <a href=\"http://www.knbank.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.knbank.co.kr)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [왼쪽상단 My Banking > 계좌관리> 빠른서비스 계좌관리]에서 등록 <br />");
            break;
        case 16: // 새마을금고
            html.push("<b>새마을금고</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① 새마을금고 홈페이지 <a href=\"http://www.kfcc.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.kfcc.co.kr)</a>에 접속<br />");
            html.push("	② 개인뱅킹 클릭<br />");
            html.push("	③ 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	④ [뱅킹관리 > 계좌관리 > 즉시조회 계좌관리] 클릭<br />");
            html.push("	⑤ 보안매체 (OTP 또는 보안카드) 인증 및 공인인증서 인증<br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① [새마을금고 영업점]에서 신청<br />");
            break;
        case 17: // 우체국
            html.push("<b>우체국</b><br/>");
            html.push("	▣ 개인/기업뱅킹<br />");
            html.push("	① 우체국 홈페이지 <a href=\"http://www.epostbank.go.kr\" target = \"_brank\" style=\"color: blue;\">(http://www.epostbank.go.kr)</a>에 접속<br />");
            html.push("	② [예금간편서비스 > 간편조회계좌등록]에서 등록<br />");
            break;
        case 18: // 하나은행
            html.push("<b>KEB하나은행</b><br/>");
            html.push("	▣ 개인뱅킹<br />");
            html.push("	① KEB하나은행 홈페이지 <a href=\"http://www.kebhana.com\" target = \"_brank\" style=\"color: blue;\">(http://www.kebhana.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [마이하나 > 계좌정보관리 > 빠른조회관리]에서 신청 <br />");
            html.push("	<br />");
            html.push("	▣ 기업뱅킹<br />");
            html.push("	① KEB하나은행 홈페이지 <a href=\"http://www.kebhana.com\" target = \"_brank\" style=\"color: blue;\">(http://www.kebhana.com)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	 - 기업/CMS 로 분류되며, CMS인 경우 지점방문 후 신청해야 합니다.<br />");
            html.push("	③ [뱅킹관리 > 계좌관리 > 빠른조회계좌관리]에서 신청 <br />");
            break;            
        case 19: // 신협
            html.push("<b>신협은행</b><br/>");
            html.push("	▣ 개인/기업뱅킹<br />");
            html.push("	① 신협 홈페이지 <a href=\"http://openbank.cu.co.kr\" target = \"_brank\" style=\"color: blue;\">(http://openbank.cu.co.kr)</a>에 접속<br />");
            html.push("	② 좌측중앙[조회전용 > 조회전용서비스 > 신규 > 계좌등록/해지]에서 등록<br />");
            break;
        case 20: // 산림조합
            html.push("<b>산림조합</b><br/>");
            html.push("	▣ 개인/기업뱅킹<br />");
            html.push("	① 산림조합 홈페이지 <a href=\"http://banking.nfcf.or.kr/index.jsp\" target = \"_brank\" style=\"color: blue;\">(http://banking.nfcf.or.kr/index.jsp)</a>에 접속<br />");
            html.push("	② 공인인증서를 통한 인터넷뱅킹에 로그인<br />");
            html.push("	③ [계좌관리> 빠른조회계좌관리 > 이용계좌등록]에서 등록<br />");
            break;    
        default:
            break;
    }

    return html;
};

var changeRegModalData = function() {
    $("#regAcctTestSuccYN").val("N");
};

// 계좌 등록
var regAcctForJoinStep6 = function() {
    if (!isVali()) { 
        return false; 
    }

    if($("#regAcctTestSuccYN").val() != "Y") {
        showAlert("계정 테스트 성공 후 등록 가능합니다.");
        return;
    }

    var bankInfo = fnGetJsonData($("#bank_cert_m_seq_no").val(), _bankList);

    // 기본 공통 값
    var param = {
        "bank_cert_m_seq_no": $("#bank_cert_m_seq_no").val(),
        "reco_yn": "N"
    };
    var input = $(".frm_account_my").find("[required]");
    var jqThis;
    $.each(input, function () {
        jqThis = $(this);
        if (nonNull(jqThis.val())) {
            param[jqThis.attr("id")] = jqThis.val();
        }
    });

    if (bankInfo.crc_use_cd == "S") {
        param.crc = $("#crc").val();
    }

    $.ajax({
        url: '/sub/my/account'
        , type: 'post'
        , async: false
        , dataType: 'text'
        , contentType: 'application/json'
        , data: JSON.stringify([param])
        , success: function (res) {
            showAlert("계좌가 등록되었습니다.", function () {
                updateAcctListForJoinStep6();
            });
        }
        , error: function (error) {
            // 2020-05-18 기존의 등록된 계좌 번호와 동일한 경우 undefine 문구 노출됨
            showAlert("요청이 실패하였습니다. <br>입력하신 정보를 다시 확인해주세요.");
            // if (isJsonString(error.responseText)) {
            // 	var data = JSON.parse(error.responseText);
            // 	showAlert(data.comment);
            // } else {
            // 	showAlert("저장실패 하였습니다. <br> 관리자에게 문의하세요.");
            // }
        }
    });
};

// 계좌 등록 후 화면 처리
var updateAcctListForJoinStep6 = function() {
    $.ajax({
        url: '/sub/member/join_step6/acct'
        , type: 'get'
        , async: false
        , dataType: 'json'
        , contentType: 'application/json'
        , success: function (res) {
            // 계좌 상태 설정
            var htmlText = '';
            htmlText += '<p class="all">전체 ' + (res.all_acct_cnt - res.del_acct_cnt) + ' /</p>';
            htmlText += '<p class="normal">정상 ' + res.nor_acct_cnt + ' /</p>';
            htmlText += '<p class="error">오류 ' + res.err_acct_cnt + ' /</p>';
            htmlText += '<p class="ins">점검 ' + res.ins_acct_cnt + '</p>';
            htmlText += '<button class="register_acct" onclick="pressedBtnRegAcct();">계좌 등록</button>';
            $("#acctStatus").html(htmlText);

            // 계좌 목록 설정
            htmlText = '<li class="account_my_title2">정산계좌 등록현황</li>';
            for(var i = 0; i < res.acct.length; i++) {
                htmlText += '<li class="clearfix ' + (i==0?'border_none':'') + '" onclick="javascript:activeRow(this);">';
                htmlText += '<div class="summary_col">';
                // 은행명 & 로고 설정
                htmlText += '    <div class="col col1">';
                htmlText += '        <img src="/assets/images/bank/' + res.acct[i].bank_cd + '.png" alt="">';
                htmlText += '        <p class="bank">' + res.acct[i].bank_nm + '</p>';
                htmlText += '    </div>';

                // 계좌 번호 설정
                htmlText += '    <div class="col col2">';
                htmlText += '        <p>' + res.acct[i].acct_no + '</p>';
                htmlText += '    </div>';

                // 계좌 잔액 설정
                htmlText += '    <div class="col col3">';
                if(res.acct[i].acct_prc == null || res.acct[i].acct_prc == '')
                    htmlText += '        <p>0원</p>';
                else 
                    htmlText += '        <p>' + fnAddComma(res.acct[i].acct_prc) + '원</p>';
                htmlText += '    </div>';

                // 정산몰 설정
                htmlText += '    <div class="col col4">';
                htmlText += '        <p>';
                if(res.acct[i].mall_l.length == 0)
                    htmlText += '없음';
                else if(res.acct[i].mall_l.length == 1)
                    htmlText += res.acct[i].mall_l[0].mall_cd_nm;
                else
                    htmlText += res.acct[i].mall_l[0].mall_cd_nm + ' 외 ' + (res.acct[i].mall_l.length-1) + '개';
                htmlText += '        </p>';

                // 정산몰 목록 설정
                if(res.acct[i].mall_l.length > 0) {
                    htmlText += '        <div class="all_mall_list">';
                    for(var j = 0; j < res.acct[i].mall_l.length; j++) {
                        htmlText += '           <p class="mall"><img src="/imagefile/' + res.acct[i].mall_l[j].stor_path + res.acct[i].mall_l[j].stor_file_nm + '" alt="몰 로고"> ' + res.acct[i].mall_l[j].mall_cd_nm + '</p>';
                    }
                    htmlText += '        </div>';
                }
                htmlText += '    </div>';

                // 업데이트 일자 설정
                htmlText += '    <div class="col col5">';
                if(res.acct[i].cust_acct_sts_cd != 'INQ' && res.acct[i].acct_prc_mod_ts != null) {
                    htmlText += '        <img src="/assets/images/main/refresh.png" alt="">';
                    htmlText += '        <p class="date">업데이트 일자: ' + res.acct[i].acct_prc_mod_ts + '</p>';
                }
                else if(res.acct[i].cust_acct_sts_cd == 'INQ') {
                    htmlText += '<ul class="loading_motion">';
                    htmlText += '    <li class="active"></li>';
                    htmlText += '    <li></li>';
                    htmlText += '    <li></li>';
                    htmlText += '    <li></li>';
                    htmlText += '    <li></li>';
                    htmlText += '    <li></li>';
                    htmlText += '    <li></li>';
                    htmlText += '    <li></li>';
                    htmlText += '    <li></li>';
                    htmlText += '    <li></li>';
                    htmlText += '</ul>';
                }
                htmlText += '    </div>';
                htmlText += '</div>';

                // if(res.acct[i].cust_acct_sts_cd == 'INS') {
                //     htmlText += '<div class="error_type_2">';
                //     htmlText += '    <h1>점검 중 입니다.</h1>';
                //     htmlText += '</div>';
                // }

                // if(res.acct[i].cust_acct_sts_cd == 'ERR') {
                //     htmlText += '<div class="error_modal my_error_modal" style="display: none;">';
                //     htmlText += '    <h1 style="width: 80%">' + res.acct[i].acct_inq_rlt_cd_desc + '</h1>';
                //     htmlText += '    <ul class="error_modal_close">';
                //     htmlText += '        <li></li>';
                //     htmlText += '        <li></li>';
                //     htmlText += '    </ul>';
                //     htmlText += '</div>';
                // }

                htmlText += '<div class="detail_col">';
                htmlText += '    <div class="box_detail_acoount">';
                htmlText += '        <div class="title_dt_acct">정산계좌 정보 상세';
                htmlText += '            <div class="btn_mg_acct">';
                // 2020-08-21 마이페이지 -> 계좌 관리 화면 제거로 인하여 수정 버튼 제거
                // htmlText += '                <a href="/sub/my/account_edit/' + res.acct[i].cust_acct_seq_no + '" class="edit_acct"></a>';
                htmlText += '                <a href="javascript:void(0);" onclick="javascript:btnPressedDelete(this);" data-cust_acct_seq_no="' + res.acct[i].cust_acct_seq_no + '" data-cust_acct_sts_cd="' + res.acct[i].cust_acct_sts_cd + '" class="delete_acct"></a>';
                htmlText += '            </div>';
                htmlText += '        </div>';
                htmlText += '        <div class="list_dt_info">';
                htmlText += '            <div class="date_detail">';
                htmlText += '                <p>등록일시 ' + res.acct[i].reg_ts + '</p>';
                htmlText += '                <p>수정일시 ' + res.acct[i].mod_ts + '</p>';
                htmlText += '            </div>';
                htmlText += '            <div class="item_dt_info">';
                htmlText += '                <span class="lb">은행명</span>';
                htmlText += '                <p class="txt_dt">' + res.acct[i].bank_nm + '</p>';
                htmlText += '            </div>';

                if(res.acct[i].bank_id_crypt_val != null) {
                    htmlText += '            <div class="item_dt_info">';
                    htmlText += '                <span class="lb">빠른조회<br>은행아이디</span>';
                    htmlText += '                <p class="txt_dt">' + res.acct[i].bank_id_crypt_val + '</p>';
                    htmlText += '            </div>';
                }

                htmlText += '            <div class="item_dt_info">';
                htmlText += '                <span class="lb">예금주</span>';
                htmlText += '                <p class="txt_dt">' + res.acct[i].dpsi_nm + '</p>';
                htmlText += '            </div>';
                htmlText += '            <div class="item_dt_info">';
                htmlText += '                <span class="lb">계좌번호</span>';
                htmlText += '                <p class="txt_dt">' + res.acct[i].acct_no + '</p>';
                htmlText += '            </div>';

                if(res.acct[i].ctz_biz_no_crypt_val != null) {
                    htmlText += '            <div class="item_dt_info">';
                    htmlText += '                <span class="lb">주민등록<br>(사업자)번호</span>';
                    htmlText += '                <p class="txt_dt">' + res.acct[i].ctz_biz_no_crypt_val + '</p>';
                    htmlText += '            </div>';
                }
										
                if(res.acct[i].crc != null) {
                    htmlText += '            <div class="item_dt_info">';
                    htmlText += '                <span class="lb">통화</span>';

                    $("#crc").val(res.acct[i].crc).attr("selected", "selected");
                    var crcName = $("#crc option:selected").text();

                    htmlText += '                <p class="txt_dt">' + crcName + '</p>';
                    htmlText += '            </div>';
                }

                if(res.acct[i].mall_l.length > 0) {
                    htmlText += '            <div class="item_dt_info">';
                    htmlText += '                <span class="lb">정산<br>판매몰</span>';
                    
                    var groupConcatStr = "";
                    for(var j = 0; j < res.acct[i].mall_l.length; j++) {
                        groupConcatStr += res.acct[i].mall_l[j].mall_cd_nm + (j < res.acct[i].mall_l.length-1 ? ", " : "");
                    }
                    htmlText += '                <p class="txt_dt">' + groupConcatStr + '</p>';
                    htmlText += '            </div>';
                }

                htmlText += '        </div>';
                htmlText += '    </div>';
                htmlText += '</div>';
                htmlText += '</li>';
            }
            
            $("#acctListArea").html(htmlText);

            // 삭제 불가 처리
            if($("#delConfirm").val() == 'N')
                $("a.delete_acct").remove();

            // 로딩바 애니메이션
            if ($(".loading_motion").length > 0) {
                var a = 0;
                setInterval(function () {
                    a++;
                    $(".loading_motion").each(
                        function () {
                            var li = $(this).find("li");
                            li.eq(a).addClass("active");
                            if (a == 13) {
                                a = 0;
                                $(".loading_motion li").removeClass("active");
                                $(".loading_motion li").eq(a).addClass("active");
                            }
                        });
                }, 150);
            }

            // 정산몰 리스트 이벤트
            $(".col4 p").mouseover(function () {
                var target = $(this).siblings(".all_mall_list");
                if (target.find("p").length > 15) {
                    target.find("p").eq(15).remove("img").html("...").css("text-align", "center").nextAll().remove();
                }
                target.show();
            });
            $(".col4 p").mouseout(function () {
                $(this).siblings(".all_mall_list").hide();
            });
            
            $("body").css("overflow", "visible");
            $(".my_section").hide();
            $(".account_my").show();
        }
        , error: function (error) {
            showAlert("계좌 조회 중 에러가 발생되었습니다.", function () {
                location.href = "/";
            });
        }
    });
};

var activeRow = function(obj) {
    if($(obj).hasClass("open")) {
        $(obj).removeClass("open");
    }
    else {
        $('.account_my li').removeClass("open");
        $(obj).addClass("open");
    }
}

var btnPressedDelete = function(obj) {
    var cust_acct_seq_no = $(obj).data("cust_acct_seq_no");
    var cust_acct_sts_cd = $(obj).data("cust_acct_sts_cd");
    
    if (cust_acct_sts_cd == 'INQ') {
        showAlert("조회중인 계좌는 삭제 하실수 없습니다.");
        return false;
    }

    var modalId = showConfirm("계좌를 삭제하시겠습니까?", function () {
        $.ajax({
            url: '/sub/my/account/' + cust_acct_seq_no,
            type: 'delete',
            async: false,
            dataType: 'text',
            contentType: 'application/json',
            success: function (data) {
                removeModal(modalId);
                showAlert("계좌가 삭제되었습니다.", function () {
                    updateAcctListForJoinStep6();
                });
            },
            error: function (res, status, error) {
                removeModal(modalId);
                showAlert("삭제에 실패 하였습니다.");
            }
        });
    });
};

var moveToIndex = function() {
    // 2021.11.22 프로모션 상품 있을 경우 대시보드 페이지로 이동.
    if ($("#usingGoodFlag").val() == 'true') {
        location.href = "/";
    } else {
        location.href = "/sub/payment/product";
    }
};

var initAcctFields = function() {
    $("#bank_id_error").css('display', 'none');
	$("#bank_passwd_error").css('display', 'none');
	$("#dpsi_nm_error").css('display', 'none');
	$("#acct_no_error").css('display', 'none');
	$("#acct_passwd_error").css('display', 'none');
	$("#ctz_biz_no_error").css('display', 'none');
    $("#crc_error").css('display', 'none');
};

var btnPressedTestAccount = function(bankInfo) {
    if (!isVali()) {
        return false; 
    }

    var param = {
        "bankCd": bankInfo.bank_cd
    };

    var input = $(".frm_account_my").find("[required]");
    var jqThis;
    $.each(input, function () {
        jqThis = $(this);
        if (nonNull(jqThis.val())) {
            param[jqThis.attr("id")] = jqThis.val();
        }
    });
    
    showLoadingModal();
    // beforeSend, complete 함수들로 로딩바 처리 안됨
    setTimeout(function () {
        testAccount(param);
    }, 100);
};

var testAccount = function(param) {
    $.ajax({
        url: '/sub/account/verifyAccount'
        , type: 'post'
        , async: false
        , data: param
        , success: function (res) {
            hideLoadingModal();

            if(res.errCode == "00000000") {
                $("#regAcctTestSuccYN").val("Y");
                showAlert("입력하신 정보로 계정 테스트를 성공하였습니다.");
            }
            else {
                showAlert("요청이 실패하였습니다. <br>(" + res.errMsg + ")");
            }
        }
        , error: function (error) {
            hideLoadingModal();
            showAlert("요청이 실패하였습니다. <br>입력하신 정보를 다시 확인해주세요.");
        }
    });
};