class StudentsController < ApplicationController
  before_action :fetch_student, only: [:show, :update, :destroy]

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

  def create
    student = Student.new(student_params)
    if student.save
      render json: student, status: :ok
    else
      render json: { errors: student.errors }, status: :unauthorized
    end
  end

  def show
    if @student
      render json: @student, status: :ok
    else
      render json: {}, status: :unauthorized
    end
  end

  def update
    if @student.update_attributes(student_params)
      render json: @student, status: :ok
    else
      render json: { errors: @student.errors }, status: :unauthorized
    end
  end

  def destroy
    if @student.delete
      render json: {}, status: :ok
    else
      render json: { errors: @student.errors }, status: :unauthorized
    end
  end

  private

  def student_params
    params.require(:student_data).permit(
      :firstname, :lastname,
      :favoritefood, :favoritecolor, :favoritemovie
    )
  end

  def fetch_student
    @student = Student.find_by(id: params[:id])
  end
end
