module ApplicationHelper
  def sortable(column, title = nil)
    title ||= column.titleize
    css_class = column == sort_column ? "current #{sort_direction}" : nil
    direction = column == sort_column && sort_direction == "asc" ? "desc" : "asc"
    link_to title, {:sort => column, :direction => direction, :public => params[:public], :calendar_name => params[:calendar_name], :created_at => params[:created_at] }, {:class => css_class}
  end
end
