/**
 * Created by Administrator on 2017/1/11.
 */
HomePv("pv.json",".fl-traveller","pv");
function HomePv(url,ul,li) {
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