// document.onkeydown = function (n) {
//     var t = window.event ? n.keyCode : n.which;
//     console.log(t);
// };

console.log("hi there");
function ws(n){

    console.log(typeof(n));

    piano.music('a70',1, 0);
    var t= n[0];
    var str= n;
    var a;
    str= str.substring(1,3);
    if(t=='a'){
        a = notes.w_c.indexOf(Number(str));
        console.log(notes.w_n[a]);
    }else 
    {
        a = notes.b_c.indexOf(Number(str));
        console.log(notes.b_n[a]);
    }


};
