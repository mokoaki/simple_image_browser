(() => {
  "use strict";

  const Setting = {
    // e.g.
    // path/to/file_name_001.jpg
    // ./images/irasutoya_001.jpg
    file_path: "./images/irasutoya_",
    zero_suppress_num: 3,
    file_extension: ".jpg",
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
      const result = Math.pow(10, Setting.zero_suppress_num).toString(10).slice(1);

      return () => {
        return result;
      };
    })();

    const get_url_hash = () => {
      return window.location.hash.slice(1);
    };

    const get_page_num = (url_hash) => {
      const temp_page = parseInt(url_hash, 10);
      const page = (isFinite(temp_page) === false || temp_page < 1) ? 1 : temp_page;

      return page;
    };

    const get_zero_padding_page = () => {
      const url_hash = get_url_hash();
      return (zero_padding_string() + get_page_num(url_hash).toString(10)).slice(-Setting.zero_suppress_num);
    };

    const hash_check_and_replace = () => {
      const url_hash = get_url_hash();
      const page = get_page_num(url_hash).toString(10);

      if (url_hash !== page) {
        const page_str = "#" + page;
        window.history.replaceState(null, page_str, page_str);
      }
    };

    const get_transition_page_num = (event) => {
      return (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) ? 10 : 1;
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
          throw error;
        }
      }
    };

    const transition_next_page = (event) => {
      const url_hash = get_url_hash();
      const replace_page = get_page_num(url_hash) + get_transition_page_num(event);

      transition_page(replace_page);
      Image.update(scroll_top);
    };

    const transition_previous_page = (event) => {
      const url_hash = get_url_hash();
      const temp_replace_page = get_page_num(url_hash) - get_transition_page_num(event);
      const replace_page = Math.max(temp_replace_page, 1);

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
      get_url_hash:              get_url_hash,
      get_page_num:              get_page_num,
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
      window.addEventListener("resize", (event) => {
        Image.reset_margin();

        event.stopPropagation();
      }, true);
    };

    const check_position_mouse_cursor = (event) => {
      if (Object.prototype.toString.call(event.clientX) === "[object Undefined]") {
        return null;
      }

      return event.clientX < window.innerWidth / 2;
    };

    const set_mousemove_event_to_window = () => {
      document.addEventListener("mousemove", (event) => {
        document.body.className = check_position_mouse_cursor(event) ? "w_resize" : "e_resize";

        event.stopPropagation();
      }, true);
    };

    const set_click_or_keydown_event_to_window = () => {
      document.addEventListener("keydown", click_or_keydown, true);
      document.addEventListener("click", click_or_keydown, true);
    };

    const NEXT_PAGE_KEYS = [
      "Enter",      // [Chrome, Firefox, Safari, Opera, MS-IE11, MS-Edge25]
      "ArrowRight", // [Chrome, Firefox, Safari, Opera]
      "Right",      // [MS-IE11, MS-Edge25]
    ];

    const PREVIOUS_PAGE_KEYS = [
      "ArrowLeft", // [Chrome, Firefox, Safari, Opera]
      "Left",      // [MS-IE11, MS-Edge25]
    ];

    const click_or_keydown = (event) => {
      const received_key = event.key;

      if (NEXT_PAGE_KEYS.includes(received_key) || check_position_mouse_cursor(event) === false) {
        Page.transition_next_page(event);
      }
      else if (PREVIOUS_PAGE_KEYS.includes(received_key) || check_position_mouse_cursor(event) === true) {
        Page.transition_previous_page(event);
      }

      event.stopPropagation();
    };

    const set_popstate_event_to_window = () => {
      document.addEventListener("popstate", (event) => {
        Page.hash_check_and_replace();
        Image.update(Page.scroll_top);

        event.stopPropagation();
      }, true);
    };

    const set_load_event_to_image = () => {
      Image.element.addEventListener("load", (event) => {
        Image.call_function_after_image_load();

        event.stopPropagation();
      }, true);
    };

    return {
      setup:                                setup,
      set_resize_event_to_window:           set_resize_event_to_window,
      check_position_mouse_cursor:          check_position_mouse_cursor,
      set_mousemove_event_to_window:        set_mousemove_event_to_window,
      set_click_or_keydown_event_to_window: set_click_or_keydown_event_to_window,
      click_or_keydown:                     click_or_keydown,
      set_popstate_event_to_window:         set_popstate_event_to_window,
      set_load_event_to_image:              set_load_event_to_image,
    };
  })();

  const Setup = (event) => {
    Image.setup();
    Event.setup();
    Page.setup();

    document.removeEventListener("DOMContentLoaded", Setup, true);

    event.stopPropagation();
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
