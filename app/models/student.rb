class Student < ActiveRecord::Base
  validates :firstname, :favoritemovie, presence: true

  scope :filter, lambda { |movie|
    return if movie.nil?
    where('Lower(favoritemovie) =?', movie)
  }

  def name
    firstname
  end

  def movie
    favoritemovie
  end

  def name_with_initial
    "#{firstname} #{lastname[0]}."
  end
end
