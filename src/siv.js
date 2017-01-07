(() => {
  "use strict";

  const Setting = {
    // e.g.
    // ./path/to/file_name_001.jpg
    file_path: "./path/to/file_name_",
    zero_suppress_num: 3,
    file_extension:    ".jpg",
  };

  const Image = (() => {
    const element = document.createElement("img");

    const setup = () => {
      document.body.appendChild(element);

      reset_margin();
    };

    const update = (function_after_image_load) => {
      Image.call_function_after_image_load = function_after_image_load;
      element.src = Setting.file_path + Page.get_zero_padding_page() + Setting.file_extension;
    };

    const reset_margin = () => {
      element.style.marginTop    = window.innerHeight + "px";
      element.style.marginBottom = window.innerHeight + "px";
    };

    return {
      element:      element,
      setup:        setup,
      update:       update,
      reset_margin: reset_margin,
    };
  })();

  const Page = (() => {
    const setup = () => {
      hash_check_and_replace();
      Image.update(scroll_top);
    };

    const zero_padding_string = (() => {
      let result = "";

      for (let i = 0; i < Setting.zero_suppress_num; i++) {
        result += "0";
      }

      return () => {
        return result;
      };
    })();

    const get_hash = () => {
      return window.location.hash.slice(1);
    };

    const get_page = () => {
      let page = parseInt(get_hash(), 10);

      if (isFinite(page) === false || page < 1) {
        page = 1;
      }

      return page;
    };

    const get_zero_padding_page = () => {
      return (zero_padding_string() + get_page()).slice(-Setting.zero_suppress_num);
    };

    const hash_check_and_replace = () => {
      const page = get_page().toString(10);

      if (get_hash() !== page) {
        const page_str = "#" + page;
        window.history.replaceState(null, page_str, page_str);
      }
    };

    const get_transition_page_num = (e) => {
      return (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) ? 10 : 1;
    };

    const transition_page = (page) => {
      try {
        const page_str = "#" + page;
        window.history.pushState(null, page_str, page_str);
      }
      catch(error) {
        // Nosy security message from safari ! ヽ(`Д´)ﾉ
        // SecurityError (DOM Exception 18): Attempt to use history.pushState() more than 100 times per 30.000000 seconds
        if (error.code === 18) {
          window.location.reload(false);
        }
        else {
          console.dir(error);
          alert(error);
          throw error;
        }
      }
    };

    const transition_next_page = (e) => {
      const replace_page = get_page() + get_transition_page_num(e);
      transition_page(replace_page);
      Image.update(scroll_top);
    };

    const transition_previous_page = (e) => {
      let replace_page = get_page() - get_transition_page_num(e);

      if (replace_page < 1) {
        replace_page = 1;
      }

      transition_page(replace_page);
      Image.update(scroll_bottom);
    };

    const scroll = (top) => {
      window.scrollTo(0, top);
    };

    const scroll_top = () => {
      scroll(window.innerHeight);
    };

    const scroll_bottom = () => {
      scroll(Image.element.height);
    };

    return {
      setup:                     setup,
      get_hash:                  get_hash,
      get_page:                  get_page,
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
  })();

  const Event = (() => {
    const setup = () => {
      set_resize_event_to_window();
      set_mousemove_event_to_window();
      set_click_or_keydown_event_to_window();
      set_popstate_event_to_window();
      set_load_event_to_image();
    };

    const set_resize_event_to_window = () => {
      window.addEventListener("resize", (e) => {
        Image.reset_margin();

        e.stopPropagation();
      }, true);
    };

    const check_position_mouse_cursor = (e) => {
      if (Object.prototype.toString.call(e.clientX) === "[object Undefined]") {
        return null;
      }

      return e.clientX < window.innerWidth / 2;
    };

    const set_mousemove_event_to_window = () => {
      document.addEventListener("mousemove", (e) => {
        if (check_position_mouse_cursor(e)) {
          document.body.className = "w_resize";
        }
        else {
          document.body.className = "e_resize";
        }

        e.stopPropagation();
      }, true);
    };

    const set_click_or_keydown_event_to_window = () => {
      document.addEventListener("keydown", click_or_keydown, true);
      document.addEventListener("click", click_or_keydown, true);
    };

    const next_page_keys = [
      "Enter",      // [Chrome, Firefox, Safari, Opera, MS-IE11, MS-Edge25]
      "ArrowRight", // [Chrome, Firefox, Opera]
      "Right",      // [Safari, MS-IE11, MS-Edge25]
    ];

    const previous_page_keys = [
      "ArrowLeft", // [Chrome, Firefox, Opera]
      "Left",      // [Safari, MS-IE11, MS-Edge25]
    ];

    const click_or_keydown = (e) => {
      // e.key           [Chrome, Firefox, Opera, MS-IE11, MS-Edge25]
      // e.keyIdentifier [Safari] (.keyIdentifier method is deprecated. However, .key method is not supported in Safari.)
      const received_key = (e.key || e.keyIdentifier);

      if (next_page_keys.indexOf(received_key) >= 0 || check_position_mouse_cursor(e) === false) {
        Page.transition_next_page(e);
      }
      else if (previous_page_keys.indexOf(received_key) >= 0 || check_position_mouse_cursor(e) === true) {
        Page.transition_previous_page(e);
      }

      e.stopPropagation();
    };

    const set_popstate_event_to_window = () => {
      document.addEventListener("popstate", (e) => {
        Page.hash_check_and_replace();
        Image.update(Page.scroll_top);

        e.stopPropagation();
      }, true);
    };

    const set_load_event_to_image = () => {
      Image.element.addEventListener("load", (e) => {
        Image.call_function_after_image_load();

        e.stopPropagation();
      }, true);
    };

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
  })();

  const Setup = (e) => {
    Image.setup();
    Event.setup();
    Page.setup();

    document.removeEventListener("DOMContentLoaded", Setup, true);

    e.stopPropagation();
  };

  // window.Siv = {
  //   Setting: Setting,
  //   Image:   Image,
  //   Page:    Page,
  //   Event:   Event,
  //   Setup:   Setup,
  // };

  document.addEventListener("DOMContentLoaded", Setup, true);
})();
