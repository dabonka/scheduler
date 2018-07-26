class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.boolean :allDay
      t.datetime :start
      t.datetime :end
      t.string :url
      t.references :calendar, foreign_key: true
      t.timestamps
    end
  end
end
