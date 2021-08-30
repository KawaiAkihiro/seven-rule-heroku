class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    include MastersHelper
    include SessionsHelper
    include IndividualShiftsHelper
    include PerfectShiftsHelper
end
