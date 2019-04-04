// import cloudinary from 'cloudinary';

(function () {
  var test;
  function extracted(code) {
    var actual;
    if (code[0] !== "{") {
      code = "{" + code;
    }
    if (code.slice(-1) === ",") {
      code = code.slice(0, -1);
    }
    if (code.slice(-1) !== "}") {
      code = code + "}";
    }
    let options = {};
    try {
      actual = Function('"use strict"; return(' + code + ')')();
      actual = new cloudinary.Transformation(actual).toString();
    } catch (e) {

      console.error(e);
    }
    return {code, actual};
  }

  if (typeof describe === 'undefined') {
    test = function localTest(index, code, expected) {
      let check = false;
      const {modCode, actual} = extracted(code);


      check = actual.length > 0 && expected.includes(actual);
      console.log(`%c${index} test ${check ? "works" : "fails"}`, `color: ${check ? 'green' : 'red'};`, modCode, expected)
      if (!check) {
        console.log(`%cExpected: ${expected}`, "color: red;");
        console.log(`%cGot     : ${actual}`, "color:red;");

      }
    };

    execTests(test);
  } else {
    describe("layers", function () {
      test = function jasmineTest(index, code, expected) {
        it("should work for " + code, function () {
          const {modCode, actual} = extracted(code);

          expect(expected).toContain(actual);
        })
      };
      execTests(test);
    })
  }

  function execTests(test) {
    let i = 1;
    let transformation_string = "$small_150,$big_2_div_$small/c_fill,w_$big,h_$small_add_20/l_my_named_div_layer/e_art:20";
    let code = "variables: [[\"$small\", \"150\"], [\"$big\", \"2 / $small\"]]";
    test(i, code, transformation_string);
    i++;
    transformation_string = "$small_150,$big_2_div_$small/c_fill,w_$big,h_$small_add_20/l_my_named_div_layer/e_art:20";
    code = "variables: [[\"$small\", \"150\"], [\"$big\", \"2 / $small\"]]";
    test(i, code, transformation_string);
    i++;
    transformation_string = "c_fill,ar_4:3";
    code = "aspectRatio: \"4:3\"";
    test(i, code, transformation_string);
    i++;
    transformation_string = "ar_4:3,c_fill/c_scale,w_auto,dpr_auto";
    code = "aspectRatio: \"4:3\",";
    test(i, code, transformation_string);
    i++;
    transformation_string = "ar_4:3,c_fill/c_scale,w_auto,dpr_auto";
    i++;
    transformation_string = "w_500/l_my_icon";
    code = "{overlay: new cloudinary.Layer().publicId(\"my_icon\")";
    test(i, code, transformation_string);
    i++;
    transformation_string = "w_500/l_text:verdana_1:words";
    code = "{overlay: new cloudinary.TextLayer().fontFamily(\"verdana\").fontSize(1).text(\"words\")}";
    test(i, code, transformation_string);
    i++;
    // transformation_string = "w_500/l_text:verdana_12_bold_left_underline:words"; // sort order
    transformation_string = "w_500/l_text:verdana_12_bold_underline_left:words"; // sort order
    code = "{overlay: new cloudinary.TextLayer().fontFamily(\"verdana\").fontSize(12).fontWeight(\"bold\").textDecoration(\"underline\").textAlign(\"left\").text(\"words\")}";
    test(i, code, transformation_string);
    i++;
    // transformation_string = "w_500/l_text:Verdana_75_bold_underline_letter_spacing_14_stroke_line_spacing_4:words,y_24"; // sort order
    transformation_string = "w_500/l_text:Verdana_75_bold_underline_stroke_letter_spacing_14_line_spacing_4:words,y_24";
    code = "{overlay: new cloudinary.TextLayer().fontFamily(\"Verdana\").fontSize(75).fontWeight(\"bold\").textDecoration(\"underline\").stroke(\"stroke\").letterSpacing(14).lineSpacing(4).text(\"words\"), y: 24}";
    test(i, code, transformation_string);
    i++;
    transformation_string = "w_500/l_text:sample_text_style:Stylish%20text,g_south";
    code = "overlay: new cloudinary.TextLayer().text(\"Stylish%2520text\")";
    test(i, code, transformation_string);
    i++;
    transformation_string = "w_500/u_my_bg";
    code = "{underlay: new cloudinary.Layer().publicId(\"my_bg\")";
    test(i, code, transformation_string);
    i++;
    // transformation_string = "w_500/u_fetch:image.url"; // url should be base64
    transformation_string = "w_500/u_fetch:aW1hZ2UudXJs";
    code = "{underlay: new cloudinary.FetchLayer().url(\"image.url\")}";
    test(i, code, transformation_string);
    i++;
    transformation_string = "w_500/l_subtitles:Arial_40:sample_sub_he.srt";
    code = "overlay: new cloudinary.SubtitlesLayer().fontFamily(\"Arial\").fontSize(40).publicId(\"sample_sub_he.srt\")";
    test(i, code, transformation_string);
    i++;
    transformation_string = "b_rgb:331a00,co_khaki,g_south_west,l_subtitles:impact_15:lincoln.transcript";
    code = "{overlay: new cloudinary.SubtitlesLayer().fontFamily(\"impact\").fontSize(15).publicId(\"lincoln.transcript\"), color: \"khaki\", background: \"#331a00\", gravity: \"south_west\"}";
    test(i, code, transformation_string);
    i++;
    // transformation_string = "w_500/l_text:Verdana_75_bold_underline_letter_spacing_14_stroke_line_spacing_4:words,y_24"; // sort order
    transformation_string = "w_500/l_text:Verdana_75_bold_underline_stroke_letter_spacing_14_line_spacing_4:words,y_24";
    code = "{overlay: new cloudinary.TextLayer().fontFamily(\"Verdana\").fontSize(75).fontWeight(\"bold\").textDecoration(\"underline\").stroke(\"stroke\").letterSpacing(14).lineSpacing(4).text(\"words\"), y: 24}";
    test(i, code, transformation_string);
    i++;
    transformation_string = "w_500/u_fetch:aW1hZ2UudXJs";
    code = "{underlay: new cloudinary.FetchLayer().url(\"image.url\")}";
    test(i, code, transformation_string);
    i++;
    transformation_string = "w_500/l_subtitles:Arial_40:sample_sub_he.srt";
    code = "overlay: new cloudinary.SubtitlesLayer().fontFamily(\"Arial\").fontSize(40).publicId(\"sample_sub_he.srt\")";
    test(i, code, transformation_string);
    i++;
    transformation_string = "l_subtitles:impact_15:lincoln.transcript,co_khaki,b_rgb:331a00,g_south_west";
    code = "overlay: new cloudinary.SubtitlesLayer().fontFamily(\"impact\").fontSize(15).publicId(\"lincoln.transcript\")";
    test(i, code, transformation_string);
  }
})();