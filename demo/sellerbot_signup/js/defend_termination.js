import modalShow from "./import/modalShow.js";
import searchParam from "./import/searchParam.js";

let popupHtml = `
<div class="head">
	<h5></h5>
	<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
</div>
<div class="body">
    <h3>정말 해지하시겠어요?<img src="./img/sad_emoji.png" alt="sad_emoji"></h3>
    <p>지금 해지하시면 아래와 같은 혜택을 더 이상 받을 수 없어요</p>
    <a href="https://www.sellerbot.co.kr"><b id="biz_name">상호명</b> 님이 놓치고 계셨던 숨은 정산예정금도 확인해보세요</a>
    <p style="margin-top:0px;">지금 해지하시면 모든 혜택이 사라져요</p>
    <div style="margin-top: 40px;" class="blueBox">
        <div class="imgBox">
            <img src="./img/defend_termination_01.png" alt="bills">
        </div>
        <div class="textBox">
            <h4>정산예정금, 매출통계, 과거 정산금 등</h4>
            <p>50여개 판매몰별 정산예정금 간편 정리!</p>
        </div>
    </div>
    <div class="blueBox">
        <div class="imgBox">
            <img src="./img/defend_termination_02.png" alt="bell">
        </div>
        <div class="textBox">
            <h4>매일 아침 일일 리포트</h4>
            <p>매일 아침 알림톡으로 받아보는 정산예정금 리포트</p>
        </div>
    </div>
    <div class="blueBox">
        <div class="imgBox">
            <img src="./img/defend_termination_03.png" alt="target">
        </div>
        <div class="textBox">
            <h4>자동 입금 확인 서비스</h4>
            <p>주문과 입금을 매칭 시켜주는 서비스</p>
        </div>
    </div>
</div>
`;
modalShow({
  id: "modal_01",
  content: popupHtml,
  btns: [
    {
      text: "해지하기",
      callback: modal_02,
    },
    {
      text: "셀러봇캐시 계속 유지하기",
      callback: () => {
        location.href = "https://www.sellerbot.co.kr";
      },
    },
  ],
  function: () => {
    document.querySelector("#biz_name").innerText = searchParam("biz_name");
  },
});

let popupHtml2 = `
<div class="head">
    <h5></h5>
    <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
</div>
<div class="body">
    <h3>쉿 !!</h3>
    <p><b id="biz_name">상호명</b> 님과 계속 함께하고 싶은 마음으로<br> 셀러봇캐시가 특별한 혜택을 준비했어요</p>
    <span class="star"><img src="./img/star.svg" alt="star" />고객님에게만 드리는 특별 혜택!</span>
    <div class="ticketBox">
        <span class="sellerbot">셀러봇캐시</span>
        <div class="tag"><b id="dc_rate">40%</b><br>할인</div>
        <h4 id="subscribing">메가봇</h4>
        <p>정상가 월 <i id="normal_price">50,000</i>원</p>
        <div class="bottom"><h5>월 <i id="dc_price">30,000</i>원</h5><span>(VAT별도)</span></div>
    </div>
    <div class="underTicket">
        <h5>판매몰계좌</h5>
        <span><img src="./img/checkBox.svg" alt="checkBox"><i id="mall_acc">5개</i>등록</span>
    </div>
    <div class="underTicket">
        <h5>판매몰 ID</h5>
        <span><img src="./img/checkBox.svg" alt="checkBox"><i id="mall_id">5개</i>등록</span>
    </div>
    <div class="lastTicket">
        <h5>다음 결제일 : <i id="next_pay_dt">00년 00월 00일</i></h5>
    </div>
    <p class="underText">할인된 금액으로 셀러봇캐시를 계속 이용해보세요</p>
</div>
`;

function formatDate(dateString) {
  var year = dateString.substring(0, 4);
  var month = dateString.substring(4, 6);
  var day = dateString.substring(6, 8);

  return year + "년 " + parseInt(month, 10) + "월 " + parseInt(day, 10) + "일";
}

function modal_02() {
  document.querySelector("#modal_01").remove();
  modalShow({
    id: "modal_02",
    content: popupHtml2,
    btns: [
      {
        text: "혜택 포기하기",
        callback: () => {},
      },
      {
        text: "할인 혜택 받기",
        callback: modal_03,
      },
    ],
    function: () => {
      document.querySelector("#biz_name").innerText = searchParam("biz_name");
      document.querySelector("#next_pay_dt").innerText = formatDate(
        searchParam("next_pay_dt")
      );

      switch (searchParam("subscribing")) {
        case "메가봇":
          document.querySelector("#dc_rate").innerText = "40%";
          document.querySelector("#subscribing").innerText = "메가봇";
          document.querySelector("#normal_price").innerText = "50,000";
          document.querySelector("#dc_price").innerText = "30,000";
          document.querySelector("#mall_acc").innerText = "5개";
          document.querySelector("#mall_id").innerText = "5개";
          break;
        case "기가봇":
          document.querySelector("#dc_rate").innerText = "50%";
          document.querySelector("#subscribing").innerText = "기가봇";
          document.querySelector("#normal_price").innerText = "100,000";
          document.querySelector("#dc_price").innerText = "50,000";
          document.querySelector("#mall_acc").innerText = "무제한";
          document.querySelector("#mall_id").innerText = "무제한";
          break;
        case "테라봇":
          document.querySelector("#dc_rate").innerText = "40%";
          document.querySelector("#subscribing").innerText = "테라봇";
          document.querySelector("#normal_price").innerText = "50,000";
          document.querySelector("#dc_price").innerText = "30,000";
          document.querySelector("#mall_acc").innerText = "무제한";
          document.querySelector("#mall_id").innerText = "무제한";
          break;

        default:
          break;
      }
    },
  });
}

let popupHtml3 = `
<div class="head">
    <h5></h5>
    <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
</div>
<div class="body">
    <p class="flex">셀러님과 다시 만나 반가워요 <img src="./img/emoji_thanks.png" alt="thank you emoji" /></p>
    <p>다음 결제일부터 할인된 금액으로 청구됩니다.</p>
    <p>해지 시, 혜택은 사라집니다.</p>
</div>
`;

function modal_03() {
  document.querySelector("#modal_02").remove();
  modalShow({
    id: "modal_03",
    content: popupHtml3,
    btns: [
      {
        text: "셀러봇캐시 이용하러가기",
        callback: () => {
          location.href = "https://www.sellerbot.co.kr";
        },
      },
    ],
  });
}
