$(document).ready(function () {
  //初始化BS Tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
});

//spinner
function spinner(){ 
    setTimeout(function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show'); 
        }
    }, 100);
}

//倒數準備時間
function PREPARE(el) {
    var $count = el.find('[class$="count"]');

    var totalSec  = parseInt(el.attr('data-sec'));   
    var countdown = totalSec;    
    
    $count.text(countdown);
    
    var interval = setInterval(function() {
        countdown--;  
        
        if (countdown <= 0) {
            clearInterval(interval);
            
            $('.prepare').hide(); 
            $('.record').show();
            //觸發下一步：錄製檔案
            REC($('.record-spinner'));
        } else {
            $count.text(countdown);
        }
    }, 1000);
    
    $('.prepare').show();  
}

//錄製音檔
function REC(el) {
    var $count = el.find('[class$="count"]');
    var $bar   = el.find('[class$="borderFront"]'); 
        
    var totalSec = parseInt(el.attr('data-sec'));   
    var countdown = totalSec; 
    
    el.addClass('current').prop('disabled', true); //for [button]

    $count.text(countdown);
    $bar.css({
        'stroke-dasharray': '100 100',
        'transition': 'none'
    });
    
    var interval = setInterval(() => {
        countdown--;    
        var percentage = countdown / totalSec * 100;
       
        if (countdown < 0) {
            clearInterval(interval);
            el.removeClass('current').prop('disabled', false); //for [button]
            //觸發下一步：前往下一題
            next();    
        } else {
            $count.text(countdown + 1); //緩衝1秒
            $bar.css({
                'stroke-dasharray': percentage + ' 100',
                'transition': 'stroke-dasharray 1s linear'
            });
        }
    }, 1000); 
}    


//lightbox大螢幕圖片
function lightboxModal(e) {
  var _getSrc = e.getAttribute('href');

  $('body').append(`<div class="modal fade lightbox2" id="lightboxModal" tabindex="-1" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered modal-xl">
                            <div class="modal-content">
                              <div class="modal-body">
                                <div>
                                  <button type="button" class="btn-close btn-close-white float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                                  <img src="" class="img-fluid" alt=""/></div>
                              </div>
                            </div>
                          </div>
                        </div>`);

  $('#lightboxModal .modal-body img').attr('src', _getSrc);

  const myModal = new bootstrap.Modal('#lightboxModal');
  myModal.show();

  const myModalEl = document.getElementById('lightboxModal');
  myModalEl.addEventListener('hidden.bs.modal', event => {
    if (myModalEl.parentNode !== null) {
      myModalEl.parentNode.removeChild(myModalEl);
    }
  })

  return false;
}

//alertModal 警報視窗 (無右上X，不可點黑處關閉)
function alertModalDOM(html) {
  $('body').append(`<div class="modal fade" id="alertModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-body pt-5">`
    + html
    + `<div class="text-center mt-4 mb-3">
                          <button type="button" class="btn btn-primary rounded-pill px-4" data-bs-dismiss="modal">確定</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`);
  var myModal = new bootstrap.Modal(document.getElementById('alertModal'));
  myModal.show();

  const myModalEl = document.getElementById('alertModal');
  myModalEl.addEventListener('hidden.bs.modal', event => {
    if (myModalEl.parentNode !== null) {
      myModalEl.parentNode.removeChild(myModalEl);
    }
  })
}

//confirmModal 確認視窗 (無右上X，不可點黑處關閉)
function confirmModalDOM(html) {
  $('body').append(`<div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-body pt-5">`
    + html
    + `<div class="text-center mt-4 mb-3">
                          <button type="button" class="btn btn-primary rounded-pill px-4" data-bs-dismiss="modal">取消</button>  
                          <button type="button" class="btn btn-primary rounded-pill px-4" data-bs-dismiss="modal">確定</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`);
  var myModal = new bootstrap.Modal(document.getElementById('confirmModal'));
  myModal.show();

  const myModalEl = document.getElementById('confirmModal');
  myModalEl.addEventListener('hidden.bs.modal', event => {
    if (myModalEl.parentNode !== null) {
      myModalEl.parentNode.removeChild(myModalEl);
    }
  })
}

//msgModalDOM 訊息視窗 (有右上X，可點黑處關閉)
function msgModalDOM(html) {
  $('body').append(`<div class="modal fade" id="msgModal" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-body">
                        <div class="text-end mb-3">
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>`
    + html
    + `<div class="text-center mt-4 mb-3">
                          <button type="button" class="btn btn-primary rounded-pill px-4" data-bs-dismiss="modal">關閉</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`);
  var myModal = new bootstrap.Modal(document.getElementById('msgModal'));
  myModal.show();

  const myModalEl = document.getElementById('confirmModal');
  myModalEl.addEventListener('hidden.bs.modal', event => {
    if (myModalEl.parentNode !== null) {
      myModalEl.parentNode.removeChild(myModalEl);
    }
  })
}

//feedbackModal 回饋視窗
function feedbackModalDOM(v1, v2, v3, v4) {
  $('body').append(`<div class="modal fade" id="feedbackModal" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                      <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title fs-5 text-primary" id="feedbackModalLabel"><label class="me-1">Task 1</label>紀錄及回饋</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <h5 class="h6 feedback-h5">2020.10.10</h5>
                            <div class="row row-cols-1 g-0 feedback-card-group px-3">
                              <div class="col">
                                <div class="card feedback-card-text">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-2 col-xl-1 px-0 px-md-2"> <img src="Content/images/feedback/text.png" alt="text.png"/> </div>
                                      <div class="col-10 col-xl-11">
                                        <h5 class="card-title">內容</h5>
                                        <p class="card-text">` + v1 + `</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col">
                                <div class="card feedback-card-phonology">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-2 col-xl-1 px-0 px-md-2"> <img src="Content/images/feedback/phonology.png" alt="phonology.png"/> </div>
                                      <div class="col-10 col-xl-11">
                                        <h5 class="card-title">音韻</h5>
                                        <p class="card-text">` + v2 + `</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col">
                                <div class="card feedback-card-words">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-2 col-xl-1 px-0 px-md-2"> <img src="Content/images/feedback/words.png" alt="words.png"/> </div>
                                      <div class="col-10 col-xl-11">
                                        <h5 class="card-title">詞語</h5>
                                        <p class="card-text">` + v3 + `</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col">
                                <div class="card feedback-card-overall">
                                  <div class="card-body">
                                    <div class="row">
                                      <div class="col-2 col-xl-1 px-0 px-md-2"> <img src="Content/images/feedback/overall.png" alt="overall.png"/> </div>
                                      <div class="col-10 col-xl-11">
                                        <h5 class="card-title">整體表現</h5>
                                        <p class="card-text">` + v4 + `</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="text-center"> <a href="feedback.html" role="button" class="btn btn-primary btn-lg rounded-pill px-5 m-3" id="GO_FEEDBACK">以往紀錄及回饋</a> <a href="partIndex.html" role="button" class="btn btn-primary btn-lg rounded-pill px-5 m-3" id="GO_PARTINDEX">Part<label class="mx-1">1</label>首頁</a>
                              <button type="button" class="btn btn-primary btn-lg rounded-pill px-5 my-3" data-bs-dismiss="modal" id="CLOSE">關閉</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`);

  var myModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
  myModal.show();

  $('#feedbackModal').on('hidden.bs.modal', function () {
    $(this).remove();
  });

  //modal 回饋特效(顯示後方題型名稱) 
  $('#feedbackModal').on('shown.bs.modal', function () {
    let topH = $('.header').height() + 30;

    if ($(document).height() > $(window).height()) { //網頁有卷軸
      $('html, body').animate({
        scrollTop: $('.page').offset().top + topH
      }, 500);
    } else { //網頁沒有卷軸
      $('.page').animate({
        'margin-top': '-' + topH + 'px'
      }, 500);
    }

    $(this).css('padding-top', topH / 2);
  });
  $('#feedbackModal').on('hidden.bs.modal', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
    $('.page').animate({
      'margin-top': ''
    }, 500);
  });
}

//Loading Spinners 
function loadingDOM(ms) {
  $('body').append(`<div class="modal fade" id="loadingModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                          <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content bg-transparent border-0">
                              <div class="modal-body text-center">
                                <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                                  <span class="visually-hidden">Loading...</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`);
  var myModal = new bootstrap.Modal(document.getElementById('loadingModal'));
  myModal.show();

  var timeout = setTimeout(function () {
    myModal.hide();
  }, ms);

  $('#loadingModal').on('hidden.bs.modal', function () {
    $(this).remove();
  });
}
