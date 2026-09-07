export const URLS: Record<string, Record<string, string>> = {
  dev: {
    login: "login",
    logged: "secure",
    element: "add_remove_elements/",
    upload: "upload",
    download: "download",
    dropdown :"dropdown",
    checkbox:"checkboxes",
    context:"context_menu",
    digest:"digest_auth",
    dragAndDrop:"drag_and_drop",
    input:"inputs",
    dynamic:"dynamic_loading",
    jsa:"javascript_alerts",
    frame:"frames",
    hover:"hovers",
    dynamicControl:"dynamic_controls",
    window:"windows",
    table:"tables",
    notification:"notification_message_rendered",
    broken:"broken_images",
    shadow:"shadowdom",
    geolocation:"geolocation",
    menu:"jqueryui/menu"
  },
  qa: {
    login: "/member",
    category: "/baby/toddler"
  },
};

export const url = (group: string, key: string) => URLS[group]?.[key];