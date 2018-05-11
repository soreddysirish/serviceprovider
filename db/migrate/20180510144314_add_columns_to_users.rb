class AddColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :firstName, :string
    add_column :users, :lastName, :string
    add_column :users, :phone_number, :string
    add_column :users, :user_type, :string
  end
end
