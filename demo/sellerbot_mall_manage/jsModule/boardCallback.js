
  const gridData = [{
      price1: '1,453,115',
      price2: '1,453,115',
      price3: '1,453,115',
      price4: '0',
      price5: '0',
      price6: '5,132,150',
      price7: '5,132,150'
    },
    {
      price1: '1,453,115',
      price2: '1,453,115',
      price3: '1,453,115',
      price4: '0',
      price5: '0',
      price6: '5,132,150',
      price7: '5,132,150'
    },
    {
      price1: '1,453,115',
      price2: '1,453,115',
      price3: '1,453,115',
      price4: '0',
      price5: '0',
      price6: '5,132,150',
      price7: '5,132,150'
    },
    {
      price1: '1,453,115',
      price2: '1,453,115',
      price3: '1,453,115',
      price4: '0',
      price5: '0',
      price6: '5,132,150',
      price7: '5,132,150'
    },

  ];
  const grid = new tui.Grid({
    el: document.getElementById('grid_2'),
    //data: {
    //페이징기능을 위해 서버에 연결바랍니다.//
    //데이터가 없을 경우 "NODATA"가 출력됩니다.//
    //서버관련 참고 URL : http://forward.nhnent.com/hands-on-labs/toastui.grid-account-book/07.html , https://github.com/nhn/tui.grid/blob/master/docs/en/data-source.md //
    /*
      api: {
        readData: { url: '/api/readData', method: 'GET' }
      }
      */
    //},
    data: gridData,
    scrollX: true,
    scrollY: false,
    width:1200,
    maxBodyWidth: 1200,
    minBodyHeight: 30,
    header: {
      width: 200,
      height: 100,
      complexColumns: [{
          header: 'coolncool',
          name: 'mergeColumn1',
          childNames: ['price1']
        },
        {
          header: 'Extcoolncoolra',
          name: 'mergeColumn2',
          childNames: ['price2']
        },
        {
          header: 'coolncool',
          name: 'mergeColumn3',
          childNames: ['price3']
        },
        {
          header: 'coolncool',
          name: 'mergeColumn4',
          childNames: ['price4']
        },
        {
          header: 'coolncool',
          name: 'mergeColumn5',
          childNames: ['price5']
        },
        {
          header: 'coolncool',
          name: 'mergeColumn6',
          childNames: ['price6']
        },
        {
          header: 'coolncool',
          name: 'mergeColumn7',
          childNames: ['price7']
        }
      ]
    },
    columns: [{
        header: '몰명',
        name: 'price1',
        align: 'right',
        width: 200,
      },
      {
        header: '몰명',
        name: 'price2',
        align: 'right',
        width: 200,
      },
      {
        header: '몰명',
        name: 'price3',
        align: 'right',
        width: 200,
      },
      {
        header: '몰명',
        name: 'price4',
        align: 'right',
        width: 200,
      },
      {
        header: '몰명',
        name: 'price5',
        align: 'right',
        width: 200,
      },
      {
        header: '몰명',
        name: 'price6',
        align: 'right',
        width: 200,
      },
      {
        header: '몰명',
        name: 'price7',
        align: 'right',
        width: 200,
      },

    ]
  });
