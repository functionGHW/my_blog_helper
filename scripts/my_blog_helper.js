/* functionghw's Bolg Helper
 * File:        my_blog_helper.js
 * Version:     v1.0
 * Coder:       functionghw (functionghw at hotmial dot com)
 * Created:     2013-12-18
 * Last Change: 2013-12-18 20:52:52
 * 
 * */

var is_changed = false;

function loadEditor() {
    var editor_html = '<textarea id="editor"></textarea>';

    //requeir jquery-webox.js, jquery-webbox.css
    $.webox({
        height: 400,
        width: 600,
        bgvisibel: true,
        title: "FunctionGHW's Blog Helper",
        html: editor_html
    });

    // Use setTimeout(), if using $().ready()
    //setTimeout(function() {
        $("#editor").on('input', function() {
            $("#preview").html($("#editor").val());
            is_changed = true;
        });
    //}, 50);
}

function loadController() {
    //require my_blog_helper.css
    var lnkEditor = '<button type="buttom" id="btnEditor">Open Editor</button>'

    $("body").prepend(lnkEditor);

    $("#btnEditor").click(function() {
        $('.webox').css({ display: 'block' });
        $('.background').css({ display: 'block' });        
    });

}

function addOnloadEvent(func){
    var oldevent = window.onload;
    if (oldevent) {
        window.onload = function() {
            oldevent();
            func();
        };
    }
    else {
        window.onload = func;
    }
}

function myBlogHelper() {
    loadEditor();

    loadController();

    // enable mathjax and sytaxhighlight preview support
    // do parsing every 4s.
    setInterval(function() {
        if (is_changed) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            SyntaxHighlighter.highlight();
            is_changed = false;
        }
    }, 4000);
};

addOnloadEvent(myBlogHelper);
