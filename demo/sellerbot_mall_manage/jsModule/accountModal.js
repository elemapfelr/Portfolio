var initModal = function(type) {
    $("#" + type + "_bank_id_error").css('display', 'none');
    $("#" + type + "_bank_passwd_error").css('display', 'none');
    $("#" + type + "_dpsi_nm_error").css('display', 'none');
    $("#" + type + "_acct_no_error").css('display', 'none');
    $("#" + type + "_acct_passwd_error").css('display', 'none');
    $("#" + type + "_ctz_biz_no_error").css('display', 'none');
    $("#" + type + "_crc_error").css('display', 'none');
};

var showRegModal = function() {
    initModal("reg");
    $("#reg_bank_cert_m_seq_no").val(18);
    changeInputFields($("#reg_bank_cert_m_seq_no").val(), "reg");
    $("#regModal").css('display', 'flex');
};

var btnPressedGuideMov = function() {
    $('.account_mov_guide_container').show();
    $('.popup_box').fadeOut();
};

var onChangeBankSel = function(obj, type) {
    var value = $("#" + type + "_bank_cert_m_seq_no").val();
    changeInputFields(value, type);
};

// 은행별 입력 필드들 설정
var changeInputFields = function(value, type) {
    $("[required]").each(function(){
        $(this).prop("required", false);
    });

    var dataKeyList = [{"dataKey": "bankidyn", "targetId": "bank_id"}, // 빠른조회 은행아이디
                        {"dataKey": "bankpwyn", "targetId": "bank_passwd"}, // 빠른조회 은행비밀번호
                        {"dataKey": "acctnoyn", "targetId": "acct_no"}, // 계좌번호
                        {"dataKey": "acctpwyn", "targetId": "acct_passwd"}, // 계좌 비밀번호
                        {"dataKey": "ctznoyn", "targetId": "ctz_biz_no"}, // 주민등록 (사업자)번호
                        {"dataKey": "crccd", "targetId": "crc"}]; // 통화

    for(var i=0; i<dataKeyList.length; i++) {
        var id = "#" + type + "_" + dataKeyList[i].targetId;
        var data = $("#" + type + "_bank_cert_m_seq_no").find("option:selected").data(dataKeyList[i].dataKey);
        if(data == "Y") {
            $(id + "_area").show();
            $(id).prop("required", true);
        }
        else if(data == "S") {
            $(id + "_area").show();
        }
        else {
            $(id + "_area").hide();
            $(id).removeAttr('required');
        }
        
        $(id).val("");
    }

    // 예금주 데이터 초기화
    $("#" + type + "_" + "dpsi_nm").val("");
    $("#" + type + "_" + "dpsi_nm").prop("required", true);

    // 입금 확인용 계좌 여부 초기화
    if($("#cafe24_usr_yn").val() == 'Y')
        $("input:checkbox[id='" + type + "_reco_yn']").prop("checked", false);

    // 대구은행인 경우만 계좌번호와 비밀번호 타이틀 변경
    if (value == 10) {
        $("#" + type + "_acctNoTitle").text("안전계좌번호");
        $("#" + type + "_acctPwdTitle").text("안전계좌비밀번호");
        $("#" + type + "_acct_no").attr("data-valitype", "acctNo_numberNLetter");
    }
    else {
        $("#" + type + "_acctNoTitle").text("계좌번호");
        $("#" + type + "_acctPwdTitle").text("계좌비밀번호");
        $("#" + type + "_acct_no").attr("data-valitype", "acctNo");
    }
};

var btnPressedHelp = function(obj, type) {
    if (!$(obj).hasClass('on')) {
        changeBankInfo(type);
        $(obj).addClass('on');
        $("#" + type + "Modal").find('.account_info_guide').show();
    } else {
        $(obj).removeClass('on');
        $("#" + type + "Modal").find('.account_info_guide').hide();
    }
};

var changeBankInfo = function(type) {
    var html = [];
    var seqNo = $("#" + type + "_bank_cert_m_seq_no").val();
    if(typeof(seqNo) == 'string')
        seqNo = parseInt(seqNo);

    switch (seqNo) {
        case 1: // 산업은행
            html.push('<h3>산업은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>산업은행 홈페이지(<a href="http://www.kdb.co.kr" target = "_brank">http://www.kdb.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[뱅킹관리 → 계좌관리 → 계좌관리] 에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>산업은행 홈페이지(<a href="http://www.kdb.co.kr" target = "_brank">http://www.kdb.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>A. 기업뱅킹 (USB 1개 사용) : [뱅킹관리 → 계좌관리 → 빠른조회대상계좌설정]에서 등록<br />B. 기업뱅킹 (USB 2개 이상) : [대표관리자 인터넷뱅킹 접속 → 뱅킹관리 → 계좌관리 → 빠른조회대상계좌설정] 에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 2: // 기업은행
            html.push('<h3>기업은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹/기업뱅킹 공통</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>기업은행 홈페이지(<a href="http://www.ibk.co.kr" target = "_brank">http://www.ibk.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>【뱅킹관리 → 계좌관리 → 빠른계좌조회서비스 신청/해지】에서 신청</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 3: // 국민은행
            html.push('<h3>국민은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>국민은행 홈페이지(<a href="http://www.kbstar.com" target = "_brank">http://www.kbstar.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>【뱅킹관리 → 계좌관리 → 빠른조회서비스】에서 신청</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>국민은행 홈페이지(<a href="http://www.kbstar.com" target = "_brank">http://www.kbstar.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>【뱅킹관리 → MASTER 설정 → 빠른조회서비스 등록/해제】에서 신청</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 4: // 수협은행
            html.push('<h3>수협은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>수협은행 홈페이지(<a href="http://www.suhyup-bank.com" target = "_brank">http://www.suhyup-bank.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[MY정보 > 계좌정보관리 > 간편조회서비스]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>수협은행 홈페이지(<a href="http://www.suhyup-bank.com" target = "_brank">http://www.suhyup-bank.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[MY정보 > 계좌정보관리 > 간편조회서비스]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 5: // 농협
            html.push('<h3>농협은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>농협 홈페이지(<a href="http://banking.nonghyup.com" target = "_brank">http://banking.nonghyup.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>【MY뱅크 → 뱅킹서비스관리 → 빠른조회】에서 등록/해지</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>농협 홈페이지(<a href="http://banking.nonghyup.com" target = "_brank">http://banking.nonghyup.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>【기업인터넷뱅킹 → 이용자관리 → 계좌관리 → 빠른 조회 계좌관리】에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 6: // 우리
            html.push('<h3>우리은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>우리은행 홈페이지(<a href="http://wooribank.com" target = "_brank">http://wooribank.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>【뱅킹관리 → 뱅킹계좌관리 → 스피드조회계좌등록/해지】에서 신청</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>우리은행 홈페이지(<a href="http://wooribank.com" target = "_brank">http://wooribank.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>【뱅킹관리 → 뱅킹계좌관리 → 스피드조회계좌등록/해지】에서 신청</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 7: // sc은행
            html.push('<h3>SC은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>스탠다드차타드은행 홈페이지(<a href="https://www.standardchartered.co.kr/" target = "_brank">https://www.standardchartered.co.kr/</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>인터넷뱅킹 가입고객 : 【서비스 및 설정 → 통장관리 → 스피드조회등록】에서 신청</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>스탠다드차타드은행 홈페이지(<a href="https://www.standardchartered.co.kr/" target = "_brank">https://www.standardchartered.co.kr/</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통하여 인터넷뱅킹 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>A. First Biz 가입고객 : 【이용자관리 → 관리자 업무 → 계좌정보관리 → 스피드계좌관리】에서 등록<br />B. Straight2Bank 가입고객 : 【관리자화면 → 계좌정보관리 → 스피드계좌등록/해지】에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 8: // 신한은행
            html.push('<h3>신한은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>신한은행 홈페이지(<a href="http://www.shinhan.com" target = "_brank">http://www.shinhan.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>좌측중앙 [간편조회서비스] > [계좌조회] > 로그인(홈페이지 회원 아이디와 비밀번호 필요)</p></li>');
            html.push('<li><span class="order">③</span><p>로그인후 좌측상단 [계좌조회] > [간편계좌관리] > [간편계좌조회 추가하기]</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>신한은행 홈페이지(<a href="http://www.shinhan.com" target = "_brank">http://www.shinhan.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>좌측중앙 [간편조회서비스] > [계좌조회] > 로그인(홈페이지 회원 아이디와 비밀번호 필요)</p></li>');
            html.push('<li><span class="order">③</span><p>로그인후 좌측상단 [계좌조회] > [간편계좌관리] > [간편계좌조회 추가하기]</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 9: // 씨티은행
            html.push('<h3>씨티은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>씨티은행 홈페이지(<a href="http://www.citibank.co.kr" target = "_brank">http://www.citibank.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>빠른조회 서비스 신청 - [개인 로그인 > 웹회원가입 > 웹회원등록]</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>씨티은행 홈페이지(<a href="http://www.citibank.co.kr" target = "_brank">http://www.citibank.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>[법인 로그인 > 웹회원가입 > 기업인터넷뱅킹 > 인증서 로그인> CAT-i 메뉴 > 이용자관리 > 빠른조회서비스]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 10: // 대구은행
            html.push('<h3>대구은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>대구은행 홈페이지(<a href="https://www.dgb.co.kr" target = "_brank">https://www.dgb.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[안전계좌조회 > 안전계좌신청]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>대구은행 홈페이지(<a href="https://www.dgb.co.kr" target = "_brank">https://www.dgb.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[안전계좌조회 > 안전계좌신청]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 11: // 부산은행
            html.push('<h3>부산은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>부산은행 홈페이지(<a href="http://www.busanbank.co.kr" target = "_brank">http://www.busanbank.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[메인화면중앙 > 빠른조회서비스 > 개인빠른조회 계좌등록]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>부산은행 홈페이지(<a href="http://www.busanbank.co.kr" target = "_brank">http://www.busanbank.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[메인화면중앙 > 빠른조회서비스 > 기업빠른조회 계좌등록]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 12: // 광주은행
            html.push('<h3>광주은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>광주은행 홈페이지(<a href="http://www.kjbank.com" target = "_brank">http://www.kjbank.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[마이뱅킹관리 > 계좌통합관리 > 빠른서비스 사용계좌관리]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>광주은행 홈페이지(<a href="http://www.kjbank.com" target = "_brank">http://www.kjbank.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[사용자관리 > 계좌통합관리 > 빠른서비스 계좌등록]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 13: // 제주은행
            html.push('<h3>제주은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인/기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>제주은행 홈페이지(<a href="http://www.e-jejubank.com" target = "_brank">http://www.e-jejubank.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[사용자관리 > 바로바로서비스 신청]에서 신청</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 14: // 전북은행
            html.push('<h3>전북은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인/기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>전북은행 홈페이지(<a href="http://www.jbbank.co.kr" target = "_brank">http://www.jbbank.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[뱅킹관리 > 계좌관리 > 바로바로서비스 계좌관리]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 15: // 경남은행
            html.push('<h3>경남은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인/기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>경남은행 홈페이지(<a href="http://www.knbank.co.kr" target = "_brank">http://www.knbank.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[왼쪽상단 My Banking > 계좌관리> 빠른서비스 계좌관리]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 16: // 새마을금고
            html.push('<h3>새마을금고</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>새마을금고 홈페이지(<a href="http://www.kfcc.co.kr" target = "_brank">http://www.kfcc.co.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>개인뱅킹 클릭</p></li>');
            html.push('<li><span class="order">③</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">④</span><p>[뱅킹관리 > 계좌관리 > 즉시조회 계좌관리] 클릭</p></li>');
            html.push('<li><span class="order">⑤</span><p>보안매체 (OTP 또는 보안카드) 인증 및 공인인증서 인증</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>[새마을금고 영업점]에서 신청</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 17: // 우체국
            html.push('<h3>우체국</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인/기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>우체국 홈페이지(<a href="http://www.epostbank.go.kr" target = "_brank">http://www.epostbank.go.kr</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>[예금간편서비스 > 간편조회계좌등록]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 18: // 하나은행
            html.push('<h3>KEB하나은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>KEB하나은행 홈페이지(<a href="http://www.kebhana.com" target = "_brank">http://www.kebhana.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p><strong>마이하나</strong> &gt; <strong>계좌정보관리</strong> &gt; <strong>빠른조회관리</strong>에서 신청</p></li>');
            html.push('</ul>');
            html.push('</div>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>KEB하나은행 홈페이지(<a href="http://www.kebhana.com" target="_blank">http://www.kebhana.com</a>)에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인 - 기업/CMS 로 분류되며, CMS인 경우 지점방문 후 신청해야 합니다.</p></li>');
            html.push('<li><span class="order">③</span><p><strong>뱅킹관리</strong> &gt; <strong>계좌관리</strong> &gt; <strong>빠른조회계좌관리</strong>에서 신청</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;            
        case 19: // 신협
            html.push('<h3>신협은행</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인/기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>신협 홈페이지(<a href="http://openbank.cu.co.kr" target ="_brank">http://openbank.cu.co.kr)</a>에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>좌측중앙[조회전용 > 조회전용서비스 > 신규 > 계좌등록/해지]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;
        case 20: // 산림조합
            html.push('<h3>산림조합</h3>');
            html.push('<div class="banking_info_section">');
            html.push('<h4>▣ 개인/기업뱅킹</h4>');
            html.push('<ul>');
            html.push('<li><span class="order">①</span><p>산림조합 홈페이지(<a href="http://banking.nfcf.or.kr/index.jsp" target ="_brank">http://banking.nfcf.or.kr/index.jsp)</a>에 접속</p></li>');
            html.push('<li><span class="order">②</span><p>공인인증서를 통한 인터넷뱅킹에 로그인</p></li>');
            html.push('<li><span class="order">③</span><p>[계좌관리> 빠른조회계좌관리 > 이용계좌등록]에서 등록</p></li>');
            html.push('</ul>');
            html.push('</div>');
            break;    
        default:
            break;
    }

    var guide = $("#" + type + "Modal").find(".banking_info");
    guide.empty();
    guide.append(html.join(""));
};

var btnPressedOpenBank = function(type) {
    var bankUrl = "";
    var seqNo = $("#" + type + "_bank_cert_m_seq_no").val();
    if(typeof(seqNo) == 'string')
        seqNo = parseInt(seqNo);
    
    switch (seqNo) {
        case 1: // 산업은행
            bankUrl = "http://www.kdb.co.kr";
            break;
        case 2: // 기업은행
            bankUrl = "http://www.ibk.co.kr";
            break;
        case 3: // 국민은행
            bankUrl = "http://www.kbstar.com";
            break;
        case 4: // 수협은행
            bankUrl = "http://www.suhyup-bank.com";
            break;
        case 5: // 농협
            bankUrl = "http://banking.nonghyup.com";
            break;
        case 6: // 우리
            bankUrl = "http://wooribank.com";
            break;
        case 7: // sc은행
            bankUrl = "https://www.standardchartered.co.kr/";
            break;
        case 8: // 신한은행
            bankUrl = "http://www.shinhan.com";
            break;
        case 9: // 씨티은행
            bankUrl = "http://www.citibank.co.kr";
            break;
        case 10: // 대구은행
            bankUrl = "https://www.dgb.co.kr";
            break;
        case 11: // 부산은행
            bankUrl = "http://www.busanbank.co.kr";
            break;
        case 12: // 광주은행
            bankUrl = "http://www.kjbank.com";
            break;
        case 13: // 제주은행
            bankUrl = "http://www.e-jejubank.com";
            break;
        case 14: // 전북은행
            bankUrl = "http://www.jbbank.co.kr";
            break;
        case 15: // 경남은행
            bankUrl = "http://www.knbank.co.kr";
            break;
        case 16: // 새마을금고
            bankUrl = "http://www.kfcc.co.kr";
            break;
        case 17: // 우체국
            bankUrl = "http://www.epostbank.go.kr";
            break;
        case 18: // 하나은행
            bankUrl = "http://www.kebhana.com";
            break;            
        case 19: // 신협
            bankUrl = "http://openbank.cu.co.kr";
            break;
        case 20: // 산림조합
            bankUrl = "http://banking.nfcf.or.kr/index.jsp";
            break;    
        default:
            break;
    }

    window.open(bankUrl);
};

var changeRegModalData = function() {
    $("#regAcctTestSuccYN").val("N");
};

var changeMdfyModalData = function() {
    $("#mdfyAcctTestSuccYN").val("N");
};

var showAlertForModal = function(msg, type) {
    $("#" + type + "Modal").hide();
    
    showAlert(msg, function () {
        $("#" + type + "Modal").css('display', 'flex');
    });
};

// 계좌정보 등록 계좌 중복확인버튼
var regCheckDupl = function() {
    var acctNo = $("#reg_acct_no").val();
    checkDupl(acctNo, "reg");
};
// 계좌정보 수정 계좌 중복확인버튼
var mdfyCheckDupl = function() {
    var acctNo = $("#mdfy_acct_no").val();
    checkDupl(acctNo, "mdfy");
};
// 계좌 중복체크
var checkDupl = function(acctNo, area) {
    if (acctNo.length == 0) {
        $("#" + area + "_checkDupl_info").text("*계좌 번호를 입력하세요.").css({color: "Red", fontSize: "10.5px"});
		$("#chkAcctDuplYN").val("N");
    } else if (isAcctNo_numberNLetter(acctNo)) {
        $.ajax({
            url : '/sub/account/checkDupl',
            type: 'post',
            data: {"acct_no" : acctNo},
            success: function(data) {
                if (data >= 1) {
                    if (area == "mdfy") {
                        $("#" + area + "_checkDupl_info").text("*수정 가능한 계좌번호입니다.").css({color: "Green", fontSize: "10.5px"});
                        $("#chkAcctDuplYN").val("Y");
                    } else {
                        $("#" + area + "_checkDupl_info").text("*이미 등록된 계좌번호입니다.").css({color: "Red", fontSize: "10.5px"});
                        $("#chkAcctDuplYN").val("N");
                    }
                } else if(data == 0) {
                    $("#" + area + "_checkDupl_info").text("*사용 가능한 계좌번호입니다.").css({color: "Green", fontSize: "10.5px"});
                    $("#chkAcctDuplYN").val("Y");
                }
            }, error: function (error) {
                showAlertForModal("요청이 실패하였습니다.", type);
            }
        });
    } else {
        $("#" + area + "_checkDupl_info").text("*계좌 번호가 정확하지 않습니다.").css({color: "Red", fontSize: "10.5px"});
		$("#chkAcctDuplYN").val("N");
    }
};

var btnPressedTestAccount = function(type) {
    if (!isVali()) {
        return false; 
    }

     if($("#chkAcctDuplYN").val() == "") {
         showAlertForModal("계좌 중복 확인 후 사용 가능합니다.", type);
     }else if($("#chkAcctDuplYN").val() == "N"){
         showAlertForModal("중복된 계좌번호입니다.<br> 계좌번호 확인 후 사용 가능합니다.", type);
     }else {
        var bankCd = $("#" + type + "_bank_cert_m_seq_no").find("option:selected").data("bankcd");
        var param = {
            "bankCd": bankCd
        };

        var input = $("#" + type + "Modal").find(".form_container").find("[required]");
        var jqThis;
        $.each(input, function () {
            jqThis = $(this);
            if (nonNull(jqThis.val())) {
                var id = jqThis.attr("id").replace(type + "_", "");
                param[id] = jqThis.val();
            }
        });
        
        showLoadingModal();
        // beforeSend, complete 함수들로 로딩바 처리 안됨
        setTimeout(function () {
            testAccount(type, param);
        }, 100);
     }
        
};


var testAccount = function(type, param) {
    $.ajax({
        url: '/sub/account/verifyAccount'
        , type: 'post'
        , async: false
        , data: param
        , success: function (res) {
            hideLoadingModal();

            if(res.errCode == "00000000") {
                $("#" + type + "AcctTestSuccYN").val("Y");
                showAlertForModal("입력하신 정보로 계정 테스트를 성공하였습니다.", type);
            }
            else {
                showAlertForModal("요청이 실패하였습니다. <br>(" + res.errMsg + ")", type);
            }
        }
        , error: function (error) {
            hideLoadingModal();
            showAlertForModal("요청이 실패하였습니다. <br>입력하신 정보를 다시 확인해주세요.", type);
        }
    });
};

var btnPressedAcctReg = function() {
    if (!isVali()) {
        return false; 
    }

    if($("#regAcctTestSuccYN").val() != "Y") {
        showAlertForModal("계정 테스트 성공 후 등록 가능합니다.", "reg");
        return;
    }

    // 기본 공통 값
    var param = {
        "bank_cert_m_seq_no": $("#reg_bank_cert_m_seq_no").val()
    };
    var input = $("#regModal").find(".form_container").find("[required]");
    var jqThis;
    $.each(input, function () {
        jqThis = $(this);
        if (nonNull(jqThis.val())) {
            var id = jqThis.attr("id").replace("reg_", "");
            param[id] = jqThis.val();
        }
    });

    // 통화
    var crc_use_cd = $("#reg_bank_cert_m_seq_no").find("option:selected").data("crccd");
    if (crc_use_cd == "S") {
        param.crc = $("#reg_crc").val();
    }

    // 입금 확인용 계좌 여부
    if($("#cafe24_usr_yn").val() == 'Y' && $("input:checkbox[id='reg_reco_yn']").is(":checked"))
        param.reco_yn = "Y";
    else
        param.reco_yn = "N";

    $.ajax({
        url: '/sub/account/regAccount'
        , type: 'post'
        , async: false
        // , dataType: 'json'
        , contentType: 'application/json'
        , data: JSON.stringify([param])
        , success: function (res) {
            $("#regModal").hide();
            showAlert("계좌가 등록되었습니다.", function () {
                location.href = "/sub/account/account";
            });
        }
        , error: function (error) {
            // 2020-05-18 기존의 등록된 계좌 번호와 동일한 경우 undefine 문구 노출됨
            showAlertForModal("이미 동일한 계좌가 등록되어 있습니다. <br>입력하신 정보를 다시 확인해주세요.", "reg");
        }
    });
};

var showMdfyModal = function(seqNo) {
    var param = {
        "cust_acct_seq_no": seqNo
    };

    $.ajax({
        url: '/sub/account/accountDetail'
        , type: 'get'
        , async: false
        // , dataType: 'json'
        , contentType: 'application/json'
        , data: param
        , success: function (res) {
            updateMdfyModal(res);
        }
        , error: function (error) {
            showAlertForModal("요청이 실패하였습니다.", "mdfy");
        }
    });
};

var updateMdfyModal = function(data) {
    initModal("mdfy");
    $("#mdfy_bank_cert_m_seq_no").val(data.bank_cert_m_seq_no);
    $("#cust_acct_seq_no").val(data.cust_acct_seq_no);
    $("#cust_acct_sts_cd").val(data.cust_acct_sts_cd);
    changeInputFields(data.bank_cert_m_seq_no, "mdfy");

    var keys = Object.keys(data);
    for (var i in keys) {
        if(keys[i] != 'reco_yn')
            $("#mdfy_" + keys[i]).val(data[keys[i]]);
        else if(data[keys[i]] == "Y")
            $("input:checkbox[id='mdfy_reco_yn']").prop("checked", true);
    }
    
    $("#mdfyModal").css('display', 'flex');
};

var btnPressedAcctMdfy = function() {
    if (!isVali()) {
        return false; 
    }

    if($("#mdfyAcctTestSuccYN").val() != "Y") {
        showAlertForModal("계정 테스트 성공 후 저장 가능합니다.", "mdfy");
        return;
    }
    
    // 기본 공통 값
    var param = {
        "bank_cert_m_seq_no": $("#mdfy_bank_cert_m_seq_no").val()
    };
    var input = $("#mdfyModal").find(".form_container").find("[required]");
    var jqThis;
    $.each(input, function () {
        jqThis = $(this);
        if (nonNull(jqThis.val())) {
            var id = jqThis.attr("id").replace("mdfy_", "");
            param[id] = jqThis.val();
        }
    });

    // 통화
    var crc_use_cd = $("#mdfy_bank_cert_m_seq_no").find("option:selected").data("crccd");
    if (crc_use_cd == "S") {
        param.crc = $("#mdfy_crc").val();
    }

    // 입금 확인용 계좌 여부
    if($("#cafe24_usr_yn").val() == 'Y' && $("input:checkbox[id='mdfy_reco_yn']").is(":checked"))
        param.reco_yn = "Y";
    else
        param.reco_yn = "N";

    $.ajax({
        url: '/sub/account/account/' + $("#cust_acct_seq_no").val()
        , type: 'put'
        , async: false
        // , dataType: 'text json'   
        , contentType: 'application/json'
        , data: JSON.stringify([param])
        , success: function (response) {
            $("#mdfyModal").hide();
            showAlert("계좌가 변경되었습니다.", function () {
                location.href = "/sub/account/account";
            });
        }
        , error: function (error) {
            if (isJsonString(error.responseText)) {
                var data = JSON.parse(error.responseText);
                showAlertForModal(data.comment, "mdfy");
            } else {
                showAlertForModal("저장실패 하였습니다. <br> 관리자에게 문의하세요.", "mdfy");
            }
        }
    });
};

var btnPressedAcctDel = function() {
    var cust_acct_sts_cd = $("#cust_acct_sts_cd").val();
    if (cust_acct_sts_cd == 'INQ') {
        showAlertForModal("조회중인 계좌는 삭제 하실수 없습니다.", "mdfy");
        return false;
    }

    $("#mdfyModal").hide();
    var cust_acct_seq_no = $("#cust_acct_seq_no").val();
    var modalId = showConfirm("계좌를 삭제하시겠습니까?", function () {
        removeModal(modalId);
        $.ajax({
            url: '/sub/account/account/' + cust_acct_seq_no,
            type: 'delete',
            async: false,
            // dataType: 'text',
            contentType: 'application/json',
            success: function (res) {
                showAlert("계좌가 삭제되었습니다.", function () {
                    location.href = "/sub/account/account";
                });
            },
            error: function (error) {
                showAlert("삭제에 실패 하였습니다.");
            }
        });
    });
};