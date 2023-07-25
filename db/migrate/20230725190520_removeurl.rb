class Removeurl < ActiveRecord::Migration[7.0]
  def change
    remove_column :videos, :url
  end
end
