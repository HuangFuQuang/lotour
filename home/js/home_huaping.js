/**
 * Created by Administrator on 2017/1/10.
 */
$(window).ready(function () {
//探索区
    var listul= $(".index-list ul");
    var listlinum=$("#index-ul1  li").length;
    // console.log(listlinum);
    var liWidth=$("#index-ul1  li").width();
    listul.css("width",(liWidth+5)*listlinum);
    //增加鼠标滑过特效
    $(".in-on").mousemove(function () {
        if ($(this).hasClass("in_right")){
            move("right",$(this).parent());
        }else {
            move("left",$(this).parent());
        }
    })
    var num=0;
    function move(direction,ele) {
        if(direction=="right"){
            if(num<=listul.width()){
                num+=10;
            ele.find("ul").css("left",-num);
            }

        }else {
            if(num>=0){
                num-=10;
                ele.find("ul").css("left",-num);
            }
        }
    }

})
