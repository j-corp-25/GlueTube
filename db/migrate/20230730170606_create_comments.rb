class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.string :body, null: false
      t.references :author, foreign_key: { to_table: :users }, null: false
      t.references :video, foreign_key: true, null: false
      t.references :parent, foreign_key: { to_table: :comments }

      t.timestamps
    end
  end
end
