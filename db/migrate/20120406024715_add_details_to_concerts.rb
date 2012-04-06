class AddDetailsToConcerts < ActiveRecord::Migration
  def change
    add_column :concerts, :over18, :boolean
    add_column :concerts, :over21, :boolean
    add_column :concerts, :price, :decimal, :precision => 8, :scale => 2
  end
end
