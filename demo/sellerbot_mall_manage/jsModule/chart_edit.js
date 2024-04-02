
  var ctx = document.getElementById('doughnut1').getContext('2d');
  var ctx2 = document.getElementById('doughnut2').getContext('2d');
  var ctx3 = document.getElementById('doughnut3').getContext('2d');
  var ctx4 = document.getElementById('doughnut4').getContext('2d');
  var ctx5 = document.getElementById('spGh1').getContext('2d');
  var ctx6 = document.getElementById('spGh2').getContext('2d');
  var ctx7 = document.getElementById('spGh1_m').getContext('2d');
  var ctx8 = document.getElementById('spGh2_m').getContext('2d');
  var ctx9 = document.getElementById('spGh1_m_1').getContext('2d');
  var ctx10 = document.getElementById('spGh2_m_2').getContext('2d');
  var option2 = {
    layout: {
      padding: {
        top: 10
      }
    },
    legend: {
      display: false
    },
    title: {
      display: false
    },
    scales: {
      xAxes: [{
        //barPercentage: 0.8,
        gridLines: {
          display: false,
          beginAtZero: true
        }
      }],
      yAxes: [{
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }]
    },
    tooltips: {
      enabled: false,
    }
  }
  var option_eidt_1 = {
    responsive: false,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10
      }
    },
    legend: {
      display: false
    },
    title: {
      display: false
    },
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false,

        }
      }],
      yAxes: [{
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }]
    },
    tooltips: {
      enabled: false,
    }
  }
  var option_eidt_2 = {
    responsive: false,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10
      }
    },
    legend: {
      display: false
    },
    title: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        }
      }],
      yAxes: [{
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }]
    },
    tooltips: {
      enabled: false,
    }
  }
  var data1 = {
    //labels: ['쿠팡','AK몰','스마트스토어',"인터파크",'11번가'],
    datasets: [{
      labels: ['쿠팡', 'AK몰', '스마트스토어', "인터파크", '11번가'],
      data: ['11', '23', '4', '33', '30'],
      backgroundColor: ["#45bacb", "#c6adb1", "#46be77", "#a2b8c3", "#f0a1a7"],
      hoverBackgroundColor: ["#45bacb", "#c6adb1", "#46be77", "#a2b8c3", "#f0a1a7"],
      borderColor: ["#45bacb", "#c6adb1", "#46be77", "#a2b8c3", "#f0a1a7"],
      hoverBorderColor: ["#45bacb", "#c6adb1", "#46be77", "#a2b8c3", "#f0a1a7"]
    }]
  }
  var data2 = {
    //labels: ['소셜 ','종합몰','전문몰',"PG사",'오픈마켓'],
    datasets: [{
      labels: ['소셜 ', '종합몰', '전문몰', "PG사", '오픈마켓'],
      data: ['11', '23', '4', '33', '30'],
      backgroundColor: ["#eec843", "#e1d5c7", "#87d9c3", "#b0c964", "#bfb0d1"],
      hoverBackgroundColor: ["#eec843", "#e1d5c7", "#87d9c3", "#b0c964", "#bfb0d1"],
      borderColor: ["#eec843", "#e1d5c7", "#87d9c3", "#b0c964", "#bfb0d1"],
      hoverBorderColor: ["#eec843", "#e1d5c7", "#87d9c3", "#b0c964", "#bfb0d1"]
    }]
  }
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: data1,
    options: {

      cutoutPercentage: 60,
      layout: {
        padding: {
          top: 25,
          bottom: 30,
          right: 30,
          left: 30,
        }
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '판매몰별 매출',
        fontSize: 24,
        fontColor: "#333333",
        padding: 20
      },
      tooltips: {
        enabled: false,
      }
    }
  });
  var myChart = new Chart(ctx2, {
    type: 'doughnut',
    data: data1,
    options: {
      cutoutPercentage: 60,
      layout: {
        padding: {
          top: 25,
          bottom: 30,
          right: 30,
          left: 30,
        }
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '판매몰별 공제',
        fontSize: 24,
        fontColor: "#333333",
        padding: 20
      },
      tooltips: {
        enabled: false,
      }
    }
  });
  var myChart = new Chart(ctx3, {
    type: 'doughnut',
    data: data2,
    options: {
      cutoutPercentage: 60,
      layout: {
        padding: {
          top: 25,
          bottom: 30,
          right: 30,
          left: 30,
        }
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '마켓유형별 매출',
        fontSize: 24,
        fontColor: "#333333",
        padding: 20
      },
      tooltips: {
        enabled: false,
      }
    }
  });
  var myChart = new Chart(ctx4, {
    type: 'doughnut',
    data: data2,
    options: {
      cutoutPercentage: 60,
      layout: {
        padding: {
          top: 25,
          bottom: 30,
          right: 30,
          left: 30,
        }
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '마켓유형별 공제',
        fontSize: 24,
        fontColor: "#333333",
        padding: 20
      },
      tooltips: {
        enabled: false,
      }
    }
  });
  var myChart = new Chart(ctx5, {
    type: 'bar',
    data: {
      labels: ['전월 대비', '전년 동월대비'],
      datasets: [{
        data: ['15', '-30'],
        backgroundColor: ["#75ced2", "#f4715b"],
        hoverBackgroundColor: ["#75ced2", "#f4715b"],
        borderColor: ["#75ced2", "#f4715b"],
        hoverBorderColor: ["#75ced2", "#f4715b"]
      }]
    },
    options: option2
  });
  var myChart = new Chart(ctx6, {
    type: 'bar',
    data: {
      labels: ['2018-12월', '2018-04월', '월평균'],
      datasets: [{
        data: ['1129346', '804812', '986072'],
        backgroundColor: ["#75ced2", "#f4715b", "#d6a7d1"],
        hoverBackgroundColor: ["#75ced2", "#f4715b", "#d6a7d1"],
        borderColor: ["#75ced2", "#f4715b", "#d6a7d1"],
        hoverBorderColor: ["#75ced2", "#f4715b", "#d6a7d1"]
      }]
    },
    options: option2
  });
  var myChart = new Chart(ctx7, {
    type: 'bar',
    data: {
      labels: ['전월 대비', '전년 동월대비'],
      datasets: [{
        data: ['30', '-50'],
        backgroundColor: ["#75ced2", "#f4715b"],
        hoverBackgroundColor: ["#75ced2", "#f4715b"],
        borderColor: ["#75ced2", "#f4715b"],
        hoverBorderColor: ["#75ced2", "#f4715b"]
      }]
    },
    options: option_eidt_1
  });
  var myChart = new Chart(ctx8, {
    type: 'bar',
    data: {
      labels: ['2018-12월', '2018-04월', '월평균'],
      datasets: [{
        data: ['1129346', '804812', '986072'],
        backgroundColor: ["#75ced2", "#f4715b", "#d6a7d1"],
        hoverBackgroundColor: ["#75ced2", "#f4715b", "#d6a7d1"],
        borderColor: ["#75ced2", "#f4715b", "#d6a7d1"],
        hoverBorderColor: ["#75ced2", "#f4715b", "#d6a7d1"]
      }]
    },
    options: option_eidt_2
  });
  var myChart = new Chart(ctx9, {
    type: 'bar',
    data: {
      labels: ['전월 대비', '전년 동월대비'],
      datasets: [{
        data: ['30', '-50'],
        backgroundColor: ["#75ced2", "#f4715b"],
        hoverBackgroundColor: ["#75ced2", "#f4715b"],
        borderColor: ["#75ced2", "#f4715b"],
        hoverBorderColor: ["#75ced2", "#f4715b"]
      }]
    },
    options: option_eidt_1
  });
  var myChart = new Chart(ctx10, {
    type: 'bar',
    data: {
      labels: ['2018-12월', '2018-04월', '월평균'],
      datasets: [{
        data: ['1129346', '804812', '986072'],
        backgroundColor: ["#75ced2", "#f4715b", "#d6a7d1"],
        hoverBackgroundColor: ["#75ced2", "#f4715b", "#d6a7d1"],
        borderColor: ["#75ced2", "#f4715b", "#d6a7d1"],
        hoverBorderColor: ["#75ced2", "#f4715b", "#d6a7d1"]
      }]
    },
    options: option_eidt_2
  });
  //custom tooltip
  Chart.plugins.register({
    afterDatasetsDraw: function(chartInstance, easing) {
      // To only draw at the end of animation, check for easing === 1
      var ctx = chartInstance.chart.ctx;
      chartInstance.data.datasets.forEach(function(dataset, i) {
        var meta = chartInstance.getDatasetMeta(i);
        var chartID = chartInstance.chart.canvas.id;
        if (!meta.hidden) {
          if (chartID.includes("spGh2")) {
            meta.data.forEach(function(element, index) {
              // Draw the text in black, with the specified font
              ctx.fillStyle = '#212121';
              var fontSize = 12;
              var fontStyle = 'normal';
              var fontFamily = 'NanumSquare';
              var backgroundColor = 'rgba(79,105,232,0.2)';
              ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
              // Just naively convert to string for now
              var dataString = dataset.data[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              // Make sure alignment settings are correct
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              var padding = 5;
              var position = element.tooltipPosition();
              ctx.fillText(dataString + "원", position.x, position.y - (fontSize / 2) - padding);
            });
          } else if (chartID.includes("spGh1")) {
            meta.data.forEach(function(element, index) {
              // Draw the text in black, with the specified font
              ctx.fillStyle = '#fff';
              var fontSize = 12;
              var fontStyle = 'normal';
              var fontFamily = 'NanumSquare';
              var backgroundColor = 'rgba(79,105,232,0.2)';
              ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
              // Just naively convert to string for now
              var dataNum = dataset.data[index];
              var dataString = dataset.data[index].toString();
              // Make sure alignment settings are correct
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              var padding = 5;
              var position = element.tooltipPosition();
              if (dataNum > 0) {
                ctx.fillText("▲" + dataString + "%", position.x, position.y + (fontSize / 2) + padding);
              } else {
                dataNum = dataNum.replace(/[^0-9]/g, '');
                ctx.fillText("▼" + dataNum + "%", position.x, position.y - (fontSize / 2) - padding);
              }
            });
          } else if (chartID.includes("doughnut")) {
            meta.data.forEach(function(element, index) {
              // Draw the text in black, with the specified font
              ctx.fillStyle = 'black';
              var fontSize = 16;
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
              ctx.fillText(labelString, position.x, position.y - (fontSize));
              ctx.fillText(dataString + '%', position.x, position.y + (fontSize / 2));
            });
          }

        }
      });
    }
  });
