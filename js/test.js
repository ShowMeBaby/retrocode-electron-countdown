var order = {
	orderType2c: "圆通快递",
	taskNo: "OYSFP2020061800042_T1",
	shopNo: "201908237B010",
	orderNo: "OYSFP2020061800042",
	licensePlateNo: "",
	orderTime: "2020年06月18日 14:47:25",
	taskStatus: "00",
	trolleyNo: "",
	trolleyDriver: "13995600276",
	trolleyDriverTime: "",
	skuSpecs: "EXPRESS",
	sourceName: "梅姐",
	recipientName: "伯乐黄慧华",
	recipientTelephone: "18588788883",
	recipientProvince: "44",
	recipientCity: "4401",
	recipientCounty: "440104",
	offeringType: "LOGISTICS",
	calTon: "",
	trFee: "",
	floor: "7",
	region: "",
	businessMobilePhoneNo: "18062058158",
	taskType: "EXPRESS_DELIVERY",
	trackingNo: "",
	picture: "",
	temporaryStorageRegion: "",
	shopName: "7B010",
	recipientAddress: "环市西路184号红棉国际服装城7楼7308档",
	pack: "",
	buyerName: "",
	buyerTelephone: "",
	notes: "",
	note2: "",
	picturePath: "",
	taskStatusName: "新建",
	taskTypeName: "快递发货",
	recipientProvinceName: "广东省",
	recipientCityName: "广州市",
	recipientCountyName: "越秀区",
};
function compileJson(json) {
	return compileStr(JSON.stringify(json));
}
// 对json进行解密
function uncompileJson(jsonStringCode) {
	return JSON.parse(uncompileStr(jsonStringCode));
}
// 对字符串进行加密
function compileStr(code) {
	var c = String.fromCharCode(code.charCodeAt(0) + code.length);
	for (var i = 1; i < code.length; i++) {
		var char = String.fromCharCode(
			code.charCodeAt(i) + code.charCodeAt(i - 1)
		);
		c += char;
	}
	return escape(c);
}
// 对字符串进行解密
function uncompileStr(code) {
	var newCode = code;
	// for (var i = 1; i < code.length; i++) {
	// 	if (code[i] == " ") {
	// 		newCode += "+";
	// 	} else {
	// 		newCode += code[i];
	// 	}
	// }
	// console.log(code);
	// console.log(newCode);

	code = unescape(newCode);
	var c = String.fromCharCode(code.charCodeAt(0) - code.length);
	for (var i = 1; i < code.length; i++) {
		var char = String.fromCharCode(
			code.charCodeAt(i) - c.charCodeAt(i - 1)
		);
		c += char;
	}
	return c;
}

var code = compileJson(order);
console.log(code);
var json = uncompileJson(code);
console.log(json);
