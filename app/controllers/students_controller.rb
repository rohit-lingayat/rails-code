class StudentsController < ApplicationController
  def index
    @students = Student.filter(params[:movie])
    @students_name_hash = Student.group(:firstname).count
    respond_to do |format|
      format.html
      format.json  { render json: @students }
    end
  end

  def js
  end
end
