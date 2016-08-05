ENV['RACK_ENV'] ||= 'development'

require 'sinatra/base'
require 'json' #built-in gem to parse JSON

require_relative 'data_mapper_setup'

class Thermostat < Sinatra::Base
  get '/temperature.json' do
    headers 'Access-Control-Allow-Origin' => '*'
    tempFromDatabase = Temperature.last.temperature
    { temperature: tempFromDatabase, city: "London" }.to_json
  end

  post '/temperatureToServer.json' do
    headers 'Access-Control-Allow-Origin' => '*'
    Temperature.create(temperature: params[:temperature])
    puts "temperature from database: #{Temperature.last.temperature}"
    'hello'
  end

  post '/cityToServer.json' do
    headers 'Access-Control-Allow-Origin' => '*'
    Temperature.create(city: params[:city])
    'hello'
  end
  # start the server if ruby file executed directly
  run! if app_file == $0
end
