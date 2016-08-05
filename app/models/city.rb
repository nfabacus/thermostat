class City
  include DataMapper::Resource

  property :id, Serial
  property :city, String

end
