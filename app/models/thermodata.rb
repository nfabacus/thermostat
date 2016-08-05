class Thermodata
  include DataMapper::Resource

  property :id, Serial
  property :city, String
  property :temperature, Integer

end
