require 'rails_helper'

class CalendarsTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  test 'authenticated users can GET index' do
    sign_in users(:any_user)

    get :index
    assert_response :success
  end
end