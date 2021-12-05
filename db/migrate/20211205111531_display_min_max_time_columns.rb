class DisplayMinMaxTimeColumns < ActiveRecord::Migration[6.1]
  def up
    add_column :masters, :display_min_time, :integer
    add_column :masters, :display_max_time, :integer
  end

  def down
    remove_column :masters, :display_min_time, :integer
    remove_column :masters, :display_max_time, :integer
  end
end
