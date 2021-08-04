// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
'use strict';
const WindowUtil = require('./js/util/WindowUtil.js');
const remote = require('electron').remote;
const { dialog } = remote;

var initVue = function () {
	return new Vue({
		el: '#app',
		data: {
			boolCountDown: false,
			countDownInput: 10,
			countDownCount: 10,
			// time: "",
			syday: '<span>0</span>:<span>00</span>:<span>00</span>',
			year: '',
			week: '星期啥',
			date: 'date',
			times: '',
			HHCss: '',
			MMCss: '',
			SSCss: ''
		},
		methods: {
			stopCountDown: function () {
				var _this = this;
				_this.$data.boolCountDown = false;
			},
			startCountDown: function () {
				var _this = this;
				_this.$data.countDownCount = new Date().getTime() + _this.$data.countDownInput * 60 * 1000;
				_this.$data.boolCountDown = true;
			},
			// 时钟走字方法
			Todayss: function () {
				var _this = this;
				var day = new Date(); //日期
				var Y = day.getFullYear(); //年
				var M = day.getMonth() + 1; //月
				var D = day.getDate(); //日
				var U = day.getUTCDay(); //周
				var H = day.getHours(); //时
				var MIN = day.getMinutes(); //分
				var S = day.getSeconds(); //秒
				var MSs = day.getMilliseconds();
				var MS = MSs.toString().substring(0, 2);
				// 计算指针度数
				var sss = S * 6,
					mmm = MIN * 6 + sss * 0.01,
					hhh = H * 30 + MIN * 0.5;
				var rotss = 'rotate(' + sss + 'deg)';
				var rotmm = 'rotate(' + mmm + 'deg)';
				var rothh = 'rotate(' + hhh + 'deg)';
				// $(".HH").css({
				// 	"transform": rothh
				// });
				_this.$data.HHCss = rothh;
				// $(".MM").css({
				// 	"transform": rotmm
				// });
				_this.$data.MMCss = rotmm;
				// $(".SS").css({
				// 	"transform": rotss
				// });
				_this.$data.SSCss = rotss;
				// console.log(rothh, rotmm, rotss);
				// 小于两位数,保持两位
				if (M < 10) {
					M = '0' + M;
				}
				if (D < 10) {
					D = '0' + D;
				}
				if (H < 10) {
					H = '0' + H;
				}
				if (MIN < 10) {
					MIN = '0' + MIN;
				}
				if (S < 10) {
					S = '0' + S;
				}

				switch (U) {
					case 0:
						U = '星期日';
						break;
					case 1:
						U = '星期一';
						break;
					case 2:
						U = '星期二';
						break;
					case 3:
						U = '星期三';
						break;
					case 4:
						U = '星期四';
						break;
					case 5:
						U = '星期五';
						break;
					case 6:
						U = '星期六';
						break;
				}
				//星期赋值
				var week = U;
				// $(".week").html(week);
				_this.$data.week = week;
				//年份赋值
				var year = Y;
				// $(".year").html(year);
				_this.$data.year = year;
				//日期赋值
				var date = '<span>' + M + '</span>' + '月' + '<span>' + D + '</span>' + '日';
				// $(".date").html(date);
				_this.$data.date = date;
				//时间赋值
				var times =
					'<span>' +
					H +
					'</span>' +
					':' +
					'' +
					'<span>' +
					MIN +
					'</span>' +
					':' +
					'' +
					'<span>' +
					S +
					'</span>' +
					':' +
					'' +
					'<span>' +
					MS +
					'</span>';
				// $(".times").html(times);
				_this.$data.times = times;
			},
			CountDown: function () {
				var _this = this;
				if (!_this.$data.boolCountDown) {
					_this.$data.syday = '<span>0</span>:<span>00</span>:<span>00</span>';
					console.log(111);
					return;
				}
				var nowtime = new Date().getTime();
				//春节倒计时
				var starttime = _this.$data.countDownCount;

				var time = starttime - nowtime;
				var day = parseInt(time / 1000 / 60 / 60 / 24);
				var hour = parseInt((time / 1000 / 60 / 60) % 24);
				var minute = parseInt((time / 1000 / 60) % 60);
				var seconds = parseInt((time / 1000) % 60);
				_this.$data.syday = '<span>' + hour + '</span>' + ':' + '<span>' + minute + '</span>' + ':' + '<span>' + seconds + '</span>';
				if (time <= 0) {
					_this.stopCountDown();
					WindowUtil.show();
					dialog
						.showMessageBox({
							type: 'info',
							title: '提示倒计时已结束',
							message: '提示倒计时已结束',
							buttons: ['我知道了']
						})
						.then(ret => {
							if (ret.response == 0) {
								console.log('You click ok.');
							}
						});
				}
				// _this.$data.time = "<p>除夕倒计时</p>" + "<p><span>" + day + "</span>" + "天</p>";
			},
			maxwindow: function () {}
		},
		mounted() {
			var _this = this;
			setInterval(_this.CountDown, 10);
			setInterval(_this.Todayss, 10);
		}
	});
};
var vueApp = initVue();
