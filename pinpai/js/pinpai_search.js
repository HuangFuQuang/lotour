/**
 * Created by Administrator on 2017/1/12.
 */
$(document).ready(function () {
    // 随机生成一个推荐搜索
    var mudiditips = [{ "name": "不断片儿，都白瞎这好啤酒", "id": "67" },
        { "name": "像阿凡达一样穿越梦幻仙境", "id": "187" },{ "name": "起来嗨！懒人的细胞在跳动", "id": "202212" },
        { "name": "缱绻千年 旧都遗梦", "id": "103" },{ "name": "那就是第一", "id": "1946" },
        { "name": "有生之年尝尝神仙滋味儿", "id": "70" },{ "name": "好山好水品好茶", "id": "203292" },
        { "name": "天堂蜜月的代名词", "id": "374" },{ "name": "我为浪漫天涯代言", "id": "240" },
        { "name": "上帝遗落在印度洋上的眼泪", "id": "458" },{ "name": "一个不止有袋鼠和考拉国家", "id": "755" },
        { "name": "还记得大明湖畔夏雨荷吗？", "id": "66" },{ "name": "不只是赌博", "id": "287" },
        { "name": "这里时间就是用来浪费的", "id": "131" },{ "name": "明星都去这度蜜月", "id": "443" },
        { "name": "后会怎无期？爱上东极岛", "id": "126" },{ "name": "上有天堂，下有苏杭", "id": "105" },
        { "name": "纵欲天堂，人人皆是欢喜佛", "id": "320" },{ "name": "秦始皇寻仙的天尽头", "id": "76" },
        { "name": "北纬21℃的热带原始森林", "id": "998" },{ "name": "遗落人间的世外桃源", "id": "203843" },
        { "name": "邂逅慵懒的小时光", "id": "1037" },{ "name": "风花雪夜月的浪漫之城", "id": "1002" },
        { "name": "麻将演绎成都生活", "id": "243" },{ "name": "穿梭摩天高楼的森林", "id": "1026" },
        { "name": "每天晒8小时15分的太阳", "id": "268" },{ "name": "啧啧！康巴汉子到底有多帅", "id": "203329" }];
    tips(mudiditips);
    function tips(arr) {
        var index=Math.floor(Math.random()*26);
        var tips=arr[index].name;
        // console.log(tips)
        $(".search").find("input").val(tips)
    }
    //聚焦事件
    $(".search").find("input").focusin(function () {
        $(".search_lb").css("display","block")
    });
    //失焦事件
    $(".search").find("input").focusout(function () {
        $(".search_lb").css("display","none");
        if ($(".search").find("input").val()==""){
            tips(mudiditips);//如果为空，触发函数
        }
    });
    //列表关闭事件
    $(".search_lb").find(".search_cls").click(function () {
        $(".search_lb").css("display","none");
    })
    //分享事件
    $(".bl_fun").find("a").mouseenter(function () {
       //console.log($(this).index())
        switch ($(this).index())
        {
            case 1:
                $(this).find("img").attr('src',"http://img1.lotour.net/pinpai/bl_weibo_on.png")
                break;
            case 2:
                $(this).find("img").attr("src","http://img1.lotour.net/pinpai/bl_weixin_on.png");
                qrd();
                break;
            case 3:
                $(this).find("img").attr("src","http://img1.lotour.net/pinpai/bl_qq_on.png");
                break;
            case 4:
                $(this).find("img").attr("src","http://img1.lotour.net/pinpai/bl_toup_on.png");
                break;
        }
    })
    $(".bl_fun").find("a").mouseleave(function () {
        //console.log($(this).index())
        switch ($(this).index())
        {
            case 1:
                $(this).find("img").attr('src',"http://img1.lotour.net/pinpai/bl_weibo.png")
                break;
            case 2:
                $(this).find("img").attr("src","http://img1.lotour.net/pinpai/bl_weixin.png");
                qrd();
                break;
            case 3:
                $(this).find("img").attr("src","http://img1.lotour.net/pinpai/bl_qq.png");
                break;
            case 4:
                $(this).find("img").attr("src","http://img1.lotour.net/pinpai/bl_toup.png");
                break;
        }
    })
    //二维码
    function qrd() {
        $(".bl_qrd").toggle();
    }
    //判断是否要按钮显示
    $(document).scroll(function () {
        var scr=$(window).scrollTop();
        // console.log(scr)
        //获取导航图片高度
        var imgHeight=$(".top_img").height();
        var lock=true
        if(scr>imgHeight&&lock){
            $(".bl_fun").css("display","block");
            lock=false;
        }else if (scr<imgHeight){
            $(".bl_fun").css("display","none");
            lock=true;
        }
    })
    //点击返回
    $(".bl_fun").find("a").eq(3).click(function () {
        $("html,body").animate({scrollTop:0},1000);//回到顶端
        return false;
    })
    //单击切换选项卡
    var ulNum=$(".yd_in").find(".bl_ul").length;
    for (var i=0;i<ulNum;i++){
        var $span=$("<span></span>");
        $span.appendTo($(".bl_points"));
    }
    //给第一个span赋予样式active
      $(".bl_points").find("span").eq(0).addClass("active");
    //定位居中
    var spanWidth=(10+$(".bl_points").find("span").width())*ulNum;
    var pointsWidth=$(".bl_points").width();
    var paddingLeft=pointsWidth/2-spanWidth/2;
    $(".bl_points").css("padding-left",paddingLeft);
    //第一次，左边按钮隐藏
    $(".left").hide();
    //单击事件开始
    var ulWidth=$(".bl_ul").width();
    var nowIndex=0;
    $(".btn").click(function () {
        if($(this).hasClass("right")&&nowIndex<ulNum-1&&!$(".yd_in").is(":animated")){
            nowIndex++;
            func();
        }else if(nowIndex>0&&!$(".yd_in").is(":animated")){
            nowIndex--;
            func();
        }
    })
    //小圆点点击事件
    $(".bl_points").find("span").click(function () {
        var spanIndex=$(this).index();
        nowIndex=spanIndex;
        func();
    })
    function func() {
        $(".yd_in").animate({"margin-left":-(nowIndex)*ulWidth},300,function () {
            if(nowIndex==ulNum-1){$(".right").hide();$(".left").show()}
            else if(nowIndex==0){$(".left").hide();$(".right").show()}
            //执行小圆点
            cirfunc();
        })
    }
    function cirfunc() {
        $(".bl_points").find("span").eq(nowIndex).addClass("active").siblings().removeClass("active");
    }
});
