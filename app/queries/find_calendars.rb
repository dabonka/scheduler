class FindCalendars
  attr_accessor :initial_scope

  def initialize(initial_scope)
    @initial_scope = initial_scope
  end

  def call(params)
    scoped = initial_scope
    scoped = search(scoped, params[:calendar_name])
    scoped = status(scoped, params[:public])
    scoped
  end

  private def search(scoped, query = nil)
    (query && query.length > 0) ? scoped.where("title LIKE ?", "%#{query}%") : scoped
  end

  private def status(scoped, public = nil)
    case public
    when 'Public'
      scoped.where(public: true)
    when 'Private'
      scoped.where(public: false)
    else
      scoped
    end
  end

end
