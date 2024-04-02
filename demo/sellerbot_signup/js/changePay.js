import modalShow from "./import/modalShow.js";
import numberWithComma from "./import/numberWithCommas.js";

let popupHtml = `
<div class="head">
	<h5>셀러봇캐시 이용권 변경</h5>
	<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
</div>
<div class="body">
    <h4>현재 이용권</h4>
    <div class="ticketBox mega" id="beforeTicket" data-ticketname="메가봇">
        <h5>메가봇</h5>
        <p class="special">특별 할인 프로모션 적용</p>
        <p class="gray">매월 <b id="price">50,000원</b> (VAT 별도)</p>
    </div>
    <h4 style="margin-top:40px;">변경할 이용권</h4>
    <div class="ticketBox giga" id="afterTicket" data-ticketname="기가봇">
        <h5>기가봇</h5>
        <p class="gray"><b id="payinterval">매월</b> <b id="price">100,000</b>원 (VAT 별도)</p>
    </div>
    <div class="ticketSelect">
        <ul>
            <li class="mega" data-ticket="mega" data-ticketname="메가봇" data-price="50000" data-payinterval="매월"></li>
            <li class="giga active" data-ticket="giga" data-ticketname="기가봇" data-price="100000" data-payinterval="매월"></li>
            <li class="tera" data-ticket="tera" data-ticketname="테라봇" data-price="50000" data-payinterval="매월"></li>
            <li class="bank_acc1_1m" data-ticket="bank_acc1_1m" data-ticketname="뱅크봇 1계좌 1개월" data-price="5000" data-payinterval="매월"></li>
            <li class="bank_acc3_1m" data-ticket="bank_acc3_1m" data-ticketname="뱅크봇 3계좌 1개월" data-price="20000" data-payinterval="매월"></li>
            <li class="bank_accInf_1m" data-ticket="bank_accInf_1m" data-ticketname="뱅크봇 무제한계좌 1개월" data-price="40000" data-payinterval="매월"></li>
            <li class="bank_acc1_12m" data-ticket="bank_acc1_12m" data-ticketname="뱅크봇 1계좌 1년" data-price="60000" data-payinterval="연간"></li>
            <li class="bank_acc3_12m" data-ticket="bank_acc3_12m" data-ticketname="뱅크봇 3계좌 1년" data-price="180000" data-payinterval="연간"></li>
            <li class="bank_accInf_12m" data-ticket="bank_accInf_12m" data-ticketname="뱅크봇 무제한계좌 1년" data-price="300000" data-payinterval="연간"></li>
        </ul>
    </div>
    <p class="underMsg">※ 변경된 이용권으로 즉시 반영되며, 다음 결제일부터 변경된 요금으로 청구됩니다.</p>
</div>
<div class="btnBox">
    <button class="black">닫기</button>
    <button class="changeBlue">변경</button>
</div>
`;
modalShow({
  id: "changePayModal",
  content: popupHtml,
  function: async () => {
    document
      .querySelectorAll("#changePayModal .ticketSelect ul li")
      .forEach((el, idx, arg) => {
        el.addEventListener("click", function () {
          arg.forEach((el2) => el2.classList.remove("active"));
          el.classList.add("active");

          let afterTicket = document.querySelector(
            "#changePayModal #afterTicket"
          );
          afterTicket.dataset.ticketname =
            this.dataset.ticketname.split(" ")[0];
          afterTicket.className = `ticketBox ${this.dataset.ticket}`;
          afterTicket.querySelector("h5").innerText = this.dataset.ticketname;
          afterTicket.querySelector("#payinterval").innerText =
            this.dataset.payinterval;
          afterTicket.querySelector("#price").innerText = numberWithComma(
            this.dataset.price
          );
        });
      });
    document
      .querySelector("#changePayModal .btnBox button.changeBlue")
      .addEventListener("click", () => {
        let beforeTicket = document.querySelector(
          "#changePayModal #beforeTicket"
        ).dataset.ticketname;
        let selectedTicket = document.querySelector(
          "#changePayModal .ticketSelect ul li.active"
        );
        let selectedTicketName = selectedTicket.dataset.ticketname;
        let selectedTicketPrice = selectedTicket.dataset.price;
        let selectedTicketPayInterval = selectedTicket.dataset.payinterval;
        alert(`${beforeTicket} -> ${selectedTicketName}으로 변경`);
      });
  },
});
