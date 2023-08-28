console.log('js完成');
let input_text = document.querySelector('#text_input')
let text_false = false
function put(){
    if(text_false){
        input_text.style.opacity = "1"
    }else {
        input_text.style.opacity = "0"
    }
}
put()
input_text.addEventListener('mouseenter',function(){
    text_false = true;
    put()
})
input_text.addEventListener('mouseleave',function(){
    text_false = false;
    put()
})

function LoadSearch(){
    var searchFunc = function(path, search_id, content_id) {
        'use strict'; //使用严格模式
        $.ajax({
            url: path,
            dataType: "xml",
            success: function( xmlResponse ) {
                // 从xml中获取相应的标题等数据
                var datas = $( "entry", xmlResponse ).map(function() {
                    return {
                        title: $( "title", this ).text(),
                        content: $("content",this).text(),
                        url: $( "url" , this).text()
                    };
                }).get();
                //ID选择器
                var $input = document.getElementById(search_id);
                var $resultContent = document.getElementById(content_id);
                $input.addEventListener('input', function(){
                    var str=
                    `
                    <div class="el-card box-card is-always-shadow">
    
                    </div>
                    `             
                    var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                    $resultContent.innerHTML = "";
                    if (this.value.trim().length <= 0) {
                        return;
                    }
                    // 本地搜索主要部分
                    datas.forEach(function(data) {
                        var isMatch = true;
                        var content_index = [];
                        var data_title = data.title.trim().toLowerCase();
                        var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                        var data_url = data.url;
                        var index_title = -1;
                        var index_content = -1;
                        var first_occur = -1;
                        // 只匹配非空文章
                        if(data_title != '' && data_content != '') {
                            keywords.forEach(function(keyword, i) {
                                index_title = data_title.indexOf(keyword);
                                index_content = data_content.indexOf(keyword);
                                if( index_title < 0 && index_content < 0 ){
                                    isMatch = false;
                                } else {
                                    if (index_content < 0) {
                                        index_content = 0;
                                    }
                                    if (i == 0) {
                                        first_occur = index_content;
                                    }
                                }
                            });
                        }
                        // 返回搜索结果
                        if (isMatch) {
                        //结果标签
                            str += 
                            `
                            <div class="el-card__header" >
                                <div class="clearfix" > 
                                    <span>${data_title}</span>
                                        <span><a style="color: rgb(255, 255, 255)" href="${window.location.origin}${data_url}">√</a></span>
                                </div>
                            </div>
                            
                            `
                            var content = data.content.trim().replace(/<[^>]+>/g,"");
                            if (first_occur >= 0) {
                                // 拿出含有搜索字的部分
                                var start = first_occur - 6;
                                var end = first_occur + 6;
                                if(start < 0){
                                    start = 0;
                                }
                                if(start == 0){
                                    end = 10;
                                }
                                if(end > content.length){
                                    end = content.length;
                                }
                                var match_content = content.substr(start, end); 
                                // 列出搜索关键字，定义class加高亮
                                keywords.forEach(function(keyword){
                                    var regS = new RegExp(keyword, "gi");
                                    match_content = match_content.replace(regS, "<em class=\"search-keyword\">"+keyword+"</em>");
                                })
                            
    
                            }
                        }
                    })
                    $resultContent.innerHTML = str;
                })
            }
        })
    };
    var path = "/search.xml";
    console.log('文章数据加载完毕');
    searchFunc(path, 'text_input', 'text_output');
    console.log('搜索模块初始化完成');
}

$(function() {
        var $input = $("input");
        
        $input.each(function() {
            var $title = $(this).attr("title");
                    
            $(this).val($title);
                        
            $(this).focus(function() {
                if($(this).val() === $title) {
                    $(this).val('');
                }
            })
            
            .blur(function() {
                if($(this).val() === "") {
                    $(this).val($title);
                }
            });
        });
    });


window.onload = function()
{
    LoadSearch();
}