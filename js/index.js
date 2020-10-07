$(function() {
    load();
    var data = getDate();
    //实现本地存储localStorage
    //1.添加toDoList代办事项
    $("#title").on("keydown", function(e) {
        if (e.keyCode === 13) {
            if ($(this).val() !== "") {
                //先读取本地存储原来的数据
                var local = getDate();
                //将local数组进行更新
                local.push({ title: $(this).val(), done: false });
                saveDate(local);
                load();
            } else {
                alert("请输入你需要的代办操作");
            }
            $(this).val("");
        }
    })

    //3.todolist的删除操作
    $("ol,ul").on("click", "a", function() {
            var data = getDate();
            console.log(data);
            var index = $(this).attr("id");
            data.splice(index, 1);
            saveDate(data);
            load();
        })
        // 4.checkbox
    $("ol,ul").on("click", "input", function() {
            var data = getDate();
            //修改里面的done数据
            var index = $(this).siblings("a").attr("id");
            data[index].done = $(this).prop("checked");
            saveDate(data);
            load();
        })
        //利用clearAll清楚所有的本地缓存
    $(".clearAll").on("click", function() {
            localStorage.clear();
            getDate();
            load();
        })
        //创建li并且将localStorage数据渲染加载到页面
    function load() {
        var data = getDate();
        var donecount = 0;
        var todocount = 0;
        $("ol").empty();
        $("ul").empty();
        $.each(data, function(i, n) {
            //判断done是否任务完成
            if (n.done) {
                $("ul").append("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id='" + i + "'></a></li>");
                donecount++;
            } else {
                $("ol").append("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id='" + i + "'></a></li>");
                todocount++;
            }
        })
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);
        //给todolist模块设定一个点击事件
        $.each($("ol p"), function(i, ele) {
            $(this).on("click", function() {
                //禁止双击选中文字
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                // console.log(data);
                var str = $(this).text();
                // console.log(str);
                var index = $(this).siblings("a").attr("id");
                // console.log(index);
                $(this).html('<input type="text">');
                var input = $(this).children();
                input.val(str);
                input.select();
                input.on("blur", function() {
                    $(this).parent().html(input.val());
                    data[index].title = input.val();
                    // console.log(data);
                    saveDate(data);
                })
                input.on("keydown", function(e) {
                    if (e.keyCode === 13) {
                        $(this).blur();
                    }
                })
            })
        })

        //donelist模块
        $.each($("ul p"), function(i, ele) {
            $(this).on("click", function() {
                //禁止双击选中文字
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                // console.log(data);
                var str = $(this).text();
                // console.log(str);
                var index = $(this).siblings("a").attr("id");
                // console.log(index);
                $(this).html('<input type="text">');
                var input = $(this).children();
                input.val(str);
                input.select();
                input.on("blur", function() {
                    $(this).parent().html(input.val());
                    data[index].title = input.val();
                    // console.log(data);
                    saveDate(data);
                })
                input.on("keydown", function(e) {
                    if (e.keyCode === 13) {
                        $(this).blur();
                    }
                })
            })
        })

    }
    //读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    //保存本地存储数据
    function saveDate(local) {
        localStorage.setItem("todolist", JSON.stringify(local));
    }


})