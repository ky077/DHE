//showHidePD 密碼 顯示|隱藏
$('.fun-showHidePD__button').click(function(){
    $(this).html( function(index, html){
        return html == '<i class="fas fa-eye-slash"></i>' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    } );
    
    $(this).attr('title', function(index, attr){
        return attr == '顯示密碼' ? '隱藏密碼' : '顯示密碼';
    });
 
    
    $(this).parents('.input-group').find('input').attr('type', function(index, attr){
        return attr == 'password' ? 'text' : 'password';
    });
});


//alertModal 訊息視窗
function alertModalDOM(html){
    $('body').append(`<div class="modal fade" id="alertModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-body">
                            <div class="text-end mb-3">
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>`
                            + html +
                            `<div class="text-center mt-4 mb-3">
                              <button type="button" class="btn btn-primary rounded-pill px-4" data-bs-dismiss="modal">確定</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`);
    var myModal = new bootstrap.Modal(document.getElementById('alertModal'));
    myModal.show();
    
    //關閉後清除#alertModal，防止重複alertModal
    $('#alertModal').on('hidden.bs.modal', function (e) {
      $('#alertModal').remove();
    });
}