/**
 * Created by Administrator on 2017/1/10.
 */
HomeInSide("HomeInSide1.json","#c-listul1","chuguo1");
HomeInSide("HomeInSide2.json","#c-listul2","chuguo2");
HomeInSide("HomeInSide3.json","#c-listul3","chujing1");
HomeInSide("HomeInSide4.json","#c-listul4","chujing2");
function HomeInSide(url,ul,li) {
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