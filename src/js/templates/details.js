this["trailguide"] = this["trailguide"] || {};
this["trailguide"]["templates"] = this["trailguide"]["templates"] || {};

this["trailguide"]["templates"]["details"] = function anonymous(locals) {
jade.debug = [{ lineno: 1, filename: "templates/views/details.jade" }];
try {
var buf = [];
var locals_ = (locals || {}),details = locals_.details;jade.debug.unshift({ lineno: 1, filename: jade.debug[0].filename });
jade.debug.unshift({ lineno: 1, filename: jade.debug[0].filename });
buf.push("<p>");
jade.debug.unshift({ lineno: undefined, filename: jade.debug[0].filename });
jade.debug.unshift({ lineno: 1, filename: jade.debug[0].filename });
buf.push("Details go here.");
jade.debug.shift();
jade.debug.shift();
buf.push("</p>");
jade.debug.shift();
jade.debug.unshift({ lineno: 3, filename: jade.debug[0].filename });
// iterate details
;(function(){
  var $$obj = details;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var value = $$obj[key];

jade.debug.unshift({ lineno: 3, filename: jade.debug[0].filename });
jade.debug.unshift({ lineno: 5, filename: jade.debug[0].filename });
buf.push("<dl>");
jade.debug.unshift({ lineno: undefined, filename: jade.debug[0].filename });
jade.debug.unshift({ lineno: 5, filename: jade.debug[0].filename });
buf.push("<dt>" + (jade.escape(null == (jade.interp = key) ? "" : jade.interp)));
jade.debug.unshift({ lineno: undefined, filename: jade.debug[0].filename });
jade.debug.shift();
buf.push("</dt>");
jade.debug.shift();
jade.debug.unshift({ lineno: 6, filename: jade.debug[0].filename });
buf.push("<dd>" + (jade.escape(null == (jade.interp = value) ? "" : jade.interp)));
jade.debug.unshift({ lineno: undefined, filename: jade.debug[0].filename });
jade.debug.shift();
buf.push("</dd>");
jade.debug.shift();
jade.debug.shift();
buf.push("</dl>");
jade.debug.shift();
jade.debug.shift();
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var value = $$obj[key];

jade.debug.unshift({ lineno: 3, filename: jade.debug[0].filename });
jade.debug.unshift({ lineno: 5, filename: jade.debug[0].filename });
buf.push("<dl>");
jade.debug.unshift({ lineno: undefined, filename: jade.debug[0].filename });
jade.debug.unshift({ lineno: 5, filename: jade.debug[0].filename });
buf.push("<dt>" + (jade.escape(null == (jade.interp = key) ? "" : jade.interp)));
jade.debug.unshift({ lineno: undefined, filename: jade.debug[0].filename });
jade.debug.shift();
buf.push("</dt>");
jade.debug.shift();
jade.debug.unshift({ lineno: 6, filename: jade.debug[0].filename });
buf.push("<dd>" + (jade.escape(null == (jade.interp = value) ? "" : jade.interp)));
jade.debug.unshift({ lineno: undefined, filename: jade.debug[0].filename });
jade.debug.shift();
buf.push("</dd>");
jade.debug.shift();
jade.debug.shift();
buf.push("</dl>");
jade.debug.shift();
jade.debug.shift();
    }

  }
}).call(this);

jade.debug.shift();
jade.debug.shift();;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade.debug[0].filename, jade.debug[0].lineno);
}
};