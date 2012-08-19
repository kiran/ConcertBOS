class CreateConcerts < ActiveRecord::Migration
  def change
    create_table :concerts do |t|
      t.datetime :date
      t.references :artist
      t.references :venue

      t.timestamps
    end
  end
end
