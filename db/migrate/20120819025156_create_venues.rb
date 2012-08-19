class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :venue_name
      t.text :address
      t.integer :capacity
      t.string :phone
      t.string :hours
      t.string :seating

      t.timestamps
    end
  end
end
