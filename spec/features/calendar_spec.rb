require 'rails_helper'
require 'capybara/rspec'

describe  "Calendars", :type => :feature do

  before(:each) do
    user = create(:user)
    visit "/users/sign_in"
    fill_in "Email", :with => user.email
    fill_in "Password", :with => user.password
    click_button "Log in"
  end

  it "Get calendar list" do
    calendar = create(:calendar)
    visit root_path
    expect(page).to have_content('Dashboard')
  end

  it "Pass ASC params for sorting table when click link Calendar Name" do
    calendar = create(:calendar)
    visit root_path
    click_link("Calendar Name")
    expect(current_url).to have_text "calendars?direction=asc&sort=title"
  end

  it "Pass sorted DESC params for sorting table when double click link Calendar Name" do
    calendar = create(:calendar)
    visit root_path
    click_link("Calendar Name")
    click_link("Calendar Name")
    expect(current_url).to have_text "calendars?direction=desc&sort=title"
  end

  it "Pass sorted ASC params for sorting table when click link Status" do
    calendar = create(:calendar)
    visit root_path
    click_link("Status")
    expect(current_url).to have_text "calendars?direction=asc&sort=public"
  end

  it "Pass sorted DESC params for sorting table when double click link Status" do
    calendar = create(:calendar)
    visit root_path
    click_link("Status")
    click_link("Status")
    expect(current_url).to have_text "calendars?direction=desc&sort=public"
  end

  it "Pass sorted ASC params for sorting table when click link date time" do
    calendar = create(:calendar)
    visit root_path
    click_link("Date/Time")
    expect(current_url).to have_text "calendars?direction=asc&sort=created_at"
  end

  it "Pass sorted DESC params for sorting table when click link date time" do
    calendar = create(:calendar)
    visit root_path
    click_link("Date/Time")
    click_link("Date/Time")
    expect(current_url).to have_text "calendars?direction=desc&sort=created_at"
  end

  it "Default sorting calendars (latest should be first)" do
    data = [{:title => "Latest calendar", :public => false, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "First calendar", :public => false, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    expect(page).to have_text "First calendar Private 29:06:2018 10:00 Edit Delete Latest calendar"
  end

  it "Sorted by name (should be ASC sorted)" do
    data = [{:title => "A calendar", :public => false, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "The calendar", :public => false, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    click_link("Calendar Name")
    expect(page).to have_text "A calendar Private 29:06:2018 05:00 Edit Delete The calendar"
  end

  it "Sorted by name (should be DESC sorted)" do
    data = [{:title => "A calendar", :public => false, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "The calendar", :public => false, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    click_link("Calendar Name")
    click_link("Calendar Name")
    expect(page).to have_text "The calendar Private 29:06:2018 10:00 Edit Delete A calendar"
  end

  it "Sorted by status (should be ASC sorted)" do
    data = [{:title => "Private calendar", :public => false, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "Public calendar", :public => true, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    click_link("Status")
    expect(page).to have_text "Private calendar Private 29:06:2018 05:00 Edit Delete Public calendar Public"
  end

  it "Sorted by name (should be DESC sorted)" do
    data = [{:title => "Private calendar", :public => false, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "Public calendar", :public => true, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    click_link("Status")
    click_link("Status")
    expect(page).to have_text "Public calendar Public Shortened Link should be here 29:06:2018 10:00 Edit Delete Private calendar Private"
  end

  it "Sorted by date_time (should be DESC sorted, as by default here was ASC sorting)" do
    data = [{:title => "First calendar", :public => false, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "Latest calendar", :public => false, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    click_link("Date/Time")
    expect(page).to have_text "First calendar Private 29:06:2018 05:00 Edit Delete Latest calendar Private 29:06:2018 10:00"
  end

  it "Sorted by date_time - header was double clicked and shoud return to ASC sorting" do
    data = [{:title => "First calendar", :public => false, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "Latest calendar", :public => true, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    click_link("Date/Time")
    click_link("Date/Time")
    expect(page).to have_text "Latest calendar Public Shortened Link should be here 29:06:2018 10:00 Edit Delete First calendar"
  end

  it "Calendar name filter correct" do
    data = [{:title => "My First calendar", :public => false, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "Second calendar", :public => false, :created_at => "Fri, 29 Jun 2018 06:00:00 UTC +00:00"},
            {:title => "My Latest calendar", :public => false, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    fill_in 'calendar_name', :with => 'My'
    click_button 'Submit'
    expect(page).to have_text "Logout\nDashboard\nStatus\nAll Private Public\nSubmit\nCalendar Name Status Shortened Link Date/Time Actions My Latest calendar Private 29:06:2018 10:00 Edit Delete My First calendar Private 29:06:2018 05:00 Edit Delete\nCreate New"
  end

  it "Status filter correct (selected All)" do
    data = [{:title => "First private calendar", :public => false, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "Second public calendar", :public => true, :created_at => "Fri, 29 Jun 2018 06:00:00 UTC +00:00"},
            {:title => "Third private calendar", :public => false, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    page.select 'All', from: 'public'
    click_button 'Submit'
    expect(page).to have_text "Third private calendar Private 29:06:2018 10:00 Edit Delete Second public calendar Public Shortened Link should be here 29:06:2018 06:00 Edit Delete First private calendar Private 29:06:2018 05:00"
  end

  it "Status filter correct (selected Private)" do
    data = [{:title => "First private calendar", :public => false, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "Second public calendar", :public => true, :created_at => "Fri, 29 Jun 2018 06:00:00 UTC +00:00"},
            {:title => "Third private calendar", :public => false, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    page.select 'Private', from: 'public'
    click_button 'Submit'
    expect(page).to have_text "Third private calendar Private 29:06:2018 10:00 Edit Delete First private calendar Private 29:06:2018 05:00"
  end

  it "Status filter correct (selected Public)" do
    data = [{:title => "First public calendar", :public => true, :created_at => "Fri, 29 Jun 2018 05:00:00 UTC +00:00"}, 
            {:title => "Second private calendar", :public => false, :created_at => "Fri, 29 Jun 2018 06:00:00 UTC +00:00"},
            {:title => "Third public calendar", :public => true, :created_at => "Fri, 29 Jun 2018 22:00:00 UTC +00:00"}, 
            ]
    calendars = data.map { |p| create(:calendar, p) }
    visit root_path
    page.select 'Public', from: 'public'
    click_button 'Submit'
    expect(page).to have_text "Third public calendar Public Shortened Link should be here 29:06:2018 10:00 Edit Delete First public calendar Public Shortened Link should be here 29:06:2018 05:00"
  end

end
