class Temperature
  include DataMapper::Resource

  property :id, Serial
  property :temperature, Integer

end
