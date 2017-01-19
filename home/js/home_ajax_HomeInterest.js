/**
 * Created by Administrator on 2017/1/9.
 */

HomeInterest("HomeInterest1.json","#index-ul1","index-li1");
HomeInterest("HomeInterest2.json","#index-ul2","index-li2");
function HomeInterest(url,ul,li) {
    $.ajax({
        type: "get",
        url: "http://localhost:63342/lotour.com/home/json/"+url,
        dataType: "json",
        success: function(datas) {
            console.log(datas)
            $.each(datas,function (i,value) {
               $(template(li,value)).appendTo($(ul));
            })
        },
        error:function () {
            console.log("数据请求错误")
        }
    });
}