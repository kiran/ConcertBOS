class CreateConcerts < ActiveRecord::Migration
  def change
    create_table :concerts do |t|
      t.datetime :date
      t.references :artist
      t.references :venue

      t.timestamps
    end
    add_index :concerts, :artist_id
    add_index :concerts, :venue_id
  end
end
