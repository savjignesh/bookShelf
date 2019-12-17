jQuery( document ).ready(function() {
    if(localStorage.getItem('cat')!==''){
        var storedData = JSON.parse(localStorage.getItem('cat')).reverse();
        if(storedData.length > 0){
            var duplicate = find_duplicate_in_array(storedData);
            if(duplicate.length > 0){
                set_search_value(duplicate[0]);
            }else{
                console.log(storedData[0]);
                set_search_value(storedData[0]);
            }
        }
    }
    var x = 0;
    $(window).on('scroll', function(){
        var s = $(window).scrollTop(),
            d = $(document).height(),
            c = $(window).height();

        var scrollPercent = (s / (d - c)) * 100;
        
        if(scrollPercent > 40){
            $('#nav-bar').addClass('fixed-top');
            
        }else{
            $('#nav-bar').removeClass('fixed-top');
        }
    });
    
});

function set_search_value(val){
    $('#searchInput').val(val);
    buttonClick(val, false);
}
function find_duplicate_in_array(arra1) {
    var object = {};
    var result = [];

    arra1.forEach(function (item) {
      if(!object[item])
          object[item] = 0;
        object[item] += 1;
    })

    for (var prop in object) {
       if(object[prop] >= 2) {
           result.push(prop);
       }
    }
    return result;
}

function buttonClick(search, flag = true) {
     //Display loader for 3 sec
     for(var i = 1; i <=12; i++){
        var html ='<div class="col-sm-12 col-md-4">'+
                '<div class="books shadow-sm">'+
                    '<div class="row">'+
                        '<div class="col-4 col-sm-4 col-md-4">image</div>'+
                        '<div class="col-8 col-sm-8 col-md-8">'+
                                '<span class="book-title">.............</span>'+
                                '<p class="book-author" >..........</p>'+
                                '<p class="book-description">... ... ... .... ... ... .... .... ... ... .. ....  </p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
            $('#loader').append(html);
    }
    $('#loader').css('display', 'flex');
    $('#displayResult').css('display', 'none');
    setTimeout(function() {
        $('#loader').css('display', 'none');
        $('#displayResult').css('display', 'flex');
    }, 3000); // 3 sec

    jQuery.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/books/v1/volumes?q='+search+'&maxResults=12',
        dataType:'json',
        success: function(response){	
            
            if(typeof response.items != 'undefined' && response.items.length > 0){
                $('#displayResult').html('');
                var i=1;
                var catArr = Array();
                response.items.forEach(item => {
                    //Collect Auther names
                    var author = 'by ';
                    
                    if(typeof item.volumeInfo.authors!='undefined' && item.volumeInfo.authors.length > 0){
                        item.volumeInfo.authors.forEach(a => {
                            author+=a+', ';
                        });
                    }
                    //Record history data
                    if(i===1 && flag){
                        var oldData = localStorage.getItem('cat');
                        if(oldData !== ''){
                            JSON.parse(oldData).forEach(val => {
                                catArr.push(val);
                            });
                        }
                        
                        item.volumeInfo.categories.forEach(c => {
                            catArr.push(c);
                        });
                        
                        if(catArr.length > 5){
                            catArr = catArr.slice(1);
                        }
                        localStorage.setItem('cat',JSON.stringify(catArr));
                    }
                    var html ='<div class="col-sm-12 col-md-4">'+
                                    '<div class="books shadow-sm">'+
                                        '<div class="row">'+
                                            '<div class="col-4 col-sm-4 col-md-4"><img class="book-img" src="'+item.volumeInfo.imageLinks.thumbnail+'"></div>'+
                                            '<div class="col-8 col-sm-8 col-md-8">'+
                                                    '<span class="book-title" title="'+item.volumeInfo.title+'">'+item.volumeInfo.title+'</span>'+
                                                    '<p class="book-author" title="'+author+'">'+author+'</p>'+
                                                    '<p class="book-description">'+item.volumeInfo.description+'</p>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
                $('#displayResult').append(html);
                i++;
                });
            }else{
                alert('No data found');
                return false;
            }
             
        },
        complete: function (response){
            
        }
    });
}
jQuery('#searchButton').click(function(e){
    e.preventDefault();
    var search = $('#searchInput').val();
    //Validation
    if(search.length ===0){
        alert('Please enter search value');
        return false;
    }
    buttonClick(search);
    return false;
});

