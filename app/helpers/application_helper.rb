module ApplicationHelper

    def nav_link(link_text, link_path)
      class_name = current_page?(link_path) ? 'active' : ''

      content_tag(:li, :class => class_name) do
        link_to link_text, link_path
      end
    end

    def nav_li ()
        class_name = ((current_page? '/concerts') or  (current_page? '/venues') or (current_page? '/artists')) ? 'active dropdown' : 'dropdown'

        tag(:li, {:class => class_name}, true)
    end

end

