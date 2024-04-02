//sub > payment > all.html chart.js 커스텀 코드입니다.//
var ctx = document.getElementById('gh1').getContext('2d'); // 오픈마켓 차트
var ctx1 = document.getElementById('gh2').getContext('2d'); // 비오픈마켓 차트
option1 = {
  title: {
    display: false,
  },
  tooltips: {
    mode: 'index',
    intersect: false,
    displayColors: '#323659',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    titleFontColor: 'transparent',
    titleFontSize: 0,
    titleSpacing: 5,
    bodyFontSize: 10,
    position: 'nearest',
    bodyFontColor: '#191919',
    bodySpacing: 10,
    enabled: false,
    custom: function(tooltipModel) {
      var tooltipEl = document.getElementById('chartjs-tooltip');
      //pc
      if (matchMedia("screen and (max-width:5000px) and (min-width:960px)").matches) {
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }
      }

      //mobile
      /*
      if (matchMedia("screen and (max-width:959px)").matches) {
        if (!tooltipEl) {
          var location = document.getElementById('m_tolltipBox');
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          location.appendChild(tooltipEl);
          console.log(tooltipEl);
        }
      }
      */
      if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }

      function getBody(bodyItem) {
        return bodyItem.lines;
      }

      if (tooltipModel.body) {
        var titleLines = tooltipModel.title || [];
        var bodyLines = tooltipModel.body.map(getBody);

        var innerHtml = '<thead>';

        titleLines.forEach(function(title) {
          innerHtml += '<tr><th style="text-align: left;padding: 4px 0 10px 4px;font-weight:bold">' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';
        bodyLines.forEach(function(body, i) {
          var colors = tooltipModel.labelColors[i];
          var style = 'background:' + colors.backgroundColor;
          var categ_1 = "쿠팡"
          var date = "2021-05-21"
          var price = "1,755,530"
          if (i == 0 || i % 2 == 0) {
            innerHtml += '<div class="tooltip_item_1">가장 <b style="color:#f00;">먼</b> 정산예정금 지급일</div>';
            innerHtml += '<div class="tooltip_item_2">' + date + '</div>';
            innerHtml += '<div class="tooltip_item_3">' + categ_1 + '</div>';
            innerHtml += '<div class="tooltip_item_4">' + price + '원</div>';
            innerHtml += '<img src="/assets/images/chart/tooltip_tip.png" alt="" />';
          }
        });
        innerHtml += '</tbody>';

        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
      }

      var position = this._chart.canvas.getBoundingClientRect();

      tooltipEl.style.opacity = 1;
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
      tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
      tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
      tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
      tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
      tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
      tooltipEl.style.pointerEvents = 'none';
    }
  }

}
option2 = {

  title: {
    display: false,
  },
  tooltips: {
    mode: 'index',
    intersect: false,
    displayColors: '#323659',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    titleFontColor: 'transparent',
    titleFontSize: 0,
    titleSpacing: 5,
    bodyFontSize: 10,
    position: 'nearest',
    bodyFontColor: '#191919',
    bodySpacing: 10,
    enabled: true,
    custom: function(tooltipModel) {
      var tooltipEl = document.getElementById('chartjs-tooltip');

      //pc
      if (matchMedia("screen and (max-width:5000px) and (min-width:960px)").matches) {
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }
      }
      //mobile
      /*
      if (matchMedia("screen and (max-width:959px)").matches) {
        if (!tooltipEl) {
          var location = document.getElementById('m_tolltipBox_fir');
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          location.appendChild(tooltipEl);
        }
      }
      */
      if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }

      function getBody(bodyItem) {
        return bodyItem.lines;
      }

      if (tooltipModel.body) {
        var titleLines = tooltipModel.title || [];
        var bodyLines = tooltipModel.body.map(getBody);

        var innerHtml = '<thead>';

        titleLines.forEach(function(title) {
          innerHtml += '<tr><th style="text-align: left;padding: 4px 0 10px 4px;font-weight:bold">' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';
        bodyLines.forEach(function(body, i) {
          var colors = tooltipModel.labelColors[i];
          var style = 'background:' + colors.backgroundColor;
          var categ_1 = "쿠팡"
          var date = "2021-05-21"
          var price = "1,755,530"
          if (i == 0 || i % 2 == 0) {
            innerHtml += '<div class="tooltip_item_1">가장 <b style="color:#f00;">먼</b> 정산예정금 지급일</div>';
            innerHtml += '<div class="tooltip_item_2">' + date + '</div>';
            innerHtml += '<div class="tooltip_item_3">' + categ_1 + '</div>';
            innerHtml += '<div class="tooltip_item_4">' + price + '원</div>';
            innerHtml += '<img src="/assets/images/chart/tooltip_tip.png" alt="" />';
          }
        });
        innerHtml += '</tbody>';

        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
      }

      var position = this._chart.canvas.getBoundingClientRect();

      tooltipEl.style.opacity = 1;
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
      tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
      tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
      tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
      tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
      tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
      tooltipEl.style.pointerEvents = 'none';

    }
  }
}
myChart_1 = new Chart(ctx, {
  type: 'pie',
  data: {
    //labels: ['G마켓','인터파크','옥션','11번가'],
    datasets: [{
      labels: ['G마켓', '인터파크', '옥션', '11번가'],
      data: ['45.6', '24.6', '10.6', '7.2'],
      backgroundColor: ['#2dabe8', '#5f98a9', '#8bb6c6', '#bcd7de'],
      hoverBackgroundColor: ['#2dabe8', '#5f98a9', '#8bb6c6', '#bcd7de'],
      borderColor: ['#2dabe8', '#5f98a9', '#8bb6c6', '#bcd7de'],
      hoverBorderColor: ['#2dabe8', '#5f98a9', '#8bb6c6', '#bcd7de']
    }]
  },
  options: option2

});
  myChart_2 = new Chart(ctx1, {
    type: 'pie',
    data: {
      datasets: [{
        labels: ['쿠팡', '위메프', '티몬'],
        data: ['50.6', '34.6', '15.6'],
        backgroundColor: ['#ef8322', '#e7bb8e', '#f1d6b8'],
        hoverBackgroundColor: ['#ef8322', '#e7bb8e', '#f1d6b8'],
        borderColor: ['#ef8322', '#e7bb8e', '#f1d6b8'],
        hoverBorderColor: ['#ef8322', '#e7bb8e', '#f1d6b8']
      }]
    },
    options: option1
  });
var cht2_json = {
  cht2: [{
      "title": "가장 <b style='color:#f00;'>먼</b> 정산예정금 지급일",
      "date": "2017-08-08",
      "comp": "쿠팡",
      "pay": "1,700,000"
    },
    {
      "title": "가장 <b style='color:#f00;'>먼</b> 정산예정금 지급일",
      "date": "2017-08-08",
      "comp": "쿠팡",
      "pay": "1,700,000"
    },
    {
      "title": "가장 <b style='color:#f00;'>먼</b> 정산예정금 지급일",
      "date": "2017-08-08",
      "comp": "쿠팡",
      "pay": "1,700,000"
    }
  ]
};
var cht1_json = {
  cht1: [{
      "title": "가장 <b style='color:#2DABE8;'>가까운</b> 정산예정금 지급일",
      "date": "2017-08-08",
      "comp": "쿠팡",
      "pay": "1,700,000"
    },
    {
      "title": "가장 <b style='color:#2DABE8;'>가까운</b> 정산예정금 지급일",
      "date": "2017-08-08",
      "comp": "쿠팡",
      "pay": "1,700,000"
    },
    {
      "title": "가장 <b style='color:#f00;'>먼</b> 정산예정금 지급일",
      "date": "2017-08-08",
      "comp": "쿠팡",
      "pay": "1,700,000"
    },
    {
      "title": "가장 <b style='color:#f00;'>먼</b> 정산예정금 지급일",
      "date": "2017-08-08",
      "comp": "쿠팡",
      "pay": "1,700,000"
    }
  ]
};
//custom percentage
Chart.plugins.register({
  afterDatasetsDraw: function(chartInstance, easing) {
    // To only draw at the end of animation, check for easing === 1
    var ctx = chartInstance.chart.ctx;
    chartInstance.data.datasets.forEach(function(dataset, i) {
      var meta = chartInstance.getDatasetMeta(i);
      //500초과 chart font-size
      if (matchMedia("screen and (max-width:5000px) and (min-width:501px)").matches) {
        if (!meta.hidden) {
          meta.data.forEach(function(element, index) {
            // Draw the text in black, with the specified font
            ctx.fillStyle = 'black';
            var fontSize = 14;
            var fontStyle = 'normal';
            var fontFamily = 'NanumSquare';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
            // Just naively convert to string for now
            var dataString = dataset.data[index].toString();
            var labelString = dataset.labels[index].toString();
            // Make sure alignment settings are correct
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var padding = 5;
            var position = element.tooltipPosition();
            ctx.fillText(labelString, position.x, position.y - (fontSize * 1.5) - padding);
            ctx.fillText(dataString + '%', position.x, position.y - (fontSize / 2) - padding);
          });
        }
      }
      //500이하 chart font-size
      if (matchMedia("screen and (max-width:500px)").matches) {
        if (!meta.hidden) {
          meta.data.forEach(function(element, index) {
            // Draw the text in black, with the specified font
            ctx.fillStyle = 'black';
            var fontSize = 10;
            var fontStyle = 'normal';
            var fontFamily = 'NanumSquare';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
            // Just naively convert to string for now
            var dataString = dataset.data[index].toString();
            var labelString = dataset.labels[index].toString();
            // Make sure alignment settings are correct
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var padding = 5;
            var position = element.tooltipPosition();
            ctx.fillText(labelString, position.x, position.y - (fontSize * 1.5) - padding);
            ctx.fillText(dataString + '%', position.x, position.y - (fontSize / 2) - padding);
          });
        }
      }
    });
  }
});

if (matchMedia("screen and (max-width:959px)").matches) {
  op1_length = (myChart_1.data.datasets[0].labels.length);
  op2_length = (myChart_2.data.datasets[0].labels.length);
  /*
          var dd = 0;
          for (dd = 0; dd < op1_length; dd++) {
            $('#m_tolltipBox').clone(true).appendTo('#mobile_for_tool_2');
            var data_m = document.getElementById("m_tolltipBox");
            console.log(data_m);
          }
  */

  $.each(cht2_json.cht2, function(i, v) {
    $("#mobile_for_tool_2").append("<ul id='m_tolltipBox_" + i + "'></ul>");
    $("#m_tolltipBox_" + i).append('<li class="tooltip_item_1">' + v.title + '</li><li class="tooltip_item_2">' + v.date + '</li><li class="tooltip_item_3">' + v.comp + '</li><li class="tooltip_item_4">' + v.pay +
      '원</li><img src="/assets/images/chart/tooltip_tip.png" alt="" />');
  });
  $.each(cht1_json.cht1, function(i, v) {
    $("#mobile_for_tool_1").append("<ul id='m_tolltipBox_" + i + "'></ul>");
    $("#m_tolltipBox_" + i).append('<li class="tooltip_item_1">' + v.title + '</li><li class="tooltip_item_2">' + v.date + '</li><li class="tooltip_item_3">' + v.comp + '</li><li class="tooltip_item_4">' + v.pay +
      '원</li><img src="/assets/images/chart/tooltip_tip.png" alt="" />');
  });
}

/*정산예정금 합계 js*/
$(".payment_total .sctbox_lg").on("change", function() {
  var totalType = $(this).parents(".payment_total");
  var mallType = $(this).val();
  if (mallType == "all") {
    totalType.find(".case_mall_box").removeClass("active");
    totalType.find(".list_pay").addClass("active");
  } else {
    totalType.find(".list_pay").removeClass("active");
    totalType.find(".case_mall_box[data-total1=" + mallType + "]").addClass("active");
    totalType.find(".case_mall_box[data-total2=" + mallType + "]").addClass("active");
  }
});
