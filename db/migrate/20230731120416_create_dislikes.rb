class CreateDislikes < ActiveRecord::Migration[7.0]
  def change
    create_table :dislikes do |t|
      t.references :author, foreign_key: { to_table: :users }
      t.references :video, foreign_key: { to_table: :videos }

      t.timestamps
    end

    add_index :dislikes, [:author_id, :video_id], unique: true
  end
end
