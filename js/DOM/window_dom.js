﻿function win_dom() {
    var e, s, y, w, u, h, r, c, t, l, p, i, a, v, n;
    loc.get("win") == null && loc.set("win", ["hidden", "recorder", , ]);
    var o = $("win"),
        n, f = document.createElement("div");
    for (f.id = "rec_bkg", f.setAttribute("onmousedown", "drag.startMoving(event,'win')"), 
        f.setAttribute("onmouseup", "drag.stopMoving('win')"), 
        n = document.createElement("span"), n.id = "rec_bkg_title", 
        i = document.createTextNode("Recorder"), n.appendChild(i), f.appendChild(n), 
        n = document.createElement("span"), n.id = "rec_bkg_-", n.setAttribute("onclick", 
            "win_fnc.viewer('" + loc.get("win").split(",")[1] + "',1)"), i = document.createTextNode("−"), 
            n.appendChild(i), f.appendChild(n), n = document.createElement("span"), 
            n.id = "rec_bkg_x", n.setAttribute("onclick", "win_fnc.close('" + loc.get("win").split(",")[1] + 
                "','" + win_fnc.coos[0] + "','" + win_fnc.coos[1] + "')"),
            i = document.createTextNode("✖"), n.appendChild(i), f.appendChild(n), o.appendChild(f), 
            e = document.createElement("span"), e.id = "sheet_tb1", s = document.createElement("select"), 
            s.id = "sheet_choose", s.setAttribute("onmousedown", "if (piano.nmb!=1 && !piano.play_pause) piano.recplay()"), 
            s.setAttribute("onchange", "trans.choose()"), y = 0; y < mus_sheet.length; y++) 
                w = document.createElement("option"), i = document.createTextNode(mus_sheet[y][0]), w.appendChild(i), s.appendChild(w);
    

    e.appendChild(s);
    u = document.createElement("input");
    u.id = "sheet_play";
    u.type = "button";
    u.value = "► Play";
    u.setAttribute("onclick", "piano.recplay()");
    e.appendChild(u);
    t = document.createElement("span");
    t.id = "sheet_stop_sep";
    t.className = "sep";
    i = document.createTextNode(" | ");
    t.appendChild(i);
    e.appendChild(t);
    u = document.createElement("input");
    u.id = "sheet_stop";
    u.type = "button";
    u.value = "■ Stop";
    u.setAttribute("onclick", "win_fnc.stop()");
    e.appendChild(u);
    o.appendChild(e);
    h = document.createElement("input");
    h.id = "recplay";
    h.type = "button";
    h.value = "● Record";
    h.setAttribute("onclick", "piano.recplay(true)");
    o.appendChild(h);
    r = document.createElement("span");
    r.id = "rec_tb2";
    n = document.createElement("input");
    n.type = "button";
    n.value = "[ ]";
    n.setAttribute("onclick", "rec.brackets(0)");
    r.appendChild(n);
    n = document.createElement("input");
    n.type = "button";
    n.value = "|";
    n.setAttribute("onclick", "rec.btn('|')");
    r.appendChild(n);
    n = document.createElement("input");
    n.type = "button";
    n.value = "*space*";
    n.setAttribute("onclick", "rec.btn(' ')");
    r.appendChild(n);
    t = document.createElement("span");
    t.className = "sep";
    i = document.createTextNode(" | ");
    t.appendChild(i);
    r.appendChild(t);
    n = document.createElement("input");
    n.type = "button";
    n.value = "highlight";
    n.setAttribute("onclick", "$('s1').selectionStart=0;$('s1').selectionEnd=$('s1').value.length");
    r.appendChild(n);
    n = document.createElement("input");
    n.type = "button";
    n.value = "copy";
    n.setAttribute("onclick", "rec.copy()");
    r.appendChild(n);
    n = document.createElement("input");
    n.type = "button";
    n.value = "paste";
    n.setAttribute("onclick", "rec.paste()");
    r.appendChild(n);
    t = document.createElement("span");
    t.className = "sep";
    i = document.createTextNode(" | ");
    t.appendChild(i);
    r.appendChild(t);
    n = document.createElement("input");
    n.type = "button";
    n.value = "erase";
    n.setAttribute("onclick", "rec.erase()");
    r.appendChild(n);
    t = document.createElement("span");
    t.className = "sep";
    i = document.createTextNode(" | ");
    t.appendChild(i);
    r.appendChild(t);
    n = document.createElement("input");
    n.type = "button";
    n.value = "?";
    n.setAttribute("onclick", "alert('Soon..')");
    r.appendChild(n);
    c = document.createElement("span");
    c.id = "expbar";
    n = document.createElement("input");
    n.id = "hh_vis";
    n.type = "button";
    n.value = "{ }";
    n.setAttribute("onclick", "rec.brackets(1)");
    c.appendChild(n);
    t = document.createElement("span");
    t.className = "sep";
    t.id = "hh_sep";
    i = document.createTextNode(" | ");
    t.appendChild(i);
    c.appendChild(t);
    l = document.createElement("span");
    l.setAttribute("onclick", "rec.exp()");
    n = document.createElement("input");
    n.type = "checkbox";
    n.id = "expert";
    n.setAttribute("onclick", "rec.exp()");
    l.appendChild(n);
    p = document.createElement("span");
    p.id = "exptext";
    i = document.createTextNode("Expert");
    p.appendChild(i);
    l.appendChild(p);
    c.appendChild(l);
    r.appendChild(c);
    o.appendChild(r);
    a = document.createElement("textarea");
    a.className = "rec_txt";
    a.placeholder = "Sheet";
    a.id = "s1";
    o.appendChild(a);
    v = document.createElement("span");
    v.id = "rec_tb3";
    n = document.createElement("input");
    n.id = "composition";
    n.type = "text";
    n.placeholder = "Composition's label";
    v.appendChild(n);
    n = document.createElement("input");
    n.id = "submit";
    n.type = "button";
    n.value = "Submit";
    n.setAttribute("onclick", "alert('Soon..')");
    v.appendChild(n);
    o.appendChild(v)
}
win_dom();