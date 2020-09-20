window.onload = function (ev) {

    //  获取标签（背景行为）
    var bubble = document.getElementsByClassName('bubble')[0];

    //     克隆
    for (var i = 0; i < 150; i++) {
        var newBubble = bubble.cloneNode(true);
        document.body.appendChild(newBubble);               //*
    }

    //  获取标签
    var bubble = document.getElementsByClassName('bubble');
    var nBubb = [];
    //  随机星星
    for (var j = 0; j < bubble.length; j++) {
        var nBubble = bubble[j];
        nBubble.style.top = _.random(10, 750) + 'px';       //*
        nBubble.style.left = _.random(0, 1500) + 'px';     //*
        nBubble.style.transform = 'scale(' + _.random(1, 6) + ')';     //*
        nBubb[j] = MyTools.getStyleAttr(nBubble,'transform');
        fn(nBubble);

        //  鼠标事件
        nBubble.addEventListener('mouseover', function () {
            this.style.transform = 'scale(10) rotate(200deg)';
            this.style.transformOrigin = 'center center';
            this.style.transition = 'transform 1s linear';
            this.style.animation = 'none';
        });

        (function (j) {
            nBubble.addEventListener('mouseout', function () {
                this.style.transform = 'rotate(0deg)';
                this.style.transform = nBubb[j];     //
                this.style.transformOrigin = 'center center';
                this.style.transition = 'transform 1s linear';
                fn(this);
            });
        })(j);

    }

    function fn(ev) {                //封装   *
        ev.style.animationName = 'qp';
        ev.style.animationDuration = '2s';
        ev.style.animationDirection = 'alternate';
        ev.style.animationDelay = _.random(0, 4) + 's';
        ev.style.animationIterationCount = 'infinite';
    }


    //    获取标签（照片墙行为）
    var pic = document.getElementById('pic');
    var everyPic = pic.getElementsByTagName('img');
    var top = [], left = [], tran = [];
    //  随机照片
    for (var k = 0; k < everyPic.length; k++) {
        var evePic = everyPic[k];
        evePic.style.top = _.random(200, 380) + 'px';
        top[k] = MyTools.getStyleAttr(evePic,'top');
        evePic.style.left = _.random(100, 1200) + 'px';
        left[k] = MyTools.getStyleAttr(evePic,'left');
        evePic.style.transform = 'rotate(' + _.random(-60, 60) + 'deg)';
        tran[k] = MyTools.getStyleAttr(evePic,'transform');
        //鼠标点击事件
        (function (index) {           //闭包   **
            evePic.addEventListener('mouseup',function (ev1) {
                // console.log(index);
                for (var h = 0; h < everyPic.length; h++) {
                    if (h != index) {
                        everyPic[h].style.height = '250px';
                        everyPic[h].style.zIndex = '10';
                        everyPic[h].style.transition = 'none';
                        everyPic[h].style.top  = top[h];
                        everyPic[h].style.left = left[h];
                        everyPic[h].style.transform = tran[h];
                    } else {
                        this.style.height = '400px';
                        this.style.left = '600px';
                        this.style.top = '200px'
                        this.style.transformOrigin = 'center center';
                        this.style.transform = 'rotate(360deg)';    //?
                        this.style.transition = 'left 1s linear, top 1s linear, height 1s linear, transform 1s linear';
                        this.style.zIndex = '100';
                    }
                }
            })
        })(k);
    }
};