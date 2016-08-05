require 'data_mapper'
require 'dm-postgres-adapter'

require_relative 'models/city'
require_relative 'models/temperature'
require_relative 'models/thermodata'

DataMapper.setup(:default, ENV['DATABASE_URL'] || "postgres://localhost/thermostat_db_#{ENV['RACK_ENV']}")
DataMapper.finalize
DataMapper.auto_upgrade!
