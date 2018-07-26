class CalendarsController < ApplicationController
  helper_method :sort_column, :sort_direction

  before_action :require_login

    def index
      @calendars = FindCalendars.new(Calendar.all).call(permitted_params).order(sort_column + " " + sort_direction).page(params[:page]).per(30)
    end
    
    def show
      @calendar = Calendar.find(params[:id])
    end
    
    def new
      @calendar = current_user.calendars.new
      respond_to do |format|
        format.js
      end
    end

    def create
      @calendar = current_user.calendars.create(calendar_params)
      if @calendar.save
        redirect_to root_path
      else
        render :new
      end
    end

    def edit
      @calendar = Calendar.find(params[:id])
      respond_to do |format|
        format.js
      end
    end

    def update
      @calendar = Calendar.find(params[:id])
        if @calendar.update(calendar_params)
        redirect_to root_path
      else
        render 'edit'
      end
    end

    def destroy
      @calendar = Calendar.find(params[:id])
      @calendar.destroy
      redirect_to root_path
    end

    private

    def require_login
      unless user_signed_in?
        flash[:error] = "You are not authorized!"
        redirect_to new_user_session_path
      end
    end

    def calendar_params
      params.require(:calendar).permit(:title, :public)
    end

    def permitted_params
      params.permit(:calendar_name, :created_at, :public, :direction, :sort, :utf8, :authenticity_token)
    end
  
    def sort_column
      params[:sort] ? params[:sort] : "created_at" 
    end
  
    def sort_direction
      %w[asc desc].include?(params[:direction]) ? params[:direction] : "desc"
    end
    
end
