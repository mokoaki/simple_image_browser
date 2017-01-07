"use strict";

(function () {
  "use strict";

  var Siv = {};
  var Setting = Siv.Setting = {
    // e.g.
    // ./path/to/file_name_001.jpg
    file_path: "./path/to/file_name_",
    zero_suppress_num: 3,
    file_extension: ".jpg"
  };

  var Image = Siv.Image = function () {
    var element = document.createElement("img");

    var setup = function setup() {
      document.body.appendChild(element);

      reset_margin();
    };

    var update = function update(function_after_image_load) {
      Image.call_function_after_image_load = function_after_image_load;
      element.src = Setting.file_path + Page.get_zero_padding_page() + Setting.file_extension;
    };

    var reset_margin = function reset_margin() {
      element.style.marginTop = window.innerHeight + "px";
      element.style.marginBottom = window.innerHeight + "px";
    };

    return {
      element: element,
      setup: setup,
      update: update,
      reset_margin: reset_margin
    };
  }();

  var Page = Siv.Page = function () {
    var setup = function setup() {
      hash_check_and_replace();
      Image.update(scroll_top);
    };

    var zero_padding_string = function () {
      var result = "";

      for (var i = 0; i < Setting.zero_suppress_num; i++) {
        result += "0";
      }

      return function () {
        return result;
      };
    }();

    var get_hash = function get_hash() {
      return window.location.hash.slice(1);
    };

    var get_page = function get_page() {
      var page = parseInt(get_hash(), 10);

      if (isFinite(page) === false || page < 1) {
        page = 1;
      }

      return page;
    };

    var get_zero_padding_page = function get_zero_padding_page() {
      return (zero_padding_string() + get_page()).slice(-Setting.zero_suppress_num);
    };

    var hash_check_and_replace = function hash_check_and_replace() {
      var page = get_page().toString(10);

      if (get_hash() !== page) {
        var page_str = "#" + page;
        window.history.replaceState(null, page_str, page_str);
      }
    };

    var get_transition_page_num = function get_transition_page_num(e) {
      return e.altKey || e.ctrlKey || e.metaKey || e.shiftKey ? 10 : 1;
    };

    var transition_page = function transition_page(page) {
      try {
        var page_str = "#" + page;
        window.history.pushState(null, page_str, page_str);
      } catch (error) {
        // Nosy security message from safari ! ヽ(`Д´)ﾉ
        // SecurityError (DOM Exception 18): Attempt to use history.pushState() more than 100 times per 30.000000 seconds
        if (error.code === 18) {
          window.location.reload(false);
        } else {
          console.dir(error);
          alert(error);
          throw error;
        }
      }
    };

    var transition_next_page = function transition_next_page(e) {
      var replace_page = get_page() + get_transition_page_num(e);
      transition_page(replace_page);
      Image.update(scroll_top);
    };

    var transition_previous_page = function transition_previous_page(e) {
      var replace_page = get_page() - get_transition_page_num(e);

      if (replace_page < 1) {
        replace_page = 1;
      }

      transition_page(replace_page);
      Image.update(scroll_bottom);
    };

    var scroll = function scroll(top) {
      window.scrollTo(0, top);
    };

    var scroll_top = function scroll_top() {
      scroll(window.innerHeight);
    };

    var scroll_bottom = function scroll_bottom() {
      scroll(Image.element.height);
    };

    return {
      setup: setup,
      get_hash: get_hash,
      get_page: get_page,
      zero_padding_string: zero_padding_string,
      get_zero_padding_page: get_zero_padding_page,
      hash_check_and_replace: hash_check_and_replace,
      get_transition_page_num: get_transition_page_num,
      transition_page: transition_page,
      transition_next_page: transition_next_page,
      transition_previous_page: transition_previous_page,
      scroll: scroll,
      scroll_top: scroll_top,
      scroll_bottom: scroll_bottom
    };
  }();

  var Event = Siv.Event = function () {
    var setup = function setup() {
      set_resize_event_to_window();
      set_mousemove_event_to_window();
      set_click_or_keydown_event_to_window();
      set_popstate_event_to_window();
      set_load_event_to_image();
    };

    var set_resize_event_to_window = function set_resize_event_to_window() {
      document.addEventListener("resize", function (e) {
        Image.reset_margin();

        e.stopPropagation();
      }, true);
    };

    var check_position_mouse_cursor = function check_position_mouse_cursor(e) {
      if (Object.prototype.toString.call(e.clientX) === "[object Undefined]") {
        return null;
      }

      return e.clientX < window.innerWidth / 2;
    };

    var set_mousemove_event_to_window = function set_mousemove_event_to_window() {
      document.addEventListener("mousemove", function (e) {
        if (check_position_mouse_cursor(e)) {
          document.body.className = "w_resize";
        } else {
          document.body.className = "e_resize";
        }

        e.stopPropagation();
      }, true);
    };

    var set_click_or_keydown_event_to_window = function set_click_or_keydown_event_to_window() {
      document.addEventListener("keydown", click_or_keydown, true);
      document.addEventListener("click", click_or_keydown, true);
    };

    var next_page_keys = ["Enter", // [Chrome, Firefox, Safari, Opera, MS-IE11, MS-Edge25]
    "ArrowRight", // [Chrome, Firefox, Opera]
    "Right"];

    var previous_page_keys = ["ArrowLeft", // [Chrome, Firefox, Opera]
    "Left"];

    var click_or_keydown = function click_or_keydown(e) {
      // e.key           [Chrome, Firefox, Opera, MS-IE11, MS-Edge25]
      // e.keyIdentifier [Safari] (.keyIdentifier method is deprecated. However, .key method is not supported in Safari.)
      var received_key = e.key || e.keyIdentifier;

      if (next_page_keys.indexOf(received_key) >= 0 || check_position_mouse_cursor(e) === false) {
        Page.transition_next_page(e);
      } else if (previous_page_keys.indexOf(received_key) >= 0 || check_position_mouse_cursor(e) === true) {
        Page.transition_previous_page(e);
      }

      e.stopPropagation();
    };

    var set_popstate_event_to_window = function set_popstate_event_to_window() {
      document.addEventListener("popstate", function (e) {
        Page.hash_check_and_replace();
        Image.update(Page.scroll_top);

        e.stopPropagation();
      }, true);
    };

    var set_load_event_to_image = function set_load_event_to_image() {
      Image.element.addEventListener("load", function (e) {
        Image.call_function_after_image_load();

        e.stopPropagation();
      }, true);
    };

    return {
      setup: setup,
      set_resize_event_to_window: set_resize_event_to_window,
      check_position_mouse_cursor: check_position_mouse_cursor,
      set_mousemove_event_to_window: set_mousemove_event_to_window,
      set_click_or_keydown_event_to_window: set_click_or_keydown_event_to_window,
      next_page_keys: next_page_keys,
      previous_page_keys: previous_page_keys,
      click_or_keydown: click_or_keydown,
      set_popstate_event_to_window: set_popstate_event_to_window,
      set_load_event_to_image: set_load_event_to_image
    };
  }();

  var Setup = Siv.Setup = function (e) {
    Image.setup();
    Event.setup();
    Page.setup();

    document.removeEventListener("DOMContentLoaded", Setup, true);

    e.stopPropagation();
  };

  // window.Siv = Siv;

  document.addEventListener("DOMContentLoaded", Setup, true);
})();
