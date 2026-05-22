//jQ仿*.master load master
function imitateMaster(page){
    $('#master').load('_master.html', function(){
       $('#body').load(page + ' .container', function(){
           $('#body .container').unwrap('#body'); //仿*.master，但用div，故unwrap
           $('#Content1').remove();
           pagejQ(); //因仿*.master，若需動作的需另外寫在pagejQ()裡才能觸發，aspx需重新整理  
       });    
    });
}