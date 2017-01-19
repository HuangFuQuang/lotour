/**
 * Created by Administrator on 2017/1/16.
 */
$(document).ready(function () {
    //默认地区值
    saveStorage(200,50,2,0);
    function saveStorage(regionId,pageSize,pageIndex,isbroad) {
        sessionStorage.clear();//清除上一次值
        sessionStorage.setItem("regionId",regionId);
        sessionStorage.setItem("pageSize",pageSize);
        sessionStorage.setItem("pageIndex",pageIndex);
        sessionStorage.setItem("isbroad",isbroad);
    }
})