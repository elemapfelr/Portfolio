var webSocket = null;
var connectWS = function() {
    try{
        // webSocket = new WebSocket("ws://localhost:9901");
        /**
         * 2020-09-17 wss 프로토콜 적용
         * DNS 미적용으로 인하여 주석처리
         * IE > Internet Option > 보안 > 신뢰할 수 있는 사이트 > https://jump.sellerbot.co.kr 추가 
         */
        webSocket = new WebSocket("wss://jump.sellerbot.co.kr:9901");
        webSocket.onopen = function (event) {
            console.log("webSocket.onopen");
            console.log(event);
        };
        webSocket.onclose = function (event) {
            console.log("webSocket.onclose");
            console.log(event);
        };
        // webSocket.onmessage = function (event) {
        //     console.log("webSocket.onmessage");
        // };
        webSocket.onerror = function (event) {
            console.log("webSocket.onerror");
            console.log(event);
            var opt = {
                btnOK: "설치 바로가기",
                btnCancel: "취소"
            }
            var modalId = showConfirm("자동 로그인 기능은 최신 버전의<br/>셀러봇캐시 ‘점프 프로그램’ 설치가 필요해요.", function () {
                removeModal(modalId);
                
                location.href = "/sub/jump/download";
            }, opt);
        };        
    } catch (e) {
        console.log(e.message)
        console.log(e)
        return;
    }
};

var send = function(data) {
    if (webSocket != null && webSocket.readyState == WebSocket.OPEN) {
        webSocket.send(data);
    }
    else {
        showAlert("요청이 실패했습니다.\n다시 시도해주세요.");
    }
};

var closeWS = function(data) {
    if (webSocket != null && webSocket.readyState != WebSocket.CLOSED) {
        webSocket.close();
    }
};
    

// class LocalWebSockect {
//     constructor() {
//         this.url = "ws://localhost:9901";
//         webSocket = null;
//         // this.connectTimer = null;
//     }

//     connectWS() {
//         webSocket = new WebSocket(this.url);
//         webSocket.onopen = function (event) {
//             console.log("webSocket.onopen");
//             console.log(event);
//         };
//         webSocket.onclose = function (event) {
//             console.log("webSocket.onclose");
//             console.log(event);
//         };
//         // webSocket.onmessage = function (event) {
//         //     console.log("webSocket.onmessage");
//         // };
//         webSocket.onerror = function (event) {
//             console.log("webSocket.onerror");
//             console.log(event);
//             showAlert("요청이 실패했습니다.\n다시 시도해주세요.\n지속적으로 요청 실패 시 설치된 프로그램의 상태를 확인해주세요.");
//         };

//         // this.connectTimer = setInterval(function(){
//         //     console.log(this.isOpen);
//         //     console.log(webSocket.readyState == WebSocket.OPEN);
//         //     // if (webSocket.readyState != WebSocket.OPEN) {
//         //     //     webSocket = new WebSocket(this.url);
//         //     // }
//         //     // else {
//         //     //     clearInterval(this.connectTimer);
//         //     // }
//         // }, 1000)

//         // this.connectTimer = setInterval(this.checkConnection, 1000);
//         // setTimeout(this.checkConnection, 1000);
//     }

//     // checkConnection() {
//     //     console.log(webSocket.readyState);
//     // }

//     send(data) {
//         if (webSocket != null && webSocket.readyState == WebSocket.OPEN) {
//             webSocket.send(data);
//         }
//         else {
//             showAlert("요청이 실패했습니다.\n다시 시도해주세요.");
//         }
//     }

//     closeWS() {
//         if (webSocket != null && webSocket.readyState != WebSocket.CLOSED)
//             webSocket.close();
//     }
// }