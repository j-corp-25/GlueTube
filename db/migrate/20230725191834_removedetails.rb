class Removedetails < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :birthday
  end
end
