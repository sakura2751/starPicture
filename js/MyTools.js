(function(e){
    e.MyTools = {
    /*
    * 获取标签的id
    * @param{String}id
    * */
        $:function(id) {
            return typeof id ==="string" ? document.getElementById(id) : null;
        },
        /*
        * 求实参之和
        * */
        argumentsSum:function () {
            var sum = 0;
            for (var i = 0; i < arguments.length; i++){
                sum += arguments[i];   //*
            }
            return sum;
        },
        /*2020-06-28
        * scroll家族获取被卷去的 高 或者 宽
        * */
        scroll:function () {
            if(window.pageYOffset !== null){
                return{
                    "top":window.pageYOffset,
                    "left":window.pageXOffset
                }
            }else if (document.compatMode === 'CSS1Compat'){
                return {
                    "top":document.documentElement.scrollTop,
                    "left":document.documentElement.scrollLeft
                }
            }
            return {
                "top":document.body.scrollTop,
                "left":document.body.scrollLeft
            }
        },
        /*2020-07-02
        * scroll家族获取能够滚动内容的 宽 或者 高
        * */
        scrollText:function () {
            if (document.compatMode === 'CSS1Compat'){
                return {
                    "height":document.documentElement.scrollHeight,
                    "width":document.documentElement.scrollWidth
                }
            }
            return {
                "height":document.body.scrollHeight,
                "width":document.body.scrollWidth
            }
        },
        /*2020-07-02
        * client家族获取屏幕可视区域的 宽 或者 高
        * */
        client:function () {
            if(window.innerHeight !== null){
                return{
                    "height":window.innerHeight,
                    "width":window.innerWidth
                }
            }else if (document.compatMode === 'CSS1Compat'){
                return {
                    "height":document.documentElement.clientHeight,
                    "width":document.documentElement.clientWidth
                }
            }
            return {
                "height":document.body.clientHeight,
                "width":document.body.clientWidth
            }
        },
        /*2020-07-01
        * 广告动画回位
        * @param{String}top
        * @param{String}tag
        * */
        adsAnimationComeback:function (top,selecter) {
            //  开启滚动事件
            var timerId = null, begin = 0, end = 0;
            window.addEventListener("scroll", function () {
                //    清除定时器
                clearInterval(timerId);
                //  获取卷去的高度       ***
                var scrollTop = MyTools.scroll().top;
                end = scrollTop;
                //    开启定时器
                timerId = setInterval(function () {
                    //  缓动动画
                    begin += (end - begin) * 0.2;
                    selecter.style.top = top +  begin + 'px';
                    //  判断
                    if (Math.round(begin) === end){
                        clearInterval(timerId);
                    }
                },20);
            });
        },
        /*2020-07-01
        * 导航条贴顶
        * @param{String}navSelecter
        * */
        navStick:function (navSelecter) {
            var top = navSelecter.offsetTop;
            //    开启滚动事件
            window.addEventListener("scroll", function () {
                //    获取卷去的高度
                var scrollTop = MyTools.scroll().top;
                //    判断
                if (scrollTop > top){
                    navSelecter.style.position = 'fixed';
                    navSelecter.style.top = 0;

                }else {
                    navSelecter.style.position = '';
                }
            });
        },
        /*2020-07-02
        * 回顶动画
        * @param{String}id
        * */
        comeTopAnimation:function (id) {
            //监听滚动事件
            var timerId = null,begin = 0, end = 0;
            window.addEventListener("scroll", function () {
                //获取卷去的高度
                var scrollTop = MyTools.scroll().top;
                //判断
                if (scrollTop > 0){
                    MyTools.$(id).style.display = 'block';
                }else {
                    MyTools.$(id).style.display = 'none';
                }
                begin = scrollTop;
                //    监听点击事件
                MyTools.$(id).addEventListener("click", function () {
                    //    清除定时器
                    clearInterval(timerId);
                    //    开启定时器;
                    timerId = setInterval(function () {
                        begin += (end - begin) * 0.2;
                        window.scrollTo(0, begin);
                        if (Math.round(begin) === end) {
                            clearInterval(timerId);
                        }
                    }, 20);
                });
            });
        },
        /*2020-07-02
        * 瀑布流
        * @param{String}parent
        * @param{Array}children
        * */
        waterfallFlow:function (parentSelecter,childrenSelecter) {
            //  获取 页面 宽
            var clientWidth = MyTools.client().width;
            //  一个 子盒子 的 宽度
            var childrenWidth = childrenSelecter[0].offsetWidth;
            //  计算一行图片个数
            var firstCol = parseInt(clientWidth / childrenWidth);
            //给 父盒子 设置 宽度 并 居中
            parentSelecter.style.width = firstCol * childrenWidth +'px';
            parentSelecter.style.margin = '0 auto';
            //  瀑布流排图    **
            var firstHeight = [],minHeight = 0,minIndex = 0;
            for (var i = 0; i < childrenSelecter.length; i++){
                childrenHeight= childrenSelecter[i].offsetHeight;
                //  判断  ***
                if (i < firstCol){
                    // 第一行高度 统一装进数组
                    firstHeight.push(childrenHeight);
                    //  去掉第一行的定位属性      *
                    childrenSelecter[i].style = "";
                }else {
                    //  取出盒子中 最短高度 及 其索引
                    minHeight = _.min(firstHeight);
                    for (var j = 0; j < firstCol; j++){
                        if (minHeight === firstHeight[j]){
                            minIndex = j;
                        }
                    }
                    //  定位盒子
                    childrenSelecter[i].style.position = 'absolute';
                    childrenSelecter[i].style.left = minIndex * childrenSelecter[0].offsetWidth + 'px';
                    childrenSelecter[i].style.top = minHeight + 'px';
                    //  更新 imgHeight 数组
                    firstHeight[minIndex] += childrenSelecter[i].offsetHeight;
                }
            }
        },
        /*
        * Js获取CSS样式值
        * @param{Object}obj
        * @@param{String}attr
        * */
        getStyleAttr:function (obj,attr) {
            if (obj.currentStyle){      //Ie和opera
                return obj.currentStyle[attr];
            }else {     //标准
                return window.getComputedStyle(obj,null)[attr];
            }

        },
        /*
        * 缓动动画  数值属性值
        * @param{Object}eleObj
        * @param{Number}fixedTime
        * @param{Object}json
        * @param{Function}fn*/
        slowAnimation:function (eleObj,fixedTime,json,fn) {
            //    清除定时器     ** 将定时器绑定到eleObj对象
            clearInterval(eleObj.timer);
            //定义变量
            var speed = 0,begin = 0,end = 0,flag = false;
            //    设置定时器
            eleObj.timer = setInterval(function () {
                flag = true;
                //遍历属性      **
                for(var key in json){
                    //判断 区分透明度属性
                    if (key === 'opacity') {
                        begin = MyTools.getStyleAttr(eleObj, key) * 100 || 0;
                        end = json[key] * 100;
                    }else if (key === 'scrollTop'){
                        begin = Math.ceil(Number( eleObj.scrollTop));
                        end = parseInt(json[key]);

                    }else {
                        //    缓动动画      ** 获取样式值函数自带'px'单位，加减时要去除，否则值为NaN
                        begin = parseInt(MyTools.getStyleAttr(eleObj,key)) || 0;
                        end = parseInt(json[key]);
                    }
                    //速度
                    speed = (end - begin) * 0.2;
                    speed = (end > begin) ? Math.ceil(speed) : Math.floor(speed);
                    //运动
                    if (key === 'opacity') {
                        eleObj.style[key] = (begin + speed) / 100;
                    }else if (key === 'zIndex') {
                        eleObj.style[key] = begin + speed;
                    }else if (key === 'scrollTop'){
                        //两种写法  **  eleObj.scrollTop   eleObj[key]
                        // eleObj.scrollTop = begin + speed;
                        eleObj[key] = begin + speed;
                    }else {
                        eleObj.style[key] = begin + speed + 'px';
                    }
                    //判断        **
                    if (begin !== end){
                        flag = false;
                    }
                }
                //  清除定时器
                if (flag){
                    clearInterval(eleObj.timer);
                    fn && fn();
                }
            },fixedTime);
        }
    }

})(window)