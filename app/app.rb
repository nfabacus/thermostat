ENV['RACK_ENV'] ||= 'development'

require 'sinatra/base'
require 'json' #built-in gem to parse JSON

require_relative 'data_mapper_setup'

class Thermostat < Sinatra::Base
  get '/thermoinfo.json' do
    headers 'Access-Control-Allow-Origin' => '*'
    tempFromDatabase = Temperature.last.temperature
    cityFromDatabase = City.last.city
    { temperature: tempFromDatabase, city: cityFromDatabase }.to_json
  end

  post '/temperatureToServer.json' do
    headers 'Access-Control-Allow-Origin' => '*'
    Temperature.create(temperature: params[:temperature])
    "temperature from database: #{Temperature.last.temperature}"
  end

  post '/cityToServer.json' do
    headers 'Access-Control-Allow-Origin' => '*'
    City.create(city: params[:city])
    "city from database: #{City.last.city}"
  end
  # start the server if ruby file executed directly
  run! if app_file == $0
end
