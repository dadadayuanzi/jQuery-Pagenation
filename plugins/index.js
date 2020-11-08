// 实现插件==》扩展插件+插件功能
// 扩展插件--》$.fn.extend()
// 插件功能--》 实现方法，例如点击，动态渲染等

(function($){

    function init(dom, args) {
        console.log(dom,args);
        if(args.currentPage <= args.pageCount){
            fillHtml(dom,args);
            bindEvent(dom, args);
        }else{
            alert('请输入正确的页码')
        }
    }
    // 渲染html结构
    function fillHtml(dom, args) {
        // 上一页
        if (args.currentPage > 1){
            dom.append('<a href="#" class="prePage">上一页</a>')
        }else{
            dom.remove('.prePage');
            dom.append('<span class="disabled">上一页</span>')
        }

        // 中间页数

        // 第一页
        if (args.currentPage !== 1 && args.currentPage >= 4 && args.pageCount !== 4){
            dom.append('<a href="#" class="num">1</a>')
        }

        if (args.currentPage - 2 > 2 && args.pageCount > 5) {
            dom.append('<span>...</span>')
        }

        // 中间连续页数
        var start = args.currentPage - 2;
        var end = args.currentPage + 2;
        for (;start <= end; start ++){
            if (start <= args.pageCount && start >= 1){
                if( start == args.currentPage){
                    dom.append('<span class="current">'+ start +'</span>')
                }else{
                    dom.append('<a href="#" class="num">'+ start +'</a>')
                }
            }
        }

        // 最后一页
        if (args.currentPage + 2 < args.pageCount - 1 && args.pageCount > 5) {
            dom.append('<span>...</span>')
        }

        if (args.currentPage !== args.pageCount && args.currentPage < args.pageCount-2 && args.pageCount !== 4) {
            dom.append('<a href="#" class="num">'+ args.pageCount + '</a>');
        }



        // 下一页
        if (args.currentPage < args.pageCount){
            dom.append('<a href="#" class="nextPage">下一页</a>')
        }else{
            dom.remove('.nextPage');
            dom.append('<span class="disabled">下一页</span>')
        }
    }
    // 点击事件
    function bindEvent(dom, args) {
        dom.on('click','.num',function (){
            var cur = parseInt($(this).text())
            changePage(dom,args,cur)
        })
        dom.on('click','.prePage',function (){
            var cur =  parseInt(dom.find('.current').text())
            changePage(dom,args,cur - 1)
        })
        dom.on('click','.nextPage',function (){
            var cur =  parseInt(dom.find('.current').text())
            changePage( dom,args,cur + 1)
        })
    }
    //重新渲染实现
    function changePage(dom,args,page){
        $('#page').empty()
        fillHtml(dom,{currentPage:page,pageCount:args.pageCount})
        args.backFn(page)
    }
    // 扩展插件
    $.fn.extend({
        createPage: function(options){
            var args =$.extend({
                pageCount: 15,
                currentPage: 5,
                backFn:function(){}
            }, options);
            init(this, args);
        }
    })
})(jQuery)