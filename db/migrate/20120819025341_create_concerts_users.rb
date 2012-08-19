class CreateConcertsUsers < ActiveRecord::Migration
  def change
    create_table :concerts_users do |t|
      t.integer :concert_id
      t.integer :user_id

      t.timestamps
    end
  end
end
