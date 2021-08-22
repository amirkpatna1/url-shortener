$(".fas").on("click",function(event){
    console.log(event);
    $(".choose").toggleClass("body-black");
    $(".unstyled-button i").toggleClass("fa-moon");
    $(".unstyled-button i").toggleClass("fa-sun");
    $("body").toggleClass("body-white");
    $("body").toggleClass("body-black");
    
    
});

$(".copy-btn").on("click",function(){
    $("#copy-input").select();
    document.execCommand('copy');
});