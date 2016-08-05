ENV['RACK_ENV'] ||= 'development'

require 'sinatra/base'
require 'json' #built-in gem to parse JSON

require_relative 'data_mapper_setup'

class Thermostat < Sinatra::Base
  get '/thermoinfo.json' do
    headers 'Access-Control-Allow-Origin' => '*'
    Thermodata.last.temperature ? tempFromDatabase = Thermodata.last.temperature : temFromDatabase = 20

    Thermodata.last.city ? cityFromDatabase = Thermodata.last.city : cityFromDatabase = ""
    { temperature: tempFromDatabase, city: cityFromDatabase }.to_json
  end

  post '/temperatureToServer.json' do
    headers 'Access-Control-Allow-Origin' => '*'
    Thermodata.create(temperature: params[:temperature])
    "temperature from database: #{Thermodata.last.temperature}"
  end

  post '/cityToServer.json' do
    headers 'Access-Control-Allow-Origin' => '*'
    Thermodata.create(city: params[:city])
    "city from database: #{Thermodata.last.city}"
  end
  # start the server if ruby file executed directly
  run! if app_file == $0
end
