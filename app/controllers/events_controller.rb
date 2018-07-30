class EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    render json: Event.where(calendar_id: params[:calendar_id])
  end

  def create
    event = Event.create!(event_params)
    render json: event
  end

  def destroy
    Event.destroy(params[:id])
  end

  def update
    event = Event.find(params[:id])
    event.update_attributes(event_params)
    render json: event
  end

  private

  def event_params
    params.require(:event).permit(:id, :title, :allDay, :start, :end, :url)
  end
end