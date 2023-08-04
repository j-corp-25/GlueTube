class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.references :author, foreign_key: { to_table: :users }
      t.references :video, foreign_key: { to_table: :videos }

      t.timestamps
    end

    add_index :likes, [:author_id, :video_id], unique: true
  end
end
