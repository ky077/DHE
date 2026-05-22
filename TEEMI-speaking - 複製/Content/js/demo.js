//網址參數
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);

  if (r != null) {
    return unescape(r[2]);
  }

  return null;
}

//題型標題 
function h2Content(title, describe) {
  let type = GetQueryString('type');
  let _class = '',
    _title = '',
    _describe = '';

  if (type) {
    let partNum = Number(type) + 1;
    $('.part-num label').text(partNum);

    switch (type) {
      case '0':
        _class = 'basic';
        _title = '基礎聽答';
        _describe = '簡單問答、語句理解答析';
        break;

      case '1':
        _class = 'situation';
        _title = '情境式提問及回答';
        _describe = '根根據情境提示(含中/英文的文字敘述、圖、表、錄音、短片)回答或提問';
        break;

      case '2':
        _class = 'topic';
        _title = '主題式口說任務';
        _describe = '依所提供的圖文資料或影片，在聽讀完畢後，依指示完成簡易口說任務';
        break;

      case '3':
        _class = 'summary';
        _title = '摘要報告/口頭發表';
        _describe = '依所提供的圖文資料或影片，在聽讀完畢後，依指示完成摘要或口頭發表的任務';
        break;

      default:
        break;
    }

    $('.part-item').addClass(_class);
    if (title) {
      $('.part-content-title').text(_title);
    }
    if (describe) {
      $('.part-content-describe').text(_describe);
    } else {
      if (describe == '') {
        $('.part-content-describe').text('');
      }
    }
  }
}

$(document).ready(function () {
  //判斷目前在哪一頁
  let pathName = document.location.pathname;
  let pathArray = pathName.split('/');
  let pageName = pathArray[pathArray.length - 1];

  let type = GetQueryString('type'),
    task = GetQueryString('task'),
    no = GetQueryString('no');
  let a, _href, replaceHref;

  //各頁執行    
  switch (pageName) {
    case 'partIndex.html':
      //題型標題  
      h2Content('title', 'describe');

      //內容按鈕連結   
      $('.content > .container > .row > div:nth-child(2) a').each(function () {
        a = $(this);
        _href = a.attr('href');
        a.attr('href', _href + '?type=' + type);
      });

      break;
      /////////////////////////////////////////////////
    case 'feedback.html':
      //題型標題  
      h2Content('title', '');

      //內容按鈕連結     
      $('#accordionFeedback .feedback-list a').each(function () {
        $(this).click(function (e) {
          e.preventDefault();
          feedbackModalDOM('偏離主題或文意難辨。',
            '毫無重點，雜亂無章。',
            '文法、句構多有錯誤，嚴重影響文意表達。',
            '字彙匱乏，拼字多有錯誤，嚴重影響文意表達。',
            '你的表現未達到 EMI課程最低英語口說要求。');
          $('#feedbackModal').find('#GO_FEEDBACK, #GO_PARTINDEX').remove();
          $('#feedbackModal h4 label').text($(this).parents('.accordion-item').find('h3 button').text());
          $('#feedbackModal .feedback-h5').text($(this).text());
        });
      });

      //返回連結 
      a = $('.content > .container > .row > div:last-child a');
      _href = a.attr('href');
      a.attr('href', _href + '?type=' + type)
        .find('label').text($('.part-num label').text());
          
      a.attr('titel', a.text());

      break;
      /////////////////////////////////////////////////
    case 'continue.html':
      //題型標題  
      h2Content('title', '');

      //內容按鈕連結  (依new.html排序，Task2固定為哪一個版型就是該號碼，非正式寫法)
      let templateNum;
      if (type == '0') { //part 1
        templateNum = '1';
      } else if (type == '1') { //part 2
        templateNum = '3';
      } else if (type == '2') { //part 3
        templateNum = '5';
      } else if (type == '3') { //part 4
        templateNum = '7';
      }

      $('.content > .container > .row > div:nth-child(2) a').each(function () {
        a = $(this);
        _href = a.attr('href');
        replaceHref = _href.replace(/\d+/g, templateNum);
        a.attr('href', replaceHref + '?type=' + type + '&task=1&no=2');
      });

      //返回連結 
      a = $('.content > .container > .row > div:last-child a');
      _href = a.attr('href');
      a.attr('href', _href + '?type=' + type)
        .find('label').text($('.part-num label').text());
          
      a.attr('titel', a.text());    

      break;
      /////////////////////////////////////////////////
    case 'new.html':
      //題型標題  
      h2Content('title', '');

      //內容按鈕連結 (Task1~5，依單/雙數排版型，非正式寫法)
      let odd, even;
      if (type == '0') { //part 1
        odd = '1';
        even = '1';
      } else if (type == '1') { //part 2
        odd = '2';
        even = '3';
      } else if (type == '2') { //part 3
        odd = '4';
        even = '5';
      } else if (type == '3') { //part 4
        odd = '6';
        even = '7';
      }

      $('.content > .container > .row > div:nth-child(2) a').each(function () {
        a = $(this);
        _href = a.attr('href');

        if (a.index() % 2 === 0) { //[0, 2, 4]
          replaceHref = _href.replace(/\d+/g, odd);
        } else { //[1, 3, 5]
          replaceHref = _href.replace(/\d+/g, even);
        }

        a.attr('href', replaceHref + '?type=' + type + '&task=' + a.index() + '&no=1');
      });

      //返回連結 
      a = $('.content > .container > .row > div:last-child a');
      _href = a.attr('href');
      a.attr('href', _href + '?type=' + type)
        .find('label').text($('.part-num label').text());
          
      a.attr('titel', a.text());    

      break;
      /////////////////////////////////////////////////
    case 'template1.html':
    case 'template2.html':
    case 'template3.html':
    case 'template4.html':
    case 'template5.html':
    case 'template6.html':
    case 'template7.html':
      //題型標題  
      h2Content('title');

      //Task顯示
      let nowTask = GetQueryString('task');
      let nowTaskNum = Number(nowTask) + 1;
      $('h3').text('Task ' + nowTaskNum);

      let nowNum = GetQueryString('no');
      let totalNum = $('#div_num > span').text().split('/')[1];
      let nextNum = Number(nowNum) + 1;

      //不是第一小題則滑到小題處
      if (nowNum > 1) {
        $('html,body').animate({
          scrollTop: $('#div_num').offset().top
        }, 500);
      }

      //小題號 顯示
      if ($('#div_num').length > 0) {
        let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        $('#div_num').html('第' + changeNum[nowNum] + '小題<span class="float-end">' + nowNum + '/' + totalNum + '</span>');
      }

      if (totalNum && nowNum != totalNum) { //有總題數 & 不是最後一題
        //按鈕 顯示 
        $('#NEXT').text('下一題');

        //按鈕連結
        a = $('#NEXT');
        _href = a.attr('href');
        a.attr('href', _href + '?type=' + type + '&task=' + nowTask + '&no=' + nextNum);
      } else { //只有一題
        //按鈕 顯示   
        $('#NEXT').text('完成');

        //若為<a>終止預設行為
        if ($('#NEXT').attr('href')) {
          $('#NEXT').attr('href', '#').click(function (e) {
            e.preventDefault();
          });
        }

        //[完成]
        $('#NEXT').click(function () { 
          STOPAUDIO();                            
                                      
          loadingDOM(3000);

          var timeout = setTimeout(function () {
            feedbackModalDOM('偏離主題或文意難辨。',
              '毫無重點，雜亂無章。',
              '文法、句構多有錯誤，嚴重影響文意表達。',
              '字彙匱乏，拼字多有錯誤，嚴重影響文意表達。',
              '你的表現未達到 EMI課程最低英語口說要求。');
            $('#feedbackModal').find('.modal-header .btn-close, .feedback-h5, #CLOSE').remove();
            $('#feedbackModal h4 label').text($('.content h3').text());

            $('#GO_FEEDBACK, #GO_PARTINDEX').each(function () {
              a = $(this);
              _href = a.attr('href');
              a.attr('href', _href + '?type=' + type);
            });

            $('#GO_PARTINDEX').find('label').text($('.part-num label').text());
          }, 3000);
        });
      }

      break;
      /////////////////////////////////////////////////
    default:
      break;
  }
});
