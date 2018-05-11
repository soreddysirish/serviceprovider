class RegistrationsController < Devise::RegistrationsController
	respond_to :json
	def login
	end
	def sign_up
	end


	def new
	end


	def create
		@user =User.create(user_params)
		if @user.save
			render json: {status:200}
		else
			render json: { error: 'signup error' }, status: :unprocessable_entity
		end
	end



	private
	def user_params
		params.require(:user).permit(:email,:password,:password_confirmation,:firstName,:lastName,:phone_number,:user_type)
	end
end

