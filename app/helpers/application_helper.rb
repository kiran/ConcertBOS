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

    def color (price)
        case price=price.to_i
            when  0..9 then 'btn0'
            when 10..19 then 'btn1'
            when 20..29 then 'btn2'
            when 30..39 then 'btn3'
            when 40..200 then 'btn4'
        end
    end

    def age (concert)
        agerest = ''
        agerest = 'over18' if concert.over18
        agerest = 'over21' if concert.over21
        return agerest
    end

end

