(function() {
  "use strict";

  var Siv = {
    Setting: {
      // e.g.
      // ./path/to/file_name_001.jpg
      file_path:         "./path/to/file_name_",
      zero_suppress_num: 3,
      file_extension:    ".jpg",
    },

    Image: (function() {
      var element;

      function setup() {
        element = window.document.createElement("img");

        window.document.body.appendChild(element);
        Image.element = element;

        reset_margin();
      }

      function update(function_after_image_load) {
        Image.call_function_after_image_load = function_after_image_load;
        element.src = Setting.file_path + Page.get_zero_padding_page() + Setting.file_extension;
      }

      function reset_margin() {
        element.style.marginTop    = window.innerHeight + "px";
        element.style.marginBottom = window.innerHeight + "px";
      }

      return {
        element:      element,
        setup:        setup,
        update:       update,
        reset_margin: reset_margin,
      };
    })(),

    Page: (function() {
      var zero_padding_string;

      function setup() {
        set_zero_padding_string();
        hash_check_and_replace();
        Image.update(scroll_top);
      }

      function set_zero_padding_string() {
        var result = "";

        for (var i = 0; i < Setting.zero_suppress_num; i++) {
          result += "0";
        }

        zero_padding_string = result;
      }

      function get_hash() {
        return window.location.hash.substring(1);
      }

      function get_page() {
        var page = parseInt(get_hash(), 10);

        if (isFinite(page) === false || page < 1) {
          page = 1;
        }

        return page;
      }

      function get_zero_padding_page() {
        return (zero_padding_string + get_page()).slice(-Setting.zero_suppress_num);
      }

      function hash_check_and_replace() {
        var page = get_page().toString(10);

        if (get_hash() !== page) {
          var page_str = "#" + page;
          window.history.replaceState(null, page_str, page_str);
        }
      }

      function get_transition_page_num(event) {
        return (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) ? 10 : 1;
      }

      function transition_page(page) {
        try {
          var page_str = "#" + page;
          window.history.pushState(null, page_str, page_str);
        }
        catch(error) {
          // Nosy security message from safari ! ヽ(`Д´)ﾉ
          // SecurityError (DOM Exception 18): Attempt to use history.pushState() more than 100 times per 30.000000 seconds
          if (error.code === 18) {
            window.location.reload(false);
          }
          else {
            window.alert(error);
            throw error;
          }
        }
      }

      function transition_next_page(event) {
        var replace_page = get_page() + get_transition_page_num(event);
        transition_page(replace_page);
        Image.update(scroll_top);
      }

      function transition_previous_page(event) {
        var replace_page = get_page() - get_transition_page_num(event);

        if (replace_page < 1) {
          replace_page = 1;
        }

        transition_page(replace_page);
        Image.update(scroll_bottom);
      }

      function scroll(top) {
        window.scrollTo(0, top);
      }

      function scroll_top() {
        scroll(window.innerHeight);
      }

      function scroll_bottom() {
        scroll(Image.element.height);
      }

      return {
        setup:                     setup,
        get_hash:                  get_hash,
        get_page:                  get_page,
        set_zero_padding_string:   set_zero_padding_string,
        zero_padding_string:       zero_padding_string,
        get_zero_padding_page:     get_zero_padding_page,
        hash_check_and_replace:    hash_check_and_replace,
        get_transition_page_num:   get_transition_page_num,
        transition_page:           transition_page,
        transition_next_page:      transition_next_page,
        transition_previous_page:  transition_previous_page,
        scroll:                    scroll,
        scroll_top:                scroll_top,
        scroll_bottom:             scroll_bottom,
      };
    })(),

    Event: (function() {
      function setup() {
        set_resize_event_to_window();
        set_mousemove_event_to_window();
        set_click_or_keydown_event_to_window();
        set_popstate_event_to_window();
        set_load_event_to_image();
      }

      function set_resize_event_to_window() {
        window.addEventListener("resize", function(event) {
          Image.reset_margin();

          event.stopPropagation();
        }, true);
      }

      function check_position_mouse_cursor(event) {
        if (Object.prototype.toString.call(event.clientX) === "[object Undefined]") {
          return null;
        }

        return event.clientX < window.innerWidth / 2;
      }

      function set_mousemove_event_to_window() {
        window.addEventListener("mousemove", function(event) {
          if (check_position_mouse_cursor(event)) {
            window.document.body.className = "w_resize";
          }
          else {
            window.document.body.className = "e_resize";
          }

          event.stopPropagation();
        }, true);
      }

      function set_click_or_keydown_event_to_window() {
        window.addEventListener("keydown", click_or_keydown, true);
        window.addEventListener("click", click_or_keydown, true);
      }

      var next_page_keys = [
        "Enter",      // [Chrome, Firefox, Safari, Opera, MS-IE11, MS-Edge25]
        "ArrowRight", // [Chrome, Firefox, Opera]
        "Right",      // [Safari, MS-IE11, MS-Edge25]
      ];

      var previous_page_keys = [
        "ArrowLeft", // [Chrome, Firefox, Opera]
        "Left",      // [Safari, MS-IE11, MS-Edge25]
      ];

      function click_or_keydown(event) {
        // event.key           [Chrome, Firefox, Opera, MS-IE11, MS-Edge25]
        // event.keyIdentifier [Safari] (.keyIdentifier method is deprecated. However, .key method is not supported in Safari.)
        var received_key = (event.key || event.keyIdentifier);

        if (next_page_keys.indexOf(received_key) >= 0 || check_position_mouse_cursor(event) === false) {
          Page.transition_next_page(event);
        }
        else if (previous_page_keys.indexOf(received_key) >= 0 || check_position_mouse_cursor(event) === true) {
          Page.transition_previous_page(event);
        }

        event.stopPropagation();
      }

      function set_popstate_event_to_window() {
        window.addEventListener("popstate", function(event) {
          Page.hash_check_and_replace();
          Image.update(Page.scroll_top);

          event.stopPropagation();
        }, true);
      }

      function set_load_event_to_image() {
        Image.element.addEventListener("load", function(event) {
          Image.call_function_after_image_load();

          event.stopPropagation();
        }, true);
      }

      return {
        setup:                                setup,
        set_resize_event_to_window:           set_resize_event_to_window,
        check_position_mouse_cursor:          check_position_mouse_cursor,
        set_mousemove_event_to_window:        set_mousemove_event_to_window,
        set_click_or_keydown_event_to_window: set_click_or_keydown_event_to_window,
        next_page_keys:                       next_page_keys,
        previous_page_keys:                   previous_page_keys,
        click_or_keydown:                     click_or_keydown,
        set_popstate_event_to_window:         set_popstate_event_to_window,
        set_load_event_to_image:              set_load_event_to_image,
      };
    })(),

    Setup: function() {
      Image.setup();
      Event.setup();
      Page.setup();

      window.removeEventListener("DOMContentLoaded", Setup, true);

      event.stopPropagation();
    },
  };

  var Setting = Siv.Setting;
  var Image   = Siv.Image;
  var Page    = Siv.Page;
  var Event   = Siv.Event;
  var Setup   = Siv.Setup;

  // window.Siv = Siv;

  window.addEventListener("DOMContentLoaded", Setup, true);
})();
